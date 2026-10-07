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
    this.setupTerrains();
    this.setupOceanWaveMesh();

    this.palmTrees = [];
    this.monkeys = [];
    this.swimmers = [];
    this.surfer = null;

    this.setupFloraAndFauna();
    this.setupBeachCharacters();
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

    // 42 cụm mây phân bố theo 3 tầng độ sâu theo đúng Spec 4.3:
    // Tầng thấp (14 cụm): Z [-14, -20], speed 1.8, parallax 0.35
    // Tầng trung (16 cụm): Z [-22, -28], speed 1.2, parallax 0.22
    // Tầng cao (12 cụm): Z [-30, -38], speed 0.7, parallax 0.10
    const tiers = [
      { name: 'low', count: 14, minZ: -20, maxZ: -14, speed: 1.8, parallaxFactor: 0.35 },
      { name: 'mid', count: 16, minZ: -28, maxZ: -22, speed: 1.2, parallaxFactor: 0.22 },
      { name: 'high', count: 12, minZ: -38, maxZ: -30, speed: 0.7, parallaxFactor: 0.10 }
    ];

    for (const tier of tiers) {
      for (let i = 0; i < tier.count; i++) {
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
        const baseZ = tier.minZ + Math.random() * (tier.maxZ - tier.minZ);

        cloudGroup.position.set(baseX, baseY, baseZ);
        this.backgroundGroup.add(cloudGroup);

        this.clouds.push({
          mesh: cloudGroup,
          baseX: baseX,
          baseY: baseY,
          speed: tier.speed * (0.9 + Math.random() * 0.2),
          parallaxFactor: tier.parallaxFactor,
          tier: tier.name
        });
      }
    }
  }

  setupSunlightMist() {
    const count = 320;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 70;
      pos[i + 1] = (Math.random() - 0.5) * 36;
      pos[i + 2] = (Math.random() - 0.5) * 6; // Local Z in [-3, 3] xung quanh vị trí Z = -22
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
    // Đặt hạt bụi nắng ở tầng sâu Z = -22, tránh hoàn toàn góc nhìn camera (Z = 11.5)
    this.particles.position.set(0, 5, -22);
    this.backgroundGroup.add(this.particles);
  }

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

  setupFloraAndFauna() {
    // 1. Rặng dừa 7 cây phân bố sườn đồi thoai thoải hướng ra biển
    const palmConfigs = [
      { x: -18.0, y: -4.0, z: -18.0, height: 6.2, curvature: 0.09, group: this.midgroundGroup },
      { x: -14.5, y: -3.8, z: -16.0, height: 5.5, curvature: 0.08, group: this.midgroundGroup },
      { x: -11.0, y: -3.5, z: -15.0, height: 5.8, curvature: 0.10, group: this.midgroundGroup },
      { x: -8.0,  y: -4.2, z: -14.0, height: 5.0, curvature: 0.07, group: this.foregroundGroup },
      { x: -16.5, y: -2.5, z: -20.0, height: 6.8, curvature: 0.09, group: this.midgroundGroup },
      { x: -13.0, y: -2.2, z: -19.0, height: 6.0, curvature: 0.08, group: this.midgroundGroup },
      { x: -5.0,  y: -4.5, z: -13.0, height: 5.2, curvature: 0.11, group: this.foregroundGroup }
    ];

    for (const cfg of palmConfigs) {
      const palm = BeachAssetBuilder.createPalmTree({
        height: cfg.height,
        curvature: cfg.curvature,
        leafCount: 7
      });
      palm.position.set(cfg.x, cfg.y, cfg.z);
      cfg.group.add(palm);
      this.palmTrees.push(palm);
    }

    // 2. Chú khỉ tinh nghịch
    // Chú khỉ 1: Bám thân cây dừa nghiêng
    const monkey1 = BeachAssetBuilder.createMonkey();
    monkey1.position.set(-10.5, 0.2, -14.8);
    monkey1.rotation.y = 0.5;
    this.midgroundGroup.add(monkey1);
    this.monkeys.push(monkey1);

    // Chú khỉ 2: Ngồi vắt vẻo trên ngọn cây dừa gần
    const monkey2 = BeachAssetBuilder.createMonkey();
    monkey2.position.set(-5.2, 1.2, -12.8);
    monkey2.rotation.y = -0.4;
    this.foregroundGroup.add(monkey2);
    this.monkeys.push(monkey2);
  }

  setupBeachCharacters() {
    // 1. Góc trẻ em nghịch cát, lâu đài cát, ô che nắng và bóng bãi biển
    this.beachDecor = BeachAssetBuilder.createKidsOnBeach();
    this.beachDecor.position.set(2.5, -4.5, -12.5);
    this.foregroundGroup.add(this.beachDecor);

    // 2. Nhóm 4 người tắm biển bồng bềnh trên phao bơi
    const swimmerConfigs = [
      { x: 7.5,  y: -4.8, z: -15.0, color: 0xef4444, phase: 0 },
      { x: 10.5, y: -4.8, z: -17.0, color: 0x3b82f6, phase: 1.2 },
      { x: 8.2,  y: -4.8, z: -19.0, color: 0xeab308, phase: 2.5 },
      { x: 12.0, y: -4.8, z: -16.0, color: 0x10b981, phase: 3.8 }
    ];

    for (const cfg of swimmerConfigs) {
      const swimmer = BeachAssetBuilder.createSwimmer({
        ringColor: cfg.color,
        phaseOffset: cfg.phase
      });
      swimmer.position.set(cfg.x, cfg.y, cfg.z);
      this.midgroundGroup.add(swimmer);
      this.swimmers.push(swimmer);
    }

    // 3. Vận động viên lướt sóng ngoài khơi
    this.surfer = BeachAssetBuilder.createSurfer({ boardColor: 0xf97316 });
    this.surfer.position.set(15.5, -4.2, -18.0);
    this.midgroundGroup.add(this.surfer);
  }

  updateWaves(time = 0) {
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

  update(delta, time = 0, scrollY = 0) {
    // 1. Phản hồi Parallax 3 tầng theo nhịp cuộn chuột
    this.foregroundGroup.position.y = this.baseFG_Y + (scrollY * 0.55);
    this.foregroundGroup.position.x = Math.sin(scrollY * 0.04) * 0.7;

    this.midgroundGroup.position.y = this.baseMG_Y + (scrollY * 0.35);
    this.backgroundGroup.position.y = this.baseBG_Y + (scrollY * 0.12);

    // 2. Cập nhật sóng biển động
    this.updateWaves(time);

    // 3. Cập nhật hoạt ảnh nhân vật
    if (this.surfer && this.surfer.userData.update) {
      this.surfer.userData.update(time, -4.2 + Math.sin(time * 2.0) * 0.3);
    }

    for (const swimmer of this.swimmers) {
      if (swimmer.userData.update) swimmer.userData.update(time);
    }

    for (const monkey of this.monkeys) {
      if (monkey.userData.update) monkey.userData.update(time);
    }

    for (let i = 0; i < this.palmTrees.length; i++) {
      const palm = this.palmTrees[i];
      if (palm.userData.update) palm.userData.update(time, i * 0.6);
    }

    // 4. Mây trôi êm ả ngang trời & Parallax cuộn chuột (loại bỏ compound parallax bằng cách trừ 0.12 từ backgroundGroup)
    for (const cloud of this.clouds) {
      cloud.mesh.position.x += cloud.speed * delta;
      if (cloud.mesh.position.x > 75) {
        cloud.mesh.position.x = -75;
        cloud.baseY = 7 + Math.random() * 24;
      }
      cloud.mesh.position.y = cloud.baseY + (scrollY * (cloud.parallaxFactor - 0.12));
    }

    // 5. Hạt bụi nắng lơ lửng nhẹ nhàng ở tầng sâu (Z ~ -22), không xoay vào trường nhìn camera
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= delta * 0.45;
        if (positions[i] < -18) positions[i] = 18;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.rotation.z = Math.sin(time * 0.15) * 0.03;
      this.particles.rotation.y = Math.sin(time * 0.2) * 0.05;
    }
  }

  /**
   * Giải phóng tài nguyên Three.js sạch sẽ khi unmount
   */
  dispose() {
    const disposeGroup = (group) => {
      if (!group) return;
      group.traverse((obj) => {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      group.clear();
    };

    disposeGroup(this.foregroundGroup);
    disposeGroup(this.midgroundGroup);
    disposeGroup(this.backgroundGroup);

    this.scene.remove(this.foregroundGroup);
    this.scene.remove(this.midgroundGroup);
    this.scene.remove(this.backgroundGroup);

    this.clouds = [];
    this.palmTrees = [];
    this.monkeys = [];
    this.swimmers = [];
    this.surfer = null;
    this.particles = null;
  }
}
