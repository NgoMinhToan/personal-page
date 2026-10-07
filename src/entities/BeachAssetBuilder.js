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

const skinMaterial = new THREE.MeshLambertMaterial({
  color: 0xfbcfe8,
  flatShading: true
});

const swimSuitMaterial = new THREE.MeshLambertMaterial({
  color: 0x0284c7,
  flatShading: true
});

const foamMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff
});

const sandCastleMaterial = new THREE.MeshLambertMaterial({
  color: 0xfde047,
  flatShading: true
});

const redColorMat = new THREE.MeshLambertMaterial({
  color: 0xef4444,
  flatShading: true
});

const whiteColorMat = new THREE.MeshLambertMaterial({
  color: 0xf8fafc,
  flatShading: true
});

const yellowColorMat = new THREE.MeshLambertMaterial({
  color: 0xeab308,
  flatShading: true
});

const woodStickMat = new THREE.MeshLambertMaterial({
  color: 0x78350f,
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

    let baseY = options.baseY !== undefined ? options.baseY : null;
    const phaseOffset = options.phaseOffset || Math.random() * Math.PI * 2;

    group.userData.update = (time) => {
      if (baseY === null) {
        baseY = group.position.y;
      }
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
}
