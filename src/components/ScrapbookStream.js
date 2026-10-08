const SKETCH_BADGE_SVGS = {
  windmill: `<svg class="badge-windmill" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.35"/>
    <polygon points="14,31 16,18 20,18 22,31" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="15" y1="23" x2="21" y2="23" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="14.5" y1="27" x2="21.5" y2="27" stroke="#1e293b" stroke-width="0.8"/>
    <path d="M16.5,31 v-4 a1.5,1.5 0 0 1 3,0 v4" fill="#1e293b"/>
    <path d="M15,18 Q18,14 21,18 Z" fill="#fb923c" stroke="#1e293b" stroke-width="1.2"/>
    <line x1="7" y1="7" x2="29" y2="29" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="29" y1="7" x2="7" y2="29" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
    <polygon points="8,7 13,5 16,16 14,17" fill="#fde047" fill-opacity="0.75" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <polygon points="28,7 26,2 19,15 20,17" fill="#fde047" fill-opacity="0.75" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <polygon points="28,29 23,31 20,20 22,19" fill="#fde047" fill-opacity="0.75" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <polygon points="8,29 10,34 17,21 16,19" fill="#fde047" fill-opacity="0.75" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <circle cx="18" cy="18" r="1.8" fill="#ef4444" stroke="#1e293b" stroke-width="1.2"/>
  </svg>`,

  orchard: `<svg class="badge-orchard" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fecaca" fill-opacity="0.4"/>
    <path d="M18,13 C14,10 8,14 8,22 C8,28 13,31 18,30 C23,31 28,28 28,22 C24.5,21.5 24,18 26.5,16.5 C27,15 25,11 18,13 Z" fill="#ef4444" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M28,22 C24.5,21.5 24,18 26.5,16.5 C25,18 25,20.5 28,22 Z" fill="#faf6ed" stroke="#1e293b" stroke-width="0.9"/>
    <path d="M11,21 C11,25 14,28 17,28" stroke="#1e293b" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M12,18 C12,22 14,25 16,25" stroke="#1e293b" stroke-width="0.8" stroke-linecap="round"/>
    <path d="M18,13 C18,9 21,6 21,6" stroke="#78350f" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M19,9 C22,7 26,8 26,8 C26,8 25,12 21,11 C19.5,11 19,9 19,9 Z" fill="#86efac" stroke="#1e293b" stroke-width="1" stroke-linejoin="round"/>
  </svg>`,

  garden: `<svg class="badge-garden" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fed7aa" fill-opacity="0.4"/>
    <path d="M16,13 C13,9 11,5 9,6 M16,13 C14,7 16,4 17,3 M18,12 C19,7 22,4 24,5 M19,13 C22,9 25,7 27,9" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M12,6 Q16,8 17,12 Q20,8 23,5" fill="#86efac" fill-opacity="0.8"/>
    <path d="M13,14 C14,12 22,12 23,14 C23,17 19,30 18,32 C17,30 13,17 13,14 Z" fill="#fb923c" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="15" y1="18" x2="19" y2="19" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
    <line x1="16" y1="22" x2="20" y2="23" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
    <line x1="16.5" y1="26" x2="19.5" y2="27" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
  </svg>`,

  well: `<svg class="badge-well" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.35"/>
    <polygon points="18,6 7,13 29,13" fill="#fde047" fill-opacity="0.8" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="12" y1="10" x2="12" y2="13" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="24" y1="10" x2="24" y2="13" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="10" y1="13" x2="10" y2="23" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="26" y1="13" x2="26" y2="23" stroke="#1e293b" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="10" y1="15" x2="26" y2="15" stroke="#1e293b" stroke-width="1"/>
    <line x1="18" y1="15" x2="18" y2="19" stroke="#78350f" stroke-width="1.2"/>
    <path d="M16,19 h4 l-0.5,3.5 h-3 z" fill="#fb923c" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <ellipse cx="18" cy="23" rx="9" ry="3" fill="#bae6fd" stroke="#1e293b" stroke-width="1.3"/>
    <path d="M9,23 v7 c0,2 18,2 18,0 v-7" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <line x1="11" y1="26" x2="16" y2="26" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="20" y1="26" x2="25" y2="26" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="14" y1="29" x2="22" y2="29" stroke="#1e293b" stroke-width="0.8"/>
  </svg>`,

  cart: `<svg class="badge-cart" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fef08a" fill-opacity="0.4"/>
    <path d="M18,4 L20,7 L16,7 Z M28,8 L27,11 L25,8 Z M32,18 L29,20 L29,16 Z M28,28 L25,28 L27,25 Z M18,32 L16,29 L20,29 Z M8,28 L11,27 L9,25 Z M4,18 L7,16 L7,20 Z M8,8 L9,11 L11,8 Z" fill="#fde047" stroke="#1e293b" stroke-width="0.8" stroke-linejoin="round"/>
    <circle cx="18" cy="18" r="11" fill="#faf6ed" stroke="#1e293b" stroke-width="1.4"/>
    <circle cx="18" cy="18" r="9" stroke="#1e293b" stroke-width="0.9"/>
    <line x1="18" y1="9" x2="18" y2="27" stroke="#1e293b" stroke-width="1"/>
    <line x1="9" y1="18" x2="27" y2="18" stroke="#1e293b" stroke-width="1"/>
    <line x1="11.6" y1="11.6" x2="24.4" y2="24.4" stroke="#1e293b" stroke-width="1"/>
    <line x1="24.4" y1="11.6" x2="11.6" y2="24.4" stroke="#1e293b" stroke-width="1"/>
    <circle cx="18" cy="18" r="2.6" fill="#d97706" stroke="#1e293b" stroke-width="1.3"/>
  </svg>`,

  campfire: `<svg class="badge-campfire" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fed7aa" fill-opacity="0.4"/>
    <line x1="7" y1="30" x2="29" y2="25" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="7" y1="30" x2="29" y2="25" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="9" y1="25" x2="27" y2="30" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="9" y1="25" x2="27" y2="30" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M18,7 C22,12 25,17 23,23 C21,27 15,27 13,23 C11,18 15,14 18,7 Z" fill="#fb923c" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M18,13 C20,16 21,19 19,22 C17,24 15,23 15,20 C15,17 17,15 18,13 Z" fill="#fde047" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <circle cx="12" cy="10" r="0.8" fill="#ef4444"/>
    <circle cx="24" cy="9" r="0.8" fill="#ef4444"/>
    <circle cx="19" cy="4" r="0.7" fill="#fb923c"/>
  </svg>`,

  barn: `<svg class="badge-barn" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fecaca" fill-opacity="0.35"/>
    <polygon points="18,6 11,12 8,16 28,16 25,12" fill="#b91c1c" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <rect x="8" y="16" width="20" height="15" fill="#ef4444" stroke="#1e293b" stroke-width="1.3"/>
    <path d="M16,15 v-3 a2,2 0 0 1 4,0 v3 z" fill="#faf6ed" stroke="#1e293b" stroke-width="0.9"/>
    <rect x="13" y="21" width="10" height="10" fill="#faf6ed" stroke="#1e293b" stroke-width="1.1"/>
    <line x1="13" y1="21" x2="23" y2="31" stroke="#1e293b" stroke-width="1"/>
    <line x1="23" y1="21" x2="13" y2="31" stroke="#1e293b" stroke-width="1"/>
    <line x1="10.5" y1="17" x2="10.5" y2="30" stroke="#1e293b" stroke-width="0.7"/>
    <line x1="25.5" y1="17" x2="25.5" y2="30" stroke="#1e293b" stroke-width="0.7"/>
  </svg>`,

  beehive: `<svg class="badge-beehive" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fef08a" fill-opacity="0.45"/>
    <path d="M14,14 C14,8 22,8 22,14 Z" fill="#fde047" stroke="#1e293b" stroke-width="1.2"/>
    <path d="M11,21 C11,15 25,15 25,21 Z" fill="#facc15" stroke="#1e293b" stroke-width="1.2"/>
    <path d="M9,28 C9,22 27,22 27,28 Z" fill="#eab308" stroke="#1e293b" stroke-width="1.2"/>
    <line x1="7" y1="28" x2="29" y2="28" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M16.5,28 a1.5,1.5 0 0 1 3,0 Z" fill="#1e293b"/>
    <line x1="16" y1="11" x2="20" y2="11" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="14" y1="18" x2="22" y2="18" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="12" y1="25" x2="24" y2="25" stroke="#1e293b" stroke-width="0.8"/>
    <ellipse cx="27" cy="11" rx="1.8" ry="1.2" fill="#fde047" stroke="#1e293b" stroke-width="0.8"/>
    <path d="M26,9 C27,7 29,8 28,10" stroke="#1e293b" stroke-width="0.7"/>
    <path d="M28,9 C29,7 31,8 30,10" stroke="#1e293b" stroke-width="0.7"/>
  </svg>`,

  sheep: `<svg class="badge-sheep" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bbf7d0" fill-opacity="0.35"/>
    <line x1="13" y1="24" x2="13" y2="30" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="16" y1="24" x2="16" y2="30" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="21" y1="24" x2="21" y2="30" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="24" y1="24" x2="24" y2="30" stroke="#1e293b" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12,23 C9,23 8,20 10,18 C8,16 9,13 12,13 C12,10 15,9 17,11 C19,9 22,9 23,11 C25,10 27,12 26,14 C28,16 28,19 26,21 C28,23 25,25 23,24 C21,26 18,25 17,24 C15,26 13,25 12,23 Z" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <ellipse cx="14" cy="16" rx="2.5" ry="3" fill="#1e293b"/>
    <ellipse cx="11" cy="15" rx="1.2" ry="0.8" fill="#1e293b"/>
    <ellipse cx="17" cy="15" rx="1.2" ry="0.8" fill="#1e293b"/>
    <path d="M18,15 Q20,14 21,16" stroke="#1e293b" stroke-width="0.8"/>
    <path d="M19,19 Q21,18 22,20" stroke="#1e293b" stroke-width="0.8"/>
    <path d="M15,21 Q17,20 18,22" stroke="#1e293b" stroke-width="0.8"/>
  </svg>`,

  tractor: `<svg class="badge-tractor" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bbf7d0" fill-opacity="0.35"/>
    <path d="M12,20 L12,15 L20,15 L26,18 L26,24 L19,24" fill="#10b981" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M15,15 L14,12 M13,12 L16,12" stroke="#1e293b" stroke-width="1.1" stroke-linecap="round"/>
    <line x1="23" y1="15" x2="23" y2="10" stroke="#1e293b" stroke-width="1.3"/>
    <circle cx="26" cy="25" r="3.5" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <circle cx="26" cy="25" r="1" fill="#1e293b"/>
    <circle cx="12" cy="23" r="6.5" fill="#faf6ed" stroke="#1e293b" stroke-width="1.4"/>
    <circle cx="12" cy="23" r="2" fill="#1e293b"/>
    <line x1="12" y1="16.5" x2="12" y2="18" stroke="#1e293b" stroke-width="1.2"/>
    <line x1="12" y1="28" x2="12" y2="29.5" stroke="#1e293b" stroke-width="1.2"/>
    <line x1="5.5" y1="23" x2="7" y2="23" stroke="#1e293b" stroke-width="1.2"/>
    <line x1="17" y1="23" x2="18.5" y2="23" stroke="#1e293b" stroke-width="1.2"/>
  </svg>`,

  greenhouse: `<svg class="badge-greenhouse" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.35"/>
    <polygon points="18,6 8,14 8,30 28,30 28,14" fill="#faf6ed" fill-opacity="0.75" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="18" y1="6" x2="18" y2="30" stroke="#1e293b" stroke-width="1"/>
    <line x1="8" y1="21" x2="28" y2="21" stroke="#1e293b" stroke-width="1"/>
    <line x1="13" y1="10" x2="13" y2="14" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="23" y1="10" x2="23" y2="14" stroke="#1e293b" stroke-width="0.8"/>
    <path d="M18,30 V22" stroke="#1e293b" stroke-width="1.2"/>
    <path d="M18,24 C15,23 14,20 16,19 C18,20 18,22 18,24 Z" fill="#86efac" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <path d="M18,24 C21,23 22,20 20,19 C18,20 18,22 18,24 Z" fill="#86efac" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <line x1="10" y1="17" x2="12" y2="15" stroke="#38bdf8" stroke-width="1" stroke-linecap="round"/>
  </svg>`,

  sunflower: `<svg class="badge-sunflower" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fef08a" fill-opacity="0.4"/>
    <path d="M18,5 L20,10 L16,10 Z M24,7 L24,12 L21,10 Z M29,12 L26,14 L26,11 Z M31,18 L26,19 L26,17 Z M29,24 L26,22 L26,25 Z M24,29 L21,26 L24,24 Z M18,31 L16,26 L20,26 Z M12,29 L12,24 L15,26 Z M7,24 L10,22 L10,25 Z M5,18 L10,17 L10,19 Z M7,12 L10,14 L10,11 Z M12,7 L15,10 L12,12 Z" fill="#fde047" stroke="#1e293b" stroke-width="0.9" stroke-linejoin="round"/>
    <circle cx="18" cy="18" r="5.5" fill="#78350f" stroke="#1e293b" stroke-width="1.3"/>
    <circle cx="16.5" cy="16.5" r="0.7" fill="#fde047"/>
    <circle cx="19.5" cy="16.5" r="0.7" fill="#fde047"/>
    <circle cx="18" cy="19" r="0.7" fill="#fde047"/>
    <circle cx="16" cy="19.5" r="0.5" fill="#fde047"/>
    <circle cx="20" cy="19.5" r="0.5" fill="#fde047"/>
  </svg>`,

  scarecrow: `<svg class="badge-scarecrow" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fed7aa" fill-opacity="0.4"/>
    <line x1="18" y1="8" x2="18" y2="32" stroke="#78350f" stroke-width="2"/>
    <line x1="18" y1="8" x2="18" y2="32" stroke="#1e293b" stroke-width="1"/>
    <line x1="6" y1="16" x2="30" y2="16" stroke="#1e293b" stroke-width="1.2"/>
    <path d="M5,14 L8,16 L5,18 M31,14 L28,16 L31,18" stroke="#fde047" stroke-width="1.2"/>
    <polygon points="14,15 22,15 24,26 12,26" fill="#fb923c" stroke="#1e293b" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="18" cy="11" r="3" fill="#faf6ed" stroke="#1e293b" stroke-width="1.1"/>
    <polygon points="12,9 24,9 18,3" fill="#854d0e" stroke="#1e293b" stroke-width="1.1" stroke-linejoin="round"/>
    <line x1="14" y1="26" x2="13" y2="29" stroke="#fde047" stroke-width="1.2"/>
    <line x1="18" y1="26" x2="18" y2="30" stroke="#fde047" stroke-width="1.2"/>
    <line x1="22" y1="26" x2="23" y2="29" stroke="#fde047" stroke-width="1.2"/>
  </svg>`,

  watermill: `<svg class="badge-watermill" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.4"/>
    <path d="M5,10 L14,10 L14,28 L5,28 Z" fill="#fed7aa" stroke="#1e293b" stroke-width="1.2" stroke-linejoin="round"/>
    <circle cx="21" cy="17" r="8.5" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <circle cx="21" cy="17" r="2" fill="#78350f" stroke="#1e293b" stroke-width="1"/>
    <line x1="21" y1="8" x2="21" y2="26" stroke="#1e293b" stroke-width="1.1"/>
    <line x1="13.5" y1="12.5" x2="28.5" y2="21.5" stroke="#1e293b" stroke-width="1.1"/>
    <line x1="13.5" y1="21.5" x2="28.5" y2="12.5" stroke="#1e293b" stroke-width="1.1"/>
    <path d="M6,27 Q12,24 18,28 T30,27" fill="none" stroke="#0284c7" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M10,30 Q16,28 22,31 T32,29" fill="none" stroke="#0284c7" stroke-width="1" stroke-linecap="round"/>
  </svg>`,

  silo: `<svg class="badge-silo" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#fed7aa" fill-opacity="0.35"/>
    <path d="M12,13 C12,6 24,6 24,13 Z" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <line x1="18" y1="6" x2="18" y2="13" stroke="#1e293b" stroke-width="0.8"/>
    <rect x="12" y="13" width="12" height="18" fill="#faf6ed" stroke="#1e293b" stroke-width="1.3"/>
    <path d="M12,17 Q18,19 24,17" stroke="#1e293b" stroke-width="0.8"/>
    <path d="M12,21 Q18,23 24,21" stroke="#1e293b" stroke-width="0.8"/>
    <path d="M12,25 Q18,27 24,25" stroke="#1e293b" stroke-width="0.8"/>
    <line x1="21" y1="13" x2="21" y2="31" stroke="#1e293b" stroke-width="0.9"/>
    <line x1="23" y1="13" x2="23" y2="31" stroke="#1e293b" stroke-width="0.9"/>
    <line x1="21" y1="16" x2="23" y2="16" stroke="#1e293b" stroke-width="0.7"/>
    <line x1="21" y1="20" x2="23" y2="20" stroke="#1e293b" stroke-width="0.7"/>
    <line x1="21" y1="24" x2="23" y2="24" stroke="#1e293b" stroke-width="0.7"/>
    <line x1="21" y1="28" x2="23" y2="28" stroke="#1e293b" stroke-width="0.7"/>
  </svg>`,

  duckpond: `<svg class="badge-duckpond" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="18" r="14" fill="#bae6fd" fill-opacity="0.45"/>
    <path d="M9,22 C11,19 16,18 20,21 C22,22 25,22 26,19 C25,24 20,25 14,25 C10,25 9,23 9,22 Z" fill="#86efac" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
    <circle cx="21" cy="16" r="3" fill="#15803d" stroke="#1e293b" stroke-width="1.1"/>
    <path d="M23.5,15.5 L28,16.5 L23.5,18 Z" fill="#ea580c" stroke="#1e293b" stroke-width="0.8" stroke-linejoin="round"/>
    <circle cx="22" cy="15.5" r="0.6" fill="#1e293b"/>
    <path d="M6,26 Q12,28 18,26 T30,27" fill="none" stroke="#0284c7" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M10,29 Q16,31 22,29 T28,30" fill="none" stroke="#0284c7" stroke-width="0.9" stroke-linecap="round"/>
  </svg>`
};

