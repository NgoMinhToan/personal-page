export class StationeryHUD {
  constructor(options = {}) {
    this.skills = options.skills || [];
    this.projects = options.projects || [];
    this.activeSkill = 'all';
    this.searchQuery = '';
    this.onSelectSkill = options.onSelectSkill || (() => {});
    this.onSearch = options.onSearch || (() => {});
    this.container = null;
  }

  getSkillCount(skillId) {
    if (!this.projects || !this.projects.length) return null;
    return this.projects.filter(p => {
      const list = p.skills || p.tags || [];
      return list.includes(skillId);
    }).length;
  }

  generateHTML() {
    const totalCount = this.projects.length || 16;
    const badgesHtml = [
      { id: 'all', name: `TẤT CẢ (${totalCount})` },
      ...this.skills.map(s => {
        const count = s.count !== undefined ? s.count : this.getSkillCount(s.id);
        const countLabel = count !== null ? ` (${count})` : '';
        return { id: s.id, name: `${s.name}${countLabel}` };
      })
    ].map(s => `
      <button class="stationery-pill-btn ${this.activeSkill === s.id ? 'active' : ''}" data-skill="${s.id}">
        ${s.name}
      </button>
    `).join('\n');

    return `
      <header class="stationery-ruler-hud">
        <div class="ruler-ticks" aria-hidden="true"></div>

        <div class="hud-center-title">
          <span class="doodle-brand-icon">✏️</span>
          <h1 class="brand-text">DỰ ÁN</h1>
        </div>

        <!-- Ô Tìm Kiếm Nhanh -->
        <div class="hud-search-wrapper">
          <div class="search-input-box">
            <span class="search-icon-doodle" aria-hidden="true">🔍</span>
            <input
              type="text"
              class="stationery-search-input"
              placeholder="Tìm kiếm dự án, kỹ năng..."
              value="${this.searchQuery}"
              aria-label="Tìm kiếm dự án"
            />
            <button class="search-clear-btn ${this.searchQuery ? '' : 'hidden'}" aria-label="Xóa tìm kiếm" title="Xóa">✕</button>
          </div>
        </div>

        <!-- Thanh Lọc Theo Kỹ Năng -->
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

    // 1. Bắt sự kiện lọc theo Kỹ Năng
    this.container.addEventListener('click', (e) => {
      const skillBtn = e.target.closest('.stationery-pill-btn');
      if (skillBtn) {
        const skillId = skillBtn.getAttribute('data-skill');
        this.activeSkill = skillId;
        this.container.querySelectorAll('.stationery-pill-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-skill') === skillId);
        });
        this.onSelectSkill(skillId);
        return;
      }

      // 2. Bắt sự kiện xóa ô tìm kiếm
      const clearBtn = e.target.closest('.search-clear-btn');
      if (clearBtn) {
        const input = this.container.querySelector('.stationery-search-input');
        if (input) {
          input.value = '';
          this.searchQuery = '';
          clearBtn.classList.add('hidden');
          input.focus();
          this.onSearch('');
        }
      }
    });

    // 3. Bắt sự kiện gõ tìm kiếm tức thời
    const searchInput = this.container.querySelector('.stationery-search-input');
    const clearBtn = this.container.querySelector('.search-clear-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        this.searchQuery = query;
        if (clearBtn) {
          clearBtn.classList.toggle('hidden', query.length === 0);
        }
        this.onSearch(query);
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          this.searchQuery = '';
          if (clearBtn) clearBtn.classList.add('hidden');
          this.onSearch('');
        }
      });
    }
  }
}
