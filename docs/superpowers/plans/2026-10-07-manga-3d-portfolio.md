# Manga 3D Three.js Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng website portfolio cá nhân 3D toàn màn hình phong cách ô truyện tranh Manga Nhật Bản bằng Three.js, hỗ trợ cuộn khớp Lưới 2x2, hover phát sáng, phóng to chi tiết Zig-Zag so le, và bộ lọc kỹ năng (Skills).

**Architecture:** Sử dụng kiến trúc hướng sự kiện và module tách biệt: Engine Three.js 3D quản lý WebGL Scene/Canvas, GSAP điều phối hoạt ảnh chuyển động và cuộn khớp (snap scroll), hệ thống thực thể MangaBoard hiển thị khung truyện tranh PBR kèm shader halftone, và tầng UI DOM hiển thị thông tin chi tiết và thanh lọc kỹ năng. Dữ liệu kỹ năng và dự án được cấu hình độc lập tại `src/data/portfolioData.js`.

**Tech Stack:** Vite, Vanilla JavaScript (ES Modules), Three.js (r170+), GSAP (3.12+), Vanilla CSS (Manga aesthetic & Glassmorphism).

**Spec:** `docs/superpowers/specs/2026-10-07-manga-3d-portfolio-design.md`

## Global Constraints

- Không dùng CSS framework nặng ngoài Vanilla CSS hiện đại.
- Three.js WebGL Renderer phải luôn giới hạn `pixelRatio <= 2` để đảm bảo 60fps trên màn hình Retina.
- Chế độ Lưới tổng quan phải luôn duy trì bố cục 2x2 (4 bảng) hiển thị trọn vẹn trong khung nhìn camera trên màn hình máy tính.
- Mọi hoạt ảnh cuộn khớp phải sử dụng easing `power2.out` cho hàng trượt ra và `power2.in` cho hàng trượt vào.
- Dữ liệu dự án và kỹ năng phải được bóc tách hoàn toàn vào `src/data/portfolioData.js`.

## Review Focus

1. **Trackpad/Mousewheel inertial over-scrolling:** Xử lý debounce hoặc lock cuộn trong thời gian tween (400ms) để tránh nhảy cóc nhiều trang liên tục khi người dùng vuốt mạnh.
2. **Window resize handling:** Camera aspect ratio và vị trí các bảng 2x2 phải tự động căn chỉnh lại tọa độ frustum theo viewport mới mà không bị méo tỷ lệ hay tràn viền.
3. **Transition reversibility:** Khi bấm nút Back thu nhỏ từ chế độ Chi tiết về Lưới 2x2, bảng phải bay về đúng chính xác tọa độ gốc ban đầu mà không bị lệch vị trí.
4. **Thumbnail missing fallback:** Nếu đường dẫn ảnh dự án bị lỗi hoặc chưa có file, `BoardCanvasRenderer` phải tự động render khung tranh manga đồ họa vector/canvas đẹp mắt, không bao giờ để bảng bị đen xì hay vỡ hình.
5. **Mobile touch swipe gesture:** Thao tác vuốt cảm ứng trên điện thoại phải kích hoạt cuộn khớp mượt mà tương đương con lăn chuột.

---

### Task 1: Thiết lập Dự án & Cấu trúc Nền tảng (Project Scaffolding)

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/style.css`

**Interfaces:**
- Produces: Môi trường chạy Vite dev server, Canvas `#webgl-canvas`, HUD container `#hud-overlay`.

- [ ] **Step 1: Khởi tạo package.json với dependencies Three.js và GSAP**
```json
{
  "name": "personal-page-3d",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "three": "^0.170.0",
    "gsap": "^3.12.5"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Cài đặt dependencies qua npm**
Chạy: `npm install`
Kỳ vọng: Cài đặt thành công `three`, `gsap`, `vite`.

- [ ] **Step 3: Tạo index.html và vite.config.js**
Khởi tạo canvas WebGL toàn màn hình (`<canvas id="webgl-canvas"></canvas>`) và container giao diện (`<div id="app"></div>`). Import font Google Fonts cá tính (*Plus Jakarta Sans*, *Bangers*).

- [ ] **Step 4: Viết style.css nền tảng phong cách Manga**
Cấu hình CSS variables: màu nền đen tuyền `#090a0f`, viền mực `#ffffff`, màu nhấn neon `#38bdf8`, `#e11d48`, pattern halftone, và reset box-sizing toàn màn hình.

