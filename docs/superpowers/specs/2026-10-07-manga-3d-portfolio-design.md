# Đặc tả Thiết kế Kỹ thuật (Design Spec): Website Portfolio Manga 3D Three.js

* **Tài liệu:** `docs/superpowers/specs/2026-10-07-manga-3d-portfolio-design.md`
* **Ngày tạo:** 2026-10-07
* **Trạng thái:** Chờ phê duyệt (Pending User Review)
* **Tác giả:** Antigravity & User

---

## 1. Tổng quan Dự án (Project Overview)

Trang web portfolio cá nhân đồ họa 3D toàn màn hình xây dựng bằng **Three.js**, lấy cảm hứng từ phong cách **Ô truyện tranh Manga Nhật Bản (Japanese Manga Panels)** kết hợp tương tác mượt mà theo cảm hứng của các ứng dụng 3D sáng tạo (như Doodle District).

### Các điểm nhấn cốt lõi:
1. **Bố cục tổng quan Lưới 2x2 (Grid Overview):** Luôn hiển thị ít nhất 4 dự án xếp theo lưới 2x2 lơ lửng toàn màn hình.
2. **Cơ chế Lăn chuột Khớp (Snap Scroll Engine):** Khi lăn chuột, các bảng hàng trên trượt ra ngoài với `easeOut`, các bảng hàng dưới trượt lên và bảng mới trượt vào với `easeIn`, tạo cảm giác cuộn dứt khoát theo từng trang.
3. **Hiệu ứng Hover:** Rê chuột đến đâu, ô manga đó phát sáng viền mực neon (ink-glow) và nghiêng 3D theo góc con trỏ chuột.
4. **Phóng to Chi tiết & Cuộn Zig-Zag (Detail Zoom & Zig-Zag Snap):** 
   * Click vào bảng bất kỳ để phóng to bảng đó mượt mà thành item lớn.
   * Chế độ cuộn chuyển thành **Snap 1-Item lớn**, bố trí so le Zig-Zag: item lớn xuất hiện bên Trái thì nội dung (mô tả, skills, nút truy cập dự án) xuất hiện bên Phải; sang item kế tiếp thì đảo chiều ngược lại.
   * Có nút "Quay về" (Back button) để thu nhỏ mượt mà trở lại lưới 2x2.
5. **Hệ thống Kỹ năng (Tech Skills/Tags):** Có bộ kỹ năng công nghệ cài sẵn, bộ lọc theo skill và cho phép người dùng tự do thêm/bớt skill cực kỳ dễ dàng qua file dữ liệu JSON/JS.

---

## 2. Mục tiêu & Giới hạn (Goals & Non-Goals)

### Mục tiêu (Goals):
* **Trải nghiệm thị giác WOW:** Đậm chất manga nghệ thuật, viền mực sắc nét, chấm trame halftone, đổ bóng và ánh sáng spotlight sống động.
* **Tốc độ khung hình 60fps:** Tối ưu hóa WebGL, sử dụng GSAP/Lerp mượt mà, không giật lag.
* **Tương thích đa nền tảng:** Trải nghiệm hoàn hảo trên Desktop (lưới 2x2, scroll wheel) và Mobile/Tablet (lưới 1x2 hoặc 1 cột, touch swipe).
* **Kiến trúc bóc tách:** Dữ liệu dự án và skill tách riêng tại `src/data/portfolioData.js`, không cần can thiệp vào code Three.js khi cập nhật nội dung.

### Giới hạn (Non-Goals):
* Không sử dụng backend phức tạp hoặc cơ sở dữ liệu bên ngoài trong phiên bản v1 (toàn bộ cấu hình lưu trữ tĩnh).
* Không tích hợp engine physics nặng (như Ammo.js hay Cannon.js) để tránh làm nặng bundle size; toàn bộ chuyển động khớp snap và tương tác bảng được điều khiển bằng thuật toán toán học và tweening chính xác.

---

## 3. Kiến trúc Hệ thống & Ngăn xếp Công nghệ (Tech Stack)

