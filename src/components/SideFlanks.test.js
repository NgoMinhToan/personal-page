import { test } from 'node:test';
import assert from 'node:assert';
import { SideFlanks } from './SideFlanks.js';

test('SideFlanks renders detailed Traveler Sketch models', () => {
  const flanks = new SideFlanks();
  const html = flanks.generateHTML();

  // 1. Kiểm tra 3 trạm cây dừa ký họa
  const palmStationMatches = (html.match(/class="palm-station"/g) || []).length;
  assert.strictEqual(palmStationMatches, 3, 'Must render exactly 3 palm stations');

  // 2. Kiểm tra nét gạch bóng hatching và vân vỏ cây dừa
  assert(html.includes('palm-trunk-sketch'), 'Must include palm trunk sketch elements');
  assert(html.includes('palm-frond-feather'), 'Must include feather-like palm fronds');

  // 3. Kiểm tra 3 chú khỉ với biểu cảm và tư thế sống động
  assert(html.includes('monkey-1'), 'Must render Monkey 1 (high branch wave)');
  assert(html.includes('monkey-2'), 'Must render Monkey 2 (inverted hang)');
  assert(html.includes('monkey-3'), 'Must render Monkey 3 (coconut embrace)');
  assert(html.includes('monkey-eye-sparkle'), 'Monkeys must have expressive sparkle eyes');

  // 4. Kiểm tra Surfer động học và chuyển động ván lướt
  assert(html.includes('doodle-surfer'), 'Must render doodle-surfer');
  assert(html.includes('surfboard-sketch'), 'Must render sketch surfboard');
  assert(html.includes('surf-motion-lines'), 'Must render motion lines behind surfer');

  // 5. Kiểm tra Người tắm phao & Sóng mộc bản
  assert(html.includes('doodle-swimmer'), 'Must render doodle-swimmer with donut float');
  assert(html.includes('wave-trail-hokusai'), 'Must render Hokusai-inspired wave trail');
  assert(html.includes('beach-decor-group'), 'Must render sand castle and umbrella decor');

  // 6. Kiểm tra Parallax và Surfer Tilt bounds
  const parallax = flanks.calculateParallax(500);
  assert(!Number.isNaN(parallax.leftOffset), 'leftOffset must not be NaN');
  assert(!Number.isNaN(parallax.rightOffset), 'rightOffset must not be NaN');
  assert(parallax.surferTilt >= -8 && parallax.surferTilt <= 8, 'surferTilt must be clamped within [-8, 8] deg');
});

test('SideFlanks parallax clamping handles extreme and negative values', () => {
  const flanks = new SideFlanks();
  const negative = flanks.calculateParallax(-100);
  const zero = flanks.calculateParallax(0);
  const extreme = flanks.calculateParallax(99999);

  assert.strictEqual(negative.leftOffset, 0, 'Negative scroll must clamp leftOffset to 0');
  assert.strictEqual(negative.rightOffset, 0, 'Negative scroll must clamp rightOffset to 0');
  assert.strictEqual(zero.leftOffset, 0, 'Zero scroll leftOffset must be 0');
  assert.strictEqual(zero.rightOffset, 0, 'Zero scroll rightOffset must be 0');
  assert.strictEqual(extreme.leftOffset, 4000 * 0.15, 'Extreme scroll leftOffset must clamp to 600');
  assert.strictEqual(extreme.rightOffset, 4000 * 0.22, 'Extreme scroll rightOffset must clamp to 880');
  assert(extreme.surferTilt >= -8 && extreme.surferTilt <= 8, 'Extreme scroll surferTilt must be bounded in [-8, 8]');
});