- [ ] **Step 5: Kiểm tra Vite dev server**
Chạy: `npx vite --port 3000` (hoặc test build `npm run build`)
Kỳ vọng: Server Vite build thành công không có lỗi.

- [ ] **Step 6: Commit**
```bash
git add package.json package-lock.json vite.config.js index.html src/style.css
git commit -m "chore: scaffold vite project with threejs, gsap and manga styles"
```

---

### Task 2: Mô hình Dữ liệu Dự án & Kỹ năng (`src/data/portfolioData.js`)

**Files:**
- Create: `src/data/portfolioData.js`
- Create: `src/data/portfolioData.test.js`

**Interfaces:**
- Produces: `portfolioData` object chứa `skills` (id, name, color, category) và `projects` (id, vol, title, subtitle, description, thumbnail, skills, demoUrl, githubUrl, accentColor).

- [ ] **Step 1: Viết test kiểm tra tính hợp lệ của schema dữ liệu**
Viết file test `src/data/portfolioData.test.js` kiểm tra mọi project đều có ít nhất 1 skill hợp lệ, có đầy đủ các trường `id, title, demoUrl, accentColor`.

- [ ] **Step 2: Tạo `src/data/portfolioData.js` với ít nhất 6 dự án mẫu**
Khởi tạo danh sách skills: `threejs, webgl, react, node, ai, typescript`.
Khởi tạo ít nhất 6 dự án phong cách manga (bao gồm *Doodle District 3D*, *NeuroStudio Agent*, *Quantum Particle Flow*, *CyberPulse Analytics*, *Neural Canvas*, *Voxel Horizon*).

- [ ] **Step 3: Chạy test kiểm tra schema**
Chạy: `node src/data/portfolioData.test.js`
Kỳ vọng: PASS.

- [ ] **Step 4: Commit**
```bash
git add src/data/portfolioData.js src/data/portfolioData.test.js
git commit -m "feat: create extensible portfolio data schema with skills and projects"
```

---

### Task 3: Động cơ Three.js Scene, Ánh sáng & Môi trường Manga

**Files:**
- Create: `src/core/SceneManager.js`
- Create: `src/core/Lighting.js`
- Create: `src/core/MangaEnvironment.js`
- Create: `src/main.js`

**Interfaces:**
- Consumes: `#webgl-canvas` từ `index.html`.
- Produces: `SceneManager.scene`, `SceneManager.camera`, `SceneManager.renderer`, `Lighting.setup()`, vòng lặp render `requestAnimationFrame` 60fps.

- [ ] **Step 1: Viết `SceneManager.js`**
Khởi tạo `THREE.WebGLRenderer` (antialias, alpha), `THREE.PerspectiveCamera` (FOV 50), và `THREE.Scene`.
Xử lý sự kiện `resize` tự động cập nhật camera aspect và renderer size, clamp pixelRatio <= 2.

- [ ] **Step 2: Viết `Lighting.js`**
Bổ sung `THREE.AmbientLight` (ánh sáng dịu), `THREE.DirectionalLight` (ánh sáng chính đổ bóng), và hàm tạo `SpotLight` mềm rọi vào từng ô manga.

- [ ] **Step 3: Viết `MangaEnvironment.js`**
Tạo nền không gian Manga với sương mù chiều sâu `THREE.FogExp2(0x090a0f, 0.03)` và mặt phẳng nền chứa texture chấm trame Halftone tinh tế.

- [ ] **Step 4: Kết nối trong `main.js`**
Khởi tạo Scene, Lighting, Environment và kích hoạt render loop.

- [ ] **Step 5: Kiểm tra hiển thị canvas 3D**
Chạy: `npm run build`
Kỳ vọng: Không có lỗi bundle, Three.js khởi chạy mượt mà.

- [ ] **Step 6: Commit**
```bash
git add src/core/SceneManager.js src/core/Lighting.js src/core/MangaEnvironment.js src/main.js
git commit -m "feat: implement threejs scene manager, lighting and manga environment"
```

---

### Task 4: Thực thể Bảng 3D Manga & Bộ sinh Texture Dynamic

