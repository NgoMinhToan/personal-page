export class DetailOverlay {
  constructor(overlayContainer, options = {}) {
    this.container = overlayContainer;
    this.onBack = options.onBack || (() => {});
    this.allSkillsMap = options.skillsMap || new Map();
    this.currentProject = null;
    this.currentSide = 'right'; // Bên hiển thị nội dung

    this.setupEvents();
  }

  setupEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.container.classList.contains('hidden')) {
        this.onBack();
      }
    });
  }

  show(project, side = 'right') {
    this.currentProject = project;
    this.currentSide = side;

    // Định vị class trái hoặc phải cho panel nội dung
    this.container.classList.remove('hidden', 'left', 'right');
    this.container.classList.add(side);
    this.container.setAttribute('aria-hidden', 'false');

    // Render HTML nội dung
    const skillTagsHtml = (project.skills || [])
      .map((skillId) => {
        const skill = this.allSkillsMap.get(skillId) || { name: skillId, color: '#38bdf8' };
        return `<span class="skill-tag" style="border-color: ${skill.color}; color: ${skill.color};">${skill.name}</span>`;
      })
      .join('');

    this.container.innerHTML = `
      <div>
        <div class="detail-header">
          <button id="btn-back-grid" class="btn-back">
            <span>◀ QUAY VỀ LƯỚI 2X2</span>
          </button>
          <span class="manga-tag" style="background: ${project.accentColor || '#e11d48'};">${project.vol || 'VOL. 01'}</span>
        </div>

        <h2 class="detail-title">${project.title}</h2>
        <div class="detail-subtitle" style="color: ${project.accentColor || '#38bdf8'};">${project.subtitle || 'Dự án Sáng tạo'}</div>
        <p class="detail-desc">${project.description}</p>

        <div class="detail-skills-label">KỸ NĂNG ÁP DỤNG (TECH SKILLS):</div>
        <div class="detail-skills-list">
          ${skillTagsHtml}
        </div>
      </div>

      <div class="detail-actions">
        <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-action-primary" style="background: ${project.accentColor || '#e11d48'};">
          🚀 TRUY CẬP DỰ ÁN (LIVE DEMO) ↗
        </a>
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-action-secondary">
          GITHUB REPO ↗
        </a>
      </div>
    `;

    // Gắn sự kiện nút quay về
    const backBtn = this.container.querySelector('#btn-back-grid');
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
