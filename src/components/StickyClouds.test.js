import { test } from 'node:test';
import assert from 'node:assert';
import { StickyClouds } from './StickyClouds.js';

test('StickyClouds renders double-line ink clouds and watercolor sun', () => {
  const clouds = new StickyClouds();
  const svg = clouds.generateSVG();

  // 1. Kiểm tra cấu trúc mây nét viền kép và gạch bóng
  assert(svg.includes('cloud-double-line'), 'Must include double-line cloud outlines');
  assert(svg.includes('cloud-hatching-belly'), 'Must include hatching shade lines under cloud belly');

  // 2. Kiểm tra mặt trời ký họa nét mực và vệt màu nước
  assert(svg.includes('doodle-sun-sketch'), 'Must include sketch sun element');
  assert(svg.includes('sun-watercolor-glow'), 'Must include watercolor sun glow');
  assert(svg.includes('sun-freehand-rays'), 'Must include freehand ink rays');
  assert(svg.includes('aria-hidden="true"'), 'Must have aria-hidden="true"');
});

test('StickyClouds preserves SVG wrapper structure and accessibility', () => {
  const clouds = new StickyClouds();
  const svg = clouds.generateSVG();

  assert(svg.includes('id="sticky-clouds-wrapper"'), 'Must have id="sticky-clouds-wrapper"');
  assert(svg.includes('class="sticky-clouds-wrapper"'), 'Must have class="sticky-clouds-wrapper"');
  assert(svg.includes('clouds-svg'), 'Must have clouds-svg class');
  assert(svg.includes('viewBox="0 0 1440 120"'), 'Must have correct viewBox');
  assert(svg.includes('sticky-cloud'), 'Must contain sticky-cloud class elements');
  assert(svg.includes('doodle-sun'), 'Must contain doodle-sun element');
});
