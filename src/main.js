import { SceneManager } from './core/SceneManager.js';
import { Lighting } from './core/Lighting.js';
import { MangaEnvironment } from './core/MangaEnvironment.js';
import { SnapScrollManager } from './controllers/SnapScrollManager.js';
import { InteractionManager } from './controllers/InteractionManager.js';
import { TransitionController } from './controllers/TransitionController.js';
import { DetailOverlay } from './ui/DetailOverlay.js';
import { SkillFilterBar } from './ui/SkillFilterBar.js';
import { portfolioData } from './data/portfolioData.js';
import gsap from 'gsap';

// 1. Khởi tạo Three.js Engine
const canvas = document.getElementById('webgl-canvas');
const sceneManager = new SceneManager(canvas);
const lighting = new Lighting(sceneManager.scene);
const environment = new MangaEnvironment(sceneManager.scene);

// 2. Map kỹ năng để tra cứu nhanh màu sắc & tên
const skillsMap = new Map(portfolioData.skills.map(s => [s.id, s]));

// 3. UI DOM Elements
const pageIndicatorEl = document.getElementById('page-indicator');
const detailOverlayEl = document.getElementById('detail-overlay');
const skillFilterContainerEl = document.getElementById('skill-filter-container');

// 4. Khởi tạo SnapScrollManager (Lưới 2x2)
const scrollManager = new SnapScrollManager(
  sceneManager.scene,
  sceneManager.camera,
  portfolioData.projects,
  {
    onPageChange: (current, total) => {
      if (pageIndicatorEl) {
        pageIndicatorEl.textContent = `PAGE 0${current + 1} / 0${total}`;
      }
    }
  }
);

// 5. Khởi tạo DetailOverlay
let currentDetailIndex = 0;

const detailOverlay = new DetailOverlay(detailOverlayEl, {
  skillsMap,
  onBack: () => {
    transitionController.shrinkToGrid();
  }
});

// 6. Khởi tạo TransitionController (Phóng to / Thu nhỏ & Zig-Zag)
const transitionController = new TransitionController(scrollManager, {
  onDetailOpen: (project, boardSide) => {
    // Nếu bảng 3D nằm bên Trái, nội dung nằm bên Phải; và ngược lại
    const contentSide = boardSide === 'left' ? 'right' : 'left';
    detailOverlay.show(project, contentSide);
  },
  onDetailClose: () => {
    detailOverlay.hide();
  }
});

// 7. Khởi tạo InteractionManager (Raycasting Hover & Click)
const interactionManager = new InteractionManager(sceneManager.camera, scrollManager, {
  onSelectBoard: (board) => {
    currentDetailIndex = scrollManager.currentPage * 4 + board.index;
    // Quy luật Zig-Zag: Dự án chẵn bảng ở Trái (nội dung ở Phải), Dự án lẻ bảng ở Phải (nội dung ở Trái)
    const boardSide = (currentDetailIndex % 2 === 0) ? 'left' : 'right';
    transitionController.expandToDetail(board, boardSide);
  }
});

// 8. Hỗ trợ Cuộn khớp Zig-Zag ở Chế độ Chi tiết (Detail Snap Scroll)
let isDetailScrollThrottled = false;

window.addEventListener('wheel', (e) => {
  if (!scrollManager.isDetailMode || isDetailScrollThrottled) return;
  const projects = scrollManager.filteredProjects;
  if (projects.length <= 1) return;

  const threshold = 40;
  if (Math.abs(e.deltaY) > threshold) {
    isDetailScrollThrottled = true;
    setTimeout(() => { isDetailScrollThrottled = false; }, 450);

    if (e.deltaY > 0) {
      // Sang dự án tiếp theo
      currentDetailIndex = (currentDetailIndex + 1) % projects.length;
    } else {
      // Quay về dự án trước
      currentDetailIndex = (currentDetailIndex - 1 + projects.length) % projects.length;
    }

    const nextProject = projects[currentDetailIndex];
    const newBoardSide = (currentDetailIndex % 2 === 0) ? 'left' : 'right';

    // Cập nhật bảng 3D và đảo vị trí Zig-Zag
    if (transitionController.activeBoard) {
      transitionController.activeBoard.updateProject(nextProject);
      const targetX = newBoardSide === 'left' ? -3.0 : 3.0;
      const targetRotY = newBoardSide === 'left' ? 0.08 : -0.08;

      gsap.to(transitionController.activeBoard.position, {
        x: targetX,
        duration: 0.4,
        ease: 'power2.inOut'
      });
      gsap.to(transitionController.activeBoard.rotation, {
        y: targetRotY,
        duration: 0.4,
        ease: 'power2.out'
      });

    }

    // Cập nhật nội dung sang bên còn lại
    const contentSide = newBoardSide === 'left' ? 'right' : 'left';
    detailOverlay.show(nextProject, contentSide);
  }
}, { passive: true });

// 9. Khởi tạo Thanh Lọc Kỹ năng (Skill Filter Bar)
const skillFilterBar = new SkillFilterBar(
  skillFilterContainerEl,
  portfolioData.skills,
  portfolioData.projects,
  {
    onFilterChange: (skillId) => {
      if (scrollManager.isDetailMode) {
        transitionController.shrinkToGrid();
      }
      scrollManager.filterBySkill(skillId);
    }
  }
);

// 10. Đăng ký Animation Loop
sceneManager.onUpdate((delta, time) => {
  environment.update(delta, time);
});

console.log('⚡ Manga 3D Portfolio initialized successfully!');
