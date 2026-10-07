# 3D Procedural Beach Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thay thế toàn bộ hình nền ảnh 2D tĩnh hiện tại bằng một bức tranh bãi biển nhiệt đới 3D sinh động dựng 100% bằng code (Three.js primitives & procedural materials), gồm rặng dừa và khỉ bên trái, bãi cát, người tắm và sóng biển động bên phải, bầu trời xanh với 40+ cụm mây 3D bồng bềnh và hệ thống đa tầng Parallax phản hồi theo thao tác lăn chuột.

**Architecture:** Tách biệt thành hai module chính: `BeachAssetBuilder.js` phụ trách tạo hình các mô hình 3D đa giác vát phẳng (Low-poly flat-shaded) và `BeachEnvironment.js` phụ trách quản lý 3 nhóm chiều sâu Parallax (Tiền cảnh factor 0.55, Trung cảnh factor 0.35, Hậu cảnh factor 0.12), động cơ tính toán sóng biển thời gian thực và vòng lặp cử động nhân vật/mây trời. Tích hợp trực tiếp vào `SceneManager` và nhận `currentScrollY` từ `FarmGridParallaxManager`.

**Tech Stack:** Three.js (r170), GSAP (3.12.5), Vite (5.4.0), Node.js `node:assert` test runner.

**Spec:** [docs/superpowers/specs/2026-10-07-beach-3d-background-design.md](docs/superpowers/specs/2026-10-07-beach-3d-background-design.md)

## Global Constraints

* **100% Code-drawn:** Tuyệt đối không nạp bất kỳ file ảnh texture 2D bên ngoài nào (`.png`, `.jpg`, `.webp`) cho nền; toàn bộ hình học và màu sắc phải được tạo bằng Three.js Geometries và Materials với `flatShading: true`.
* **Zero Network Latency:** Cảnh nền phải hiển thị ngay khi ứng dụng khởi chạy mà không chờ tải tài nguyên qua mạng.
* **Stable 60fps Target:** Tái sử dụng Geometries và Materials, không gọi `new THREE.Vector3()` hoặc cấp phát mảng mới trong vòng lặp `update()`.
* **No Regression:** Không làm thay đổi cấu trúc bảng dự án 2x2 trong `FarmGridParallaxManager.js` hoặc dữ liệu trong `portfolioData.js`.

## Review Focus

1. **Extreme/Negative Scroll Values:** Khi người dùng cuộn chuột ngược lên trên (`scrollY < 0`) hoặc cuộn quá xa (`scrollY > 3000`), các nhóm Parallax không được trôi vào sau mặt phẳng cắt của Camera (`near: 0.1`, camera tại `Z: 11.5`) gây mất hình.
2. **Wave Calculation Stability (No NaN/Infinity):** Hàm tính toán độ cao sóng biển `pos.setZ(i, wave)` phải luôn trả về số thực hợp lệ kể cả khi `time = 0` hoặc `delta` biến thiên lớn.
3. **Zero Memory Leak on Vertex Updates:** Cập nhật vị trí đỉnh sóng trực tiếp trên `BufferAttribute` hiện có và đặt `needsUpdate = true`, không tạo mới BufferAttribute hay Float32Array mỗi frame.
4. **Smooth Cloud Wrap-around:** Khi mây trôi vượt mốc biên phải (`X > 75`), mây tái sinh ở biên trái (`X = -75`) một cách mượt mà ngoài tầm nhìn camera, không gây giật khung hình.
5. **Clean Disposal of Old Background:** Xóa bỏ hoàn toàn lời gọi nạp texture `/beach_paradise.jpg` và các mesh cũ khỏi bộ nhớ GPU để giải phóng VRAM.

---

### Task 1: Xây dựng Bộ Sinh Mô Hình Cây Dừa và Khỉ 3D Procedural (`BeachAssetBuilder.js` - Flora & Fauna)

**Files:**
- Create: `src/entities/BeachAssetBuilder.js`
- Test: `src/entities/BeachAssetBuilder.test.js`

**Interfaces:**
- Consumes: `three`
- Produces: 
  - `BeachAssetBuilder.createPalmTree(options)`: returns `THREE.Group` với thân cong vát 6 cạnh, 7 nhánh lá dừa và chùm dừa.
  - `BeachAssetBuilder.createMonkey(options)`: returns `THREE.Group` với thân, đầu, tai, tứ chi ôm thân và đuôi chữ S, kèm phương thức `userData.update(time)`.

- [ ] **Step 1: Viết test kiểm tra cây dừa và khỉ**

Tạo file `src/entities/BeachAssetBuilder.test.js`:
```javascript
import assert from 'node:assert';
import * as THREE from 'three';
import { BeachAssetBuilder } from './BeachAssetBuilder.js';

console.log('Testing BeachAssetBuilder: Palm Tree and Monkey...');

// Test 1: createPalmTree returns valid THREE.Group with meshes
const palm = BeachAssetBuilder.createPalmTree({ height: 5.5, leafCount: 7 });
assert(palm instanceof THREE.Group, 'Palm tree must be a THREE.Group');
assert(palm.children.length >= 3, 'Palm tree must have trunk, leaves, and coconuts groups/meshes');

// Check that materials use flatShading
let hasFlatShading = false;
palm.traverse((child) => {
  if (child.isMesh && child.material) {
    if (child.material.flatShading) hasFlatShading = true;
    assert(!Number.isNaN(child.position.x), 'Child position X must not be NaN');
    assert(!Number.isNaN(child.position.y), 'Child position Y must not be NaN');
    assert(!Number.isNaN(child.position.z), 'Child position Z must not be NaN');
  }
});
assert(hasFlatShading, 'Palm tree must utilize flatShading materials');

// Test 2: createMonkey returns valid THREE.Group with update animation hook
const monkey = BeachAssetBuilder.createMonkey();
assert(monkey instanceof THREE.Group, 'Monkey must be a THREE.Group');
assert(typeof monkey.userData.update === 'function', 'Monkey must have userData.update animation function');

// Run monkey animation update to ensure no NaN
monkey.userData.update(1.5);
assert(!Number.isNaN(monkey.rotation.y), 'Monkey rotation must remain valid after update');

console.log('✓ Palm tree and Monkey tests passed successfully!');
```

