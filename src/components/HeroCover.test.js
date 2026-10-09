import assert from 'node:assert';
import { HeroCover } from './HeroCover.js';
import { portfolioData } from '../data/portfolioData.js';

console.log('Testing HeroCover component...');

const hero = new HeroCover({ profile: portfolioData.profile });
const html = hero.generateHTML();

assert(typeof html === 'string', 'generateHTML must return string');
assert(html.includes('hero-scrapbook-cover'), 'Must contain hero-scrapbook-cover container');
assert(html.includes('polaroid-photo-frame'), 'Must contain polaroid-photo-frame for avatar');
assert(html.includes(portfolioData.profile.name), 'Must display author name');
assert(html.includes(portfolioData.profile.title), 'Must display author title');
assert(html.includes('sticky-stat-note'), 'Must contain sticky stat notes');
assert(html.includes('hero-social-stamp'), 'Must contain social action stamps');

// Test render into mock container
const mockContainer = { innerHTML: '' };
hero.render(mockContainer);
assert(mockContainer.innerHTML.includes('hero-scrapbook-cover'), 'render() must inject HTML into container');

console.log('✓ HeroCover tests passed successfully!');
