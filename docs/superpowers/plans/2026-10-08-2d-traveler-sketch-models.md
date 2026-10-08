# 2D Traveler's Sketch Models & 3D Purge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Loại bỏ triệt để toàn bộ mô hình và mã nguồn 3D Three.js cũ, đồng thời tái thiết kế toàn diện hệ thống model 2D (cây dừa, 3 chú khỉ, vận động viên lướt sóng, người tắm biển, mây, mặt trời, bờ biển và 16 icon dự án) theo phong cách Ký họa Mực & Màu nước Sổ tay Nghệ thuật (Traveler's Sketchbook & Ink Hatching).

**Architecture:** Kiến trúc thuần 2D hướng component mô-đun (StickyTop, StickyBottom, SideFlanks, ScrapbookStream, JournalModal), 100% đồ họa vector SVG sinh bằng code với bảng màu mực than chì `#1e293b` và vệt loang màu nước pastel. Điều phối tương tác cuộn bằng `requestAnimationFrame` và kẹp biên scroll an toàn để đạt hiệu năng 60fps ổn định không phụ thuộc GPU WebGL.

**Tech Stack:** Vanilla JavaScript (ES Modules), HTML5, CSS3, SVG Vector Graphics, GSAP (nếu cần micro-animation), Vite, Node.js Test Runner (`node --test`).

**Spec:** `docs/superpowers/specs/2026-10-08-2d-traveler-sketch-models-design.md`

## Global Constraints

- Không sử dụng file ảnh bitmap ngoài (PNG/JPG cồng kềnh) cho các model nhân vật và cảnh quan; 100% đồ họa được vẽ bằng SVG vector code.
- Mọi model trang trí nền (`StickyClouds`, `StickyBeach`, `SideFlanks`) phải có thuộc tính `aria-hidden="true"`.
- Bảng màu thống nhất: Nét mực than chì `#1e293b`, màu giấy ngà `#faf6ed` / `#faf7f0`, vệt màu nước xanh lá `#86efac`, cam ấm `#fb923c`, xanh ngọc `#bae6fd`, vàng nắng `#fde047`.
- Kiểm thử tự động với Node.js test runner sẵn có: `npm test` (`node --test src/components/*.test.js`).
- Mọi thao tác cuộn parallax phải được bọc trong `requestAnimationFrame` và kẹp biên `Math.min(4000, Math.max(0, scrollY))`.

## Review Focus

1. **Gãy liên kết import hoặc file thiếu khi xóa 3D:** Đảm bảo `src/main.js`, `index.html` và các component không còn sót lại bất kỳ câu lệnh `import` nào từ các tệp 3D bị xóa.
2. **Thoái hóa hiển thị trên màn hình nhỏ (< 768px):** Đảm bảo `SideFlanks` ẩn mượt mà trên mobile mà không gây tràn khung ngang (no horizontal overflow).
3. **Mã SVG hợp lệ và an toàn:** Tất cả các chuỗi SVG vector mới phải đóng thẻ đầy đủ, không gây lỗi render DOM hoặc cảnh báo parser.
4. **Tính toán góc lượn Surfer không bị NaN:** Đảm bảo `surferTilt` luôn cho giá trị góc xoay số thực hợp lệ trong khoảng `[-8deg, 8deg]` kể cả khi `scrollY` âm hoặc cực lớn.
5. **Hiển thị huy hiệu dự án khi thiếu dữ liệu:** Thẻ dự án phải có fallback icon an toàn nếu `farmType` không nằm trong danh sách 16 loại dự án đã biết.

---

### Task 1: Dọn dẹp Toàn bộ Mã nguồn & Thư viện 3D Cũ (Purge Obsolete 3D Files)

