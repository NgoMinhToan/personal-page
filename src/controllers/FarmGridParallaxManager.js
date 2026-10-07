import * as THREE from 'three';
import gsap from 'gsap';
import { FarmBoard } from '../entities/FarmBoard.js';
import { FarmAssetBuilder } from '../entities/FarmAssetBuilder.js';

export class FarmGridParallaxManager {
  constructor(scene, camera, projects, options = {}) {
    this.scene = scene;
    this.camera = camera;
    this.projects = projects;
    this.onSelectProject = options.onSelectProject || (() => {});
    this.onReturnGrid = options.onReturnGrid || (() => {});

    // Trạng thái cuộn mượt (Inertial Lerp Scroll)
    this.currentScrollY = 0;
    this.targetScrollY = 0;
    this.isDetailMode = false;
    this.activeBoard = null;

    // Chuột tương tác 3D Parallax Tilt
    this.mouse = { x: 0, y: 0 };
    this.cameraBasePos = new THREE.Vector3(0, 0, 11.5);

    // Nhóm chứa trong 3D Scene
    this.boardsGroup = new THREE.Group();
    this.modelsGroup = new THREE.Group();
    this.scene.add(this.modelsGroup);
    this.scene.add(this.boardsGroup);

    this.boards = [];
    this.models = [];

    // Cấu hình kích thước Lưới 2x2
    this.columnX = 2.55; // Cột trái: -2.55, Cột phải: +2.55
    this.rowHeight = 3.15; // Khoảng cách giữa các hàng
    this.startY = 1.6; // Hàng đầu tiên ở Y = 1.6, Hàng thứ hai ở Y = -1.55 (chiếu ngay giữa màn hình)

    const totalRows = Math.ceil(this.projects.length / 2);
    // Cho phép cuộn tới hàng cuối cùng
    this.maxScrollY = Math.max(0, (totalRows - 2) * this.rowHeight);

    this.initGridAndModels();
    this.setupEventListeners();
  }

  initGridAndModels() {
    // Tọa độ bài trí cho 16 model 3D hoạt ảnh nông trại rải rác khắp không gian 3D
    // (Bên trái, bên phải, ở giữa khe 2 cột, và các tầng sâu Z khác nhau)
    const modelLayouts = [
      { x: -6.0, y: 1.6,  z: -4.5, scale: 1.05 }, // 0: Cối xay gió (Flank trái tầng 1)
      { x: 6.0,  y: 1.4,  z: -4.0, scale: 1.10 }, // 1: Vườn táo (Flank phải tầng 1)
      { x: 0.0,  y: -0.2, z: -3.5, scale: 0.95 }, // 2: Luống rau củ (Giữa khe cột 1 & 2)
      { x: -5.7, y: -1.7, z: -5.5, scale: 1.00 }, // 3: Giếng nước (Flank trái tầng 2)
      { x: 5.8,  y: -4.6, z: -4.5, scale: 1.05 }, // 4: Xe kéo rơm (Flank phải tầng 3)
      { x: 0.0,  y: -3.4, z: -3.8, scale: 1.00 }, // 5: Lửa trại (Giữa khe tầng 2 & 3)
      { x: -6.4, y: -7.6, z: -7.0, scale: 1.20 }, // 6: Nhà kho đỏ (Sâu bên trái tầng 4)
      { x: 6.1,  y: -8.0, z: -4.5, scale: 1.05 }, // 7: Tổ ong (Flank phải tầng 4)
      { x: -0.2, y: -6.5, z: -4.0, scale: 1.05 }, // 8: Cừu trắng (Giữa khe tầng 3 & 4)
      { x: 6.2,  y:-11.0, z: -6.0, scale: 1.05 }, // 9: Máy cày cổ điển (Flank phải tầng 5)
      { x: -6.2, y:-11.2, z: -6.5, scale: 1.15 }, // 10: Nhà kính thực vật (Flank trái tầng 5)
      { x: 6.3,  y:-14.2, z: -4.5, scale: 1.05 }, // 11: Hoa hướng dương (Flank phải tầng 6)
      { x: 0.0,  y:-12.8, z: -4.0, scale: 1.00 }, // 12: Bù nhìn rơm (Giữa khe tầng 5 & 6)
      { x: -6.4, y:-17.2, z: -7.0, scale: 1.15 }, // 13: Cối guồng nước (Flank trái tầng 7)
      { x: 6.5,  y:-17.5, z: -8.0, scale: 1.25 }, // 14: Tháp ngũ cốc (Flank phải tầng 7)
      { x: 0.0,  y:-16.0, z: -4.2, scale: 1.10 }  // 15: Hồ vịt hoa súng (Giữa khe tầng 7 & 8)
    ];

    this.projects.forEach((project, index) => {
      // 1. Vị trí bảng trong Lưới 2x2
      const row = Math.floor(index / 2);
      const col = index % 2; // 0: Trái, 1: Phải

      const boardX = col === 0 ? -this.columnX : this.columnX;
      const boardY = this.startY - row * this.rowHeight;
      const boardZ = 0;

      const board = new FarmBoard(project, index);
      board.baseY = boardY;
      board.baseX = boardX;
      board.baseZ = boardZ;
      board.position.set(boardX, boardY, boardZ);

      this.boardsGroup.add(board);
      this.boards.push(board);

      // 2. Tạo Model 3D Asset Nông Trại Động ở Layer phía sau (Background Parallax Depth)
      const layout = modelLayouts[index] || {
        x: (index % 2 === 0 ? -5.5 : 5.5),
        y: boardY,
        z: -5.0,
        scale: 1.0
      };

      const model = FarmAssetBuilder.buildAsset(project.farmType);
      model.baseX = layout.x;
      model.baseY = layout.y;
      model.baseZ = layout.z;
      // Parallax factor: Model càng sâu (z âm nhiều) thì cuộn càng chậm, tạo hiệu ứng chiều sâu 3D thực thụ
      model.parallaxFactor = Math.max(0.32, 1.0 - Math.abs(layout.z) * 0.075);

      model.position.set(layout.x, layout.y, layout.z);
      model.scale.setScalar(layout.scale);

      this.modelsGroup.add(model);
      this.models.push(model);

      // Liên kết chéo giữa Board và Model để hover đồng bộ
      board.associatedModel = model;
      model.associatedBoard = board;
    });
  }

