/**
 * Dữ liệu Dự án & Kỹ năng - Chủ đề Nông trại Sáng tạo (Creative Farm 3D)
 */

export const portfolioData = {
  // 1. Danh sách Kỹ năng Công nghệ (Tech Skills)
  skills: [
    { id: 'threejs', name: 'Three.js', color: '#10b981', category: '3D/Graphics' },
    { id: 'webgl', name: 'WebGL & Shaders', color: '#059669', category: '3D/Graphics' },
    { id: 'react', name: 'React', color: '#0284c7', category: 'Frontend' },
    { id: 'node', name: 'Node.js', color: '#16a34a', category: 'Backend' },
    { id: 'ai', name: 'AI / LLM', color: '#ea580c', category: 'AI/ML' },
    { id: 'typescript', name: 'TypeScript', color: '#7c3aed', category: 'Language' }
  ],

  // 2. Danh sách Dự án gắn liền với các Công trình Nông trại 3D
  projects: [
    {
      id: 'doodle-district',
      farmType: 'windmill', // Cối xay gió
      title: 'Doodle District 3D',
      subtitle: 'Trạm Cối Xay Gió // Multiplayer Action Game',
      description: 'Game bắn súng 3D thời gian thực đa người chơi chạy trực tiếp trên trình duyệt. Lấy cảm hứng từ những nét vẽ nguệch ngoạc sinh động, tích hợp mạng ngang hàng P2P qua WebRTC/PeerJS.',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://doodleshooter.vercel.app/',
      githubUrl: 'https://github.com/mtoan/doodle-district',
      accentColor: '#10b981',
      iconEmoji: '🌾'
    },
    {
      id: 'neuro-studio',
      farmType: 'orchard', // Vườn táo trĩu quả
      title: 'NeuroStudio Agent',
      subtitle: 'Vườn Quả Trí Tuệ // Autonomous AI Workspace',
      description: 'Nền tảng trợ lý trí tuệ nhân tạo tương tác đa kênh, tích hợp vector database và tự động hóa chuỗi quy trình làm việc thông minh cho kỹ sư phần mềm.',
      skills: ['react', 'ai', 'node', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/neuro-studio',
      accentColor: '#ef4444',
      iconEmoji: '🍎'
    },
    {
      id: 'quantum-particles',
      farmType: 'garden', // Luống rau củ quả
      title: 'Quantum Particle Flow',
      subtitle: 'Nông Trại Hạt Vật Lý // GPU Accelerated Simulation',
      description: 'Mô phỏng 100,000 hạt vật lý tương tác trong không gian 3D bằng Compute Shaders và WebGL. Áp dụng kỹ thuật Instanced Mesh để đạt tốc độ 60fps mượt mà.',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/quantum-particles',
      accentColor: '#f97316',
      iconEmoji: '🥕'
    },
    {
      id: 'cyber-pulse',
      farmType: 'well', // Giếng nước cổ tích
      title: 'CyberPulse Analytics',
      subtitle: 'Giếng Nguồn Dữ Liệu // Realtime Stream Monitor',
      description: 'Hệ thống giám sát và phân tích lưu lượng thời gian thực cho hạ tầng cloud. Trực quan hóa độ trễ, cảnh báo sớm lỗi và biểu đồ phân bổ tài nguyên.',
      skills: ['node', 'react', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/cyber-pulse',
      accentColor: '#0284c7',
      iconEmoji: '💧'
    },
    {
      id: 'neural-canvas',
      farmType: 'cart', // Xe kéo chở nông sản
      title: 'Neural Creative Canvas',
      subtitle: 'Xe Nông Sản Nghệ Thuật // AI Generation Studio',
      description: 'Công cụ sáng tạo nghệ thuật ứng dụng AI: chuyển ảnh thực tế thành nét vẽ phác thảo mộc mạc và tranh minh họa vector chất lượng cao.',
      skills: ['ai', 'react', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/neural-canvas',
      accentColor: '#eab308',
      iconEmoji: '🌻'
    },
    {
      id: 'voxel-horizon',
      farmType: 'campfire', // Lều trại & Lửa trại
      title: 'Voxel Horizon 3D',
      subtitle: 'Lửa Trại Không Gian // Infinite Procedural World',
      description: 'Trình duyệt thế giới 3D vô hạn được tạo ngẫu nhiên bằng thuật toán Simplex Noise, tích hợp chu kỳ ngày đêm và ánh sáng đổ bóng chân thực.',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/voxel-horizon',
      accentColor: '#8b5cf6',
      iconEmoji: '🔥'
    }
  ]
};