**Files:**
- Delete:
  - `src/core/BeachEnvironment.js`
  - `src/core/BeachEnvironment.test.js`
  - `src/core/FarmEnvironment.js`
  - `src/core/MangaEnvironment.js`
  - `src/core/SceneManager.js`
  - `src/core/Lighting.js`
  - `src/entities/BeachAssetBuilder.js`
  - `src/entities/BeachAssetBuilder.test.js`
  - `src/entities/FarmAssetBuilder.js`
  - `src/entities/FarmBoard.js`
  - `src/entities/FarmSignpost.js`
  - `src/entities/MangaBoard.js`
  - `src/entities/BoardCanvasRenderer.js`
  - `src/controllers/FarmGridParallaxManager.js`
  - `src/controllers/FarmInteractionManager.js`
  - `src/controllers/FarmCameraController.js`
  - `src/controllers/InteractionManager.js`
  - `src/controllers/SnapScrollManager.js`
  - `src/controllers/TransitionController.js`
  - `src/ui/FarmHUD.js`
  - `src/ui/FarmDetailModal.js`
  - `src/ui/DetailOverlay.js`
  - `src/ui/SkillFilterBar.js`
- Modify: `index.html:1-38` (đảm bảo không còn thẻ WebGL canvas thừa)
- Modify: `src/main.js:1-70` (đảm bảo chỉ import các thành phần 2D)

**Interfaces:**
- Consumes: Không
- Produces: Mã nguồn sạch 100% 2D, các thư mục `src/entities/`, `src/core/`, `src/controllers/`, `src/ui/` được dọn sạch.

- [ ] **Step 1: Viết test kiểm tra tính toàn vẹn 2D và không còn tham chiếu 3D**

Tạo file test tạm thời hoặc kiểm tra nhanh bằng cách chạy `npm test` hiện tại để ghi nhận baseline:
```bash
npm test
```
Expected: PASS (6 tests pass).

- [ ] **Step 2: Thực hiện xóa toàn bộ các tệp 3D cũ không sử dụng**

Xóa các file 3D thông qua PowerShell hoặc Bash:
```bash
rm -f src/core/BeachEnvironment.js src/core/BeachEnvironment.test.js src/core/FarmEnvironment.js src/core/MangaEnvironment.js src/core/SceneManager.js src/core/Lighting.js
rm -f src/entities/BeachAssetBuilder.js src/entities/BeachAssetBuilder.test.js src/entities/FarmAssetBuilder.js src/entities/FarmBoard.js src/entities/FarmSignpost.js src/entities/MangaBoard.js src/entities/BoardCanvasRenderer.js
rm -f src/controllers/FarmGridParallaxManager.js src/controllers/FarmInteractionManager.js src/controllers/FarmCameraController.js src/controllers/InteractionManager.js src/controllers/SnapScrollManager.js src/controllers/TransitionController.js
rm -f src/ui/FarmHUD.js src/ui/FarmDetailModal.js src/ui/DetailOverlay.js src/ui/SkillFilterBar.js
```

Xóa các thư mục rỗng nếu cần:
```bash
rmdir src/entities src/controllers src/ui src/core 2>/dev/null || true
```

- [ ] **Step 3: Kiểm tra và làm sạch `index.html` và `src/main.js`**

Xác nhận `index.html` không có `<canvas id="webgl-canvas">` và `src/main.js` không import bất kỳ tệp 3D nào.
Chạy `npm test` để xác nhận test suite 2D vẫn hoạt động trơn tru:
```bash
npm test
```
Expected: PASS (6/6 tests pass).

- [ ] **Step 4: Chạy kiểm tra build Vite**

Run: `npm run build`
Expected: PASS (build dist thành công, không có cảnh báo import gãy).

- [ ] **Step 5: Commit thay đổi dọn dẹp mã nguồn 3D**

```bash
git add -A
git commit -m "refactor(core): purge obsolete 3d threejs assets, controllers and environments

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 2: Tái thiết kế Sườn Hai Bên theo Phong cách Traveler's Sketch (SideFlanks.js)

**Files:**
- Modify: `src/components/SideFlanks.js:1-135`
- Test: `src/components/SideFlanks.test.js:1-30`

**Interfaces:**
- Consumes: `scrollY` từ `window.addEventListener('scroll')`.
- Produces: `SideFlanks` class với `render(container)`, `onScroll(scrollY)`, `calculateParallax(scrollY)`.

- [ ] **Step 1: Viết test failing kiểm tra các model ký họa mới trong `SideFlanks.test.js`**

Cập nhật `src/components/SideFlanks.test.js`:
```javascript
import { test } from 'node:test';
import assert from 'node:assert';
import { SideFlanks } from './SideFlanks.js';

