export class StationeryHUD {
  constructor(options = {}) {
    this.skills = options.skills || [];
    this.activeSkill = 'all';
    this.onSelectSkill = options.onSelectSkill || (() => {});
    this.container = null;
  }

  generateHTML() {
    const badgesHtml = [
      { id: 'all', name: 'TẤT CẢ (16)' },
      ...this.skills.map(s => ({ id: s.id, name: `${s.name} (${s.count})` }))
    ].map(s => `
      <button class="stationery-pill-btn ${this.activeSkill === s.id ? 'active' : ''}" data-skill="${s.id}">
        ${s.name}
      </button>
    `).join('\n');

    return `
      <header class="stationery-ruler-hud">
        <!-- Vạch chia độ thước kẻ học sinh Kokuyo -->
        <div class="ruler-ticks" aria-hidden="true"></div>

        <div class="hud-center-title">
          <span class="doodle-brand-icon">✏️</span>
          <span class="brand-text">PORTFOLIO NOTEBOOK</span>
          <span class="sub-text">SÁNG TẠO & KỸ NĂNG</span>
        </div>

        <nav class="hud-skills-nav" aria-label="Bộ lọc kỹ năng">
          ${badgesHtml}
        </nav>
      </header>
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
      const btn = e.target.closest('.stationery-pill-btn');
      if (btn) {
        const skillId = btn.getAttribute('data-skill');
        this.activeSkill = skillId;
        this.container.querySelectorAll('.stationery-pill-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-skill') === skillId);
        });
        this.onSelectSkill(skillId);
      }
    });
  }
}
