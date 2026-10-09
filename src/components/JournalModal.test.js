import assert from 'node:assert';
import { JournalModal } from './JournalModal.js';
import { portfolioData } from '../data/portfolioData.js';

console.log('Testing JournalModal...');

const modal = new JournalModal();
const sampleProject = portfolioData.projects[0];
const html = modal.generateModalHTML(sampleProject);

assert(typeof html === 'string', 'generateModalHTML must return string');
assert(html.includes('journal-modal-backdrop'), 'Must contain journal-modal-backdrop');
assert(html.includes('journal-page-left'), 'Must have left page for image showcase');
assert(html.includes('journal-page-right'), 'Must have right page for details');
assert(html.includes('paper-clip-close'), 'Must have paper clip close button');

// Review Focus #4: Missing image fallback verification
const projectNoImage = { ...sampleProject, image: null };
const fallbackHtml = modal.generateModalHTML(projectNoImage);
assert(fallbackHtml.includes('doodle-image-placeholder'), 'Must provide doodle placeholder when image missing');

// Accessibility test: role="dialog" and aria-modal="true"
assert(html.includes('role="dialog"'), 'Must have role="dialog"');
assert(html.includes('aria-modal="true"'), 'Must have aria-modal="true"');

// Accessibility test: aria-hidden toggling on container
const mockContainer = {
  innerHTML: '',
  attributes: { 'aria-hidden': 'true' },
  classList: {
    remove: () => {},
    add: () => {}
  },
  setAttribute(k, v) { this.attributes[k] = String(v); },
  getAttribute(k) { return this.attributes[k]; },
  querySelector: () => null
};
const modalWithContainer = new JournalModal({ container: mockContainer });
modalWithContainer.open(sampleProject);
assert.strictEqual(mockContainer.getAttribute('aria-hidden'), 'false', 'Opening modal must set aria-hidden to false');
modalWithContainer.close();
assert.strictEqual(mockContainer.getAttribute('aria-hidden'), 'true', 'Closing modal must restore aria-hidden to true');

assert(html.includes('journal-nav-ribbon'), 'Must have journal navigation ribbons');
assert(html.includes('ribbon-prev'), 'Must have prev ribbon button');
assert(html.includes('ribbon-next'), 'Must have next ribbon button');
assert(!html.includes('page-number-folio'), 'Must remove page-number-folio in modal');
assert(!html.includes('journal-page-turn-hint'), 'Must remove journal-page-turn-hint in modal');

// Test next and prev navigation
const modalWithProjects = new JournalModal({
  projects: portfolioData.projects,
  container: mockContainer
});
modalWithProjects.open(portfolioData.projects[0]);
assert.strictEqual(modalWithProjects.currentIndex, 0, 'Initial index must be 0');
modalWithProjects.next();
assert.strictEqual(modalWithProjects.currentIndex, 1, 'Next index must be 1');
modalWithProjects.prev();
assert.strictEqual(modalWithProjects.currentIndex, 0, 'Prev index must return to 0');

// Test scroll stability and zero-jitter close guarantees
assert(typeof modalWithProjects.savedScrollY === 'number', 'savedScrollY must be recorded');
modalWithProjects.close();
assert.strictEqual(modalWithProjects.isOpen, false, 'Modal must close cleanly without error');
assert.strictEqual(modalWithProjects.wheelBlocker, null, 'Wheel blocker must be cleaned up on close');

// Test mobile responsive dimensions optimization
const mobileDims = modal.getTargetDimensions(390, 844);
assert(mobileDims.targetW <= 390 - 24, 'Mobile targetW must fit inside mobile screen with margins');
assert(mobileDims.targetH <= 844 - 44, 'Mobile targetH must fit inside mobile screen height');
assert.strictEqual(mobileDims.targetW, 366, '390px mobile targetW should be 366px');

// Test desktop responsive dimensions: must keep 100% fidelity with original large screen logic
const desktopDims = modal.getTargetDimensions(1440, 900);
assert.strictEqual(desktopDims.targetW, Math.min(Math.max(1440 * 0.85, 960), 1680), 'Desktop targetW must be preserved');
assert.strictEqual(desktopDims.targetH, Math.min(Math.max(900 * 0.82, 580), 960), 'Desktop targetH must be preserved');

console.log('✓ JournalModal tests passed!');

