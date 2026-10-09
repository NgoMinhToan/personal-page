import assert from 'node:assert';
import { StationeryHUD } from './StationeryHUD.js';
import { portfolioData } from '../data/portfolioData.js';

console.log('Testing StationeryHUD...');

const hud = new StationeryHUD({ skills: portfolioData.skills });
const html = hud.generateHTML();

assert(typeof html === 'string', 'generateHTML must return string');
assert(html.includes('stationery-ruler-hud'), 'Must have stationery-ruler-hud container');
assert(html.includes('ruler-ticks'), 'Must have ruler measurement ticks');
assert(html.includes('DỰ ÁN'), 'Must have title "DỰ ÁN"');
assert(html.includes('data-skill="all"'), 'Must have "Tất cả" filter badge');
assert(html.includes('stationery-search-input'), 'Must have instant search input');

console.log('✓ StationeryHUD tests passed!');
