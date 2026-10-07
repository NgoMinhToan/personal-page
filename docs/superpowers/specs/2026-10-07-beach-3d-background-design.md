# Đặc tả Thiết kế Kỹ thuật (Design Spec): Background Bãi Biển Nhiệt Đới 3D Procedural (Three.js)

* **Tài liệu:** `docs/superpowers/specs/2026-10-07-beach-3d-background-design.md`
* **Ngày tạo:** 2026-10-07
* **Trạng thái:** Đã phê duyệt qua Thảo luận (Approved)
* **Tác giả:** Claude & User

---

## 1. Tổng quan & Mục tiêu (Overview & Goals)

### 1.1 Tổng quan
Dự án thực hiện đổi mới từng phần giao diện website portfolio cá nhân 3D Three.js. Bước đầu tiên và trọng tâm là **thay thế hoàn toàn lớp hình nền cũ** (vốn sử dụng ảnh tĩnh 2D `beach_paradise.jpg`) bằng một bức tranh bãi biển nhiệt đới 3D sống động, được **vẽ và dựng 100% bằng mã nguồn (Procedural 3D Code)** bằng Three.js primitives và materials.

Bức tranh nền gồm hai dải không gian tương phản:
* **Bên Trái:** Sườn đồi cỏ xanh nhiệt đới, rặng dừa uốn lượn và các chú khỉ tinh nghịch leo trèo.
* **Bên Phải:** Bãi cát vàng thoai thoải, mặt biển xanh ngọc bích với sóng nhấp nhô, người tắm biển bồng bềnh trên phao, trẻ em xây lâu đài cát và vận động viên lướt sóng ngoài khơi.
* **Phía Trên:** Bầu trời xanh ngắt rực rỡ với hơn 40 cụm mây 3D bồng bềnh đa tầng độ sâu, ánh mặt trời ấm áp và bụi nắng biển lấp lánh.
* **Tương tác Cuộn chuột (Scroll Parallax):** Toàn bộ các thành phần cảnh quan phản hồi đa tầng theo độ sâu trục Z khi người dùng lăn chuột.

### 1.2 Mục tiêu (Goals)
1. **100% Procedural 3D Code:** Không sử dụng bất kỳ file ảnh texture 2D bên ngoài nào cho cảnh nền. Khởi tạo tức thì, không có độ trễ tải mạng (Zero network asset latency).
2. **Phong cách Low-Poly Stylized / Cartoon:** Đa giác vát phẳng (`flatShading: true`), màu sắc nhiệt đới tươi sáng, đổ bóng rõ nét, giàu tính nghệ thuật.
3. **Động cơ Sóng Biển Thủ Công (Procedural Wave Engine):** Mặt nước dập dềnh liên tục bằng thuật toán giao thoa hàm lượng giác thời gian thực, có viền bọt sóng trắng vỗ bờ cát.
4. **Hệ thống Đa tầng Parallax Chiều sâu (3-Layer Depth Parallax):** Phân chia rõ ràng thành Tiền cảnh (Foreground - factor 0.55), Trung cảnh (Midground - factor 0.35) và Hậu cảnh (Background - factor 0.12), phản hồi trực tiếp với `currentScrollY`.
5. **Hiệu năng 60fps Ổn định:** Tối ưu hóa số lượng đỉnh (vertex budget), chia sẻ vật liệu (material reuse), loại bỏ cấp phát bộ nhớ trong vòng lặp render để tránh rác bộ nhớ (Zero GC stutter).

### 1.3 Giới hạn (Non-Goals)
* Không can thiệp hoặc làm xáo trộn hệ thống lưới bảng dự án 2x2 (`FarmGridParallaxManager.js`) và dữ liệu dự án (`portfolioData.js`) trong giai đoạn này (các bảng dự án vẫn hiển thị ở tầng trước `Z ≈ 0`).
* Không tích hợp engine vật lý nặng (như Cannon.js/Rapier) mà sử dụng các hàm dao động toán học thuần túy để điều khiển chuyển động sóng, ván lướt và nhân vật.

