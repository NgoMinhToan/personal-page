/**
 * HeroCover - Bìa Sổ Tay & Tấm Danh Thiếp Cá Nhân (Hero Profile Card)
 * Phong cách tối giản, tinh tế, loại bỏ chi tiết rườm rà.
 */

export class HeroCover {
  constructor(options = {}) {
    this.profile = options.profile || {};
    this.container = options.container || null;
  }

  generateHTML() {
    const {
      name = 'Nhà Phát Triển',
      title = 'Creative Technologist',
      location = 'Việt Nam',
      tagline = 'Ghi chép hành trình sáng tạo công nghệ số.',
      statusQuote = '“Mỗi dòng code là một nét vẽ, mỗi dự án là một trang nhật ký.”',
      badgeNote = 'Sổ Tay Sáng Tạo // Volume 2026',
      avatarDoodle = '👨‍💻',
      stats = [],
      socials = []
    } = this.profile;

    const statsHtml = stats.map((stat, i) => {
      const pinColors = ['pin-red', 'pin-yellow', 'pin-green'];
      const pinColor = pinColors[i % pinColors.length];
      return `
        <div class="sticky-stat-note ${pinColor}">
          <span class="stat-number">${stat.value}</span>
          <span class="stat-label">${stat.label}</span>
        </div>
      `;
    }).join('\n');

    const socialsHtml = socials.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hero-social-stamp ${s.id === 'cv' ? 'hero-cv-btn' : ''}" title="${s.label}">
        <span class="stamp-icon">${s.icon}</span>
        <span class="stamp-text">${s.label}</span>
      </a>
    `).join('\n');

    return `
      <section class="hero-scrapbook-cover" id="hero-cover" aria-label="Giới thiệu bản thân">
        <div class="hero-cover-layout">
          <!-- Cột Trái: Ảnh Polaroid & Thông tin cá nhân -->
          <div class="hero-polaroid-column">
            <div class="polaroid-photo-frame">
              <div class="polaroid-image-box">
                <div class="polaroid-doodle-avatar" aria-hidden="true">${avatarDoodle}</div>
              </div>
              <div class="polaroid-caption">
                <h2 class="polaroid-name">${name}</h2>
                <p class="polaroid-role">${title}</p>
                <span class="polaroid-location">📍 ${location}</span>
              </div>
            </div>
          </div>

          <!-- Cột Phải: Lời chào & Chỉ số -->
          <div class="hero-story-column">
            <div class="hero-notebook-header">
              <span class="kokuyo-volume-label">${badgeNote}</span>
            </div>

            <h1 class="hero-headline">${tagline}</h1>
            <blockquote class="hero-quote-handwriting">
              ${statusQuote}
            </blockquote>

            <!-- Bộ 3 thẻ số liệu -->
            <div class="hero-stats-row">
              ${statsHtml}
            </div>

            <!-- Các nút liên kết & Tải CV -->
            <div class="hero-actions-bar">
              ${socialsHtml}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  render(container) {
    this.container = container;
    if (this.container) {
      this.container.innerHTML = this.generateHTML();
    }
  }
}
