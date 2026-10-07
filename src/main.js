import { SceneManager } from './core/SceneManager.js';
import { Lighting } from './core/Lighting.js';
import { MangaEnvironment } from './core/MangaEnvironment.js';

// Khởi tạo Canvas và SceneManager
const canvas = document.getElementById('webgl-canvas');
export const sceneManager = new SceneManager(canvas);

// Khởi tạo Ánh sáng và Môi trường Manga
export const lighting = new Lighting(sceneManager.scene);
export const environment = new MangaEnvironment(sceneManager.scene);

// Đăng ký update loop
sceneManager.onUpdate((delta, time) => {
  environment.update(delta, time);
});

console.log('Three.js Scene & Manga Environment ready!');
