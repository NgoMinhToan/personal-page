import * as THREE from 'three';

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.callbacks = [];

    // 1. Scene với bầu trời xanh nắng ấm
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x38bdf8);

    // 2. Camera góc phối cảnh rộng rãi
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 11.5);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    // 3. Renderer tối ưu bóng đổ và màu sắc chân thực
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // 4. Resize listener
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);

    // 5. Render loop
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
