import * as THREE from 'three';
import gsap from 'gsap';
import { BoardCanvasRenderer } from './BoardCanvasRenderer.js';

export class MangaBoard extends THREE.Group {
  constructor(project, index = 0) {
    super();
    this.project = project;
    this.index = index;
    this.isHovered = false;
    this.isDetailMode = false;

    // Kích thước chuẩn tỷ lệ 4:3 của ô tranh manga
    this.boardWidth = 4.4;
    this.boardHeight = 3.3;
    this.boardDepth = 0.15;

    // Vị trí và góc xoay gốc để khôi phục khi thu nhỏ
    this.originalPosition = new THREE.Vector3();
    this.originalRotation = new THREE.Euler();
    this.originalScale = new THREE.Vector3(1, 1, 1);

    this.buildBoard();
  }

  buildBoard() {
    // 1. Khung hộp 3D vát viền đen (Beveled Manga Slab)
    const frameGeo = new THREE.BoxGeometry(this.boardWidth, this.boardHeight, this.boardDepth);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x12141c,
      roughness: 0.35,
      metalness: 0.15
    });
    this.frameMesh = new THREE.Mesh(frameGeo, frameMat);
    this.add(this.frameMesh);

    // 2. Mặt tranh hiển thị Texture Canvas 2D
    this.texture = BoardCanvasRenderer.createBoardTexture(this.project);
    const surfaceGeo = new THREE.PlaneGeometry(this.boardWidth - 0.15, this.boardHeight - 0.15);
    const surfaceMat = new THREE.MeshBasicMaterial({
      map: this.texture,
      toneMapped: false
    });
    this.surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    this.surfaceMesh.position.z = this.boardDepth / 2 + 0.01;
    this.add(this.surfaceMesh);

    // 3. Viền hào quang Neon phát sáng khi Hover (Glow Rim Layer)
    const glowGeo = new THREE.PlaneGeometry(this.boardWidth + 0.35, this.boardHeight + 0.35);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.project.accentColor || '#38bdf8'),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    this.glowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.glowMesh.position.z = -0.02;
    this.add(this.glowMesh);

    // Định danh để Raycaster dễ dàng nhận diện
    this.surfaceMesh.userData = { parentBoard: this, project: this.project };
    this.frameMesh.userData = { parentBoard: this, project: this.project };
  }

  setHover(isHovered) {
    if (this.isDetailMode || this.isHovered === isHovered) return;
    this.isHovered = isHovered;

    if (isHovered) {
      // Bảng phát sáng và trồi nhẹ về phía trước
      gsap.to(this.glowMesh.material, {
        opacity: 0.85,
        duration: 0.25,
        ease: 'power2.out'
      });
      gsap.to(this.position, {
        z: this.originalPosition.z + 0.35,
        duration: 0.25,
        ease: 'power2.out'
      });
      gsap.to(this.scale, {
        x: this.originalScale.x * 1.03,
        y: this.originalScale.y * 1.03,
        duration: 0.25,
        ease: 'power2.out'
      });
    } else {
      // Trở về trạng thái bình thường
      gsap.to(this.glowMesh.material, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.position, {
        z: this.originalPosition.z,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.scale, {
        x: this.originalScale.x,
        y: this.originalScale.y,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.rotation, {
        x: this.originalRotation.x,
        y: this.originalRotation.y,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  setTilt(mouseX, mouseY) {
    if (this.isDetailMode) return;
    // Parallax 3D tilt theo vị trí chuột
    const maxRot = 0.08;
    this.rotation.y = this.originalRotation.y + (mouseX * maxRot);
    this.rotation.x = this.originalRotation.x + (-mouseY * maxRot);
  }

  updateProject(newProject) {
    this.project = newProject;
    this.surfaceMesh.userData.project = newProject;
    this.frameMesh.userData.project = newProject;

    if (this.texture) {
      this.texture.dispose();
    }
    this.texture = BoardCanvasRenderer.createBoardTexture(newProject);
    this.surfaceMesh.material.map = this.texture;
    this.surfaceMesh.material.needsUpdate = true;

    this.glowMesh.material.color.set(newProject.accentColor || '#38bdf8');
  }
}