test('SideFlanks renders detailed Traveler Sketch models', () => {
  const flanks = new SideFlanks();
  const html = flanks.generateHTML();

  // 1. Kiểm tra 3 trạm cây dừa ký họa
  const palmStationMatches = (html.match(/class="palm-station"/g) || []).length;
  assert.strictEqual(palmStationMatches, 3, 'Must render exactly 3 palm stations');

  // 2. Kiểm tra nét gạch bóng hatching và vân vỏ cây dừa
  assert(html.includes('palm-trunk-sketch'), 'Must include palm trunk sketch elements');
  assert(html.includes('palm-frond-feather'), 'Must include feather-like palm fronds');

  // 3. Kiểm tra 3 chú khỉ với biểu cảm và tư thế sống động
  assert(html.includes('monkey-1'), 'Must render Monkey 1 (high branch wave)');
  assert(html.includes('monkey-2'), 'Must render Monkey 2 (inverted hang)');
  assert(html.includes('monkey-3'), 'Must render Monkey 3 (coconut embrace)');
  assert(html.includes('monkey-eye-sparkle'), 'Monkeys must have expressive sparkle eyes');

  // 4. Kiểm tra Surfer động học và chuyển động ván lướt
  assert(html.includes('doodle-surfer'), 'Must render doodle-surfer');
  assert(html.includes('surfboard-sketch'), 'Must render sketch surfboard');
  assert(html.includes('surf-motion-lines'), 'Must render motion lines behind surfer');

  // 5. Kiểm tra Người tắm phao & Sóng mộc bản
  assert(html.includes('doodle-swimmer'), 'Must render doodle-swimmer with donut float');
  assert(html.includes('wave-trail-hokusai'), 'Must render Hokusai-inspired wave trail');
  assert(html.includes('beach-decor-group'), 'Must render sand castle and umbrella decor');

  // 6. Kiểm tra Parallax và Surfer Tilt bounds
  const parallax = flanks.calculateParallax(500);
  assert(!Number.isNaN(parallax.leftOffset), 'leftOffset must not be NaN');
  assert(!Number.isNaN(parallax.rightOffset), 'rightOffset must not be NaN');
  assert(parallax.surferTilt >= -8 && parallax.surferTilt <= 8, 'surferTilt must be clamped within [-8, 8] deg');
});
```

- [ ] **Step 2: Chạy test để xác nhận test thất bại (Red)**

Run: `node --test src/components/SideFlanks.test.js`
Expected: FAIL (thiếu các class `palm-trunk-sketch`, `monkey-eye-sparkle`, `wave-trail-hokusai`, v.v.).

- [ ] **Step 3: Triển khai các Model Ký họa Nghệ thuật trong `SideFlanks.js`**

Cập nhật `src/components/SideFlanks.js` với các SVG vector giàu chi tiết:
- Cây dừa nét mực viền kép, gạch bóng vỏ cây, răng cưa lông vũ, vệt màu nước loang (`#86efac` và `#d97706`).
- 3 chú khỉ có tỷ lệ chuẩn, mắt phản chiếu ánh sáng (`monkey-eye-sparkle`), đuôi quấn và lông bụng tỉa nét.
- Surfer tư thế khuỵu gối giữ thăng bằng, kính goggles, ván lướt vệt cam (`#fb923c`), motion lines và bọt nước.
- Người bơi phao kính râm, dải sóng Hokusai viền mực cuộn tròn, lâu đài cát 3 tháp có cờ.
- Công thức tính toán:
  ```javascript
  calculateParallax(scrollY) {
    const maxScroll = 4000;
    const clampedY = Math.min(maxScroll, Math.max(0, scrollY || 0));
    return {
      leftOffset: clampedY * 0.15,
      rightOffset: clampedY * 0.22,
      surferTilt: Math.sin(clampedY * 0.005) * 8
    };
  }
  ```

