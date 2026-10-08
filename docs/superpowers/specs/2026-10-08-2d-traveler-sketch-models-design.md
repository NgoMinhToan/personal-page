# Đặc tả Kỹ thuật Thiết kế: Tái thiết kế Toàn diện Model 2D Ký Họa Sổ Tay Du Ký (Traveler's Sketch & Ink) & Loại bỏ Mã nguồn 3D

> **Tài liệu:** `docs/superpowers/specs/2026-10-08-2d-traveler-sketch-models-design.md`  
> **Ngày tạo:** 2026-10-08  
> **Trạng thái:** Đã phê duyệt qua Thảo luận Thiết kế (Approved)  
> **Phong cách nghệ thuật:** **Traveler's Sketchbook & Ink Hatching** (Ký họa bút kim & màu nước sổ tay du ký của nghệ sĩ: nét viền mực có độ dày mỏng tự nhiên, kỹ thuật gạch bóng *cross-hatching*, mảng loang màu nước mộc mạc, giải phẫu nhân vật sống động).

---

## 1. Mục tiêu & Định hướng Kiến trúc

### 1.1. Bối cảnh & Vấn đề
* Trước đây, website có nhiều thành phần mô hình 3D Three.js cũ (`FarmAssetBuilder`, `BeachAssetBuilder`, `FarmGridParallaxManager`...) không còn được sử dụng, gây nặng nề mã nguồn và phân tán trọng tâm.
* Các hình vẽ 2D SVG ban đầu ở hai bên sườn (cây dừa, khỉ, người lướt sóng, người tắm biển, lâu đài cát) được ghép từ các hình học cơ bản thô sơ (các vòng tròn đơn giản, đường thẳng đơn điệu), thiếu tính thẩm mỹ và cảm giác nghệ thuật.
* Người dùng yêu cầu: **Loại bỏ triệt để toàn bộ mô hình và mã nguồn 3D cũ, tập trung 100% vào trải nghiệm 2D, và thiết kế lại toàn bộ các model 2D** theo phong cách ký họa nghệ thuật đỉnh cao.

### 1.2. Mục tiêu Cốt lõi
1. **Dọn dẹp triệt để mã nguồn 3D Three.js:** Xóa bỏ toàn bộ các file assets, environment, controllers, HUD và modal 3D cũ không còn dùng.
2. **Nâng cấp toàn diện các Model 2D:**
   * Thay thế các hình học 2D thô sơ bằng các tác phẩm đồ họa vector SVG ký họa chi tiết cao: Cây dừa uốn lượn có vân vỏ và gạch bóng, 3 chú khỉ có tỷ lệ giải phẫu chuẩn và biểu cảm tinh nghịch, vận động viên lướt sóng động học dũng mãnh, người bơi phao thư thái, cụm mây nét viền kép, mặt trời màu nước và bờ biển stippling.
   * Bổ sung bộ icon ký họa nét mực độc bản (*project sketch badges*) đại diện cho từng dự án trong 16 dự án.
3. **Hiệu năng 60fps & Nhẹ tênh:** 100% mã nguồn vector SVG thuần, không phụ thuộc tài nguyên ảnh bitmap cồng kềnh, tối ưu cuộn parallax bằng `requestAnimationFrame`.
4. **Kiểm thử tự động vững chắc:** Kiểm thử đơn vị cho toàn bộ các component 2D đảm bảo không hồi quy (*no regressions*), biên dịch build sạch sẽ.

---

## 2. Kế hoạch Dọn dẹp & Kiến trúc Tệp tin

### 2.1. Danh sách Tệp 3D Cũ cần Loại bỏ
Các tệp 3D cũ được xóa hoàn toàn khỏi dự án:
```text
src/
├── core/
│   ├── BeachEnvironment.js & BeachEnvironment.test.js
│   ├── FarmEnvironment.js
│   ├── MangaEnvironment.js
│   ├── SceneManager.js
│   └── Lighting.js
├── entities/
│   ├── BeachAssetBuilder.js & BeachAssetBuilder.test.js
│   ├── FarmAssetBuilder.js
│   ├── FarmBoard.js
│   ├── FarmSignpost.js
│   ├── MangaBoard.js
│   └── BoardCanvasRenderer.js
├── controllers/
│   ├── FarmGridParallaxManager.js
│   ├── FarmInteractionManager.js
│   ├── FarmCameraController.js
│   ├── InteractionManager.js
│   ├── SnapScrollManager.js
│   └── TransitionController.js
└── ui/
    ├── FarmHUD.js
    ├── FarmDetailModal.js
    ├── DetailOverlay.js
    └── SkillFilterBar.js
```

