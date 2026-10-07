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
