import * as THREE from 'three';

export class Lighting {
  constructor(scene) {
    this.scene = scene;
    this.setup();
  }

  setup() {
    // 1. Ánh sáng vòm trời & bãi biển nhiệt đới (Hemisphere Light)
    // Vòm trời xanh biển tươi sáng + bãi cát vàng phản xạ
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0xfde047, 1.25);
    hemiLight.position.set(0, 30, 0);
    this.scene.add(hemiLight);

    // 2. Ánh nắng mặt trời nhiệt đới vàng ấm rực rỡ (Sunlight)
    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.85);
    sunLight.position.set(18, 28, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    this.scene.add(sunLight);

    // 3. Ánh sáng môi trường nhẹ bổ sung
    const ambientLight = new THREE.AmbientLight(0xe0f2fe, 0.55);
    this.scene.add(ambientLight);
  }
}
