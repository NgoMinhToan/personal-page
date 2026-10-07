import * as THREE from 'three';

export class Lighting {
  constructor(scene) {
    this.scene = scene;
    this.setup();
  }

  setup() {
    // 1. Ánh sáng vòm trời & mặt đất (Hemisphere Light)
    // Bầu trời xanh pastel rực rỡ + mặt đất cỏ xanh phản xạ
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x556b2f, 1.3);
    hemiLight.position.set(0, 30, 0);
    this.scene.add(hemiLight);

    // 2. Ánh nắng mặt trời vàng ấm (Warm Sunlight)
    const sunLight = new THREE.DirectionalLight(0xfff5d6, 1.8);
    sunLight.position.set(16, 26, 14);
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
    const ambientLight = new THREE.AmbientLight(0xffeedb, 0.45);
    this.scene.add(ambientLight);
  }
}
