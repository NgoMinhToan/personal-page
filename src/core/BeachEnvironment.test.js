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
