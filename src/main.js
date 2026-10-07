import * as THREE from 'three';
import { SceneManager } from './core/SceneManager.js';
import { Lighting } from './core/Lighting.js';
import { FarmEnvironment } from './core/FarmEnvironment.js';
import { FarmGridParallaxManager } from './controllers/FarmGridParallaxManager.js';
import { FarmInteractionManager } from './controllers/FarmInteractionManager.js';
import { FarmHUD } from './ui/FarmHUD.js';
import { portfolioData } from './data/portfolioData.js';

// 1. Khởi tạo Three.js Engine
const canvas = document.getElementById('webgl-canvas');
export const sceneManager = new SceneManager(canvas);
export const lighting = new Lighting(sceneManager.scene);
export const environment = new FarmEnvironment(sceneManager.scene);

// 2. Map kỹ năng công nghệ
const skillsMap = new Map(portfolioData.skills.map((s) => [s.id, s]));

// 3. UI Containers
const farmHudEl = document.getElementById('farm-hud');
const farmModalEl = document.getElementById('farm-modal');
if (farmModalEl) farmModalEl.style.display = 'none';

// 4. Khởi tạo Bộ Quản lý Lưới 2x2 & Parallax Chiều Sâu 3D
export const gridManager = new FarmGridParallaxManager(
  sceneManager.scene,
  sceneManager.camera,
  portfolioData.projects
);

// 5. Khởi tạo Bộ tương tác Raycaster (Hover sáng bảng, Click phóng to lấp đầy màn hình, bấm nút ngay trên bảng)
export const interactionManager = new FarmInteractionManager(
  sceneManager.camera,
  gridManager
);

// 7. Khởi tạo Farm HUD (Logo, Bộ lọc Kỹ Năng, Đã bỏ số page bên dưới)
export const farmHUD = new FarmHUD(
  farmHudEl,
  portfolioData.skills,
  portfolioData.projects,
  {
    onSelectSkill: (skillId) => {
      gridManager.scrollToSkill(skillId);
    }
  }
);

// 8. Vòng lặp Render 60fps
sceneManager.onUpdate((delta, time) => {
  // Cập nhật môi trường (mây trôi, phấn hoa bay, parallax đồi cỏ)
  environment.update(delta, time, gridManager.currentScrollY);

  // Cập nhật lưới 2x2, scroll nội suy mượt và 16 model 3D parallax chiều sâu
  gridManager.update(delta, time);
});

console.log('🌾 Creative Farm 3D Portfolio (2x2 Grid + Depth Parallax) initialized successfully!');
