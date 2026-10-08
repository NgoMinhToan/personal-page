import { portfolioData } from './data/portfolioData.js';
import { StickyClouds } from './components/StickyClouds.js';
import { StickyBeach } from './components/StickyBeach.js';
import { SideFlanks } from './components/SideFlanks.js';
import { ScrapbookStream } from './components/ScrapbookStream.js';
import { JournalModal } from './components/JournalModal.js';
import { StationeryHUD } from './components/StationeryHUD.js';

// 1. Mây & Mặt Trời Cố Định Đỉnh (Sticky Top Clouds)
const cloudsContainer = document.getElementById('sticky-clouds-container');
export const stickyClouds = new StickyClouds();
if (cloudsContainer) {
  stickyClouds.render(cloudsContainer);
}

// 2. Bờ Biển & Sóng Biển Cố Định Đáy (Sticky Bottom Beach)
const beachContainer = document.getElementById('sticky-beach-container');
export const stickyBeach = new StickyBeach();
if (beachContainer) {
  stickyBeach.render(beachContainer);
}

// 3. Sườn Minh Họa 2 Bên Tương Tác Cuộn Cảnh (Side Flanks)
const flanksContainer = document.getElementById('side-flanks-container');
export const sideFlanks = new SideFlanks();
if (flanksContainer) {
  sideFlanks.render(flanksContainer);
  window.addEventListener('scroll', () => {
    sideFlanks.onScroll(window.scrollY || window.pageYOffset || 0);
  }, { passive: true });
}

// 4. Modal Sổ Tay Hai Trang Chi Tiết Dự Án (Journal Spread Modal)
const modalContainer = document.getElementById('journal-modal-container');
export const journalModal = new JournalModal({ container: modalContainer });

// 5. Dòng Sổ Tay Dự Án Scrapbook Cột Giữa (Scrapbook Stream)
const streamContainer = document.getElementById('scrapbook-stream-container');
export const scrapbookStream = new ScrapbookStream({
  projects: portfolioData.projects,
  onSelectProject: (project) => {
    journalModal.open(project);
  }
});
if (streamContainer) {
  scrapbookStream.render(streamContainer);
}

// 6. Thanh Thước Kẻ HUD & Bộ Lọc Kỹ Năng (Stationery Ruler HUD)
const hudContainer = document.getElementById('stationery-hud-container');
export const stationeryHUD = new StationeryHUD({
  skills: portfolioData.skills,
  projects: portfolioData.projects,
  onSelectSkill: (skillId) => {
    scrapbookStream.filterBySkill(skillId);
  }
});
if (hudContainer) {
  stationeryHUD.render(hudContainer);
}

console.log('🎨 2D Paper Craft & Doodle Portfolio initialized successfully!');