### 2.2. Kiến trúc 2D Traveler's Sketchbook Mới
Hệ thống 2D được chuẩn hóa thành các thành phần độc lập:
```text
src/
├── components/
│   ├── StickyClouds.js        # Mây nét viền kép & Mặt trời ký họa màu nước cố định đỉnh
│   ├── StickyClouds.test.js
│   ├── StickyBeach.js         # Sóng biển mộc bản & Bãi cát chấm hạt stippling cố định đáy
│   ├── StickyBeach.test.js
│   ├── SideFlanks.js          # Rặng dừa ký họa, 3 chú khỉ, Surfer & Swimmer 2 bên sườn
│   ├── SideFlanks.test.js
│   ├── ScrapbookStream.js     # Dòng sổ tay 1 cột & Thẻ dự án kèm sketch badge
│   ├── ScrapbookStream.test.js
│   ├── JournalModal.js        # Modal mở rộng 2 trang sổ tay chi tiết khi nhấp xem
│   ├── JournalModal.test.js
│   ├── StationeryHUD.js       # Thước kẻ gỗ & Bộ lọc kỹ năng
│   └── StationeryHUD.test.js
├── data/
│   ├── portfolioData.js       # Dữ liệu 16 dự án kèm định danh sketch badge
│   └── portfolioData.test.js
├── style.css                  # Kiểu dáng giấy Campus kẻ ô ly, bảng màu mực than chì
└── main.js                    # Điều phối render và lắng nghe scroll parallax mượt mà
```

---

## 3. Đặc tả Chi tiết Các Model 2D Mới (Traveler's Sketch Models)

Tất cả các model 2D được định nghĩa bằng mã nguồn SVG sắc nét, phối hợp giữa đường viền mực than chì `#1e293b`, kỹ thuật gạch bóng *cross-hatching* và các vệt loang màu nước pastel mộc mạc:

### 3.1. Model Cây Dừa Ký Họa (Ink Sketch Palm Tree - 3 Trạm Sườn Trái)
* **Thân cây dừa:**
  * Đường viền kép bút mực dày `2.5px - 3px` uốn cong tự nhiên theo chiều gió biển.
  * Các ngấn vỏ dừa xù xì (`line` nét gạch ngang ngấn vỏ) kết hợp các đường gạch chéo *cross-hatching* đổ bóng ở mép thân dưới.
  * Lớp nền màu nước nâu cam (`#d97706` opacity 0.3) loang mộc mạc bên trong thân.
* **Tán lá dừa lông vũ:**
  * 5–7 tàu lá rủ cong mềm mại, gồm sống lá chính nét mực thanh đậm và các đường tỉa răng cưa lá dừa lông vũ sống động.
  * Lớp nền màu nước xanh lá tươi (`#86efac` opacity 0.45) loang mềm trên tán lá.
* **Chùm dừa:** 3–4 quả dừa tròn vẽ tay có đốm sáng phản chiếu (*white highlight notch*) và đường cuống dừa ghim chặt.
* **3 Trạm vị trí:**
  * Trạm 1 (`Y ≈ 50`): Cây dừa vươn cao đón chào người xem ở đầu trang.
  * Trạm 2 (`Y ≈ 750`): Cây dừa uốn cong thân nghiêng hướng vào dòng dự án ở giữa trang.
  * Trạm 3 (`Y ≈ 1420`): Cây dừa rủ bóng trên mỏm đồi cỏ ký họa ở cuối hành trình cuộn.

### 3.2. Model 3 Chú Khỉ Ký Họa Tinh Nghịch (Sketch Monkeys)
* **Form dáng & Tỷ lệ giải phẫu:**
  * Thân khỉ hoạt họa thon gọn, có cánh tay, cẳng chân và bàn tay bám cành linh hoạt.
  * Bụng có các đường nét gạch tỉa lông tơ (*fur hatching*); đuôi quấn chữ S dẻo dai bám chặt thân cây.
