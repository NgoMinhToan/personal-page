export class StickyClouds {
  constructor(options = {}) {
    this.options = options;
  }

  generateSVG() {
    return `
      <div id="sticky-clouds-wrapper" class="sticky-clouds-wrapper" aria-hidden="true">
        <svg class="clouds-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Mây tầng 1 (Viễn cảnh kem sáng) -->
          <g class="sticky-cloud cloud-bg" transform="translate(40, -10)">
            <path d="M0,50 Q40,10 90,30 Q140,5 200,30 Q260,15 310,50 Q330,75 290,90 L20,90 Z" fill="#ffffff" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <g class="sticky-cloud cloud-bg" transform="translate(820, -15)">
            <path d="M0,55 Q50,15 110,35 Q170,10 240,35 Q300,18 360,55 Q380,80 340,95 L30,95 Z" fill="#ffffff" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>

          <!-- Mây tầng 2 (Trung cảnh xếp nếp giấy Kokuyo) -->
          <g class="sticky-cloud cloud-main-1" transform="translate(180, 5)">
            <path d="M0,45 Q35,8 85,25 Q135,5 190,25 Q245,10 290,45 Q310,70 270,80 L20,80 Z" fill="#faf7f0" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <g class="sticky-cloud cloud-main-2" transform="translate(560, -5)">
            <path d="M0,50 Q45,12 100,30 Q155,8 220,30 Q280,12 330,50 Q350,75 310,85 L20,85 Z" fill="#faf7f0" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <g class="sticky-cloud cloud-main-3" transform="translate(1080, 5)">
            <path d="M0,45 Q35,8 85,25 Q135,5 190,25 Q245,10 290,45 Q310,70 270,80 L20,80 Z" fill="#faf7f0" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>

          <!-- Mặt trời Doodle mỉm cười góc phải -->
          <g class="doodle-sun" transform="translate(1320, 42)">
            <!-- Tia nắng nét vẽ chì than -->
            <line x1="0" y1="-28" x2="0" y2="-36" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="20" y1="-20" x2="26" y2="-26" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="28" y1="0" x2="36" y2="0" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="20" y1="20" x2="26" y2="26" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="0" y1="28" x2="0" y2="36" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="-20" y1="20" x2="-26" y2="26" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="-28" y1="0" x2="-36" y2="0" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="-20" y1="-20" x2="-26" y2="-26" stroke="#2d3748" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Thân mặt trời giấy vàng -->
            <circle cx="0" cy="0" r="22" fill="#fde047" stroke="#2d3748" stroke-width="2.5"/>
            <!-- Mắt cười doodle -->
            <circle cx="-7" cy="-4" r="2.5" fill="#2d3748"/>
            <circle cx="7" cy="-4" r="2.5" fill="#2d3748"/>
            <!-- Miệng cười doodle -->
            <path d="M-9,5 Q0,14 9,5" fill="none" stroke="#2d3748" stroke-width="2.2" stroke-linecap="round"/>
            <!-- Má hồng pastel -->
            <circle cx="-13" cy="4" r="3" fill="#f87171" opacity="0.6"/>
            <circle cx="13" cy="4" r="3" fill="#f87171" opacity="0.6"/>
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
