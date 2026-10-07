export class FarmDetailModal {
  constructor(container, options = {}) {
    this.container = container;
    this.onBack = options.onBack || (() => {});
    this.skillsMap = options.skillsMap || new Map();
    this.currentProject = null;

    this.setupEvents();
  }

  setupEvents() {
    // Đóng khi click vào vùng mờ bên ngoài
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.onBack();
      }
    });
  }

  show(project) {
    this.currentProject = project;
    this.container.classList.remove('hidden');
    this.container.setAttribute('aria-hidden', 'false');

    const skillTagsHtml = (project.skills || [])
      .map((skillId) => {
        const skill = this.skillsMap.get(skillId) || { name: skillId, color: '#16a34a' };
        return `<span class="farm-skill-tag" style="background-color: ${skill.color}22; border-color: ${skill.color}; color: ${skill.color};">
          ${skill.name}
        </span>`;
      })
      .join('');

    this.container.innerHTML = `
      <div class="farm-modal-card">
        <!-- NÚT QUAY LUI TO RÕ RÀNG (BACK HANDLE) -->
        <button id="btn-farm-back" class="btn-farm-back" aria-label="Quay về Nông trại">
          <span>◀ QUAY VỀ NÔNG TRẠI</span>
        </button>

        <div class="farm-modal-header">
          <div class="farm-modal-badge">${project.iconEmoji || '🌾'} ${project.subtitle || 'Công trình Nông trại'}</div>
          <h2 class="farm-modal-title">${project.title}</h2>
        </div>

        <p class="farm-modal-desc">${project.description}</p>

        <div class="farm-skills-section">
          <div class="farm-skills-label">KỸ NĂNG ÁP DỤNG TRONG DỰ ÁN:</div>
          <div class="farm-skills-list">
            ${skillTagsHtml}
          </div>
        </div>

        <div class="farm-modal-actions">
          <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-farm-primary">
            🚀 TRUY CẬP DỰ ÁN (LIVE DEMO) ↗
          </a>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-farm-secondary">
            MÃ NGUỒN GITHUB ↗
          </a>
        </div>
      </div>
    `;

    // Bắt sự kiện nút quay lui
    const backBtn = this.container.querySelector('#btn-farm-back');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onBack();
      });
    }
  }

  hide() {
    this.container.classList.add('hidden');
    this.container.setAttribute('aria-hidden', 'true');
    this.currentProject = null;
  }
}
