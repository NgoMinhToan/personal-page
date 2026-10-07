import * as THREE from 'three';
import gsap from 'gsap';
import { MangaBoard } from '../entities/MangaBoard.js';

export class SnapScrollManager {
  constructor(scene, camera, projects, options = {}) {
    this.scene = scene;
    this.camera = camera;
    this.allProjects = projects;
    this.filteredProjects = [...projects];

    this.onPageChange = options.onPageChange || (() => {});
    this.onBoardClick = options.onBoardClick || (() => {});

    this.currentPage = 0;
    this.pageSize = 4; // Luôn hiển thị 4 bảng theo lưới 2x2
    this.isTransitioning = false;
    this.isDetailMode = false;

    // Khoảng cách bố trí lưới 2x2
    this.dx = 2.45;
    this.dy = 1.95;

    // Vị trí 4 slot trong lưới 2x2
    this.gridSlots = [
      { x: -this.dx, y: this.dy, z: 0 },  // 0: Top-Left
      { x: this.dx, y: this.dy, z: 0 },   // 1: Top-Right
      { x: -this.dx, y: -this.dy, z: 0 }, // 2: Bottom-Left
      { x: this.dx, y: -this.dy, z: 0 }   // 3: Bottom-Right
    ];

    // Tạo nhóm chứa các bảng hiện tại và mảng các MangaBoard instance
    this.boardGroup = new THREE.Group();
    this.scene.add(this.boardGroup);
    this.boards = [];

    this.initBoards();
    this.setupEventListeners();
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredProjects.length / this.pageSize));
  }

  initBoards() {
    // Xóa các bảng cũ nếu có
    while (this.boardGroup.children.length > 0) {
      this.boardGroup.remove(this.boardGroup.children[0]);
    }
    this.boards = [];

    const pageProjects = this.getCurrentPageProjects();

    for (let i = 0; i < 4; i++) {
      // Nếu trang hiện tại ít hơn 4 dự án, dùng dự án lặp vòng hoặc fallback
      const project = pageProjects[i] || this.filteredProjects[i % this.filteredProjects.length] || {
        id: `empty-${i}`,
        vol: `VOL. 0${i + 1}`,
        title: 'Coming Soon',
        subtitle: 'In Development',
        description: 'Dự án đang trong quá trình phát triển.',
        skills: ['threejs'],
        demoUrl: '#',
        accentColor: '#64748b'
      };

      const slot = this.gridSlots[i];
      const board = new MangaBoard(project, i);
      board.position.set(slot.x, slot.y, slot.z);
      board.originalPosition.set(slot.x, slot.y, slot.z);
      board.originalRotation.set(0, 0, 0);
      board.originalScale.set(1, 1, 1);

      this.boardGroup.add(board);
      this.boards.push(board);
    }

    this.onPageChange(this.currentPage, this.totalPages);
  }

  getCurrentPageProjects() {
    const start = this.currentPage * this.pageSize;
    return this.filteredProjects.slice(start, start + this.pageSize);
  }

  setupEventListeners() {
    // 1. Wheel scroll với debounce
    this.handleWheel = (e) => {
      if (this.isTransitioning || this.isDetailMode) return;

      const threshold = 35;
      if (e.deltaY > threshold) {
        this.nextPage();
      } else if (e.deltaY < -threshold) {
        this.prevPage();
      }
    };
    window.addEventListener('wheel', this.handleWheel, { passive: true });

    // 2. Touch swipe cho thiết bị di động
    let touchStartY = 0;
    this.handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    this.handleTouchEnd = (e) => {
      if (this.isTransitioning || this.isDetailMode) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (diff > 50) {
        this.nextPage();
      } else if (diff < -50) {
        this.prevPage();
      }
    };
    window.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    window.addEventListener('touchend', this.handleTouchEnd, { passive: true });
  }

  nextPage() {
    if (this.isTransitioning || this.currentPage >= this.totalPages - 1) return;
    this.isTransitioning = true;
    this.currentPage++;

    const newProjects = this.getCurrentPageProjects();

    // Hoạt ảnh cuộn khớp chính xác theo yêu cầu:
    // Hàng trên (board 0 & 1) trượt ra ngoài với easeOut
    // Hàng dưới (board 2 & 3) trượt lên và các bảng mới trượt vào với easeIn
    const tl = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false;
        this.onPageChange(this.currentPage, this.totalPages);
      }
    });

    // 1. Hàng trên (0 & 1) trượt lên trên và mờ dần (easeOut)
    tl.to([this.boards[0].position, this.boards[1].position], {
      y: '+=3.5',
      duration: 0.38,
      ease: 'power2.out'
    }, 0);

    // 2. Toàn bộ bảng mờ nhẹ trong lúc chuyển
    tl.to(this.boards.map(b => b.scale), {
      x: 0.92,
      y: 0.92,
      duration: 0.25,
      ease: 'power1.out'
    }, 0);

    // 3. Cập nhật dữ liệu dự án của trang mới và đưa vị trí bảng mới trượt từ dưới lên (easeIn)
    tl.call(() => {
      for (let i = 0; i < 4; i++) {
        const proj = newProjects[i] || this.filteredProjects[i % this.filteredProjects.length];
        this.boards[i].updateProject(proj);
        const slot = this.gridSlots[i];
        // Bắt đầu từ phía dưới
        this.boards[i].position.set(slot.x, slot.y - 4.0, slot.z);
      }
    });

    // 4. Các bảng dưới trượt vào vị trí khớp (easeIn)
    tl.to(this.boards.map((b, i) => b.position), {
      y: (i) => this.gridSlots[i].y,
      duration: 0.42,
      ease: 'power2.inOut',
      stagger: 0.04
    });

    tl.to(this.boards.map(b => b.scale), {
      x: 1,
      y: 1,
      duration: 0.35,
      ease: 'back.out(1.2)'
    }, '-=0.2');
  }

  prevPage() {
    if (this.isTransitioning || this.currentPage <= 0) return;
    this.isTransitioning = true;
    this.currentPage--;

    const newProjects = this.getCurrentPageProjects();

    const tl = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false;
        this.onPageChange(this.currentPage, this.totalPages);
      }
    });

    // Cuộn ngược lại: các bảng trượt xuống dưới (easeOut)
    tl.to(this.boards.map(b => b.position), {
      y: '-=3.5',
      duration: 0.35,
      ease: 'power2.out'
    }, 0);

    tl.call(() => {
      for (let i = 0; i < 4; i++) {
        const proj = newProjects[i] || this.filteredProjects[i % this.filteredProjects.length];
        this.boards[i].updateProject(proj);
        const slot = this.gridSlots[i];
        this.boards[i].position.set(slot.x, slot.y + 4.0, slot.z);
      }
    });

    // Trượt vào từ trên xuống
    tl.to(this.boards.map((b, i) => b.position), {
      y: (i) => this.gridSlots[i].y,
      duration: 0.42,
      ease: 'power2.inOut',
      stagger: 0.04
    });
  }

  filterBySkill(skillId) {
    if (skillId === 'all') {
      this.filteredProjects = [...this.allProjects];
    } else {
      this.filteredProjects = this.allProjects.filter(p => p.skills && p.skills.includes(skillId));
      if (this.filteredProjects.length === 0) {
        this.filteredProjects = [...this.allProjects];
      }
    }
    this.currentPage = 0;
    this.initBoards();
  }

  destroy() {
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }
}
