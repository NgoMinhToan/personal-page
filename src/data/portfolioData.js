/**
 * Cấu hình danh mục Kỹ năng và Dự án cá nhân
 * Bạn có thể dễ dàng thêm, sửa hoặc xóa kỹ năng và dự án trực tiếp tại đây!
 */

export const portfolioData = {
  // 1. Danh sách Kỹ năng Công nghệ (Tech Skills)
  skills: [
    { id: 'threejs', name: 'Three.js', color: '#38bdf8', category: '3D/Graphics' },
    { id: 'webgl', name: 'WebGL & Shaders', color: '#10b981', category: '3D/Graphics' },
    { id: 'react', name: 'React', color: '#60a5fa', category: 'Frontend' },
    { id: 'node', name: 'Node.js', color: '#22c55e', category: 'Backend' },
    { id: 'ai', name: 'AI / LLM', color: '#f43f5e', category: 'AI/ML' },
    { id: 'typescript', name: 'TypeScript', color: '#a855f7', category: 'Language' }
  ],

  // 2. Danh sách Dự án Cá nhân (Personal Projects)
  projects: [
    {
      id: 'doodle-district',
      vol: 'VOL. 01',
      title: 'Doodle District 3D',
      subtitle: 'Multiplayer WebGL Action Game',
      description: 'Game bắn súng 3D thời gian thực đa người chơi chạy trực tiếp trên web với phong cách vẽ tay sổ tay cá tính. Sử dụng Three.js để dựng phối cảnh 3D phong cách doodle và PeerJS để truyền dữ liệu thời gian thực P2P.',
      thumbnail: '', // Để trống sẽ tự sinh canvas vector manga
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://doodleshooter.vercel.app/',
      githubUrl: 'https://github.com/mtoan/doodle-district',
      accentColor: '#38bdf8',
      iconEmoji: '🕹️'
    },
    {
      id: 'neuro-studio',
      vol: 'VOL. 02',
      title: 'NeuroStudio Agent',
      subtitle: 'Autonomous AI Workspace Platform',
      description: 'Nền tảng trợ lý trí tuệ nhân tạo tương tác đa kênh, tích hợp vector database, tự động hóa quy trình phân tích dữ liệu và sinh tài liệu kỹ thuật chất lượng cao với tốc độ xử lý tức thì.',
      thumbnail: '',
      skills: ['react', 'ai', 'node', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/neuro-studio',
      accentColor: '#f43f5e',
      iconEmoji: '🤖'
    },
    {
      id: 'quantum-particles',
      vol: 'VOL. 03',
      title: 'Quantum Particle Flow',
      subtitle: 'GPU Accelerated Physics Simulation',
      description: 'Mô phỏng 100,000 hạt vật lý tương tác trong không gian 3D bằng Compute Shaders và WebGL. Tối ưu hóa hiệu năng bằng kỹ thuật Instanced Mesh và GPU instancing cho tốc độ khung hình 60fps mượt mà.',
      thumbnail: '',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/quantum-particles',
      accentColor: '#10b981',
      iconEmoji: '✨'
    },
    {
      id: 'cyber-pulse',
      vol: 'VOL. 04',
      title: 'CyberPulse Analytics',
      subtitle: 'Realtime Infrastructure Monitor',
      description: 'Hệ thống giám sát và phân tích lưu lượng microservices theo thời gian thực. Cung cấp dashboard trực quan hóa độ trễ, cảnh báo sớm lỗi hệ thống và phân bổ tải thông minh.',
      thumbnail: '',
      skills: ['node', 'react', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/cyber-pulse',
      accentColor: '#fbbf24',
      iconEmoji: '⚡'
    },
    {
      id: 'neural-canvas',
      vol: 'VOL. 05',
      title: 'Neural Manga Canvas',
      subtitle: 'AI Image Generation & Ink Vectorizer',
      description: 'Công cụ sáng tạo truyện tranh manga tự động: chuyển ảnh chụp thực tế thành các khung tranh manga vẽ mực đen tương phản cao kết hợp chấm trame halftone bằng AI.',
      thumbnail: '',
      skills: ['ai', 'react', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/neural-canvas',
      accentColor: '#e11d48',
      iconEmoji: '🎨'
    },
    {
      id: 'voxel-horizon',
      vol: 'VOL. 06',
      title: 'Voxel Horizon 3D',
      subtitle: 'Infinite Procedural Universe',
      description: 'Trình duyệt thế giới voxel vô hạn được tạo ngẫu nhiên bằng thuật toán Simplex Noise 3D, tích hợp ánh sáng đổ bóng động và shader mặt nước phản chiếu thời gian thực.',
      thumbnail: '',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/voxel-horizon',
      accentColor: '#a855f7',
      iconEmoji: '🌌'
    }
  ]
};
