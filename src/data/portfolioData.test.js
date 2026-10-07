import assert from 'node:assert';
import { portfolioData } from './portfolioData.js';

console.log('Testing portfolioData schema...');

// Test 1: Must have skills array and projects array
assert(Array.isArray(portfolioData.skills), 'portfolioData.skills must be an array');
assert(Array.isArray(portfolioData.projects), 'portfolioData.projects must be an array');
assert(portfolioData.skills.length >= 4, 'Must have at least 4 skills');
assert(portfolioData.projects.length >= 6, 'Must have at least 6 projects');

// Test 2: Check skill schema
const skillIds = new Set();
for (const skill of portfolioData.skills) {
  assert(skill.id && typeof skill.id === 'string', 'Skill must have string id');
  assert(skill.name && typeof skill.name === 'string', 'Skill must have string name');
  assert(skill.color && typeof skill.color === 'string', 'Skill must have color');
  skillIds.add(skill.id);
}

// Test 3: Check project schema and valid skill references
for (const project of portfolioData.projects) {
  assert(project.id && typeof project.id === 'string', 'Project must have string id');
  assert(project.vol && typeof project.vol === 'string', 'Project must have vol (e.g. VOL. 01)');
  assert(project.title && typeof project.title === 'string', 'Project must have string title');
  assert(project.description && typeof project.description === 'string', 'Project must have description');
  assert(project.demoUrl && typeof project.demoUrl === 'string', 'Project must have demoUrl');
  assert(project.accentColor && typeof project.accentColor === 'string', 'Project must have accentColor');
  assert(Array.isArray(project.skills) && project.skills.length > 0, 'Project must have non-empty skills array');
  
  // Every skill in project must exist in skillIds
  for (const sId of project.skills) {
    assert(skillIds.has(sId), `Project ${project.id} references undefined skill id: ${sId}`);
  }
}

console.log('✓ All portfolioData schema tests passed!');