  setupEventListeners() {
    // 1. Cuộn chuột mượt mà (Continuous Lerp Scroll)
    this.onWheel = (e) => {
      if (this.isDetailMode) return;
      // Tích lũy delta cuộn chuột
      const scrollSensitivity = 0.0055;
      this.targetScrollY += e.deltaY * scrollSensitivity;
      this.targetScrollY = Math.max(0, Math.min(this.maxScrollY, this.targetScrollY));
    };
    window.addEventListener('wheel', this.onWheel, { passive: true });

    // 2. Chuyển động con trỏ chuột tạo Parallax Tilt 3D
    this.onMouseMove = (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', this.onMouseMove);

    // 3. Phím mũi tên hỗ trợ cuộn từng hàng
    this.onKeyDown = (e) => {
      if (this.isDetailMode) {
        if (e.key === 'Escape') {
          this.returnToGrid();
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        this.targetScrollY = Math.min(this.maxScrollY, this.targetScrollY + this.rowHeight);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        this.targetScrollY = Math.max(0, this.targetScrollY - this.rowHeight);
      } else if (e.key === 'Home') {
        this.targetScrollY = 0;
      } else if (e.key === 'End') {
        this.targetScrollY = this.maxScrollY;
      }
    };
    window.addEventListener('keydown', this.onKeyDown);

    // 4. Touch swipe cho thiết bị di động
    let touchStartY = 0;
    this.onTouchStart = (e) => {
      if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
    };
    this.onTouchMove = (e) => {
      if (this.isDetailMode || e.touches.length === 0) return;
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 0.015;
      touchStartY = touchY;
      this.targetScrollY += deltaY;
      this.targetScrollY = Math.max(0, Math.min(this.maxScrollY, this.targetScrollY));
    };
    window.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
  }

  update(delta, time) {
    // 1. Cập nhật vị trí cuộn nội suy mượt (Lerp Damping 60fps)
    if (!this.isDetailMode) {
      this.currentScrollY += (this.targetScrollY - this.currentScrollY) * 0.085;
    }

    // 2. Cập nhật vị trí Lưới 2x2 của các Bảng gỗ phía trước (Speed factor 1.0)
    this.boards.forEach((board) => {
      if (!this.isDetailMode || board !== this.activeBoard) {
        board.position.y = board.baseY + this.currentScrollY;
      }
      board.update(delta, time);
    });

    // 3. Cập nhật vị trí Parallax Chiều Sâu của các Model 3D phía sau (Speed factor theo độ sâu Z)
    this.models.forEach((model) => {
      model.position.y = model.baseY + (this.currentScrollY * model.parallaxFactor);
      if (model.update) {
        model.update(delta, time);
      }
    });

    // 4. Parallax Camera theo hướng nhìn chuột (Subtle 3D Tilt)
    if (!this.isDetailMode) {
      const targetCamX = this.mouse.x * 0.75;
      const targetCamY = this.cameraBasePos.y + this.mouse.y * 0.45;

      this.camera.position.x += (targetCamX - this.camera.position.x) * 0.05;
      this.camera.position.y += (targetCamY - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.mouse.x * 0.2, 0, 0);
    }
  }

  focusOnBoard(board) {
    if (this.isDetailMode) return;
    this.isDetailMode = true;
    this.activeBoard = board;
    board.isDetailMode = true;

    // Lưu lại vị trí trước khi zoom
    board.preZoomPos = board.position.clone();
    board.preZoomRot = board.rotation.clone();

    // 1. Phóng to bảng ra chính giữa màn hình với góc nhìn cận cảnh
    gsap.to(board.position, {
      x: 0,
      y: 0,
      z: 4.2,
      duration: 0.65,
      ease: 'power3.out'
    });
    gsap.to(board.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.65,
      ease: 'power3.out'
    });

    // 2. Làm mờ nhẹ các bảng khác
    this.boards.forEach((b) => {
      if (b !== board) {
        gsap.to(b.position, {
          z: -4.0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // 3. Nếu có model tương ứng, đẩy model ra vị trí phụ cận đẹp mắt
    if (board.associatedModel) {
      board.associatedModel.preZoomPos = board.associatedModel.position.clone();
      gsap.to(board.associatedModel.position, {
        x: -4.2,
        y: 0,
        z: 1.0,
        duration: 0.65,
        ease: 'power3.out'
      });
      if (board.associatedModel.onHover) {
        board.associatedModel.onHover(true);
      }
    }

    this.onSelectProject(board.project);
  }

  returnToGrid() {
    if (!this.isDetailMode || !this.activeBoard) return;
    const board = this.activeBoard;

    // 1. Thu nhỏ bảng trở lại vị trí lưới 2x2 ban đầu
    const targetY = board.baseY + this.currentScrollY;
    gsap.to(board.position, {
      x: board.baseX,
      y: targetY,
      z: board.baseZ,
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        board.isDetailMode = false;
        this.isDetailMode = false;
        this.activeBoard = null;
      }
    });

    // 2. Đưa các bảng khác trở lại độ sâu bình thường
    this.boards.forEach((b) => {
      if (b !== board) {
        gsap.to(b.position, {
          z: b.baseZ,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // 3. Đưa model nông trại trở lại vị trí nền ban đầu
    if (board.associatedModel && board.associatedModel.preZoomPos) {
      const modelTargetY = board.associatedModel.baseY + (this.currentScrollY * board.associatedModel.parallaxFactor);
      gsap.to(board.associatedModel.position, {
        x: board.associatedModel.baseX,
        y: modelTargetY,
        z: board.associatedModel.baseZ,
        duration: 0.55,
        ease: 'power3.inOut'
      });
      if (board.associatedModel.onHover) {
        board.associatedModel.onHover(false);
      }
    }

    this.onReturnGrid();
  }

  scrollToSkill(skillId) {
    if (this.isDetailMode) {
      this.returnToGrid();
    }

    this.boards.forEach((board) => {
      const matches = skillId === 'all' || (board.project.skills && board.project.skills.includes(skillId));
      board.visible = true;
      if (matches && skillId !== 'all') {
        board.setHover(true);
      } else {
        board.setHover(false);
      }
    });

    // Tìm dự án đầu tiên khớp để cuộn mượt tới đó
    const firstMatchIdx = this.boards.findIndex((b) => {
      return skillId === 'all' || (b.project.skills && b.project.skills.includes(skillId));
    });

    if (firstMatchIdx !== -1) {
      const targetRow = Math.floor(firstMatchIdx / 2);
      this.targetScrollY = Math.min(this.maxScrollY, Math.max(0, targetRow * this.rowHeight));
    }
  }

  destroy() {
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
  }
}
