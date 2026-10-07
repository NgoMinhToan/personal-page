import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, scrollManager, options = {}) {
    this.camera = camera;
    this.scrollManager = scrollManager;
    this.onSelectBoard = options.onSelectBoard || (() => {});

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.hoveredBoard = null;
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
      // Tránh click khi bấm vào các nút HUD/DOM
      if (e.target.closest('#app button, #app a, .detail-overlay')) return;

      this.checkClick();
    };

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerdown', this.onPointerDown);
  }

  getInteractiveMeshes() {
    const meshes = [];
    if (!this.scrollManager || !this.scrollManager.boards) return meshes;

    for (const board of this.scrollManager.boards) {
      if (board.surfaceMesh) meshes.push(board.surfaceMesh);
      if (board.frameMesh) meshes.push(board.frameMesh);
    }
    return meshes;
  }

  checkHover() {
    if (this.scrollManager.isDetailMode) {
      if (this.hoveredBoard) {
        this.hoveredBoard.setHover(false);
        this.hoveredBoard = null;
      }
      document.body.style.cursor = 'default';
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.getInteractiveMeshes();
    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      const board = hitObj.userData.parentBoard;

      if (board) {
        if (this.hoveredBoard !== board) {
          if (this.hoveredBoard) this.hoveredBoard.setHover(false);
          this.hoveredBoard = board;
          this.hoveredBoard.setHover(true);
          document.body.style.cursor = 'pointer';
        }
        this.hoveredBoard.setTilt(this.mouse.x, this.mouse.y);
        return;
      }
    }

    if (this.hoveredBoard) {
      this.hoveredBoard.setHover(false);
      this.hoveredBoard = null;
      document.body.style.cursor = 'default';
    }
  }

  checkClick() {
    if (this.scrollManager.isDetailMode) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.getInteractiveMeshes();
    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      const board = hitObj.userData.parentBoard;
      if (board) {
        this.onSelectBoard(board);
      }
    }
  }

  destroy() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerdown', this.onPointerDown);
  }
}
