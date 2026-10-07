import * as THREE from 'three';
import gsap from 'gsap';

export class FarmAssetBuilder {
  /**
   * Tạo Model 3D Asset Nông trại tương ứng với từng loại dự án
   */
  static buildAsset(type) {
    switch (type) {
      case 'windmill':
        return FarmAssetBuilder.buildWindmill();
      case 'orchard':
        return FarmAssetBuilder.buildAppleTree();
      case 'garden':
        return FarmAssetBuilder.buildVegetableGarden();
      case 'well':
        return FarmAssetBuilder.buildWaterWell();
      case 'cart':
        return FarmAssetBuilder.buildHayCart();
      case 'campfire':
        return FarmAssetBuilder.buildCampfire();
      case 'barn':
        return FarmAssetBuilder.buildRedBarn();
      case 'beehive':
        return FarmAssetBuilder.buildBeehive();
      case 'sheep':
        return FarmAssetBuilder.buildFluffySheep();
      case 'tractor':
        return FarmAssetBuilder.buildVintageTractor();
      case 'greenhouse':
        return FarmAssetBuilder.buildGreenhouse();
      case 'sunflower':
        return FarmAssetBuilder.buildSunflowerField();
      case 'scarecrow':
        return FarmAssetBuilder.buildScarecrow();
      case 'watermill':
        return FarmAssetBuilder.buildWatermill();
      case 'silo':
        return FarmAssetBuilder.buildGrainSilo();
      case 'duckpond':
        return FarmAssetBuilder.buildDuckPond();
      default:
        return FarmAssetBuilder.buildWindmill();
    }
  }