---

## 2. Kiến trúc Hệ thống & Cấu trúc Tệp tin (System Architecture)

### 2.1 Bản đồ Tệp tin
```text
src/
├── core/
│   ├── SceneManager.js          # Quản lý WebGLRenderer, Camera, Scene, onUpdate loop (Hiện hữu)
│   ├── Lighting.js              # Cập nhật ánh sáng nhiệt đới (Directional Sunlight + Sky Ambient)
│   ├── BeachEnvironment.js     # [MỚI] Quản lý toàn bộ nền bãi biển 3D, sóng, mây, parallax
│   └── FarmEnvironment.js      # [BỎ] Xóa bỏ nền ảnh tĩnh cũ
├── entities/
│   ├── BeachAssetBuilder.js     # [MỚI] Bộ sinh mô hình 3D nguyên bản (Cây dừa, Khỉ, Người, Sóng, Ô dù)
│   └── FarmAssetBuilder.js      # (Hiện hữu cho các model trang trí bảng dự án)
├── controllers/
│   └── FarmGridParallaxManager.js # Cung cấp currentScrollY từ thao tác lăn chuột
└── main.js                      # Kết nối BeachEnvironment vào SceneManager và render loop
```

### 2.2 Sơ đồ Luồng Dữ liệu (Data Flow)
```
[User Scroll Wheel / Touch Swipe]
               │
               ▼
[FarmGridParallaxManager] ──> Cập nhật currentScrollY (Lerp smooth scroll)
               │
               ▼
[SceneManager onUpdate Loop] ──> Gọi BeachEnvironment.update(delta, time, currentScrollY)
                                           │
       ┌───────────────────────────────────┼──────────────────────────────────┐
       ▼                                   ▼                                  ▼
[Foreground Group]                [Midground Group]                  [Background Group]
• Rặng dừa gần (Parallax 0.55)    • Mặt nước & Sóng nhấp nhô         • Mây 3D trôi (Parallax 0.12)
• Rìa bãi cát & Ô che nắng        • Người tắm bồng bềnh (0.35)       • Mặt trời & Chân trời
• Góc nghiêng lướt ngang          • Vận động viên lướt sóng          • Mặt biển xa vô tận
                                  • Đuôi khỉ đung đưa
```

---

## 3. Chi tiết Kỹ thuật Các Mô hình 3D (`BeachAssetBuilder.js`)

Mọi mô hình được đóng gói thành các hàm factory độc lập, trả về `THREE.Group` chứa các mesh được tối ưu:

### 3.1 Cây Dừa Nhiệt Đới (`createPalmTree`)
* **Thân cây:**
  * Ghép từ 6 đoạn hình trụ rỗng cụt (`THREE.CylinderGeometry(radiusTop, radiusBottom, height, 6)`), số mặt tròn là 6 tạo nét đa giác vát góc rõ nét.
  * Mỗi đoạn được xoay góc lệch nhẹ từ 0.05 đến 0.12 radian, tạo thân cây cong uốn lượn mềm mại vươn ra hướng biển.
  * Vật liệu: `MeshLambertMaterial({ color: 0x854d0e, flatShading: true })` (nâu vỏ cây tự nhiên).
* **Tán lá dừa:**
  * 7 nhánh lá toả tròn đều từ đỉnh ngọn, mỗi nhánh gồm 3 đoạn tam giác dẹt (`THREE.ConeGeometry(0.35, 2.2, 4)`) uốn cong rủ xuống.
  * Vật liệu: Màu xanh ngọc nhiệt đới đan xen (`0x15803d` và `0x22c55e`).
* **Chùm dừa:**
  * 3–4 quả dừa nhỏ dạng khối đa diện 12 mặt (`THREE.DodecahedronGeometry(0.28, 0)`), màu vàng nâu `0xa16207` tụ lại ngay cuống lá.

