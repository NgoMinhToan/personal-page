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

  update(delta, time, scrollY = 0) {
    // Cập nhật sóng biển động
    this.updateWaves(time);

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