- [ ] **Step 2: Chạy test để xác nhận thất bại (do chưa có file code)**

Run: `node src/entities/BeachAssetBuilder.test.js`
Expected: FAIL với lỗi `Cannot find module './BeachAssetBuilder.js'`

- [ ] **Step 3: Viết mã nguồn cho `BeachAssetBuilder.js` (Phần Cây Dừa và Khỉ)**

Tạo file `src/entities/BeachAssetBuilder.js`:
```javascript
import * as THREE from 'three';

// Shared Materials Palette for performance optimization
const palmTrunkMaterial = new THREE.MeshLambertMaterial({
  color: 0x854d0e,
  flatShading: true
});

const palmLeavesMaterial1 = new THREE.MeshLambertMaterial({
  color: 0x15803d,
  flatShading: true
});

const palmLeavesMaterial2 = new THREE.MeshLambertMaterial({
  color: 0x22c55e,
  flatShading: true
});

const coconutMaterial = new THREE.MeshLambertMaterial({
  color: 0xa16207,
  flatShading: true
});

const monkeyBodyMaterial = new THREE.MeshLambertMaterial({
  color: 0x78350f,
  flatShading: true
});

const monkeyChestMaterial = new THREE.MeshLambertMaterial({
  color: 0xfef08a,
  flatShading: true
});

const monkeySnoutMaterial = new THREE.MeshLambertMaterial({
  color: 0xfde68a,
  flatShading: true
});

export class BeachAssetBuilder {
  /**
   * Tạo mô hình Cây Dừa Nhiệt Đới với thân uốn lượn tự nhiên và tán lá đa giác
   */
  static createPalmTree(options = {}) {
    const group = new THREE.Group();
    const height = options.height || 5.0;
    const curvature = options.curvature !== undefined ? options.curvature : 0.08;
    const segments = options.segments || 6;

    // 1. Thân dừa từng đốt cong dần hướng ra biển
    const trunkGroup = new THREE.Group();
    const segHeight = height / segments;
    let currentY = 0;
    let currentX = 0;
    let currentAngle = 0;

    for (let i = 0; i < segments; i++) {
      const radiusBottom = 0.45 * (1.0 - (i / segments) * 0.4);
      const radiusTop = 0.45 * (1.0 - ((i + 1) / segments) * 0.4);
      const segGeo = new THREE.CylinderGeometry(radiusTop, radiusBottom, segHeight, 6);
      const segMesh = new THREE.Mesh(segGeo, palmTrunkMaterial);

      segMesh.position.set(currentX, currentY + segHeight / 2, 0);
      segMesh.rotation.z = currentAngle;
      trunkGroup.add(segMesh);

      currentX += Math.sin(currentAngle) * segHeight;
      currentY += Math.cos(currentAngle) * segHeight;
      currentAngle += curvature;
    }
    group.add(trunkGroup);

    // 2. Tán lá dừa xòe cong rủ xuống
    const crownGroup = new THREE.Group();
    crownGroup.position.set(currentX, currentY, 0);

    const leafCount = options.leafCount || 7;
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const leafGroup = new THREE.Group();
      leafGroup.rotation.y = angle;

      // Nhánh lá gồm 3 đốt tam giác dẹt uốn cong dần xuống
      for (let j = 0; j < 3; j++) {
        const mat = (i + j) % 2 === 0 ? palmLeavesMaterial1 : palmLeavesMaterial2;
        const leafGeo = new THREE.ConeGeometry(0.32 - j * 0.07, 1.4, 4);
        const leafPart = new THREE.Mesh(leafGeo, mat);
        leafPart.rotation.x = Math.PI / 2.2 + j * 0.22;
        leafPart.position.set(0, -j * 0.18, 0.7 + j * 0.9);
        leafGroup.add(leafPart);
      }
      crownGroup.add(leafGroup);
    }

    // 3. Chùm quả dừa
    for (let i = 0; i < 4; i++) {
      const cGeo = new THREE.DodecahedronGeometry(0.24, 0);
      const coconut = new THREE.Mesh(cGeo, coconutMaterial);
      const cAngle = (i / 4) * Math.PI * 2;
      coconut.position.set(Math.cos(cAngle) * 0.35, -0.25, Math.sin(cAngle) * 0.35);
      crownGroup.add(coconut);
    }

    group.add(crownGroup);
    group.userData.crown = crownGroup;
    group.userData.initialX = currentX;

    // Animation hook: lá dừa đung đưa theo gió
    group.userData.update = (time, offset = 0) => {
      crownGroup.rotation.z = Math.sin(time * 1.4 + offset) * 0.06;
    };

    return group;
  }

  /**
   * Tạo chú khỉ 3D tinh nghịch
   */
  static createMonkey(options = {}) {
    const group = new THREE.Group();

    // 1. Thân khỉ
    const bodyGeo = new THREE.DodecahedronGeometry(0.48, 0);
    bodyGeo.scale(0.85, 1.25, 0.85);
    const bodyMesh = new THREE.Mesh(bodyGeo, monkeyBodyMaterial);
    group.add(bodyMesh);

    // Yếm ngực
    const chestGeo = new THREE.DodecahedronGeometry(0.32, 0);
    chestGeo.scale(0.8, 1.0, 0.4);
    const chestMesh = new THREE.Mesh(chestGeo, monkeyChestMaterial);
    chestMesh.position.set(0, -0.05, 0.3);
    group.add(chestMesh);

    // 2. Đầu & Mõm
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.75, 0.05);

    const headGeo = new THREE.DodecahedronGeometry(0.38, 0);
    const headMesh = new THREE.Mesh(headGeo, monkeyBodyMaterial);
    headGroup.add(headMesh);

    const snoutGeo = new THREE.DodecahedronGeometry(0.22, 0);
    snoutGeo.scale(1.0, 0.7, 0.9);
    const snoutMesh = new THREE.Mesh(snoutGeo, monkeySnoutMaterial);
    snoutMesh.position.set(0, -0.08, 0.28);
    headGroup.add(snoutMesh);

    // Tai khỉ hai bên
    for (const sign of [-1, 1]) {
      const earGeo = new THREE.DodecahedronGeometry(0.14, 0);
      earGeo.scale(0.4, 1.0, 1.0);
      const earMesh = new THREE.Mesh(earGeo, monkeySnoutMaterial);
      earMesh.position.set(sign * 0.38, 0.08, 0);
      headGroup.add(earMesh);
    }
    group.add(headGroup);

    // 3. Tứ chi bám thân cây
    for (const sign of [-1, 1]) {
      // Tay
      const armGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.75, 5);
      const armMesh = new THREE.Mesh(armGeo, monkeyBodyMaterial);
      armMesh.position.set(sign * 0.45, 0.2, 0.25);
      armMesh.rotation.z = -sign * 0.6;
      armMesh.rotation.x = 0.5;
      group.add(armMesh);

      // Chân
      const legGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.65, 5);
      const legMesh = new THREE.Mesh(legGeo, monkeyBodyMaterial);
      legMesh.position.set(sign * 0.38, -0.45, 0.2);
      legMesh.rotation.z = -sign * 0.4;
      legMesh.rotation.x = 0.4;
      group.add(legMesh);
    }

    // 4. Chiếc đuôi uốn cong
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, -0.45, -0.35);
    const tailSegCount = 5;
    let tY = 0;
    let tZ = 0;
    for (let i = 0; i < tailSegCount; i++) {
      const tGeo = new THREE.CylinderGeometry(0.06 - i * 0.008, 0.06 - i * 0.008, 0.28, 4);
      const tMesh = new THREE.Mesh(tGeo, monkeyBodyMaterial);
      tMesh.position.set(0, tY, tZ);
      tMesh.rotation.x = -0.5 - i * 0.25;
      tailGroup.add(tMesh);
      tY += 0.16;
      tZ -= 0.14;
    }
    group.add(tailGroup);

    // Hook cử động linh hoạt
    group.userData.update = (time, offset = 0) => {
      tailGroup.rotation.z = Math.sin(time * 2.5 + offset) * 0.25;
      headGroup.rotation.y = Math.sin(time * 1.2 + offset) * 0.2;
      headGroup.rotation.z = Math.sin(time * 1.8 + offset) * 0.1;
    };

    return group;
  }
}
```

