import * as THREE from 'three';

export class FarmEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];
    this.trees = [];
    this.pollenParticles = null;

    this.envGroup = new THREE.Group();
    this.envGroup.position.y = -4.8;
    this.scene.add(this.envGroup);

    this.setupSkyAndFog();
    this.setupTerrain();
    this.setupClouds();
    this.setupNatureDetails();
    this.setupFloatingPollen();
  }

  setupSkyAndFog() {
    // Sương mù đường chân trời nông trại màu đồng cỏ ấm
    this.scene.fog = new THREE.FogExp2(0xcae8d5, 0.018);
  }

  setupTerrain() {
    // Mặt đất đồi cỏ uốn lượn mộc mạc
    const geo = new THREE.PlaneGeometry(140, 140, 40, 40);
    geo.rotateX(-Math.PI / 2);

    // Tạo độ nhấp nhô tự nhiên cho đồi cỏ
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Giữ vùng trung tâm phẳng phao để cắm các công trình dự án
      const distFromCenter = Math.sqrt(x * x + z * z);
      const flattenFactor = Math.min(1, Math.max(0, (distFromCenter - 12) / 25));
      const elevation = (Math.sin(x * 0.12) * Math.cos(z * 0.12) * 2.8 + Math.sin(x * 0.05) * 2.0) * flattenFactor;
      pos.setY(i, elevation - 1.5);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: 0x62af31, // Xanh cỏ tươi
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true
    });

    this.terrain = new THREE.Mesh(geo, mat);
    this.terrain.receiveShadow = true;
    this.envGroup.add(this.terrain);

    // Đường mòn đất nung / đá sỏi uốn lượn
    const pathGeo = new THREE.PlaneGeometry(100, 4, 30, 2);
    pathGeo.rotateX(-Math.PI / 2);
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0xd9b382, // Đất sỏi vàng ấm
      roughness: 0.9,
      flatShading: true
    });
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    pathMesh.position.set(0, 0.05, 0);
    pathMesh.rotation.y = 0.15;
    this.envGroup.add(pathMesh);
  }

  setupClouds() {
    // Những đám mây low-poly bồng bềnh
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      flatShading: true
    });

    for (let i = 0; i < 12; i++) {
      const cloudGroup = new THREE.Group();
      const numPuffs = 4 + Math.floor(Math.random() * 3);

      for (let j = 0; j < numPuffs; j++) {
        const r = 1.2 + Math.random() * 1.4;
        const puffGeo = new THREE.DodecahedronGeometry(r, 1);
        const puff = new THREE.Mesh(puffGeo, cloudMat);
        puff.position.set(
          (j - numPuffs / 2) * 1.5 + (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.8
        );
        cloudGroup.add(puff);
      }

      cloudGroup.position.set(
        (Math.random() - 0.5) * 100,
        14 + Math.random() * 8,
        (Math.random() - 0.5) * 80
      );

      this.scene.add(cloudGroup);
      this.clouds.push({
        mesh: cloudGroup,
        speed: 0.8 + Math.random() * 1.2
      });
    }
  }

  setupNatureDetails() {
    // Tạo cụm cây và hoa rực rỡ ở rìa trang trại
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.9 });
    const leavesMat1 = new THREE.MeshStandardMaterial({ color: 0x2e8540, roughness: 0.8, flatShading: true });
    const leavesMat2 = new THREE.MeshStandardMaterial({ color: 0x48a860, roughness: 0.8, flatShading: true });

    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const radius = 24 + Math.random() * 15;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const tree = new THREE.Group();
      // Thân cây
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3.2, 6);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.6;
      tree.add(trunk);

      // Tán cây low-poly
      const foliageGeo = new THREE.DodecahedronGeometry(2.0, 1);
      const leaves = new THREE.Mesh(foliageGeo, i % 2 === 0 ? leavesMat1 : leavesMat2);
      leaves.position.y = 3.6;
      tree.add(leaves);

      tree.position.set(x, 0, z);
      tree.scale.setScalar(0.8 + Math.random() * 0.5);
      this.envGroup.add(tree);
      this.trees.push(tree);
    }

    // Các khóm hoa dại rực rỡ
    const flowerColors = [0xff4d4d, 0xffd11a, 0xffffff, 0xff80bf];
    for (let i = 0; i < 40; i++) {
      const flowerGeo = new THREE.DodecahedronGeometry(0.18, 0);
      const flowerMat = new THREE.MeshBasicMaterial({
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)]
      });
      const flower = new THREE.Mesh(flowerGeo, flowerMat);
      flower.position.set(
        (Math.random() - 0.5) * 45,
        0.1,
        (Math.random() - 0.5) * 45
      );
      this.envGroup.add(flower);
    }
  }

  setupFloatingPollen() {
    // Hạt phấn hoa / hoa bồ công anh lơ lửng trong gió nắng
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 60;
      pos[i + 1] = Math.random() * 12;
      pos[i + 2] = (Math.random() - 0.5) * 60;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xfff4b8, // Ánh nắng vàng bồ công anh
      size: 0.16,
      transparent: true,
      opacity: 0.75
    });

    this.pollenParticles = new THREE.Points(geo, mat);
    this.scene.add(this.pollenParticles);
  }

  update(delta, time, scrollY = 0) {
    // 0. Parallax nhẹ nhàng cho địa hình nền đồi cỏ phía sau
    this.envGroup.position.y = -4.8 + (scrollY * 0.12);

    // 1. Mây trôi êm ả
    for (const cloud of this.clouds) {
      cloud.mesh.position.x += cloud.speed * delta;
      if (cloud.mesh.position.x > 55) {
        cloud.mesh.position.x = -55;
      }
    }

    // 2. Cây rung rinh theo gió
    for (let i = 0; i < this.trees.length; i++) {
      this.trees[i].rotation.z = Math.sin(time * 1.5 + i) * 0.03;
    }

    // 3. Phấn hoa bay bồng bềnh
    if (this.pollenParticles) {
      const positions = this.pollenParticles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= delta * 0.4;
        if (positions[i] < 0) positions[i] = 12;
      }
      this.pollenParticles.geometry.attributes.position.needsUpdate = true;
      this.pollenParticles.rotation.y = time * 0.015;
    }
  }
}
