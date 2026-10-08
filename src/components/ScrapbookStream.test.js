import { test } from 'node:test';
import assert from 'node:assert';
import { ScrapbookStream, getProjectSketchBadge } from './ScrapbookStream.js';
import { portfolioData } from '../data/portfolioData.js';

test('ScrapbookStream renders individual sketch badge for each project', () => {
  const stream = new ScrapbookStream({ projects: portfolioData.projects });
  const html = stream.generateHTML();

  // 1. Kiểm tra có 16 thẻ dự án kèm 16 con dấu ký họa
  const badgeMatches = (html.match(/class="project-sketch-badge-icon"/g) || []).length;
  assert.strictEqual(badgeMatches, 16, 'Must render exactly 16 sketch badge icons');

  // 2. Kiểm tra các icon ký họa đặc trưng
  assert(html.includes('badge-windmill'), 'Must have windmill sketch badge');
  assert(html.includes('badge-orchard'), 'Must have orchard apple sketch badge');
  assert(html.includes('badge-garden'), 'Must have garden carrot sketch badge');

  // 3. Kiểm tra fallback badge an toàn khi farmType lạ
  const fallbackHtml = stream.generateCardHTML({ id: 'test', title: 'Test', farmType: 'unknown' }, 0);
  assert(fallbackHtml.includes('badge-default-star'), 'Must fallback to default star sketch badge');
});

test('ScrapbookStream provides distinct sketch badges for all 16 farmTypes', () => {
  const stream = new ScrapbookStream({ projects: portfolioData.projects });
  const allFarmTypes = [
    'windmill', 'orchard', 'garden', 'well',
    'cart', 'campfire', 'barn', 'beehive',
    'sheep', 'tractor', 'greenhouse', 'sunflower',
    'scarecrow', 'watermill', 'silo', 'duckpond'
  ];

  for (const farmType of allFarmTypes) {
    const badgeHtml = stream.getProjectSketchBadge(farmType);
    assert(badgeHtml.includes(`badge-${farmType}`), `Must contain badge-${farmType}`);
    assert(badgeHtml.includes('class="project-sketch-badge-icon"'), 'Must have badge icon wrapper');
    assert(badgeHtml.includes('viewBox="0 0 36 36"'), 'Must have 36x36 viewBox');
  }

  // Standalone exported function test
  assert(getProjectSketchBadge('campfire').includes('badge-campfire'));
  assert(getProjectSketchBadge('unknown').includes('badge-default-star'));
});

test('ScrapbookStream generates valid HTML and cards', () => {
  const stream = new ScrapbookStream({ projects: portfolioData.projects });
  const html = stream.generateHTML();

  assert(typeof html === 'string', 'generateHTML must return string');
  assert(html.includes('scrapbook-stream'), 'Must contain scrapbook-stream container');
  assert(html.includes('paper-project-card'), 'Must contain paper-project-card elements');

  // Test card count matches 16 projects
  const cardCount = (html.match(/paper-project-card/g) || []).length;
  assert.strictEqual(cardCount, 16, `Must render 16 project cards, got ${cardCount}`);

  // Test empty filter produces friendly doodle message
  const emptyHtml = stream.generateHTML([]);
  assert(emptyHtml.includes('scrapbook-empty-state'), 'Must render empty state message when no matches');
});

test('ScrapbookStream handles event listener single binding', () => {
  let listenerCount = 0;
  const mockContainer = {
    innerHTML: '',
    addEventListener(event, fn) {
      if (event === 'click') listenerCount++;
    }
  };
  const streamWithContainer = new ScrapbookStream({ projects: portfolioData.projects });
  streamWithContainer.render(mockContainer);
  assert.strictEqual(listenerCount, 1, 'Initial render must attach exactly 1 click listener');
  streamWithContainer.filterBySkill('threejs');
  streamWithContainer.filterBySkill('all');
  assert.strictEqual(listenerCount, 1, 'Filtering must NOT attach duplicate click listeners to container');
});
