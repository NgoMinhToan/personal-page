# 2D Paper Craft & Doodle Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển đổi toàn diện giao diện trang web cá nhân từ 3D Three.js sang nền tảng 2D Paper Craft & Doodle Art (lấy cảm hứng từ Doodle Shooter và Kokuyo Stationery), với mây cố định đỉnh màn hình, bờ biển cố định đáy màn hình, dòng sổ tay dự án 1 cột ở giữa, và hoạt ảnh vẽ tay sinh động cuộn ở 2 bên sườn.

**Architecture:** Sử dụng kiến trúc module hóa thuần 2D (HTML5, CSS3, Vector SVG và Canvas 2D) không phụ thuộc WebGL nặng nề. Viewport được khóa cố định bằng 2 dải khung tranh (Sticky Top Clouds và Sticky Bottom Beach Waves). Dòng nội dung trung tâm là một danh sách thẻ ghi chú sổ tay 1 cột cuộn mượt mà, bao quanh bởi 2 dải sườn trái (rặng dừa & khỉ leo trèo) và sườn phải (sóng biển & người lướt sóng) di chuyển parallax theo tiến trình đọc.

**Tech Stack:** HTML5 Semantic, CSS3 (CSS Grid, Flexbox, SVG Filters, Paper Elevation Shadows, Keyframe Animations), Vector SVG, Vanilla JavaScript ES Modules, Vite.

**Spec:** `docs/superpowers/specs/2026-10-08-paper-doodle-portfolio-design.md`

## Global Constraints

- **100% Code-Drawn Graphics:** Không sử dụng hình ảnh raster tĩnh bên ngoài; toàn bộ mây, mặt trời, bãi cát, sóng biển, cây dừa, khỉ, người lướt sóng, người bơi lội và chi tiết văn phòng phẩm được vẽ bằng SVG / CSS code.
- **Sticky Framing:** Dải mây đỉnh màn hình và dải bờ biển đáy màn hình phải cố định tuyệt đối (`position: fixed`), không bị trôi hay dịch chuyển khi người dùng cuộn chuột.
- **Pure 2D Zero-WebGL Stutter:** Loại bỏ hoàn toàn canvas 3D WebGL Three.js để tối ưu tải trang tức thì và đạt 60fps trên mọi thiết bị.
- **Tương thích Dữ liệu Cũ:** Tái sử dụng 100% dữ liệu dự án và kỹ năng từ `src/data/portfolioData.js`.

## Review Focus

1. **Zero / Empty Filter Matches:** Khi bấm lọc kỹ năng không có dự án nào khớp, stream hiển thị ghi chú giấy "Không tìm thấy dự án phù hợp 📝" mà không vỡ giao diện.
2. **Rapid Modal Toggling:** Nhấp mở/đóng liên tục hoặc spam phím Escape không gây lỗi DOM mồ côi hoặc kẹt lớp phủ backdrop.
3. **Responsive Width < 768px:** Trên màn hình điện thoại, 2 sườn hoạt họa co gọn tránh gây thanh cuộn ngang (horizontal overflow).
4. **Missing Image Fallback:** Khi ảnh dự án chưa có hoặc lỗi, modal sổ tay hiển thị khung phác thảo doodle thay thế với washi tape.
5. **Scroll Clamping Bounds:** Tọa độ parallax của các nhân vật 2 bên sườn được giới hạn an toàn (`Math.max / Math.min`), không tạo NaN hay nhảy giật khi cuộn vượt biên (overscroll).

---

### Task 1: DOM Scaffolding, Paper Design System & Sticky Clouds Component

**Files:**
- Create: `src/components/StickyClouds.js`
- Create: `src/components/StickyClouds.test.js`
- Modify: `index.html:1-28`
- Modify: `src/style.css:1-120`

**Interfaces:**
- Consumes: None
- Produces: `StickyClouds.render(container)` — khởi tạo SVG dải mây và mặt trời doodle cố định đỉnh màn hình.

- [ ] **Step 1: Write the failing test**

