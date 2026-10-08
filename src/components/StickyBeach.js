export class StickyBeach {
  constructor(options = {}) {
    this.options = options;
  }

  generateSVG() {
    return `
      <div id="sticky-beach-wrapper" class="sticky-beach-wrapper" aria-hidden="true">
        <svg class="beach-svg" viewBox="0 0 1440 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Lớp 1: Sóng sâu Ocean Teal -->
          <path class="ocean-wave-layer wave-deep" d="M0,60 C320,30 480,80 720,50 C960,20 1120,70 1440,40 L1440,140 L0,140 Z" fill="#0284c7" stroke="#2d3748" stroke-width="2.5"/>

          <!-- Lớp 2: Sóng nông Shallow Blue Pastel với bọt sóng nét đứt -->
          <path class="ocean-wave-layer wave-shallow" d="M0,75 C240,55 480,95 720,70 C960,45 1200,85 1440,65 L1440,140 L0,140 Z" fill="#7dd3fc" stroke="#2d3748" stroke-width="2.5"/>
          <path class="wave-foam" d="M0,73 C240,53 480,93 720,68 C960,43 1200,83 1440,63" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="10 8" stroke-linecap="round"/>

          <!-- Lớp 3: Bờ cát vàng Beach Sand Paper -->
          <path class="beach-sand-layer" d="M0,95 C360,80 600,105 900,90 C1140,75 1320,95 1440,85 L1440,140 L0,140 Z" fill="#fde047" stroke="#2d3748" stroke-width="2.5"/>

          <!-- Vỏ sò & Sao biển doodle trang trí cố định trên cát -->
          <g class="doodle-seashell" transform="translate(240, 112)">
            <path d="M0,10 C-6,4 -10,-4 0,-10 C10,-4 6,4 0,10 Z" fill="#f4ebd9" stroke="#2d3748" stroke-width="1.8"/>
            <line x1="0" y1="10" x2="-4" y2="-6" stroke="#2d3748" stroke-width="1.2"/>
            <line x1="0" y1="10" x2="0" y2="-8" stroke="#2d3748" stroke-width="1.2"/>
            <line x1="0" y1="10" x2="4" y2="-6" stroke="#2d3748" stroke-width="1.2"/>
          </g>

          <g class="doodle-starfish" transform="translate(1180, 108)">
            <!-- Sao biển 5 cánh nét chì -->
            <polygon points="0,-10 3,-3 10,-2 5,3 7,10 0,6 -7,10 -5,3 -10,-2 -3,-3" fill="#fb923c" stroke="#2d3748" stroke-width="1.8"/>
            <circle cx="0" cy="0" r="1.5" fill="#2d3748"/>
          </g>
        </svg>
      </div>
    `;
  }

  render(container) {
    if (!container) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.generateSVG();
    while (wrapper.firstChild) {
      container.appendChild(wrapper.firstChild);
    }
  }
}
