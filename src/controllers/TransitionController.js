import gsap from 'gsap';

export class TransitionController {
  constructor(scrollManager, options = {}) {
    this.scrollManager = scrollManager;
    this.onDetailOpen = options.onDetailOpen || (() => {});
    this.onDetailClose = options.onDetailClose || (() => {});

    this.activeBoard = null;
    this.activeSide = 'left';
    this.isAnimating = false;
  }

  expandToDetail(board, side = 'left') {
    if (this.isAnimating || this.scrollManager.isDetailMode) return;
    this.isAnimating = true;
    this.activeBoard = board;
    this.activeSide = side;

    this.scrollManager.isDetailMode = true;
    board.isDetailMode = true;

    // Tắt hover phát sáng để giữ ánh sáng ổn định
    board.setHover(false);

    const tl = gsap.timeline({
      onComplete: () => {
        this.isAnimating = false;
        this.onDetailOpen(board.project, side);
      }
    });

    // 1. Vị trí đích khi phóng to lớn:
    // Nếu side === 'left': Bảng 3D nằm bên Trái (-3.2, 0, 4.2)
    // Nếu side === 'right': Bảng 3D nằm bên Phải (+3.2, 0, 4.2)
    const targetX = side === 'left' ? -3.0 : 3.0;

    tl.to(board.position, {
      x: targetX,
      y: 0,
      z: 4.0,
      duration: 0.55,
      ease: 'power3.inOut'
    }, 0);

    tl.to(board.scale, {
      x: 1.5,
      y: 1.5,
      duration: 0.55,
      ease: 'power3.inOut'
    }, 0);

    tl.to(board.rotation, {
      x: 0,
      y: side === 'left' ? 0.08 : -0.08, // Góc nghiêng nhẹ hướng vào giữa màn hình
      duration: 0.55,
      ease: 'power3.out'
    }, 0);

    // 2. Các bảng còn lại trượt mờ ra ngoài màn hình
    const otherBoards = this.scrollManager.boards.filter(b => b !== board);
    tl.to(otherBoards.map(b => b.scale), {
      x: 0.1,
      y: 0.1,
      duration: 0.4,
      ease: 'power2.in'
    }, 0);

    tl.to(otherBoards.map((b, i) => b.position), {
      y: (i) => (b.position.y >= 0 ? 8 : -8),
      x: (i) => (b.position.x >= 0 ? 8 : -8),
      duration: 0.45,
      ease: 'power2.in'
    }, 0);
  }

  shrinkToGrid() {
    if (this.isAnimating || !this.scrollManager.isDetailMode || !this.activeBoard) return;
    this.isAnimating = true;

    this.onDetailClose();

    const tl = gsap.timeline({
      onComplete: () => {
        this.scrollManager.isDetailMode = false;
        if (this.activeBoard) {
          this.activeBoard.isDetailMode = false;
        }
        this.activeBoard = null;
        this.isAnimating = false;
      }
    });

    // 1. Đưa bảng đang chọn bay về vị trí gốc ban đầu trong lưới 2x2
    const origPos = this.activeBoard.originalPosition;
    tl.to(this.activeBoard.position, {
      x: origPos.x,
      y: origPos.y,
      z: origPos.z,
      duration: 0.5,
      ease: 'power3.out'
    }, 0);

    tl.to(this.activeBoard.scale, {
      x: 1,
      y: 1,
      duration: 0.5,
      ease: 'power3.out'
    }, 0);

    tl.to(this.activeBoard.rotation, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, 0);

    // 2. Đưa các bảng còn lại trượt trở lại vị trí gốc trong lưới
    const otherBoards = this.scrollManager.boards.filter(b => b !== this.activeBoard);

    tl.to(otherBoards.map(b => b.position), {
      x: (i, target) => target.originalPosition.x,
      y: (i, target) => target.originalPosition.y,
      z: (i, target) => target.originalPosition.z,
      duration: 0.48,
      ease: 'power2.out',
      stagger: 0.03
    }, 0.08);

    tl.to(otherBoards.map(b => b.scale), {
      x: 1,
      y: 1,
      duration: 0.48,
      ease: 'back.out(1.2)',
      stagger: 0.03
    }, 0.08);
  }
}