**Files:**
- Create: `src/entities/BoardCanvasRenderer.js`
- Create: `src/entities/MangaBoard.js`

**Interfaces:**
- Consumes: Dữ liệu dự án từ `portfolioData.projects[i]`.
- Produces: `MangaBoard` (Group chứa Frame Mesh, Canvas Plane, Glow Outline Mesh, hàm `setHover(bool)`, `setTilt(x, y)`).

- [ ] **Step 1: Viết `BoardCanvasRenderer.js`**
Hàm `createBoardTexture(project)` vẽ trực tiếp lên HTML5 Canvas 2D (kích thước 1024x768):
- Khung vẽ manga, nhãn tập `VOL. XX`, tiêu đề dự án in hoa, các badge công nghệ.
- Trả về `THREE.CanvasTexture` chất lượng cao. Nếu có thumbnail ảnh, vẽ ảnh vào canvas; nếu chưa có, sinh đồ họa doodle/vector trừu tượng theo `accentColor`.

- [ ] **Step 2: Viết `MangaBoard.js`**
Tạo lớp `MangaBoard`:
- Cấu trúc: `THREE.BoxGeometry` làm khung viền đen vát cạnh, mặt phẳng `THREE.PlaneGeometry` hiển thị texture canvas.
- Viền phát sáng: Khung viền ngoài phụ với chất liệu `MeshBasicMaterial` bán trong suốt (`opacity = 0`).
- Phương thức `setHover(isHovered)`: GSAP tween làm viền phát sáng màu `accentColor` và nhấc bảng nổi lên phía trước $Z + 0.3$.
- Phương thức `setTilt(rotX, rotY)`: Nội suy xoay bảng theo góc con trỏ chuột.

- [ ] **Step 3: Kiểm tra hiển thị 1 chiếc bảng Manga mẫu trong Scene**
Render thử nghiệm 1 `MangaBoard` vào Scene, kiểm tra texture sắc nét và hiệu ứng hover.

- [ ] **Step 4: Commit**
```bash
git add src/entities/BoardCanvasRenderer.js src/entities/MangaBoard.js
git commit -m "feat: create 3d manga board entity with dynamic canvas texture and hover glow"
```

---

### Task 5: Bố cục Lưới 2x2 & Bộ điều khiển Cuộn Khớp (Snap Scroll Engine)

**Files:**
- Create: `src/controllers/SnapScrollManager.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: Mảng `MangaBoard[]`, sự kiện `wheel` và `touchstart/touchmove`.
- Produces: `SnapScrollManager.nextPage()`, `SnapScrollManager.prevPage()`, vị trí 4 ô lưới 2x2 chuẩn hóa.

- [ ] **Step 1: Tính toán tọa độ chuẩn của Lưới 2x2 theo Camera FOV**
Tính toán khoảng cách $X, Y$ để 4 ô xếp cân đối:
`TopLeft (-dx, +dy, 0)`, `TopRight (+dx, +dy, 0)`, `BottomLeft (-dx, -dy, 0)`, `BottomRight (+dx, -dy, 0)`.

- [ ] **Step 2: Viết thuật toán Cuộn khớp trong `SnapScrollManager.js`**
Lắng nghe `WheelEvent` và vuốt cảm ứng:
- Debounce và khóa tương tác trong lúc đang thực hiện chuyển động (`isTransitioning = true`).
- Khi cuộn xuống:
  - GSAP tween 2 ô hàng trên trượt lên trên ($Y + 3$) và `opacity -> 0` với easing `power2.out`.
  - 2 ô hàng dưới trượt lên vị trí hàng trên.
  - 2 ô mới của trang tiếp theo xuất hiện từ dưới ($Y - 3$) trượt vào vị trí hàng dưới với easing `power2.in`.
- Cập nhật số trang hiển thị hiện tại.

- [ ] **Step 3: Kiểm tra chuyển trang cuộn chuột**
Lăn chuột liên tục; xác nhận mỗi cú lăn chuột chuyển đúng 1 trang 4 ô và khớp dứt khoát vào vị trí.

- [ ] **Step 4: Commit**
```bash
git add src/controllers/SnapScrollManager.js src/main.js
git commit -m "feat: implement 2x2 grid layout and snap scroll physics engine"
```

---

### Task 6: Tương tác Raycaster & Hoạt ảnh Phóng to / Thu nhỏ (Transition Controller)

**Files:**
- Create: `src/controllers/InteractionManager.js`
- Create: `src/controllers/TransitionController.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `MangaBoard[]`, `SceneManager.camera`.
- Produces: Sự kiện `onBoardHover(board)`, `onBoardClick(board)`.
- Chuyển trạng thái: `expandBoardToDetail(board)`, `shrinkBoardToGrid()`.

