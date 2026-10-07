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

    // 2. Dây thừng treo bảng mộc mạc phía trên
    const ropeMat = new THREE.MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.9
    });
    const ropeGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.7, 6);

    const ropeL = new THREE.Mesh(ropeGeo, ropeMat);
    ropeL.position.set(-1.25, boardHeight / 2 + 0.35, 0);
    this.boardGroup.add(ropeL);

    const ropeR = new THREE.Mesh(ropeGeo, ropeMat);
    ropeR.position.set(1.25, boardHeight / 2 + 0.35, 0);
    this.boardGroup.add(ropeR);

    // Móc treo kim loại đồng cổ
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4,
      metalness: 0.6
    });
    const ringGeo = new THREE.TorusGeometry(0.09, 0.03, 6, 12);
    const ringL = new THREE.Mesh(ringGeo, ringMat);
    ringL.position.set(-1.25, boardHeight / 2 + 0.7, 0);
    this.boardGroup.add(ringL);

    const ringR = new THREE.Mesh(ringGeo, ringMat);
    ringR.position.set(1.25, boardHeight / 2 + 0.7, 0);
    this.boardGroup.add(ringR);

    // 3. Khung gỗ sồi 3D bo góc
    const frameGeo = new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth);
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b, // Màu gỗ sồi già
      roughness: 0.75,
      metalness: 0.08
    });
    this.frameMesh = new THREE.Mesh(frameGeo, woodMat);
    this.frameMesh.castShadow = true;
    this.boardGroup.add(this.frameMesh);

    // 4. Mặt bảng Canvas vẽ tay mộc mạc độ nét cao
    this.texture = this.createSignCanvasTexture();
    const surfaceGeo = new THREE.PlaneGeometry(boardWidth - 0.14, boardHeight - 0.14);
    const surfaceMat = new THREE.MeshBasicMaterial({
      map: this.texture,
      toneMapped: false
    });
    this.surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    this.surfaceMesh.position.z = boardDepth / 2 + 0.01;
    this.boardGroup.add(this.surfaceMesh);

    // 5. Hào quang nắng vàng khi hover (Golden Glow Aura)
    const glowGeo = new THREE.PlaneGeometry(boardWidth + 0.45, boardHeight + 0.45);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    this.glowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.glowMesh.position.z = -0.03;
    this.boardGroup.add(this.glowMesh);

    this.add(this.boardGroup);

    // Metadata cho Raycaster tương tác
    this.surfaceMesh.userData = { parentBoard: this, project: this.project };
    this.frameMesh.userData = { parentBoard: this, project: this.project };
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

    // Viền khung gỗ khắc chìm đậm đà
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 14;
    ctx.strokeRect(12, 12, 696, 406);

    // Viền chỉ trang trí bên trong
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, 672, 382);

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
    ctx.font = '700 20px "Outfit", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${this.project.iconEmoji || '🌾'} DỰ ÁN #${padIndex}`, 48, 65);

    // Tiêu đề Dự án
    ctx.fillStyle = '#451a03';
    ctx.font = '900 36px "Outfit", sans-serif';
    ctx.fillText(this.project.title, 48, 115);

    // Phụ đề mô tả công trình nông trại
    ctx.fillStyle = '#92400e';
    ctx.font = '600 21px "Outfit", sans-serif';
    ctx.fillText(this.project.subtitle || 'Công trình Nông trại 3D', 48, 150);

    // Đường kẻ phân cách gỗ
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(48, 175);
    ctx.lineTo(672, 175);
    ctx.stroke();

    // Thẻ Tech Skills nông trại
    let tagX = 48;
    const skills = this.project.skills || [];
    skills.forEach((skill) => {
      const text = '#' + skill.toUpperCase();
      ctx.font = '700 17px "Outfit", sans-serif';
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = '#15803d';
      ctx.fillRect(tagX, 202, textWidth + 24, 36);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, tagX + 12, 226);

      tagX += textWidth + 34;
    });

    // Mô tả vắn tắt 2 dòng mộc mạc
    ctx.fillStyle = '#5c3a21';
    ctx.font = '500 18px "Outfit", sans-serif';
    const desc = this.project.description || '';
    const descWords = desc.split(' ');
    let line1 = '';
    let line2 = '';
    for (let word of descWords) {
      if ((line1 + ' ' + word).length < 52) {
        line1 += (line1 ? ' ' : '') + word;
      } else if ((line2 + ' ' + word).length < 55) {
        line2 += (line2 ? ' ' : '') + word;
      }
    }
    if (descWords.length > (line1.split(' ').length + line2.split(' ').length)) {
      line2 += '...';
    }
    ctx.fillText(line1, 48, 280);
    if (line2) ctx.fillText(line2, 48, 308);

    // Nút kêu gọi hành động mộc mạc
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(48, 345, 624, 48);
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 345, 624, 48);

    ctx.fillStyle = '#451a03';
    ctx.font = '800 20px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Bấm vào đây để Khám Phá Chi Tiết ✨', 360, 376);

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

    // Báo hiệu cho model 3D nông trại tương ứng phản hồi
    if (this.associatedModel && this.associatedModel.onHover) {
      this.associatedModel.onHover(isHovered);
    }

    if (isHovered) {
      gsap.to(this.glowMesh.material, {
        opacity: 0.95,
        duration: 0.25,
        ease: 'power2.out'
      });
      gsap.to(this.boardGroup.scale, {
        x: 1.08,
        y: 1.08,
        z: 1.08,
        duration: 0.3,
        ease: 'back.out(2)'
      });
      gsap.to(this.boardGroup.position, {
        z: 0.45,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(this.glowMesh.material, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.boardGroup.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.boardGroup.position, {
        z: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }
}
