import * as THREE from 'three';

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.callbacks = [];

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 15);
    this.scene.add(this.camera);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 4. Resize listener
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);

    // 5. Animation loop
    this.clock = new THREE.Clock();
    this.isPaused = false;
    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  onUpdate(callback) {
    this.callbacks.push(callback);
  }

  render() {
    if (!this.isPaused) {
      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      for (let i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i](delta, time);
      }

      this.renderer.render(this.scene, this.camera);
    }
    requestAnimationFrame(this.render);
  }

  destroy() {
    this.isPaused = true;
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
  }
}