const DEFAULT_STAR_BADGE_SVG = `<svg class="badge-default-star" viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="18" cy="18" r="14" fill="#fef08a" fill-opacity="0.45"/>
  <polygon points="18,6 21.5,14 30,14.5 23.5,19.5 26,28 18,23 10,28 12.5,19.5 6,14.5 14.5,14" fill="#fde047" stroke="#1e293b" stroke-width="1.3" stroke-linejoin="round"/>
  <line x1="18" y1="11" x2="18" y2="21" stroke="#1e293b" stroke-width="0.8"/>
  <line x1="14" y1="16" x2="22" y2="16" stroke="#1e293b" stroke-width="0.8"/>
  <path d="M28,8 L30,8 M29,7 L29,9" stroke="#1e293b" stroke-width="0.8" stroke-linecap="round"/>
</svg>`;

export function getProjectSketchBadge(farmType) {
  const svg = SKETCH_BADGE_SVGS[farmType] || DEFAULT_STAR_BADGE_SVG;
  return `<span class="project-sketch-badge-icon">${svg}</span>`;
}

export class ScrapbookStream {
  constructor(options = {}) {
    this.projects = options.projects || [];
    this.activeProjects = [...this.projects];
    this.onSelectProject = options.onSelectProject || (() => {});
    this.container = null;
  }