* **Biểu cảm láu lỉnh:**
  * Mắt có con ngươi đen và đốm phản quang trắng tinh nghịch; khóe miệng cười xếch; tai tròn có vành tai trong màu be sữa.
* **3 Tư thế sống động:**
  * **Khỉ 1 (Cành cao Trạm 1):** Bám một tay vào cành, một tay vẫy chào vui vẻ.
  * **Khỉ 2 (Thân giữa Trạm 2):** Đuôi móc thân cây, treo ngược người, hai tay đung đưa thích thú.
  * **Khỉ 3 (Gốc đồi Trạm 3):** Ngồi bệt ôm quả dừa to tròn, ngước nhìn lên dòng dự án tò mò.

### 3.3. Model Vận Động Viên Lướt Sóng Động Học (Action Surfer - Sườn Phải)
* **Tư thế Động học Chuẩn xác (Anatomical Gesture Sketch):**
  * Đầu gối khuỵu thấp, hai chân choãi vững chãi trên ván; hai cánh tay dang ngang uyển chuyển giữ thăng bằng theo quán tính lướt.
  * Mái tóc vẽ nét bay ngược trong gió biển; mắt đeo kính bảo hộ lướt sóng thời thượng (*doodle goggles*).
* **Ván lướt & Hiệu ứng Chuyển động:**
  * Ván lướt nét mực sắc sảo có vệt màu nước cam rực rỡ (`#fb923c` opacity 0.5) và đường sọc thể thao.
  * Phía sau đuôi ván có các đường nét chuyển động (*motion lines*) và giọt bọt nước tung trắng xóa.
  * Khi cuộn trang, ván lướt và surfer có góc nghiêng dao động nhẹ (`surferTilt = Math.sin(clampedY * 0.005) * 8` độ).

### 3.4. Model Người Tắm Biển & Cảnh Quan Bãi Biển (Beach Life - Sườn Phải)
* **Người tắm phao bơi (Swimmer on Donut Float):**
  * Phao bơi tròn sọc đỏ-trắng nét mực, nhân vật đeo kính râm đen ngầu, một tay bám phao, một tay vẫy chào thư thái nổi bồng bềnh trên sóng.
* **Đường sóng Hokusai sườn phải:**
  * Dải sóng nước nét mực cuộn tròn mềm mại có các bọt xoáy uốn lượn duyên dáng dọc theo chiều cao trang (`stroke="#1e293b"`, `stroke-width: 2.2px`, vệt loang `#bae6fd`).
* **Lâu đài cát & Ô bãi biển:**
  * Ô che nắng xiên góc sọc chéo có bóng đổ gạch nét; lâu đài cát 3 tháp có cờ tam giác bay phấp phới và cửa vòm.

### 3.5. Model Dải Mây & Mặt Trời Cố Định Đỉnh (Sticky Top Clouds & Sun)
* **Mây nét viền kép (Double-line Ink Clouds):**
  * Các cụm mây giấy xốp vẽ viền nét mực kép thanh lịch (`stroke="#1e293b"`, `stroke-width: 2.2px`), bên dưới bụng mây có các đường gạch bóng hatching tạo chiều sâu.
* **Mặt trời ký họa màu nước:**
  * Vòng tròn vẽ tay tự do với vệt loang màu nước vàng ấm (`#fde047`), các tia nắng nét bút mực phóng khoáng tỏa ra xung quanh, nụ cười nét vẽ mộc mạc.

### 3.6. Model Bờ Biển Cố Định Đáy (Sticky Bottom Beach & Waves)
* **Sóng biển mộc bản:**
  * Hai tầng sóng cuộn dập dềnh bằng đường cong nét mực tự nhiên, có dải bọt sóng nét đứt vẽ tay vỗ bờ cát.
* **Bờ cát chấm hạt (Stippling Sand Texture):**
  * Bờ cát vàng giấy ấm có kỹ thuật chấm hạt cát nghệ thuật (*stippling dots*), điểm xuyết các vỏ sò và sao biển 5 cánh ký họa rải rác.