- [ ] **Step 4: Chạy test để xác nhận thành công**

Run: `node src/entities/BeachAssetBuilder.test.js`
Expected: `✓ Palm tree and Monkey tests passed successfully!`

- [ ] **Step 5: Commit task 1**

Run:
```bash
git add src/entities/BeachAssetBuilder.js src/entities/BeachAssetBuilder.test.js
git commit -m "feat(beach): add 3D procedural palm tree and monkey builders"
```

---

### Task 2: Xây dựng Bộ Sinh Mô Hình Nhân Vật Bãi Biển & Đạo Cụ (`BeachAssetBuilder.js` - Characters & Decor)

**Files:**
- Modify: `src/entities/BeachAssetBuilder.js`
- Modify: `src/entities/BeachAssetBuilder.test.js`

**Interfaces:**
- Consumes: `three`
- Produces:
  - `BeachAssetBuilder.createSurfer(options)`: returns `THREE.Group` với ván lướt sặc sỡ, vận động viên hạ trọng tâm và bọt sóng.
  - `BeachAssetBuilder.createSwimmer(options)`: returns `THREE.Group` với phao bơi Torus, người bơi nhô lên, cử động dập dềnh.
  - `BeachAssetBuilder.createKidsOnBeach(options)`: returns `THREE.Group` gồm em bé chibi, xẻng cát, lâu đài cát, ô che nắng và quả bóng bãi biển.

- [ ] **Step 1: Viết test mở rộng cho surfer, swimmer và beach decor**

Chỉnh sửa `src/entities/BeachAssetBuilder.test.js` thêm các test cases:
```javascript
// Append to src/entities/BeachAssetBuilder.test.js:

// Test 3: createSurfer
const surfer = BeachAssetBuilder.createSurfer({ boardColor: 0xf97316 });
assert(surfer instanceof THREE.Group, 'Surfer must be a THREE.Group');
assert(typeof surfer.userData.update === 'function', 'Surfer must have update function');
surfer.userData.update(2.0, 1.2);
assert(!Number.isNaN(surfer.rotation.x), 'Surfer pitch must not be NaN');
assert(!Number.isNaN(surfer.rotation.z), 'Surfer roll must not be NaN');

// Test 4: createSwimmer
const swimmer = BeachAssetBuilder.createSwimmer({ ringColor: 0xef4444 });
assert(swimmer instanceof THREE.Group, 'Swimmer must be a THREE.Group');
assert(typeof swimmer.userData.update === 'function', 'Swimmer must have update function');
swimmer.userData.update(1.0);
assert(!Number.isNaN(swimmer.position.y), 'Swimmer Y position must not be NaN');

// Test 5: createKidsOnBeach (Kids, Sandcastle, Umbrella, Beachball)
const decor = BeachAssetBuilder.createKidsOnBeach();
assert(decor instanceof THREE.Group, 'Beach decor must be a THREE.Group');
assert(decor.children.length >= 4, 'Beach decor must have kid, castle, umbrella, and ball');

console.log('✓ All BeachAssetBuilder character and decor tests passed!');
```

- [ ] **Step 2: Chạy test để xác nhận thất bại**

Run: `node src/entities/BeachAssetBuilder.test.js`
Expected: FAIL với lỗi `BeachAssetBuilder.createSurfer is not a function`

- [ ] **Step 3: Bổ sung các phương thức vào `BeachAssetBuilder.js`**

