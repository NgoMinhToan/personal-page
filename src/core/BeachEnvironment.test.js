import assert from 'node:assert';
import * as THREE from 'three';
import { BeachEnvironment } from './BeachEnvironment.js';

console.log('Testing BeachEnvironment: Sky, Sun and Clouds...');

const mockScene = new THREE.Scene();
const env = new BeachEnvironment(mockScene);

// Test 1: Sky color and Fog
assert(mockScene.background instanceof THREE.Color, 'Scene background must be a THREE.Color');
assert(mockScene.fog instanceof THREE.FogExp2, 'Scene fog must be FogExp2');

// Test 2: Clouds count must be >= 40
assert(Array.isArray(env.clouds), 'env.clouds must be an array');
assert(env.clouds.length >= 40, `Must have at least 40 cloud clusters, got ${env.clouds.length}`);

// Test 3: Sun mesh exists in background group
assert(env.sunMesh instanceof THREE.Mesh, 'env.sunMesh must exist');

// Test 4: updateClouds advances positions and wraps around smoothly
const firstCloud = env.clouds[0];
firstCloud.mesh.position.x = 76; // Force out of bounds
env.update(0.016, 1.0, 50.0);
assert(firstCloud.mesh.position.x <= -70, 'Cloud must wrap around to left edge when exceeding +75');
assert(!Number.isNaN(firstCloud.mesh.position.y), 'Cloud Y position must not be NaN');

console.log('✓ Sky, Sun, and Cloud tests passed!');

console.log('Testing BeachEnvironment: Terrains and Ocean Wave Engine...');

// Test 5: Hill and Sand terrains exist
assert(env.hillMesh instanceof THREE.Mesh, 'Hill mesh must exist on the left');
assert(env.sandMesh instanceof THREE.Mesh, 'Sand mesh must exist on the right');
assert(env.hillMesh.position.x < 0, 'Hill mesh must be on the left side (x < 0)');
assert(env.sandMesh.position.x > -5, 'Sand mesh must transition to the right side');

// Test 6: Ocean Wave Mesh
assert(env.waterMesh instanceof THREE.Mesh, 'Water mesh must exist');
const wavePositions = env.waterMesh.geometry.attributes.position;
assert(wavePositions.count >= 2000, `Water mesh must have detailed grid, got ${wavePositions.count}`);

// Test 7: updateWaves modifies vertex Z without producing NaN
const zBefore = wavePositions.getZ(100);
env.updateWaves(2.5);
const zAfter = wavePositions.getZ(100);
assert(!Number.isNaN(zAfter), 'Wave vertex Z must not be NaN');
assert(zBefore !== zAfter || zAfter !== 0, 'Wave vertex Z should be calculated dynamically');

console.log('✓ Terrain and Ocean Wave tests passed!');

console.log('Testing BeachEnvironment: Full Asset Population & Parallax Engine...');

// Test 8: Palm trees and monkeys populated
assert(env.palmTrees.length >= 6, `Must have at least 6 palm trees, got ${env.palmTrees.length}`);
assert(env.monkeys.length >= 2, `Must have at least 2 monkeys, got ${env.monkeys.length}`);

// Test 9: Surfer and Swimmers populated
assert(env.surfer instanceof THREE.Group, 'Surfer must exist in scene');
assert(env.swimmers.length >= 3, `Must have at least 3 swimmers, got ${env.swimmers.length}`);

// Test 10: 3-Layer Parallax Response on Scroll
const initialFG_Y = env.foregroundGroup.position.y;
const initialMG_Y = env.midgroundGroup.position.y;
const initialBG_Y = env.backgroundGroup.position.y;

// Simulate scroll Y = 100
env.update(0.016, 2.0, 100);

const deltaFG = env.foregroundGroup.position.y - initialFG_Y;
const deltaMG = env.midgroundGroup.position.y - initialMG_Y;
const deltaBG = env.backgroundGroup.position.y - initialBG_Y;

// Foreground factor (0.55) > Midground (0.35) > Background (0.12)
assert(deltaFG > deltaMG, 'Foreground must move faster than Midground');
assert(deltaMG > deltaBG, 'Midground must move faster than Background');
assert(!Number.isNaN(deltaFG) && !Number.isNaN(deltaMG) && !Number.isNaN(deltaBG), 'Parallax deltas must not be NaN');

// Test 11: Mist particles stay strictly in background (world Z < 5.0)
env.update(0.016, 25.0, 0);
const mistPositions = env.particles.geometry.attributes.position.array;
for (let i = 2; i < mistPositions.length; i += 3) {
  const worldZ = mistPositions[i] + env.particles.position.z + env.backgroundGroup.position.z;
  assert(worldZ < 5.0, `Mist particle world Z must remain in background (< 5.0), got ${worldZ}`);
}

// Test 12: Cloud 3-tier distribution
const lowTier = env.clouds.filter(c => c.tier === 'low');
const midTier = env.clouds.filter(c => c.tier === 'mid');
const highTier = env.clouds.filter(c => c.tier === 'high');
assert(lowTier.length === 14, `Low tier must have 14 clouds, got ${lowTier.length}`);
assert(midTier.length === 16, `Mid tier must have 16 clouds, got ${midTier.length}`);
assert(highTier.length === 12, `High tier must have 12 clouds, got ${highTier.length}`);

// Test 13: Cloud effective world Y movement matches parallaxFactor
const c0 = env.clouds[0];
const y0Before = c0.mesh.position.y + env.backgroundGroup.position.y;
env.update(0.016, 1.0, 100);
const y0After = c0.mesh.position.y + env.backgroundGroup.position.y;
const effectiveDelta = y0After - y0Before;
assert(
  Math.abs(effectiveDelta - (100 * c0.parallaxFactor)) < 0.01,
  `Effective cloud movement should be ${100 * c0.parallaxFactor}, got ${effectiveDelta}`
);

// Test 14: dispose() method lifecycle
assert(typeof env.dispose === 'function', 'env.dispose must be a function');
env.dispose();
assert(mockScene.children.length === 0, 'mockScene should have no children after dispose');

console.log('✓ Full Asset Population and Parallax Engine tests passed!');
