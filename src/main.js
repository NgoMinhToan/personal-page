import * as THREE from 'three';
import { SceneManager } from './core/SceneManager.js';
import { Lighting } from './core/Lighting.js';
import { FarmEnvironment } from './core/FarmEnvironment.js';
import { FarmSignpost } from './entities/FarmSignpost.js';
import { FarmCameraController } from './controllers/FarmCameraController.js';
import { FarmInteractionManager } from './controllers/FarmInteractionManager.js';
import { FarmDetailModal } from './ui/FarmDetailModal.js';
import { FarmHUD } from './ui/FarmHUD.js';
import { portfolioData } from './data/portfolioData.js';

// 1. Khởi tạo Three.js Engine
const canvas = document.getElementById('webgl-canvas');
export const sceneManager = new SceneManager(canvas);
export const lighting = new Lighting(sceneManager.scene);
export const environment = new FarmEnvironment(sceneManager.scene);

// 2. Map kỹ năng
const skillsMap = new Map(portfolioData.skills.map(s => [s.id, s]));

// 3. Bố trí các trạm nông trại dọc theo cung đường thơ mộng
const landmarkCoordinates = [
  { x: -7.5, y: -1.0, z: 7.0 },   // 0: Cối xay gió
  { x: -0.5, y: -1.0, z: 2.5 },   // 1: Vườn táo
  { x: 6.5,  y: -1.0, z: -1.8 },  // 2: Luống rau củ quả
  { x: 1.0,  y: -1.0, z: -7.0 },  // 3: Giếng nước cổ tích
  { x: -6.5, y: -1.0, z: -11.5 }, // 4: Xe kéo chở rơm
  { x: 2.5,  y: -1.0, z: -16.5 }  // 5: Lửa trại & Lều
];

const signpostsGroup = new THREE.Group();
sceneManager.scene.add(signpostsGroup);

export const signposts = [];

portfolioData.projects.forEach((project, index) => {
  const coord = landmarkCoordinates[index] || {
    x: (index - 2) * 4,
    y: -1.0,
    z: -index * 4
  };

  const sign = new FarmSignpost(project, index);
  sign.position.set(coord.x, coord.y, coord.z);
  signpostsGroup.add(sign);
  signposts.push(sign);
});

// 4. UI Containers
const farmModalEl = document.getElementById('farm-modal');
const farmHudEl = document.getElementById('farm-hud');

// 5. Khởi tạo Modal Chi Tiết (Có nút quay lui to rõ ràng)
export const detailModal = new FarmDetailModal(farmModalEl, {
  skillsMap,
  onBack: () => {
    cameraController.returnToOverview();
  }
});

// 6. Khởi tạo Bộ điều khiển Camera Nông trại Mượt mà (Continuous Lerp Scroll)
export const cameraController = new FarmCameraController(
  sceneManager.camera,
  signposts,
  {
    onSelectLandmark: (project) => {
      detailModal.show(project);
    },
    onReturnOverview: () => {
      detailModal.hide();
    }
  }
);

// 7. Khởi tạo Bộ bắt tương tác Chuột (Raycaster Hover & Click)
export const interactionManager = new FarmInteractionManager(
  sceneManager.camera,
  signposts,
  (clickedSign) => {
    const index = signposts.indexOf(clickedSign);
    cameraController.focusOnLandmark(index);
  }
);

// 8. Khởi tạo Farm HUD (Bỏ hoàn toàn số page bên dưới)
export const farmHUD = new FarmHUD(
  farmHudEl,
  portfolioData.skills,
  portfolioData.projects,
  {
    onSelectSkill: (skillId) => {
      if (cameraController.isDetailMode) {
        cameraController.returnToOverview();
      }

      // Khi lọc theo skill, highlight các công trình khớp và focus vào công trình đầu tiên
      signposts.forEach((sign, idx) => {
        const matches = skillId === 'all' || (sign.project.skills && sign.project.skills.includes(skillId));
        sign.visible = matches;
        if (matches && (skillId !== 'all')) {
          sign.setHover(true);
        } else {
          sign.setHover(false);
        }
      });

      // Lướt camera tới công trình đầu tiên khớp với skill
      const firstMatchingIndex = signposts.findIndex(s => s.visible);
      if (firstMatchingIndex !== -1) {
        cameraController.targetProgress = firstMatchingIndex;
      }
    }
  }
);

// 9. Vòng lặp Render 60fps
sceneManager.onUpdate((delta, time) => {
  // Cập nhật môi trường (mây trôi, phấn hoa bay, cây đung đưa)
  environment.update(delta, time);

  // Cập nhật hoạt ảnh lơ lửng và động cơ 3D nông trại
  signposts.forEach((sign) => {
    sign.update(delta, time);
  });

  // Cập nhật chuyển động camera lướt êm ái
  cameraController.update(delta);
});

console.log('🌾 Creative Farm 3D Portfolio initialized successfully!');