- [ ] **Step 1: Viết `InteractionManager.js`**
Dùng `THREE.Raycaster` bắt sự kiện `pointermove` để hover highlight bảng, và `pointerdown` để click.
Khóa raycaster khi đang ở trạng thái phóng to chi tiết.

- [ ] **Step 2: Viết `TransitionController.js`**
Xử lý hoạt ảnh phóng to:
- Lưu vị trí gốc ban đầu của bảng trong lưới (`originalPos`, `originalRot`, `originalScale`).
- Tween bảng được click: bay ra vị trí phóng to lớn (chiếm 50% khung nhìn, $Scale \times 1.8$).
- Tween 3 bảng còn lại: trượt mờ dần ra khỏi màn hình.
- Chuyển trạng thái ứng dụng sang `STATE_DETAIL`.

- [ ] **Step 3: Xử lý hoạt ảnh thu nhỏ (Shrink Back)**
Khi nhận lệnh quay về:
- Tween bảng lớn bay và thu nhỏ mượt mà về đúng `originalPos` ban đầu.
- Tween 3 bảng còn lại trượt trở lại lưới 2x2.
- Trả trạng thái về `STATE_GRID`.

- [ ] **Step 4: Kiểm tra hoạt ảnh phóng to/thu nhỏ**
Click vào từng ô trong 4 ô; xác nhận bảng phóng to trơn tru và khi bấm thu nhỏ thì trở về chính xác vị trí ban đầu.

- [ ] **Step 5: Commit**
```bash
git add src/controllers/InteractionManager.js src/controllers/TransitionController.js src/main.js
git commit -m "feat: implement raycaster interactions and smooth zoom-in/shrink transitions"
```

---

### Task 7: Chế độ Chi tiết 1-Item Lớn & Cuộn khớp Zig-Zag

**Files:**
- Create: `src/ui/DetailOverlay.js`
- Modify: `src/controllers/SnapScrollManager.js`
- Modify: `src/controllers/TransitionController.js`
- Modify: `src/style.css`

**Interfaces:**
- Consumes: Dữ liệu dự án đang được focus (`project`).
- Produces: Giao diện chi tiết DOM Zig-Zag (Trái / Phải), Nút "Truy cập dự án", Nút "GitHub Repo", Nút "Quay về Lưới 2x2".

- [ ] **Step 1: Viết `DetailOverlay.js`**
Tạo panel thông tin chi tiết:
- Header số tập Chapter, Tiêu đề dự án lớn, Mô tả câu chuyện và thách thức kỹ thuật.
- Danh sách pill tag Tech Skills có màu nổi bật.
- Nút CTA lớn: **"Truy cập dự án (Live Demo)"** (`window.open(demoUrl)`) và **"GitHub Repo"**.
- Nút **"◀ Quay về Lưới 2x2"** ở góc trên cùng.

- [ ] **Step 2: Triển khai bố cục Zig-Zag so le**
Khi hiển thị dự án:
- Nếu index là số lẻ: Đặt bảng 3D ở nửa màn hình bên **Trái**, Panel nội dung `DetailOverlay` trượt vào bên **Phải**.
- Nếu index là số chẵn: Đặt bảng 3D ở nửa màn hình bên **Phải**, Panel nội dung `DetailOverlay` trượt vào bên **Trái**.

- [ ] **Step 3: Cuộn khớp từng Item lớn trong chế độ Chi tiết**
Khi lăn chuột ở `STATE_DETAIL`:
- Snap chuyển sang dự án tiếp theo/trước đó.
- Cập nhật lại vị trí Zig-Zag của bảng 3D và nội dung tương ứng.

- [ ] **Step 4: Kiểm tra chế độ Chi tiết Zig-Zag**
Kiểm tra click nút "Quay về" đưa về lưới 2x2; kiểm tra nút "Truy cập dự án" mở đúng tab trình duyệt.

