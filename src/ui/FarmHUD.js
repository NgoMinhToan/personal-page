export class FarmHUD {
  constructor(container, skills, projects, options = {}) {
    this.container = container;
    this.skills = skills;
    this.projects = projects;
    this.onSelectSkill = options.onSelectSkill || (() => {});
    this.activeSkill = 'all';

    this.render();
  }

  render() {
    this.container.innerHTML = `
      <!-- Header Nông Trại Trên Cùng -->
      <header class="farm-top-nav">
        <div class="farm-logo">
          <span class="farm-logo-icon">🏡</span>
          <div class="farm-logo-text">
            <span class="farm-logo-main">CREATIVE FARM 3D</span>
            <span class="farm-logo-sub">Dự Án Cá Nhân & Kỹ Năng</span>
          </div>
        </div>

        <div class="farm-nav-hint">
          <span>🖱️ <b>Lăn chuột:</b> Dạo quanh thung lũng</span>
          <span>🖐️ <b>Kéo chuột:</b> Xoay ngắm 360°</span>
          <span>✨ <b>Click bảng gỗ:</b> Xem chi tiết</span>
        </div>
      </header>

      <!-- Thanh Lọc Kỹ Năng Mộc Mạc -->
      <nav class="farm-skill-bar">
        <span class="farm-skill-label">LỌC THEO KỸ NĂNG:</span>
        <div id="farm-pills" class="farm-pills"></div>
      </nav>
    `;

    const pillsContainer = this.container.querySelector('#farm-pills');

    // Nút "TẤT CẢ"
    const allBtn = document.createElement('button');
    allBtn.className = 'farm-pill-btn active';
    allBtn.textContent = `TẤT CẢ (${this.projects.length})`;
    allBtn.addEventListener('click', () => this.setActive('all', allBtn));
    pillsContainer.appendChild(allBtn);

    // Nút cho từng skill
    this.skills.forEach((skill) => {
      const count = this.projects.filter(p => p.skills && p.skills.includes(skill.id)).length;
      if (count === 0) return;

      const btn = document.createElement('button');
      btn.className = 'farm-pill-btn';
      btn.textContent = `${skill.name} (${count})`;
      btn.addEventListener('click', () => this.setActive(skill.id, btn));
      pillsContainer.appendChild(btn);
    });
  }

  setActive(skillId, btnElement) {
    if (this.activeSkill === skillId) return;
    this.activeSkill = skillId;

    const allButtons = this.container.querySelectorAll('.farm-pill-btn');
    allButtons.forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    this.onSelectSkill(skillId);
  }
}