- [ ] **Step 4: Chạy test để xác nhận test vượt qua (Green)**

Run: `node --test src/components/SideFlanks.test.js`
Expected: PASS.

- [ ] **Step 5: Commit thay đổi Sườn Hai Bên**

```bash
git add src/components/SideFlanks.js src/components/SideFlanks.test.js
git commit -m "feat(paper): redesign side flanks with traveler sketch palm trees, monkeys, and action surfer

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 3: Tái thiết kế Mây Nét Viền Kép & Mặt Trời Ký Họa Màu Nước (StickyClouds.js)

**Files:**
- Modify: `src/components/StickyClouds.js:1-60`
- Test: `src/components/StickyClouds.test.js:1-25`

**Interfaces:**
- Consumes: None
- Produces: `StickyClouds` class với `render(container)`, `generateSVG()`.

- [ ] **Step 1: Viết test failing cho `StickyClouds.test.js`**

Cập nhật `src/components/StickyClouds.test.js`:
```javascript
import { test } from 'node:test';
import assert from 'node:assert';
import { StickyClouds } from './StickyClouds.js';

test('StickyClouds renders double-line ink clouds and watercolor sun', () => {
  const clouds = new StickyClouds();
  const svg = clouds.generateSVG();

  // 1. Kiểm tra cấu trúc mây nét viền kép và gạch bóng
  assert(svg.includes('cloud-double-line'), 'Must include double-line cloud outlines');
  assert(svg.includes('cloud-hatching-belly'), 'Must include hatching shade lines under cloud belly');

  // 2. Kiểm tra mặt trời ký họa nét mực và vệt màu nước
  assert(svg.includes('doodle-sun-sketch'), 'Must include sketch sun element');
  assert(svg.includes('sun-watercolor-glow'), 'Must include watercolor sun glow');
  assert(svg.includes('sun-freehand-rays'), 'Must include freehand ink rays');
  assert(svg.includes('aria-hidden="true"'), 'Must have aria-hidden="true"');
});
```

- [ ] **Step 2: Chạy test để xác nhận test thất bại (Red)**

Run: `node --test src/components/StickyClouds.test.js`
Expected: FAIL (thiếu các class mới).

- [ ] **Step 3: Triển khai Mây Kép & Mặt Trời Màu Nước trong `StickyClouds.js`**

Cập nhật `generateSVG()` trong `src/components/StickyClouds.js`:
- Cụm mây đường nét mực kép (`stroke="#1e293b"`, `stroke-width="2.2"`, `stroke-dasharray="4 3"` nét phụ).
- Hàng gạch bóng hatching xiên chéo dưới bụng mây (`cloud-hatching-belly`).
- Mặt trời vẽ tay tự do có vệt màu nước loang (`#fde047`), tia nắng bất đối xứng phóng khoáng (`sun-freehand-rays`) và nụ cười bút kim mộc mạc.

- [ ] **Step 4: Chạy test để xác nhận test vượt qua (Green)**

Run: `node --test src/components/StickyClouds.test.js`
Expected: PASS.

- [ ] **Step 5: Commit thay đổi StickyClouds**

```bash
git add src/components/StickyClouds.js src/components/StickyClouds.test.js
git commit -m "feat(paper): redesign sticky clouds with double-line ink sketch and watercolor sun

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 4: Tái thiết kế Sóng Biển Mộc Bản & Bờ Cát Stippling (StickyBeach.js)

**Files:**
- Modify: `src/components/StickyBeach.js:1-55`
- Test: `src/components/StickyBeach.test.js:1-25`

**Interfaces:**
- Consumes: None
- Produces: `StickyBeach` class với `render(container)`, `generateSVG()`.

- [ ] **Step 1: Viết test failing cho `StickyBeach.test.js`**

Cập nhật `src/components/StickyBeach.test.js`:
```javascript
import { test } from 'node:test';
import assert from 'node:assert';
import { StickyBeach } from './StickyBeach.js';

