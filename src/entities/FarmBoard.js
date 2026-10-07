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

    this.basePosition = new THREE.Vector3();
    this.buildBoard();
  }

  buildBoard() {
    this.boardGroup = new THREE.Group();

    // 1. Kích thước chuẩn cho bố cục lưới 2x2
    const boardWidth = 3.6;
    const boardHeight = 2.15;
    const boardDepth = 0.12;

    // 2. Khung gỗ sồi 3D bo cạnh mộc mạc (Đã bỏ quai treo theo yêu cầu)
    const frameGeo = new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth);
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b, // Màu gỗ sồi già
      roughness: 0.75,
      metalness: 0.08
    });
    this.frameMesh = new THREE.Mesh(frameGeo, woodMat);
    this.frameMesh.castShadow = true;
    this.boardGroup.add(this.frameMesh);

    // 3. Mặt bảng Canvas vẽ tay mộc mạc độ nét cao
    this.texture = this.createSignCanvasTexture();
    const surfaceGeo = new THREE.PlaneGeometry(boardWidth - 0.14, boardHeight - 0.14);
    const surfaceMat = new THREE.MeshBasicMaterial({
      map: this.texture,
      toneMapped: false
    });
    this.surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    this.surfaceMesh.position.z = boardDepth / 2 + 0.01;
    this.boardGroup.add(this.surfaceMesh);

    this.add(this.boardGroup);

    // Metadata cho Raycaster tương tác
    this.surfaceMesh.userData = { parentBoard: this, parentSign: this, project: this.project };
    this.frameMesh.userData = { parentBoard: this, parentSign: this, project: this.project };
  }

  createSignCanvasTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 430;
    const ctx = canvas.getContext('2d');

    // Nền gỗ sáng vân tự nhiên
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, 720, 430);

    // Các đường vân gỗ uốn lượn mềm mại
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 4;
    for (let y = 18; y < 430; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(220, y + (Math.sin(y * 0.1) * 8), 480, y - (Math.sin(y * 0.1) * 8), 720, y);
      ctx.stroke();
    }

    // Viền khung gỗ khắc chìm mộc mạc
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 14;
    ctx.strokeRect(12, 12, 696, 406);

    // 4 Đinh tán kim loại ở 4 góc
    ctx.fillStyle = '#451a03';
    const rivets = [[36, 36], [684, 36], [36, 394], [684, 394]];
    rivets.forEach(([rx, ry]) => {
      ctx.beginPath();
      ctx.arc(rx, ry, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // Badge số thứ tự dự án (VD: 🌾 DỰ ÁN #01)
    const padIndex = String(this.index + 1).padStart(2, '0');
    ctx.fillStyle = '#b45309';
    ctx.font = '700 22px "Outfit", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${this.project.iconEmoji || '🌾'} DỰ ÁN #${padIndex}`, 48, 70);

    // Tiêu đề Dự án
    ctx.fillStyle = '#451a03';
    ctx.font = '900 38px "Outfit", sans-serif';
    ctx.fillText(this.project.title, 48, 125);

    // Phụ đề mô tả công trình
    ctx.fillStyle = '#92400e';
    ctx.font = '600 22px "Outfit", sans-serif';
    ctx.fillText(this.project.subtitle || 'Công trình 3D', 48, 165);

    // Đường kẻ phân cách gỗ
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(48, 192);
    ctx.lineTo(672, 192);
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

    // Mô tả dự án rõ ràng, thoáng đãng (Đã bỏ toàn bộ dòng hướng dẫn click / scroll)
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

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  update(delta, time) {
    // Hoạt ảnh lơ lửng bồng bềnh liên tục (Floating Idle Animation)
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

    // Phản hồi hover êm ái: CHỈ SCALE NHẸ & NHẤC VỀ PHÍA TRƯỚC, KHÔNG CÓ BORDER GLOW
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
