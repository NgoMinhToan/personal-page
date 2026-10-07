import * as THREE from 'three';
import gsap from 'gsap';
import { FarmAssetBuilder } from './FarmAssetBuilder.js';

export class FarmSignpost extends THREE.Group {
  constructor(project, index = 0) {
    super();
    this.project = project;
    this.index = index;
    this.isHovered = false;
    this.isDetailMode = false;
    this.floatOffset = index * 1.35; // Độ lệch pha để mỗi bảng nhấp nhô khác nhau

    this.buildSignpost();
  }

  buildSignpost() {
    // 1. Model Asset 3D Động Nông trại (Cối xay gió, Vườn táo, Luống rau...)
    this.farmAsset = FarmAssetBuilder.buildAsset(this.project.farmType);
    this.farmAsset.position.set(0, 0, 0);
    this.add(this.farmAsset);

    // 2. Chiếc Bảng Gỗ Treo (Rustic Hanging Wooden Sign)
    this.signGroup = new THREE.Group();
    this.signGroup.position.set(0, 2.8, 1.8);

    // Dây thừng / Xích treo bảng
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
    const ropeL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), ropeMat);
    ropeL.position.set(-1.1, 0.45, 0);
    this.signGroup.add(ropeL);

    const ropeR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), ropeMat);
    ropeR.position.set(1.1, 0.45, 0);
    this.signGroup.add(ropeR);

    // Khung gỗ 3D uốn cạnh tự nhiên (không còn hình chữ nhật khô cứng)
    const boardWidth = 3.4;
    const boardHeight = 1.9;
    const boardDepth = 0.12;

    const frameGeo = new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth);
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b, // Màu gỗ sồi già
      roughness: 0.75,
      metalness: 0.1
    });
    this.frameMesh = new THREE.Mesh(frameGeo, woodMat);
    this.signGroup.add(this.frameMesh);

    // Mặt bảng Canvas vẽ tay mộc mạc
    this.texture = this.createSignCanvasTexture();
    const surfaceGeo = new THREE.PlaneGeometry(boardWidth - 0.12, boardHeight - 0.12);
    const surfaceMat = new THREE.MeshBasicMaterial({
      map: this.texture,
      toneMapped: false
    });
    this.surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    this.surfaceMesh.position.z = boardDepth / 2 + 0.01;
    this.signGroup.add(this.surfaceMesh);

    // Hào quang nắng vàng khi hover
    const glowGeo = new THREE.PlaneGeometry(boardWidth + 0.4, boardHeight + 0.4);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    this.glowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.glowMesh.position.z = -0.02;
    this.signGroup.add(this.glowMesh);

    this.add(this.signGroup);

    // Gắn metadata để Raycaster nhận diện click & hover
    this.surfaceMesh.userData = { parentSign: this, project: this.project };
    this.frameMesh.userData = { parentSign: this, project: this.project };

    // Lưu vị trí gốc ban đầu
    this.baseSignY = this.signGroup.position.y;
  }

  createSignCanvasTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 680;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');

    // Nền gỗ sáng vẽ tay
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, 680, 380);

    // Vân sọc gỗ tự nhiên
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 4;
    for (let y = 15; y < 380; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(200, y + (Math.sin(y) * 8), 450, y - (Math.sin(y) * 8), 680, y);
      ctx.stroke();
    }

    // Viền khung gỗ khắc đậm
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 660, 360);

    // Đinh tán kim loại ở 4 góc
    ctx.fillStyle = '#451a03';
    const rivets = [[30, 30], [650, 30], [30, 350], [650, 350]];
    rivets.forEach(([rx, ry]) => {
      ctx.beginPath();
      ctx.arc(rx, ry, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Huy hiệu Icon Nông Trại
    ctx.font = '54px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.project.iconEmoji || '🌾', 90, 110);

    // Tiêu đề Dự án phong cách mộc mạc
    ctx.textAlign = 'left';
    ctx.fillStyle = '#451a03';
    ctx.font = '900 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(this.project.title, 150, 95);

    // Phụ đề mô tả công trình nông trại
    ctx.fillStyle = '#92400e';
    ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(this.project.subtitle || 'Công trình Nông trại', 150, 130);

    // Đường kẻ phân cách gỗ
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 165);
    ctx.lineTo(630, 165);
    ctx.stroke();

    // Thẻ Tech Skills
    let tagX = 50;
    const skills = this.project.skills || [];
    skills.forEach((skill) => {
      const text = '#' + skill.toUpperCase();
      ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = '#15803d';
      ctx.fillRect(tagX, 195, textWidth + 24, 38);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, tagX + 12, 221);

      tagX += textWidth + 36;
    });

    // Lời nhắc nhấp chuột mộc mạc
    ctx.fillStyle = '#78350f';
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Bấm vào đây để Khám Phá Dự Án ✨', 340, 320);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  update(delta, time) {
    // 1. Cập nhật model 3D asset nông trại (cối xay quay, cây lắc lư, cà rốt nảy)
    if (this.farmAsset && this.farmAsset.update) {
      this.farmAsset.update(delta, time);
    }

    // 2. Chuyển động lơ lửng & đung đưa liên tục (Floating & Swaying Idle Animation)
    if (!this.isDetailMode) {
      // Nhấp nhô bồng bềnh
      this.signGroup.position.y = this.baseSignY + Math.sin(time * 2.2 + this.floatOffset) * 0.16;
      // Đung đưa nhẹ theo gió
      this.signGroup.rotation.z = Math.sin(time * 1.5 + this.floatOffset) * 0.05;
      this.signGroup.rotation.y = Math.sin(time * 1.0 + this.floatOffset) * 0.03;
    }
  }

  setHover(isHovered) {
    if (this.isDetailMode || this.isHovered === isHovered) return;
    this.isHovered = isHovered;

    // Kích hoạt phản ứng tương tác trên model 3D asset nông trại
    if (this.farmAsset && this.farmAsset.onHover) {
      this.farmAsset.onHover(isHovered);
    }

    if (isHovered) {
      gsap.to(this.glowMesh.material, {
        opacity: 0.9,
        duration: 0.25,
        ease: 'power2.out'
      });
      gsap.to(this.signGroup.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.3,
        ease: 'back.out(2)'
      });
      gsap.to(this.signGroup.position, {
        z: 2.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(this.glowMesh.material, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.signGroup.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.signGroup.position, {
        z: 1.8,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }
}
