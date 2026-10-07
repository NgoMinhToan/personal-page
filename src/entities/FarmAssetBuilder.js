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
      default:
        return FarmAssetBuilder.buildWindmill();
    }
  }

  // 1. CỐI XAY GIÓ (Windmill)
  static buildWindmill() {
    const group = new THREE.Group();

    // Tháp cối xay
    const towerGeo = new THREE.CylinderGeometry(1.0, 1.4, 4.0, 8);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, roughness: 0.8, flatShading: true });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 2.0;
    group.add(tower);

    // Mái ngói đỏ chóp nón
    const roofGeo = new THREE.ConeGeometry(1.3, 1.4, 8);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xd9534f, roughness: 0.7, flatShading: true });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 4.7;
    group.add(roof);

    // Cánh cối xay gió quay
    const bladeGroup = new THREE.Group();
    bladeGroup.position.set(0, 3.8, 1.1);

    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6 });
    const canvasMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, side: THREE.DoubleSide });

    for (let i = 0; i < 4; i++) {
      const arm = new THREE.Group();
      arm.rotation.z = (i * Math.PI) / 2;

      // Nan gỗ
      const rodGeo = new THREE.BoxGeometry(0.08, 2.4, 0.08);
      const rod = new THREE.Mesh(rodGeo, bladeMat);
      rod.position.y = 1.2;
      arm.add(rod);

      // Cánh buồm vải
      const sailGeo = new THREE.PlaneGeometry(0.5, 1.8);
      const sail = new THREE.Mesh(sailGeo, canvasMat);
      sail.position.set(0.28, 1.3, 0.02);
      arm.add(sail);

      bladeGroup.add(arm);
    }
    group.add(bladeGroup);

    // Trạng thái động
    group.blades = bladeGroup;
    group.spinSpeed = 1.2;

    group.update = (delta) => {
      bladeGroup.rotation.z += group.spinSpeed * delta;
    };

    group.onHover = (isHovered) => {
      gsap.to(group, {
        spinSpeed: isHovered ? 4.5 : 1.2,
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.to(roof.scale, {
        x: isHovered ? 1.1 : 1.0,
        y: isHovered ? 1.1 : 1.0,
        z: isHovered ? 1.1 : 1.0,
        duration: 0.3
      });
    };

    return group;
  }

  // 2. VƯỜN TÁO (Apple Tree)
  static buildAppleTree() {
    const group = new THREE.Group();

    // Thân cây gỗ uốn
    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.55, 3.2, 7);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x7c4722, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.6;
    group.add(trunk);

    // Tán lá xanh tròn phồng
    const foliageGeo = new THREE.DodecahedronGeometry(2.1, 1);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x48b656, roughness: 0.7, flatShading: true });
    const foliage = new THREE.Mesh(foliageGeo, foliageMat);
    foliage.position.y = 3.8;
    group.add(foliage);

    // Các quả táo đỏ mọng
    const appleMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const apples = [];
    const appleOffsets = [
      [-1.1, 3.8, 1.0], [1.1, 4.2, 0.8], [0.2, 4.8, 1.3],
      [-0.8, 3.2, -1.0], [1.2, 3.5, -0.7], [-0.3, 4.4, -1.2]
    ];

    appleOffsets.forEach((pos) => {
      const appleGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const apple = new THREE.Mesh(appleGeo, appleMat);
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
          x: isHovered ? 1.5 : 1.0,
          y: isHovered ? 1.5 : 1.0,
          z: isHovered ? 1.5 : 1.0,
          duration: 0.35,
          delay: idx * 0.04,
          ease: 'back.out(2)'
        });
      });
      gsap.to(foliage.scale, {
        x: isHovered ? 1.15 : 1.0,
        y: isHovered ? 1.15 : 1.0,
        z: isHovered ? 1.15 : 1.0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)'
      });
    };

    return group;
  }

  // 3. LUỐNG RAU CỦ QUẢ (Vegetable Garden)
  static buildVegetableGarden() {
    const group = new THREE.Group();

    // Bồn gỗ trồng rau
    const bedGeo = new THREE.BoxGeometry(3.6, 0.5, 2.6);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.y = 0.25;
    group.add(bed);

    // Đất mùn tơi xốp
    const soilGeo = new THREE.BoxGeometry(3.3, 0.4, 2.3);
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.95 });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.35;
    group.add(soil);

    // Hàng cà rốt nảy mầm
    const carrotMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.5 });
    const leafyMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7 });
    const carrots = [];

    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const carrotGroup = new THREE.Group();
        // Củ cà rốt
        const carrotGeo = new THREE.ConeGeometry(0.18, 0.8, 6);
        carrotGeo.rotateX(Math.PI);
        const carrot = new THREE.Mesh(carrotGeo, carrotMat);
        carrotGroup.add(carrot);

        // Chùm lá xanh
        const leafGeo = new THREE.ConeGeometry(0.12, 0.45, 5);
        for (let l = 0; l < 3; l++) {
          const leaf = new THREE.Mesh(leafGeo, leafyMat);
          leaf.position.y = 0.35;
          leaf.rotation.z = (l - 1) * 0.35;
          carrotGroup.add(leaf);
        }

        carrotGroup.position.set(c * 0.9, 0.6, r * 0.7);
        group.add(carrotGroup);
        carrots.push(carrotGroup);
      }
    }

    // Quả bí ngô to tròn ở góc
    const pumpkinGeo = new THREE.DodecahedronGeometry(0.45, 1);
    const pumpkinMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.6, flatShading: true });
    const pumpkin = new THREE.Mesh(pumpkinGeo, pumpkinMat);
    pumpkin.position.set(2.2, 0.4, 0.8);
    pumpkin.scale.set(1.1, 0.8, 1.1);
    group.add(pumpkin);

    group.update = (delta, time) => {
      carrots.forEach((c, idx) => {
        c.rotation.z = Math.sin(time * 3 + idx) * 0.05;
      });
    };

    group.onHover = (isHovered) => {
      carrots.forEach((c, idx) => {
        gsap.to(c.position, {
          y: isHovered ? 1.05 : 0.6,
          duration: 0.3,
          delay: idx * 0.03,
          ease: 'back.out(2.5)'
        });
      });
      gsap.to(pumpkin.scale, {
        x: isHovered ? 1.4 : 1.1,
        y: isHovered ? 1.1 : 0.8,
        z: isHovered ? 1.4 : 1.1,
        duration: 0.3,
        ease: 'bounce.out'
      });
    };

    return group;
  }

  // 4. GIẾNG NƯỚC CỔ TÍCH (Water Well)
  static buildWaterWell() {
    const group = new THREE.Group();

    // Thành giếng đá tròn
    const wellGeo = new THREE.CylinderGeometry(1.2, 1.3, 1.2, 12, 1, true);
    const wellMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9, flatShading: true });
    const well = new THREE.Mesh(wellGeo, wellMat);
    well.position.y = 0.6;
    group.add(well);

    // Mặt nước trong giếng xanh biếc
    const waterGeo = new THREE.CircleGeometry(1.1, 12);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.3 });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.5;
    group.add(water);

    // 2 Cột đỡ gỗ
    const postGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.5, 6);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
    const postL = new THREE.Mesh(postGeo, woodMat);
    postL.position.set(-0.9, 1.8, 0);
    group.add(postL);

    const postR = new THREE.Mesh(postGeo, woodMat);
    postR.position.set(0.9, 1.8, 0);
    group.add(postR);

    // Mái che giếng
    const roofGeo = new THREE.ConeGeometry(1.6, 1.0, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7, flatShading: true });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 3.2;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    // Xô nước gỗ treo dây
    const bucketGeo = new THREE.CylinderGeometry(0.25, 0.2, 0.4, 8);
    const bucketMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.7 });
    const bucket = new THREE.Mesh(bucketGeo, bucketMat);
    bucket.position.set(0, 1.4, 0);
    group.add(bucket);

    group.update = (delta, time) => {
      bucket.position.y = 1.4 + Math.sin(time * 2) * 0.2;
      bucket.rotation.y = time * 0.5;
    };

    group.onHover = (isHovered) => {
      gsap.to(bucket.position, {
        y: isHovered ? 2.2 : 1.4,
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(bucket.scale, {
        x: isHovered ? 1.3 : 1.0,
        y: isHovered ? 1.3 : 1.0,
        z: isHovered ? 1.3 : 1.0,
        duration: 0.3
      });
    };

    return group;
  }

  // 5. XE KÉO CHỞ RƠM (Hay Cart)
  static buildHayCart() {
    const group = new THREE.Group();

    // Thùng xe gỗ
    const bedGeo = new THREE.BoxGeometry(2.6, 0.7, 1.8);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8 });
    const bed = new THREE.Mesh(bedGeo, woodMat);
    bed.position.y = 0.9;
    group.add(bed);

    // 2 Bánh xe gỗ tròn
    const wheelGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.15, 12);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x573210, roughness: 0.7, flatShading: true });

    const wheelL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelL.position.set(0, 0.65, 1.05);
    group.add(wheelL);

    const wheelR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelR.position.set(0, 0.65, -1.05);
    group.add(wheelR);

    // Đống rơm vàng ươm trên xe
    const hayGeo = new THREE.DodecahedronGeometry(0.9, 1);
    const hayMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.9, flatShading: true });
    const hay = new THREE.Mesh(hayGeo, hayMat);
    hay.position.set(-0.2, 1.6, 0);
    hay.scale.set(1.4, 0.9, 1.1);
    group.add(hay);

    // Hoa hướng dương cài bên xe
    const flowerGeo = new THREE.DodecahedronGeometry(0.28, 0);
    const flowerMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const flower = new THREE.Mesh(flowerGeo, flowerMat);
    flower.position.set(1.0, 1.7, 0.7);
    group.add(flower);

    group.update = (delta, time) => {
      hay.rotation.y = Math.sin(time * 0.8) * 0.05;
    };

    group.onHover = (isHovered) => {
      gsap.to([wheelL.rotation, wheelR.rotation], {
        x: isHovered ? '+=3.14' : 0,
        duration: 0.6,
        ease: 'power2.out'
      });
      gsap.to(group.position, {
        y: isHovered ? 0.35 : 0,
        duration: 0.3,
        ease: 'bounce.out'
      });
    };

    return group;
  }

  // 6. LỬA TRẠI ẤM CÚNG (Campfire & Tent)
  static buildCampfire() {
    const group = new THREE.Group();

    // Vòng đá xếp quanh lửa
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.9, flatShading: true });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const stoneGeo = new THREE.DodecahedronGeometry(0.25, 0);
      const stone = new THREE.Mesh(stoneGeo, stoneMat);
      stone.position.set(Math.cos(angle) * 0.9, 0.15, Math.sin(angle) * 0.9);
      group.add(stone);
    }

    // Các khúc củi gỗ xếp chéo
    const logGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.1, 5);
    const logMat = new THREE.MeshStandardMaterial({ color: 0x44260f, roughness: 0.9 });
    for (let i = 0; i < 4; i++) {
      const log = new THREE.Mesh(logGeo, logMat);
      log.position.y = 0.25;
      log.rotation.z = 0.6;
      log.rotation.y = (i * Math.PI) / 2;
      group.add(log);
    }

    // Ngọn lửa lập lòe 3D
    const fireGroup = new THREE.Group();
    const flameMat1 = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const flameMat2 = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const flameMat3 = new THREE.MeshBasicMaterial({ color: 0xfde047 });

    const f1 = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.1, 5), flameMat1);
    f1.position.y = 0.7;
    fireGroup.add(f1);

    const f2 = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.85, 5), flameMat2);
    f2.position.set(0.1, 0.6, 0.1);
    fireGroup.add(f2);

    const f3 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.6, 4), flameMat3);
    f3.position.set(-0.08, 0.5, -0.08);
    fireGroup.add(f3);

    group.add(fireGroup);
    group.fire = fireGroup;

    // Lều trại phía sau
    const tentGeo = new THREE.ConeGeometry(1.6, 2.2, 4);
    tentGeo.rotateY(Math.PI / 4);
    const tentMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.8, flatShading: true });
    const tent = new THREE.Mesh(tentGeo, tentMat);
    tent.position.set(0, 1.1, -2.4);
    tent.scale.set(1.4, 1.0, 1.4);
    group.add(tent);

    group.update = (delta, time) => {
      fireGroup.scale.y = 1.0 + Math.sin(time * 12) * 0.18;
      fireGroup.scale.x = 1.0 + Math.cos(time * 10) * 0.12;
      fireGroup.scale.z = 1.0 + Math.sin(time * 8) * 0.12;
    };

    group.onHover = (isHovered) => {
      gsap.to(fireGroup.scale, {
        x: isHovered ? 1.8 : 1.0,
        y: isHovered ? 2.2 : 1.0,
        z: isHovered ? 1.8 : 1.0,
        duration: 0.35,
        ease: 'elastic.out(1.2, 0.4)'
      });
    };

    return group;
  }
}