* **Build Tool:** Vite (khởi chạy nhanh, hot reload tức thời, bundle nhỏ gọn).
* **Đồ họa 3D:** Three.js (quản lý WebGL Scene, Camera, Mesh, Lighting, Materials, Raycasting).
* **Animation Engine:** GSAP (GreenSock Animation Platform) xử lý chuyển động lerp, easing `power2.out`, `power2.in` và hoạt ảnh chuyển trạng thái phóng to/thu nhỏ.
* **Styling & HUD:** Vanilla CSS hiện đại (CSS Custom Properties, Glassmorphism, Font Manga/Comic từ Google Fonts như *Bangers*, *Manga Temple*, hoặc kết hợp *Plus Jakarta Sans* + *Cabinet Grotesk*).
* **Cấu trúc dữ liệu:** ES Modules JavaScript (`portfolioData.js`).

### Cấu trúc Thư mục:
```text
personal-page/
├── index.html                   # Entrypoint: Canvas 3D + HUD container
├── package.json
├── vite.config.js
├── public/
│   ├── assets/
│   │   ├── textures/            # Halftone screentone, manga action lines
│   │   └── projects/            # Ảnh chụp dự án / thumbnail
├── src/
│   ├── main.js                  # Điểm khởi chạy chính: kết nối Scene, UI và Data
│   ├── style.css                # Style manga, HUD, typography, buttons
│   ├── data/
│   │   └── portfolioData.js     # Danh sách Skills & Projects
│   ├── core/
│   │   ├── SceneManager.js      # Khởi tạo Renderer, Camera, Scene, Resize listener
│   │   ├── Lighting.js          # AmbientLight, Directional Key Light, Board Spotlights
│   │   └── MangaEnvironment.js  # Nền không gian sương mù, halftone background plane
│   ├── entities/
│   │   ├── MangaBoard.js        # Mesh bảng 3D manga: khung viền, texture thumbnail, hover state
│   │   └── BoardCanvasRenderer.js# Render texture manga (tiêu đề, số tập VOL, nét vẽ mực)
│   ├── controllers/
│   │   ├── SnapScrollManager.js # Xử lý cuộn chuột khớp (2x2 grid & 1-item detail)
│   │   ├── InteractionManager.js# Raycasting bắt hover glow & click zoom
│   │   └── TransitionController.js# Quản lý hoạt ảnh phóng to (expand) và thu nhỏ (shrink)
│   └── ui/
│       ├── HUD.js               # Header manga, số tập Chapter, hướng dẫn điều khiển
│       ├── SkillFilterBar.js    # Thanh lọc pill skill, cập nhật dữ liệu hiển thị
│       └── DetailOverlay.js     # Khối hiển thị thông tin khi ở chế độ chi tiết (Text, Skills, CTA)
└── docs/
    └── superpowers/specs/       # Bản đặc tả kỹ thuật
```

---

## 4. Thiết kế Không gian 3D & Bảng Manga (3D Manga Entity)

### 4.1 Cấu tạo một Chiếc Bảng Manga (`MangaBoard`)
Mỗi chiếc bảng là một cụm `THREE.Group` gồm:
1. **Khung viền mực Manga (Manga Ink Frame):**
   * Hộp vát góc tinh tế màu đen tuyền/trắng tương phản cao (`MeshStandardMaterial` roughness: 0.2, metalness: 0.1).
   * Viền ngoài có độ dày 3-4px mang phong cách viền ô truyện tranh.