```javascript
// src/components/StickyClouds.test.js
import assert from 'node:assert';
import { StickyClouds } from './StickyClouds.js';

console.log('Testing StickyClouds...');

const clouds = new StickyClouds();
const svgHtml = clouds.generateSVG();

assert(typeof svgHtml === 'string', 'generateSVG must return an HTML/SVG string');
assert(svgHtml.includes('<svg'), 'Output must contain an <svg> tag');
assert(svgHtml.includes('sticky-cloud'), 'Output must contain sticky-cloud class elements');
assert(svgHtml.includes('doodle-sun'), 'Output must contain doodle-sun element');

console.log('✓ StickyClouds generation test passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/StickyClouds.test.js`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`

- [ ] **Step 3: Implement StickyClouds and Paper Design System**

```javascript
// src/components/StickyClouds.js
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
    container.appendChild(wrapper.firstElementChild);
  }
}
```

Cập nhật `index.html` và `src/style.css` bổ sung CSS variables cho bảng màu giấy, đường kẻ ô ly Campus toàn màn hình và kiểu dáng dải mây cố định đỉnh màn hình.

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/components/StickyClouds.test.js`  
Expected: PASS with `✓ StickyClouds generation test passed!`

- [ ] **Step 5: Commit**

```bash
git add src/components/StickyClouds.js src/components/StickyClouds.test.js index.html src/style.css
git commit -m "feat(paper): add paper design system and sticky clouds component"
```

---

### Task 2: Sticky Bottom Beach & Wave Engine Component

**Files:**
- Create: `src/components/StickyBeach.js`
- Create: `src/components/StickyBeach.test.js`
- Modify: `src/style.css:121-200`

**Interfaces:**
- Consumes: None
- Produces: `StickyBeach.render(container)` — khởi tạo SVG bờ cát và sóng biển 3 tầng giấy dập dềnh cố định đáy màn hình.

- [ ] **Step 1: Write the failing test**

```javascript
// src/components/StickyBeach.test.js
import assert from 'node:assert';
import { StickyBeach } from './StickyBeach.js';

console.log('Testing StickyBeach...');

const beach = new StickyBeach();
const svgHtml = beach.generateSVG();

assert(typeof svgHtml === 'string', 'generateSVG must return string');
assert(svgHtml.includes('sticky-beach-wrapper'), 'Must have sticky-beach-wrapper class');
assert(svgHtml.includes('beach-sand-layer'), 'Must contain beach-sand-layer');
assert(svgHtml.includes('ocean-wave-layer'), 'Must contain ocean-wave-layer');
assert(svgHtml.includes('doodle-seashell'), 'Must contain doodle-seashell or starfish decor');

console.log('✓ StickyBeach test passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/StickyBeach.test.js`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`

- [ ] **Step 3: Implement StickyBeach component**

```javascript
// src/components/StickyBeach.js
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
    container.appendChild(wrapper.firstElementChild);
  }
}
```

Thêm hiệu ứng CSS sóng dập dềnh `.wave-deep`, `.wave-shallow` bằng animation trượt ngang tuần hoàn `translateX`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/components/StickyBeach.test.js`  
Expected: PASS with `✓ StickyBeach test passed!`

- [ ] **Step 5: Commit**

```bash
git add src/components/StickyBeach.js src/components/StickyBeach.test.js src/style.css
git commit -m "feat(paper): add sticky beach and animated wave layer component"
```

---

### Task 3: Scrapbook Stream Component & Project Cards

**Files:**
- Create: `src/components/ScrapbookStream.js`
- Create: `src/components/ScrapbookStream.test.js`
- Modify: `src/style.css:201-320`

**Interfaces:**
- Consumes: `portfolioData.projects`, `portfolioData.skills`
- Produces: `ScrapbookStream.render(container)`, `ScrapbookStream.filterBySkill(skillId)` — quản lý dòng sổ tay 1 cột các dự án và lọc theo kỹ năng.

- [ ] **Step 1: Write the failing test**

