import { test } from 'node:test';
import assert from 'node:assert';
import { StickyBeach } from './StickyBeach.js';

test('StickyBeach renders woodblock-style ink waves and stippling sand', () => {
  const beach = new StickyBeach();
  const svg = beach.generateSVG();

  // 1. Kiểm tra sóng biển nét mực uốn lượn mộc bản
  assert(svg.includes('wave-woodblock-ink'), 'Must include woodblock-style ink wave curves');
  assert(svg.includes('wave-foam-sketch'), 'Must include hand-drawn wave foam stroke');

  // 2. Kiểm tra bờ cát có kỹ thuật chấm hạt stippling
  assert(svg.includes('sand-stippling-dots'), 'Must include stippling sand grain dots');

  // 3. Kiểm tra sò biển và sao biển ký họa bút kim
  assert(svg.includes('doodle-seashell-sketch'), 'Must include sketch seashell');
  assert(svg.includes('doodle-starfish-sketch'), 'Must include sketch starfish');
  assert(svg.includes('aria-hidden="true"'), 'Must have aria-hidden="true"');
});

test('StickyBeach preserves CSS compatibility classes and structure', () => {
  const beach = new StickyBeach();
  const svg = beach.generateSVG();

  // Kiểm tra cấu trúc wrapper và lớp phục vụ CSS animation
  assert(svg.includes('id="sticky-beach-wrapper"'), 'Must have id="sticky-beach-wrapper"');
  assert(svg.includes('sticky-beach-wrapper'), 'Must have sticky-beach-wrapper class');
  assert(svg.includes('beach-svg'), 'Must have beach-svg class');
  assert(svg.includes('ocean-wave-layer'), 'Must include ocean-wave-layer for CSS animation');
  assert(svg.includes('wave-deep'), 'Must include wave-deep for waveSwayDeep animation');
  assert(svg.includes('wave-shallow'), 'Must include wave-shallow for waveSwayShallow animation');
  assert(svg.includes('beach-sand-layer'), 'Must include beach-sand-layer');
  assert(svg.includes('doodle-seashell'), 'Must include doodle-seashell class');
  assert(svg.includes('doodle-starfish'), 'Must include doodle-starfish class');
});
