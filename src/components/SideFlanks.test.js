import assert from 'node:assert';
import { SideFlanks } from './SideFlanks.js';

console.log('Testing SideFlanks...');

const flanks = new SideFlanks();
const html = flanks.generateHTML();

assert(typeof html === 'string', 'generateHTML must return string');
assert(html.includes('side-flank-left'), 'Must have side-flank-left container');
assert(html.includes('side-flank-right'), 'Must have side-flank-right container');
assert(html.includes('doodle-monkey'), 'Must have doodle-monkey elements');
assert(html.includes('doodle-surfer'), 'Must have doodle-surfer element');
assert(html.includes('doodle-swimmer'), 'Must have doodle-swimmer element');

// Test scroll clamping (Review Focus #5)
const normalTransform = flanks.calculateParallax(250);
const negativeTransform = flanks.calculateParallax(-100);
assert(!Number.isNaN(normalTransform.leftOffset), 'Left offset must not be NaN');
assert(negativeTransform.leftOffset >= 0, 'Negative scroll must be clamped >= 0');

console.log('✓ SideFlanks tests passed!');
