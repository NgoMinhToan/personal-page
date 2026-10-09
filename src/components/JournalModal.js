import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export class JournalModal {
  constructor(options = {}) {
    this.container = options.container || null;
    this.projects = options.projects || [];
    this.isOpen = false;
    this.isAnimating = false;
    this.activeProject = null;
    this.sourceCardElement = null;
    this.currentIndex = 0;

    // Three.js 3D Flip System
    this.threeScene = null;
    this.threeCamera = null;
    this.threeRenderer = null;
    this.threeGroup = null;
    this.frontObject = null;
    this.backObject = null;
    this.animFrameId = null;
    this.mouseMoveHandler = null;
    this.popstateHandler = null;
    this.wheelBlocker = null;
    this.isHistoryPushed = false;
    this.needHistoryBack = false;

    this.setupKeyboard();
    this.setupHistoryHandler();
    this.setupResizeHandler();
  }

  getTargetDimensions(winW, winH) {
    if (winW <= 768) {
      // Màn hình điện thoại nhỏ (Mobile): Căn chỉnh vừa vặn khung hình với khoảng đệm an toàn
      const targetW = Math.round(Math.min(winW - 24, 480));
      const targetH = Math.round(Math.min(winH - 44, 720));
      return { targetW, targetH };
    } else if (winW < 1024) {
      // Màn hình Tablet vừa
      const targetW = Math.round(Math.min(winW * 0.9, 900));
      const targetH = Math.round(Math.min(winH * 0.85, 800));
      return { targetW, targetH };
    } else {
      // Giữ nguyên 100% logic hiện tại cho màn hình lớn (Desktop, Laptop, 2K, 4K)
      const targetW = Math.min(Math.max(winW * 0.85, 960), 1680);
      const targetH = Math.min(Math.max(winH * 0.82, 580), 960);
      return { targetW, targetH };
    }
  }

  setupResizeHandler() {
    if (typeof window !== 'undefined') {
      this.resizeHandler = () => {
        if (!this.isOpen || this.isAnimating || !this.threeRenderer || !this.threeCamera) return;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        this.threeCamera.aspect = winW / winH;
        const fov = 45;
        const cameraZ = (winH / 2) / Math.tan((fov * Math.PI / 180) / 2);
        this.threeCamera.position.set(0, 0, cameraZ);
        this.threeCamera.updateProjectionMatrix();
        this.threeRenderer.setSize(winW, winH);

        const { targetW, targetH } = this.getTargetDimensions(winW, winH);
        const backEl = this.container ? this.container.querySelector('#three-face-back') : null;
        if (backEl) {
          backEl.style.width = `${targetW}px`;
          backEl.style.height = `${targetH}px`;
        }
      };
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  setupHistoryHandler() {
    if (typeof window !== 'undefined') {
      // Vô hiệu hóa tính năng tự động nhảy scroll của trình duyệt khi duyệt history
      if (window.history && 'scrollRestoration' in window.history) {
        try {
          window.history.scrollRestoration = 'manual';
        } catch (e) {}
      }

      this.popstateHandler = (e) => {
        if (this.isOpen) {
          // Trình duyệt nhấn Back (quay về), đóng modal mà không cần pushState ngược lại
          this.isHistoryPushed = false;
          this.close(false);
        }
      };
      window.addEventListener('popstate', this.popstateHandler);
    }
  }

  setProjects(projects) {
    this.projects = projects || [];
  }

  generateFrontCardHTML(project, index) {
    const padIndex = String(index + 1).padStart(2, '0');
    const tags = project.skills || project.tags || [];
    const tagsHtml = tags.map(t => `<span class="skill-sticker">#${t}</span>`).join(' ');
    
    // Con dấu trạng thái mực
    let inkStampHtml = '';
    if (project.badgeStatus) {
      const statusUpper = project.badgeStatus.toUpperCase();
      if (statusUpper === 'FEATURED') {
        inkStampHtml = `<div class="ink-stamp stamp-featured" aria-label="Dự án nổi bật">★ NỔI BẬT ★</div>`;
      } else if (statusUpper === 'EXPERIMENT') {
        inkStampHtml = `<div class="ink-stamp stamp-experiment" aria-label="Thử nghiệm đồ họa">🧪 THỬ NGHIỆM</div>`;
      } else if (statusUpper === 'COMPLETED') {
        inkStampHtml = `<div class="ink-stamp stamp-completed" aria-label="Đã hoàn thành">✓ HOÀN THÀNH</div>`;
      } else {
        inkStampHtml = `<div class="ink-stamp stamp-default">${project.badgeStatus}</div>`;
      }
    }

    // Lấy icon sketch badge từ thẻ thực tế ngoài DOM hoặc tạo fallback
    let sketchBadgeHtml = '';
    if (typeof document !== 'undefined') {
      const domCard = document.querySelector(`[data-project-id="${project.id}"]`);
      const domBadge = domCard ? domCard.querySelector('.project-sketch-badge-icon') : null;
      if (domBadge) {
        sketchBadgeHtml = domBadge.outerHTML;
      }
    }

    return `
      ${inkStampHtml}
      <div class="card-header-bar">
        <div class="card-header-meta">
          <span class="project-stamp-badge">#${padIndex}</span>
          <span class="project-year-badge">${project.year || '2025'}</span>
          <span class="project-branch-tag">${project.subtitle || 'Dự án Sáng Tạo'}</span>
        </div>
        ${sketchBadgeHtml}
      </div>
      <h3 class="paper-card-title">${project.title}</h3>
      <p class="paper-card-desc">${project.description}</p>
      <div class="paper-card-tags">${tagsHtml}</div>
      <div class="paper-card-footer">
        <button class="stamp-btn-detail" aria-hidden="true" tabindex="-1">
          CHI TIẾT ↗
        </button>
      </div>
    `;
  }

  generateSpreadContentHTML(project, currIdx, total) {
    const prevProject = currIdx > 0 ? this.projects[currIdx - 1] : this.projects[total - 1];
    const nextProject = currIdx < total - 1 ? this.projects[currIdx + 1] : this.projects[0];

    const imageSection = project.image
      ? `<img src="${project.image}" alt="${project.title}" class="journal-showcase-img">`
      : `
        <div class="doodle-image-placeholder">
          <div class="placeholder-doodle">${project.iconEmoji || '🎨'}</div>
          <span class="placeholder-caption">${project.title}</span>
          <div class="placeholder-skills-pills">
            ${(project.skills || []).map(s => `<span class="mini-skill-pill">#${s}</span>`).join(' ')}
          </div>
        </div>
      `;

    const featuresHtml = (project.features || [
      'Kiến trúc đồ họa tối ưu hóa hiệu năng cao',
      'Thiết kế giao diện tương tác sáng tạo người dùng',
      'Được đóng gói chuẩn module hóa dễ bảo trì mở rộng'
    ]).map(f => `<li><span class="doodle-bullet">✏️</span> ${f}</li>`).join('\n');

    return `
      <!-- Nút điều hướng lật trang trước -->
      <button class="journal-nav-ribbon ribbon-prev" id="btn-prev-page" aria-label="Trang trước: ${prevProject ? prevProject.title : ''}" title="Trang trước">
        <span class="ribbon-arrow">‹</span>
      </button>

      <!-- Nút đóng sổ -->
      <button class="paper-clip-close" id="btn-close-journal" aria-label="Đóng">✕</button>

      <div class="journal-two-page-spread">
        <!-- Trang Trái: Ảnh minh họa / Đồ họa -->
        <div class="journal-page journal-page-left">
          <div class="taped-photo-frame">
            ${imageSection}
          </div>
        </div>

        <!-- Gáy sổ nếp gấp đôi -->
        <div class="journal-spine-divider">
          <div class="spine-thread spine-thread-top"></div>
          <div class="spine-thread spine-thread-middle"></div>
          <div class="spine-thread spine-thread-bottom"></div>
        </div>

        <!-- Trang Phải: Chi tiết kỹ thuật & Tính năng -->
        <div class="journal-page journal-page-right">
          <h2 class="journal-project-title" id="journal-title">${project.title}</h2>
          <p class="journal-project-story">${project.details || project.description}</p>

          <h4 class="journal-section-heading">ĐIỂM NỔI BẬT:</h4>
          <ul class="journal-features-list">
            ${featuresHtml}
          </ul>

          <div class="journal-action-stamps">
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="stamp-link-btn demo-stamp">DEMO 🚀</a>` : ''}
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="stamp-link-btn github-stamp">GITHUB 💻</a>` : ''}
          </div>
        </div>
      </div>

      <!-- Nút điều hướng lật trang sau -->
      <button class="journal-nav-ribbon ribbon-next" id="btn-next-page" aria-label="Trang sau: ${nextProject ? nextProject.title : ''}" title="Trang sau">
        <span class="ribbon-arrow">›</span>
      </button>
    `;
  }

  generateModalHTML(project) {
    if (!project) return '';

    const total = this.projects.length || 1;
    let currIdx = this.projects.findIndex(p => p.id === project.id);
    if (currIdx === -1) currIdx = this.currentIndex;

    const frontCardHtml = this.generateFrontCardHTML(project, currIdx);
    const spreadContentHtml = this.generateSpreadContentHTML(project, currIdx, total);

    return `
      <div class="journal-modal-backdrop" id="journal-backdrop" role="dialog" aria-modal="true" aria-labelledby="journal-title">
        <!-- Three.js 3D Viewport Layer -->
        <div class="three-flip-viewport" id="three-flip-viewport"></div>

        <!-- 3D Model Elements (Chiếu vào Three.js CSS3D) -->
        <div id="three-model-source" style="display: none;">
          <!-- Mặt Trước: Item ban đầu -->
          <div id="three-face-front" class="three-card-face three-card-front">
            <div class="front-card-preview">
              ${frontCardHtml}
            </div>
          </div>

          <!-- Mặt Sau: Sổ tay chi tiết mở rộng -->
          <div id="three-face-back" class="three-card-face three-card-back">
            ${spreadContentHtml}
          </div>
        </div>
      </div>
    `;
  }

  setupKeyboard() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (!this.isOpen || this.isAnimating) return;
        if (e.key === 'Escape') {
          this.close();
        } else if (e.key === 'ArrowLeft') {
          this.prev();
        } else if (e.key === 'ArrowRight') {
          this.next();
        }
      });
    }
  }

  open(project, sourceCardElement = null) {
    if (!this.container || !project) return;
    this.activeProject = project;
    this.sourceCardElement = sourceCardElement;
    this.isOpen = true;

    // Lưu lại vị trí scroll hiện tại chính xác của trang
    this.savedScrollY = typeof window !== 'undefined'
      ? (window.pageYOffset || (document.documentElement ? document.documentElement.scrollTop : 0) || (document.body ? document.body.scrollTop : 0) || 0)
      : 0;

    // Khóa cuộn trang nền một cách mượt mà và an toàn trên cả html và body
    if (typeof document !== 'undefined') {
      if (document.documentElement) {
        document.documentElement.style.overflow = 'hidden';
      }
      if (document.body) {
        document.body.style.overflow = 'hidden';
      }
    }

    // Chặn mọi sự kiện cuộn/vuốt lọt xuống trang nền phía dưới (ngoại trừ vùng chi tiết sổ tay)
    if (typeof window !== 'undefined') {
      this.wheelBlocker = (e) => {
        const scrollable = e.target && e.target.closest && e.target.closest('.journal-two-page-spread');
        if (scrollable) return;
        if (e.cancelable) e.preventDefault();
      };
      window.addEventListener('wheel', this.wheelBlocker, { passive: false });
      window.addEventListener('touchmove', this.wheelBlocker, { passive: false });
    }

    // Quản lý History Stack trình duyệt mà không đổi hash URL (tránh trình duyệt tự nhảy scroll đến anchor #)
    if (typeof window !== 'undefined' && window.history && typeof window.history.pushState === 'function') {
      try {
        window.history.pushState({ modalOpen: true, projectId: project.id }, '');
        this.isHistoryPushed = true;
      } catch (err) {
        this.isHistoryPushed = false;
      }
    }

    if (this.projects && this.projects.length) {
      const idx = this.projects.findIndex(p => p.id === project.id);
      if (idx !== -1) this.currentIndex = idx;
    }

    this.container.innerHTML = this.generateModalHTML(project);
    this.container.classList.remove('hidden');
    if (typeof this.container.setAttribute === 'function') {
      this.container.setAttribute('aria-hidden', 'false');
    }

    this.bindEvents();
    this.initThreeAnimation(sourceCardElement, true);
  }

  initThreeAnimation(sourceCardElement, isOpenAnimation = true) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const viewport = this.container.querySelector('#three-flip-viewport');
    const frontEl = this.container.querySelector('#three-face-front');
    const backEl = this.container.querySelector('#three-face-back');
    const backdrop = this.container.querySelector('#journal-backdrop');

    if (!viewport || !frontEl || !backEl || !backdrop) return;

    // Tìm thẻ hiện tại trong luồng để lấy vị trí và ẩn tạm thời để tránh trùng lặp
    let targetCardEl = null;
    let startRect = null;
    if (sourceCardElement && typeof sourceCardElement.getBoundingClientRect === 'function') {
      targetCardEl = sourceCardElement;
      if (targetCardEl.style) targetCardEl.style.transform = '';
      startRect = sourceCardElement.getBoundingClientRect();
    } else {
      const domCard = document.querySelector(`[data-project-id="${this.activeProject.id}"]`);
      if (domCard && typeof domCard.getBoundingClientRect === 'function') {
        targetCardEl = domCard;
        if (targetCardEl.style) targetCardEl.style.transform = '';
        startRect = domCard.getBoundingClientRect();
      }
    }

    if (targetCardEl) {
      targetCardEl.style.opacity = '0';
    }

    // Đảm bảo khi đóng thì hiển thị lại thẻ
    this.hiddenDomCard = targetCardEl;

    if (!startRect) {
      startRect = {
        left: window.innerWidth / 2 - 180,
        top: window.innerHeight / 2 - 140,
        width: 360,
        height: 280
      };
    }

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Thiết lập Three.js Scene, Camera và CSS3DRenderer
    this.threeScene = new THREE.Scene();
    const fov = 45;
    this.threeCamera = new THREE.PerspectiveCamera(fov, winW / winH, 1, 5000);

    // Khoảng cách camera để 1 đơn vị 3D đúng bằng 1 pixel màn hình ở z = 0
    const cameraZ = (winH / 2) / Math.tan((fov * Math.PI / 180) / 2);
    this.threeCamera.position.set(0, 0, cameraZ);
    this.threeCamera.lookAt(0, 0, 0);

    this.threeRenderer = new CSS3DRenderer();
    this.threeRenderer.setSize(winW, winH);
    viewport.innerHTML = '';
    viewport.appendChild(this.threeRenderer.domElement);

    // Kích thước sổ tay mặt sau: thích ứng tối ưu theo độ rộng màn hình (Mobile / Tablet / Desktop)
    const { targetW, targetH } = this.getTargetDimensions(winW, winH);

    // Áp kích thước chuẩn pixel cho 2 mặt
    frontEl.style.width = `${startRect.width}px`;
    frontEl.style.height = `${startRect.height}px`;

    backEl.style.width = `${targetW}px`;
    backEl.style.height = `${targetH}px`;

    // Tạo các CSS3DObject
    this.frontObject = new CSS3DObject(frontEl);
    this.backObject = new CSS3DObject(backEl);

    // Mặt sau quay 180 độ (Math.PI) theo trục Y
    this.backObject.rotation.y = Math.PI;

    // Nhóm 3D Model chứa cả mặt trước và mặt sau
    this.threeGroup = new THREE.Group();
    this.threeGroup.add(this.frontObject);
    this.threeGroup.add(this.backObject);
    this.threeScene.add(this.threeGroup);

    // Chuyển đổi tọa độ màn hình (top-left) sang tọa độ 3D Three.js (center-based)
    const startX3D = (startRect.left + startRect.width / 2) - winW / 2;
    const startY3D = winH / 2 - (startRect.top + startRect.height / 2);

    // Vị trí tâm màn hình trong Three.js
    const targetX3D = 0;
    const targetY3D = 0;

    // Tỉ lệ scale từ item sang modal lớn
    const scaleX = targetW / startRect.width;
    const scaleY = targetH / startRect.height;

    // Vòng lặp render Three.js
    const renderLoop = () => {
      if (this.threeRenderer && this.threeScene && this.threeCamera) {
        this.threeRenderer.render(this.threeScene, this.threeCamera);
        this.animFrameId = requestAnimationFrame(renderLoop);
      }
    };
    renderLoop();

    // Thực hiện Three.js Model Animation
    this.isAnimating = true;

    // Bắt đầu từ tọa độ item, chưa lật
    this.threeGroup.position.set(startX3D, startY3D, 0);
    this.threeGroup.rotation.set(0, 0, 0);
    this.threeGroup.scale.set(1, 1, 1);

    const startTime = performance.now();
    const duration = 650; // 650ms Three.js transition

    // Easing cubic ease-out
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateOpen = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutCubic(progress);

      // 1. Lật ngược 180 độ trong không gian Three.js (rotateY: 0 -> Math.PI)
      this.threeGroup.rotation.y = ease * Math.PI;

      // Hiệu ứng nghiêng nhẹ khi bay tạo cảm giác 3D sống động
      this.threeGroup.rotation.z = Math.sin(ease * Math.PI) * -0.06;

      // 2. Di chuyển từ vị trí item đến trung tâm màn hình
      this.threeGroup.position.x = startX3D + (targetX3D - startX3D) * ease;
      this.threeGroup.position.y = startY3D + (targetY3D - startY3D) * ease;

      // 3. Phóng to mô hình 3D (Z nhô lên một chút trong lúc lật)
      this.threeGroup.position.z = Math.sin(ease * Math.PI) * 160;

      // Tỉ lệ kích thước mặt trước biến đổi
      this.frontObject.scale.set(
        1 + (scaleX - 1) * ease,
        1 + (scaleY - 1) * ease,
        1
      );

      // Kích thước mặt sau bắt đầu từ tỉ lệ nhỏ phóng to lên 1
      this.backObject.scale.set(
        (1 / scaleX) + (1 - 1 / scaleX) * ease,
        (1 / scaleY) + (1 - 1 / scaleY) * ease,
        1
      );

      // 4. Background blur tăng dần
      backdrop.style.backdropFilter = `blur(${(ease * 12).toFixed(1)}px)`;
      backdrop.style.webkitBackdropFilter = `blur(${(ease * 12).toFixed(1)}px)`;
      backdrop.style.backgroundColor = `rgba(15, 23, 42, ${(ease * 0.55).toFixed(2)})`;

      if (progress < 1) {
        requestAnimationFrame(animateOpen);
      } else {
        this.threeGroup.rotation.y = Math.PI;
        this.threeGroup.rotation.z = 0;
        this.threeGroup.position.set(0, 0, 0);
        this.backObject.scale.set(1, 1, 1);
        this.isAnimating = false;

        this.bindInteractiveParallax();
      }
    };

    requestAnimationFrame(animateOpen);
  }

  bindEvents() {
    if (!this.container) return;

    const backdrop = this.container.querySelector ? this.container.querySelector('#journal-backdrop') : null;
    const closeBtn = this.container.querySelector ? this.container.querySelector('#btn-close-journal') : null;
    const prevBtn = this.container.querySelector ? this.container.querySelector('#btn-prev-page') : null;
    const nextBtn = this.container.querySelector ? this.container.querySelector('#btn-next-page') : null;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        // Nhấn ra ngoài khi item đang phóng to sẽ ẩn đi
        if (e.target === backdrop || e.target.id === 'three-flip-viewport') {
          this.close();
          return;
        }

        // Nếu click ra ngoài thẻ 3D model
        const faceBack = this.container.querySelector('#three-face-back');
        if (faceBack && !faceBack.contains(e.target)) {
          this.close();
        }
      });
    }

    // Bắt sự kiện click vào lớp viewport để bắt mọi cú click ra ngoài
    const viewport = this.container.querySelector('#three-flip-viewport');
    if (viewport) {
      viewport.addEventListener('click', (e) => {
        const faceBack = this.container.querySelector('#three-face-back');
        if (faceBack && !faceBack.contains(e.target)) {
          this.close();
        }
      });
    }

    // 4. Hỗ trợ cử chỉ vuốt ngang (Touch Swipe) chuyển trang mượt mà trên thiết bị di động
    const faceBack = this.container.querySelector('#three-face-back');
    if (faceBack) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      faceBack.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = performance.now();
        }
      }, { passive: true });

      faceBack.addEventListener('touchend', (e) => {
        if (this.isAnimating || !touchStartX) return;
        if (e.changedTouches && e.changedTouches.length === 1) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;
          const elapsed = performance.now() - touchStartTime;

          // Chỉ chuyển trang khi vuốt ngang dứt khoát: > 50px và độ lệch ngang lớn hơn 1.5 lần độ lệch dọc
          if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5 && elapsed < 500) {
            if (diffX < 0) {
              this.next();
            } else {
              this.prev();
            }
          }
        }
      }, { passive: true });
    }
  }

  bindInteractiveParallax() {
    if (typeof window === 'undefined' || !this.threeGroup) return;

    const baseRotY = Math.PI;
    const baseRotX = 0;
    const baseRotZ = 0;
    const basePosX = 0;
    const basePosY = 0;

    let targetRotY = baseRotY;
    let targetRotX = baseRotX;
    let targetRotZ = baseRotZ;
    let targetPosX = basePosX;
    let targetPosY = basePosY;

    let isInsideItem = false;
    let isTicking = false;

    // Vòng lặp cập nhật chuyển động mượt (damping/easing) trở về vị trí gốc hoặc nghiêng
    const updateMotion = () => {
      if (!this.isOpen || this.isAnimating || !this.threeGroup) {
        isTicking = false;
        return;
      }

      const lerpFactor = isInsideItem ? 0.15 : 0.08;

      this.threeGroup.rotation.y += (targetRotY - this.threeGroup.rotation.y) * lerpFactor;
      this.threeGroup.rotation.x += (targetRotX - (this.threeGroup.rotation.x || 0)) * lerpFactor;
      this.threeGroup.rotation.z += (targetRotZ - (this.threeGroup.rotation.z || 0)) * lerpFactor;

      this.threeGroup.position.x += (targetPosX - this.threeGroup.position.x) * lerpFactor;
      this.threeGroup.position.y += (targetPosY - this.threeGroup.position.y) * lerpFactor;

      // Nếu đang ở ngoài và đã gần về vị trí gốc thì dừng tick
      const distRot = Math.abs(this.threeGroup.rotation.y - baseRotY) +
                      Math.abs(this.threeGroup.rotation.x - baseRotX);
      const distPos = Math.abs(this.threeGroup.position.x - basePosX) +
                      Math.abs(this.threeGroup.position.y - basePosY);

      if (!isInsideItem && distRot < 0.001 && distPos < 0.05) {
        this.threeGroup.rotation.y = baseRotY;
        this.threeGroup.rotation.x = baseRotX;
        this.threeGroup.rotation.z = baseRotZ;
        this.threeGroup.position.x = basePosX;
        this.threeGroup.position.y = basePosY;
        isTicking = false;
        return;
      }

      requestAnimationFrame(updateMotion);
    };

    const startTicking = () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateMotion);
      }
    };

    this.mouseMoveHandler = (e) => {
      if (!this.isOpen || this.isAnimating || !this.threeGroup) return;

      const faceBack = this.container.querySelector('#three-face-back');
      if (!faceBack) return;

      const rect = faceBack.getBoundingClientRect();
      const inX = e.clientX >= rect.left && e.clientX <= rect.right;
      const inY = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (inX && inY) {
        isInsideItem = true;
        // Tính vị trí tương đối của con trỏ so với tâm của item: -1 đến 1
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        targetRotY = baseRotY + normX * 0.12;
        targetRotX = normY * -0.09;
        targetRotZ = normX * -0.015;

        targetPosX = normX * 22;
        targetPosY = normY * 16;
      } else {
        isInsideItem = false;
        // Ở ngoài phạm vi item: Trở về góc nhìn ban đầu (không nghiêng)
        targetRotY = baseRotY;
        targetRotX = baseRotX;
        targetRotZ = baseRotZ;
        targetPosX = basePosX;
        targetPosY = basePosY;
      }

      startTicking();
    };

    // Chỉ kích hoạt hiệu ứng nghiêng theo con trỏ chuột trên thiết bị hỗ trợ hover (Desktop/Laptop)
    if (typeof window !== 'undefined' && (!window.matchMedia || window.matchMedia('(hover: hover)').matches)) {
      window.addEventListener('mousemove', this.mouseMoveHandler);
    }
  }

  next() {
    if (!this.projects || !this.projects.length || this.isAnimating) return;
    const nextIdx = (this.currentIndex + 1) % this.projects.length;
    this.goToIndex(nextIdx);
  }

  prev() {
    if (!this.projects || !this.projects.length || this.isAnimating) return;
    const prevIdx = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    this.goToIndex(prevIdx);
  }

  goToIndex(index) {
    if (!this.projects || !this.projects[index]) return;
    this.currentIndex = index;
    this.activeProject = this.projects[index];

    // Cập nhật ẩn/hiện thẻ nền tương ứng với dự án mới
    if (typeof document !== 'undefined') {
      if (this.hiddenDomCard) {
        this.hiddenDomCard.style.opacity = '1';
        this.hiddenDomCard = null;
      }
      const newTargetCard = document.querySelector(`[data-project-id="${this.activeProject.id}"]`);
      if (newTargetCard) {
        if (newTargetCard.style) {
          newTargetCard.style.transform = '';
          newTargetCard.style.opacity = '0';
        }
        this.hiddenDomCard = newTargetCard;
      }
    }

    const backEl = this.container.querySelector('#three-face-back');
    if (backEl) {
      const total = this.projects.length || 1;
      backEl.innerHTML = this.generateSpreadContentHTML(this.activeProject, this.currentIndex, total);
      this.bindEvents();

      // Hiệu ứng rung lật trang nhẹ trong Three.js Model
      if (this.threeGroup) {
        const baseRotY = Math.PI;
        let t = 0;
        const wiggle = () => {
          t += 0.15;
          this.threeGroup.rotation.y = baseRotY + Math.sin(t) * 0.08;
          if (t < Math.PI) {
            requestAnimationFrame(wiggle);
          } else {
            this.threeGroup.rotation.y = baseRotY;
          }
        };
        wiggle();
      }
    }
  }

  close(updateHistory = true) {
    if (!this.container || this.isAnimating) return;

    // Ghi nhận trạng thái cần pop history sau khi hoàn tất animation thu nhỏ
    this.needHistoryBack = updateHistory && this.isHistoryPushed;
    this.isHistoryPushed = false;

    // Hủy bỏ bộ chặn cuộn wheel/touch
    if (this.wheelBlocker && typeof window !== 'undefined') {
      window.removeEventListener('wheel', this.wheelBlocker);
      window.removeEventListener('touchmove', this.wheelBlocker);
      this.wheelBlocker = null;
    }

    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      this.mouseMoveHandler = null;
    }

    const backdrop = this.container.querySelector('#journal-backdrop');
    if (!backdrop || !this.threeGroup || typeof window === 'undefined') {
      this.finishClose();
      return;
    }

    // Đảm bảo vị trí scroll của trang khớp đúng với vị trí ban đầu trước khi tính toạ độ đích
    if (typeof window !== 'undefined' && typeof this.savedScrollY === 'number') {
      const currentScroll = window.pageYOffset || (document.documentElement ? document.documentElement.scrollTop : 0) || (document.body ? document.body.scrollTop : 0) || 0;
      if (Math.abs(currentScroll - this.savedScrollY) > 1) {
        window.scrollTo({ top: this.savedScrollY, behavior: 'instant' });
      }
    }

    // Lấy toạ độ hiện tại của thẻ gốc trong trang theo đúng vị trí scroll hiện tại của người dùng
    let endRect = null;
    const targetDomCard = document.querySelector(`[data-project-id="${this.activeProject.id}"]`);
    if (targetDomCard && typeof targetDomCard.getBoundingClientRect === 'function') {
      if (targetDomCard.style) targetDomCard.style.transform = '';
      endRect = targetDomCard.getBoundingClientRect();
    } else if (this.sourceCardElement && typeof this.sourceCardElement.getBoundingClientRect === 'function') {
      if (this.sourceCardElement.style) this.sourceCardElement.style.transform = '';
      endRect = this.sourceCardElement.getBoundingClientRect();
    }

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    if (!endRect) {
      endRect = {
        left: winW / 2 - 180,
        top: winH / 2 - 140,
        width: 360,
        height: 280
      };
    }

    const { targetW, targetH } = this.getTargetDimensions(winW, winH);
    const scaleX = targetW / (endRect.width || 360);
    const scaleY = targetH / (endRect.height || 280);

    // Điểm đến khi thu nhỏ: Luôn bay về đúng tọa độ thật của item (kể cả khi đã cuộn trang khuất lên/xuống)
    const endX3D = (endRect.left + endRect.width / 2) - winW / 2;
    const endY3D = winH / 2 - (endRect.top + endRect.height / 2);

    this.isAnimating = true;

    const startTime = performance.now();
    const duration = 520; // 520ms close animation
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateClose = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      // 1. Lật ngược 3D từ Math.PI về 0 (chuẩn Three.js flip model)
      this.threeGroup.rotation.y = Math.PI - ease * Math.PI;
      this.threeGroup.rotation.z = Math.sin(ease * Math.PI) * 0.05;

      // 2. Thu nhỏ vị trí từ tâm về lại đúng vị trí item theo hướng cuộn hiện tại mà không làm nhảy scroll
      this.threeGroup.position.x = 0 + (endX3D - 0) * ease;
      this.threeGroup.position.y = 0 + (endY3D - 0) * ease;
      this.threeGroup.position.z = Math.sin(ease * Math.PI) * 120;

      // 3. Biến đổi kích thước tỷ lệ
      this.frontObject.scale.set(
        scaleX - (scaleX - 1) * ease,
        scaleY - (scaleY - 1) * ease,
        1
      );

      this.backObject.scale.set(
        1 - (1 - (1 / scaleX)) * ease,
        1 - (1 - (1 / scaleY)) * ease,
        1
      );

      // 4. Giảm background blur
      const remainingBlur = (1 - ease) * 12;
      backdrop.style.backdropFilter = `blur(${remainingBlur.toFixed(1)}px)`;
      backdrop.style.webkitBackdropFilter = `blur(${remainingBlur.toFixed(1)}px)`;
      backdrop.style.backgroundColor = `rgba(15, 23, 42, ${((1 - ease) * 0.55).toFixed(2)})`;

      if (progress < 1) {
        requestAnimationFrame(animateClose);
      } else {
        this.finishClose();
      }
    };

    requestAnimationFrame(animateClose);
  }

  finishClose() {
    if (this.wheelBlocker && typeof window !== 'undefined') {
      window.removeEventListener('wheel', this.wheelBlocker);
      window.removeEventListener('touchmove', this.wheelBlocker);
      this.wheelBlocker = null;
    }

    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      this.mouseMoveHandler = null;
    }

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.threeRenderer && this.threeRenderer.domElement && this.threeRenderer.domElement.parentNode) {
      this.threeRenderer.domElement.parentNode.removeChild(this.threeRenderer.domElement);
    }

    this.threeScene = null;
    this.threeCamera = null;
    this.threeRenderer = null;
    this.threeGroup = null;
    this.frontObject = null;
    this.backObject = null;

    this.isOpen = false;
    this.isAnimating = false;
    this.activeProject = null;
    this.sourceCardElement = null;

    if (this.hiddenDomCard) {
      this.hiddenDomCard.style.opacity = '1';
      if (this.hiddenDomCard.style) {
        this.hiddenDomCard.style.transform = '';
      }
      this.hiddenDomCard = null;
    }

    // Mở lại cuộn trang mượt mà
    if (typeof document !== 'undefined') {
      if (document.documentElement) {
        document.documentElement.style.overflow = '';
      }
      if (document.body) {
        document.body.style.overflow = '';
      }
    }

    // Đảm bảo không bị giật vị trí cuộn sau khi mở lại overflow
    if (typeof window !== 'undefined' && typeof this.savedScrollY === 'number') {
      const currentScroll = window.pageYOffset || (document.documentElement ? document.documentElement.scrollTop : 0) || (document.body ? document.body.scrollTop : 0) || 0;
      if (Math.abs(currentScroll - this.savedScrollY) > 1) {
        window.scrollTo({ top: this.savedScrollY, behavior: 'instant' });
      }
    }

    // Quay lại history sau khi hiệu ứng thu nhỏ đã hoàn tất xong xuôi để tránh browser tự giật scroll
    if (this.needHistoryBack) {
      this.needHistoryBack = false;
      if (typeof window !== 'undefined' && window.history && typeof window.history.back === 'function') {
        try {
          window.history.back();
        } catch (e) {}
      }
    }

    if (this.container) {
      this.container.innerHTML = '';
      this.container.classList.add('hidden');
      if (typeof this.container.setAttribute === 'function') {
        this.container.setAttribute('aria-hidden', 'true');
      }
    }
  }
}