### 3.2 Chú Khỉ Tinh Nghịch (`createMonkey`)
* **Thân & Đầu:**
  * Thân: Khối bầu dục `DodecahedronGeometry(0.5, 0)` co giãn theo trục Y, màu nâu socola `0x78350f`. Yếm ngực màu vàng kem `0xfef08a`.
  * Đầu: Khối tròn `DodecahedronGeometry(0.38, 0)` với mõm nhô về trước màu da sáng `0xfde68a`. Hai tai tròn áp hai bên.
* **Tứ chi & Đuôi uốn lượn:**
  * Hai cánh tay dài dang rộng ôm lấy thân dừa; hai chân co ôm sát.
  * Chiếc đuôi dài hình chữ S ghép từ 6 đoạn hình trụ nhỏ nối tiếp nhau.
* **Hoạt ảnh tích hợp:** Phương thức `update(time)` làm đầu chú khỉ nghiêng ngó ngẫu nhiên và chiếc đuôi lắc lư theo nhịp sin.

### 3.3 Vận Động Viên Lướt Sóng (`createSurfer`)
* **Ván lướt sóng (Surfboard):**
  * `BoxGeometry(0.6, 0.08, 2.6)` với đỉnh đầu và đuôi được vuốt nhọn; vật liệu màu cam neon sọc cyan tương phản (`0xf97316`).
* **Vận động viên:**
  * Chân gập tạo tư thế chùng gối hạ trọng tâm vững chãi.
  * Hai tay dang rộng giữ thăng bằng; đầu nghiêng đón hướng sóng.
* **Bọt sóng đuôi ván:**
  * Cụm 3 khối `DodecahedronGeometry(0.15, 0)` màu trắng tinh `0xffffff` tung ra phía đuôi ván.
* **Hoạt ảnh tích hợp:** Ván và người lướt nghiêng lượn (`roll` ±0.2 rad, `pitch` ±0.15 rad) đồng bộ với chiều cao đỉnh sóng tại tọa độ của ván.

### 3.4 Nhóm Người Tắm Biển & Phao Cứu Sinh (`createSwimmer`)
* **Phao bơi tròn:**
  * `THREE.TorusGeometry(0.7, 0.22, 6, 12)` với họa tiết sọc tương phản (Đỏ - Trắng hoặc Vàng - Trắng).
* **Người bơi:**
  * Nửa thân trên nhô lên giữa lòng phao; đầu đội nón bơi hoặc kính bơi; hai tay đặt lên mép phao hoặc vẫy tay.
* **Hoạt ảnh tích hợp:** Nhấp nhô bồng bềnh độc lập theo pha sóng: `y = baseY + Math.sin(time * 2.2 + phaseOffset) * 0.2`.

### 3.5 Góc Trẻ Em Nghịch Cát & Ô Che Nắng (`createBeachSceneDecor`)
* **Em bé nghịch cát:** Nhân vật tí hon ngồi xổm trên bãi cát, tay cầm chiếc xẻng màu đỏ nhỏ.
* **Lâu đài cát:** Khối cát gồm 3 tháp trụ tròn và 3 chóp nón cát màu `0xfde047`.
* **Ô che nắng bãi biển:** Cán dù cắm xiên, tán dù hình nón xòe rộng với 8 múi màu sọc Đỏ - Trắng đan xen rực rỡ.
* **Bóng bãi biển (Beach Ball):** Khối cầu đa diện sọc 4 múi màu sinh động nằm cạnh mép nước.

---

## 4. Động Cơ Sóng Biển & Bầu Trời Mây 3D (`BeachEnvironment.js`)