- [ ] **Step 5: Commit**
```bash
git add src/ui/DetailOverlay.js src/style.css
git commit -m "feat: implement 1-item large detail view with alternating zig-zag layout"
```

---

### Task 8: Thanh Lọc Kỹ năng (Skill Filter Bar), HUD & Tương thích Di động

**Files:**
- Create: `src/ui/HUD.js`
- Create: `src/ui/SkillFilterBar.js`
- Modify: `src/main.js`
- Modify: `src/style.css`

**Interfaces:**
- Consumes: `portfolioData.skills`, danh sách dự án.
- Produces: Thanh HUD trên (Branding, hướng dẫn lăn chuột, số trang), Thanh Skill Filter pills dưới, responsive mobile styles.

- [ ] **Step 1: Viết `SkillFilterBar.js`**
Render danh sách các skill: "Tất cả", "Three.js", "WebGL", "React", "Node.js", "AI"...
Khi click chọn 1 skill:
- Lọc danh sách dự án hiển thị chỉ gồm các dự án mang skill đó.
- Cập nhật lại số trang của Lưới 2x2 và reset về trang đầu tiên với hoạt ảnh khớp.

- [ ] **Step 2: Viết `HUD.js`**
Hiển thị logo manga thương hiệu cá nhân ở góc trên trái, chỉ dẫn thao tác chuột ở góc trên phải, và thanh tiến trình/số trang ở góc dưới.

- [ ] **Step 3: Tối ưu Responsive trên Mobile / Tablet**
Media queries cho màn hình < 768px:
- Điều chỉnh camera Z xa hơn hoặc chuyển lưới 2x2 thành lưới 1x2 để đảm bảo các ô manga luôn hiển thị rõ ràng.
- Chế độ chi tiết xếp theo chiều dọc (trên/dưới) thay vì trái/phải.
- Bắt cử chỉ vuốt chạm cảm ứng (touch swipe) nhạy và mượt mà.

- [ ] **Step 4: Commit**
```bash
git add src/ui/HUD.js src/ui/SkillFilterBar.js src/main.js src/style.css
git commit -m "feat: add skill filter bar, manga hud and responsive mobile adjustments"
```

---

### Task 9: Kiểm thử Tích hợp Toàn diện & Tinh chỉnh Hoàn thiện (End-to-End QA)

**Files:**
- Modify: `src/data/portfolioData.js` (hoàn thiện link demo thực tế, ví dụ `https://doodleshooter.vercel.app/`)
- Verify: Toàn bộ luồng trải nghiệm người dùng

- [ ] **Step 1: Chạy build production kiểm tra bundle**
Chạy: `npm run build`
Kỳ vọng: Build thành công trong thư mục `dist/`, không có cảnh báo lỗi cú pháp hay import thiếu.

- [ ] **Step 2: Kiểm tra toàn diện hành trình người dùng (User Flow QA)**
1. Mở trang web ở chế độ Lưới 2x2: Kiểm tra 4 ô manga hiển thị rõ nét, đầy đủ thông tin.
2. Rê chuột qua các ô: Kiểm tra viền mực neon phát sáng và hiệu ứng parallax tilt mượt mà.
3. Lăn chuột: Kiểm tra hàng trên trượt ra `easeOut`, hàng dưới trượt lên và hàng mới trượt vào `easeIn`.
4. Click vào 1 ô manga: Kiểm tra chuyển cảnh phóng to mượt mà, nội dung chi tiết xuất hiện ở nửa màn hình còn lại.
5. Lăn chuột ở chế độ chi tiết: Kiểm tra đổi vị trí Zig-Zag Trái/Phải dứt khoát.
6. Click nút "Truy cập dự án": Xác nhận mở link demo thành công.
7. Click nút "Quay về Lưới 2x2": Xác nhận thu nhỏ chính xác về vị trí ban đầu trong lưới.
8. Bấm lọc theo từng skill (Three.js, React...): Xác nhận danh sách dự án lọc đúng và chuyển trang khớp.

- [ ] **Step 3: Commit hoàn thiện**
```bash
git add .
git commit -m "chore: complete end-to-end verification and polish manga 3d portfolio"
```