  getProjectSketchBadge(farmType) {
    return getProjectSketchBadge(farmType);
  }

  generateCardHTML(project, index) {
    const padIndex = String(index + 1).padStart(2, '0');
    const washiColors = ['washi-blue', 'washi-yellow', 'washi-orange', 'washi-green'];
    const washiClass = washiColors[index % washiColors.length];

    const tags = project.skills || project.tags || [];
    const tagsHtml = tags
      .map(tag => `<span class="skill-sticker">#${tag}</span>`)
      .join(' ');

    const sketchBadgeHtml = this.getProjectSketchBadge(project.farmType);

    return `
      <article class="paper-project-card" data-project-id="${project.id}">
        <!-- Miếng băng dính Washi Tape góc trên -->
        <div class="washi-tape-strip ${washiClass} washi-top-left"></div>
        <div class="washi-tape-strip ${washiClass} washi-top-right"></div>

        <!-- Tem số hiệu dự án Kokuyo & Con dấu ký họa -->
        <div class="card-header-bar">
          <div class="card-header-meta">
            <span class="project-stamp-badge">DỰ ÁN #${padIndex}</span>
            <span class="project-branch-tag">${project.subtitle || 'Dự án Sáng Tạo'}</span>
          </div>
          ${sketchBadgeHtml}
        </div>

        <h3 class="paper-card-title">${project.title}</h3>
        <p class="paper-card-desc">${project.description}</p>

        <div class="paper-card-tags">
          ${tagsHtml}
        </div>

        <div class="paper-card-footer">
          <button class="stamp-btn-detail" data-action="open-detail" data-project-id="${project.id}">
            LẬT XEM CHI TIẾT 📖
          </button>
        </div>
      </article>
    `;
  }

