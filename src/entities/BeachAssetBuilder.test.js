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