Cập nhật `src/entities/BeachAssetBuilder.js` thêm các materials và các phương thức:
```javascript
// Thêm các materials chia sẻ:
const skinMaterial = new THREE.MeshLambertMaterial({ color: 0xfbcfe8, flatShading: true });
const swimSuitMaterial = new THREE.MeshLambertMaterial({ color: 0x0284c7, flatShading: true });
const foamMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sandCastleMaterial = new THREE.MeshLambertMaterial({ color: 0xfde047, flatShading: true });
const redColorMat = new THREE.MeshLambertMaterial({ color: 0xef4444, flatShading: true });
const whiteColorMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc, flatShading: true });
const yellowColorMat = new THREE.MeshLambertMaterial({ color: 0xeab308, flatShading: true });
const woodStickMat = new THREE.MeshLambertMaterial({ color: 0x78350f, flatShading: true });

// Bổ sung vào class BeachAssetBuilder:

  /**
   * Tạo vận động viên lướt sóng trên ngọn sóng dập dềnh
   */
  static createSurfer(options = {}) {
    const group = new THREE.Group();
    const boardColor = options.boardColor || 0xf97316;

    // 1. Ván lướt sóng vuốt nhọn hai đầu
    const boardMat = new THREE.MeshLambertMaterial({ color: boardColor, flatShading: true });
    const boardGeo = new THREE.BoxGeometry(0.55, 0.08, 2.5);
    const boardMesh = new THREE.Mesh(boardGeo, boardMat);
    group.add(boardMesh);

    // Sọc trang trí trên ván
    const stripeGeo = new THREE.BoxGeometry(0.18, 0.09, 2.3);
    const stripeMat = new THREE.MeshLambertMaterial({ color: 0x06b6d4, flatShading: true });
    const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
    group.add(stripeMesh);

    // 2. Nhân vật lướt sóng (tư thế hạ thấp trọng tâm)
    const surferGroup = new THREE.Group();
    surferGroup.position.set(0, 0.05, 0.1);

    // Chân gập
    for (const sign of [-1, 1]) {
      const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 4);
      const legMesh = new THREE.Mesh(legGeo, skinMaterial);
      legMesh.position.set(sign * 0.16, 0.22, sign * 0.2);
      legMesh.rotation.z = -sign * 0.2;
      surferGroup.add(legMesh);
    }

    // Quần bơi & Thân
    const bodyGeo = new THREE.DodecahedronGeometry(0.32, 0);
    bodyGeo.scale(0.8, 1.2, 0.7);
    const bodyMesh = new THREE.Mesh(bodyGeo, swimSuitMaterial);
    bodyMesh.position.set(0, 0.62, 0);
    surferGroup.add(bodyMesh);

    // Đầu
    const headGeo = new THREE.DodecahedronGeometry(0.22, 0);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.position.set(0, 1.05, 0);
    surferGroup.add(headMesh);

    // Hai tay dang rộng giữ thăng bằng
    for (const sign of [-1, 1]) {
      const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.65, 4);
      const armMesh = new THREE.Mesh(armGeo, skinMaterial);
      armMesh.position.set(sign * 0.42, 0.75, 0);
      armMesh.rotation.z = -sign * 0.8;
      armMesh.rotation.x = sign * 0.2;
      surferGroup.add(armMesh);
    }
    group.add(surferGroup);

    // 3. Bọt sóng đuôi ván
    const wakeGroup = new THREE.Group();
    wakeGroup.position.set(0, -0.02, -1.35);
    for (let i = 0; i < 3; i++) {
      const foamGeo = new THREE.DodecahedronGeometry(0.14 - i * 0.02, 0);
      const foam = new THREE.Mesh(foamGeo, foamMaterial);
      foam.position.set((i - 1) * 0.18, 0, -i * 0.2);
      wakeGroup.add(foam);
    }
    group.add(wakeGroup);

    // Cử động nghiêng lượn theo nhịp sóng
    group.userData.update = (time, waveHeight = 0) => {
      group.position.y = waveHeight;
      group.rotation.z = Math.sin(time * 2.2) * 0.18; // Roll
      group.rotation.x = Math.cos(time * 1.8) * 0.12; // Pitch
    };

    return group;
  }

  /**
   * Tạo người tắm biển bồng bềnh trên phao bơi
   */
  static createSwimmer(options = {}) {
    const group = new THREE.Group();
    const ringColor = options.ringColor || 0xef4444;

    // 1. Phao bơi tròn Torus
    const ringMat = new THREE.MeshLambertMaterial({ color: ringColor, flatShading: true });
    const ringGeo = new THREE.TorusGeometry(0.65, 0.22, 6, 12);
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    group.add(ringMesh);

    // Các dải sọc trắng tương phản trên phao
    for (let i = 0; i < 4; i++) {
      const stripeGeo = new THREE.TorusGeometry(0.66, 0.23, 6, 3, Math.PI / 6);
      const stripeMesh = new THREE.Mesh(stripeGeo, whiteColorMat);
      stripeMesh.rotation.x = Math.PI / 2;
      stripeMesh.rotation.z = (i / 4) * Math.PI * 2;
      group.add(stripeMesh);
    }

    // 2. Nửa thân trên & Đầu người bơi
    const torsoGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.45, 5);
    const torsoMesh = new THREE.Mesh(torsoGeo, skinMaterial);
    torsoMesh.position.set(0, 0.15, 0);
    group.add(torsoMesh);

    const headGeo = new THREE.DodecahedronGeometry(0.24, 0);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.position.set(0, 0.52, 0);
    group.add(headMesh);

    // Hai tay tựa lên mép phao
    for (const sign of [-1, 1]) {
      const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 4);
      const armMesh = new THREE.Mesh(armGeo, skinMaterial);
      armMesh.position.set(sign * 0.42, 0.22, 0.2);
      armMesh.rotation.z = -sign * 0.7;
      armMesh.rotation.x = 0.4;
      group.add(armMesh);
    }

    const baseY = group.position.y;
    const phaseOffset = options.phaseOffset || Math.random() * Math.PI * 2;

    group.userData.update = (time) => {
      group.position.y = baseY + Math.sin(time * 2.0 + phaseOffset) * 0.16;
      group.rotation.z = Math.sin(time * 1.5 + phaseOffset) * 0.08;
    };

    return group;
  }

  /**
   * Tạo cụm trang trí bãi biển: Em bé nghịch cát, lâu đài cát, ô che nắng và quả bóng
   */
  static createKidsOnBeach() {
    const group = new THREE.Group();

    // 1. Em bé chibi ngồi nghịch cát
    const kidGroup = new THREE.Group();
    kidGroup.position.set(-0.8, 0, 0);

    const kidBodyGeo = new THREE.DodecahedronGeometry(0.22, 0);
    const kidBody = new THREE.Mesh(kidBodyGeo, redColorMat);
    kidBody.position.set(0, 0.2, 0);
    kidGroup.add(kidBody);

    const kidHeadGeo = new THREE.DodecahedronGeometry(0.18, 0);
    const kidHead = new THREE.Mesh(kidHeadGeo, skinMaterial);
    kidHead.position.set(0, 0.45, 0);
    kidGroup.add(kidHead);

    // Chiếc xẻng xúc cát nhỏ
    const shovelGeo = new THREE.BoxGeometry(0.08, 0.22, 0.02);
    const shovel = new THREE.Mesh(shovelGeo, yellowColorMat);
    shovel.position.set(0.22, 0.1, 0.12);
    shovel.rotation.z = -0.4;
    kidGroup.add(shovel);

    group.add(kidGroup);

    // 2. Lâu đài cát
    const castleGroup = new THREE.Group();
    castleGroup.position.set(0.1, 0, 0.3);

    for (const [x, z, h] of [[-0.2, 0, 0.45], [0.2, 0, 0.45], [0, 0.15, 0.65]]) {
      const towerGeo = new THREE.CylinderGeometry(0.12, 0.15, h, 6);
      const tower = new THREE.Mesh(towerGeo, sandCastleMaterial);
      tower.position.set(x, h / 2, z);
      castleGroup.add(tower);

      const roofGeo = new THREE.ConeGeometry(0.15, 0.2, 6);
      const roof = new THREE.Mesh(roofGeo, sandCastleMaterial);
      roof.position.set(x, h + 0.1, z);
      castleGroup.add(roof);
    }
    group.add(castleGroup);

    // 3. Ô che nắng nhiệt đới
    const umbrellaGroup = new THREE.Group();
    umbrellaGroup.position.set(1.4, 0, -0.6);

    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.6, 6);
    const pole = new THREE.Mesh(poleGeo, woodStickMat);
    pole.position.set(0, 1.3, 0);
    pole.rotation.z = 0.12;
    umbrellaGroup.add(pole);

    const canopyGeo = new THREE.ConeGeometry(1.6, 0.7, 8);
    const canopy = new THREE.Mesh(canopyGeo, redColorMat);
    canopy.position.set(0.15, 2.45, 0);
    canopy.rotation.z = 0.12;
    umbrellaGroup.add(canopy);

    group.add(umbrellaGroup);

    // 4. Quả bóng bãi biển sặc sỡ
    const ballGeo = new THREE.DodecahedronGeometry(0.26, 1);
    const ball = new THREE.Mesh(ballGeo, yellowColorMat);
    ball.position.set(0.8, 0.25, 0.6);
    group.add(ball);

    return group;
  }
```

