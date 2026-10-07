import * as THREE from 'three';
import gsap from 'gsap';

export class FarmBoard extends THREE.Group {
  constructor(project, index = 0) {
    super();
    this.project = project;
    this.index = index;
    this.isHovered = false;
    this.isDetailMode = false;
    this.floatOffset = index * 0.95; // Độ lệch pha nhấp nhô riêng biệt
    this.currentDetailHoveredBtn = null;

    this.basePosition = new THREE.Vector3();
    this.buildBoard();
  }

  buildBoard() {
    this.boardGroup = new THREE.Group();

    // 1. Kích thước chuẩn cho bố cục lưới 2x2
    const boardWidth = 3.6;
    const boardHeight = 2.15;
    const boardDepth = 0.12;

    // 2. Khung gỗ sồi 3D bo cạnh mộc mạc
    const frameGeo = new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth);
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b, // Màu gỗ sồi già
      roughness: 0.75,
      metalness: 0.08
    });
    this.frameMesh = new THREE.Mesh(frameGeo, woodMat);
    this.frameMesh.castShadow = true;
    this.boardGroup.add(this.frameMesh);

    // 3. Khởi tạo 2 Canvas Texture: Tóm tắt (Lưới 2x2) & Toàn màn hình chi tiết
    this.summaryCanvas = document.createElement('canvas');
    this.summaryCanvas.width = 720;
    this.summaryCanvas.height = 430;
    this.drawSummaryCanvas();
    this.summaryTexture = new THREE.CanvasTexture(this.summaryCanvas);
    this.summaryTexture.colorSpace = THREE.SRGBColorSpace;

    this.detailCanvas = document.createElement('canvas');
    this.detailCanvas.width = 1600;
    this.detailCanvas.height = 960;
    this.drawDetailCanvas(null);
    this.detailTexture = new THREE.CanvasTexture(this.detailCanvas);
    this.detailTexture.colorSpace = THREE.SRGBColorSpace;

    const surfaceGeo = new THREE.PlaneGeometry(boardWidth - 0.14, boardHeight - 0.14);
    this.surfaceMat = new THREE.MeshBasicMaterial({
      map: this.summaryTexture,
      toneMapped: false
    });
    this.surfaceMesh = new THREE.Mesh(surfaceGeo, this.surfaceMat);
    this.surfaceMesh.position.z = boardDepth / 2 + 0.01;
    this.boardGroup.add(this.surfaceMesh);

    this.add(this.boardGroup);

    // Metadata cho Raycaster tương tác
    this.surfaceMesh.userData = { parentBoard: this, parentSign: this, project: this.project };
    this.frameMesh.userData = { parentBoard: this, parentSign: this, project: this.project };
  }

  drawSummaryCanvas() {
    const ctx = this.summaryCanvas.getContext('2d');
    const w = 720;
    const h = 430;

    // Nền gỗ sáng vân tự nhiên
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, w, h);

    // Đường vân gỗ uốn lượn
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 4;
    for (let y = 18; y < h; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(220, y + Math.sin(y * 0.1) * 8, 480, y - Math.sin(y * 0.1) * 8, w, y);
      ctx.stroke();
    }

    // Viền khung gỗ khắc chìm mộc mạc
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 14;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    // 4 Đinh tán kim loại
    ctx.fillStyle = '#451a03';
    const rivets = [[36, 36], [w - 36, 36], [36, h - 36], [w - 36, h - 36]];
    rivets.forEach(([rx, ry]) => {
      ctx.beginPath();
      ctx.arc(rx, ry, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // Badge số thứ tự dự án
    const padIndex = String(this.index + 1).padStart(2, '0');
    ctx.fillStyle = '#b45309';
    ctx.font = '700 22px "Outfit", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${this.project.iconEmoji || '🌾'} DỰ ÁN #${padIndex}`, 48, 70);

    // Tiêu đề Dự án
    ctx.fillStyle = '#451a03';
    ctx.font = '900 38px "Outfit", sans-serif';
    ctx.fillText(this.project.title, 48, 125);

    // Phụ đề mô tả
    ctx.fillStyle = '#92400e';
    ctx.font = '600 22px "Outfit", sans-serif';
    ctx.fillText(this.project.subtitle || 'Công trình 3D', 48, 165);

    // Đường kẻ phân cách gỗ
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(48, 192);
    ctx.lineTo(w - 48, 192);
    ctx.stroke();

    // Thẻ Tech Skills
    let tagX = 48;
    const skills = this.project.skills || [];
    skills.forEach((skill) => {
      const text = '#' + skill.toUpperCase();
      ctx.font = '700 18px "Outfit", sans-serif';
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = '#15803d';
      ctx.fillRect(tagX, 218, textWidth + 24, 38);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, tagX + 12, 243);

      tagX += textWidth + 34;
    });

    // Mô tả dự án vắn tắt
    ctx.fillStyle = '#5c3a21';
    ctx.font = '500 20px "Outfit", sans-serif';
    const desc = this.project.description || '';
    const descWords = desc.split(' ');
    let line1 = '';
    let line2 = '';
    let line3 = '';
    for (let word of descWords) {
      if ((line1 + ' ' + word).length < 50) {
        line1 += (line1 ? ' ' : '') + word;
      } else if ((line2 + ' ' + word).length < 52) {
        line2 += (line2 ? ' ' : '') + word;
      } else if ((line3 + ' ' + word).length < 52) {
        line3 += (line3 ? ' ' : '') + word;
      }
    }
    if (descWords.length > (line1.split(' ').length + line2.split(' ').length + line3.split(' ').length)) {
      line3 += '...';
    }
    ctx.fillText(line1, 48, 305);
    if (line2) ctx.fillText(line2, 48, 340);
    if (line3) ctx.fillText(line3, 48, 375);
  }

  drawDetailCanvas(hoveredButton = null) {
    const ctx = this.detailCanvas.getContext('2d');
    const w = 1600;
    const h = 960;

    // 1. Nền gỗ sồi ấm áp chất lượng cao
    ctx.fillStyle = '#fffdf5';
    ctx.fillRect(0, 0, w, h);

    // Đường vân gỗ mịn màng
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 5;
    for (let y = 20; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(450, y + Math.sin(y * 0.08) * 12, 1050, y - Math.sin(y * 0.08) * 12, w, y);
      ctx.stroke();
    }

    // Viền gỗ khắc chìm sang trọng
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 18;
    ctx.strokeRect(16, 16, w - 32, h - 32);

    // Viền trang trí mạ vàng
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.strokeRect(34, 34, w - 68, h - 68);

    // Đinh tán đồng ở 4 góc
    ctx.fillStyle = '#451a03';
    const rivets = [[56, 56], [w - 56, 56], [56, h - 56], [w - 56, h - 56]];
    rivets.forEach(([rx, ry]) => {
      ctx.beginPath();
      ctx.arc(rx, ry, 14, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. NÚT QUAY VỀ LƯỚI 2X2 (TOP-LEFT BUTTON)
    const isBackHovered = hoveredButton === 'back';
    const backBtnX = 60;
    const backBtnY = 56;
    const backBtnW = 340;
    const backBtnH = 68;

    ctx.fillStyle = isBackHovered ? '#fde047' : '#fef08a';
    ctx.beginPath();
    ctx.roundRect(backBtnX, backBtnY, backBtnW, backBtnH, 34);
    ctx.fill();
    ctx.strokeStyle = isBackHovered ? '#a16207' : '#ca8a04';
    ctx.lineWidth = isBackHovered ? 4 : 3;
    ctx.stroke();

    ctx.fillStyle = isBackHovered ? '#713f12' : '#854d0e';
    ctx.font = '800 24px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('◀ QUAY VỀ LƯỚI 2X2', backBtnX + backBtnW / 2, backBtnY + 43);

    // Badge góc trên bên phải
    const padIndex = String(this.index + 1).padStart(2, '0');
    ctx.textAlign = 'right';
    ctx.fillStyle = '#b45309';
    ctx.font = '700 24px "Outfit", sans-serif';
    ctx.fillText(`${this.project.iconEmoji || '🌾'} DỰ ÁN #${padIndex} // CHI TIẾT DỰ ÁN`, w - 60, 98);

    // 3. TIÊU ĐỀ DỰ ÁN TO RÕ RÀNG
    ctx.textAlign = 'left';
    ctx.fillStyle = '#451a03';
    ctx.font = '900 62px "Outfit", sans-serif';
    ctx.fillText(this.project.title, 60, 205);

    // Phụ đề mô tả công trình
    ctx.fillStyle = '#92400e';
    ctx.font = '700 30px "Outfit", sans-serif';
    ctx.fillText(this.project.subtitle || 'Công trình Nông trại 3D', 60, 256);

    // Đường kẻ phân cách khắc gỗ
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, 285);
    ctx.lineTo(w - 60, 285);
    ctx.stroke();

    // 4. KỸ NĂNG CÔNG NGHỆ (TECH TAGS)
    let tagX = 60;
    const tagY = 315;
    const skills = this.project.skills || [];
    skills.forEach((skill) => {
      const text = '#' + skill.toUpperCase();
      ctx.font = '800 22px "Outfit", sans-serif';
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.roundRect(tagX, tagY, textWidth + 32, 48, 24);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, tagX + 16, tagY + 32);

      tagX += textWidth + 48;
    });

    // 5. MÔ TẢ CHI TIẾT DỰ ÁN
    ctx.fillStyle = '#374151';
    ctx.font = '500 27px "Outfit", sans-serif';
    const desc = this.project.description || '';
    const descWords = desc.split(' ');
    let lines = [];
    let curLine = '';
    for (let word of descWords) {
      if ((curLine + ' ' + word).length < 75) {
        curLine += (curLine ? ' ' : '') + word;
      } else {
        lines.push(curLine);
        curLine = word;
      }
    }
    if (curLine) lines.push(curLine);

    let textY = 415;
    lines.forEach((line) => {
      ctx.fillText(line, 60, textY);
      textY += 46;
    });

    // Ghi chú công nghệ nổi bật
    ctx.fillStyle = '#1b4332';
    ctx.font = '600 24px "Outfit", sans-serif';
    ctx.fillText('💡 Trải nghiệm mượt mà với 60fps WebGL, tối ưu hóa bộ nhớ và tương tác 3D chân thực.', 60, 675);

    // Đường kẻ ngang trước các nút hành động
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(60, 720);
    ctx.lineTo(w - 60, 720);
    ctx.stroke();

    // 6. NÚT HÀNH ĐỘNG TO ĐẸP PHÍA DƯỚI (BOTTOM ACTION BUTTONS)
    const btnH = 92;
    const btnY = 760;
    const btnW = (w - 120 - 40) / 2; // Chia 2 nút cân đối

    // Nút 1: LIVE DEMO
    const isDemoHovered = hoveredButton === 'demo';
    const demoX = 60;
    ctx.fillStyle = isDemoHovered ? '#22c55e' : '#15803d';
    ctx.beginPath();
    ctx.roundRect(demoX, btnY, btnW, btnH, 20);
    ctx.fill();
    ctx.strokeStyle = isDemoHovered ? '#15803d' : '#14532d';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 28px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🚀 TRUY CẬP DỰ ÁN (LIVE DEMO) ↗', demoX + btnW / 2, btnY + 56);

    // Nút 2: GITHUB SOURCE
    const isGithubHovered = hoveredButton === 'github';
    const githubX = demoX + btnW + 40;
    ctx.fillStyle = isGithubHovered ? '#374151' : '#4b5563';
    ctx.beginPath();
    ctx.roundRect(githubX, btnY, btnW, btnH, 20);
    ctx.fill();
    ctx.strokeStyle = isGithubHovered ? '#1f2937' : '#374151';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 28px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💻 XEM MÃ NGUỒN GITHUB ↗', githubX + btnW / 2, btnY + 56);
  }

  switchToDetailMode() {
    this.isDetailMode = true;
    this.currentDetailHoveredBtn = null;
    this.drawDetailCanvas(null);
    this.surfaceMat.map = this.detailTexture;
    this.detailTexture.needsUpdate = true;
  }

  switchToSummaryMode() {
    this.isDetailMode = false;
    this.currentDetailHoveredBtn = null;
    this.surfaceMat.map = this.summaryTexture;
    this.summaryTexture.needsUpdate = true;
  }

  getButtonAtUV(uv) {
    if (!uv) return null;
    // UV space: x: 0 (left) -> 1 (right), y: 0 (bottom) -> 1 (top)
    // 1. Back button: Canvas x in [60, 400], y in [56, 124] -> UV x: [0.035, 0.25], UV y: [0.87, 0.95]
    if (uv.x >= 0.03 && uv.x <= 0.26 && uv.y >= 0.86 && uv.y <= 0.96) {
      return 'back';
    }
    // 2. Demo button: Canvas x in [60, 770], y in [760, 852] -> UV x: [0.035, 0.49], UV y: [0.10, 0.22]
    if (uv.x >= 0.03 && uv.x <= 0.49 && uv.y >= 0.09 && uv.y <= 0.23) {
      return 'demo';
    }
    // 3. Github button: Canvas x in [810, 1540], y in [760, 852] -> UV x: [0.51, 0.97], UV y: [0.10, 0.22]
    if (uv.x >= 0.50 && uv.x <= 0.97 && uv.y >= 0.09 && uv.y <= 0.23) {
      return 'github';
    }
    return null;
  }

  setDetailHoveredButton(buttonName) {
    if (this.currentDetailHoveredBtn === buttonName) return;
    this.currentDetailHoveredBtn = buttonName;
    this.drawDetailCanvas(buttonName);
    this.detailTexture.needsUpdate = true;
  }

  update(delta, time) {
    // Hoạt ảnh lơ lửng bồng bềnh liên tục khi ở chế độ lưới 2x2
    if (!this.isDetailMode) {
      const bob = Math.sin(time * 2.0 + this.floatOffset) * 0.14;
      const rock = Math.sin(time * 1.5 + this.floatOffset) * 0.035;
      const sway = Math.sin(time * 1.1 + this.floatOffset) * 0.02;

      this.boardGroup.position.y = bob;
      this.boardGroup.rotation.z = rock;
      this.boardGroup.rotation.y = sway;
    }
  }

  setHover(isHovered) {
    if (this.isDetailMode || this.isHovered === isHovered) return;
    this.isHovered = isHovered;

    // Báo hiệu cho model 3D tương ứng phản hồi
    if (this.associatedModel && this.associatedModel.onHover) {
      this.associatedModel.onHover(isHovered);
    }

    if (isHovered) {
      gsap.to(this.boardGroup.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.25,
        ease: 'power2.out'
      });
      gsap.to(this.boardGroup.position, {
        z: 0.35,
        duration: 0.25,
        ease: 'power2.out'
      });
    } else {
      gsap.to(this.boardGroup.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.25,
        ease: 'power2.out'
      });
      gsap.to(this.boardGroup.position, {
        z: 0,
        duration: 0.25,
        ease: 'power2.out'
      });
    }
  }
}
