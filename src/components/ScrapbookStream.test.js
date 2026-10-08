import assert from 'node:assert';
import { ScrapbookStream } from './ScrapbookStream.js';
import { portfolioData } from '../data/portfolioData.js';

console.log('Testing ScrapbookStream...');

const stream = new ScrapbookStream({ projects: portfolioData.projects });
const html = stream.generateHTML();

assert(typeof html === 'string', 'generateHTML must return string');
assert(html.includes('scrapbook-stream'), 'Must contain scrapbook-stream container');
assert(html.includes('paper-project-card'), 'Must contain paper-project-card elements');

// Test card count matches 16 projects
const cardCount = (html.match(/paper-project-card/g) || []).length;
assert.strictEqual(cardCount, 16, `Must render 16 project cards, got ${cardCount}`);

// Test empty filter produces friendly doodle message (Review Focus #1)
const emptyHtml = stream.generateHTML([]);
assert(emptyHtml.includes('scrapbook-empty-state'), 'Must render empty state message when no matches');

console.log('✓ ScrapbookStream tests passed!');
