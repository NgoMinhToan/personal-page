import * as THREE from 'three';

export class BoardCanvasRenderer {
  /**
   * Sinh CanvasTexture sắc nét chuẩn phong cách Manga Panel
   */
  static createBoardTexture(project) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // 1. Nền Panel tối màu
    ctx.fillStyle = '#0f1118';
    ctx.fillRect(0, 0, 1024, 768);

    // 2. Chấm trame Halftone Screentone
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let x = 12; x < 1024; x += 24) {
      for (let y = 12; y < 768; y += 24) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Khung viền ngoài Manga (Bold Inking)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 12;
    ctx.strokeRect(16, 16, 992, 736);

    // Viền trong mỏng
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, 972, 716);

    // 4. Header Manga
    // Huy hiệu Chapter bên trái
    ctx.fillStyle = project.accentColor || '#e11d48';
    ctx.beginPath();
    ctx.moveTo(36, 36);
    ctx.lineTo(240, 36);
    ctx.lineTo(210, 96);
    ctx.lineTo(36, 96);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(project.vol || 'VOL. 01', 54, 80);

    // Huy hiệu Thể loại / Skills bên phải
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(720, 42, 260, 48);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(720, 42, 260, 48);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';
    const tagText = project.skills ? project.skills.map(s => '#' + s.toUpperCase()).slice(0, 2).join(' ') : '#DEV';
    ctx.fillText(tagText, 960, 75);
    ctx.textAlign = 'left';

    // 5. Khu vực trung tâm: Manga Speedlines & Visual Area
    const cx = 512;
    const cy = 360;

    // Gradient nền trung tâm
    const grad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 350);
    grad.addColorStop(0, project.accentColor ? `${project.accentColor}33` : 'rgba(99, 102, 241, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
    ctx.fillStyle = grad;
    ctx.fillRect(40, 110, 944, 480);

    // Speedlines tia chớp / hành động từ tâm
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    for (let angle = 0; angle < Math.PI * 2; angle += 0.12) {
      ctx.beginPath();
      const r1 = 160 + (Math.sin(angle * 10) * 40);
      const r2 = 500;
      ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
      ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
      ctx.stroke();
    }
    ctx.restore();

    // Trung tâm: Icon Emoji & Visual Hero
    ctx.font = '130px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(project.iconEmoji || '⚡', cx, cy - 20);

    // Manga Action Bubble / Banner
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.fillRect(cx - 200, cy + 120, 400, 56);
    ctx.strokeRect(cx - 200, cy + 120, 400, 56);

    ctx.fillStyle = '#000000';
    ctx.font = '900 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CLICK ĐỂ XEM CHI TIẾT 🔍', cx, cy + 155);

    // 6. Khu vực Footer: Tiêu đề & Mô tả
    ctx.fillStyle = 'rgba(10, 12, 18, 0.95)';
    ctx.fillRect(36, 590, 952, 138);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 590, 952, 138);

    // Tiêu đề Manga lớn
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(project.title, 60, 650);

    // Phụ đề
    ctx.fillStyle = project.accentColor || '#38bdf8';
    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(project.subtitle || 'Creative Web Project', 60, 696);

    // Chữ tiếng Nhật trang trí góc phải
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.font = '900 44px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('ドドド...', 960, 680);

    // Tạo Three.js CanvasTexture
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }
}
