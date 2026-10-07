import { SceneManager } from './core/SceneManager.js';
import { Lighting } from './core/Lighting.js';
import { MangaEnvironment } from './core/MangaEnvironment.js';
import { SnapScrollManager } from './controllers/SnapScrollManager.js';
import { portfolioData } from './data/portfolioData.js';

// 1. Khởi tạo Canvas và SceneManager
const canvas = document.getElementById('webgl-canvas');
export const sceneManager = new SceneManager(canvas);

// 2. Khởi tạo Ánh sáng và Môi trường Manga
export const lighting = new Lighting(sceneManager.scene);
export const environment = new MangaEnvironment(sceneManager.scene);

// 3. Khởi tạo Bộ điều khiển Cuộn Khớp Lưới 2x2
const pageIndicatorEl = document.getElementById('page-indicator');

export const scrollManager = new SnapScrollManager(
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

// 4. Đăng ký update loop
sceneManager.onUpdate((delta, time) => {
  environment.update(delta, time);
});

console.log('SnapScrollManager initialized with 2x2 Grid!');