```javascript
// src/components/ScrapbookStream.test.js
import assert from 'node:assert';
import { ScrapbookStream } from './ScrapbookStream.js';
import { portfolioData } from '../data/portfolioData.js';

console.log('Testing ScrapbookStream...');

const stream = new ScrapbookStream({ projects: portfolioData.projects });
const html = stream.generateHTML();

assert(typeof html === 'string', 'generateHTML must return string');
assert(html.includes('scrapbook-stream'), 'Must contain scrapbook-stream container');
assert(html.includes('paper-project-card'), 'Must contain paper-project-card elements');

// Test card count matches 16 projects
const cardCount = (html.match(/paper-project-card/g) || []).length;
assert.strictEqual(cardCount, 16, `Must render 16 project cards, got ${cardCount}`);

// Test empty filter produces friendly doodle message (Review Focus #1)
const emptyHtml = stream.generateHTML([]);
assert(emptyHtml.includes('scrapbook-empty-state'), 'Must render empty state message when no matches');

console.log('✓ ScrapbookStream tests passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/ScrapbookStream.test.js`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`

- [ ] **Step 3: Implement ScrapbookStream**

```javascript
// src/components/ScrapbookStream.js
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

    const tagsHtml = (project.tags || [])
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
      this.activeProjects = this.projects.filter(p => p.tags && p.tags.includes(skillId));
    }
    if (this.container) {
      this.container.innerHTML = this.generateHTML();
      this.bindEvents();
    }
  }
}
```

Thêm CSS cho `.paper-project-card`, giấy kẻ ô Campus, washi tape 4 màu pastel, và tem nhãn số hiệu dự án.

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/components/ScrapbookStream.test.js`  
Expected: PASS with `✓ ScrapbookStream tests passed!`

- [ ] **Step 5: Commit**

```bash
git add src/components/ScrapbookStream.js src/components/ScrapbookStream.test.js src/style.css
git commit -m "feat(paper): add scrapbook stream and paper project card components"
```

---

### Task 4: Full-Screen Journal Spread Modal Component

**Files:**
- Create: `src/components/JournalModal.js`
- Create: `src/components/JournalModal.test.js`
- Modify: `src/style.css:321-420`

**Interfaces:**
- Consumes: `project` object from `portfolioData.js`
- Produces: `JournalModal.open(project)`, `JournalModal.close()` — mở/đóng trang sổ tay 2 trang toàn màn hình với phím Escape và nút kẹp giấy.

- [ ] **Step 1: Write the failing test**

```javascript
// src/components/JournalModal.test.js
import assert from 'node:assert';
import { JournalModal } from './JournalModal.js';
import { portfolioData } from '../data/portfolioData.js';

console.log('Testing JournalModal...');

const modal = new JournalModal();
const sampleProject = portfolioData.projects[0];
const html = modal.generateModalHTML(sampleProject);

assert(typeof html === 'string', 'generateModalHTML must return string');
assert(html.includes('journal-modal-container'), 'Must contain journal-modal-container');
assert(html.includes('journal-page-left'), 'Must have left page for image showcase');
assert(html.includes('journal-page-right'), 'Must have right page for details');
assert(html.includes('paper-clip-close'), 'Must have paper clip close button');

// Review Focus #4: Missing image fallback verification
const projectNoImage = { ...sampleProject, image: null };
const fallbackHtml = modal.generateModalHTML(projectNoImage);
assert(fallbackHtml.includes('doodle-image-placeholder'), 'Must provide doodle placeholder when image missing');

console.log('✓ JournalModal tests passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/JournalModal.test.js`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`

- [ ] **Step 3: Implement JournalModal**

```javascript
// src/components/JournalModal.js
export class JournalModal {
  constructor(options = {}) {
    this.container = options.container || null;
    this.isOpen = false;
    this.activeProject = null;
    this.setupKeyboard();
  }

