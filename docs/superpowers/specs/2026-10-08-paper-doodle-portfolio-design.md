# Đặc tả Kỹ thuật Thiết kế: 2D Paper Craft & Doodle Portfolio

> **Ngày tạo:** 2026-10-08  
> **Trạng thái:** Đã phê duyệt thiết kế sơ bộ (Approved Concept)  
> **Cảm hứng nghệ thuật:** Kết hợp giữa [Doodle Shooter](https://doodleshooter.vercel.app/) (nét vẽ tay hoạt họa sketch, hiệu ứng rung nét line-boil) và [Kokuyo: Curiosity is Life](https://www.kokuyo.com/en/special/curiosity-is-life) (chất liệu văn phòng phẩm Nhật Bản, giấy Campus ô ly, giấy Kraft, băng dính washi tape, kẹp giấy).

---

## 1. Mục tiêu & Định hướng Kiến trúc

### 1.1. Mục tiêu chính
- Thay thế hoàn toàn giao diện nền và danh sách dự án 3D Three.js cũ sang phong cách **2D Paper Craft & Doodle Sketch**.
- Tạo cảm giác xúc giác chân thực như một bàn làm việc hoặc một cuốn sổ tay mở sẵn, kết hợp chuyển động hoạt hình vẽ tay mộc mạc và tinh tế.
- Đảm bảo trải nghiệm cuộn mượt mà (60fps) trên mọi thiết bị và độ phân giải, tối ưu hóa tải trang với 100% tài nguyên đồ họa được dựng bằng code (HTML5, CSS3, SVG và Canvas 2D).

### 1.2. Các yêu cầu cốt lõi
1. **Khung nhìn cố định (Sticky Framing):**
   - **Đỉnh màn hình (Sticky Top):** Dải mây 2D giấy cắt dán cố định sát mép trên, lơ lửng bồng bềnh tại chỗ, **không bao giờ bị trôi đi khi scroll**.
   - **Đáy màn hình (Sticky Bottom):** Bờ biển 2D cắt dán (bãi cát + dải sóng xanh dập dềnh) cố định sát mép dưới, **không bị ảnh hưởng bởi scroll**.
2. **Dòng chảy Dự án Trung tâm (Center Scrapbook Stream):**
   - Bố cục 1 cột dạng trang sổ tay (Single Column Journal Stream), tối đa bề rộng 720px, căn giữa màn hình.
   - Mỗi dự án là một tấm thẻ giấy Campus có đường kẻ ô ly, ghim kẹp giấy, băng dính washi tape và các sticker kỹ năng vẽ tay.
   - Nhấp vào thẻ sẽ mở trang sổ tay chi tiết toàn màn hình (Full-screen Journal Spread Modal).
3. **Hoạt ảnh Động 2 Bên Sườn (Side Flanks & Parallax Timeline):**
   - **Sườn trái:** Rặng dừa vẽ tay, 3 chú khỉ doodle giấy leo trèo đu cành, hoa lá nhiệt đới di chuyển theo hành trình cuộn dọc.
   - **Sườn phải:** Đường sóng biển lượn dọc, vận động viên lướt sóng trượt sóng zic-zac theo nhịp cuộn, người tắm trên phao bơi, lâu đài cát, ô che nắng.
   - Hiệu ứng rung nhẹ nét vẽ (*line boil / wiggle animation*) mang lại cảm giác hoạt hình vẽ tay sinh động.

---

## 2. Hệ Thống Thiết Kế & Bảng Màu (Design System & Paper Palette)

### 2.1. Bảng màu Giấy & Mực (Paper Palette)
| Tên màu | Mã Hex | Ứng dụng |
| :--- | :--- | :--- |
| **Campus Paper Ivory** | `#faf7f0` | Màu nền giấy chính toàn màn hình (vân giấy ngà tự nhiên) |
| **Grid Lines Light** | `#e2dac9` | Đường kẻ ô ly vuông mờ nhạt chuẩn giấy Campus Nhật Bản |
| **Kraft Paper Beige** | `#f4ebd9` | Thẻ ghi chú giấy Kraft & các chi tiết cắt dán |
| **Beach Sand Paper** | `#fef08a` / `#fde047` | Bờ cát giấy ấm áp ở dải mép đáy màn hình |
| **Doodle Ink Dark** | `#2d3748` | Mực vẽ tay màu than chì đậm (nét viền doodle, chữ viết) |
| **Ocean Teal Paper** | `#0284c7` | Lớp sóng biển giấy sâu |
| **Shallow Blue Pastel** | `#7dd3fc` | Lớp sóng biển giấy nông & băng dính washi tape xanh |
| **Tropical Green** | `#4ade80` / `#16a34a` | Tán lá dừa giấy & sticker cỏ cây |
| **Coral Orange** | `#fb923c` | Ván lướt sóng, phao bơi & ô che nắng |
| **Washi Tape Yellow** | `rgba(254, 240, 138, 0.85)` | Băng dính giấy dán góc màu vàng nhạt |

### 2.2. Nghệ thuật Kiểu chữ (Typography)
- **Tiêu đề & Chữ viết tay (Handwriting / Doodle):** Font `Patrick Hand`, cursive (mô phỏng chữ viết tay bút bi ngòi kim trong sổ nhật ký).
- **Nội dung & Thông số kỹ thuật (Clean Body):** Font `Outfit`, sans-serif (độ tương phản cao, dễ đọc trên nền giấy).

---

## 3. Kiến Trúc Phân Tầng Giao Diện (Z-Index Layer Architecture)

| Layer | Z-Index | Thành phần | Mô tả hành vi |
| :--- | :--- | :--- | :--- |
| **Layer 0** | 0 | **Fixed Paper Background** | Nền giấy Campus kẻ ô ly toàn màn hình với hiệu ứng hạt giấy nhám nhẹ. |
| **Layer 1** | 10 | **Center Scrapbook Stream** | Dòng cuộn các thẻ dự án cá nhân (max-width: 720px), cuộn mượt mà bằng thanh cuộn tự nhiên. |
| **Layer 2** | 20 | **Side Flanks (Left & Right)** | Hai sườn hoạt họa dọc theo chiều cao trang: sườn dừa & khỉ bên trái, sườn sóng & lướt sóng bên phải. |
| **Layer 3** | 50 | **Sticky Top Clouds** | Dải mây SVG giấy dán cố định ở đỉnh viewport (`fixed top: 0`). Không cuộn. |
| **Layer 4** | 50 | **Sticky Bottom Beach** | Bờ biển 3 tầng giấy dán cố định ở đáy viewport (`fixed bottom: 0`). Không cuộn. |
| **Layer 5** | 60 | **Stationery Header HUD** | Thanh điều hướng & bộ lọc kỹ năng hình chiếc thước kẻ gỗ / băng dính washi cố định ở đỉnh. |
| **Layer 6** | 100 | **Journal Spread Modal** | Trang sổ tay bung mở toàn màn hình khi nhấp vào dự án chi tiết. |

---

## 4. Chi Tiết Các Thành Phần Cốt Lõi

### 4.1. Sticky Top Clouds (Dải Mây Giấy Cố Định)
- **Vị trí & Kích thước:** `position: fixed; top: 0; left: 0; width: 100%; height: 110px; pointer-events: none;`.
- **Cấu trúc đồ họa:**
  - 3 cụm mây giấy cắt dán chồng lớp bằng SVG vector. Nền mây màu trắng kem viền nét mực than chì `2.5px`.
  - Góc trên bên phải tích hợp một mặt trời doodle mỉm cười màu vàng `#fde047` với các tia nắng nét vẽ tay.
- **Hoạt ảnh:**
  - CSS idle keyframe floating: dao động nhẹ nhàng lên xuống `4px` và lắc lư chậm `6s - 10s`.
  - **Hành vi cuộn:** Giữ nguyên 100% tọa độ đỉnh màn hình, hoàn toàn không bị ảnh hưởng bởi thanh cuộn.

### 4.2. Sticky Bottom Beach & Waves (Bờ Biển & Sóng Giấy Cố Định)
- **Vị trí & Kích thước:** `position: fixed; bottom: 0; left: 0; width: 100%; height: 140px; pointer-events: none;`.
- **Cấu trúc đồ họa (3 lớp giấy cắt dán):**
  1. *Lớp đáy cát vàng:* Đường viền lượn sóng màu `#fde047` có đính kèm vỏ sò giấy và sao biển doodle nhỏ.
  2. *Lớp sóng nông:* Dải giấy màu `#7dd3fc` với đường bọt sóng trắng nét đứt doodle.
  3. *Lớp sóng ngọc:* Dải giấy màu `#0284c7` nhấp nhô liên tục.
- **Hoạt ảnh:**
  - Hai lớp sóng di chuyển ngược chiều nhau bằng animation SVG `stroke-dashoffset` và `transform: translateX(...)` chu kỳ `4s - 6s`, tạo hiệu ứng dập dềnh thư thái.
  - **Hành vi cuộn:** Đứng yên tuyệt đối ở đáy màn hình. Các thẻ dự án ở giữa khi cuộn xuống sẽ trượt chìm nhẹ nhàng ra phía sau dải sóng biển.

### 4.3. Dòng Chảy Dự Án Trung Tâm (Center Scrapbook Stream)
- **Vùng chứa:** Thẻ `<main id="scrapbook-stream">` nằm giữa màn hình, đệm trên `120px` (tránh mây), đệm dưới `160px` (tránh bờ biển).
- **Cấu tạo Tấm Thẻ Giấy Dự Án (`.paper-project-card`):**
  - **Kích thước:** Chiều rộng 100%, chiều cao co giãn linh hoạt theo nội dung, đệm trong `28px`.
  - **Trang trí Kokuyo:**
    - Hai miếng băng dính Washi Tape dán chéo ở 2 góc trên (màu pastel bán trong suốt với hoa văn chấm bi hoặc sọc xéo).
    - Tem ghi chú số hiệu dự án (ví dụ: `TEM DỰ ÁN #01`) viền răng cưa.
    - Tiêu đề dự án kiểu chữ đậm nét bút mực nổi bật kèm phân loại nhánh (Web Game, AI Agent, v.v.).
    - Tóm tắt mô tả dự án dễ đọc.
    - Dải tem nhãn kỹ năng (`.skill-sticker`) nhiều màu sắc với viền nét vẽ tay.
    - Nút bấm xem chi tiết: Nút con dấu mộc đỏ `LẬT XEM CHI TIẾT 📖`.
  - **Hiệu ứng Hover:** Nhấc nhẹ thẻ `translateY(-5px) rotate(0.4deg)`, tăng độ bóng đổ giấy.

### 4.4. Trang Sổ Tay Chi Tiết Toàn Màn Hình (Full-Screen Journal Spread Modal)
- **Vị trí:** Phủ toàn màn hình với nền mờ `backdrop-filter: blur(8px); background: rgba(45, 55, 72, 0.4);`.
- **Thiết kế trang sổ tay đôi (Two-page Spread):**
  - Kích thước: `max-width: 980px; width: 90%; min-height: 580px;`.
  - Nền sổ tay có nếp gấp giữa gáy sổ (book spine fold).
  - **Trang trái:** Khung ảnh dự án lớn, đính 4 góc bằng 4 miếng băng dính washi tape thủ công.
  - **Trang phải:**
    - Tiêu đề & mô tả chi tiết bài toán, giải pháp kỹ thuật.
    - Danh sách tính năng cốt lõi liệt kê bằng các icon vẽ tay ngộ nghĩnh.
    - Các nút hành động: `Trải Nghiệm Live Demo 🚀` và `Mã Nguồn GitHub 💻` phong cách con dấu cao su đóng mộc.
  - **Nút đóng sổ:** Chiếc ghim kẹp giấy hoặc tem xé góc có dấu `✕`. Đóng được bằng click ngoài vùng hoặc phím `Escape`.

### 4.5. Hoạt Ảnh Động 2 Bên Sườn (Left & Right Flanks)
- **Sườn trái (Left Flank - Rặng dừa & Chú khỉ doodle):**
  - Dải đồ họa SVG/Canvas neo dọc mép trái trang:
    - Thân cây dừa dài uốn lượn liên tục với tán lá dừa xanh đung đưa nhẹ theo gió.
    - 3 chú khỉ doodle giấy tại 3 mốc cuộn: chú khỉ #1 bám thân dừa vẫy tay, chú khỉ #2 đu ngược cành cây chớp mắt, chú khỉ #3 ngồi ôm trái dừa trên bãi cỏ.
  - Tốc độ cuộn parallax: Đồng bộ với dòng đọc cuộn chuột.
- **Sườn phải (Right Flank - Sóng biển & Vận động viên lướt sóng):**
  - Dải đồ họa SVG/Canvas neo dọc mép phải trang:
    - Dải đường lượn sóng biển xanh pastel uốn cong theo chiều cao trang.
    - Vận động viên lướt sóng doodle (The Surfer) trượt dốc trên ván cam theo tọa độ cuộn, lắc nghiêng tự nhiên theo góc lượn của sóng.
    - 2 người tắm biển trên phao tròn sắc màu đập chân nước bong bóng.
    - Lâu đài cát giấy và chiếc dù bãi biển sọc đỏ-trắng ở gần đáy.
- **Hiệu ứng Doodle Line Boil:**
  - Tích hợp SVG filter `<feTurbulence>` nhẹ nhàng hoặc luân phiên khung nét vẽ tay, tạo độ rung tự nhiên cho nét mực như phim hoạt hình vẽ tay truyền thống.

---

## 5. Kế Hoạch Chuyển Đổi & Tương Thích Mã Nguồn (Refactoring Strategy)

1. **Khử phụ thuộc Three.js 3D cồng kềnh cho nền:**
   - Thay thế `BeachEnvironment.js` và `FarmGridParallaxManager.js` bằng kiến trúc `PaperScrapbookManager.js` và `PaperBeachEnvironment.js`.
   - Giữ nguyên toàn bộ cấu trúc dữ liệu `src/data/portfolioData.js` để tái sử dụng 100% dữ liệu dự án và kỹ năng.
2. **Quản lý trạng thái lọc kỹ năng (HUD):**
   - Tái cấu trúc `FarmHUD.js` thành `PaperStationeryHUD.js`: thiết kế dạng thanh thước kẻ gỗ / dải washi tape, bấm lọc kỹ năng sẽ cuộn mượt hoặc hiển thị sinh động các thẻ dự án tương ứng.
3. **Kiểm thử tự động (Unit Testing):**
   - Xây dựng bài kiểm thử cho các thành phần tạo hình giấy và bộ quản lý cuộn 2D để đảm bảo tính ổn định và ngăn ngừa lỗi hồi quy.

---

## 6. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- [ ] **Sticky Top:** Dải mây và mặt trời cố định hoàn toàn ở mép trên màn hình, không trôi khi cuộn chuột.
- [ ] **Sticky Bottom:** Bờ biển và sóng cát cố định hoàn toàn ở mép dưới màn hình, sóng dập dềnh liên tục, không trôi khi cuộn chuột.
- [ ] **Center Stream:** 16 dự án hiển thị dưới dạng 1 cột thẻ sổ tay giấy Campus/Kraft tinh tế, cuộn mượt mà.
- [ ] **Modal Chi tiết:** Nhấp vào bất kỳ thẻ dự án nào sẽ bung mở trang sổ tay chi tiết toàn màn hình với hiệu ứng nếp gấp giấy, đóng mở mượt mà bằng nút hoặc phím Escape.
- [ ] **Sườn trái & phải:** Khỉ, cây dừa, người lướt sóng và người bơi lội chuyển động mượt mà theo nhịp cuộn 2 bên sườn.
- [ ] **Không lỗi console:** Không phát sinh bất kỳ lỗi JavaScript nào trong quá trình thao tác.
- [ ] **Build:** Lệnh `npm run build` đóng gói Vite thành công không có lỗi cú pháp.
