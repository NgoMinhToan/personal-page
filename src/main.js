import { portfolioData } from './data/portfolioData.js';
import { HeroCover } from './components/HeroCover.js';
import { ScrapbookStream } from './components/ScrapbookStream.js';
import { JournalModal } from './components/JournalModal.js';
import { StationeryHUD } from './components/StationeryHUD.js';

// 1. Trang Bìa Sổ Tay & Danh Thiếp Giới Thiệu (Hero Cover Spread)
const heroContainer = document.getElementById('hero-cover-container');
export const heroCover = new HeroCover({
  profile: portfolioData.profile,
  container: heroContainer
});
if (heroContainer) {
  heroCover.render(heroContainer);
}

// 2. Modal Sổ Tay Mở Rộng 3D Flip (Journal Modal Layer)
const modalContainer = document.getElementById('journal-modal-container');
export const journalModal = new JournalModal({
  container: modalContainer,
  projects: portfolioData.projects
});

// 3. Dòng Sổ Tay Dự Án Scrapbook (Scrapbook Stream)
const streamContainer = document.getElementById('scrapbook-stream-container');
export const scrapbookStream = new ScrapbookStream({
  projects: portfolioData.projects,
  onSelectProject: (project, cardElement) => {
    journalModal.open(project, cardElement);
  }
});
if (streamContainer) {
  scrapbookStream.render(streamContainer);
}

// 3. Thanh Thước Kẻ HUD & Bộ Lọc Kỹ Năng / Tìm Kiếm
const hudContainer = document.getElementById('stationery-hud-container');
export const stationeryHUD = new StationeryHUD({
  skills: portfolioData.skills,
  projects: portfolioData.projects,
  onSelectSkill: (skillId) => {
    scrapbookStream.filterBySkill(skillId);
  },
  onSearch: (query) => {
    scrapbookStream.search(query);
  }
});
if (hudContainer) {
  stationeryHUD.render(hudContainer);
}

// 4. Bìa Gấp Cuối Sổ & Phong Bì Liên Hệ (Back Cover Footer)
const backCoverContainer = document.getElementById('scrapbook-back-cover-container');
if (backCoverContainer) {
  const p = portfolioData.profile || {};
  backCoverContainer.innerHTML = `
    <div class="scrapbook-back-cover">
      <div class="back-cover-story">
        <h3 class="back-cover-title">Trang Gấp Cuối Sổ // Hẹn Gặp Lại! ✉️</h3>
        <p class="back-cover-desc">
          Cảm ơn bạn đã ghé thăm cuốn sổ tay hành trình số của tôi. Bạn có ý tưởng thú vị hoặc muốn cùng nhau xây dựng những sản phẩm công nghệ độc đáo? Đừng ngần ngại gửi một lá thư nhé!
        </p>
      </div>
      <div class="back-cover-stamp-action">
        <a href="mailto:contact@mtoan.dev" class="envelope-contact-btn">
          <span>📬</span> GỬI THƯ CHO TÔI
        </a>
      </div>
      <div class="back-cover-copyright">
        <span>Thiết kế & Lập trình thủ công bằng WebGL & Paper Craft</span>
        <span>© ${new Date().getFullYear()} ${p.name || 'mtoan'}. Mọi trang nhật ký đều được bảo lưu.</span>
      </div>
    </div>
  `;
}

console.log('🎨 2D Paper Craft Portfolio with 3D Flip Card Interaction initialized successfully!');