  generateModalHTML(project) {
    if (!project) return '';

    const imageSection = project.image
      ? `<img src="${project.image}" alt="${project.title}" class="journal-showcase-img">`
      : `
        <div class="doodle-image-placeholder">
          <div class="placeholder-doodle">🎨📐✨</div>
          <p>Bản phác thảo dự án</p>
          <span class="placeholder-caption">${project.title}</span>
        </div>
      `;

    const featuresHtml = (project.features || [
      'Kiến trúc đồ họa tối ưu hóa hiệu năng cao',
      'Thiết kế giao diện tương tác sáng tạo người dùng',
      'Được đóng gói chuẩn module hóa dễ bảo trì mở rộng'
    ]).map(f => `<li><span class="doodle-bullet">✏️</span> ${f}</li>`).join('\n');

    return `
      <div class="journal-modal-backdrop" id="journal-backdrop">
        <div class="journal-spread-wrapper">
          <!-- Nút kẹp giấy đóng sổ -->
          <button class="paper-clip-close" id="btn-close-journal" aria-label="Gấp sổ">
            <span class="clip-icon">📎</span> GẤP SỔ ✕
          </button>

          <div class="journal-two-page-spread">
            <!-- Trang Trái: Ảnh chụp màn hình dán 4 góc washi tape -->
            <div class="journal-page journal-page-left">
              <div class="taped-photo-frame">
                <div class="washi-tape-corner corner-tl"></div>
                <div class="washi-tape-corner corner-tr"></div>
                <div class="washi-tape-corner corner-bl"></div>
                <div class="washi-tape-corner corner-br"></div>
                ${imageSection}
              </div>
              <p class="photo-caption-handwriting">Hình minh họa: ${project.title}</p>
            </div>

            <!-- Gáy sổ nếp gấp đôi -->
            <div class="journal-spine-divider"></div>

            <!-- Trang Phải: Câu chuyện kỹ thuật, tính năng & nút bấm -->
            <div class="journal-page journal-page-right">
              <span class="journal-tag-label">${project.subtitle || 'Dự án Nổi bật'}</span>
              <h2 class="journal-project-title">${project.title}</h2>
              <p class="journal-project-story">${project.details || project.description}</p>

              <h4 class="journal-section-heading">ĐIỂM NỔI BẬT:</h4>
              <ul class="journal-features-list">
                ${featuresHtml}
              </ul>

              <div class="journal-action-stamps">
                ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener" class="stamp-link-btn demo-stamp">GHÉ THĂM DEMO 🚀</a>` : ''}
                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="stamp-link-btn github-stamp">MÃ NGUỒN GITHUB 💻</a>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupKeyboard() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
  }

  open(project) {
    if (!this.container || !project) return;
    this.activeProject = project;
    this.isOpen = true;
    this.container.innerHTML = this.generateModalHTML(project);
    this.container.classList.remove('hidden');

    const backdrop = this.container.querySelector('#journal-backdrop');
    const closeBtn = this.container.querySelector('#btn-close-journal');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });
    }
  }

  close() {
    if (!this.container) return;
    this.isOpen = false;
    this.activeProject = null;
    this.container.innerHTML = '';
    this.container.classList.add('hidden');
  }
}
```

Thêm CSS hiệu ứng bung mở sổ tay nếp gấp hai trang `journal-two-page-spread`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/components/JournalModal.test.js`  
Expected: PASS with `✓ JournalModal tests passed!`

- [ ] **Step 5: Commit**

```bash
git add src/components/JournalModal.js src/components/JournalModal.test.js src/style.css
git commit -m "feat(paper): add full-screen journal spread modal component"
```

---

### Task 5: Side Flanks (Left Coconut Palms & Monkeys, Right Surfer & Swimmers)

**Files:**
- Create: `src/components/SideFlanks.js`
- Create: `src/components/SideFlanks.test.js`
- Modify: `src/style.css:421-520`

**Interfaces:**
- Consumes: None
- Produces: `SideFlanks.render(container)`, `SideFlanks.onScroll(scrollY)` — cập nhật tọa độ parallax và góc lắc cho khỉ, dừa, người lướt sóng và người bơi lội.

- [ ] **Step 1: Write the failing test**

```javascript
// src/components/SideFlanks.test.js
import assert from 'node:assert';
import { SideFlanks } from './SideFlanks.js';

console.log('Testing SideFlanks...');

const flanks = new SideFlanks();
const html = flanks.generateHTML();

assert(typeof html === 'string', 'generateHTML must return string');
assert(html.includes('side-flank-left'), 'Must have side-flank-left container');
assert(html.includes('side-flank-right'), 'Must have side-flank-right container');
assert(html.includes('doodle-monkey'), 'Must have doodle-monkey elements');
assert(html.includes('doodle-surfer'), 'Must have doodle-surfer element');
assert(html.includes('doodle-swimmer'), 'Must have doodle-swimmer element');

// Test scroll clamping (Review Focus #5)
const normalTransform = flanks.calculateParallax(250);
const negativeTransform = flanks.calculateParallax(-100);
assert(!Number.isNaN(normalTransform.leftOffset), 'Left offset must not be NaN');
assert(negativeTransform.leftOffset >= 0, 'Negative scroll must be clamped >= 0');

console.log('✓ SideFlanks tests passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/SideFlanks.test.js`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`

- [ ] **Step 3: Implement SideFlanks component**

```javascript
// src/components/SideFlanks.js
export class SideFlanks {
  constructor(options = {}) {
    this.options = options;
    this.container = null;
  }

