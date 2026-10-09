/**
 * Dữ liệu Dự án & Kỹ năng - Nông Trại Sáng Tạo 3D & GitHub Portfolio
 * Tự động đồng bộ và quét sâu từ GitHub chính thức: https://github.com/NgoMinhToan
 */

export const portfolioData = {
  // Thông tin Tác giả & Bìa Sổ Tay (Author Profile & Memo Cover)
  profile: {
    name: 'Ngô Minh Toàn (NgoMinhToan)',
    title: 'Fullstack & Creative Mobile/Web Engineer',
    location: 'Việt Nam',
    tagline: 'Kiến tạo thế giới số: AI Voice/Dubbing, 3D WebGL, Mobile Flutter/React-Native & Hệ thống Web Đa nền tảng.',
    statusQuote: '“Mỗi dòng code là một nét vẽ, mỗi dự án là một trang nhật ký.”',
    badgeNote: 'Sổ Tay Sáng Tạo Kokuyo Campus // Volume 2026',
    avatarDoodle: '👨‍💻✏️',
    stats: [
      { label: 'Dự án Đã Thực Hiện', value: '16+' },
      { label: 'Công Nghệ Sử Dụng', value: '7+' },
      { label: 'Dự án Trên GitHub', value: '37+' }
    ],
    socials: [
      { id: 'github', label: 'GitHub', url: 'https://github.com/NgoMinhToan', icon: '💻' },
      { id: 'email', label: 'Email Liên Hệ', url: 'mailto:contact@minhtoan.site', icon: '📬' },
      { id: 'cv', label: 'Hồ Sơ Năng Lực (CV)', url: 'https://github.com/NgoMinhToan', icon: '📎' }
    ]
  },

  // 1. Danh sách Kỹ năng Công nghệ (Tech Skills)
  skills: [
    { id: 'threejs', name: 'Three.js', color: '#10b981', category: '3D/Graphics' },
    { id: 'webgl', name: 'WebGL & Shaders', color: '#059669', category: '3D/Graphics' },
    { id: 'react', name: 'React / React Native', color: '#0284c7', category: 'Frontend' },
    { id: 'node', name: 'Node.js', color: '#16a34a', category: 'Backend' },
    { id: 'ai', name: 'AI / TTS & Dubbing', color: '#ea580c', category: 'AI/ML' },
    { id: 'typescript', name: 'TypeScript', color: '#7c3aed', category: 'Language' },
    { id: 'creative', name: 'Python & Mobile', color: '#d97706', category: 'Mobile/Python' }
  ],

  // 2. Danh sách 16 Dự án THẬT từ https://github.com/NgoMinhToan (đã loại bỏ 100% dự án mẫu)
  projects: [
    {
      id: 'vienue-dubbing-cpu',
      farmType: 'windmill',
      title: 'VieNeu Dubbing WebUI',
      subtitle: 'Local Voice Dubbing // MP3 & Dual-Audio MKV Export',
      description: 'WebUI lồng tiếng tiếng Việt chạy cục bộ bằng mô hình VieNeu-TTS: nhập video và phụ đề SRT, chỉnh sửa timeline trực quan, điều chỉnh tốc độ, quản lý từ điển phát âm và xuất file âm thanh MP3 hoặc video MKV có 2 audio track song song.',
      details: 'Dự án cung cấp một bộ công cụ hoàn chỉnh chạy offline trên CPU: editor kéo thả lời thoại trên timeline mượt mà với tính năng zoom chuột 1-20x, kiểm soát ngắt nghỉ tự động, cảnh báo câu chồng chéo hoặc tràn thời lượng, cùng phòng thu clone giọng và từ điển phiên âm quy tắc tùy biến.',
      features: [
        'Editor timeline đa luồng: Zoom 1–20x, dời mốc 0.1s, đồng bộ lời thoại và preview video tức thời',
        'Quản lý hàng đợi và xuất video MKV dual-track (giữ âm gốc + giọng lồng tiếng Việt) và audio MP3',
        'Tích hợp Phòng thu clone giọng cá nhân và từ điển phát âm tùy biến (viết là - đọc thành)'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/editor.png',
      skills: ['ai', 'creative'],
      demoUrl: 'https://github.com/NgoMinhToan/vienue-dubbing',
      githubUrl: 'https://github.com/NgoMinhToan/vienue-dubbing',
      accentColor: '#10b981',
      iconEmoji: '🎙️',
      badgeStatus: 'FEATURED',
      year: '2025'
    },
    {
      id: 'vieneu-video-dubbing',
      farmType: 'orchard',
      title: 'VieNeu Video Dubbing Engine',
      subtitle: 'Self-Hosted AI Dubbing // FastAPI, FFmpeg & Docker',
      description: 'Hệ thống tự động hóa lồng tiếng video trọn vẹn theo phụ đề (self-hosted) ứng dụng mô hình VieNeu-TTS 3.3.0 ONNX INT8 tối ưu hóa cho CPU, điều phối xử lý âm thanh đa luồng bằng FFmpeg và kiến trúc backend FastAPI.',
      details: 'Ứng dụng hỗ trợ upload trực tiếp hoặc gắn mount thư mục media chỉ đọc, tự động đo thời lượng video bằng ffprobe, cắt và ghép nối các phân đoạn audio chính xác từng millisecond, đóng gói container Docker đa nền tảng và cung cấp REST API cho toàn bộ quy trình sinh âm thanh.',
      features: [
        'Mô hình VieNeu-TTS 3.3.0 ONNX INT8 chạy trực tiếp CPU không đòi hỏi card đồ họa rời đắt tiền',
        'Pipeline xử lý video tự động: ffprobe dò thông số, ffmpeg tách lớp âm thanh và mix phụ đề',
        'Kiến trúc Docker & Docker Compose sẵn sàng self-host trên homelab hoặc VPS với giao diện responsive'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/export.png',
      skills: ['ai', 'creative'],
      demoUrl: 'https://github.com/NgoMinhToan/vieneu-video-dubbing',
      githubUrl: 'https://github.com/NgoMinhToan/vieneu-video-dubbing',
      accentColor: '#ef4444',
      iconEmoji: '🎬',
      badgeStatus: 'FEATURED',
      year: '2025'
    },
    {
      id: 'vni-doc2pdf',
      farmType: 'garden',
      title: 'VNI Doc2PDF Converter',
      subtitle: 'Online Document Service // LibreOffice Headless & Docker',
      description: 'Web service chuyên dụng giúp chuyển đổi tài liệu văn bản Word cũ (.doc, .docx) sang PDF giữ trọn vẹn định dạng, đặc biệt tối ưu cho các bảng mã tiếng Việt cổ điển như VNI-Windows, TCVN3 (ABC), VGA, Wingdings trên môi trường Linux.',
      details: 'Giải quyết triệt để lỗi mất font tiếng Việt khi chuyển đổi tài liệu văn bản cũ trên hệ điều hành Linux bằng cách tích hợp bộ font VNI đầy đủ vào container Docker cùng LibreOffice Headless, xử lý tải lên hàng loạt qua Multer và tự động dọn dẹp cache sau xử lý.',
      features: [
        'Chuyển đổi file Word đơn lẻ hoặc nhiều file cùng lúc bằng LibreOffice Headless trên Linux',
        'Tích hợp trọn bộ font VNI, TCVN3, VGA, Wingdings, Webdings không bao giờ lỗi font chữ',
        'Dịch vụ chạy trực tiếp trên Docker, dọn dẹp cache tự động và bảo mật dữ liệu tải lên'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vni_doc2pdf/main/public/icon-512.png',
      skills: ['node', 'typescript'],
      demoUrl: 'https://doc2pdf.minhtoan.site/',
      githubUrl: 'https://github.com/NgoMinhToan/vni_doc2pdf',
      accentColor: '#f97316',
      iconEmoji: '📄',
      badgeStatus: 'COMPLETED',
      year: '2024'
    },
    {
      id: 'my-manga',
      farmType: 'well',
      title: 'My-Manga Flutter App',
      subtitle: 'Mobile Manga Reader // MangaDex API & Flutter BLoC',
      description: 'Ứng dụng đọc truyện tranh di động đa nền tảng (Android & iOS) phát triển bằng Flutter và Dart SDK 3.5, kết nối dữ liệu từ API MangaDex với khả năng tìm kiếm manga, đánh dấu chap đã đọc và tải truyện đọc offline.',
      details: 'Xây dựng với kiến trúc Flutter BLoC và GetIt Dependency Injection, tích hợp GetStorage và SharedPreferences để lưu trữ bookmark cục bộ, ScreenUtil tự động tương thích mọi tỷ lệ màn hình điện thoại và máy tính bảng, cùng GoRouter tối ưu luồng điều hướng trang.',
      features: [
        'Kiến trúc Flutter BLoC 9.0 kết hợp GetIt giúp luồng quản lý trạng thái rõ ràng, dễ mở rộng',
        'Đồng bộ danh sách chương và trang ảnh phân giải cao từ MangaDex API kèm caching thông minh',
        'Hỗ trợ chế độ đọc truyện lướt liên tục (Webtoon) và lật trang truyền thống mượt mà'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/studio.png',
      skills: ['creative', 'typescript'],
      demoUrl: 'https://github.com/NgoMinhToan/My-Manga',
      githubUrl: 'https://github.com/NgoMinhToan/My-Manga',
      accentColor: '#0284c7',
      iconEmoji: '📖',
      badgeStatus: 'COMPLETED',
      year: '2024'
    },
    {
      id: 'vnexpress-platform',
      farmType: 'cart',
      title: 'VnExpress News Portal',
      subtitle: 'ReactJS News Client & Django Crawler Server',
      description: 'Hệ thống báo điện tử tổng hợp thông tin tự động: Backend Python Django + MongoDB thu thập và làm sạch tin tức từ VnExpress theo chu kỳ; Frontend ReactJS hiển thị giao diện đọc báo hiện đại, phân loại chuyên mục và tối ưu tốc độ tải trang.',
      details: 'Kiến trúc tách rời (Decoupled Architecture): Server thu thập dữ liệu bằng BeautifulSoup4, lưu trữ vào MongoDB Atlas qua Djongo engine, cung cấp API JSON cho client ReactJS render danh sách bài viết thời gian thực với phân trang mượt mà.',
      features: [
        'Crawler tự động thu thập tin tức thời gian thực từ VnExpress bằng BeautifulSoup4 và cron job',
        'Backend Python Django REST API kết nối cơ sở dữ liệu MongoDB lưu trữ cấu trúc bài viết',
        'Giao diện đọc báo ReactJS responsive, phân loại chuyên mục và trải nghiệm đọc tin tối giản'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/queue.png',
      skills: ['react', 'node', 'creative'],
      demoUrl: 'https://vnexpressnews.netlify.app/',
      githubUrl: 'https://github.com/NgoMinhToan/VnExpress_client',
      accentColor: '#eab308',
      iconEmoji: '📰',
      badgeStatus: 'FEATURED',
      year: '2024'
    },
    {
      id: 'hotel-booking-web',
      farmType: 'campfire',
      title: 'Hotel Booking System',
      subtitle: 'Hospitality Reservation Web App // PHP & MySQL',
      description: 'Hệ thống website đặt phòng khách sạn trực tuyến toàn diện: giao diện người dùng tìm kiếm, xem chi tiết loại phòng, đặt lịch theo ngày cùng trang quản trị (Admin Dashboard) quản lý phòng, khách hàng và doanh thu.',
      details: 'Được thiết kế đầy đủ luồng nghiệp vụ lưu trú: kiểm tra trạng thái phòng trống, tính toán chi phí theo số đêm và dịch vụ đi kèm, xác thực phân quyền quản trị viên, cung cấp cẩm nang du lịch và phản hồi khách hàng.',
      features: [
        'Hệ thống quản lý đặt phòng khách sạn trực quan, hiển thị tiện nghi và chi phí theo thời gian thực',
        'Trang Admin quản trị danh mục phòng, duyệt đơn đặt phòng và quản lý tài khoản khách hàng',
        'Tích hợp cẩm nang du lịch, đánh giá phản hồi từ khách và tra cứu lịch sử đặt phòng'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/Project_Web-App/master/app/CamNang/images/0.jpg',
      skills: ['react', 'creative'],
      demoUrl: 'https://github.com/NgoMinhToan/Project_Web-App',
      githubUrl: 'https://github.com/NgoMinhToan/Project_Web-App',
      accentColor: '#8b5cf6',
      iconEmoji: '🏨',
      badgeStatus: 'COMPLETED',
      year: '2023'
    },
    {
      id: 'short-link-platform',
      farmType: 'barn',
      title: 'ShortLink URL Shortener',
      subtitle: 'URL Shortener Service // Docker & MongoDB',
      description: 'Ứng dụng rút gọn đường dẫn URL tốc độ cao với kiến trúc phân tách Client-Server, lưu trữ liên kết trên MongoDB và đóng gói sẵn Docker Compose cho phép triển khai chỉ với một câu lệnh.',
      details: 'Hệ thống bao gồm REST API backend Node.js/Express xử lý sinh mã hash rút gọn, kiểm tra trùng lặp và điều hướng nhanh (HTTP 301/302 Redirect), kết hợp giao diện web frontend cho phép người dùng nhập link và sao chép kết quả tức thì.',
      features: [
        'Thuật toán mã hóa và sinh mã URL ngắn gọn, truy xuất và chuyển hướng siêu tốc',
        'Kiến trúc Client - Server tách biệt kết nối MongoDB lưu trữ lịch sử tạo liên kết',
        'Hỗ trợ cấu hình Docker Compose và biến môi trường .env triển khai linh hoạt'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/dictionary.png',
      skills: ['node', 'react', 'typescript'],
      demoUrl: 'https://github.com/NgoMinhToan/short_link',
      githubUrl: 'https://github.com/NgoMinhToan/short_link',
      accentColor: '#b91c1c',
      iconEmoji: '🔗',
      badgeStatus: 'COMPLETED',
      year: '2023'
    },
    {
      id: 'spotify-clone-web',
      farmType: 'beehive',
      title: 'Spotify Web Player Clone',
      subtitle: 'Streaming UI // Vite, TypeScript, React Query & Antd',
      description: 'Bản sao trình phát nhạc Spotify Web Player hiện đại xây dựng bằng Vite, React 18, TypeScript và Spotify Web API, hỗ trợ phát nhạc trực tuyến, quản lý danh sách phát và tìm kiếm nghệ sĩ.',
      details: 'Tận dụng TanStack React Query để quản lý server state và cache bài hát, thư viện Ant Design tùy biến giao diện đen nhám đặc trưng của Spotify, điều hướng mượt mà với History API và cơ chế xác thực OAuth 2.0 PKCE với Spotify Dashboard.',
      features: [
        'Tích hợp Spotify Web API chính thức: Đăng nhập OAuth 2.0, lấy danh sách phát và profile người dùng',
        'Quản lý dữ liệu bất đồng bộ mượt mà với TanStack React Query và tối ưu bundle bằng Vite & TypeScript',
        'Giao diện Dark Mode chuẩn Spotify với thanh điều khiển phát nhạc, chỉnh âm lượng và tìm kiếm bài hát'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/Spotify_Clone/main/public/Spotify_icon.svg',
      skills: ['react', 'typescript'],
      demoUrl: 'https://github.com/NgoMinhToan/Spotify_Clone',
      githubUrl: 'https://github.com/NgoMinhToan/Spotify_Clone',
      accentColor: '#f59e0b',
      iconEmoji: '🎵',
      badgeStatus: 'FEATURED',
      year: '2024'
    },
    {
      id: 'react-native-audio-speaker',
      farmType: 'sheep',
      title: 'RN Audio Speaker Module',
      subtitle: 'Native Bridge Module // Kotlin, Java & Objective-C',
      description: 'Thư viện cầu nối phần cứng (Native Bridge) cho React Native hỗ trợ điều khiển luồng phát âm thanh linh hoạt giữa loa ngoài (Loudspeaker) và loa thoại tai nghe (Earpiece) trên cả 2 nền tảng Android và iOS.',
      details: 'Được đóng gói chuẩn thư viện npm module với mã nguồn Native Android (AudioManager API) và iOS (AVAudioSession), giải quyết bài toán đàm thoại VoIP và phát tin nhắn thoại chất lượng cao trong các ứng dụng chat/call đa nền tảng.',
      features: [
        'Chuyển đổi âm thanh tức thời giữa loa ngoài và loa trong đàm thoại không gây gián đoạn luồng phát',
        'Tương thích hoàn toàn cả 2 hệ điều hành Android và iOS với cơ chế Native Bridge hiệu năng cao',
        'Đóng gói chuẩn npm module kèm tài liệu tích hợp Podfile và Gradle chi tiết'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vni_doc2pdf/main/logo.png',
      skills: ['react', 'creative'],
      demoUrl: 'https://github.com/NgoMinhToan/react-native-audio-speaker',
      githubUrl: 'https://github.com/NgoMinhToan/react-native-audio-speaker',
      accentColor: '#065f46',
      iconEmoji: '🔊',
      badgeStatus: 'FEATURED',
      year: '2024'
    },
    {
      id: 'rn-draw-overlay-permission',
      farmType: 'tractor',
      title: 'RN Draw Overlay Permission',
      subtitle: 'Android System Alert Window // Bridge Module',
      description: 'Module cầu nối React Native hỗ trợ kiểm tra, yêu cầu và điều hướng người dùng đến cài đặt cấp quyền vẽ đè lên ứng dụng khác (SYSTEM_ALERT_WINDOW / Draw over other apps) trên hệ điều hành Android.',
      details: 'Module thiết yếu cho các ứng dụng cần hiển thị cửa sổ bong bóng chat (chathead), popup cuộc gọi đến hoặc nút nổi trên màn hình điện thoại, tương thích các phiên bản Android mới nhất với cơ chế xử lý quyền an toàn.',
      features: [
        'Kiểm tra trạng thái quyền vẽ đè của ứng dụng trước khi kích hoạt cửa sổ nổi',
        'Tự động mở trang cài đặt hệ thống Android để người dùng cấp quyền với trải nghiệm liền mạch',
        'Cung cấp Promise API đơn giản, dễ dàng tích hợp vào bất kỳ dự án React Native nào'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vni_doc2pdf/main/public/icon-192.png',
      skills: ['react', 'creative'],
      demoUrl: 'https://github.com/NgoMinhToan/rn-draw-overlay-permission',
      githubUrl: 'https://github.com/NgoMinhToan/rn-draw-overlay-permission',
      accentColor: '#047857',
      iconEmoji: '📱',
      badgeStatus: 'COMPLETED',
      year: '2024'
    },
    {
      id: 'cloudinary-uploader-service',
      farmType: 'greenhouse',
      title: 'Cloudinary Multi-Uploader API',
      subtitle: 'Cloud Media Manager // Node.js, Express & Multer',
      description: 'Dịch vụ lưu trữ và tải lên tệp tin đa phương tiện lên máy chủ đám mây qua Cloudinary API: hỗ trợ kéo thả tệp, tối ưu định dạng ảnh/video tự động và sinh đường dẫn CDN bảo mật với tốc độ cao.',
      details: 'Xây dựng với Node.js, Express và Multer lưu trữ tạm, cấu hình CORS linh hoạt cho phép kết nối từ mọi frontend client, tự động nén kích thước ảnh và cung cấp đường dẫn CDN tối ưu hóa băng thông.',
      features: [
        'Tải lên tệp ảnh và video đa định dạng thông qua Multer và Cloudinary SDK',
        'Tự động xử lý tối ưu hóa kích thước và chất lượng hình ảnh trên hạ tầng Cloudinary CDN',
        'Cấu hình môi trường bảo mật .env và API RESTful dễ dàng tích hợp vào các hệ thống web'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/editor.png',
      skills: ['react', 'node'],
      demoUrl: 'https://cloudinary-uploader-one.vercel.app',
      githubUrl: 'https://github.com/NgoMinhToan/CloudinaryUploader',
      accentColor: '#10b981',
      iconEmoji: '☁️',
      badgeStatus: 'COMPLETED',
      year: '2024'
    },
    {
      id: 'nextjs-real-estate',
      farmType: 'sunflower',
      title: 'NextJS Real Estate Portal',
      subtitle: 'Property Finder // Server-Side Rendering (SSR)',
      description: 'Nền tảng tìm kiếm và tra cứu thông tin bất động sản xây dựng bằng framework Next.js: tận dụng Server-Side Rendering (SSR) để tăng tốc tải trang và tối ưu hóa công cụ tìm kiếm (SEO).',
      details: 'Dự án áp dụng cấu trúc thư mục linh hoạt của Next.js, tích hợp bộ lọc bất động sản theo khoảng giá, vị trí địa lý, diện tích và loại hình nhà ở, đi kèm trang chi tiết căn hộ với thư viện ảnh sắc nét.',
      features: [
        'Kiến trúc Next.js Server-Side Rendering mang lại tốc độ hiển thị cực nhanh và chuẩn SEO',
        'Bộ lọc tìm kiếm bất động sản đa tiêu chí: mức giá, số phòng ngủ, diện tích và khu vực',
        'Giao diện hiện đại, trực quan, hỗ trợ xem album ảnh thực tế của từng bất động sản'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/nextJs_realEstate/master/assets/images/house.jpg',
      skills: ['react', 'node', 'typescript'],
      demoUrl: 'https://github.com/NgoMinhToan/nextJs_realEstate',
      githubUrl: 'https://github.com/NgoMinhToan/nextJs_realEstate',
      accentColor: '#d97706',
      iconEmoji: '🏡',
      badgeStatus: 'COMPLETED',
      year: '2023'
    },
    {
      id: 'store-redux-saga',
      farmType: 'scarecrow',
      title: 'Redux Saga E-Commerce Store',
      subtitle: 'State Management // React, Redux Toolkit & Saga',
      description: 'Ứng dụng thương mại điện tử trực tuyến tập trung vào kiến trúc quản lý trạng thái nâng cao với Redux Toolkit và Redux-Saga: xử lý các tác vụ bất đồng bộ phức tạp như giỏ hàng, đặt hàng và cập nhật tồn kho.',
      details: 'Sử dụng mô hình Generator functions của Redux-Saga để quản lý side-effects, xử lý retry khi rớt mạng, đồng bộ giỏ hàng với LocalStorage và tách biệt hoàn toàn business logic khỏi các component giao diện React.',
      features: [
        'Mô hình quản lý luồng dữ liệu bất đồng bộ quy mô lớn với Redux-Saga và Redux Toolkit',
        'Quy trình giỏ hàng toàn diện: Thêm, sửa số lượng, tính tổng tiền, mã giảm giá và đặt hàng',
        'Tách bạch rõ ràng giữa Presentation layer và Business logic, hỗ trợ Unit Test trực quan'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/queue.png',
      skills: ['react', 'typescript'],
      demoUrl: 'https://store-redux.netlify.app/',
      githubUrl: 'https://github.com/NgoMinhToan/store',
      accentColor: '#d97706',
      iconEmoji: '🛍️',
      badgeStatus: 'COMPLETED',
      year: '2023'
    },
    {
      id: 'discord-bot-automations',
      farmType: 'watermill',
      title: 'Discord Bot Automations',
      subtitle: 'Server Bot Utility // TypeScript, Discord.js & Docker',
      description: 'Bot tiện ích tự động hóa cho cộng đồng máy chủ Discord xây dựng bằng TypeScript và Discord.js 14: lắng nghe sự kiện thời gian thực, quản lý phân quyền thành viên, tích hợp webhook và bảng điều khiển Express.',
      details: 'Được đóng gói với Docker & Docker Compose và biên dịch siêu tốc bằng esbuild, bot tích hợp máy chủ web Express song song để quản trị cấu hình kênh qua giao diện web và đồng bộ thông báo webhook tự động.',
      features: [
        'Biên dịch và đóng gói siêu nhanh với esbuild, hỗ trợ hot-reload trong môi trường Docker',
        'Tích hợp Discord.js v14 xử lý Slash Commands và tương tác tin nhắn thời gian thực',
        'Trang web điều khiển cấu hình kênh (Config Channel) thông qua REST API Express tích hợp'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/studio.png',
      skills: ['node', 'typescript'],
      demoUrl: 'https://github.com/NgoMinhToan/discord-bot',
      githubUrl: 'https://github.com/NgoMinhToan/discord-bot',
      accentColor: '#0284c7',
      iconEmoji: '🤖',
      badgeStatus: 'COMPLETED',
      year: '2024'
    },
    {
      id: 'facebook-post-scan',
      farmType: 'silo',
      title: 'Facebook Post Scanner',
      subtitle: 'Social Data Monitor // Next.js, Prisma ORM & Cheerio',
      description: 'Hệ thống theo dõi và phân tích bài viết mạng xã hội xây dựng bằng Next.js Fullstack, Prisma ORM và Cheerio: quét nội dung bài viết, thống kê tương tác và quản lý dữ liệu trên cơ sở dữ liệu quan hệ.',
      details: 'Hệ thống gồm công cụ thu thập dữ liệu bằng Cheerio, mô hình hóa cơ sở dữ liệu bằng Prisma ORM, giao diện quản trị hiện đại phát triển với Radix UI và TailwindCSS, phục vụ cho việc thống kê và theo dõi xu hướng thông tin.',
      features: [
        'Thu thập và trích xuất dữ liệu bài viết tự động với Cheerio crawler hiệu năng cao',
        'Quản lý cấu trúc dữ liệu với Prisma ORM, Prisma Studio và cơ sở dữ liệu quan hệ',
        'Giao diện người dùng Next.js hiện đại với Radix UI, hỗ trợ lọc và xem bài viết chi tiết'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/vienue-dubbing/main/docs/images/dictionary.png',
      skills: ['node', 'typescript', 'react'],
      demoUrl: 'https://github.com/NgoMinhToan/facebook_post_scan',
      githubUrl: 'https://github.com/NgoMinhToan/facebook_post_scan',
      accentColor: '#b45309',
      iconEmoji: '🔍',
      badgeStatus: 'COMPLETED',
      year: '2024'
    },
    {
      id: 'fake-news-detection',
      farmType: 'duckpond',
      title: 'Fake News AI Detection',
      subtitle: 'Natural Language Processing // Machine Learning & PyTorch',
      description: 'Mô hình học máy xử lý ngôn ngữ tự nhiên (NLP) phân loại và phát hiện tin giả trên tập dữ liệu ReINTEL: phân tích văn bản kết hợp hình ảnh bài báo để đưa ra điểm số xác thực thông tin đáng tin cậy.',
      details: 'Dự án áp dụng các mô hình học sâu (Deep Learning) huấn luyện trên tập dữ liệu ReINTEL tiếng Việt, trích xuất đặc trưng ngữ nghĩa của câu từ cùng đặc trưng hình ảnh bài báo nhằm phát hiện các tin tức có tính chất sai lệch và giật gân.',
      features: [
        'Mô hình học sâu đa phương thức (Multimodal) kết hợp phân tích văn bản và hình ảnh đính kèm',
        'Huấn luyện và đánh giá trên bộ dữ liệu kiểm thử tin tức tiếng Việt ReINTEL thực tế',
        'Đưa ra chỉ số tin cậy (Confidence Score) hỗ trợ người đọc thẩm định độ chính xác của tin tức'
      ],
      image: 'https://raw.githubusercontent.com/NgoMinhToan/Fake-News-Detection/master/data/ReINTEL/public_test_final_images/4380/4380_0.jpg',
      skills: ['ai', 'creative'],
      demoUrl: 'https://github.com/NgoMinhToan/Fake-News-Detection',
      githubUrl: 'https://github.com/NgoMinhToan/Fake-News-Detection',
      accentColor: '#10b981',
      iconEmoji: '🛡️',
      badgeStatus: 'EXPERIMENT',
      year: '2023'
    }
  ]
};