- [ ] **Step 4: Chạy lại toàn bộ test để kiểm tra tính đúng đắn**

Run: `node src/entities/BeachAssetBuilder.test.js`
Expected: `✓ All BeachAssetBuilder character and decor tests passed!`

- [ ] **Step 5: Commit task 2**

Run:
```bash
git add src/entities/BeachAssetBuilder.js src/entities/BeachAssetBuilder.test.js
git commit -m "feat(beach): add surfer, swimmer, and beach decor builders"
```

---

### Task 3: Xây dựng Hệ thống Mây 3D Đa Tầng & Bầu Trời Nắng (`BeachEnvironment.js` - Sky, Sun & Clouds)

**Files:**
- Create: `src/core/BeachEnvironment.js`
- Test: `src/core/BeachEnvironment.test.js`

**Interfaces:**
- Consumes: `three`, `BeachAssetBuilder`
- Produces: `BeachEnvironment` class với:
  - `setupSkyAndFog()`
  - `setupSun()`
  - `setupAbundantClouds()` (42 cụm mây)
  - `updateClouds(delta, scrollY)` với wrap-around x từ +75 về -75 và vertical parallax.

- [ ] **Step 1: Viết test cho Sky, Sun và Clouds**

Tạo file `src/core/BeachEnvironment.test.js`:
```javascript
import assert from 'node:assert';
import * as THREE from 'three';
import { BeachEnvironment } from './BeachEnvironment.js';

console.log('Testing BeachEnvironment: Sky, Sun and Clouds...');

const mockScene = new THREE.Scene();
const env = new BeachEnvironment(mockScene);

// Test 1: Sky color and Fog
assert(mockScene.background instanceof THREE.Color, 'Scene background must be a THREE.Color');
assert(mockScene.fog instanceof THREE.FogExp2, 'Scene fog must be FogExp2');

// Test 2: Clouds count must be >= 40
assert(Array.isArray(env.clouds), 'env.clouds must be an array');
assert(env.clouds.length >= 40, `Must have at least 40 cloud clusters, got ${env.clouds.length}`);

// Test 3: Sun mesh exists in background group
assert(env.sunMesh instanceof THREE.Mesh, 'env.sunMesh must exist');

// Test 4: updateClouds advances positions and wraps around smoothly
const firstCloud = env.clouds[0];
firstCloud.mesh.position.x = 76; // Force out of bounds
env.update(0.016, 1.0, 50.0);
assert(firstCloud.mesh.position.x <= -70, 'Cloud must wrap around to left edge when exceeding +75');
assert(!Number.isNaN(firstCloud.mesh.position.y), 'Cloud Y position must not be NaN');

console.log('✓ Sky, Sun, and Cloud tests passed!');
```

- [ ] **Step 2: Chạy test để xác nhận thất bại**

Run: `node src/core/BeachEnvironment.test.js`
Expected: FAIL với lỗi `Cannot find module './BeachEnvironment.js'`

- [ ] **Step 3: Viết mã nguồn cho `BeachEnvironment.js` (Sky, Sun & Clouds)**

