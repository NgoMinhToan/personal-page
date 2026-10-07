import * as THREE from 'three';

export class FarmInteractionManager {
  constructor(camera, gridManager) {
    this.camera = camera;
    this.gridManager = gridManager;

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
      // Tránh click khi bấm vào nút thanh điều hướng
      if (e.target.closest('#app button, #app a')) return;

      this.checkClick();
    };

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerdown', this.onPointerDown);
  }

  checkHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // 1. KHI Ở CHẾ ĐỘ PHÓNG TO CHI TIẾT (DETAIL MODE)
    if (this.gridManager.isDetailMode && this.gridManager.activeBoard) {
      const activeBoard = this.gridManager.activeBoard;
      const intersects = this.raycaster.intersectObject(activeBoard.surfaceMesh, false);

      if (intersects.length > 0) {
        const uv = intersects[0].uv;
        const btn = activeBoard.getButtonAtUV(uv);
        activeBoard.setDetailHoveredButton(btn);
        document.body.style.cursor = btn ? 'pointer' : 'default';
      } else {
        activeBoard.setDetailHoveredButton(null);
        document.body.style.cursor = 'default';
      }
      return;
    }

    // 2. KHI Ở CHẾ ĐỘ LƯỚI 2X2 (GRID MODE)
    const meshes = [];
    this.gridManager.boards.forEach((board) => {
      if (board.visible && board.surfaceMesh) {
        meshes.push(board.surfaceMesh);
      }
    });

    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      const board = hitObj.userData.parentBoard || hitObj.userData.parentSign;

      if (board) {
        if (this.hoveredBoard !== board) {
          if (this.hoveredBoard) this.hoveredBoard.setHover(false);
          this.hoveredBoard = board;
          this.hoveredBoard.setHover(true);
          document.body.style.cursor = 'pointer';
        }
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
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // 1. KHI ĐANG PHÓNG TO TOÀN MÀN HÌNH
    if (this.gridManager.isDetailMode && this.gridManager.activeBoard) {
      const activeBoard = this.gridManager.activeBoard;
      const intersects = this.raycaster.intersectObject(activeBoard.surfaceMesh, false);

      if (intersects.length > 0) {
        const uv = intersects[0].uv;
        const btn = activeBoard.getButtonAtUV(uv);

        if (btn === 'back') {
          this.gridManager.returnToGrid();
        } else if (btn === 'demo') {
          if (activeBoard.project.demoUrl) {
            window.open(activeBoard.project.demoUrl, '_blank', 'noopener,noreferrer');
          }
        } else if (btn === 'github') {
          if (activeBoard.project.githubUrl) {
            window.open(activeBoard.project.githubUrl, '_blank', 'noopener,noreferrer');
          }
        }
      } else {
        // Bấm ra ngoài khoảng bảng -> cũng quay về lưới 2x2
        this.gridManager.returnToGrid();
      }
      return;
    }

    // 2. KHI ĐANG Ở LƯỚI 2X2 -> BẤM VÀO BẢNG ĐỂ PHÓNG TO
    const meshes = [];
    this.gridManager.boards.forEach((board) => {
      if (board.visible && board.surfaceMesh) {
        meshes.push(board.surfaceMesh);
      }
    });

    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      const board = hitObj.userData.parentBoard || hitObj.userData.parentSign;
      if (board) {
        this.gridManager.focusOnBoard(board);
      }
    }
  }

  destroy() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerdown', this.onPointerDown);
  }
}