  // 1. CỐI XAY GIÓ (Windmill)
  static buildWindmill() {
    const group = new THREE.Group();

    const towerGeo = new THREE.CylinderGeometry(1.0, 1.4, 4.0, 8);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, roughness: 0.8, flatShading: true });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 2.0;
    group.add(tower);

    const roofGeo = new THREE.ConeGeometry(1.3, 1.4, 8);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xd9534f, roughness: 0.7, flatShading: true });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 4.7;
    group.add(roof);

    const bladeGroup = new THREE.Group();
    bladeGroup.position.set(0, 3.8, 1.1);

    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6 });
    const canvasMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, side: THREE.DoubleSide });

    for (let i = 0; i < 4; i++) {
      const arm = new THREE.Group();
      arm.rotation.z = (i * Math.PI) / 2;

      const rod = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, 0.08), bladeMat);
      rod.position.y = 1.2;
      arm.add(rod);

      const sail = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1.8), canvasMat);
      sail.position.set(0.28, 1.3, 0.02);
      arm.add(sail);

      bladeGroup.add(arm);
    }
    group.add(bladeGroup);
    group.spinSpeed = 1.2;

    group.update = (delta) => {
      bladeGroup.rotation.z += group.spinSpeed * delta;
    };

    group.onHover = (isHovered) => {
      gsap.to(group, {
        spinSpeed: isHovered ? 5.0 : 1.2,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    return group;
  }

  // 2. VƯỜN TÁO (Apple Tree)
  static buildAppleTree() {
    const group = new THREE.Group();

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.55, 3.2, 7),
      new THREE.MeshStandardMaterial({ color: 0x7c4722, roughness: 0.9 })
    );
    trunk.position.y = 1.6;
    group.add(trunk);

    const foliage = new THREE.Mesh(
      new THREE.DodecahedronGeometry(2.1, 1),
      new THREE.MeshStandardMaterial({ color: 0x48b656, roughness: 0.7, flatShading: true })
    );
    foliage.position.y = 3.8;
    group.add(foliage);

    const appleMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const apples = [];
    const offsets = [
      [-1.1, 3.8, 1.0], [1.1, 4.2, 0.8], [0.2, 4.8, 1.3],
      [-0.8, 3.2, -1.0], [1.2, 3.5, -0.7]
    ];

    offsets.forEach(pos => {
      const apple = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), appleMat);
      apple.position.set(...pos);
      group.add(apple);
      apples.push(apple);
    });

    group.update = (delta, time) => {
      foliage.rotation.y = Math.sin(time * 1.5) * 0.04;
      foliage.position.x = Math.sin(time * 2.0) * 0.05;
    };

    group.onHover = (isHovered) => {
      apples.forEach((apple, idx) => {
        gsap.to(apple.scale, {
          x: isHovered ? 1.6 : 1.0,
          y: isHovered ? 1.6 : 1.0,
          z: isHovered ? 1.6 : 1.0,
          duration: 0.3,
          delay: idx * 0.04,
          ease: 'back.out(2)'
        });
      });
    };

    return group;
  }

  // 3. LUỐNG RAU CỦ QUẢ (Vegetable Garden)
  static buildVegetableGarden() {
    const group = new THREE.Group();

    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.5, 2.6),
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 })
    );
    bed.position.y = 0.25;
    group.add(bed);

    const soil = new THREE.Mesh(
      new THREE.BoxGeometry(3.3, 0.4, 2.3),
      new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.95 })
    );
    soil.position.y = 0.35;
    group.add(soil);

    const carrots = [];
    const carrotMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.5 });
    const leafyMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7 });

    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const carrotGroup = new THREE.Group();
        const carrotGeo = new THREE.ConeGeometry(0.18, 0.8, 6);
        carrotGeo.rotateX(Math.PI);
        carrotGroup.add(new THREE.Mesh(carrotGeo, carrotMat));

        for (let l = 0; l < 3; l++) {
          const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.45, 5), leafyMat);
          leaf.position.y = 0.35;
          leaf.rotation.z = (l - 1) * 0.35;
          carrotGroup.add(leaf);
        }

        carrotGroup.position.set(c * 0.9, 0.6, r * 0.7);
        group.add(carrotGroup);
        carrots.push(carrotGroup);
      }
    }

    group.update = (delta, time) => {
      carrots.forEach((c, idx) => {
        c.rotation.z = Math.sin(time * 3 + idx) * 0.05;
      });
    };

    group.onHover = (isHovered) => {
      carrots.forEach((c, idx) => {
        gsap.to(c.position, {
          y: isHovered ? 1.1 : 0.6,
          duration: 0.3,
          delay: idx * 0.03,
          ease: 'back.out(2.5)'
        });
      });
    };

    return group;
  }

  // 4. GIẾNG NƯỚC (Water Well)
  static buildWaterWell() {
    const group = new THREE.Group();

    const well = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.3, 1.2, 12, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9, flatShading: true })
    );
    well.position.y = 0.6;
    group.add(well);

    const water = new THREE.Mesh(
      new THREE.CircleGeometry(1.1, 12),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.3 })
    );
    water.rotateX(-Math.PI / 2);
    water.position.y = 0.5;
    group.add(water);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
    const postL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.5, 6), woodMat);
    postL.position.set(-0.9, 1.8, 0);
    group.add(postL);

    const postR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.5, 6), woodMat);
    postR.position.set(0.9, 1.8, 0);
    group.add(postR);

    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 1.0, 4),
      new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7, flatShading: true })
    );
    roof.position.y = 3.2;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    const bucket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.2, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.7 })
    );
    bucket.position.set(0, 1.4, 0);
    group.add(bucket);

    group.update = (delta, time) => {
      bucket.position.y = 1.4 + Math.sin(time * 2) * 0.2;
    };

    group.onHover = (isHovered) => {
      gsap.to(bucket.position, {
        y: isHovered ? 2.2 : 1.4,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    return group;
  }

  // 5. XE KÉO CHỞ RƠM (Hay Cart)
  static buildHayCart() {
    const group = new THREE.Group();

    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.7, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8 })
    );
    bed.position.y = 0.9;
    group.add(bed);

    const wheelGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.15, 12);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x573210, roughness: 0.7, flatShading: true });

    const wheelL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelL.position.set(0, 0.65, 1.05);
    group.add(wheelL);

    const wheelR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelR.position.set(0, 0.65, -1.05);
    group.add(wheelR);

    const hay = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.9, 1),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.9, flatShading: true })
    );
    hay.position.set(-0.2, 1.6, 0);
    hay.scale.set(1.4, 0.9, 1.1);
    group.add(hay);

    group.update = (delta, time) => {
      hay.rotation.y = Math.sin(time * 0.8) * 0.05;
    };

    group.onHover = (isHovered) => {
      gsap.to([wheelL.rotation, wheelR.rotation], {
        x: isHovered ? '+=3.14' : 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    return group;
  }

  // 6. LỬA TRẠI & LỀU (Campfire)
  static buildCampfire() {
    const group = new THREE.Group();

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.9, flatShading: true });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25, 0), stoneMat);
      stone.position.set(Math.cos(angle) * 0.9, 0.15, Math.sin(angle) * 0.9);
      group.add(stone);
    }

    const fireGroup = new THREE.Group();
    const f1 = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.1, 5), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    f1.position.y = 0.7;
    fireGroup.add(f1);

    const f2 = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.85, 5), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
    f2.position.set(0.1, 0.6, 0.1);
    fireGroup.add(f2);

    group.add(fireGroup);

    const tent = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 2.2, 4),
      new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.8, flatShading: true })
    );
    tent.rotateY(Math.PI / 4);
    tent.position.set(0, 1.1, -2.4);
    tent.scale.set(1.4, 1.0, 1.4);
    group.add(tent);

    group.update = (delta, time) => {
      fireGroup.scale.y = 1.0 + Math.sin(time * 12) * 0.18;
      fireGroup.scale.x = 1.0 + Math.cos(time * 10) * 0.12;
    };

    group.onHover = (isHovered) => {
      gsap.to(fireGroup.scale, {
        x: isHovered ? 2.0 : 1.0,
        y: isHovered ? 2.4 : 1.0,
        z: isHovered ? 2.0 : 1.0,
        duration: 0.3,
        ease: 'elastic.out(1.2, 0.4)'
      });
    };

    return group;
  }

  // 7. NHÀ KHO NÔNG TRẠI ĐỎ (Red Barn)
  static buildRedBarn() {
    const group = new THREE.Group();

    // Thân nhà kho gỗ đỏ
    const bodyGeo = new THREE.BoxGeometry(3.4, 2.6, 2.8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.8 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.3;
    group.add(body);

    // Mái ngói vát cong màu xám trắng
    const roofGeo = new THREE.ConeGeometry(2.4, 1.4, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.7, flatShading: true });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 3.3;
    roof.scale.set(1.1, 1.0, 1.1);
    group.add(roof);

    // Cánh cửa lớn chữ X trắng
    const doorGeo = new THREE.PlaneGeometry(1.2, 1.6);
    const doorMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 0.85, 1.42);
    group.add(door);

    group.update = (delta, time) => {
      roof.rotation.y = Math.PI / 4 + Math.sin(time * 1.0) * 0.02;
    };

    group.onHover = (isHovered) => {
      gsap.to(group.scale, {
        x: isHovered ? 1.15 : 1.0,
        y: isHovered ? 1.15 : 1.0,
        z: isHovered ? 1.15 : 1.0,
        duration: 0.35,
        ease: 'bounce.out'
      });
    };

    return group;
  }

  // 8. TỔ ONG MẬT VÀNG (Beehive)
  static buildBeehive() {
    const group = new THREE.Group();

    // Thùng tổ ong gỗ xếp tầng
    const hiveGeo = new THREE.BoxGeometry(1.6, 1.8, 1.4);
    const hiveMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.7 });
    const hive = new THREE.Mesh(hiveGeo, hiveMat);
    hive.position.y = 1.5;
    group.add(hive);

    // Chân cọc gỗ
    const postGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.0, 6);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const post = new THREE.Mesh(postGeo, postMat);
    post.position.y = 0.5;
    group.add(post);

    // Những chú ong bay vo ve quanh tổ
    const bees = [];
    const beeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    for (let i = 0; i < 4; i++) {
      const bee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), beeMat);
      bee.position.set(Math.cos(i) * 1.5, 1.8 + Math.sin(i) * 0.4, Math.sin(i) * 1.5);
      group.add(bee);
      bees.push({ mesh: bee, angle: i * 1.5, speed: 2.5 + i });
    }

    group.update = (delta, time) => {
      bees.forEach((b) => {
        b.angle += b.speed * delta;
        b.mesh.position.x = Math.cos(b.angle) * 1.6;
        b.mesh.position.z = Math.sin(b.angle) * 1.6;
        b.mesh.position.y = 1.8 + Math.sin(time * 5 + b.angle) * 0.3;
      });
    };

    group.onHover = (isHovered) => {
      bees.forEach(b => { b.speed = isHovered ? 8.0 : 2.5; });
      gsap.to(hive.scale, {
        x: isHovered ? 1.2 : 1.0,
        y: isHovered ? 1.2 : 1.0,
        z: isHovered ? 1.2 : 1.0,
        duration: 0.3
      });
    };

    return group;
  }

  // 9. CHÚ CỪU LÔNG XÙ (Fluffy Sheep)
  static buildFluffySheep() {
    const group = new THREE.Group();

    // Thân cừu lông xù
    const bodyGeo = new THREE.DodecahedronGeometry(1.2, 1);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.2;
    body.scale.set(1.3, 1.0, 1.0);
    group.add(body);

    // Đầu cừu màu đen mộc mạc
    const headGeo = new THREE.DodecahedronGeometry(0.45, 0);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.8 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(1.4, 1.4, 0);
    group.add(head);

    // 4 Chân cừu gỗ đen
    const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
    const legOffsets = [[0.7, 0.4, 0.5], [0.7, 0.4, -0.5], [-0.7, 0.4, 0.5], [-0.7, 0.4, -0.5]];

    legOffsets.forEach(pos => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(...pos);
      group.add(leg);
    });

    group.update = (delta, time) => {
      head.position.y = 1.4 + Math.sin(time * 2.5) * 0.08;
      body.rotation.z = Math.sin(time * 1.8) * 0.03;
    };

    group.onHover = (isHovered) => {
      gsap.to(group.position, {
        y: isHovered ? 0.6 : 0,
        duration: 0.3,
        ease: 'bounce.out'
      });
      gsap.to(body.scale, {
        x: isHovered ? 1.5 : 1.3,
        y: isHovered ? 1.2 : 1.0,
        z: isHovered ? 1.2 : 1.0,
        duration: 0.3
      });
    };

    return group;
  }

  // 10. MÁY CÀY NÔNG TRẠI (Vintage Tractor)
  static buildVintageTractor() {
    const group = new THREE.Group();

    // Thân máy cày xanh rêu
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.1, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.6 })
    );
    body.position.y = 1.1;
    group.add(body);

    // Ống khói máy cày
    const pipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1.0, 6),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 })
    );
    pipe.position.set(0.8, 2.0, 0.3);
    group.add(pipe);

    // 2 Bánh sau to
    const bigWheelGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.25, 12);
    bigWheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.9, flatShading: true });

    const wheelBackL = new THREE.Mesh(bigWheelGeo, wheelMat);
    wheelBackL.position.set(-0.7, 0.85, 0.85);
    group.add(wheelBackL);

    const wheelBackR = new THREE.Mesh(bigWheelGeo, wheelMat);
    wheelBackR.position.set(-0.7, 0.85, -0.85);
    group.add(wheelBackR);

    // 2 Bánh trước nhỏ
    const smallWheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.2, 10);
    smallWheelGeo.rotateZ(Math.PI / 2);

    const wheelFrontL = new THREE.Mesh(smallWheelGeo, wheelMat);
    wheelFrontL.position.set(0.8, 0.45, 0.8);
    group.add(wheelFrontL);

    const wheelFrontR = new THREE.Mesh(smallWheelGeo, wheelMat);
    wheelFrontR.position.set(0.8, 0.45, -0.8);
    group.add(wheelFrontR);

    group.update = (delta, time) => {
      pipe.rotation.z = Math.sin(time * 15) * 0.05; // Ống khói rung rinh
    };

    group.onHover = (isHovered) => {
      gsap.to(group.position, {
        y: isHovered ? 0.3 : 0,
        duration: 0.25,
        ease: 'bounce.out'
      });
    };

    return group;
  }

  // 11. NHÀ KÍNH THỰC VẬT (Greenhouse)
  static buildGreenhouse() {
    const group = new THREE.Group();

    // Khung gỗ sồi
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 2.0, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x78350f, wireframe: true })
    );
    frame.position.y = 1.0;
    group.add(frame);

    // Kính trong suốt màu xanh ngọc
    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(2.9, 1.9, 2.3),
      new THREE.MeshStandardMaterial({ color: 0xa7f3d0, transparent: true, opacity: 0.45, roughness: 0.1 })
    );
    glass.position.y = 1.0;
    group.add(glass);

    // Cây xanh tươi tốt bên trong
    const plant = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.8, 1),
      new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 })
    );
    plant.position.set(0, 0.8, 0);
    group.add(plant);

    group.update = (delta, time) => {
      plant.rotation.y = time * 0.3;
      plant.scale.setScalar(1.0 + Math.sin(time * 2) * 0.08);
    };

    group.onHover = (isHovered) => {
      gsap.to(plant.scale, {
        x: isHovered ? 1.5 : 1.0,
        y: isHovered ? 1.5 : 1.0,
        z: isHovered ? 1.5 : 1.0,
        duration: 0.35,
        ease: 'back.out(2)'
      });
    };

    return group;
  }

  // 12. CÁNH ĐỒNG HƯỚNG DƯƠNG (Sunflower Field)
  static buildSunflowerField() {
    const group = new THREE.Group();

    const flowerMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const flowers = [];

    for (let i = 0; i < 9; i++) {
      const flowerGroup = new THREE.Group();
      const x = (i % 3 - 1) * 1.1;
      const z = (Math.floor(i / 3) - 1) * 1.0;

      // Thân cành
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 5), stemMat);
      stem.position.y = 1.1;
      flowerGroup.add(stem);

      // Bông hoa vàng to
      const head = new THREE.Mesh(new THREE.CircleGeometry(0.45, 12), flowerMat);
      head.position.set(0, 2.2, 0.1);
      flowerGroup.add(head);

      flowerGroup.position.set(x, 0, z);
      group.add(flowerGroup);
      flowers.push(flowerGroup);
    }

    group.update = (delta, time) => {
      flowers.forEach((f, idx) => {
        f.rotation.z = Math.sin(time * 1.8 + idx) * 0.08;
      });
    };

    group.onHover = (isHovered) => {
      flowers.forEach((f, idx) => {
        gsap.to(f.scale, {
          x: isHovered ? 1.4 : 1.0,
          y: isHovered ? 1.4 : 1.0,
          z: isHovered ? 1.4 : 1.0,
          duration: 0.3,
          delay: idx * 0.02,
          ease: 'back.out(2)'
        });
      });
    };

    return group;
  }

  // 13. BÙ NHÌN RƠM (Scarecrow)
  static buildScarecrow() {
    const group = new THREE.Group();

    // Cột gỗ chữ thập
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.9 });
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 3.8, 6), woodMat);
    post.position.y = 1.9;
    group.add(post);

    const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.6, 6), woodMat);
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.y = 2.8;
    group.add(crossbar);

    // Thân áo rơm kẻ ca rô đỏ cam
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd9534f, roughness: 0.8 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.5), bodyMat);
    body.position.y = 2.4;
    group.add(body);

    // Đầu bao bố rơm
    const headMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.9 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 8), headMat);
    head.position.y = 3.4;
    group.add(head);

    // Mũ rơm chóp nón
    const hatMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.85 });
    const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.06, 12), hatMat);
    hatBrim.position.y = 3.75;
    group.add(hatBrim);

    const hatCone = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.7, 8), hatMat);
    hatCone.position.y = 4.15;
    group.add(hatCone);

    // Mắt nút áo
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 });
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), eyeMat);
    eyeL.position.set(-0.14, 3.45, 0.38);
    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), eyeMat);
    eyeR.position.set(0.14, 3.45, 0.38);
    group.add(eyeL);
    group.add(eyeR);

    // Khăn quàng cổ bay trong gió
    const scarfMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.7 });
    const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 6, 12), scarfMat);
    scarf.rotation.x = Math.PI / 2;
    scarf.position.y = 3.12;
    group.add(scarf);

    group.update = (delta, time) => {
      // Đung đưa theo gió nông trại
      group.rotation.z = Math.sin(time * 2.0) * 0.06;
      hatCone.rotation.z = Math.sin(time * 2.5) * 0.04;
    };

    group.onHover = (isHovered) => {
      gsap.to(group.rotation, {
        y: isHovered ? Math.PI * 2 : 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      gsap.to(group.scale, {
        x: isHovered ? 1.25 : 1.0,
        y: isHovered ? 1.25 : 1.0,
        z: isHovered ? 1.25 : 1.0,
        duration: 0.3,
        ease: 'back.out(2)'
      });
    };

    return group;
  }

  // 14. CỐI GUỒNG NƯỚC (Watermill)
  static buildWatermill() {
    const group = new THREE.Group();

    // Ngôi nhà cối xay đá & gỗ
    const houseGeo = new THREE.BoxGeometry(2.4, 2.6, 2.0);
    const houseMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.85 });
    const house = new THREE.Mesh(houseGeo, houseMat);
    house.position.set(0, 1.3, 0);
    group.add(house);

    // Mái ngói rêu xanh
    const roofGeo = new THREE.ConeGeometry(2.1, 1.3, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 3.2, 0);
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    // Bánh xe guồng nước bên hông
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(1.4, 1.2, 0);

    const rimMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.7 });
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.09, 6, 16), rimMat);
    wheelGroup.add(rim);

    // Các nan quạt guồng nước
    for (let i = 0; i < 8; i++) {
      const paddle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 0.5), rimMat);
      const angle = (i / 8) * Math.PI * 2;
      paddle.position.set(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0);
      paddle.rotation.z = angle;
      wheelGroup.add(paddle);

      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 4), rimMat);
      spoke.rotation.z = angle;
      wheelGroup.add(spoke);
    }
    group.add(wheelGroup);

    // Dòng suối nhỏ dưới chân
    const waterGeo = new THREE.PlaneGeometry(3.5, 3.0);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(0.6, 0.05, 0);
    group.add(water);

    group.speed = 1.0;
    group.update = (delta) => {
      wheelGroup.rotation.z -= group.speed * delta;
    };

    group.onHover = (isHovered) => {
      gsap.to(group, {
        speed: isHovered ? 4.5 : 1.0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    return group;
  }

  // 15. THÁP NGŨ CỐC (Grain Silo)
  static buildGrainSilo() {
    const group = new THREE.Group();

    // Tháp tròn thân kim loại mạ kẽm
    const towerGeo = new THREE.CylinderGeometry(1.3, 1.3, 4.8, 16);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      roughness: 0.45,
      metalness: 0.55
    });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 2.4;
    group.add(tower);

    // Mái vòm nón kim loại sáng
    const roofGeo = new THREE.ConeGeometry(1.5, 1.2, 16);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x9ca3af,
      roughness: 0.35,
      metalness: 0.7
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 5.4;
    group.add(roof);

    // Thang sắt leo lên đỉnh tháp
    const ladderMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.6 });
    for (let y = 0.5; y < 4.8; y += 0.45) {
      const rung = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.05, 0.05), ladderMat);
      rung.position.set(0, y, 1.35);
      group.add(rung);
    }

    // Chú chim bồ câu trắng đậu trên chóp mái
    const pigeonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const pigeon = new THREE.Group();
    const pigeonBody = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), pigeonMat);
    const pigeonHead = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), pigeonMat);
    pigeonHead.position.set(0.12, 0.12, 0);
    pigeon.add(pigeonBody);
    pigeon.add(pigeonHead);
    pigeon.position.set(0, 6.1, 0);
    group.add(pigeon);

    group.update = (delta, time) => {
      // Chim bồ câu ngó nghiêng và nhấp nhô
      pigeon.rotation.y = Math.sin(time * 1.5) * 0.4;
      pigeon.position.y = 6.1 + Math.sin(time * 3.0) * 0.04;
    };

    group.onHover = (isHovered) => {
      gsap.to(pigeon.position, {
        y: isHovered ? 7.2 : 6.1,
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(group.scale, {
        x: isHovered ? 1.15 : 1.0,
        y: isHovered ? 1.15 : 1.0,
        z: isHovered ? 1.15 : 1.0,
        duration: 0.3,
        ease: 'back.out(2)'
      });
    };

    return group;
  }

  // 16. HỒ VỊT & HOA SÚNG (Duck Pond)
  static buildDuckPond() {
    const group = new THREE.Group();

    // Mặt nước hồ xanh biếc lấp lánh
    const waterGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.1, 24);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.15,
      metalness: 0.6,
      transparent: true,
      opacity: 0.88
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.05;
    group.add(water);

    // Đá sỏi viền bờ ao
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.9, flatShading: true });
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const r = 2.4 + (Math.random() - 0.5) * 0.2;
      const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25, 0), stoneMat);
      stone.position.set(Math.cos(angle) * r, 0.1, Math.sin(angle) * r);
      stone.scale.set(1.2, 0.7, 1.0);
      group.add(stone);
    }

    // Lá sen / hoa súng
    const lilyMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7 });
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.6 });
    const lilyPositions = [[-0.8, -0.6], [0.9, 0.8], [-1.0, 0.9]];
    lilyPositions.forEach(([lx, lz]) => {
      const pad = new THREE.Mesh(new THREE.CircleGeometry(0.35, 8), lilyMat);
      pad.rotation.x = -Math.PI / 2;
      pad.position.set(lx, 0.11, lz);
      group.add(pad);

      const blossom = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.25, 6), flowerMat);
      blossom.position.set(lx, 0.22, lz);
      group.add(blossom);
    });

    // Chú vịt vàng dễ thương bơi lội
    const duckGroup = new THREE.Group();
    const duckMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.6 });
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.6 });

    const duckBody = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), duckMat);
    duckBody.scale.set(1.2, 0.8, 0.9);
    duckGroup.add(duckBody);

    const duckHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), duckMat);
    duckHead.position.set(0.25, 0.22, 0);
    duckGroup.add(duckHead);

    const duckBeak = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 4), beakMat);
    duckBeak.rotation.z = -Math.PI / 2;
    duckBeak.position.set(0.44, 0.2, 0);
    duckGroup.add(duckBeak);

    duckGroup.position.set(1.2, 0.15, 0);
    group.add(duckGroup);

    group.orbitAngle = 0;
    group.update = (delta, time) => {
      // Vịt bơi vòng quanh bờ hồ
      group.orbitAngle += delta * 0.9;
      const radius = 1.2;
      duckGroup.position.x = Math.cos(group.orbitAngle) * radius;
      duckGroup.position.z = Math.sin(group.orbitAngle) * radius;
      duckGroup.rotation.y = -group.orbitAngle + Math.PI / 2;
      duckGroup.position.y = 0.15 + Math.sin(time * 4) * 0.03;
    };

    group.onHover = (isHovered) => {
      gsap.to(duckGroup.scale, {
        x: isHovered ? 1.6 : 1.0,
        y: isHovered ? 1.6 : 1.0,
        z: isHovered ? 1.6 : 1.0,
        duration: 0.3,
        ease: 'back.out(2)'
      });
    };

    return group;
  }
}