2. **Mặt tranh hiển thị (Display Surface):**
   * Sử dụng `THREE.CanvasTexture` hoặc texture ảnh kết hợp lớp phủ shader chấm trame Halftone.
   * Hiển thị: Thumbnail dự án, số tập (*VOL. 01*), mã dự án, huy hiệu thể loại (*#THREEJS #GAME*).
3. **Lớp viền hào quang phát sáng (Ink-Glow Rim Layer):**
   * Một mesh viền phát sáng nhẹ bao quanh khung.
   * Bình thường: `opacity = 0`.
   * Khi Hover: GSAP tween `opacity -> 1`, tăng nhẹ độ sáng của đèn spotlight rọi vào bảng, và bảng nghiêng nhẹ theo góc chuột ($X, Y$ parallax tilt).

---

## 5. Cơ chế Điều khiển & Hoạt ảnh (Navigation & Animation Mechanics)

### 5.1 Máy trạng thái giao diện (UI State Machine)
Giao diện có 2 trạng thái chính:
* `STATE_GRID`: Lưới 2x2 hiển thị 4 dự án tổng quan.
* `STATE_DETAIL`: Chế độ xem 1 item lớn với bố cục Zig-Zag so le.

### 5.2 Cơ chế Cuộn khớp ở Chế độ Lưới 2x2 (`STATE_GRID`)
* Lưới 2x2 gồm 4 vị trí chuẩn hóa:
  * Top-Left: $(-X, +Y, 0)$
  * Top-Right: $(+X, +Y, 0)$
  * Bottom-Left: $(-X, -Y, 0)$
  * Bottom-Right: $(+X, -Y, 0)$
* **Khi cuộn xuống (Wheel Down / Swipe Up):**
  1. Hàng trên (Top-Left & Top-Right) trượt lên trên khỏi tầm nhìn ($Y \uparrow$) và mờ dần với easing `power2.out` (easeOut).
  2. Hàng dưới (Bottom-Left & Bottom-Right) trượt lên thay thế vị trí hàng trên.
  3. Hai bảng mới của trang kế tiếp trượt từ dưới ($Y \downarrow$) vào vị trí hàng dưới với easing `power2.in` (easeIn).
* **Khi cuộn lên (Wheel Up / Swipe Down):** Hoạt ảnh diễn ra theo chiều đảo ngược.

### 5.3 Hoạt ảnh Chuyển đổi Phóng to (Zoom In) & Thu nhỏ (Shrink Back)
* **Kích hoạt Zoom In (Click vào ô manga):**
  1. Khóa sự kiện cuộn tạm thời trong quá trình chuyển cảnh (300ms–400ms).
  2. 3 ô không được chọn trượt nhanh ra biên màn hình và mờ dần.
  3. Ô được click bay từ vị trí lưới 2x2 ra vị trí lớn ở nửa màn hình (Trái hoặc Phải, chiếm ~50% chiều ngang).
  4. Khối nội dung chi tiết (`DetailOverlay`) trượt vào ở nửa màn hình còn lại.
  5. Đổi trạng thái sang `STATE_DETAIL`.
* **Kích hoạt Quay về (Click nút "Quay về Lưới 2x2"):**
  1. Khối nội dung chi tiết trượt ẩn ra biên.
  2. Ô lớn thu nhỏ và bay mượt mà trở lại vị trí gốc trong lưới 2x2.
  3. 3 ô còn lại trượt vào lại lưới.
  4. Đổi trạng thái trở lại `STATE_GRID`.

### 5.4 Cơ chế Cuộn khớp Zig-Zag ở Chế độ Chi tiết (`STATE_DETAIL`)
* Khi lăn chuột ở chế độ chi tiết, camera/scene snap chuyển qua từng dự án:
  * Dự án chỉ số lẻ ($1, 3, 5...$): Bảng 3D nằm bên **Trái**, Nội dung chi tiết nằm bên **Phải**.
  * Dự án chỉ số chẵn ($2, 4, 6...$): Bảng 3D nằm bên **Phải**, Nội dung chi tiết nằm bên **Trái**.
* Nội dung chi tiết hiển thị:
  * Tiêu đề dự án cỡ lớn (Typography Manga đậm).
  * Mô tả câu chuyện và thách thức kỹ thuật của dự án.
  * Danh sách thẻ công nghệ (Tech Skill pills) có màu sắc tương ứng.
  * Nút hành động nổi bật: **"Truy cập dự án (Live Demo)"** và nút **"GitHub Repo"**.

---

## 6. Mô hình Dữ liệu & Hệ thống Mở rộng Kỹ năng (Data Schema & Extensibility)

Tất cả dữ liệu được lưu tại `src/data/portfolioData.js`:
```javascript
export const portfolioData = {
  // 1. Cấu hình kỹ năng (Dễ dàng thêm mới bất kỳ lúc nào)
  skills: [
    { id: 'threejs', name: 'Three.js', color: '#38bdf8', category: '3D/Graphics' },
    { id: 'webgl',   name: 'WebGL & Shaders', color: '#10b981', category: '3D/Graphics' },
    { id: 'react',   name: 'React', color: '#60a5fa', category: 'Frontend' },
    { id: 'node',    name: 'Node.js', color: '#22c55e', category: 'Backend' },
    { id: 'ai',      name: 'AI / LLM', color: '#f43f5e', category: 'AI/ML' }
  ],

  // 2. Danh sách dự án
  projects: [
    {
      id: 'doodle-district',
      vol: 'VOL. 01',
      title: 'Doodle District 3D',
      subtitle: 'Multiplayer WebGL Action Game',
      description: 'Game bắn súng 3D thời gian thực đa người chơi chạy trực tiếp trên web với phong cách vẽ tay sổ tay cá tính, áp dụng Three.js và PeerJS.',
      thumbnail: '/assets/projects/doodle.jpg',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://doodleshooter.vercel.app/',
      githubUrl: 'https://github.com/your-username/doodle-district',
      accentColor: '#38bdf8'
    },
    {
      id: 'neuro-studio',
      vol: 'VOL. 02',
      title: 'NeuroStudio Agent',
      subtitle: 'Conversational Autonomous Workspace',
      description: 'Nền tảng trợ lý trí tuệ nhân tạo tương tác đa kênh, tích hợp vector database và tự động hóa quy trình làm việc.',
      thumbnail: '/assets/projects/neuro.jpg',
      skills: ['react', 'ai', 'node'],
      demoUrl: '#',
      githubUrl: '#',
      accentColor: '#f43f5e'
    },
    {
      id: 'quantum-particles',
      vol: 'VOL. 03',
      title: 'Quantum Particle Flow',
      subtitle: 'GPU Accelerated Simulation',
      description: 'Mô phỏng 100,000 hạt tương tác vật lý bằng Compute Shaders và WebGL.',
      thumbnail: '/assets/projects/quantum.jpg',
      skills: ['threejs', 'webgl'],
      demoUrl: '#',
      githubUrl: '#',
      accentColor: '#10b981'
    },
    {
      id: 'cyber-pulse',
      vol: 'VOL. 04',
      title: 'CyberPulse Analytics',
      subtitle: 'Realtime Infrastructure Monitor',
      description: 'Hệ thống giám sát và phân tích lưu lượng thời gian thực với bảng điều khiển trực quan hóa dữ liệu cao cấp.',
      thumbnail: '/assets/projects/cyber.jpg',
      skills: ['node', 'react'],
      demoUrl: '#',
      githubUrl: '#',
      accentColor: '#eab308'
    }
  ]
};
```

---

## 7. Xử lý Lỗi & Tối ưu Hiệu năng (Error Handling & Performance)

1. **Fallback khi ảnh thumbnail chưa có:** 
   * Nếu file ảnh không tồn tại, hệ thống tự động sinh một khung tranh Manga với gradient màu thương hiệu và icon thể loại, đảm bảo giao diện luôn đẹp mắt không bị vỡ.
2. **WebGL Context Loss:** 
   * Lắng nghe sự kiện `webglcontextlost` và khôi phục khi `webglcontextrestored`.
3. **Giới hạn Pixel Ratio:** 
   * `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` tránh tụt FPS trên màn hình 4K/Retina.
4. **Tái sử dụng Mesh (Object Pooling):** 
   * Không tạo mới và hủy mesh liên tục khi cuộn trang; tái sử dụng các instance `MangaBoard` sẵn có và chỉ cập nhật texture/nội dung tương ứng.

---

## 8. Kế hoạch Kiểm thử & Đánh giá (Testing & Quality Assurance)

1. **Kiểm tra cơ chế Cuộn khớp 2x2:** Lăn chuột thử nghiệm trên trackpad laptop và con lăn chuột vật lý; đảm bảo 100% khớp dứt khoát vào 4 ô.
2. **Kiểm tra Hoạt ảnh Phóng to & Thu nhỏ:** Click vào từng ô trong 4 ô; kiểm tra quỹ đạo bay mượt mà đến vị trí lớn và quay về chính xác vị trí ban đầu khi bấm Back.
3. **Kiểm tra Cuộn Zig-Zag:** Ở chế độ chi tiết, cuộn liên tiếp để kiểm tra tính luân phiên Trái - Phải của item và nội dung.
4. **Kiểm tra Bộ lọc Skill:** Bấm lọc từng skill; kiểm tra lưới tự cập nhật chính xác các dự án liên quan.
5. **Kiểm tra Nút Truy cập:** Bấm nút "Truy cập dự án (Live Demo)" mở tab mới đúng liên kết.
6. **Kiểm tra Responsive:** Thử nghiệm co giãn cửa sổ trình duyệt từ Desktop (1920x1080) xuống Mobile (375x667).
