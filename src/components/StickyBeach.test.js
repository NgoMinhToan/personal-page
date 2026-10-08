import assert from 'node:assert';
import { StickyBeach } from './StickyBeach.js';

console.log('Testing StickyBeach...');

const beach = new StickyBeach();
const svgHtml = beach.generateSVG();

assert(typeof svgHtml === 'string', 'generateSVG must return string');
assert(svgHtml.includes('sticky-beach-wrapper'), 'Must have sticky-beach-wrapper class');
assert(svgHtml.includes('beach-sand-layer'), 'Must contain beach-sand-layer');
assert(svgHtml.includes('ocean-wave-layer'), 'Must contain ocean-wave-layer');
assert(svgHtml.includes('doodle-seashell'), 'Must contain doodle-seashell or starfish decor');

console.log('✓ StickyBeach test passed!');
