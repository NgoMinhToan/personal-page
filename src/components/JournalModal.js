export class JournalModal {
  constructor(options = {}) {
    this.container = options.container || null;
    this.isOpen = false;
    this.activeProject = null;
    this.setupKeyboard();
  }

  generateModalHTML(project) {
    if (!project) return '';

    const imageSection = project.image
      ? `<img src="${project.image}" alt="${project.title}" class="journal-showcase-img">`
      : `
        <div class="doodle-image-placeholder">
          <div class="placeholder-doodle">🎨📐✨</div>
          <p>Bản phác thảo dự án</p>
          <span class="placeholder-caption">${project.title}</span>
        </div>
      `;

    const featuresHtml = (project.features || [
      'Kiến trúc đồ họa tối ưu hóa hiệu năng cao',
      'Thiết kế giao diện tương tác sáng tạo người dùng',
      'Được đóng gói chuẩn module hóa dễ bảo trì mở rộng'
    ]).map(f => `<li><span class="doodle-bullet">✏️</span> ${f}</li>`).join('\n');

    return `
      <div class="journal-modal-backdrop" id="journal-backdrop" role="dialog" aria-modal="true" aria-labelledby="journal-title">
        <div class="journal-spread-wrapper">
          <!-- Nút kẹp giấy đóng sổ -->
          <button class="paper-clip-close" id="btn-close-journal" aria-label="Gấp sổ">
            <span class="clip-icon">📎</span> GẤP SỔ ✕
          </button>

          <div class="journal-two-page-spread">
            <!-- Trang Trái: Ảnh chụp màn hình dán 4 góc washi tape -->
            <div class="journal-page journal-page-left">
              <div class="taped-photo-frame">
                <div class="washi-tape-corner corner-tl"></div>
                <div class="washi-tape-corner corner-tr"></div>
                <div class="washi-tape-corner corner-bl"></div>
                <div class="washi-tape-corner corner-br"></div>
                ${imageSection}
              </div>
              <p class="photo-caption-handwriting">Hình minh họa: ${project.title}</p>
            </div>

            <!-- Gáy sổ nếp gấp đôi -->
            <div class="journal-spine-divider"></div>

            <!-- Trang Phải: Câu chuyện kỹ thuật, tính năng & nút bấm -->
            <div class="journal-page journal-page-right">
              <span class="journal-tag-label">${project.subtitle || 'Dự án Nổi bật'}</span>
              <h2 class="journal-project-title" id="journal-title">${project.title}</h2>
              <p class="journal-project-story">${project.details || project.description}</p>

              <h4 class="journal-section-heading">ĐIỂM NỔI BẬT:</h4>
              <ul class="journal-features-list">
                ${featuresHtml}
              </ul>

              <div class="journal-action-stamps">
                ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener" class="stamp-link-btn demo-stamp">GHÉ THĂM DEMO 🚀</a>` : ''}
                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="stamp-link-btn github-stamp">MÃ NGUỒN GITHUB 💻</a>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupKeyboard() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
  }

  open(project) {
    if (!this.container || !project) return;
    this.activeProject = project;
    this.isOpen = true;
    this.container.innerHTML = this.generateModalHTML(project);
    this.container.classList.remove('hidden');
    if (typeof this.container.setAttribute === 'function') {
      this.container.setAttribute('aria-hidden', 'false');
    }

    const backdrop = this.container.querySelector ? this.container.querySelector('#journal-backdrop') : null;
    const closeBtn = this.container.querySelector ? this.container.querySelector('#btn-close-journal') : null;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
      if (typeof closeBtn.focus === 'function') {
        closeBtn.focus();
      }
    }
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });
    }
  }

  close() {
    if (!this.container) return;
    this.isOpen = false;
    this.activeProject = null;
    this.container.innerHTML = '';
    this.container.classList.add('hidden');
    if (typeof this.container.setAttribute === 'function') {
      this.container.setAttribute('aria-hidden', 'true');
    }
  }
}