Tạo file `src/core/BeachEnvironment.js`:
```javascript
import * as THREE from 'three';
import { BeachAssetBuilder } from '../entities/BeachAssetBuilder.js';

export class BeachEnvironment {
  constructor(scene) {
    this.scene = scene;

    // 3 nhóm phân tầng chiều sâu Parallax
    this.foregroundGroup = new THREE.Group();
    this.midgroundGroup = new THREE.Group();
    this.backgroundGroup = new THREE.Group();

    this.scene.add(this.backgroundGroup);
    this.scene.add(this.midgroundGroup);
    this.scene.add(this.foregroundGroup);

    this.clouds = [];
    this.particles = null;

    // Tọa độ gốc cho 3 tầng Parallax
    this.baseFG_Y = -1.5;
    this.baseMG_Y = -1.8;
    this.baseBG_Y = 0.0;

    this.setupSkyAndFog();
    this.setupSun();
    this.setupAbundantClouds();
    this.setupSunlightMist();
  }

  setupSkyAndFog() {
    // Trời xanh thẳm nhiệt đới rực rỡ nắng vàng (Brilliant Deep Azure Sky)
    this.scene.background = new THREE.Color(0x0284c7);
    this.scene.fog = new THREE.FogExp2(0x38bdf8, 0.007);
  }

  setupSun() {
    // Mặt trời nhiệt đới vàng cam rực rỡ ở góc viễn cảnh
    const sunGeo = new THREE.SphereGeometry(4.2, 12, 12);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.sunMesh.position.set(18, 22, -36);
    this.backgroundGroup.add(this.sunMesh);
  }

  setupAbundantClouds() {
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.45,
      flatShading: true
    });

    const sharedPuffGeo1 = new THREE.DodecahedronGeometry(1.6, 0);
    const sharedPuffGeo2 = new THREE.DodecahedronGeometry(2.3, 0);

    // 42 cụm mây đa tầng độ sâu
    for (let i = 0; i < 42; i++) {
      const cloudGroup = new THREE.Group();
      const numPuffs = 5 + Math.floor(Math.random() * 4);

      for (let j = 0; j < numPuffs; j++) {
        const geo = j % 2 === 0 ? sharedPuffGeo1 : sharedPuffGeo2;
        const puff = new THREE.Mesh(geo, cloudMat);
        puff.position.set(
          (j - numPuffs / 2) * 1.5 + (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8
        );
        cloudGroup.add(puff);
      }

      const baseX = (Math.random() - 0.5) * 140;
      const baseY = 7 + Math.random() * 24;
      const baseZ = -14 - Math.random() * 22; // Độ sâu từ -14 đến -36

      cloudGroup.position.set(baseX, baseY, baseZ);
      this.backgroundGroup.add(cloudGroup);

      this.clouds.push({
        mesh: cloudGroup,
        baseX: baseX,
        baseY: baseY,
        speed: 1.1 + Math.random() * 1.8,
        parallaxFactor: 0.12 + Math.random() * 0.18
      });
    }
  }

  setupSunlightMist() {
    const count = 320;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 80;
      pos[i + 1] = (Math.random() - 0.5) * 40;
      pos[i + 2] = -10 + Math.random() * 24;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.22,
      transparent: true,
      opacity: 0.85
    });

    this.particles = new THREE.Points(geo, mat);
    this.backgroundGroup.add(this.particles);
  }

  update(delta, time, scrollY = 0) {
    // 1. Mây trôi êm ả ngang trời & Parallax cuộn chuột
    for (const cloud of this.clouds) {
      cloud.mesh.position.x += cloud.speed * delta;
      if (cloud.mesh.position.x > 75) {
        cloud.mesh.position.x = -75;
      }
      cloud.mesh.position.y = cloud.baseY + (scrollY * cloud.parallaxFactor);
    }

    // 2. Hạt bụi nắng lơ lửng
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= delta * 0.45;
        if (positions[i] < -16) positions[i] = 19;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.rotation.y = time * 0.02;
    }
  }
}
```

- [ ] **Step 4: Chạy test để xác nhận thành công**

Run: `node src/core/BeachEnvironment.test.js`
Expected: `✓ Sky, Sun, and Cloud tests passed!`

- [ ] **Step 5: Commit task 3**

Run:
```bash
git add src/core/BeachEnvironment.js src/core/BeachEnvironment.test.js
git commit -m "feat(beach): implement sky, sun, and 40+ procedural 3D clouds"
```

---

### Task 4: Xây dựng Địa Hình Bờ Biển & Động Cơ Sóng Biển Động (`BeachEnvironment.js` - Terrain & Waves)

**Files:**
- Modify: `src/core/BeachEnvironment.js`
- Modify: `src/core/BeachEnvironment.test.js`

**Interfaces:**
- Consumes: `three`
- Produces:
  - `setupTerrains()`: Sườn đồi cỏ xanh bên trái và bãi cát vàng thoai thoải bên phải.
  - `setupOceanWaveMesh()`: Lưới sóng biển `PlaneGeometry(46, 36, 64, 48)` màu ngọc bích.
  - `updateWaves(time)`: Hàm tính toán độ dập dềnh của sóng biển theo thời gian thực, không cấp phát bộ nhớ mới.

- [ ] **Step 1: Viết test cho Địa hình và Động cơ Sóng biển**

Bổ sung test cases vào `src/core/BeachEnvironment.test.js`:
```javascript
// Append to src/core/BeachEnvironment.test.js:

console.log('Testing BeachEnvironment: Terrains and Ocean Wave Engine...');

// Test 5: Hill and Sand terrains exist
assert(env.hillMesh instanceof THREE.Mesh, 'Hill mesh must exist on the left');
assert(env.sandMesh instanceof THREE.Mesh, 'Sand mesh must exist on the right');
assert(env.hillMesh.position.x < 0, 'Hill mesh must be on the left side (x < 0)');
assert(env.sandMesh.position.x > -5, 'Sand mesh must transition to the right side');

// Test 6: Ocean Wave Mesh
assert(env.waterMesh instanceof THREE.Mesh, 'Water mesh must exist');
const wavePositions = env.waterMesh.geometry.attributes.position;
assert(wavePositions.count >= 2000, `Water mesh must have detailed grid, got ${wavePositions.count}`);

// Test 7: updateWaves modifies vertex Z without producing NaN
const zBefore = wavePositions.getZ(100);
env.updateWaves(2.5);
const zAfter = wavePositions.getZ(100);
assert(!Number.isNaN(zAfter), 'Wave vertex Z must not be NaN');
assert(zBefore !== zAfter || zAfter !== 0, 'Wave vertex Z should be calculated dynamically');

console.log('✓ Terrain and Ocean Wave tests passed!');
```

- [ ] **Step 2: Chạy test để xác nhận thất bại**

Run: `node src/core/BeachEnvironment.test.js`
Expected: FAIL với lỗi `assert(env.hillMesh instanceof THREE.Mesh)`