### 4.1 Bố cục Không Gian & Phân Vùng Toạ Độ
* **Tọa độ Trung tâm:** Nhóm bãi biển được đặt sâu ở `Z = -8` đến `-30` sau lớp bảng dự án (`Z = 0`).
* **Vùng Bên Trái (`X: -22` đến `-3`):**
  * Sườn đồi cỏ xanh thoai thoải (`X: -16, Y: -4.5, Z: -15`), dựng từ lưới đa giác biến dạng ngẫu nhiên với màu xanh lá mạ `0x22c55e`.
  * Rặng dừa 7 cây phân bố rải rác từ sườn đồi thoai thoải xuống mép cát.
  * 2 chú khỉ tinh nghịch (1 chú bám thân dừa nghiêng, 1 chú ngồi trên ngọn dừa cao).
* **Vùng Bên Phải (`X: -2` đến `+24`):**
  * Bãi cát vàng mịn trải dài từ `X: -3` đến `+8`, màu vàng ấm `0xfde047`.
  * Lưới đại dương xanh ngọc bích từ `X: +5` trải dài ra viễn cảnh `+24`, màu nước `0x06b6d4`.
  * Trẻ con và ô che nắng đặt tại vùng cát khô (`X: 1.5, Y: -3.5, Z: -11`).
  * Người tắm biển bố trí tại vùng nước nông gần bờ (`X: 7.0` đến `11.0`, `Z: -14` đến `-18`).
  * Người lướt sóng bố trí tại vùng sóng ngoài khơi (`X: 13.5, Y: -2.0, Z: -16`).

### 4.2 Động Cơ Sóng Biển Thủ Công (Procedural Wave Engine)
* **Lưới Mặt Nước:**
  * Kích thước: `PlaneGeometry(width: 46, height: 36, segmentsX: 64, segmentsY: 48)`.
  * Xoay góc: Nằm ngang và nghiêng dốc nhẹ về phía chân trời (`rotation.x = -Math.PI * 0.42`).
  * Chất liệu: `MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.18, metalness: 0.08, flatShading: true, transparent: true, opacity: 0.94 })`.
* **Thuật toán Giao thoa Sóng Biển:**
  ```javascript
  const pos = this.waterGeometry.attributes.position;
  const timeOffset = time * 1.8;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    
    // Giảm dần biên độ sóng khi tiến về phía bờ cát (x âm hơn)
    const shoreDamp = Math.min(1.0, Math.max(0.1, (x + 10) / 20));
    
    const wave = (
      Math.sin(x * 0.35 + timeOffset) * 0.45 +
      Math.cos(y * 0.28 + timeOffset * 0.8) * 0.35 +
      Math.sin((x + y) * 0.15 + timeOffset * 1.2) * 0.25
    ) * shoreDamp;
    
    pos.setZ(i, wave);
  }
  pos.needsUpdate = true;
  ```

### 4.3 Bầu Trời & 40+ Cụm Mây 3D Bồng Bềnh
* **Nền trời xanh thẳm:**
  * Background: `scene.background = new THREE.Color(0x0284c7)` (Deep Cerulean Blue).
  * Fog viễn cảnh: `scene.fog = new THREE.FogExp2(0x38bdf8, 0.007)`.
* **Mặt trời nhiệt đới:**
  * `SphereGeometry(4.2, 12, 12)` màu vàng sáng rực `0xfbbf24` với chất liệu `MeshBasicMaterial` đặt ở góc cao viễn cảnh `(X: 18, Y: 22, Z: -36)`.
* **Hệ thống 42 Cụm Mây Đa Tầng:**
  * Mỗi cụm mây gồm 5–8 khối đa diện `DodecahedronGeometry` màu trắng tinh khôi, tạo dáng bồng bềnh tự nhiên.
  * Phân chia độ sâu:
    * *Tầng mây thấp (14 cụm):* `Z = -14` đến `-20`, tốc độ trôi nhanh (1.8 đơn vị/giây), parallax factor 0.35.
    * *Tầng mây trung (16 cụm):* `Z = -22` đến `-28`, tốc độ trôi vừa (1.2 đơn vị/giây), parallax factor 0.22.
    * *Tầng mây cao (12 cụm):* `Z = -30` đến `-38`, tốc độ trôi chậm (0.7 đơn vị/giây), parallax factor 0.10.
  * Khi mây trôi vượt quá giới hạn biên phải (`X > 75`), mây tự động hồi sinh tại biên trái (`X = -75`) với độ cao Y ngẫu nhiên mới.

