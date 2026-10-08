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
      surferTilt: Math.sin(clampedY * 0.005) * 8
    };
  }

  generateHTML() {
    return `
      <!-- Sườn Trái: Rặng Dừa Ký Họa & 3 Chú Khỉ Tinh Nghịch (Traveler's Sketch) -->
      <aside class="side-flank side-flank-left" id="flank-left" aria-hidden="true">
        <svg class="flank-svg flank-left-svg" viewBox="0 0 240 1800" preserveAspectRatio="xMinYMin meet">
          <!-- Trạm 1: Cây Dừa Ký Họa Đón Gió & Khỉ Vẫy Tay Cành Cao -->
          <g class="palm-station" transform="translate(35, 90)">
            <!-- Thân dừa: Nét mực viền kép, gạch bóng vỏ cây & vệt màu nước hổ phách -->
            <path class="palm-trunk-sketch" d="M30,340 C15,240 20,150 42,40 L54,42 C34,150 30,240 46,340 Z" fill="#d97706" fill-opacity="0.32" stroke="none"/>
            <path class="palm-trunk-sketch" d="M30,340 C15,240 20,150 42,40" fill="none" stroke="#1e293b" stroke-width="2.6" stroke-linecap="round"/>
            <path class="palm-trunk-sketch" d="M46,340 C32,240 36,150 56,40" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
            <g class="palm-trunk-sketch" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round">
              <line x1="32" y1="310" x2="45" y2="308"/>
              <line x1="29" y1="280" x2="43" y2="278"/>
              <line x1="26" y1="250" x2="41" y2="248"/>
              <line x1="24" y1="220" x2="39" y2="218"/>
              <line x1="25" y1="190" x2="40" y2="188"/>
              <line x1="28" y1="160" x2="43" y2="158"/>
              <line x1="32" y1="130" x2="47" y2="128"/>
              <line x1="36" y1="100" x2="50" y2="98"/>
              <line x1="40" y1="70" x2="54" y2="68"/>
              <!-- Gạch bóng cross-hatching tạo khối mép thân dừa -->
              <path d="M33,315 L43,303 M31,285 L41,273 M28,255 L38,243 M26,225 L36,213 M27,195 L37,183" stroke="#1e293b" stroke-width="1" opacity="0.7"/>
            </g>

            <!-- Tán lá dừa lông vũ: Nét tỉa mực xù sống động & vệt loang màu nước xanh tươi -->
            <g class="palm-frond-feather">
              <path d="M48,40 C10,10 -30,20 -55,60 C-20,35 15,25 48,40 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M48,40 C20,-20 -5,-35 -40,-20 C0,-15 25,5 48,40 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M48,40 C55,-35 85,-45 115,-20 C85,-10 65,10 48,40 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M48,40 C80,-5 125,15 135,55 C105,25 75,25 48,40 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M48,40 C80,35 110,65 115,115 C95,75 70,55 48,40 Z" fill="#86efac" fill-opacity="0.45"/>
              <!-- Sống lá chính nét mực đậm -->
              <path d="M48,40 Q-15,15 -55,60" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M48,40 Q10,-25 -40,-20" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M48,40 Q65,-40 115,-20" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M48,40 Q105,10 135,55" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M48,40 Q90,65 115,115" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <!-- Đường tỉa răng cưa lá dừa lông vũ -->
              <path d="M35,35 L20,48 M25,30 L10,44 M15,28 L-2,40 M5,28 L-15,42 M-5,32 L-28,48 M-15,38 L-40,55" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M40,25 L25,5 M30,15 L12,-5 M20,5 L2,-15 M10,-2 L-10,-18 M-5,-8 L-25,-20" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M55,25 L75,10 M65,15 L88,-2 M78,5 L102,-8 M88,0 L110,-12" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M60,35 L88,32 M72,42 L105,42 M85,48 L122,50 M95,52 L128,60" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M58,48 L80,72 M68,60 L92,88 M78,75 L102,102 M88,90 L110,114" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
            </g>

            <!-- Chùm dừa tròn có đốm sáng phản chiếu -->
            <g class="palm-coconuts" transform="translate(44, 42)">
              <circle cx="-5" cy="-2" r="6.5" fill="#a16207" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="-3" cy="-4" r="1.5" fill="#ffffff" opacity="0.9"/>
              <circle cx="5" cy="0" r="7" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="7" cy="-2" r="1.5" fill="#ffffff" opacity="0.9"/>
              <circle cx="0" cy="7" r="6" fill="#854d0e" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="2" cy="5" r="1.4" fill="#ffffff" opacity="0.9"/>
            </g>

            <!-- Chú Khỉ 1: Bám cành cao vẫy tay chào người xem -->
            <g class="doodle-monkey monkey-1" transform="translate(24, 150)">
              <!-- Đuôi quấn chữ S dẻo dai -->
              <path d="M-8,14 C-20,24 -26,38 -18,48 C-12,54 -2,48 -8,38" fill="none" stroke="#78350f" stroke-width="4.5" stroke-linecap="round"/>
              <path d="M-8,14 C-20,24 -26,38 -18,48 C-12,54 -2,48 -8,38" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <!-- Thân khỉ & gạch bóng lông ngực -->
              <ellipse cx="0" cy="5" rx="13" ry="16" fill="#78350f" stroke="#1e293b" stroke-width="2.2"/>
              <ellipse cx="1" cy="6" rx="8" ry="10" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <path d="M-3,3 L0,7 M1,2 L4,6 M-1,8 L2,12" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
              <!-- Chân khỉ bám vững -->
              <path d="M-8,18 Q-14,28 -6,32" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M-8,18 Q-14,28 -6,32" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M8,18 Q14,28 6,32" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M8,18 Q14,28 6,32" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <!-- Tay trái bám thân cây -->
              <path d="M-10,0 Q-22,2 -16,12" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M-10,0 Q-22,2 -16,12" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <ellipse cx="-16" cy="12" rx="3.5" ry="3.5" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <!-- Tay phải vẫy chào vui nhộn -->
              <path d="M10,-2 Q22,-18 20,-30" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M10,-2 Q22,-18 20,-30" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="20" cy="-32" r="3.5" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <path d="M26,-36 Q28,-30 26,-24" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
              <!-- Đầu, tai, mõm & mắt lấp lánh (sparkle eyes) -->
              <circle cx="0" cy="-15" r="12" fill="#78350f" stroke="#1e293b" stroke-width="2.2"/>
              <circle cx="-12" cy="-16" r="4.5" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="-12" cy="-16" r="2.5" fill="#fbcfe8"/>
              <circle cx="12" cy="-16" r="4.5" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="12" cy="-16" r="2.5" fill="#fbcfe8"/>
              <ellipse cx="0" cy="-11" rx="8" ry="6" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <ellipse cx="0" cy="-13" rx="1.5" ry="1" fill="#1e293b"/>
              <path d="M-3,-9 Q0,-6 3,-9" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="-4" cy="-17" r="2.8" fill="#1e293b"/>
              <circle class="monkey-eye-sparkle" cx="-3" cy="-18" r="1.1" fill="#ffffff"/>
              <circle cx="4" cy="-17" r="2.8" fill="#1e293b"/>
              <circle class="monkey-eye-sparkle" cx="5" cy="-18" r="1.1" fill="#ffffff"/>
            </g>
          </g>

          <!-- Trạm 2: Cây Dừa Nghiêng Thân & Khỉ Đu Ngược Thích Thú -->
          <g class="palm-station" transform="translate(45, 730)">
            <path class="palm-trunk-sketch" d="M25,350 C55,250 50,150 15,35 L28,33 C66,150 71,250 41,350 Z" fill="#d97706" fill-opacity="0.32" stroke="none"/>
            <path class="palm-trunk-sketch" d="M25,350 C55,250 50,150 15,35" fill="none" stroke="#1e293b" stroke-width="2.6" stroke-linecap="round"/>
            <path class="palm-trunk-sketch" d="M41,350 C71,250 66,150 28,33" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
            <g class="palm-trunk-sketch" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round">
              <line x1="27" y1="320" x2="43" y2="320"/>
              <line x1="33" y1="290" x2="49" y2="290"/>
              <line x1="40" y1="260" x2="56" y2="260"/>
              <line x1="45" y1="230" x2="61" y2="230"/>
              <line x1="47" y1="200" x2="63" y2="200"/>
              <line x1="45" y1="170" x2="61" y2="170"/>
              <line x1="39" y1="140" x2="55" y2="140"/>
              <line x1="31" y1="110" x2="47" y2="110"/>
              <line x1="23" y1="80" x2="38" y2="78"/>
              <line x1="17" y1="50" x2="31" y2="48"/>
              <path d="M29,325 L41,313 M36,295 L48,283 M43,265 L55,253 M48,235 L60,223 M50,205 L62,193" stroke="#1e293b" stroke-width="1" opacity="0.7"/>
            </g>

            <!-- Tán lá lông vũ Trạm 2 -->
            <g class="palm-frond-feather">
              <path d="M20,35 C-15,10 -50,25 -70,65 C-40,40 -5,30 20,35 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M20,35 C-5,-15 -25,-35 -60,-25 C-25,-18 0,5 20,35 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M20,35 C35,-30 65,-40 95,-15 C65,-8 45,10 20,35 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M20,35 C55,-10 95,15 110,60 C80,30 50,30 20,35 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M20,35 C50,45 80,75 85,120 C65,85 45,60 20,35 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M20,35 Q-35,25 -70,65" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M20,35 Q-15,-25 -60,-25" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M20,35 Q50,-35 95,-15" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M20,35 Q75,10 110,60" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M20,35 Q65,70 85,120" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M10,32 L-5,45 M0,28 L-18,40 M-10,28 L-32,45 M-25,35 L-50,55" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M12,20 L-2,5 M5,12 L-12,-8 M-5,0 L-25,-15 M-20,-8 L-45,-20" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M30,20 L50,5 M40,10 L65,-5 M55,2 L80,-10 M70,0 L90,-12" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M35,30 L60,32 M48,36 L80,40 M60,42 L95,50 M72,48 L105,58" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M32,42 L52,65 M42,55 L65,82 M52,70 L75,100 M62,85 L82,115" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
            </g>

            <g class="palm-coconuts" transform="translate(18, 38)">
              <circle cx="-4" cy="0" r="6" fill="#a16207" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="-2" cy="-2" r="1.3" fill="#ffffff" opacity="0.9"/>
              <circle cx="5" cy="2" r="6.5" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="7" cy="0" r="1.4" fill="#ffffff" opacity="0.9"/>
              <circle cx="0" cy="8" r="6" fill="#854d0e" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="2" cy="6" r="1.3" fill="#ffffff" opacity="0.9"/>
            </g>

            <!-- Chú Khỉ 2: Treo ngược người, đuôi móc thân cây -->
            <g class="doodle-monkey monkey-2" transform="translate(25, 110)">
              <!-- Đuôi móc tròn quanh thân dừa -->
              <path d="M0,-12 C-8,-26 2,-42 16,-40 C28,-38 26,-22 12,-20" fill="none" stroke="#78350f" stroke-width="4.5" stroke-linecap="round"/>
              <path d="M0,-12 C-8,-26 2,-42 16,-40 C28,-38 26,-22 12,-20" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <!-- Thân ngược & gạch bóng -->
              <ellipse cx="0" cy="0" rx="12" ry="15" fill="#78350f" stroke="#1e293b" stroke-width="2.2"/>
              <ellipse cx="0" cy="-1" rx="7.5" ry="9" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <path d="M-3,-4 L0,-1 M1,-5 L4,-2 M-2,1 L1,4" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
              <!-- Chân co lên trời tinh nghịch -->
              <path d="M-7,-8 Q-16,-18 -10,-24" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M-7,-8 Q-16,-18 -10,-24" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M7,-8 Q16,-18 10,-24" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M7,-8 Q16,-18 10,-24" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <!-- Hai tay đung đưa rủ xuống -->
              <path d="M-10,4 Q-18,16 -12,25" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M-10,4 Q-18,16 -12,25" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="-12" cy="26" r="3" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <path d="M10,4 Q18,16 12,25" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M10,4 Q18,16 12,25" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="12" cy="26" r="3" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <!-- Đầu dốc ngược, tai & mắt lấp lánh -->
              <circle cx="0" cy="18" r="11" fill="#78350f" stroke="#1e293b" stroke-width="2.2"/>
              <circle cx="-11" cy="18" r="4" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="-11" cy="18" r="2.2" fill="#fbcfe8"/>
              <circle cx="11" cy="18" r="4" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="11" cy="18" r="2.2" fill="#fbcfe8"/>
              <ellipse cx="0" cy="21" rx="7" ry="5.5" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <ellipse cx="0" cy="19" rx="1.4" ry="0.9" fill="#1e293b"/>
              <path d="M-3,23 Q0,26 3,23" fill="none" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="-3.5" cy="15" r="2.6" fill="#1e293b"/>
              <circle class="monkey-eye-sparkle" cx="-2.5" cy="14" r="1" fill="#ffffff"/>
              <circle cx="3.5" cy="15" r="2.6" fill="#1e293b"/>
              <circle class="monkey-eye-sparkle" cx="4.5" cy="14" r="1" fill="#ffffff"/>
            </g>
          </g>

          <!-- Trạm 3: Mỏm Đồi Cỏ Ký Họa & Khỉ Ôm Trái Dừa Bự -->
          <g class="palm-station" transform="translate(30, 1400)">
            <!-- Mỏm đồi cỏ ký họa: Nét viền kép & gạch cỏ xù -->
            <path d="M-20,130 Q60,70 200,130 L200,190 L-20,190 Z" fill="#86efac" fill-opacity="0.4" stroke="none"/>
            <path d="M-20,130 Q60,70 200,130" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M-20,135 Q60,75 200,135" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="4 3"/>
            <path d="M20,105 L23,95 M25,107 L30,97 M60,90 L63,80 M64,91 L70,82 M110,95 L112,85 M115,97 L120,88" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round"/>

            <!-- Cây dừa rủ bóng trên đồi -->
            <path class="palm-trunk-sketch" d="M120,120 C105,40 120,-30 145,-110 L158,-108 C135,-30 120,40 134,120 Z" fill="#d97706" fill-opacity="0.32" stroke="none"/>
            <path class="palm-trunk-sketch" d="M120,120 C105,40 120,-30 145,-110" fill="none" stroke="#1e293b" stroke-width="2.6" stroke-linecap="round"/>
            <path class="palm-trunk-sketch" d="M134,120 C120,40 135,-30 158,-108" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
            <g class="palm-trunk-sketch" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round">
              <line x1="121" y1="100" x2="135" y2="100"/>
              <line x1="116" y1="70" x2="130" y2="70"/>
              <line x1="113" y1="40" x2="127" y2="40"/>
              <line x1="115" y1="10" x2="129" y2="10"/>
              <line x1="122" y1="-20" x2="136" y2="-20"/>
              <line x1="131" y1="-50" x2="145" y2="-50"/>
              <line x1="140" y1="-80" x2="153" y2="-80"/>
              <path d="M122,105 L133,95 M117,75 L128,65 M114,45 L125,35 M117,15 L128,5" stroke="#1e293b" stroke-width="1" opacity="0.7"/>
            </g>

            <!-- Tán lá lông vũ Trạm 3 -->
            <g class="palm-frond-feather">
              <path d="M152,-110 C120,-135 70,-130 45,-95 C80,-115 115,-110 152,-110 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M152,-110 C150,-155 130,-175 90,-170 C120,-160 140,-135 152,-110 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M152,-110 C175,-165 205,-170 230,-140 C205,-135 185,-120 152,-110 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M152,-110 C190,-125 225,-100 235,-55 C205,-85 180,-95 152,-110 Z" fill="#86efac" fill-opacity="0.45"/>
              <path d="M152,-110 Q95,-125 45,-95" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M152,-110 Q125,-165 90,-170" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M152,-110 Q195,-165 230,-140" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M152,-110 Q215,-105 235,-55" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M135,-115 L115,-102 M120,-118 L98,-106 M102,-120 L78,-108 M85,-118 L60,-102" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M142,-128 L122,-142 M132,-140 L110,-155 M118,-150 L98,-165" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M165,-125 L185,-145 M178,-135 L202,-152 M195,-138 L220,-148" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M168,-115 L195,-110 M180,-110 L212,-98 M192,-100 L225,-80 M205,-90 L230,-65" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
            </g>
            <g class="palm-coconuts" transform="translate(150, -108)">
              <circle cx="-4" cy="2" r="6" fill="#a16207" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="-2" cy="0" r="1.3" fill="#ffffff" opacity="0.9"/>
              <circle cx="4" cy="4" r="6" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="6" cy="2" r="1.3" fill="#ffffff" opacity="0.9"/>
            </g>

            <!-- Chú Khỉ 3: Ngồi bệt ôm trọn trái dừa to tròn -->
            <g class="doodle-monkey monkey-3" transform="translate(45, 75)">
              <path d="M-8,14 C-18,18 -24,28 -18,34 C-12,38 -2,32 -6,24" fill="none" stroke="#78350f" stroke-width="4.5" stroke-linecap="round"/>
              <path d="M-8,14 C-18,18 -24,28 -18,34 C-12,38 -2,32 -6,24" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M-10,12 Q-18,22 -6,24" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M-10,12 Q-18,22 -6,24" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M10,12 Q18,22 6,24" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
              <path d="M10,12 Q18,22 6,24" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <ellipse cx="0" cy="5" rx="13" ry="15" fill="#78350f" stroke="#1e293b" stroke-width="2.2"/>
              <ellipse cx="0" cy="6" rx="8" ry="9" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <path d="M-3,3 L0,7 M1,2 L4,6" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
              <!-- Quả dừa to ôm trọn trong lòng -->
              <ellipse cx="1" cy="7" rx="9" ry="9" fill="#a16207" stroke="#1e293b" stroke-width="2"/>
              <path d="M-3,5 Q1,3 5,5" stroke="#78350f" stroke-width="1.2" fill="none"/>
              <ellipse cx="4" cy="4" rx="2" ry="1.2" fill="#ffffff" opacity="0.85"/>
              <path d="M-12,2 Q-14,9 -7,10" fill="none" stroke="#78350f" stroke-width="3.8" stroke-linecap="round"/>
              <path d="M-12,2 Q-14,9 -7,10" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M12,2 Q14,9 7,10" fill="none" stroke="#78350f" stroke-width="3.8" stroke-linecap="round"/>
              <path d="M12,2 Q14,9 7,10" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
              <!-- Đầu ngước nhìn lên tò mò -->
              <circle cx="2" cy="-14" r="11.5" fill="#78350f" stroke="#1e293b" stroke-width="2.2"/>
              <circle cx="-10" cy="-14" r="4.2" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="-10" cy="-14" r="2.3" fill="#fbcfe8"/>
              <circle cx="14" cy="-14" r="4.2" fill="#78350f" stroke="#1e293b" stroke-width="1.8"/>
              <circle cx="14" cy="-14" r="2.3" fill="#fbcfe8"/>
              <ellipse cx="3" cy="-10" rx="7.5" ry="5.5" fill="#fde68a" stroke="#1e293b" stroke-width="1.4"/>
              <ellipse cx="3" cy="-12" rx="1.5" ry="1" fill="#1e293b"/>
              <path d="M0,-8 Q3,-5 6,-8" fill="none" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="-0.5" cy="-16" r="2.8" fill="#1e293b"/>
              <circle class="monkey-eye-sparkle" cx="0.5" cy="-17" r="1.1" fill="#ffffff"/>
              <circle cx="7" cy="-16" r="2.8" fill="#1e293b"/>
              <circle class="monkey-eye-sparkle" cx="8" cy="-17" r="1.1" fill="#ffffff"/>
            </g>
          </g>
        </svg>
      </aside>

      <!-- Sườn Phải: Vận Động Viên Lướt Sóng, Người Tắm Phao & Dải Sóng Hokusai -->
      <aside class="side-flank side-flank-right" id="flank-right" aria-hidden="true">
        <svg class="flank-svg flank-right-svg" viewBox="0 0 240 1800" preserveAspectRatio="xMaxYMin meet">
          <!-- Dải Sóng Hokusai Dọc Theo Chiều Cao Trang: Viền mực uốn lượn, vệt màu nước loang & cuộn bọt -->
          <path class="wave-trail-hokusai" d="M190,0 Q130,280 180,560 Q230,840 160,1120 Q110,1400 180,1800 L240,1800 L240,0 Z" fill="#bae6fd" fill-opacity="0.25" stroke="none"/>
          <path class="wave-trail-hokusai" d="M185,0 C125,200 135,360 180,560 C225,760 145,920 160,1120 C175,1320 115,1520 180,1800" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round"/>
          <path class="wave-trail-hokusai" d="M195,0 C135,200 145,360 190,560 C235,760 155,920 170,1120 C185,1320 125,1520 190,1800" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-dasharray="12 8" stroke-linecap="round"/>
          <!-- Cuộn sóng mộc bản Hokusai & bọt nước xoáy gần Surfer -->
          <path class="wave-trail-hokusai" d="M140,240 Q115,280 150,300 Q180,310 165,280 Q150,260 140,240" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
          <path class="wave-trail-hokusai" d="M135,270 Q120,290 145,295" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-linecap="round"/>
          <circle class="wave-trail-hokusai" cx="125" cy="275" r="1.8" fill="#ffffff" stroke="#1e293b" stroke-width="1"/>
          <circle class="wave-trail-hokusai" cx="130" cy="260" r="1.4" fill="#ffffff" stroke="#1e293b" stroke-width="0.8"/>
          <circle class="wave-trail-hokusai" cx="140" cy="250" r="1.5" fill="#ffffff" stroke="#1e293b" stroke-width="0.8"/>
          <!-- Cuộn sóng gần Swimmer -->
          <path class="wave-trail-hokusai" d="M120,700 Q95,730 130,750 Q160,760 150,730 Q135,715 120,700" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
          <circle class="wave-trail-hokusai" cx="110" cy="725" r="1.8" fill="#ffffff" stroke="#1e293b" stroke-width="1"/>
          <circle class="wave-trail-hokusai" cx="118" cy="710" r="1.5" fill="#ffffff" stroke="#1e293b" stroke-width="0.8"/>
          <path class="wave-trail-hokusai" d="M130,1180 Q105,1210 140,1230 Q170,1240 160,1210" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>

          <!-- Surfer Động Học (Action Surfer): Tư thế khuỵu gối, kính goggles, ván cam & motion lines -->
          <g class="doodle-surfer" id="doodle-surfer" transform="translate(130, 320)">
            <!-- Motion lines & Bọt nước tung trắng xóa phía sau đuôi ván -->
            <g class="surf-motion-lines">
              <path d="M-60,32 Q-40,28 -15,30" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-dasharray="6 4" stroke-linecap="round"/>
              <path d="M-75,22 Q-50,20 -25,24" fill="none" stroke="#0284c7" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M-55,12 Q-35,14 -10,18" fill="none" stroke="#1e293b" stroke-width="1.4" stroke-dasharray="4 3" stroke-linecap="round"/>
              <circle cx="-42" cy="16" r="2.2" fill="#ffffff" stroke="#1e293b" stroke-width="1.2"/>
              <circle cx="-32" cy="8" r="1.6" fill="#ffffff" stroke="#1e293b" stroke-width="1"/>
              <circle cx="-50" cy="28" r="2.5" fill="#ffffff" stroke="#1e293b" stroke-width="1.2"/>
              <circle cx="-25" cy="4" r="1.4" fill="#ffffff" stroke="#1e293b" stroke-width="0.8"/>
              <circle cx="-60" cy="22" r="1.8" fill="#ffffff" stroke="#1e293b" stroke-width="1"/>
            </g>

            <!-- Ván lướt sóng ký họa: Vệt màu nước cam rực rỡ, đường viền kép & sọc thể thao -->
            <path class="surfboard-sketch" d="M-44,24 Q-20,12 40,20 Q48,22 46,26 Q20,36 -44,24 Z" fill="#fb923c" fill-opacity="0.75" stroke="#1e293b" stroke-width="2.4" stroke-linejoin="round"/>
            <path class="surfboard-sketch" d="M-40,24 Q-18,14 38,21" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            <line class="surfboard-sketch" x1="-36" y1="24" x2="36" y2="22" stroke="#1e293b" stroke-width="1.2" stroke-dasharray="4 2"/>
            <polygon class="surfboard-sketch" points="-34,25 -30,33 -24,25" fill="#1e293b"/>

            <!-- Cơ thể Surfer: Giải phẫu động học, khuỵu gối giữ thăng bằng -->
            <path d="M-14,23 L-18,10 L-6,2" fill="none" stroke="#0284c7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M-14,23 L-18,10 L-6,2" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <ellipse cx="-14" cy="23" rx="4" ry="2" fill="#fbcfe8" stroke="#1e293b" stroke-width="1.4"/>
            <path d="M16,21 L18,8 L4,2" fill="none" stroke="#0284c7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16,21 L18,8 L4,2" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <ellipse cx="16" cy="21" rx="4" ry="2" fill="#fbcfe8" stroke="#1e293b" stroke-width="1.4"/>
            <!-- Áo và thân trên nghiêng người theo ván -->
            <path d="M-6,2 L-2,-14 L4,-14 L4,2 Z" fill="#0284c7" stroke="#1e293b" stroke-width="2.2" stroke-linejoin="round"/>
            <line x1="-3" y1="-8" x2="1" y2="-4" stroke="#1e293b" stroke-width="1.2"/>
            <line x1="-4" y1="-4" x2="0" y2="0" stroke="#1e293b" stroke-width="1.2"/>
            <!-- Hai tay dang ngang đón gió -->
            <path d="M-2,-12 Q-16,-10 -26,-6" fill="none" stroke="#fbcfe8" stroke-width="4" stroke-linecap="round"/>
            <path d="M-2,-12 Q-16,-10 -26,-6" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
            <circle cx="-27" cy="-5" r="2.8" fill="#fbcfe8" stroke="#1e293b" stroke-width="1.4"/>
            <path d="M4,-12 Q18,-18 28,-14" fill="none" stroke="#fbcfe8" stroke-width="4" stroke-linecap="round"/>
            <path d="M4,-12 Q18,-18 28,-14" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
            <circle cx="29" cy="-13" r="2.8" fill="#fbcfe8" stroke="#1e293b" stroke-width="1.4"/>
            <!-- Đầu, tóc bay ngược & kính bảo hộ doodle goggles -->
            <circle cx="1" cy="-22" r="7.5" fill="#fbcfe8" stroke="#1e293b" stroke-width="2"/>
            <path d="M-5,-24 C-14,-28 -8,-34 3,-29 C-2,-30 -8,-27 -5,-24 Z" fill="#1e293b"/>
            <path d="M-6,-22 Q-15,-24 -12,-28" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Doodle Goggles -->
            <ellipse cx="3" cy="-22" rx="3.5" ry="2.2" fill="#bae6fd" stroke="#1e293b" stroke-width="1.8"/>
            <ellipse cx="0" cy="-22" rx="2.8" ry="2" fill="#bae6fd" stroke="#1e293b" stroke-width="1.8"/>
            <path d="M-3,-22 L-6,-21" stroke="#1e293b" stroke-width="1.5"/>
            <line x1="2" y1="-23" x2="4" y2="-21" stroke="#ffffff" stroke-width="1.2"/>
            <path d="M1,-17 Q4,-16 6,-18" fill="none" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
          </g>

          <!-- Người Tắm Biển Thư Thái Trên Phao Donut (Doodle Swimmer) -->
          <g class="doodle-swimmer" transform="translate(140, 780)">
            <!-- Gợn sóng nước xoáy quanh phao -->
            <ellipse cx="0" cy="18" rx="38" ry="12" fill="none" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="6 4" opacity="0.6"/>
            <ellipse cx="0" cy="22" rx="48" ry="15" fill="none" stroke="#7dd3fc" stroke-width="1.2" stroke-dasharray="8 6" opacity="0.4"/>
            <!-- Phao bơi donut sọc đỏ trắng nét mực -->
            <ellipse cx="0" cy="6" rx="32" ry="20" fill="#f87171" stroke="#1e293b" stroke-width="2.5"/>
            <path d="M-22,-4 Q-12,-8 -2,-7 L-4,0 Q-14,0 -20,3 Z" fill="#faf7f0" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M12,-6 Q22,-2 28,6 L21,9 Q16,2 8,-1 Z" fill="#faf7f0" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M-18,16 Q-6,21 6,21 L4,13 Q-5,13 -14,10 Z" fill="#faf7f0" stroke="#1e293b" stroke-width="1.5"/>
            <ellipse cx="0" cy="7" rx="14" ry="8" fill="#bae6fd" stroke="#1e293b" stroke-width="2"/>
            <!-- Thân người trong phao -->
            <ellipse cx="0" cy="-2" rx="11" ry="8" fill="#38bdf8" stroke="#1e293b" stroke-width="2"/>
            <!-- Tay bám phao & tay vẫy chào -->
            <path d="M-9,-2 Q-18,-2 -16,6" fill="none" stroke="#fbcfe8" stroke-width="4" stroke-linecap="round"/>
            <path d="M-9,-2 Q-18,-2 -16,6" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="-16" cy="7" r="2.8" fill="#fbcfe8" stroke="#1e293b" stroke-width="1.3"/>
            <path d="M9,-2 Q20,-10 22,-18" fill="none" stroke="#fbcfe8" stroke-width="4" stroke-linecap="round"/>
            <path d="M9,-2 Q20,-10 22,-18" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="23" cy="-19" r="2.8" fill="#fbcfe8" stroke="#1e293b" stroke-width="1.3"/>
            <path d="M28,-22 Q30,-18 28,-14" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
            <!-- Đầu, kính râm đen ngầu & nụ cười -->
            <circle cx="0" cy="-14" r="9" fill="#fbcfe8" stroke="#1e293b" stroke-width="2"/>
            <path d="M-7,-18 Q0,-24 7,-18" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
            <!-- Kính râm đen nét mực -->
            <ellipse cx="-3.5" cy="-14" rx="3.5" ry="2.2" fill="#1e293b"/>
            <ellipse cx="3.5" cy="-14" rx="3.5" ry="2.2" fill="#1e293b"/>
            <line x1="-0.5" y1="-14" x2="0.5" y2="-14" stroke="#1e293b" stroke-width="1.6"/>
            <line x1="-4.5" y1="-15" x2="-2.5" y2="-13" stroke="#ffffff" stroke-width="1"/>
            <line x1="2.5" y1="-15" x2="4.5" y2="-13" stroke="#ffffff" stroke-width="1"/>
            <path d="M-3,-9 Q0,-6 3,-9" fill="none" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
          </g>

          <!-- Lâu Đài Cát 3 Tháp & Ô Che Nắng Bãi Biển (Beach Decor Group) -->
          <g class="beach-decor-group" transform="translate(85, 1440)">
            <!-- Bóng đổ bãi cát gạch nét cross-hatching -->
            <ellipse cx="55" cy="46" rx="60" ry="12" fill="#fde047" fill-opacity="0.3"/>
            <path d="M15,44 L25,48 M30,45 L40,49 M50,45 L60,49 M75,45 L85,49 M95,45 L105,49" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
            <!-- Ô che nắng xiên góc sọc đỏ trắng -->
            <line x1="20" y1="-25" x2="35" y2="44" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
            <path d="M-10,-10 Q20,-55 52,-20 Z" fill="#f87171" stroke="#1e293b" stroke-width="2.4" stroke-linejoin="round"/>
            <path d="M5,-23 Q20,-48 35,-32 L30,-22 Q20,-38 10,-15 Z" fill="#faf7f0" stroke="#1e293b" stroke-width="1.5"/>
            <line x1="19" y1="-42" x2="18" y2="-48" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
            <path d="M-2,-14 L6,-22 M8,-17 L16,-25 M18,-20 L26,-28" stroke="#1e293b" stroke-width="1.2"/>
            <!-- Lâu đài cát 3 tháp có cờ tam giác & cổng vòm -->
            <!-- Tháp giữa -->
            <rect x="68" y="6" width="28" height="36" fill="#fde047" stroke="#1e293b" stroke-width="2.2"/>
            <rect x="68" y="0" width="7" height="6" fill="#fde047" stroke="#1e293b" stroke-width="1.8"/>
            <rect x="78" y="0" width="8" height="6" fill="#fde047" stroke="#1e293b" stroke-width="1.8"/>
            <rect x="89" y="0" width="7" height="6" fill="#fde047" stroke="#1e293b" stroke-width="1.8"/>
            <!-- Tháp trái -->
            <rect x="48" y="15" width="22" height="27" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
            <rect x="48" y="10" width="6" height="5" fill="#fef08a" stroke="#1e293b" stroke-width="1.6"/>
            <rect x="64" y="10" width="6" height="5" fill="#fef08a" stroke="#1e293b" stroke-width="1.6"/>
            <!-- Tháp phải -->
            <rect x="94" y="15" width="22" height="27" fill="#fef08a" stroke="#1e293b" stroke-width="2"/>
            <rect x="94" y="10" width="6" height="5" fill="#fef08a" stroke="#1e293b" stroke-width="1.6"/>
            <rect x="110" y="10" width="6" height="5" fill="#fef08a" stroke="#1e293b" stroke-width="1.6"/>
            <!-- Cổng vòm & ô cửa sổ -->
            <path d="M77,42 L77,28 Q82,23 87,28 L87,42 Z" fill="#1e293b"/>
            <path d="M55,30 Q58,26 61,30 Z" fill="#1e293b"/>
            <path d="M102,30 Q105,26 108,30 Z" fill="#1e293b"/>
            <!-- Cờ tam giác bay phấp phới -->
            <line x1="82" y1="0" x2="82" y2="-12" stroke="#1e293b" stroke-width="1.6"/>
            <polygon points="82,-12 94,-7 82,-2" fill="#f87171" stroke="#1e293b" stroke-width="1.4"/>
            <line x1="58" y1="10" x2="58" y2="0" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="58,0 68,4 58,8" fill="#38bdf8" stroke="#1e293b" stroke-width="1.2"/>
            <line x1="104" y1="10" x2="104" y2="0" stroke="#1e293b" stroke-width="1.5"/>
            <polygon points="104,0 114,4 104,8" fill="#4ade80" stroke="#1e293b" stroke-width="1.2"/>
            <!-- Chấm hạt cát stippling & vân tường gạch -->
            <g stroke="#1e293b" stroke-width="1" stroke-linecap="round">
              <line x1="72" y1="14" x2="78" y2="14"/>
              <line x1="84" y1="18" x2="90" y2="18"/>
              <circle cx="73" cy="22" r="0.6" fill="#1e293b"/>
              <circle cx="75" cy="24" r="0.6" fill="#1e293b"/>
              <circle cx="89" cy="23" r="0.6" fill="#1e293b"/>
              <circle cx="52" cy="25" r="0.6" fill="#1e293b"/>
              <circle cx="100" cy="24" r="0.6" fill="#1e293b"/>
            </g>
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
