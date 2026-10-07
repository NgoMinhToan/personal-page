import * as THREE from 'three';

export class MangaEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.particles = null;
    this.setupFog();
    this.setupBackdrop();
    this.setupParticles();
  }

  setupFog() {
    this.scene.fog = new THREE.FogExp2(0x08090d, 0.022);
  }

  setupBackdrop() {
    // Halftone screentone canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#08090d';
    ctx.fillRect(0, 0, 128, 128);

    // Subtle polka dot halftone dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let x = 8; x < 128; x += 16) {
      for (let y = 8; y < 128; y += 16) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(24, 24);

    const bgGeo = new THREE.PlaneGeometry(80, 60);
    const bgMat = new THREE.MeshBasicMaterial({
      map: texture,
      depthWrite: false
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.set(0, 0, -8);
    this.scene.add(bgMesh);
  }

  setupParticles() {
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 15;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.35
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  update(delta, time) {
    if (this.particles) {
      this.particles.rotation.y = time * 0.02;
      this.particles.rotation.x = Math.sin(time * 0.01) * 0.05;
    }
  }
}