### 3.7. Bộ Icon Ký Họa Cho 16 Dự Án (Project Card Sketch Badges)
Mỗi thẻ dự án trong `ScrapbookStream` được bổ sung một hình minh họa ký họa mini độc bản (dựa theo trường `farmType` hoặc `id`):
* `windmill`: Icon Cối xay gió mini ký họa nét mực và bóng gạch.
* `orchard`: Icon Quả táo cắn dở ký họa vệt màu nước đỏ.
* `garden`: Icon Củ cà rốt luống đất nét vẽ tay.
* `well`: Icon Giếng nước đá cổ có tay quay gầu.
* `cart`: Icon Xe bò kéo hoa hướng dương ký họa.
* `campfire`: Icon Đốm lửa trại bập bùng và que củi.
* `barn`: Icon Ngôi nhà gỗ đồng quê mái ngói.
* `beehive`: Icon Tổ ong treo cành cây và chú ong bay.
* `sheep`: Icon Chú cừu lông xù bông tròn.
* `tractor`: Icon Chiếc máy kéo cổ điển bánh răng lớn.
* `greenhouse`: Icon Nhà kính ươm mầm cây non.
* `sunflower`: Icon Bông hoa hướng dương nở rộ.
* `scarecrow`: Icon Bù nhìn rơm đội mũ nan cười vui.
* `watermill`: Icon Bánh xe guồng nước quay tròn.
* `silo`: Icon Tháp chứa ngũ cốc hình trụ chóp nón.
* `duckpond`: Icon Chú vịt bơi lội trên mặt hồ gợn sóng.

---

## 4. Dòng Chảy Dữ Liệu & Cơ Chế Tương Tác Cuộn (Interaction & Parallax)

### 4.1. Sơ đồ Luồng Tương tác Cuộn Parallax
```text
[User Scroll Action]
         │
         ▼
[window.addEventListener('scroll') - rAF Throttled]
         │
         ▼
[clampedY = Math.min(4000, Math.max(0, scrollY))]
         │
         ├──> Sườn Trái: translateY(-clampedY * 0.15px)
         │    (Rặng dừa & 3 chú khỉ lướt nhẹ)
         │
         └──> Sườn Phải: translateY(-clampedY * 0.22px)
              (Sóng biển, Swimmer & Lâu đài cát)
              + Surfer Tilt: rotate(Math.sin(clampedY * 0.005) * 8deg)
```

### 4.2. Khả năng Tiếp cận & Dự phòng (Accessibility & Fallbacks)
* Mọi thành phần trang trí nền (`StickyClouds`, `StickyBeach`, `SideFlanks`) đều mang thuộc tính `aria-hidden="true"` để không làm phiền công nghệ hỗ trợ đọc màn hình.
* Modal sổ tay chi tiết đáp ứng đầy đủ `role="dialog"`, `aria-modal="true"`, gắn phím đóng và bẫy tiêu điểm (*focus management*).
* Trên thiết bị màn hình nhỏ (`< 768px`), `SideFlanks` tự động ẩn để tối ưu diện tích đọc nội dung.

---

## 5. Chiến lược Kiểm thử & Tiêu chuẩn Nghiệm thu (Verification Strategy)

### 5.1. Bộ Kiểm thử Đơn vị Tự động (`npm test`)
* **`SideFlanks.test.js`**:
  * Kiểm tra render đầy đủ các thẻ SVG ký họa mới (`palm-station`, 3 `doodle-monkey`, `doodle-surfer`, `doodle-swimmer`, `beach-decor-group`).
  * Kiểm tra hàm `calculateParallax` đảm bảo tính toán mượt mà, không trả về `NaN`, kẹp cận dưới `>= 0` và cận trên `<= 4000`.
* **`StickyClouds.test.js`**: Kiểm tra render mây viền kép và mặt trời màu nước.
* **`StickyBeach.test.js`**: Kiểm tra render sóng biển và bãi cát stippling.
* **`ScrapbookStream.test.js`**: Kiểm tra render đầy đủ 16 thẻ dự án kèm sketch icon badge tương ứng.
* **`JournalModal.test.js`**: Kiểm tra mở/đóng modal, quản lý trạng thái `aria-hidden`.

### 5.2. Biên dịch Hoàn chỉnh (`npm run build`)
* Xác nhận không còn bất kỳ import tham chiếu nào tới các file 3D đã xóa.
* Vite build thành công không có cảnh báo lỗi cú pháp.
