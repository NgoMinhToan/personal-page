export class SideFlanks {
  constructor(options = {}) {
    this.options = options;
    this.container = null;
  }

  calculateParallax(scrollY) {
    const maxScroll = 4000;
    const clampedY = Math.min(maxScroll, Math.max(0, scrollY || 0));
    return {
      leftOffset: clampedY * 0.15,
      rightOffset: clampedY * 0.22,
      surferTilt: Math.sin(clampedY * 0.05) * 12
    };
  }

  generateHTML() {
    return `
      <!-- Sườn Trái: Rặng Dừa & 3 Chú Khỉ Tinh Nghịch -->
      <aside class="side-flank side-flank-left" id="flank-left" aria-hidden="true">
        <svg class="flank-svg flank-left-svg" viewBox="0 0 240 1800" preserveAspectRatio="xMinYMin meet">
          <!-- Cây Dừa 1 & Khỉ Vẫy Tay -->
          <g class="palm-station" transform="translate(40, 120)">
            <path d="M40,300 Q10,180 35,40" fill="none" stroke="#854d0e" stroke-width="14" stroke-linecap="round"/>
            <!-- Lá dừa xanh giấy -->
            <path d="M35,40 Q-30,-20 -60,30" fill="none" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>
            <path d="M35,40 Q-10,-40 30,-50" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round"/>
            <path d="M35,40 Q70,-40 100,10" fill="none" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>
            <path d="M35,40 Q90,30 110,90" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round"/>
            <!-- Chú Khỉ 1 -->
            <g class="doodle-monkey monkey-1" transform="translate(18, 140)">
              <circle cx="0" cy="0" r="14" fill="#78350f" stroke="#2d3748" stroke-width="2"/>
              <circle cx="0" cy="-16" r="11" fill="#78350f" stroke="#2d3748" stroke-width="2"/>
              <ellipse cx="0" cy="-13" rx="7" ry="5" fill="#fbcfe8"/>
              <circle cx="-11" cy="-18" r="3.5" fill="#fbcfe8" stroke="#2d3748" stroke-width="1.5"/>
              <circle cx="11" cy="-18" r="3.5" fill="#fbcfe8" stroke="#2d3748" stroke-width="1.5"/>
              <!-- Cánh tay vẫy chào -->
              <path d="M10,-12 Q24,-24 20,-34" fill="none" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
            </g>
          </g>

          <!-- Cây Dừa 2 & Khỉ Đu Ngược -->
          <g class="palm-station" transform="translate(50, 750)">
            <path d="M30,320 Q60,190 20,40" fill="none" stroke="#854d0e" stroke-width="14" stroke-linecap="round"/>
            <g class="doodle-monkey monkey-2" transform="translate(25, 110)">
              <!-- Đuôi móc vào thân cây -->
              <path d="M0,12 Q-15,30 -25,10" fill="none" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
              <circle cx="0" cy="0" r="13" fill="#78350f" stroke="#2d3748" stroke-width="2"/>
              <circle cx="0" cy="15" r="10" fill="#78350f" stroke="#2d3748" stroke-width="2"/>
            </g>
          </g>

          <!-- Khỉ 3 Ngồi Ôm Trái Dừa Trên Mỏm Đồi Cỏ -->
          <g class="palm-station" transform="translate(30, 1420)">
            <path d="M-20,120 Q50,60 180,120 L180,180 L-20,180 Z" fill="#4ade80" stroke="#2d3748" stroke-width="2.5"/>
            <g class="doodle-monkey monkey-3" transform="translate(60, 80)">
              <circle cx="0" cy="0" r="14" fill="#78350f" stroke="#2d3748" stroke-width="2"/>
              <circle cx="0" cy="-16" r="11" fill="#78350f" stroke="#2d3748" stroke-width="2"/>
              <!-- Trái dừa màu nâu -->
              <circle cx="0" cy="1" r="7" fill="#a16207" stroke="#2d3748" stroke-width="1.5"/>
            </g>
          </g>
        </svg>
      </aside>

      <!-- Sườn Phải: Vận Động Viên Lướt Sóng, Người Tắm Phao & Bãi Cát -->
      <aside class="side-flank side-flank-right" id="flank-right" aria-hidden="true">
        <svg class="flank-svg flank-right-svg" viewBox="0 0 240 1800" preserveAspectRatio="xMaxYMin meet">
          <!-- Đường sóng biển dọc -->
          <path d="M180,0 Q120,300 170,600 Q220,900 150,1200 Q100,1500 180,1800" fill="none" stroke="#7dd3fc" stroke-width="18" opacity="0.4"/>
          <path d="M190,0 Q130,300 180,600 Q230,900 160,1200 Q110,1500 190,1800" fill="none" stroke="#0284c7" stroke-width="3" stroke-dasharray="8 6"/>

          <!-- Surfer Lướt Sóng -->
          <g class="doodle-surfer" id="doodle-surfer" transform="translate(130, 320)">
            <!-- Ván lướt ván cam dán washi tape -->
            <ellipse cx="0" cy="24" rx="36" ry="9" fill="#fb923c" stroke="#2d3748" stroke-width="2.2"/>
            <line x1="-30" y1="24" x2="30" y2="24" stroke="#ffffff" stroke-width="2.5"/>
            <!-- Người lướt sóng -->
            <ellipse cx="0" cy="8" rx="8" ry="12" fill="#0284c7" stroke="#2d3748" stroke-width="2"/>
            <circle cx="0" cy="-10" r="7.5" fill="#fbcfe8" stroke="#2d3748" stroke-width="1.8"/>
            <path d="M-12,5 Q0,-2 12,5" fill="none" stroke="#fbcfe8" stroke-width="2.5" stroke-linecap="round"/>
          </g>

          <!-- Người Tắm Phao Bơi 1 -->
          <g class="doodle-swimmer" transform="translate(140, 780)">
            <!-- Phao bơi tròn sọc đỏ trắng -->
            <ellipse cx="0" cy="0" rx="26" ry="16" fill="#f87171" stroke="#2d3748" stroke-width="2.2"/>
            <ellipse cx="0" cy="0" rx="14" ry="8" fill="#faf7f0" stroke="#2d3748" stroke-width="1.5"/>
            <!-- Nửa thân người & tay bám phao -->
            <circle cx="0" cy="-12" r="8" fill="#fbcfe8" stroke="#2d3748" stroke-width="1.8"/>
          </g>

          <!-- Lâu Đài Cát & Ô Che Nắng Cuối Bờ Biển -->
          <g class="beach-decor-group" transform="translate(90, 1450)">
            <!-- Dù bãi biển sọc đỏ trắng -->
            <path d="M0,0 Q35,-45 70,0 Z" fill="#f87171" stroke="#2d3748" stroke-width="2"/>
            <line x1="35" y1="-30" x2="35" y2="40" stroke="#854d0e" stroke-width="3"/>
            <!-- Lâu đài cát 3 tháp -->
            <rect x="75" y="10" width="35" height="30" fill="#fde047" stroke="#2d3748" stroke-width="2"/>
            <polygon points="75,10 92.5,-5 110,10" fill="#fde047" stroke="#2d3748" stroke-width="2"/>
          </g>
        </svg>
      </aside>
    `;
  }

  render(container) {
    this.container = container;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.generateHTML();
    while (wrapper.firstChild) {
      this.container.appendChild(wrapper.firstChild);
    }
    this.flankLeft = document.getElementById('flank-left');
    this.flankRight = document.getElementById('flank-right');
    this.surfer = document.getElementById('doodle-surfer');
  }

  onScroll(scrollY) {
    const { leftOffset, rightOffset, surferTilt } = this.calculateParallax(scrollY);
    const flankLeft = this.flankLeft || document.getElementById('flank-left');
    const flankRight = this.flankRight || document.getElementById('flank-right');
    const surfer = this.surfer || document.getElementById('doodle-surfer');

    if (flankLeft) flankLeft.style.transform = `translateY(-${leftOffset}px)`;
    if (flankRight) flankRight.style.transform = `translateY(-${rightOffset}px)`;
    if (surfer) surfer.setAttribute('transform', `translate(130, ${320 + rightOffset * 0.5}) rotate(${surferTilt})`);
  }
}