test('StickyBeach renders woodblock-style ink waves and stippling sand', () => {
  const beach = new StickyBeach();
  const svg = beach.generateSVG();

  // 1. Kiểm tra sóng biển nét mực uốn lượn mộc bản
  assert(svg.includes('wave-woodblock-ink'), 'Must include woodblock-style ink wave curves');
  assert(svg.includes('wave-foam-sketch'), 'Must include hand-drawn wave foam stroke');

  // 2. Kiểm tra bờ cát có kỹ thuật chấm hạt stippling
  assert(svg.includes('sand-stippling-dots'), 'Must include stippling sand grain dots');

  // 3. Kiểm tra sò biển và sao biển ký họa bút kim
  assert(svg.includes('doodle-seashell-sketch'), 'Must include sketch seashell');
  assert(svg.includes('doodle-starfish-sketch'), 'Must include sketch starfish');
  assert(svg.includes('aria-hidden="true"'), 'Must have aria-hidden="true"');
});
```

- [ ] **Step 2: Chạy test để xác nhận test thất bại (Red)**

Run: `node --test src/components/StickyBeach.test.js`
Expected: FAIL.

- [ ] **Step 3: Triển khai Sóng Mộc Bản & Cát Stippling trong `StickyBeach.js`**

Cập nhật `generateSVG()` trong `src/components/StickyBeach.js`:
- Lớp sóng biển nét mực bút kim với bọt sóng vẽ tay lượn sóng nhịp nhàng (`wave-woodblock-ink`, `wave-foam-sketch`).
- Bãi cát có các cụm chấm hạt stippling tự nhiên (`sand-stippling-dots`).
- Vỏ sò và sao biển 5 cánh ký họa nét mực than chì (`doodle-seashell-sketch`, `doodle-starfish-sketch`).

- [ ] **Step 4: Chạy test để xác nhận test vượt qua (Green)**

Run: `node --test src/components/StickyBeach.test.js`
Expected: PASS.

- [ ] **Step 5: Commit thay đổi StickyBeach**

```bash
git add src/components/StickyBeach.js src/components/StickyBeach.test.js
git commit -m "feat(paper): redesign sticky beach with woodblock ink waves and stippling sand

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 5: Thiết kế Bộ Icon Ký Họa Mini Cho 16 Dự Án (ScrapbookStream.js & style.css)

**Files:**
- Modify: `src/components/ScrapbookStream.js:1-120`
- Modify: `src/style.css:200-350`
- Test: `src/components/ScrapbookStream.test.js:1-40`

**Interfaces:**
- Consumes: `project.farmType` hoặc `project.id` từ `portfolioData.projects`.
- Produces: `getProjectSketchBadge(farmType)` sinh SVG icon ký họa nét mực độc bản cho từng dự án; thẻ dự án hiển thị con dấu ký họa này.

- [ ] **Step 1: Viết test failing cho `ScrapbookStream.test.js`**

Cập nhật `src/components/ScrapbookStream.test.js`:
```javascript
import { test } from 'node:test';
import assert from 'node:assert';
import { ScrapbookStream } from './ScrapbookStream.js';
import { portfolioData } from '../data/portfolioData.js';

test('ScrapbookStream renders individual sketch badge for each project', () => {
  const stream = new ScrapbookStream({ projects: portfolioData.projects });
  const html = stream.generateHTML();

  // 1. Kiểm tra có 16 thẻ dự án kèm 16 con dấu ký họa
  const badgeMatches = (html.match(/class="project-sketch-badge-icon"/g) || []).length;
  assert.strictEqual(badgeMatches, 16, 'Must render exactly 16 sketch badge icons');

  // 2. Kiểm tra các icon ký họa đặc trưng
  assert(html.includes('badge-windmill'), 'Must have windmill sketch badge');
  assert(html.includes('badge-orchard'), 'Must have orchard apple sketch badge');
  assert(html.includes('badge-garden'), 'Must have garden carrot sketch badge');

  // 3. Kiểm tra fallback badge an toàn khi farmType lạ
  const fallbackHtml = stream.generateCardHTML({ id: 'test', title: 'Test', farmType: 'unknown' }, 0);
  assert(fallbackHtml.includes('badge-default-star'), 'Must fallback to default star sketch badge');
});
```

