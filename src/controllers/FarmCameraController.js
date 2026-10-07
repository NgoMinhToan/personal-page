import * as THREE from 'three';
import gsap from 'gsap';

export class FarmCameraController {
  constructor(camera, landmarks, options = {}) {
    this.camera = camera;
    this.landmarks = landmarks; // Danh sách các vị trí trạm nông trại
    this.onSelectLandmark = options.onSelectLandmark || (() => {});
    this.onReturnOverview = options.onReturnOverview || (() => {});

    this.currentProgress = 0;
    this.targetProgress = 0;
    this.isDetailMode = false;
    this.focusedIndex = -1;

    // Tham số xoay kéo chuột tự do
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.orbitOffset = { x: 0, y: 0 };
    this.targetOrbitOffset = { x: 0, y: 0 };

    this.setupEvents();
  }

  setupEvents() {
    // 1. Lăn chuột mượt mà không giật cục (Continuous Inertial Wheel)
    this.onWheel = (e) => {
      if (this.isDetailMode) return;
      // Tích lũy gia tốc cuộn mượt
      this.targetProgress += e.deltaY * 0.0018;
      const maxProgress = Math.max(0, this.landmarks.length - 1);
      this.targetProgress = Math.max(0, Math.min(maxProgress, this.targetProgress));
    };
    window.addEventListener('wheel', this.onWheel, { passive: true });

    // 2. Kéo chuột để ngắm cảnh xung quanh
    this.onMouseDown = (e) => {
      if (e.target.closest('#app button, #app a, .farm-modal')) return;
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    this.onMouseMove = (e) => {
      if (!this.isDragging || this.isDetailMode) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetOrbitOffset.x += deltaX * 0.004;
      this.targetOrbitOffset.y = Math.max(-0.4, Math.min(0.4, this.targetOrbitOffset.y + deltaY * 0.003));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    this.onMouseUp = () => {
      this.isDragging = false;
    };

    window.addEventListener('pointerdown', this.onMouseDown);
    window.addEventListener('pointermove', this.onMouseMove);
    window.addEventListener('pointerup', this.onMouseUp);

    // 3. Phím bấm điều hướng bàn phím tiện lợi
    window.addEventListener('keydown', (e) => {
      if (this.isDetailMode && e.key === 'Escape') {
        this.returnToOverview();
      } else if (!this.isDetailMode) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          this.targetProgress = Math.min(this.landmarks.length - 1, Math.round(this.targetProgress + 1));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          this.targetProgress = Math.max(0, Math.round(this.targetProgress - 1));
        }
      }
    });
  }

  focusOnLandmark(index) {
    if (this.isDetailMode || index < 0 || index >= this.landmarks.length) return;
    this.isDetailMode = true;
    this.focusedIndex = index;
    const target = this.landmarks[index];

    // Vị trí camera cận cảnh công trình nông trại
    const targetCamPos = new THREE.Vector3(
      target.position.x,
      target.position.y + 3.2,
      target.position.z + 5.8
    );

    gsap.to(this.camera.position, {
      x: targetCamPos.x,
      y: targetCamPos.y,
      z: targetCamPos.z,
      duration: 1.0,
      ease: 'power3.inOut'
    });

    this.onSelectLandmark(target.project, index);
  }

  returnToOverview() {
    if (!this.isDetailMode) return;
    this.isDetailMode = false;
    this.focusedIndex = -1;

    this.onReturnOverview();
  }

  update(delta) {
    if (this.isDetailMode) return;

    // 1. Nội suy mượt mà (Lerp) tiến trình cuộn
    this.currentProgress += (this.targetProgress - this.currentProgress) * 0.08;

    // 2. Nội suy xoay chuột tự do
    this.orbitOffset.x += (this.targetOrbitOffset.x - this.orbitOffset.x) * 0.1;
    this.orbitOffset.y += (this.targetOrbitOffset.y - this.orbitOffset.y) * 0.1;

    // 3. Tính toán vị trí camera dọc theo cung đường nông trại
    const p = this.currentProgress;
    const i = Math.floor(p);
    const fraction = p - i;

    const currentTarget = this.landmarks[i] || this.landmarks[0];
    const nextTarget = this.landmarks[Math.min(this.landmarks.length - 1, i + 1)] || currentTarget;

    if (currentTarget && nextTarget) {
      // Nội suy tọa độ mục tiêu cần nhìn
      const lookAtX = THREE.MathUtils.lerp(currentTarget.position.x, nextTarget.position.x, fraction);
      const lookAtY = THREE.MathUtils.lerp(currentTarget.position.y + 1.8, nextTarget.position.y + 1.8, fraction);
      const lookAtZ = THREE.MathUtils.lerp(currentTarget.position.z, nextTarget.position.z, fraction);

      // Camera lướt cao hơn phía sau một chút để có tầm nhìn bao quát đẹp mắt
      const camTargetX = lookAtX + Math.sin(this.orbitOffset.x) * 11;
      const camTargetY = 5.2 + this.orbitOffset.y * 5;
      const camTargetZ = lookAtZ + Math.cos(this.orbitOffset.x) * 11;

      this.camera.position.x += (camTargetX - this.camera.position.x) * 0.08;
      this.camera.position.y += (camTargetY - this.camera.position.y) * 0.08;
      this.camera.position.z += (camTargetZ - this.camera.position.z) * 0.08;

      this.camera.lookAt(lookAtX, lookAtY, lookAtZ);
    }
  }

  destroy() {
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('pointerdown', this.onMouseDown);
    window.removeEventListener('pointermove', this.onMouseMove);
    window.removeEventListener('pointerup', this.onMouseUp);
  }
}