- [ ] **Step 3: Cập nhật `BeachEnvironment.js` bổ sung Địa hình và Sóng Biển**

Sửa `src/core/BeachEnvironment.js` thêm `setupTerrains()`, `setupOceanWaveMesh()`, `updateWaves(time)`:
```javascript
// Thêm vào constructor của BeachEnvironment:
// this.setupTerrains();
// this.setupOceanWaveMesh();

  setupTerrains() {
    // 1. Sườn đồi nhiệt đới xanh mướt bên Trái
    const hillGeo = new THREE.PlaneGeometry(24, 28, 12, 12);
    // Tạo độ mấp mô tự nhiên cho đồi
    const hPos = hillGeo.attributes.position;
    for (let i = 0; i < hPos.count; i++) {
      const vx = hPos.getX(i);
      const vy = hPos.getY(i);
      const bump = Math.sin(vx * 0.3) * Math.cos(vy * 0.3) * 1.2;
      hPos.setZ(i, bump);
    }
    hillGeo.computeVertexNormals();

    const hillMat = new THREE.MeshLambertMaterial({
      color: 0x16a34a,
      flatShading: true
    });
    this.hillMesh = new THREE.Mesh(hillGeo, hillMat);
    this.hillMesh.rotation.x = -Math.PI / 2.3;
    this.hillMesh.position.set(-14, -4.5, -16);
    this.midgroundGroup.add(this.hillMesh);

    // 2. Bãi cát vàng thoai thoải chuyển tiếp ra biển
    const sandGeo = new THREE.PlaneGeometry(16, 28, 10, 10);
    const sandMat = new THREE.MeshLambertMaterial({
      color: 0xfde047,
      flatShading: true
    });
    this.sandMesh = new THREE.Mesh(sandGeo, sandMat);
    this.sandMesh.rotation.x = -Math.PI / 2.3;
    this.sandMesh.position.set(1.5, -4.8, -15);
    this.foregroundGroup.add(this.sandMesh);
  }

  setupOceanWaveMesh() {
    // Lưới mặt nước đại dương xanh ngọc bích
    this.waterGeometry = new THREE.PlaneGeometry(46, 36, 64, 48);
    this.waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.18,
      metalness: 0.08,
      flatShading: true,
      transparent: true,
      opacity: 0.94
    });

    this.waterMesh = new THREE.Mesh(this.waterGeometry, this.waterMaterial);
    this.waterMesh.rotation.x = -Math.PI / 2.25;
    this.waterMesh.position.set(15, -4.9, -17);
    this.midgroundGroup.add(this.waterMesh);
  }

  updateWaves(time) {
    if (!this.waterGeometry) return;
    const pos = this.waterGeometry.attributes.position;
    const timeOffset = time * 1.8;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Độ dập dềnh giảm dần khi tiến sát bờ cát
      const shoreDamp = Math.min(1.0, Math.max(0.12, (x + 16) / 22));

      const wave = (
        Math.sin(x * 0.35 + timeOffset) * 0.45 +
        Math.cos(y * 0.28 + timeOffset * 0.8) * 0.35 +
        Math.sin((x + y) * 0.15 + timeOffset * 1.2) * 0.22
      ) * shoreDamp;

      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  }
```
Và gọi `this.updateWaves(time);` trong phương thức `update()`.

- [ ] **Step 4: Chạy test để xác nhận thành công**

Run: `node src/core/BeachEnvironment.test.js`
Expected: `✓ Terrain and Ocean Wave tests passed!`

- [ ] **Step 5: Commit task 4**

Run:
```bash
git add src/core/BeachEnvironment.js src/core/BeachEnvironment.test.js
git commit -m "feat(beach): implement low-poly hill, sand beach, and dynamic wave engine"
```

---

### Task 5: Tích hợp Toàn Cảnh, Lắp Ghép Mô Hình & Động Cơ Parallax 3 Tầng (`BeachEnvironment.js` - Integration & Parallax)

**Files:**
- Modify: `src/core/BeachEnvironment.js`
- Modify: `src/core/BeachEnvironment.test.js`

**Interfaces:**
- Consumes: `BeachAssetBuilder`
- Produces:
  - `setupFloraAndFauna()`: 7 cây dừa uốn lượn, 2 chú khỉ.
  - `setupBeachCharacters()`: Trẻ em, ô che nắng, lâu đài cát, bóng, 4 người tắm bơi phao, 1 người lướt sóng.
  - `update(delta, time, scrollY)`: Đầy đủ hoạt ảnh cử động và 3 hệ số Parallax (0.55, 0.35, 0.12).

- [ ] **Step 1: Viết test cho toàn cảnh lắp ghép và Parallax 3 tầng**

Bổ sung test cases vào `src/core/BeachEnvironment.test.js`:
```javascript
// Append to src/core/BeachEnvironment.test.js:

console.log('Testing BeachEnvironment: Full Asset Population & Parallax Engine...');

// Test 8: Palm trees and monkeys populated
assert(env.palmTrees.length >= 6, `Must have at least 6 palm trees, got ${env.palmTrees.length}`);
assert(env.monkeys.length >= 2, `Must have at least 2 monkeys, got ${env.monkeys.length}`);

// Test 9: Surfer and Swimmers populated
assert(env.surfer instanceof THREE.Group, 'Surfer must exist in scene');
assert(env.swimmers.length >= 3, `Must have at least 3 swimmers, got ${env.swimmers.length}`);

// Test 10: 3-Layer Parallax Response on Scroll
const initialFG_Y = env.foregroundGroup.position.y;
const initialMG_Y = env.midgroundGroup.position.y;
const initialBG_Y = env.backgroundGroup.position.y;

// Simulate scroll Y = 100
env.update(0.016, 2.0, 100);

const deltaFG = env.foregroundGroup.position.y - initialFG_Y;
const deltaMG = env.midgroundGroup.position.y - initialMG_Y;
const deltaBG = env.backgroundGroup.position.y - initialBG_Y;

// Foreground factor (0.55) > Midground (0.35) > Background (0.12)
assert(deltaFG > deltaMG, 'Foreground must move faster than Midground');
assert(deltaMG > deltaBG, 'Midground must move faster than Background');
assert(!Number.isNaN(deltaFG) && !Number.isNaN(deltaMG) && !Number.isNaN(deltaBG), 'Parallax deltas must not be NaN');

console.log('✓ Full Asset Population and Parallax Engine tests passed!');
```