  generateHTML(projectsToRender = this.activeProjects) {
    if (!projectsToRender || projectsToRender.length === 0) {
      return `
        <div class="scrapbook-stream">
          <div class="scrapbook-empty-state">
            <div class="empty-doodle-icon">🔍📄</div>
            <h3>Không tìm thấy dự án phù hợp</h3>
            <p>Hãy thử chọn kỹ năng khác trên thanh thước kẻ phía trên nhé!</p>
          </div>
        </div>
      `;
    }

    const cardsHtml = projectsToRender.map((p, i) => this.generateCardHTML(p, i)).join('\n');
    return `
      <div class="scrapbook-stream" id="scrapbook-stream">
        ${cardsHtml}
      </div>
    `;
  }

  render(container) {
    this.container = container;
    this.container.innerHTML = this.generateHTML();
    this.bindEvents();
  }

  bindEvents() {
    if (!this.container) return;
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="open-detail"]');
      if (btn) {
        const projectId = btn.getAttribute('data-project-id');
        const proj = this.projects.find(p => p.id === projectId);
        if (proj) this.onSelectProject(proj);
      }
    });
  }

  filterBySkill(skillId) {
    if (!skillId || skillId === 'all') {
      this.activeProjects = [...this.projects];
    } else {
      this.activeProjects = this.projects.filter(p => {
        const list = p.skills || p.tags || [];
        return list.includes(skillId);
      });
    }
    if (this.container) {
      this.container.innerHTML = this.generateHTML();
    }
  }
}
