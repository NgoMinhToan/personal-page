const SKETCH_BADGE_SVGS = {
  windmill: `<svg class="badge-windmill" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.35"/>
    <polygon points="14,31 16,18 20,18 22,31" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="15" y1="23" x2="21" y2="23" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="14.5" y1="27" x2="21.5" y2="27" stroke="#1e293b" stroke-width="0.8"/>
    <path d="M16.5,31 v-4 a1.5,1.5 0 0 1 3,0 v4" fill="#1e293b"/>
    <path d="M15,18 Q18,14 21,18 Z" fill="#fb923c" stroke="#1e293b" stroke-width="1.2"/>
    <line x1="7" y1="7" x2="29" y2="29" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="29" y1="7" x2="7" y2="29" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
    <polygon points="8,7 13,5 16,16 14,17" fill="#fde047" fill-opacity="0.75" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <polygon points="28,7 26,2 19,15 20,17" fill="#fde047" fill-opacity="0.75" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <polygon points="28,29 23,31 20,20 22,19" fill="#fde047" fill-opacity="0.75" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <polygon points="8,29 10,34 17,21 16,19" fill="#fde047" fill-opacity="0.75" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <circle cx="18" cy="18" r="1.8" fill="#ef4444" stroke="#1e293b" stroke-width="1.2"/>
  </svg>`,

  orchard: `<svg class="badge-orchard" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fecaca" fill-opacity="0.4"/>
    <path d="M18,13 C14,10 8,14 8,22 C8,28 13,31 18,30 C23,31 28,28 28,22 C24.5,21.5 24,18 26.5,16.5 C27,15 25,11 18,13 Z" fill="#ef4444" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M28,22 C24.5,21.5 24,18 26.5,16.5 C25,18 25,20.5 28,22 Z" fill="#faf6ed" stroke="#1e293b" stroke-width="0.9"/>
    <path d="M11,21 C11,25 14,28 17,28" stroke="#1e293b" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M12,18 C12,22 14,25 16,25" stroke="#1e293b" stroke-width="0.8" stroke-linecap="round"/>
    <path d="M18,13 C18,9 21,6 21,6" stroke="#78350f" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M19,9 C22,7 26,8 26,8 C26,8 25,12 21,11 C19.5,11 19,9 19,9 Z" fill="#86efac" stroke="#1e293b" stroke-width="1" stroke-linejoin="round"/>
  </svg>`,

  garden: `<svg class="badge-garden" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fed7aa" fill-opacity="0.4"/>
    <path d="M16,13 C13,9 11,5 9,6 M16,13 C14,7 16,4 17,3 M18,12 C19,7 22,4 24,5 M19,13 C22,9 25,7 27,9" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M12,6 Q16,8 17,12 Q20,8 23,5" fill="#86efac" fill-opacity="0.8"/>
    <path d="M13,14 C14,12 22,12 23,14 C23,17 19,30 18,32 C17,30 13,17 13,14 Z" fill="#fb923c" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="15" y1="18" x2="19" y2="19" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
    <line x1="16" y1="22" x2="20" y2="23" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
    <line x1="16.5" y1="26" x2="19.5" y2="27" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
  </svg>`,

  well: `<svg class="badge-well" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.35"/>
    <polygon points="18,6 7,13 29,13" fill="#fde047" fill-opacity="0.8" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="11" y1="13" x2="11" y2="21" stroke="#1e293b" stroke-width="1.3"/>
    <line x1="25" y1="13" x2="25" y2="21" stroke="#1e293b" stroke-width="1.3"/>
    <rect x="9" y="21" width="18" height="11" rx="2" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <path d="M18,13 V17" stroke="#1e293b" stroke-width="1.2"/>
    <circle cx="18" cy="18.5" r="1.8" fill="#fb923c" stroke="#1e293b" stroke-width="1"/>
    <line x1="12" y1="24" x2="24" y2="24" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="12" y1="28" x2="24" y2="28" stroke="#1e293b" stroke-width="0.8"/>
  </svg>`,

  cart: `<svg class="badge-cart" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fef08a" fill-opacity="0.45"/>
    <polygon points="10,13 26,13 24,23 12,23" fill="#fb923c" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="6" y1="16" x2="10" y2="18" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="14" cy="26" r="3.5" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <circle cx="14" cy="26" r="1" fill="#1e293b"/>
    <circle cx="22" cy="26" r="3.5" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <circle cx="22" cy="26" r="1" fill="#1e293b"/>
    <line x1="13" y1="16" x2="23" y2="16" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="13.5" y1="19.5" x2="22.5" y2="19.5" stroke="#1e293b" stroke-width="0.8"/>
  </svg>`,

  campfire: `<svg class="badge-campfire" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fed7aa" fill-opacity="0.4"/>
    <line x1="9" y1="27" x2="27" y2="27" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
    <line x1="11" y1="29" x2="25" y2="25" stroke="#78350f" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M18,9 C14,14 13,18 14,22 C15,25 21,25 22,22 C23,18 20,13 18,9 Z" fill="#ef4444" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M18,15 C16,18 15.5,20 16,22 C16.5,23.5 19.5,23.5 20,22 C20.5,20 19,17 18,15 Z" fill="#fde047" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <circle cx="13" cy="12" r="0.8" fill="#fb923c"/>
    <circle cx="23" cy="13" r="0.8" fill="#fb923c"/>
  </svg>`,

  barn: `<svg class="badge-barn" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fecaca" fill-opacity="0.4"/>
    <polygon points="18,6 10,13 10,29 26,29 26,13" fill="#ef4444" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <polygon points="18,8 12,13 24,13" fill="#faf6ed" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <rect x="15" y="21" width="6" height="8" fill="#faf6ed" stroke="#1e293b" stroke-width="1.1"/>
    <line x1="15" y1="21" x2="21" y2="29" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="21" y1="21" x2="15" y2="29" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="10.5" y1="17" x2="10.5" y2="30" stroke="#1e293b" stroke-width="0.7"/>
    <line x1="25.5" y1="17" x2="25.5" y2="30" stroke="#1e293b" stroke-width="0.7"/>
  </svg>`,

  beehive: `<svg class="badge-beehive" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fef08a" fill-opacity="0.45"/>
    <path d="M14,14 C14,8 22,8 22,14 Z" fill="#fde047" stroke="#1e293b" stroke-width="1.2"/>
    <path d="M11,21 C11,15 25,15 25,21 Z" fill="#facc15" stroke="#1e293b" stroke-width="1.2"/>
    <path d="M9,28 C9,22 27,22 27,28 Z" fill="#eab308" stroke="#1e293b" stroke-width="1.2"/>
    <line x1="7" y1="28" x2="29" y2="28" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M16.5,28 a1.5,1.5 0 0 1 3,0 Z" fill="#1e293b"/>
    <line x1="16" y1="11" x2="20" y2="11" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="14" y1="18" x2="22" y2="18" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="12" y1="25" x2="24" y2="25" stroke="#1e293b" stroke-width="0.8"/>
  </svg>`,

  sheep: `<svg class="badge-sheep" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bbf7d0" fill-opacity="0.35"/>
    <line x1="13" y1="24" x2="13" y2="30" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="16" y1="24" x2="16" y2="30" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="21" y1="24" x2="21" y2="30" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="24" y1="24" x2="24" y2="30" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12,23 C9,23 8,20 10,18 C8,16 9,13 12,13 C12,10 15,9 17,11 C19,9 22,9 23,11 C25,10 27,12 26,14 C28,16 28,19 26,21 C28,23 25,25 23,24 C21,26 18,25 17,24 C15,26 13,25 12,23 Z" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <ellipse cx="14" cy="16" rx="2.5" ry="3" fill="#1e293b"/>
  </svg>`,

  tractor: `<svg class="badge-tractor" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bbf7d0" fill-opacity="0.35"/>
    <path d="M12,20 L12,15 L20,15 L26,18 L26,24 L19,24" fill="#10b981" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <circle cx="26" cy="25" r="3.5" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <circle cx="12" cy="23" r="6.5" fill="#faf6ed" stroke="#1e293b" stroke-width="1.4"/>
  </svg>`,

  greenhouse: `<svg class="badge-greenhouse" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.35"/>
    <polygon points="18,6 8,14 8,30 28,30 28,14" fill="#faf6ed" fill-opacity="0.75" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="18" y1="6" x2="18" y2="30" stroke="#1e293b" stroke-width="1"/>
    <line x1="8" y1="21" x2="28" y2="21" stroke="#1e293b" stroke-width="1"/>
  </svg>`,

  sunflower: `<svg class="badge-sunflower" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fef08a" fill-opacity="0.45"/>
    <circle cx="18" cy="18" r="10" fill="#fde047" stroke="#1e293b" stroke-width="1.2"/>
    <circle cx="18" cy="18" r="4.5" fill="#78350f" stroke="#1e293b" stroke-width="1.2"/>
  </svg>`,

  scarecrow: `<svg class="badge-scarecrow" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fed7aa" fill-opacity="0.4"/>
    <line x1="18" y1="12" x2="18" y2="31" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="7" y1="18" x2="29" y2="18" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="18" cy="12" r="3.5" fill="#faf6ed" stroke="#1e293b" stroke-width="1.2"/>
  </svg>`,

  watermill: `<svg class="badge-watermill" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.45"/>
    <circle cx="18" cy="18" r="9" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <circle cx="18" cy="18" r="3" fill="#0284c7" stroke="#1e293b" stroke-width="1.1"/>
  </svg>`,

  silo: `<svg class="badge-silo" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fed7aa" fill-opacity="0.4"/>
    <path d="M12,13 C12,8 24,8 24,13 Z" fill="#b45309" stroke="#1e293b" stroke-width="1.3"/>
    <rect x="12" y="13" width="12" height="18" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
  </svg>`,

  duckpond: `<svg class="badge-duckpond" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.45"/>
    <circle cx="21" cy="16" r="3" fill="#15803d" stroke="#1e293b" stroke-width="1.1"/>
    <path d="M6,26 Q12,28 18,26 T30,27" fill="none" stroke="#0284c7" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`
};

