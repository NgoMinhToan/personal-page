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
