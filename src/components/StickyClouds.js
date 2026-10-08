export class StickyClouds {
  constructor(options = {}) {
    this.options = options;
  }

  generateSVG() {
    return `
      <div id="sticky-clouds-wrapper" class="sticky-clouds-wrapper" aria-hidden="true">
        <svg class="clouds-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Bộ lọc tạo hiệu ứng nét giấy mộc cho mây -->
            <filter id="paper-cloud-texture" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>

          <!-- Mây tầng 1 (Viễn cảnh kem sáng - Ink Double-Line Sketch) -->
          <g class="sticky-cloud cloud-bg cloud-bg-1" transform="translate(40, -10)">
            <!-- Nền màu nước loang nhẹ -->
            <path d="M0,52 Q40,12 90,32 Q140,6 200,32 Q260,16 310,52 Q330,76 290,92 L20,92 Q0,85 0,52 Z" fill="#ffffff" opacity="0.95"/>
            <!-- Nét viền chính mực than chì -->
            <path d="M0,52 Q40,12 90,32 Q140,6 200,32 Q260,16 310,52 Q330,76 290,92 L20,92 Q0,85 0,52 Z" fill="none" stroke="#1e293b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Nét viền kép phụ nét đứt tự do (cloud-double-line) -->
            <path class="cloud-double-line" d="M12,50 Q45,18 88,34 Q138,12 196,34 Q252,22 300,52" fill="none" stroke="#1e293b" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="round"/>
            <!-- Hàng gạch bóng hatching xiên chéo dưới bụng mây (cloud-hatching-belly) -->
            <g class="cloud-hatching-belly" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round">
              <line x1="30" y1="92" x2="42" y2="82"/>
              <line x1="50" y1="92" x2="62" y2="82"/>
              <line x1="70" y1="92" x2="82" y2="82"/>
              <line x1="90" y1="92" x2="102" y2="82"/>
              <line x1="110" y1="92" x2="122" y2="82"/>
              <line x1="130" y1="92" x2="142" y2="82"/>
              <line x1="150" y1="92" x2="162" y2="82"/>
              <line x1="170" y1="92" x2="182" y2="82"/>
              <line x1="190" y1="92" x2="202" y2="82"/>
              <line x1="210" y1="92" x2="222" y2="82"/>
              <line x1="230" y1="92" x2="242" y2="82"/>
              <line x1="250" y1="92" x2="262" y2="82"/>
              <line x1="270" y1="92" x2="282" y2="82"/>
            </g>
          </g>

          <g class="sticky-cloud cloud-bg cloud-bg-2" transform="translate(820, -15)">
            <!-- Nền màu nước loang nhẹ -->
            <path d="M0,56 Q50,16 110,36 Q170,11 240,36 Q300,19 360,56 Q380,82 340,96 L30,96 Q5,90 0,56 Z" fill="#ffffff" opacity="0.95"/>
            <!-- Nét viền chính mực than chì -->
            <path d="M0,56 Q50,16 110,36 Q170,11 240,36 Q300,19 360,56 Q380,82 340,96 L30,96 Q5,90 0,56 Z" fill="none" stroke="#1e293b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Nét viền kép phụ nét đứt tự do (cloud-double-line) -->
            <path class="cloud-double-line" d="M15,54 Q55,22 108,38 Q168,17 236,38 Q294,25 350,56" fill="none" stroke="#1e293b" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="round"/>
            <!-- Hàng gạch bóng hatching xiên chéo dưới bụng mây (cloud-hatching-belly) -->
            <g class="cloud-hatching-belly" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round">
              <line x1="40" y1="96" x2="52" y2="86"/>
              <line x1="65" y1="96" x2="77" y2="86"/>
              <line x1="90" y1="96" x2="102" y2="86"/>
              <line x1="115" y1="96" x2="127" y2="86"/>
              <line x1="140" y1="96" x2="152" y2="86"/>
              <line x1="165" y1="96" x2="177" y2="86"/>
              <line x1="190" y1="96" x2="202" y2="86"/>
              <line x1="215" y1="96" x2="227" y2="86"/>
              <line x1="240" y1="96" x2="252" y2="86"/>
              <line x1="265" y1="96" x2="277" y2="86"/>
              <line x1="290" y1="96" x2="302" y2="86"/>
              <line x1="315" y1="96" x2="327" y2="86"/>
            </g>
          </g>

          <!-- Mây tầng 2 (Trung cảnh xếp nếp giấy Kokuyo - Nét Đôi & Gạch Bóng) -->
          <g class="sticky-cloud cloud-main-1" transform="translate(180, 5)">
            <!-- Nền giấy Kokuyo ngà vàng -->
            <path d="M0,46 Q35,9 85,26 Q135,6 190,26 Q245,11 290,46 Q310,72 270,82 L20,82 Q0,75 0,46 Z" fill="#faf7f0"/>
            <!-- Nét viền chính mực than chì -->
            <path d="M0,46 Q35,9 85,26 Q135,6 190,26 Q245,11 290,46 Q310,72 270,82 L20,82 Q0,75 0,46 Z" fill="none" stroke="#1e293b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Nét viền kép phụ nét đứt tự do (cloud-double-line) -->
            <path class="cloud-double-line" d="M10,44 Q40,15 82,28 Q132,12 186,28 Q238,17 280,46" fill="none" stroke="#1e293b" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="round"/>
            <!-- Hàng gạch bóng hatching xiên chéo dưới bụng mây (cloud-hatching-belly) -->
            <g class="cloud-hatching-belly" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round">
              <line x1="25" y1="82" x2="37" y2="72"/>
              <line x1="45" y1="82" x2="57" y2="72"/>
              <line x1="65" y1="82" x2="77" y2="72"/>
              <line x1="85" y1="82" x2="97" y2="72"/>
              <line x1="105" y1="82" x2="117" y2="72"/>
              <line x1="125" y1="82" x2="137" y2="72"/>
              <line x1="145" y1="82" x2="157" y2="72"/>
              <line x1="165" y1="82" x2="177" y2="72"/>
              <line x1="185" y1="82" x2="197" y2="72"/>
              <line x1="205" y1="82" x2="217" y2="72"/>
              <line x1="225" y1="82" x2="237" y2="72"/>
              <line x1="245" y1="82" x2="257" y2="72"/>
            </g>
          </g>

          <g class="sticky-cloud cloud-main-2" transform="translate(560, -5)">
            <!-- Nền giấy Kokuyo ngà vàng -->
            <path d="M0,52 Q45,13 100,32 Q155,9 220,32 Q280,13 330,52 Q350,77 310,87 L20,87 Q0,80 0,52 Z" fill="#faf7f0"/>
            <!-- Nét viền chính mực than chì -->
            <path d="M0,52 Q45,13 100,32 Q155,9 220,32 Q280,13 330,52 Q350,77 310,87 L20,87 Q0,80 0,52 Z" fill="none" stroke="#1e293b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Nét viền kép phụ nét đứt tự do (cloud-double-line) -->
            <path class="cloud-double-line" d="M12,50 Q50,19 98,34 Q152,15 216,34 Q274,19 320,52" fill="none" stroke="#1e293b" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="round"/>
            <!-- Hàng gạch bóng hatching xiên chéo dưới bụng mây (cloud-hatching-belly) -->
            <g class="cloud-hatching-belly" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round">
              <line x1="30" y1="87" x2="42" y2="77"/>
              <line x1="55" y1="87" x2="67" y2="77"/>
              <line x1="80" y1="87" x2="92" y2="77"/>
              <line x1="105" y1="87" x2="117" y2="77"/>
              <line x1="130" y1="87" x2="142" y2="77"/>
              <line x1="155" y1="87" x2="167" y2="77"/>
              <line x1="180" y1="87" x2="192" y2="77"/>
              <line x1="205" y1="87" x2="217" y2="77"/>
              <line x1="230" y1="87" x2="242" y2="77"/>
              <line x1="255" y1="87" x2="267" y2="77"/>
              <line x1="280" y1="87" x2="292" y2="77"/>
            </g>
          </g>

          <g class="sticky-cloud cloud-main-3" transform="translate(1080, 5)">
            <!-- Nền giấy Kokuyo ngà vàng -->
            <path d="M0,46 Q35,9 85,26 Q135,6 190,26 Q245,11 290,46 Q310,72 270,82 L20,82 Q0,75 0,46 Z" fill="#faf7f0"/>
            <!-- Nét viền chính mực than chì -->
            <path d="M0,46 Q35,9 85,26 Q135,6 190,26 Q245,11 290,46 Q310,72 270,82 L20,82 Q0,75 0,46 Z" fill="none" stroke="#1e293b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Nét viền kép phụ nét đứt tự do (cloud-double-line) -->
            <path class="cloud-double-line" d="M10,44 Q40,15 82,28 Q132,12 186,28 Q238,17 280,46" fill="none" stroke="#1e293b" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="round"/>
            <!-- Hàng gạch bóng hatching xiên chéo dưới bụng mây (cloud-hatching-belly) -->
            <g class="cloud-hatching-belly" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round">
              <line x1="25" y1="82" x2="37" y2="72"/>
              <line x1="45" y1="82" x2="57" y2="72"/>
              <line x1="65" y1="82" x2="77" y2="72"/>
              <line x1="85" y1="82" x2="97" y2="72"/>
              <line x1="105" y1="82" x2="117" y2="72"/>
              <line x1="125" y1="82" x2="137" y2="72"/>
              <line x1="145" y1="82" x2="157" y2="72"/>
              <line x1="165" y1="82" x2="177" y2="72"/>
              <line x1="185" y1="82" x2="197" y2="72"/>
              <line x1="205" y1="82" x2="217" y2="72"/>
              <line x1="225" y1="82" x2="237" y2="72"/>
              <line x1="245" y1="82" x2="257" y2="72"/>
            </g>
          </g>

          <!-- Mặt trời Ký Họa Bút Mực & Vệt Màu Nước (doodle-sun doodle-sun-sketch) -->
          <g class="doodle-sun doodle-sun-sketch" transform="translate(1320, 42)">
            <!-- Vệt loang màu nước vàng tươi (sun-watercolor-glow) -->
            <circle cx="0" cy="0" r="34" fill="#fde047" opacity="0.25" class="sun-watercolor-glow"/>
            <circle cx="1" cy="-1" r="28" fill="#fde047" opacity="0.45"/>
            <!-- Thân mặt trời giấy ngà -->
            <circle cx="0" cy="0" r="23" fill="#fef08a"/>

            <!-- Tia nắng bất đối xứng phóng khoáng (sun-freehand-rays) -->
            <g class="sun-freehand-rays" stroke="#1e293b" stroke-linecap="round" fill="none">
              <!-- Tia đỉnh trên -->
              <path d="M0,-26 C1,-32 -2,-37 0,-44" stroke-width="2.3"/>
              <!-- Tia góc trên phải -->
              <path d="M17,-19 C23,-24 26,-28 32,-35" stroke-width="2.2"/>
              <path d="M24,-10 C29,-12 32,-14 37,-16" stroke-width="1.8"/>
              <!-- Tia ngang phải -->
              <path d="M26,1 C32,0 38,2 45,2" stroke-width="2.4"/>
              <!-- Tia góc dưới phải -->
              <path d="M23,12 C28,15 31,17 36,19" stroke-width="1.8"/>
              <path d="M19,19 C24,24 28,29 33,36" stroke-width="2.2"/>
              <!-- Tia đáy dưới -->
              <path d="M0,26 C-1,32 2,38 0,45" stroke-width="2.3"/>
              <!-- Tia góc dưới trái -->
              <path d="M-19,19 C-24,24 -28,29 -34,35" stroke-width="2.2"/>
              <path d="M-24,10 C-29,12 -33,14 -38,16" stroke-width="1.8"/>
              <!-- Tia ngang trái -->
              <path d="M-26,0 C-32,-1 -38,1 -44,0" stroke-width="2.4"/>
              <!-- Tia góc trên trái -->
              <path d="M-18,-19 C-23,-24 -27,-29 -33,-36" stroke-width="2.2"/>
              <path d="M-11,-24 C-13,-28 -16,-32 -18,-37" stroke-width="1.8"/>
            </g>

            <!-- Vòng tròn ký họa nét mực kép của thân mặt trời -->
            <circle cx="0" cy="0" r="23" fill="none" stroke="#1e293b" stroke-width="2.4"/>
            <path d="M-21,5 A22,22 0 1,1 21,5 A22,22 0 0,1 -21,5" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="4 3"/>

            <!-- Đôi mắt cười bút kim mộc mạc với đốm sáng -->
            <circle cx="-7" cy="-4" r="2.5" fill="#1e293b"/>
            <circle cx="-6" cy="-5" r="0.8" fill="#ffffff"/>
            <circle cx="7" cy="-4" r="2.5" fill="#1e293b"/>
            <circle cx="8" cy="-5" r="0.8" fill="#ffffff"/>
            <!-- Lông mày lượn sóng doodle -->
            <path d="M-10,-8 Q-7,-10 -4,-8" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M4,-8 Q7,-10 10,-8" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>

            <!-- Nụ cười rạng rỡ bút kim -->
            <path d="M-8,5 Q0,14 8,5" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M-9,4 Q-8,6 -7,5" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M7,5 Q8,6 9,4" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>

            <!-- Má hồng màu nước loang và gạch nét phẩy -->
            <ellipse cx="-13" cy="4" rx="4" ry="2.5" fill="#f87171" opacity="0.6"/>
            <ellipse cx="13" cy="4" rx="4" ry="2.5" fill="#f87171" opacity="0.6"/>
            <line x1="-15" y1="3" x2="-11" y2="5" stroke="#e11d48" stroke-width="1" stroke-linecap="round"/>
            <line x1="11" y1="3" x2="15" y2="5" stroke="#e11d48" stroke-width="1" stroke-linecap="round"/>
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
