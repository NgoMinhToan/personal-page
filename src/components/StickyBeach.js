export class StickyBeach {
  constructor(options = {}) {
    this.options = options;
  }

  generateSVG() {
    return `
      <div id="sticky-beach-wrapper" class="sticky-beach-wrapper" aria-hidden="true">
        <svg class="beach-svg" viewBox="0 0 1440 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Định nghĩa dải màu nước loang tự nhiên -->
          <defs>
            <linearGradient id="deepWaveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0284c7" />
              <stop offset="100%" stop-color="#0369a1" />
            </linearGradient>
            <linearGradient id="shallowWaveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
            <linearGradient id="sandPaperGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="100%" stop-color="#fde047" />
            </linearGradient>
          </defs>

          <!-- Lớp 1: Sóng sâu Ocean Teal Mộc bản (Deep Woodblock Waves) -->
          <path class="ocean-wave-layer wave-deep wave-woodblock-ink"
                d="M0,58 C180,30 360,78 540,46 C720,20 900,68 1080,36 C1260,16 1360,54 1440,34 L1440,140 L0,140 Z"
                fill="url(#deepWaveGrad)" stroke="#1e293b" stroke-width="2.6"/>
          <!-- Đường gờ ngọn sóng mộc bản phụ (Woodblock crest inner ridges) -->
          <path class="wave-woodblock-ink wave-crest-ridge"
                d="M10,66 C180,44 340,78 500,54 C680,34 840,70 1020,44 C1200,28 1320,56 1430,42"
                fill="none" stroke="#1e293b" stroke-width="1.6" stroke-dasharray="18 8" opacity="0.45"/>
          <path class="wave-woodblock-ink wave-contour-swirl"
                d="M260,56 C320,48 370,62 420,58 M780,42 C840,34 900,48 960,42 M1280,32 C1330,24 1380,36 1420,32"
                fill="none" stroke="#1e293b" stroke-width="1.4" opacity="0.35"/>

          <!-- Lớp 2: Sóng nông Shallow Blue Pastel với bọt sóng vẽ tay (Shallow Woodblock Wave & Hand-drawn Foam) -->
          <path class="ocean-wave-layer wave-shallow wave-woodblock-ink"
                d="M0,74 C180,52 360,88 540,64 C720,42 900,82 1080,58 C1260,38 1360,74 1440,56 L1440,140 L0,140 Z"
                fill="url(#shallowWaveGrad)" stroke="#1e293b" stroke-width="2.6"/>
          <!-- Bọt sóng nét bút kim & viền bọt trắng vẽ tay (Wave foam sketch) -->
          <path class="wave-foam wave-foam-sketch"
                d="M0,72 C180,50 360,86 540,62 C720,40 900,80 1080,56 C1260,36 1360,72 1440,54"
                fill="none" stroke="#faf7f0" stroke-width="3.6" stroke-dasharray="14 7 4 7" stroke-linecap="round"/>
          <path class="wave-foam-sketch wave-foam-ink-contour"
                d="M15,75 C70,64 130,58 200,68 C270,78 340,84 410,72 C480,60 550,56 620,64 C690,72 760,80 830,68 C900,56 970,54 1040,62 C1110,70 1180,74 1250,62 C1320,50 1380,58 1435,56"
                fill="none" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.6"/>

          <!-- Lớp 3: Bờ cát vàng Beach Sand Paper với kỹ thuật chấm hạt Stippling -->
          <path class="beach-sand-layer"
                d="M0,94 C220,80 440,104 680,88 C920,72 1160,98 1440,84 L1440,140 L0,140 Z"
                fill="url(#sandPaperGrad)" stroke="#1e293b" stroke-width="2.6"/>

          <!-- Bờ cát chấm hạt stippling nghệ thuật sổ tay (Sand Stippling Dots) -->
          <g class="sand-stippling-dots">
            <!-- Cụm chấm hạt trái (x: 40 - 330) -->
            <circle cx="50" cy="102" r="1.1" fill="#1e293b" opacity="0.38"/>
            <circle cx="75" cy="110" r="0.9" fill="#1e293b" opacity="0.32"/>
            <circle cx="95" cy="105" r="1.3" fill="#1e293b" opacity="0.45"/>
            <circle cx="120" cy="116" r="1.0" fill="#1e293b" opacity="0.35"/>
            <circle cx="145" cy="108" r="0.8" fill="#1e293b" opacity="0.30"/>
            <circle cx="170" cy="114" r="1.2" fill="#1e293b" opacity="0.40"/>
            <circle cx="195" cy="106" r="0.9" fill="#1e293b" opacity="0.33"/>
            <circle cx="215" cy="120" r="1.4" fill="#1e293b" opacity="0.42"/>
            <circle cx="280" cy="118" r="1.0" fill="#1e293b" opacity="0.35"/>
            <circle cx="305" cy="112" r="1.2" fill="#1e293b" opacity="0.38"/>
            <circle cx="330" cy="122" r="0.8" fill="#1e293b" opacity="0.30"/>

            <!-- Cụm chấm hạt trung tâm (x: 380 - 800) -->
            <circle cx="380" cy="114" r="1.1" fill="#1e293b" opacity="0.35"/>
            <circle cx="410" cy="125" r="0.9" fill="#1e293b" opacity="0.30"/>
            <circle cx="445" cy="112" r="1.3" fill="#1e293b" opacity="0.40"/>
            <circle cx="480" cy="119" r="1.0" fill="#1e293b" opacity="0.32"/>
            <circle cx="520" cy="110" r="0.8" fill="#1e293b" opacity="0.28"/>
            <circle cx="560" cy="124" r="1.2" fill="#1e293b" opacity="0.38"/>
            <circle cx="600" cy="115" r="1.0" fill="#1e293b" opacity="0.35"/>
            <circle cx="640" cy="108" r="1.4" fill="#1e293b" opacity="0.42"/>
            <circle cx="680" cy="122" r="0.9" fill="#1e293b" opacity="0.30"/>
            <circle cx="720" cy="112" r="1.1" fill="#1e293b" opacity="0.36"/>
            <circle cx="760" cy="126" r="1.3" fill="#1e293b" opacity="0.40"/>
            <circle cx="800" cy="116" r="0.8" fill="#1e293b" opacity="0.28"/>

            <!-- Cụm chấm hạt phải (x: 850 - 1410) -->
            <circle cx="850" cy="110" r="1.1" fill="#1e293b" opacity="0.35"/>
            <circle cx="890" cy="124" r="1.3" fill="#1e293b" opacity="0.40"/>
            <circle cx="930" cy="115" r="0.9" fill="#1e293b" opacity="0.30"/>
            <circle cx="970" cy="122" r="1.2" fill="#1e293b" opacity="0.38"/>
            <circle cx="1010" cy="112" r="0.8" fill="#1e293b" opacity="0.28"/>
            <circle cx="1050" cy="126" r="1.4" fill="#1e293b" opacity="0.42"/>
            <circle cx="1090" cy="116" r="1.0" fill="#1e293b" opacity="0.34"/>
            <circle cx="1130" cy="120" r="1.2" fill="#1e293b" opacity="0.38"/>
            <circle cx="1220" cy="122" r="1.1" fill="#1e293b" opacity="0.35"/>
            <circle cx="1260" cy="114" r="0.9" fill="#1e293b" opacity="0.30"/>
            <circle cx="1300" cy="125" r="1.3" fill="#1e293b" opacity="0.40"/>
            <circle cx="1340" cy="112" r="0.8" fill="#1e293b" opacity="0.28"/>
            <circle cx="1380" cy="118" r="1.2" fill="#1e293b" opacity="0.36"/>
            <circle cx="1410" cy="124" r="1.0" fill="#1e293b" opacity="0.32"/>
          </g>

          <!-- Vỏ sò ký họa bút kim & vệt màu nước (Doodle Seashell Sketch) -->
          <g class="doodle-seashell doodle-seashell-sketch" transform="translate(240, 112)">
            <!-- Bóng đổ nét gạch chéo dưới đáy vỏ sò -->
            <ellipse cx="0" cy="13" rx="14" ry="3" fill="#1e293b" opacity="0.15"/>
            <!-- Thân vỏ sò nét viền kép mộc mạc -->
            <path d="M0,11 C-13,6 -17,-5 -11,-12 C-5,-16 5,-16 11,-12 C17,-5 13,6 0,11 Z"
                  fill="#faf6ed" stroke="#1e293b" stroke-width="2.2" stroke-linejoin="round"/>
            <!-- Vệt loang màu nước ngà cam -->
            <path d="M0,9 C-9,5 -12,-3 -8,-9 C-3,-12 3,-12 8,-9 C12,-3 9,5 0,9 Z"
                  fill="#fed7aa" opacity="0.45"/>
            <!-- Các đường gân vỏ sò ký họa tỏa hình nan quạt (Radiating ribs) -->
            <line x1="0" y1="10" x2="-8" y2="-10" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
            <line x1="0" y1="10" x2="-4" y2="-13" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="0" y1="10" x2="0" y2="-14" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="0" y1="10" x2="4" y2="-13" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="0" y1="10" x2="8" y2="-10" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
            <!-- Nét gạch bóng đáy vỏ sò -->
            <path d="M-6,7 Q0,10 6,7 M-4,4 Q0,7 4,4" stroke="#1e293b" stroke-width="1.1" fill="none" opacity="0.5"/>
          </g>

          <!-- Sao biển 5 cánh ký họa bút kim & chấm hạt cam (Doodle Starfish Sketch) -->
          <g class="doodle-starfish doodle-starfish-sketch" transform="translate(1180, 108)">
            <!-- Bóng đổ nhẹ dưới cát -->
            <ellipse cx="0" cy="11" rx="12" ry="3" fill="#1e293b" opacity="0.15"/>
            <!-- Thân sao biển 5 cánh nét chì than -->
            <polygon points="0,-14 3.5,-4 14,-3 6,4 9,14 0,8 -9,14 -6,4 -14,-3 -3.5,-4"
                     fill="#fb923c" stroke="#1e293b" stroke-width="2.2" stroke-linejoin="round"/>
            <!-- Vệt màu nước vàng cam bên trong -->
            <polygon points="0,-9 2.5,-3 9,-2 4,3 6,9 0,5 -6,9 -4,3 -9,-2 -2.5,-3"
                     fill="#fef08a" opacity="0.45"/>
            <!-- Tâm sao biển & đốm xúc tu ký họa (Stippling dots on arms) -->
            <circle cx="0" cy="1" r="2.2" fill="#1e293b"/>
            <!-- Chấm hạt xúc tu trên 5 cánh sao -->
            <circle cx="0" cy="-8" r="1.0" fill="#1e293b" opacity="0.8"/>
            <circle cx="0" cy="-5" r="0.9" fill="#1e293b" opacity="0.8"/>
            <circle cx="8" cy="-1.5" r="1.0" fill="#1e293b" opacity="0.8"/>
            <circle cx="5" cy="-0.5" r="0.9" fill="#1e293b" opacity="0.8"/>
            <circle cx="5" cy="8" r="1.0" fill="#1e293b" opacity="0.8"/>
            <circle cx="3" cy="5" r="0.9" fill="#1e293b" opacity="0.8"/>
            <circle cx="-5" cy="8" r="1.0" fill="#1e293b" opacity="0.8"/>
            <circle cx="-3" cy="5" r="0.9" fill="#1e293b" opacity="0.8"/>
            <circle cx="-8" cy="-1.5" r="1.0" fill="#1e293b" opacity="0.8"/>
            <circle cx="-5" cy="-0.5" r="0.9" fill="#1e293b" opacity="0.8"/>
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