---

## 5. Tương Tác Cuộn Chuột & Đa Tầng Parallax (Scroll Dynamics)

Khi người dùng thao tác lăn chuột, `gridManager.currentScrollY` được truyền vào `beachEnvironment.update(delta, time, scrollY)`:

1. **Lớp Tiền cảnh (`this.foregroundGroup`, Parallax Factor: 0.55):**
   * Chứa: Rặng dừa gần, bờ cát viền ngoài, ô che nắng và lâu đài cát.
   * `position.y = this.baseFG_Y + (scrollY * 0.55);`
   * `position.x = this.baseFG_X + Math.sin(scrollY * 0.04) * 0.7;` (Hiệu ứng trôi lượn nhẹ tạo cảm giác ống kính camera lướt qua).
2. **Lớp Trung cảnh (`this.midgroundGroup`, Parallax Factor: 0.35):**
   * Chứa: Mặt biển sóng cuộn, người tắm biển, người lướt sóng, các chú khỉ.
   * `position.y = this.baseMG_Y + (scrollY * 0.35);`
3. **Lớp Hậu cảnh (`this.backgroundGroup`, Parallax Factor: 0.12):**
   * Chứa: Mặt trời nhiệt đới, chân trời xa, các cụm mây và hạt bụi nắng.
   * `position.y = this.baseBG_Y + (scrollY * 0.12);`

---

## 6. Kế hoạch Kiểm thử & Tiêu chí Nghiệm thu (Testing & Acceptance Criteria)

### 6.1 Tiêu chí Nghiệm thu Chức năng (Functional Criteria)
1. **Khởi tạo không lỗi:** Trang web tải lên mượt mà, console không có bất kỳ thông báo lỗi hoặc cảnh báo texture thiếu.
2. **Loại bỏ ảnh nền cũ:** Xóa hoàn toàn file và code gọi nạp `/beach_paradise.jpg`; nền hoàn toàn được tạo bằng Three.js mesh.
3. **Hiện diện đầy đủ các thành phần:**
   * Bên trái có sườn đồi, rặng dừa uốn lượn và các chú khỉ.
   * Bên phải có bãi cát vàng, mặt biển xanh ngọc, người lướt sóng, người tắm biển trên phao, trẻ em xây lâu đài cát.
   * Phía trên có mặt trời rạng rỡ và hơn 40 cụm mây trôi bồng bềnh.
4. **Hoạt ảnh liên tục (Idle Animation):**
   * Sóng biển nhấp nhô liên tục theo nhịp toán học.
   * Người tắm và phao nổi dập dềnh theo sóng.
   * Người lướt sóng lắc lư nghiêng theo ngọn sóng.
   * Đuôi khỉ lắc lư, tán dừa đung đưa trong gió.
   * Mây trôi êm ả ngang bầu trời.
5. **Hiệu ứng Parallax khi cuộn:** Lăn chuột lên/xuống khiến 3 tầng cảnh quan trôi với 3 tốc độ khác nhau, tạo chiều sâu 3D rõ rệt.

### 6.2 Tiêu chí Hiệu năng (Performance Criteria)
* Đạt tốc độ khung hình ổn định **60fps** trên màn hình chuẩn 1080p/2K.
* Số lượng draw call được kiểm soát dưới 80 calls nhờ tái sử dụng vật liệu.
* Bộ nhớ RAM không bị rò rỉ (Zero Memory Leak) qua nhiều vòng cuộn trang.
