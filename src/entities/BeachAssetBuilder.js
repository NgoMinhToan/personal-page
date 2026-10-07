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
