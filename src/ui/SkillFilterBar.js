export class SkillFilterBar {
  constructor(container, skills, projects, options = {}) {
    this.container = container;
    this.skills = skills;
    this.projects = projects;
    this.onFilterChange = options.onFilterChange || (() => {});
    this.activeSkillId = 'all';

    this.render();
  }

  render() {
    this.container.innerHTML = '';

    // 1. Nút "TẤT CẢ"
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = `TẤT CẢ (${this.projects.length})`;
    allBtn.addEventListener('click', () => this.setActive('all', allBtn));
    this.container.appendChild(allBtn);

    // 2. Nút cho từng skill với số lượng dự án
    for (const skill of this.skills) {
      const count = this.projects.filter(p => p.skills && p.skills.includes(skill.id)).length;
      if (count === 0) continue; // Chỉ hiển thị skill có dự án

      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.textContent = `${skill.name} (${count})`;
      btn.style.setProperty('--btn-color', skill.color);

      btn.addEventListener('click', () => this.setActive(skill.id, btn));
      this.container.appendChild(btn);
    }
  }

  setActive(skillId, btnElement) {
    if (this.activeSkillId === skillId) return;
    this.activeSkillId = skillId;

    const allButtons = this.container.querySelectorAll('.filter-btn');
    allButtons.forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    this.onFilterChange(skillId);
  }
}
