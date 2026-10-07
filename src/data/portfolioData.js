/**
 * Dữ liệu Dự án & Kỹ năng - Nông Trại Sáng Tạo 3D (10+ Dự án Parallax)
 */

export const portfolioData = {
  // 1. Danh sách Kỹ năng Công nghệ (Tech Skills)
  skills: [
    { id: 'threejs', name: 'Three.js', color: '#10b981', category: '3D/Graphics' },
    { id: 'webgl', name: 'WebGL & Shaders', color: '#059669', category: '3D/Graphics' },
    { id: 'react', name: 'React', color: '#0284c7', category: 'Frontend' },
    { id: 'node', name: 'Node.js', color: '#16a34a', category: 'Backend' },
    { id: 'ai', name: 'AI / LLM', color: '#ea580c', category: 'AI/ML' },
    { id: 'typescript', name: 'TypeScript', color: '#7c3aed', category: 'Language' },
    { id: 'creative', name: 'Creative Code', color: '#d97706', category: 'Art' }
  ],

  // 2. Danh sách 10+ Dự án gắn liền với Model 3D Asset Nông trại Động
  projects: [
    {
      id: 'doodle-district',
      farmType: 'windmill',
      title: 'Doodle District 3D',
      subtitle: 'Trạm Cối Xay Gió // Multiplayer WebGL Game',
      description: 'Game bắn súng 3D thời gian thực đa người chơi trên trình duyệt. Lấy cảm hứng từ nét vẽ sổ tay mộc mạc, kết hợp vật lý trọng lực Three.js và mạng P2P PeerJS.',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://doodleshooter.vercel.app/',
      githubUrl: 'https://github.com/mtoan/doodle-district',
      accentColor: '#10b981',
      iconEmoji: '🌾'
    },
    {
      id: 'neuro-studio',
      farmType: 'orchard',
      title: 'NeuroStudio Agent',
      subtitle: 'Vườn Táo Trí Tuệ // Autonomous AI Workspace',
      description: 'Nền tảng trợ lý trí tuệ nhân tạo tương tác đa kênh, tích hợp vector database, tự động hóa quy trình phân tích và tạo tài liệu kỹ thuật chất lượng cao.',
      skills: ['react', 'ai', 'node', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/neuro-studio',
      accentColor: '#ef4444',
      iconEmoji: '🍎'
    },
    {
      id: 'quantum-particles',
      farmType: 'garden',
      title: 'Quantum Particle Flow',
      subtitle: 'Luống Rau Hạt Vật Lý // GPU Accelerated Simulation',
      description: 'Mô phỏng 100,000 hạt vật lý tương tác trong không gian 3D bằng Compute Shaders và WebGL. Áp dụng kỹ thuật Instanced Mesh cho tốc độ khung hình 60fps mượt mà.',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/quantum-particles',
      accentColor: '#f97316',
      iconEmoji: '🥕'
    },
    {
      id: 'cyber-pulse',
      farmType: 'well',
      title: 'CyberPulse Analytics',
      subtitle: 'Giếng Nguồn Dữ Liệu // Realtime Stream Monitor',
      description: 'Hệ thống giám sát và phân tích lưu lượng microservices theo thời gian thực. Dashboard trực quan hóa độ trễ, cảnh báo sớm lỗi và phân bổ tài nguyên cloud.',
      skills: ['node', 'react', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/cyber-pulse',
      accentColor: '#0284c7',
      iconEmoji: '💧'
    },
    {
      id: 'neural-canvas',
      farmType: 'cart',
      title: 'Neural Creative Canvas',
      subtitle: 'Xe Kéo Nông Sản // AI Generation Studio',
      description: 'Công cụ sáng tạo nghệ thuật ứng dụng AI: chuyển ảnh chụp thực tế thành tranh vẽ minh họa vector mộc mạc và phong cách hoạt họa rực rỡ.',
      skills: ['ai', 'react', 'creative'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/neural-canvas',
      accentColor: '#eab308',
      iconEmoji: '🌻'
    },
    {
      id: 'voxel-horizon',
      farmType: 'campfire',
      title: 'Voxel Horizon 3D',
      subtitle: 'Lửa Trại Không Gian // Infinite Procedural World',
      description: 'Trình duyệt thế giới voxel 3D vô hạn ngẫu nhiên bằng thuật toán Simplex Noise, tích hợp chu kỳ ngày đêm và ánh sáng đổ bóng động.',
      skills: ['threejs', 'webgl'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/voxel-horizon',
      accentColor: '#8b5cf6',
      iconEmoji: '🔥'
    },
    {
      id: 'barn-hub',
      farmType: 'barn',
      title: 'Red Barn Microservices',
      subtitle: 'Nhà Kho Nông Trại // Distributed Event Hub',
      description: 'Kiến trúc hướng sự kiện (Event-Driven Architecture) với message broker hiệu năng cao, xử lý hàng triệu message mỗi giây cho các dịch vụ đám mây.',
      skills: ['node', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/barn-hub',
      accentColor: '#b91c1c',
      iconEmoji: '🏚️'
    },
    {
      id: 'bee-sync',
      farmType: 'beehive',
      title: 'HoneyBee State Sync',
      subtitle: 'Tổ Ong Mật // Multi-Tab CRDT Data Store',
      description: 'Thư viện đồng bộ hóa dữ liệu thời gian thực đa tab trên trình duyệt không cần máy chủ trung gian, sử dụng thuật toán Conflict-Free Replicated Data Types (CRDT).',
      skills: ['typescript', 'react', 'creative'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/bee-sync',
      accentColor: '#f59e0b',
      iconEmoji: '🐝'
    },
    {
      id: 'meadow-sheep',
      farmType: 'sheep',
      title: 'Fluffy Sheep AI Voice',
      subtitle: 'Đồng Cỏ Cừu Trắng // Voice Agent Interface',
      description: 'Giao diện tương tác giọng nói trí tuệ nhân tạo thời gian thực qua Web Speech API và Whisper, tạo cảm giác đàm thoại tự nhiên với độ trễ cực thấp.',
      skills: ['ai', 'react', 'node'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/meadow-sheep',
      accentColor: '#065f46',
      iconEmoji: '🐑'
    },
    {
      id: 'tractor-build',
      farmType: 'tractor',
      title: 'Vintage Tractor CLI',
      subtitle: 'Máy Cày Nông Trại // Developer Scaffolding Tool',
      description: 'Bộ công cụ CLI tự động hóa tạo khung dự án, tối ưu hóa asset 3D nén Draco GLTF, và kiểm thử hiệu năng WebGL chỉ với một câu lệnh đơn giản.',
      skills: ['node', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/tractor-build',
      accentColor: '#047857',
      iconEmoji: '🚜'
    },
    {
      id: 'greenhouse-gl',
      farmType: 'greenhouse',
      title: 'Botanical Greenhouse 3D',
      subtitle: 'Nhà Kính Thực Vật // Interactive 3D Flora',
      description: 'Trải nghiệm nhà kính thực vật 3D tương tác: mô phỏng quá trình nở hoa, quang hợp và phản xạ ánh sáng mặt trời qua các tấm kính trong suốt.',
      skills: ['threejs', 'webgl', 'creative'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/greenhouse-gl',
      accentColor: '#10b981',
      iconEmoji: '🌿'
    },
    {
      id: 'sunflower-fields',
      farmType: 'sunflower',
      title: 'Golden Sunflower Shader',
      subtitle: 'Cánh Đồng Hướng Dương // Procedural GLSL Art',
      description: 'Tác phẩm nghệ thuật thuật toán (Generative Art) với 50,000 bông hoa hướng dương hướng theo vị trí con trỏ chuột, điều khiển hoàn toàn bằng Vertex Shaders.',
      skills: ['webgl', 'threejs', 'creative'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/sunflower-fields',
      accentColor: '#d97706',
      iconEmoji: '🌻'
    },
    {
      id: 'scarecrow-shield',
      farmType: 'scarecrow',
      title: 'Scarecrow Sentinel WAF',
      subtitle: 'Bù Nhìn Canh Gác // Web Security & Threat Shield',
      description: 'Hệ thống tường lửa thông minh bảo vệ ứng dụng web, phát hiện DDoS và các mẫu tấn công độc hại bằng phân tích hành vi thời gian thực.',
      skills: ['node', 'typescript', 'ai'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/scarecrow-shield',
      accentColor: '#d97706',
      iconEmoji: '🌾'
    },
    {
      id: 'watermill-flow',
      farmType: 'watermill',
      title: 'Watermill Pipeline Engine',
      subtitle: 'Cối Guồng Nước // Reactive Stream Processing',
      description: 'Hệ thống xử lý luồng dữ liệu thời gian thực phản ứng nhanh (Reactive Stream Engine), điều phối và làm sạch hàng triệu sự kiện phân tán mỗi phút.',
      skills: ['node', 'typescript', 'react'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/watermill-flow',
      accentColor: '#0284c7',
      iconEmoji: '🌊'
    },
    {
      id: 'grain-silo-db',
      farmType: 'silo',
      title: 'Silo High-Density Vector DB',
      subtitle: 'Tháp Ngũ Cốc // Vector Embeddings Storage',
      description: 'Cơ sở dữ liệu vector chuyên dụng cho các mô hình ngôn ngữ lớn (LLM), hỗ trợ tìm kiếm ngữ nghĩa siêu tốc độ HNSW và nén dữ liệu hiệu quả.',
      skills: ['ai', 'typescript', 'node'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/grain-silo-db',
      accentColor: '#b45309',
      iconEmoji: '🏗️'
    },
    {
      id: 'duckpond-ui',
      farmType: 'duckpond',
      title: 'DuckPond Micro-Interactions',
      subtitle: 'Hồ Vịt Hoa Súng // Fluid Design System',
      description: 'Bộ thư viện UI Design System hiện đại với các vi chuyển động mượt mà như gợn sóng nước, hỗ trợ Dark Mode và khả năng tiếp cận (Accessibility) đạt chuẩn WCAG AAA.',
      skills: ['react', 'creative', 'typescript'],
      demoUrl: 'https://github.com/mtoan',
      githubUrl: 'https://github.com/mtoan/duckpond-ui',
      accentColor: '#10b981',
      iconEmoji: '🦆'
    }
  ]
};

