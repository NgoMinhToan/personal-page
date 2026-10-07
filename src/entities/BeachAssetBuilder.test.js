import assert from 'node:assert';
import * as THREE from 'three';
import { BeachAssetBuilder } from './BeachAssetBuilder.js';

console.log('Testing BeachAssetBuilder: Palm Tree and Monkey...');

// Test 1: createPalmTree returns valid THREE.Group with meshes
const palm = BeachAssetBuilder.createPalmTree({ height: 5.5, leafCount: 7 });
assert(palm instanceof THREE.Group, 'Palm tree must be a THREE.Group');
assert(palm.children.length >= 2, 'Palm tree must have trunk and leaves groups/meshes');

// Check that materials use flatShading and no NaN
let hasFlatShading = false;
palm.traverse((child) => {
  if (child.isMesh && child.material) {
    if (child.material.flatShading) hasFlatShading = true;
    assert(!Number.isNaN(child.position.x), 'Child position X must not be NaN');
    assert(!Number.isNaN(child.position.y), 'Child position Y must not be NaN');
    assert(!Number.isNaN(child.position.z), 'Child position Z must not be NaN');
  }
});
assert(hasFlatShading, 'Palm tree must utilize flatShading materials');

// Test 2: createMonkey returns valid THREE.Group with update animation hook
const monkey = BeachAssetBuilder.createMonkey();
assert(monkey instanceof THREE.Group, 'Monkey must be a THREE.Group');
assert(typeof monkey.userData.update === 'function', 'Monkey must have userData.update animation function');

// Run monkey animation update to ensure no NaN
monkey.userData.update(1.5);
assert(!Number.isNaN(monkey.rotation.y), 'Monkey rotation must remain valid after update');

console.log('✓ Palm tree and Monkey tests passed successfully!');

console.log('Testing BeachAssetBuilder: Surfer, Swimmer, and Beach Decor...');

// Test 3: createSurfer
const surfer = BeachAssetBuilder.createSurfer({ boardColor: 0xf97316 });
assert(surfer instanceof THREE.Group, 'Surfer must be a THREE.Group');
assert(typeof surfer.userData.update === 'function', 'Surfer must have update function');
surfer.userData.update(2.0, 1.2);
assert(!Number.isNaN(surfer.rotation.x), 'Surfer pitch must not be NaN');
assert(!Number.isNaN(surfer.rotation.z), 'Surfer roll must not be NaN');

// Test 4: createSwimmer
const swimmer = BeachAssetBuilder.createSwimmer({ ringColor: 0xef4444 });
assert(swimmer instanceof THREE.Group, 'Swimmer must be a THREE.Group');
assert(typeof swimmer.userData.update === 'function', 'Swimmer must have update function');
swimmer.userData.update(1.0);
assert(!Number.isNaN(swimmer.position.y), 'Swimmer Y position must not be NaN');

// Test 4b: Swimmer preserves baseY when position.y is assigned externally
const placedSwimmer = BeachAssetBuilder.createSwimmer({ ringColor: 0x3b82f6 });
placedSwimmer.position.set(10, -4.8, -16);
placedSwimmer.userData.update(1.0);
assert(
  Math.abs(placedSwimmer.position.y - (-4.8)) < 0.3,
  `Swimmer position.y should stay near -4.8, got ${placedSwimmer.position.y}`
);

// Test 5: createKidsOnBeach (Kids, Sandcastle, Umbrella, Beachball)
const decor = BeachAssetBuilder.createKidsOnBeach();
assert(decor instanceof THREE.Group, 'Beach decor must be a THREE.Group');
assert(decor.children.length >= 4, 'Beach decor must have kid, castle, umbrella, and ball');

console.log('✓ All BeachAssetBuilder character and decor tests passed!');