const DEFAULT_STAR_BADGE_SVG = `<svg class="badge-default-star" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="18" cy="18" r="14" fill="#fef08a" fill-opacity="0.45"/>
  <polygon points="18,6 21.5,14 30,14.5 23.5,19.5 26,28 18,23 10,28 12.5,19.5 6,14.5 14.5,14" fill="#fde047" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
</svg>`;

export function getProjectSketchBadge(farmType) {
  const svg = SKETCH_BADGE_SVGS[farmType] || DEFAULT_STAR_BADGE_SVG;
  return `<span class="project-sketch-badge-icon">${svg}</span>`;
}

export function getInkStampHtml(badgeStatus) {
  if (!badgeStatus) return '';
  const statusUpper = badgeStatus.toUpperCase();
  if (statusUpper === 'FEATURED') {
    return `<div class="ink-stamp stamp-featured" aria-label="Dự án nổi bật">★ NỔI BẬT ★</div>`;
  }
  if (statusUpper === 'EXPERIMENT') {
    return `<div class="ink-stamp stamp-experiment" aria-label="Thử nghiệm đồ họa">🧪 THỬ NGHIỆM</div>`;
  }
  if (statusUpper === 'COMPLETED') {
    return `<div class="ink-stamp stamp-completed" aria-label="Đã hoàn thành">✓ HOÀN THÀNH</div>`;
  }
  return `<div class="ink-stamp stamp-default">${badgeStatus}</div>`;
}

