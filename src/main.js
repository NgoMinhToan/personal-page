import { portfolioData } from './data/portfolioData.js';
import { ScrapbookStream } from './components/ScrapbookStream.js';
import { JournalModal } from './components/JournalModal.js';
import { StationeryHUD } from './components/StationeryHUD.js';

// 1. Modal Sổ Tay Hai Trang Chi Tiết Dự Án (Journal Spread Modal)
const modalContainer = document.getElementById('journal-modal-container');
export const journalModal = new JournalModal({ container: modalContainer });

// 2. Dòng Sổ Tay Dự Án Scrapbook 2 Cột (Scrapbook Stream)
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

// 3. Thanh Thước Kẻ HUD & Bộ Lọc Kỹ Năng (Stationery Ruler HUD)
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

console.log('🎨 2D Paper Craft Portfolio initialized successfully!');
