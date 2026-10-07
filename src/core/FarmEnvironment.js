import * as THREE from 'three';

export class FarmEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];
    this.particles = null;

    this.setupSkyAndFog();
    this.setupBeachBackdrop();
    this.setupAbundantClouds();
    this.setupSunlightMist();
  }

  setupSkyAndFog() {
    // Trời xanh thẳm nhiệt đới rực rỡ nắng vàng (Brilliant Deep Azure Sky)
    this.scene.background = new THREE.Color(0x38bdf8);
    this.scene.fog = new THREE.FogExp2(0x7dd3fc, 0.009);
  }

  setupBeachBackdrop() {
    // 1. Nhóm chứa bức tranh bãi biển chuyển động Parallax mạnh mẽ khi cuộn
    this.beachGroup = new THREE.Group();
    this.scene.add(this.beachGroup);

    // 2. Load bức tranh bãi biển anime tuyệt đẹp
    const loader = new THREE.TextureLoader();
    loader.load('/beach_paradise.jpg', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Kích thước chuẩn tỉ lệ 16:9 bao trọn tầm nhìn camera
      const width = 58;
      const height = 32.6;
      const geo = new THREE.PlaneGeometry(width, height);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        depthWrite: false
      });

      this.beachMesh = new THREE.Mesh(geo, mat);
      this.baseBackdropY = -2.0;
      this.baseBackdropX = 0;
      this.beachMesh.position.set(0, this.baseBackdropY, -18.0);
      this.beachGroup.add(this.beachMesh);
    });
  }

  setupAbundantClouds() {
    // Tạo rất nhiều đám mây trắng bồng bềnh lơ lửng khắp bầu trời xanh
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      flatShading: true
    });

    // 32 cụm mây đa tầng độ sâu
    for (let i = 0; i < 32; i++) {
      const cloudGroup = new THREE.Group();
      const numPuffs = 4 + Math.floor(Math.random() * 4);

      for (let j = 0; j < numPuffs; j++) {
        const r = 1.3 + Math.random() * 1.6;
        const puffGeo = new THREE.DodecahedronGeometry(r, 1);
        const puff = new THREE.Mesh(puffGeo, cloudMat);
        puff.position.set(
          (j - numPuffs / 2) * 1.6 + (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.8
        );
        cloudGroup.add(puff);
      }

      const baseX = (Math.random() - 0.5) * 120;
      const baseY = 8 + Math.random() * 22;
      const baseZ = -30 + Math.random() * 26;

      cloudGroup.position.set(baseX, baseY, baseZ);
      this.scene.add(cloudGroup);

      this.clouds.push({
        mesh: cloudGroup,
        baseX: baseX,
        baseY: baseY,
        speed: 0.9 + Math.random() * 1.6,
        parallaxFactor: 0.18 + Math.random() * 0.28 // Parallax riêng biệt cho từng tầng mây
      });
    }
  }

  setupSunlightMist() {
    // Hạt bụi nắng và bọt biển lấp lánh trong làn gió nhiệt đới
    const count = 260;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 70;
      pos[i + 1] = (Math.random() - 0.5) * 35;
      pos[i + 2] = -12 + Math.random() * 20;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      transparent: true,
      opacity: 0.85
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  update(delta, time, scrollY = 0) {
    // 1. Chuyển động Parallax MẠNH MẼ cho bức tranh bãi biển khi scroll (Yêu cầu 4)
    if (this.beachMesh) {
      // Khi scroll, bức tranh trôi theo trục Y với hệ số 0.48 rõ rệt
      this.beachMesh.position.y = this.baseBackdropY + (scrollY * 0.48);
      // Hiệu ứng lướt ngang nhẹ nhàng theo nhịp cuộn tạo cảm giác sóng dập dềnh
      this.beachMesh.position.x = this.baseBackdropX + Math.sin(scrollY * 0.08) * 1.6;
      // Nhịp thở bồng bềnh tự nhiên của sóng biển
      const waveBreath = 1.0 + Math.sin(time * 0.6) * 0.012;
      this.beachMesh.scale.set(waveBreath, waveBreath, 1);
    }

    // 2. Mây trôi êm ả ngang trời và chuyển động Parallax theo độ cao khi scroll
    for (const cloud of this.clouds) {
      cloud.mesh.position.x += cloud.speed * delta;
      if (cloud.mesh.position.x > 65) {
        cloud.mesh.position.x = -65;
      }
      // Parallax dọc theo cuộn chuột cho từng đám mây
      cloud.mesh.position.y = cloud.baseY + (scrollY * cloud.parallaxFactor);
    }

    // 3. Hạt bụi nắng và bọt sóng lơ lửng trong gió
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= delta * 0.5;
        if (positions[i] < -15) positions[i] = 18;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.rotation.y = time * 0.02;
    }
  }
}
