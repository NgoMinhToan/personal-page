export class ScrapbookStream {
  constructor(options = {}) {
    this.projects = options.projects || [];
    this.activeProjects = [...this.projects];
    this.onSelectProject = options.onSelectProject || (() => {});
    this.container = null;
  }

  generateCardHTML(project, index) {
    const padIndex = String(index + 1).padStart(2, '0');
    const washiColors = ['washi-blue', 'washi-yellow', 'washi-orange', 'washi-green'];
    const washiClass = washiColors[index % washiColors.length];

    const tags = project.skills || project.tags || [];
    const tagsHtml = tags
      .map(tag => `<span class="skill-sticker">#${tag}</span>`)
      .join(' ');

    return `
      <article class="paper-project-card" data-project-id="${project.id}">
        <!-- Miếng băng dính Washi Tape góc trên -->
        <div class="washi-tape-strip ${washiClass} washi-top-left"></div>
        <div class="washi-tape-strip ${washiClass} washi-top-right"></div>

        <!-- Tem số hiệu dự án Kokuyo -->
        <div class="card-header-bar">
          <span class="project-stamp-badge">DỰ ÁN #${padIndex}</span>
          <span class="project-branch-tag">${project.subtitle || 'Dự án Sáng Tạo'}</span>
        </div>

        <h3 class="paper-card-title">${project.title}</h3>
        <p class="paper-card-desc">${project.description}</p>

        <div class="paper-card-tags">
          ${tagsHtml}
        </div>

        <div class="paper-card-footer">
          <button class="stamp-btn-detail" data-action="open-detail" data-project-id="${project.id}">
            LẬT XEM CHI TIẾT 📖
          </button>
        </div>
      </article>
    `;
  }

  generateHTML(projectsToRender = this.activeProjects) {
    if (!projectsToRender || projectsToRender.length === 0) {
      return `
        <div class="scrapbook-stream">
          <div class="scrapbook-empty-state">
            <div class="empty-doodle-icon">🔍📄</div>
            <h3>Không tìm thấy dự án phù hợp</h3>
            <p>Hãy thử chọn kỹ năng khác trên thanh thước kẻ phía trên nhé!</p>
          </div>
        </div>
      `;
    }

    const cardsHtml = projectsToRender.map((p, i) => this.generateCardHTML(p, i)).join('\n');
    return `
      <div class="scrapbook-stream" id="scrapbook-stream">
        ${cardsHtml}
      </div>
    `;
  }

  render(container) {
    this.container = container;
    this.container.innerHTML = this.generateHTML();
    this.bindEvents();
  }

  bindEvents() {
    if (!this.container) return;
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="open-detail"]');
      if (btn) {
        const projectId = btn.getAttribute('data-project-id');
        const proj = this.projects.find(p => p.id === projectId);
        if (proj) this.onSelectProject(proj);
      }
    });
  }

  filterBySkill(skillId) {
    if (!skillId || skillId === 'all') {
      this.activeProjects = [...this.projects];
    } else {
      this.activeProjects = this.projects.filter(p => {
        const list = p.skills || p.tags || [];
        return list.includes(skillId);
      });
    }
    if (this.container) {
      this.container.innerHTML = this.generateHTML();
      this.bindEvents();
    }
  }
}