export class ScrapbookStream {
  constructor(options = {}) {
    this.projects = options.projects || [];
    this.activeProjects = [...this.projects];
    this.activeSkill = 'all';
    this.searchQuery = '';
    this.onSelectProject = options.onSelectProject || (() => {});
    this.container = null;
  }

  getProjectSketchBadge(farmType) {
    return getProjectSketchBadge(farmType);
  }

  getInkStampHtml(badgeStatus) {
    return getInkStampHtml(badgeStatus);
  }

  generateCardHTML(project, index) {
    const padIndex = String(index + 1).padStart(2, '0');
    const tags = project.skills || project.tags || [];
    const tagsHtml = tags
      .map(tag => `<span class="skill-sticker">#${tag}</span>`)
      .join(' ');

    const sketchBadgeHtml = this.getProjectSketchBadge(project.farmType);
    const inkStampHtml = this.getInkStampHtml(project.badgeStatus);
    const yearLabel = project.year || '2025';

    return `
      <article class="paper-project-card" data-project-id="${project.id}">
        ${inkStampHtml}

        <div class="card-header-bar">
          <div class="card-header-meta">
            <span class="project-stamp-badge">#${padIndex}</span>
            <span class="project-year-badge">${yearLabel}</span>
            <span class="project-branch-tag">${project.subtitle || 'Dự án Sáng Tạo'}</span>
          </div>
          ${sketchBadgeHtml}
        </div>

        <h3 class="paper-card-title">${project.title}</h3>
        <p class="paper-card-desc">${project.description}</p>

        <div class="paper-card-tags">
          ${tagsHtml}
        </div>

        <div class="paper-card-footer">
          <button class="stamp-btn-detail" data-action="open-detail" data-project-id="${project.id}" aria-label="Xem chi tiết ${project.title}">
            CHI TIẾT ↗
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
            <div class="empty-doodle-icon">🔍</div>
            <h3>Không tìm thấy dự án</h3>
            <p>Vui lòng thử tìm với từ khóa hoặc kỹ năng khác.</p>
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
    this.bindTilt();
  }

  bindEvents() {
    if (!this.container) return;
    this.container.addEventListener('click', (e) => {
      // Nếu click vào thẻ hoặc nút chi tiết (và không click thẻ a)
      if (e.target.closest('a')) return;

      const btn = e.target.closest('[data-action="open-detail"]');
      const card = e.target.closest('.paper-project-card');
      const target = btn || card;

      if (target) {
        const cardElement = target.closest('.paper-project-card');
        const projectId = cardElement.getAttribute('data-project-id');
        const proj = this.projects.find(p => p.id === projectId);
        if (proj) {
          this.onSelectProject(proj, cardElement);
        }
      }
    });
  }

  bindTilt() {
    if (!this.container || typeof window === 'undefined') return;
    const cards = this.container.querySelectorAll('.paper-project-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  filterBySkill(skillId) {
    this.activeSkill = skillId || 'all';
    this.applyFilters();
  }

  search(query) {
    this.searchQuery = (query || '').trim().toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.activeProjects = this.projects.filter(p => {
      const matchesSkill = !this.activeSkill || this.activeSkill === 'all' ||
        (p.skills || p.tags || []).includes(this.activeSkill);

      if (!matchesSkill) return false;
      if (!this.searchQuery) return true;

      const q = this.searchQuery;
      const titleMatch = (p.title || '').toLowerCase().includes(q);
      const descMatch = (p.description || '').toLowerCase().includes(q);
      const subMatch = (p.subtitle || '').toLowerCase().includes(q);
      const skillMatch = (p.skills || []).some(s => s.toLowerCase().includes(q));

      return titleMatch || descMatch || subMatch || skillMatch;
    });

    if (this.container) {
      this.container.innerHTML = this.generateHTML();
      this.bindTilt();
    }
  }
}