  calculateParallax(scrollY) {
    const clampedY = Math.max(0, scrollY || 0);
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
  }

  onScroll(scrollY) {
    const { leftOffset, rightOffset, surferTilt } = this.calculateParallax(scrollY);
    const flankLeft = document.getElementById('flank-left');
    const flankRight = document.getElementById('flank-right');
    const surfer = document.getElementById('doodle-surfer');

    if (flankLeft) flankLeft.style.transform = `translateY(-${leftOffset}px)`;
    if (flankRight) flankRight.style.transform = `translateY(-${rightOffset}px)`;
    if (surfer) surfer.setAttribute('transform', `translate(130, ${320 + rightOffset * 0.5}) rotate(${surferTilt})`);
  }
}
```

Thêm CSS cố định vị trí 2 sườn, ẩn khéo léo trên màn hình nhỏ `< 768px`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/components/SideFlanks.test.js`  
Expected: PASS with `✓ SideFlanks tests passed!`

- [ ] **Step 5: Commit**

```bash
git add src/components/SideFlanks.js src/components/SideFlanks.test.js src/style.css
git commit -m "feat(paper): add side flanks for left tropical palms and right surfer"
```

---

### Task 6: Stationery HUD, Main Integration & Visual Verification

**Files:**
- Create: `src/components/StationeryHUD.js`
- Create: `src/components/StationeryHUD.test.js`
- Modify: `src/main.js:1-60`
- Modify: `index.html:1-35`
- Modify: `src/style.css:521-650`

**Interfaces:**
- Consumes: `portfolioData`, all components from Tasks 1-5
- Produces: Integrated 2D Paper Craft & Doodle Web App.

- [ ] **Step 1: Write the failing test**

```javascript
// src/components/StationeryHUD.test.js
import assert from 'node:assert';
import { StationeryHUD } from './StationeryHUD.js';
import { portfolioData } from '../data/portfolioData.js';

console.log('Testing StationeryHUD...');

const hud = new StationeryHUD({ skills: portfolioData.skills });
const html = hud.generateHTML();

assert(typeof html === 'string', 'generateHTML must return string');
assert(html.includes('stationery-ruler-hud'), 'Must have stationery-ruler-hud container');
assert(html.includes('ruler-ticks'), 'Must have ruler measurement ticks');
assert(html.includes('data-skill="all"'), 'Must have "Tất cả" filter badge');

console.log('✓ StationeryHUD tests passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node src/components/StationeryHUD.test.js`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`

- [ ] **Step 3: Implement StationeryHUD & Integrate Main**

```javascript
// src/components/StationeryHUD.js
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
```

Tích hợp sạch sẽ toàn bộ trong `src/main.js`:
- Khởi tạo `StickyClouds` gắn vào container cố định đỉnh.
- Khởi tạo `StickyBeach` gắn vào container cố định đáy.
- Khởi tạo `SideFlanks` gắn vào 2 bên sườn, lắng nghe sự kiện `window.addEventListener('scroll')` để cập nhật parallax.
- Khởi tạo `ScrapbookStream` hiển thị 16 dự án ở cột giữa.
- Khởi tạo `JournalModal` hiển thị chi tiết khi click thẻ dự án.
- Khởi tạo `StationeryHUD` lọc danh sách dự án tức thì.
- Gỡ bỏ hoàn toàn logic WebGL Three.js cũ để tránh tiêu hao tài nguyên.

- [ ] **Step 4: Run test to verify it passes**

Run: `node src/components/StationeryHUD.test.js && npm run build`  
Expected: PASS with `✓ StationeryHUD tests passed!` và Vite build hoàn tất không lỗi.

- [ ] **Step 5: Commit**

```bash
git add src/components/StationeryHUD.js src/components/StationeryHUD.test.js src/main.js index.html src/style.css
git commit -m "feat(paper): complete main integration for 2d paper craft and doodle portfolio"
```