- [ ] **Step 2: Chạy test để xác nhận thất bại**

Run: `node src/core/BeachEnvironment.test.js`
Expected: FAIL với lỗi `assert(env.palmTrees.length >= 6)`

- [ ] **Step 3: Cập nhật `BeachEnvironment.js` tích hợp toàn bộ cảnh quan và Parallax**

Bổ sung các thuộc tính và phương thức vào `src/core/BeachEnvironment.js`:
```javascript
    this.palmTrees = [];
    this.monkeys = [];
    this.swimmers = [];
    this.surfer = null;

    this.setupFloraAndFauna();
    this.setupBeachCharacters();
```
Triển khai:
* `setupFloraAndFauna()`:
  - Tạo 7 cây dừa bố trí tại các vị trí `X: -19` đến `-4`, `Z: -12` đến `-20`.
  - Tạo 2 chú khỉ: chú thứ nhất tại `(-10.5, 0.5, -14)`, chú thứ hai tại `(-6.2, 1.8, -17)`.
* `setupBeachCharacters()`:
  - Tạo cụm trẻ em và ô che nắng: `BeachAssetBuilder.createKidsOnBeach()` đặt tại `(2.5, -4.5, -13)`.
  - Tạo 4 người tắm biển: phân bổ tại `(7.5, -4.8, -15)`, `(10.5, -4.8, -17)`, `(8.2, -4.8, -19)`, `(12.0, -4.8, -16)`.
  - Tạo vận động viên lướt sóng: `BeachAssetBuilder.createSurfer()` đặt tại `(15.5, -4.2, -18)`.
* Hoàn thiện hàm `update(delta, time, scrollY)`:
  - Parallax 3 tầng:
    `this.foregroundGroup.position.y = this.baseFG_Y + (scrollY * 0.55);`
    `this.foregroundGroup.position.x = Math.sin(scrollY * 0.04) * 0.7;`
    `this.midgroundGroup.position.y = this.baseMG_Y + (scrollY * 0.35);`
    `this.backgroundGroup.position.y = this.baseBG_Y + (scrollY * 0.12);`
  - Cập nhật sóng: `this.updateWaves(time);`
  - Cập nhật surfer, swimmers, monkeys, palm trees: gọi hàm `userData.update()`.
  - Cập nhật mây và hạt bụi nắng.

- [ ] **Step 4: Chạy test để xác nhận toàn bộ test cases đều đạt chuẩn**

Run: `node src/core/BeachEnvironment.test.js`
Expected: `✓ Full Asset Population and Parallax Engine tests passed!`

- [ ] **Step 5: Commit task 5**

Run:
```bash
git add src/core/BeachEnvironment.js src/core/BeachEnvironment.test.js
git commit -m "feat(beach): complete full scene assembly and 3-layer parallax engine"
```

---

### Task 6: Nối Kết Ứng Dụng Chính, Cập Nhật Ánh Sáng & Dọn Dẹp File Cũ (`Lighting.js`, `main.js`, Xóa bỏ `beach_paradise.jpg`)

**Files:**
- Modify: `src/core/Lighting.js`
- Modify: `src/main.js`
- Test: Build xác thực `npm run build`

**Interfaces:**
- Consumes: `BeachEnvironment`, `Lighting`, `SceneManager`
- Produces: Ứng dụng chạy hoàn chỉnh không lỗi, nền bãi biển 3D hiển thị mượt mà.

- [ ] **Step 1: Cập nhật `src/core/Lighting.js` cho tone màu bãi biển nhiệt đới**

Cập nhật `src/core/Lighting.js`:
```javascript
import * as THREE from 'three';

export class Lighting {
  constructor(scene) {
    this.scene = scene;
    this.setup();
  }

  setup() {
    // 1. Ánh sáng vòm trời & bãi biển nhiệt đới (Hemisphere Light)
    // Vòm trời xanh biển tươi sáng + bãi cát vàng phản xạ
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0xfde047, 1.25);
    hemiLight.position.set(0, 30, 0);
    this.scene.add(hemiLight);

    // 2. Ánh nắng mặt trời nhiệt đới vàng ấm rực rỡ (Sunlight)
    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.85);
    sunLight.position.set(18, 28, 16);
    this.scene.add(sunLight);

    // 3. Ánh sáng môi trường nhẹ bổ sung
    const ambientLight = new THREE.AmbientLight(0xe0f2fe, 0.55);
    this.scene.add(ambientLight);
  }
}
```

- [ ] **Step 2: Cập nhật `src/main.js` thay thế `FarmEnvironment` bằng `BeachEnvironment`**

Sửa `src/main.js`:
```javascript
// Thay:
// import { FarmEnvironment } from './core/FarmEnvironment.js';
// export const environment = new FarmEnvironment(sceneManager.scene);

// Bằng:
import { BeachEnvironment } from './core/BeachEnvironment.js';
export const environment = new BeachEnvironment(sceneManager.scene);
```

- [ ] **Step 3: Xóa bỏ file ảnh tĩnh cũ `beach_paradise.jpg` (nếu còn tồn tại)**

Kiểm tra và dọn dẹp các tài nguyên ảnh nền cũ trong thư mục `public/`:
Run PowerShell check: `Test-Path public/beach_paradise.jpg`
Nếu tồn tại, loại bỏ file để giảm dung lượng bundle và đảm bảo 100% bằng code.

- [ ] **Step 4: Chạy build để xác nhận bundling không có bất kỳ cảnh báo hoặc lỗi nào**

Run: `npm run build`
Expected: `✓ built in ...ms` thành công, output đặt tại `dist/`.

- [ ] **Step 5: Chạy lại cả 2 bộ unit test để đảm bảo 100% test xanh**

Run: `node src/data/portfolioData.test.js && node src/entities/BeachAssetBuilder.test.js && node src/core/BeachEnvironment.test.js`
Expected: Toàn bộ các bộ test đều passed.

- [ ] **Step 6: Commit task 6**

Run:
```bash
git add src/core/Lighting.js src/main.js
git commit -m "feat(beach): connect BeachEnvironment to main scene and update tropical lighting"
```