- [ ] **Step 2: Chạy test để xác nhận test thất bại (Red)**

Run: `node --test src/components/ScrapbookStream.test.js`
Expected: FAIL (chưa có `project-sketch-badge-icon`).

- [ ] **Step 3: Triển khai hàm sinh SVG Sketch Badge & gắn vào Card HTML**

Trong `src/components/ScrapbookStream.js`:
- Thêm phương thức `getProjectSketchBadge(farmType)` trả về SVG ký họa nét mực nhỏ gọn (`viewBox="0 0 36 36"`):
  - `windmill`: Cối xay gió cánh chữ X nét mực.
  * `orchard`: Quả táo cắn dở có cuống lá.
  * `garden`: Củ cà rốt 3 sọc gạch bóng.
  * `well`: Giếng nước đá cổ có xô nước.
  * `cart`: Bánh xe hoa hướng dương.
  * `campfire`: Đốm lửa trại bập bùng.
  * `barn`: Ngôi nhà gỗ mái ngói.
  * `beehive`: Tổ ong tròn 3 tầng.
  * `sheep`: Chú cừu lông xù.
  * `tractor`: Bánh xe máy kéo cổ điển.
  * `greenhouse`: Nhà kính chồi non.
  * `sunflower`: Hoa hướng dương nở rộ.
  * `scarecrow`: Bù nhìn rơm dang tay.
  * `watermill`: Guồng nước quay tròn.
  * `silo`: Tháp ngũ cốc hình trụ.
  * `duckpond`: Chú vịt bơi sóng nước.
  * Default: Ngôi sao ký họa 5 cánh.
- Gắn badge này vào góc phải của thẻ dự án (`card-header-bar`).
- Bổ sung CSS trong `src/style.css` tạo hiệu ứng con dấu đóng triện mực mờ nhẹ trên giấy.

- [ ] **Step 4: Chạy test để xác nhận test vượt qua (Green)**

Run: `node --test src/components/ScrapbookStream.test.js`
Expected: PASS.

- [ ] **Step 5: Commit thay đổi ScrapbookStream & Sketch Badges**

```bash
git add src/components/ScrapbookStream.js src/components/ScrapbookStream.test.js src/style.css
git commit -m "feat(paper): add custom ink sketch badges for all 16 portfolio project cards

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 6: Tích hợp Toàn diện, Kiểm tra Toàn bộ Test Suite & Build Nghiệm thu

**Files:**
- Test all: `npm test`
- Build: `npm run build`

**Interfaces:**
- Toàn bộ 6 test suite trong `src/components/*.test.js` phải PASS 100%.
- Không còn bất kỳ cảnh báo console hay lỗi cú pháp nào.

- [ ] **Step 1: Chạy toàn bộ test suite**

Run: `npm test`
Expected: Tất cả 6 tệp test đều PASS (`JournalModal`, `ScrapbookStream`, `SideFlanks`, `StationeryHUD`, `StickyBeach`, `StickyClouds`).

- [ ] **Step 2: Chạy build production với Vite**

Run: `npm run build`
Expected: Build thành công vào thư mục `dist/` không có cảnh báo.

- [ ] **Step 3: Khởi chạy dev server và kiểm tra trực quan**

Run: `npm run preview` hoặc kiểm tra live server.
Xác nhận:
- Rặng dừa ký họa, 3 chú khỉ, Surfer nghiêng lướt theo cuộn chuột mượt mà ở 60fps.
- Mây nét viền kép và mặt trời màu nước cố định đỉnh.
- Bờ biển và sóng mộc bản cố định đáy.
- Các thẻ dự án có con dấu ký họa tinh xảo.

- [ ] **Step 4: Commit hoàn tất tích hợp và kiểm thử toàn nhánh**

```bash
git add -A
git commit -m "chore(paper): complete 2d traveler sketch models integration and verification

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```
