import * as THREE from 'three';

export class FarmInteractionManager {
  constructor(camera, signposts, onSelectSign) {
    this.camera = camera;
    this.signposts = signposts;
    this.onSelectSign = onSelectSign;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.hoveredSign = null;
    this.isEnabled = true;

    this.setupEvents();
  }

  setupEvents() {
    this.onPointerMove = (e) => {
      if (!this.isEnabled) return;
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.checkHover();
    };

    this.onPointerDown = (e) => {
      if (!this.isEnabled) return;
      // Tránh click khi bấm vào nút UI
      if (e.target.closest('#app button, #app a, .farm-modal-card')) return;

      this.checkClick();
    };

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerdown', this.onPointerDown);
  }

  getInteractiveMeshes() {
    const meshes = [];
    this.signposts.forEach((sign) => {
      if (sign.surfaceMesh) meshes.push(sign.surfaceMesh);
      if (sign.frameMesh) meshes.push(sign.frameMesh);
    });
    return meshes;
  }

  checkHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.getInteractiveMeshes();
    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      const sign = hitObj.userData.parentSign;

      if (sign) {
        if (this.hoveredSign !== sign) {
          if (this.hoveredSign) this.hoveredSign.setHover(false);
          this.hoveredSign = sign;
          this.hoveredSign.setHover(true);
          document.body.style.cursor = 'pointer';
        }
        return;
      }
    }

    if (this.hoveredSign) {
      this.hoveredSign.setHover(false);
      this.hoveredSign = null;
      document.body.style.cursor = 'default';
    }
  }

  checkClick() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.getInteractiveMeshes();
    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      const sign = hitObj.userData.parentSign;
      if (sign) {
        this.onSelectSign(sign);
      }
    }
  }

  destroy() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerdown', this.onPointerDown);
  }
}
