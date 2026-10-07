import * as THREE from 'three';

export class Lighting {
  constructor(scene) {
    this.scene = scene;
    this.spotlights = [];
    this.setup();
  }

  setup() {
    // 1. Ambient Light - soft museum / studio fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    // 2. Key Directional Light - crisp comic shadows and highlights
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(6, 12, 14);
    this.scene.add(keyLight);

    // 3. Rim / Cyber Manga Tint Light - subtle back highlight
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-8, -6, 6);
    this.scene.add(rimLight);
  }

  createSpotlight(targetPosition) {
    const spot = new THREE.SpotLight(0xffffff, 1.2);
    spot.position.set(targetPosition.x, targetPosition.y + 3, targetPosition.z + 8);
    spot.angle = Math.PI / 4;
    spot.penumbra = 0.8;
    spot.decay = 1.2;
    spot.distance = 30;

    const targetObj = new THREE.Object3D();
    targetObj.position.copy(targetPosition);
    this.scene.add(targetObj);
    spot.target = targetObj;

    this.scene.add(spot);
    this.spotlights.push({ spot, targetObj });
    return spot;
  }
}
