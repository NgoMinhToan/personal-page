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

console.log('✓ JournalModal tests passed!');

