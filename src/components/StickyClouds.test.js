import assert from 'node:assert';
import { StickyClouds } from './StickyClouds.js';

console.log('Testing StickyClouds...');

const clouds = new StickyClouds();
const svgHtml = clouds.generateSVG();

assert(typeof svgHtml === 'string', 'generateSVG must return an HTML/SVG string');
assert(svgHtml.includes('<svg'), 'Output must contain an <svg> tag');
assert(svgHtml.includes('sticky-cloud'), 'Output must contain sticky-cloud class elements');
assert(svgHtml.includes('doodle-sun'), 'Output must contain doodle-sun element');

console.log('✓ StickyClouds generation test passed!');
