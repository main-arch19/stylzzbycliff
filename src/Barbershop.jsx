import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════
   STYLZZBYCLIFF — Edit your info here
   ══════════════════════════════════════════ */
const BARBER = {
  name: "Cliff",
  shopName: "STYLZZBYCLIFF",
  title: "Master Barber & Stylist",
  experience: "10+ Years Experience",
  bio: "Precision fades, clean line-ups, and creative styling — every cut is a statement. Walk in looking good, leave looking unforgettable.",
  instagram: "https://www.instagram.com/stylzzbycliff__thebarber/",
  bookingLink: "#",
  phone: "+1 (876) 000-0000",
  address: "Kingston, Jamaica",
  hours: [
    { day: "Monday",    time: "Closed" },
    { day: "Tuesday",   time: "9:00 AM – 7:00 PM" },
    { day: "Wednesday", time: "9:00 AM – 7:00 PM" },
    { day: "Thursday",  time: "9:00 AM – 8:00 PM" },
    { day: "Friday",    time: "9:00 AM – 8:00 PM" },
    { day: "Saturday",  time: "8:00 AM – 6:00 PM" },
    { day: "Sunday",    time: "10:00 AM – 4:00 PM" },
  ],
};

const SERVICES = [
  // Hair Services
  { id: 1, name: "Adult Haircut",             duration: "45 min", price: 4000, description: "Precision cut styled to perfection",                           category: "Hair Services", popular: true },
  { id: 2, name: "Trim, Shave & Mini Facial", duration: "60 min", price: 6000, description: "Full trim with clean shave and refreshing mini facial",        category: "Hair Services", popular: true },
  { id: 3, name: "Trim, Shave & Dye",         duration: "75 min", price: 7000, description: "Complete trim, clean shave, and custom hair colouring",        category: "Hair Services", popular: true },
  { id: 4, name: "Line & Shave",              duration: "30 min", price: 2000, description: "Sharp line-up with a clean razor shave",                       category: "Hair Services" },
  { id: 5, name: "Schoolers Trim",            duration: "30 min", price: 2500, description: "Clean, fresh cuts for the school crew",                        category: "Hair Services" },
  // Grooming
  { id: 6, name: "Eyebrows",                  duration: "10 min", price: 1000, description: "Precision eyebrow shaping and clean-up",                       category: "Grooming" },
  { id: 7, name: "Beard Grooming",            duration: "15 min", price: 1000, description: "Shape, line, and groom your beard to perfection",              category: "Grooming" },
  { id: 8, name: "Nose Trim",                 duration: "10 min", price: 1000, description: "Quick and clean nose hair trimming",                           category: "Grooming" },
  { id: 9, name: "Hair Designed Styles",      duration: "45 min", price: 1000, description: "Custom patterns, artwork, and creative hair designs",          category: "Grooming" },
];

const MEMBERSHIP_TIERS = [
  {
    name: "Classic",
    price: "Pay per visit",
    period: "",
    features: ["Book anytime", "Standard pricing", "Loyalty points"],
    recommended: false,
  },
  {
    name: "Gold",
    price: "$15,000",
    period: "/month",
    features: ["4 cuts per month", "10% off products", "Priority booking", "Free beard grooming"],
    recommended: true,
  },
  {
    name: "Platinum",
    price: "$25,000",
    period: "/month",
    features: ["Unlimited cuts", "20% off products", "Same-day booking", "Free Trim, Shave & Facial monthly", "Exclusive merch drops"],
    recommended: false,
  },
];

const REVIEWS = [
  { name: "Marcus T.", rating: 5, text: "Best fade I've ever had. The attention to detail is unmatched.",                                date: "2 days ago"   },
  { name: "David R.",  rating: 5, text: "Been coming here for 3 years. Consistently excellent every single time.",                       date: "1 week ago"   },
  { name: "James K.",  rating: 5, text: "The full package is worth every penny. Left feeling like a new man.",                           date: "2 weeks ago"  },
  { name: "Chris M.",  rating: 5, text: "Finally found my barber. The vibe, the skill, the whole experience is premium.",                date: "3 weeks ago"  },
  { name: "Andre L.",  rating: 4, text: "Great cuts, great conversation. Only wish there were more evening slots.",                      date: "1 month ago"  },
];

const INSTAGRAM_POSTS = [
  { id: 1, photo: "./photo1.jpeg", label: "Skin Fade"      },
  { id: 2, photo: "./photo2.jpeg", label: "Textured Crop"  },
  { id: 3, photo: "./photo5.jpg",  label: "Fresh Cut"      },
  { id: 4, photo: "./photo3.jpeg", label: "Line Up"        },
  { id: 5, photo: "./photo4.jpeg", label: "Classic Taper"  },
  { id: 6, photo: "./photo6.jpg",  label: "Sharp Lines"    },
];

/* ── Icons ── */
const Icons = {
  play: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
      <polygon points="10,8 17,12 10,16" fill="white"/>
    </svg>
  ),
  scissors: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  map: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  phone: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  menu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="15" y2="12"/>
      <line x1="3" y1="18" x2="18" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  chevron: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  arrowLeft: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  ),
};

/* ── Feedback helpers (haptic buzz + synthesized pop sound) ── */
// Real vibration only fires where supported (Android/Chrome). iOS Safari ignores
// it, so callers also toggle a `.vibrating` CSS class for a universal visual shake.
function buzz(pattern = 25) {
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
  } catch { /* no-op */ }
}

// Synthesize a short "pop" with the Web Audio API — no asset needed. Must be
// invoked from a user gesture (the Confirm click) to satisfy autoplay policies.
function playPop() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.5, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    osc.start(now);
    osc.stop(now + 0.2);
    osc.onended = () => ctx.close();
  } catch { /* no-op */ }
}

/* ── CSS ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap');

  :root {
    --bg: #F2EFEA;
    --bg-card: #FFFFFF;
    --bg-elevated: #E9E5DE;
    --bg-warm: #DDD8CF;
    --text-primary: #1A1714;
    --text-secondary: #6B635A;
    --text-tertiary: #9E9589;
    --accent: #C4502A;
    --accent-light: #F5E8E3;
    --accent-dark: #A33D1E;
    --accent-warm: #D4896E;
    --charcoal: #2A2520;
    --bar-bg-rgb: 202, 195, 186; /* parchment tone sampled from the logo background */
    --border: #D9D4CB;
    --border-light: #E9E5DE;
    --shadow: 0 2px 24px rgba(26,23,20,0.07);
    --shadow-hover: 0 12px 48px rgba(26,23,20,0.12);
    --radius: 14px;
    --radius-sm: 8px;
    --font-display: 'Bebas Neue', Impact, sans-serif;
    --font-body: 'Barlow', -apple-system, sans-serif;
    --font-condensed: 'Barlow Condensed', sans-serif;
    --nav-height: 72px;
    --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── Animations ── */
  @keyframes fadeUp    { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn    { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideIn   { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes slideOut  { from { transform: translateX(0); } to { transform: translateX(100%); } }
  @keyframes scaleIn   { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
  @keyframes float     { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes logoFloat { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.02); } }
  @keyframes btnBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  @keyframes lineGrow  { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes progressPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(196,80,42,0.3); } 50% { box-shadow: 0 0 0 10px rgba(196,80,42,0); } }
  @keyframes heroGrain {
    0%,100% { transform: translate(0,0); }   10% { transform: translate(-1%,-1%); }
    30%      { transform: translate(-1%,1%); } 50% { transform: translate(-1%,0); }
    70%      { transform: translate(0,-1%); } 90% { transform: translate(1%,0); }
  }

  .fade-up       { animation: fadeUp 0.8s ease forwards; opacity: 0; }
  .fade-up-d1    { animation-delay: 0.15s; }
  .fade-up-d2    { animation-delay: 0.30s; }
  .fade-up-d3    { animation-delay: 0.45s; }
  .fade-up-d4    { animation-delay: 0.60s; }

  /* ── Noise overlay ── */
  .noise-overlay {
    position: fixed; inset: 0; z-index: 9999; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat; background-size: 256px;
  }

  /* ── Nav ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: var(--nav-height); display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px;
    background: rgba(var(--bar-bg-rgb), 0.92);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(160,152,144,0.4);
    transition: var(--transition);
  }
  .nav.scrolled { box-shadow: 0 2px 20px rgba(26,23,20,0.06); }
  .nav-logo { height: 48px; width: auto; object-fit: contain; }
  .nav-links { display: flex; gap: 28px; align-items: center; }
  .nav-link {
    font-family: var(--font-condensed); font-size: 14px; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--text-secondary); text-decoration: none;
    cursor: pointer; border: none; background: none;
    transition: var(--transition); padding: 4px 0; position: relative;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--accent);
    transform: scaleX(0); transition: var(--transition); transform-origin: left;
  }
  .nav-link:hover { color: var(--text-primary); }
  .nav-link:hover::after { transform: scaleX(1); }
  .nav-cta {
    background: var(--accent); color: white;
    padding: 10px 28px; border-radius: 6px;
    font-family: var(--font-condensed); font-size: 14px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    border: none; cursor: pointer; transition: var(--transition); text-decoration: none;
  }
  .nav-cta:hover { background: var(--accent-dark); transform: translateY(-1px); }
  .nav-hamburger { display: none; background: none; border: none; cursor: pointer; color: var(--text-primary); padding: 8px; }

  /* ── Mobile nav ── */
  .mobile-nav {
    position: fixed; inset: 0; z-index: 200; background: var(--bg);
    padding: 24px; display: flex; flex-direction: column;
    animation: slideIn 0.35s ease;
  }
  .mobile-nav.closing { animation: slideOut 0.3s ease forwards; }
  .mobile-nav-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px; }
  .mobile-nav-link {
    font-family: var(--font-display); font-size: 42px;
    padding: 12px 0; color: var(--text-primary); cursor: pointer;
    border: none; background: none; display: block; text-align: left;
    width: 100%; transition: var(--transition); letter-spacing: 2px;
  }
  .mobile-nav-link:hover { color: var(--accent); }

  /* ── Hero ── */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
    padding: 120px 24px 80px; position: relative; background: var(--bg); overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,80,42,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 30% 70%, rgba(42,37,32,0.04) 0%, transparent 60%);
  }
  .hero-grain {
    position: absolute; inset: -10%; z-index: 0; opacity: 0.03; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    animation: heroGrain 8s steps(10) infinite;
  }
  .hero-content { position: relative; z-index: 1; }
  .hero-logo {
    width: clamp(160px, 30vw, 260px); height: auto; margin-bottom: 32px; border-radius: 50%;
    animation: logoFloat 4s ease-in-out infinite;
    filter: drop-shadow(0 8px 32px rgba(26,23,20,0.15));
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 20px; border-radius: 6px;
    background: var(--bg-card); border: 1px solid var(--border);
    font-family: var(--font-condensed); font-size: 12px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 24px;
  }
  .hero-badge .pulse {
    width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
    animation: progressPulse 2s ease infinite;
  }
  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(52px, 12vw, 110px);
    font-weight: 400; line-height: 0.95; letter-spacing: 4px;
    margin-bottom: 20px; max-width: 700px;
  }
  .hero h1 .accent { color: var(--accent); }
  .hero-line {
    width: 60px; height: 3px; background: var(--accent); margin: 0 auto 24px; border-radius: 2px;
    animation: lineGrow 1s ease 0.5s forwards; transform-origin: center; transform: scaleX(0);
  }
  .hero-sub {
    font-family: var(--font-body); font-size: 17px; color: var(--text-secondary);
    max-width: 440px; line-height: 1.7; margin-bottom: 44px;
    font-weight: 300; letter-spacing: 0.3px;
  }
  .hero-ctas { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; justify-content: center; }
  .hero-scroll {
    position: absolute; bottom: 32px;
    animation: float 3s ease-in-out infinite;
    color: var(--text-tertiary); font-family: var(--font-condensed);
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  }

  /* ── Buttons ── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--accent); color: white; padding: 16px 40px; border-radius: 6px;
    font-family: var(--font-condensed); font-size: 15px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    border: none; cursor: pointer; transition: var(--transition);
    text-decoration: none; position: relative; overflow: hidden;
  }
  .btn-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
    transform: translateX(-100%); transition: 0.6s ease;
  }
  .btn-primary:hover::before { transform: translateX(100%); }
  .btn-primary:hover { background: var(--accent-dark); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(196,80,42,0.3); }

  .btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--text-primary); padding: 16px 32px; border-radius: 6px;
    font-family: var(--font-condensed); font-size: 14px; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    border: 2px solid var(--charcoal); cursor: pointer;
    transition: var(--transition); text-decoration: none;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

  .btn-loyalty {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--accent); color: white; padding: 16px 40px; border-radius: 6px;
    font-family: var(--font-condensed); font-size: 15px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    border: none; cursor: pointer; transition: var(--transition);
    text-decoration: none; position: relative; overflow: hidden;
    animation: btnBounce 1.4s ease-in-out infinite;
  }
  .btn-loyalty::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
    transform: translateX(-100%); transition: 0.6s ease;
  }
  .btn-loyalty:hover::before { transform: translateX(100%); }
  .btn-loyalty:hover { background: var(--accent-dark); box-shadow: 0 8px 32px rgba(196,80,42,0.3); }

  /* ── Sections ── */
  .section { padding: 100px 24px; max-width: 1100px; margin: 0 auto; }

  .section-label {
    font-family: var(--font-condensed); font-size: 12px; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase; color: var(--accent);
    margin-bottom: 12px; display: flex; align-items: center; gap: 12px;
  }
  .section-label::before { content: ''; width: 24px; height: 2px; background: var(--accent); display: block; }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 6vw, 56px);
    font-weight: 400; letter-spacing: 3px; margin-bottom: 16px; line-height: 1.05;
  }
  .section-sub { font-size: 16px; color: var(--text-secondary); line-height: 1.7; max-width: 480px; margin-bottom: 48px; }

  /* ── Services ── */
  .services-category-title {
    font-family: var(--font-display); font-size: 28px; letter-spacing: 3px;
    margin-bottom: 20px; color: var(--accent);
  }
  .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
  .service-card {
    background: var(--bg-card); border: 1px solid var(--border-light);
    border-radius: var(--radius); padding: 28px;
    transition: var(--transition); cursor: pointer; position: relative; overflow: hidden;
  }
  .service-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 3px; height: 0; background: var(--accent); transition: height 0.4s ease;
  }
  .service-card:hover::before { height: 100%; }
  .service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
  .service-badge {
    position: absolute; top: 16px; right: 16px;
    background: var(--accent); color: white;
    font-family: var(--font-condensed); font-size: 10px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 4px;
  }
  .service-card h3 { font-family: var(--font-display); font-size: 26px; font-weight: 400; letter-spacing: 2px; margin-bottom: 8px; }
  .service-meta { display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; }
  .service-meta span { display: flex; align-items: center; gap: 4px; }
  .service-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
  .service-price { font-family: var(--font-display); font-size: 32px; font-weight: 400; color: var(--accent); margin-top: 20px; letter-spacing: 1px; }

  /* ── About (dark) ── */
  .about-section {
    background: var(--charcoal); color: white; padding: 100px 24px; position: relative; overflow: hidden;
  }
  .about-section::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 60% at 80% 20%, rgba(196,80,42,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 10% 80%, rgba(196,80,42,0.06) 0%, transparent 50%);
  }
  .about-section::after {
    content: ''; position: absolute; inset: 0; opacity: 0.04; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .about-inner {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px;
    align-items: center; position: relative; z-index: 1;
  }
  .about-photo {
    width: 100%; aspect-ratio: 3/4; border-radius: var(--radius);
    background: linear-gradient(135deg, #3d3530, #2a2520);
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(255,255,255,0.06); position: relative; overflow: hidden;
  }
  .about-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
  .about-photo-label {
    position: absolute; bottom: 20px;
    font-family: var(--font-condensed); font-size: 12px;
    letter-spacing: 3px; color: rgba(255,255,255,0.25); text-transform: uppercase;
  }
  .about-info .section-label { color: var(--accent-warm); }
  .about-info .section-label::before { background: var(--accent-warm); }
  .about-info .section-title { color: white; }
  .about-info .section-sub { color: rgba(255,255,255,0.55); }
  .about-stats {
    display: flex; gap: 40px; margin-top: 40px;
    padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08);
  }
  .stat-num { font-family: var(--font-display); font-size: 42px; font-weight: 400; color: var(--accent); letter-spacing: 1px; text-shadow: 0 0 12px rgba(255,255,255,0.9), 0 0 28px rgba(255,255,255,0.5), 0 0 56px rgba(255,255,255,0.2); }
  .stat-label {
    font-family: var(--font-condensed); font-size: 12px;
    color: rgba(255,255,255,0.4); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;
  }

  /* ── Gallery ── */
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .gallery-item { aspect-ratio: 1; border-radius: var(--radius-sm); overflow: hidden; position: relative; cursor: pointer; transition: var(--transition); }
  .gallery-item:hover { transform: scale(1.04); }
  .gallery-item-bg {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-condensed); font-size: 13px; color: rgba(255,255,255,0.4);
    font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
  }
  .gallery-item-bg img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .gallery-item-overlay {
    position: absolute; inset: 0; background: rgba(196,80,42,0.75);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: var(--transition); color: white;
    font-family: var(--font-condensed); font-size: 12px; font-weight: 600; letter-spacing: 1.5px; gap: 8px;
  }
  .gallery-item:hover .gallery-item-overlay { opacity: 1; }
  .gallery-follow { display: inline-flex; align-items: center; gap: 10px; margin-top: 28px; }
  /* ── Flip cards ── */
  .gallery-flip { perspective: 1000px; aspect-ratio: 1; }
  .gallery-flip-inner {
    position: relative; width: 100%; height: 100%;
    transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }
  .gallery-flip:hover .gallery-flip-inner { transform: rotateY(180deg); }
  .flip-front, .flip-back {
    position: absolute; inset: 0; border-radius: var(--radius-sm);
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    overflow: hidden;
  }
  .flip-front {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 14px; cursor: pointer; position: relative;
  }
  .flip-front video, .flip-front img {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .flip-front-overlay {
    position: absolute; inset: 0; z-index: 1;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
    background: rgba(0,0,0,0.28);
  }
  .flip-front-label {
    font-family: var(--font-condensed); font-size: 12px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.75);
  }
  .flip-back {
    transform: rotateY(180deg);
    background: var(--accent);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 14px; text-align: center; padding: 20px;
  }
  .flip-back-title {
    font-family: var(--font-display); font-size: 22px; letter-spacing: 3px;
    color: white; line-height: 1.1;
  }
  .flip-back-sub {
    font-family: var(--font-condensed); font-size: 12px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.75);
  }
  .flip-back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: white; color: var(--accent);
    padding: 9px 20px; border-radius: 6px;
    font-family: var(--font-condensed); font-size: 12px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    text-decoration: none; margin-top: 6px; transition: var(--transition);
  }
  .flip-back-btn:hover { background: var(--accent-light); }

  /* ── Loyalty ── */
  .loyalty-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: white; padding: 14px 32px; border-radius: 6px;
    font-family: var(--font-condensed); font-size: 14px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    border: none; cursor: pointer; transition: var(--transition); margin-top: 24px;
  }
  .loyalty-btn:hover { background: var(--accent-dark); transform: translateY(-1px); }

  /* ── Membership ── */
  .membership-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .membership-card {
    background: var(--bg-card); border: 1px solid var(--border-light);
    border-radius: var(--radius); padding: 36px; position: relative;
    transition: var(--transition); overflow: hidden;
  }
  .membership-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }
  .membership-card.recommended { border: 2px solid var(--accent); padding-top: 52px; }
  .membership-card.recommended::before {
    content: 'MOST POPULAR'; position: absolute; top: 0; left: 0; right: 0;
    background: var(--accent); color: white; text-align: center;
    font-family: var(--font-condensed); font-size: 11px; font-weight: 700;
    letter-spacing: 2px; padding: 6px;
  }
  .membership-name { font-family: var(--font-display); font-size: 28px; font-weight: 400; margin-bottom: 8px; letter-spacing: 2px; }
  .membership-price { font-family: var(--font-display); font-size: 44px; font-weight: 400; margin-bottom: 4px; letter-spacing: 1px; }
  .membership-price span { font-family: var(--font-body); font-size: 15px; font-weight: 400; color: var(--text-secondary); letter-spacing: 0; }
  .membership-features { list-style: none; margin: 28px 0; }
  .membership-features li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary); padding: 8px 0; }
  .membership-features li svg { color: var(--accent); flex-shrink: 0; }
  .membership-btn {
    width: 100%; padding: 14px; border-radius: 6px;
    font-family: var(--font-condensed); font-size: 14px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    cursor: pointer; transition: var(--transition);
    border: 2px solid var(--border); background: transparent; color: var(--text-primary);
  }
  .membership-card.recommended .membership-btn { background: var(--accent); color: white; border-color: var(--accent); }
  .membership-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow); }

  /* ── Reviews ── */
  .reviews-track {
    display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px;
    scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none;
  }
  .reviews-track::-webkit-scrollbar { display: none; }
  .review-card {
    min-width: 310px; max-width: 350px; scroll-snap-align: start; flex-shrink: 0;
    background: var(--bg-card); border: 1px solid var(--border-light);
    border-radius: var(--radius); padding: 28px; transition: var(--transition);
  }
  .review-card:hover { box-shadow: var(--shadow); }
  .review-stars { display: flex; gap: 2px; color: var(--accent); margin-bottom: 16px; }
  .review-text { font-size: 15px; line-height: 1.7; color: var(--text-secondary); margin-bottom: 20px; font-style: italic; }
  .review-name { font-weight: 600; font-size: 14px; }
  .review-date { font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }

  /* ── Contact ── */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .contact-card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius); padding: 36px; }
  .contact-card-title { font-family: var(--font-display); font-size: 28px; font-weight: 400; letter-spacing: 2px; margin-bottom: 24px; }
  .hours-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-light); font-size: 14px; }
  .hours-row:last-child { border: none; }
  .hours-day { font-weight: 500; }
  .hours-time { color: var(--text-secondary); }
  .hours-row.closed .hours-time { color: var(--text-tertiary); font-style: italic; }
  .contact-item { display: flex; align-items: center; gap: 14px; font-size: 14px; padding: 14px 0; color: var(--text-secondary); border-bottom: 1px solid var(--border-light); }
  .contact-item:last-of-type { border: none; }
  .contact-item svg { color: var(--accent); flex-shrink: 0; }
  .contact-item a { color: inherit; text-decoration: none; }
  .contact-item a:hover { color: var(--accent); }

  /* ── Footer ── */
  .footer {
    text-align: center; padding: 60px 24px;
    border-top: 1px solid rgba(42,37,32,0.08);
    background: rgb(var(--bar-bg-rgb)); color: var(--text-secondary);
  }
  .footer-logo { height: 56px; margin-bottom: 20px; opacity: 0.92; }
  .footer p { font-size: 13px; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: var(--charcoal); color: white;
    padding: 14px 32px; border-radius: 6px;
    font-size: 14px; font-weight: 500; z-index: 300;
    animation: fadeUp 0.3s ease; box-shadow: 0 8px 32px rgba(26,23,20,0.25);
    font-family: var(--font-body); border-left: 3px solid var(--accent);
    white-space: nowrap;
  }

  /* ── Booking ── */
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-6px); } 40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); } 80% { transform: translateX(4px); }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.4); }
    60%  { opacity: 1; transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }
  .vibrating { animation: shake 0.32s cubic-bezier(0.36,0.07,0.19,0.97); }

  .booking-card {
    background: var(--bg-card); border: 1px solid var(--border-light);
    border-radius: var(--radius); box-shadow: var(--shadow);
    padding: 36px; margin-top: 8px; overflow: hidden;
  }

  /* Step progress */
  .booking-steps { display: flex; align-items: center; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; }
  .booking-step { display: flex; align-items: center; gap: 8px; }
  .booking-step-dot {
    width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-condensed); font-weight: 700; font-size: 14px;
    background: var(--bg-elevated); color: var(--text-tertiary);
    border: 2px solid var(--border); transition: var(--transition);
  }
  .booking-step.active .booking-step-dot { background: var(--accent); color: #fff; border-color: var(--accent); }
  .booking-step.done .booking-step-dot { background: var(--charcoal); color: #fff; border-color: var(--charcoal); }
  .booking-step-name {
    font-family: var(--font-condensed); font-size: 12px; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-tertiary);
  }
  .booking-step.active .booking-step-name { color: var(--text-primary); }
  .booking-step-bar { flex: 1; min-width: 16px; height: 2px; background: var(--border); border-radius: 2px; }
  .booking-step.done + .booking-step-bar { background: var(--accent); }

  .booking-stage { animation: fadeUp 0.4s ease; }
  .booking-stage-title { font-family: var(--font-display); font-size: 26px; letter-spacing: 2px; margin-bottom: 4px; }
  .booking-stage-sub { font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; }

  .booking-back {
    display: inline-flex; align-items: center; gap: 6px; margin-bottom: 18px;
    background: none; border: none; cursor: pointer; color: var(--text-secondary);
    font-family: var(--font-condensed); font-size: 13px; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase; transition: var(--transition); padding: 0;
  }
  .booking-back:hover { color: var(--accent); }

  /* Service picker */
  .booking-cat-title { font-family: var(--font-display); font-size: 20px; letter-spacing: 2px; color: var(--accent); margin: 20px 0 12px; }
  .booking-cat-title:first-child { margin-top: 0; }
  .booking-service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
  .booking-service {
    text-align: left; background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 18px 20px; cursor: pointer;
    transition: var(--transition); position: relative;
  }
  .booking-service:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: var(--shadow); }
  .booking-service.selected { border-color: var(--accent); background: var(--accent-light); }
  .booking-service-name { font-family: var(--font-condensed); font-weight: 700; font-size: 17px; letter-spacing: 0.5px; margin-bottom: 4px; }
  .booking-service-meta { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
  .booking-service-dur { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: var(--text-secondary); }
  .booking-service-price { font-family: var(--font-display); font-size: 22px; color: var(--accent); letter-spacing: 1px; }

  /* Calendar */
  .booking-cal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .booking-cal-month { font-family: var(--font-display); font-size: 22px; letter-spacing: 2px; }
  .booking-cal-nav {
    width: 38px; height: 38px; border-radius: 50%; cursor: pointer;
    background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-primary);
    display: flex; align-items: center; justify-content: center; transition: var(--transition);
  }
  .booking-cal-nav:hover:not(:disabled) { background: var(--accent); color: #fff; border-color: var(--accent); }
  .booking-cal-nav:disabled { opacity: 0.35; cursor: not-allowed; }
  .booking-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
  .booking-cal-dow {
    text-align: center; font-family: var(--font-condensed); font-size: 11px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase; color: var(--text-tertiary); padding-bottom: 6px;
  }
  .booking-cal-day {
    aspect-ratio: 1; border-radius: var(--radius-sm); cursor: pointer;
    background: var(--bg); border: 1px solid var(--border); color: var(--text-primary);
    font-family: var(--font-body); font-size: 15px; font-weight: 500;
    display: flex; align-items: center; justify-content: center; transition: var(--transition);
  }
  .booking-cal-day:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
  .booking-cal-day.selected { background: var(--accent); color: #fff; border-color: var(--accent); }
  .booking-cal-day:disabled { opacity: 0.3; cursor: not-allowed; background: transparent; border-color: transparent; }
  .booking-cal-day.empty { background: transparent; border: none; cursor: default; }
  .booking-cal-legend { font-size: 12px; color: var(--text-tertiary); margin-top: 14px; }

  /* Time slots */
  .booking-time-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; }
  .booking-time {
    padding: 14px 10px; border-radius: var(--radius-sm); cursor: pointer;
    background: var(--bg); border: 1px solid var(--border); color: var(--text-primary);
    font-family: var(--font-condensed); font-weight: 600; font-size: 15px; letter-spacing: 0.5px;
    transition: var(--transition);
  }
  .booking-time:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .booking-time.selected { background: var(--accent); color: #fff; border-color: var(--accent); }

  /* Summary / confirm */
  .booking-summary { display: grid; gap: 0; margin-bottom: 28px; border: 1px solid var(--border-light); border-radius: var(--radius); overflow: hidden; }
  .booking-summary-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 16px 22px; border-bottom: 1px solid var(--border-light); }
  .booking-summary-row:last-child { border-bottom: none; }
  .booking-summary-label { font-family: var(--font-condensed); font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-tertiary); }
  .booking-summary-value { font-weight: 600; font-size: 16px; text-align: right; }
  .booking-summary-value.price { font-family: var(--font-display); font-size: 24px; color: var(--accent); letter-spacing: 1px; }
  .booking-confirm { width: 100%; justify-content: center; }

  /* Thank-you */
  .booking-thanks { text-align: center; padding: 24px 12px; animation: fadeIn 0.4s ease; }
  .booking-thanks-mark {
    width: 92px; height: 92px; margin: 0 auto 24px; border-radius: 50%;
    background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 12px 40px rgba(196,80,42,0.35); animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1);
  }
  .booking-thanks-mark svg { width: 48px; height: 48px; }
  .booking-thanks-title { font-family: var(--font-display); font-size: clamp(34px, 6vw, 52px); letter-spacing: 3px; margin-bottom: 12px; }
  .booking-thanks-title .accent { color: var(--accent); }
  .booking-thanks-sub { font-size: 16px; color: var(--text-secondary); max-width: 460px; margin: 0 auto 28px; line-height: 1.6; }
  .booking-thanks-card {
    display: inline-block; text-align: left; background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 22px 28px; margin-bottom: 28px; min-width: 280px;
  }
  .booking-thanks-card .booking-summary-row { padding: 10px 0; }
  .booking-thanks-card .booking-summary-row:first-child { padding-top: 0; }
  .booking-thanks-again { margin: 0 auto; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-hamburger { display: block; }
    .about-inner { grid-template-columns: 1fr; gap: 40px; }
    .about-photo { max-height: 380px; }
    .membership-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .services-grid { grid-template-columns: 1fr; }
    .about-stats { gap: 24px; }
    .section { padding: 80px 20px; }
    .hero { padding: 100px 20px 80px; }
    .booking-card { padding: 24px 18px; }
    .booking-service-grid { grid-template-columns: 1fr; }
    .booking-step-name { display: none; }
    .booking-cal-grid { gap: 4px; }
    .booking-cal-day { font-size: 14px; }
    .booking-time-grid { grid-template-columns: repeat(3, 1fr); }
  }
`;

/* ── CountUp ── */
function CountUp({ end, suffix = "", decimals = 0, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const val = eased * end;
          setCount(decimals > 0 ? parseFloat(val.toFixed(decimals)) : Math.floor(val));
          if (progress < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      } else {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setCount(0);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [end, duration, decimals]);

  const display = decimals > 0
    ? count.toFixed(decimals)
    : count >= 1000
      ? `${Math.floor(count / 1000)}K`
      : count;

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Booking helpers (weekday hours parsed once from BARBER.hours) ── */
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SLOT_MINUTES = 30;

function parseClock(str) {
  const m = String(str).trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (h === 12) h = 0;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + min;
}

function minsToLabel(mins) {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12; if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

// { Sunday: { open, close } | null, ... } in minutes-since-midnight
const HOURS_BY_DAY = BARBER.hours.reduce((acc, { day, time }) => {
  if (/closed/i.test(time)) { acc[day] = null; return acc; }
  const [openStr, closeStr] = time.split(/\s*[–—-]\s*/);
  const open = parseClock(openStr);
  const close = parseClock(closeStr);
  acc[day] = open != null && close != null ? { open, close } : null;
  return acc;
}, {});

function slotsForDate(date) {
  if (!date) return [];
  const hours = HOURS_BY_DAY[DAY_NAMES[date.getDay()]];
  if (!hours) return [];
  const out = [];
  for (let t = hours.open; t + SLOT_MINUTES <= hours.close; t += SLOT_MINUTES) out.push(minsToLabel(t));
  return out;
}

function formatDate(d) {
  return d ? d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "";
}

/* ── Sequential booking calendar ── */
const BOOKING_STEPS = ["Service", "Date", "Time", "Confirm"];
const STAGE_INDEX = { service: 0, date: 1, time: 2, confirm: 3, thanks: 4 };

function BookingCalendar() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [stage, setStage]       = useState("service");
  const [service, setService]   = useState(null);
  const [date, setDate]         = useState(null);
  const [time, setTime]         = useState(null);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setMonth]   = useState(today.getMonth());
  const [shaking, setShaking]   = useState(false);
  const shakeTimer = useRef(null);

  useEffect(() => () => { if (shakeTimer.current) clearTimeout(shakeTimer.current); }, []);

  // Haptic buzz (Android/Chrome) + universal visual shake fallback.
  const feedback = (pattern = 25) => {
    buzz(pattern);
    setShaking(true);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    shakeTimer.current = setTimeout(() => setShaking(false), 340);
  };

  const pickService = (s) => { setService(s); feedback(); setStage("date"); };
  const pickDate    = (d) => { setDate(d); setTime(null); feedback(); setStage("time"); };
  const pickTime    = (t) => { setTime(t); feedback(); setStage("confirm"); };
  const confirm     = () => { feedback([20, 40, 30]); playPop(); setStage("thanks"); };
  const reset       = () => { setService(null); setDate(null); setTime(null); setStage("service"); };

  const goMonth = (delta) => {
    const total = viewMonth + delta;
    setMonth(((total % 12) + 12) % 12);
    setViewYear(viewYear + Math.floor(total / 12));
  };

  const stepIndex     = STAGE_INDEX[stage];
  const firstWeekday  = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth   = new Date(viewYear, viewMonth + 1, 0).getDate();
  const atCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const slots         = slotsForDate(date);

  return (
    <div className={`booking-card${shaking ? " vibrating" : ""}`}>
      {stage !== "thanks" && (
        <div className="booking-steps">
          {BOOKING_STEPS.flatMap((label, i) => {
            const cls = i === stepIndex ? "active" : i < stepIndex ? "done" : "";
            const items = [
              <div key={label} className={`booking-step ${cls}`}>
                <div className="booking-step-dot">{i < stepIndex ? Icons.check : i + 1}</div>
                <span className="booking-step-name">{label}</span>
              </div>,
            ];
            if (i < BOOKING_STEPS.length - 1) items.push(<div key={`${label}-bar`} className="booking-step-bar" />);
            return items;
          })}
        </div>
      )}

      {stage === "service" && (
        <div className="booking-stage">
          <div className="booking-stage-title">Choose a service</div>
          <div className="booking-stage-sub">Pick what you're coming in for.</div>
          {["Hair Services", "Grooming"].map((cat) => (
            <div key={cat}>
              <div className="booking-cat-title">{cat.toUpperCase()}</div>
              <div className="booking-service-grid">
                {SERVICES.filter((s) => s.category === cat).map((s) => (
                  <button
                    key={s.id}
                    className={`booking-service${service?.id === s.id ? " selected" : ""}`}
                    onClick={() => pickService(s)}
                  >
                    <div className="booking-service-name">{s.name}</div>
                    <div className="booking-service-meta">
                      <span className="booking-service-dur">{Icons.clock} {s.duration}</span>
                      <span className="booking-service-price">${s.price.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {stage === "date" && (
        <div className="booking-stage">
          <button className="booking-back" onClick={() => setStage("service")}>{Icons.arrowLeft} Back</button>
          <div className="booking-stage-title">Pick a date</div>
          <div className="booking-stage-sub">{service?.name} · {service?.duration}</div>
          <div className="booking-cal-head">
            <button className="booking-cal-nav" onClick={() => goMonth(-1)} disabled={atCurrentMonth} aria-label="Previous month">{Icons.arrowLeft}</button>
            <div className="booking-cal-month">{MONTH_NAMES[viewMonth]} {viewYear}</div>
            <button className="booking-cal-nav" onClick={() => goMonth(1)} aria-label="Next month">{Icons.chevron}</button>
          </div>
          <div className="booking-cal-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="booking-cal-dow">{d}</div>)}
            {Array.from({ length: firstWeekday }).map((_, i) => <div key={`pad${i}`} className="booking-cal-day empty" />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const d = new Date(viewYear, viewMonth, day);
              const disabled = d < today || !HOURS_BY_DAY[DAY_NAMES[d.getDay()]];
              const selected = date && d.getTime() === date.getTime();
              return (
                <button
                  key={day}
                  className={`booking-cal-day${selected ? " selected" : ""}`}
                  disabled={disabled}
                  onClick={() => pickDate(d)}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="booking-cal-legend">Closed days and past dates are unavailable.</div>
        </div>
      )}

      {stage === "time" && (
        <div className="booking-stage">
          <button className="booking-back" onClick={() => setStage("date")}>{Icons.arrowLeft} Back</button>
          <div className="booking-stage-title">Pick a time</div>
          <div className="booking-stage-sub">{formatDate(date)}</div>
          {slots.length ? (
            <div className="booking-time-grid">
              {slots.map((t) => (
                <button key={t} className={`booking-time${time === t ? " selected" : ""}`} onClick={() => pickTime(t)}>{t}</button>
              ))}
            </div>
          ) : (
            <p className="booking-stage-sub">No times available for this day — please choose another date.</p>
          )}
        </div>
      )}

      {stage === "confirm" && (
        <div className="booking-stage">
          <button className="booking-back" onClick={() => setStage("time")}>{Icons.arrowLeft} Back</button>
          <div className="booking-stage-title">Confirm your booking</div>
          <div className="booking-stage-sub">Review the details, then lock it in.</div>
          <div className="booking-summary">
            <div className="booking-summary-row"><span className="booking-summary-label">Service</span><span className="booking-summary-value">{service?.name}</span></div>
            <div className="booking-summary-row"><span className="booking-summary-label">Date</span><span className="booking-summary-value">{formatDate(date)}</span></div>
            <div className="booking-summary-row"><span className="booking-summary-label">Time</span><span className="booking-summary-value">{time}</span></div>
            <div className="booking-summary-row"><span className="booking-summary-label">Price</span><span className="booking-summary-value price">${service?.price.toLocaleString()}</span></div>
          </div>
          <button className="btn-primary booking-confirm" onClick={confirm}>{Icons.scissors} Confirm Booking</button>
        </div>
      )}

      {stage === "thanks" && (
        <div className="booking-thanks">
          <div className="booking-thanks-mark">{Icons.check}</div>
          <div className="booking-thanks-title">WELCOME — <span className="accent">SEE YOU SOON</span></div>
          <p className="booking-thanks-sub">Thank you, your chair is reserved. We can't wait to get you looking unforgettable.</p>
          <div className="booking-thanks-card">
            <div className="booking-summary-row"><span className="booking-summary-label">Service</span><span className="booking-summary-value">{service?.name}</span></div>
            <div className="booking-summary-row"><span className="booking-summary-label">When</span><span className="booking-summary-value">{formatDate(date)} · {time}</span></div>
          </div>
          <div>
            <button className="btn-secondary booking-thanks-again" onClick={reset}>Book Another</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
export default function StylzzByCliff() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [toast,       setToast]       = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 300);
  };

  const scrollTo = (id) => {
    closeMenu();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <>
      <style>{css}</style>
      <div className="noise-overlay" />

      {/* ── Nav ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <img src="./logo.jpg" alt={BARBER.shopName} className="nav-logo" />
        <div className="nav-links">
          {[["services", "Services"], ["barber", "About"], ["gallery", "Gallery"], ["membership", "Membership"]].map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</button>
          ))}
          <button className="nav-cta" onClick={() => scrollTo("booking")}>Book Now</button>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(true)}>{Icons.menu}</button>
      </nav>

      {/* ── Mobile nav ── */}
      {menuOpen && (
        <div className={`mobile-nav ${menuClosing ? "closing" : ""}`}>
          <div className="mobile-nav-header">
            <img src="./logo.jpg" alt={BARBER.shopName} className="nav-logo" />
            <button className="nav-hamburger" onClick={closeMenu}>{Icons.close}</button>
          </div>
          {["services", "booking", "barber", "gallery", "loyalty", "membership", "reviews", "contact"].map((id) => (
            <button key={id} className="mobile-nav-link" onClick={() => scrollTo(id)}>
              {id === "booking" ? "Book" : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <button className="btn-primary" style={{ marginTop: 32, justifyContent: "center" }} onClick={() => scrollTo("booking")}>Book Now</button>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-grain" />
        <div className="hero-content">
          <img src="./logo.jpg" alt={BARBER.shopName} className="hero-logo fade-up" />
          <div className="hero-badge fade-up fade-up-d1">
            <span className="pulse" /> Now Accepting Appointments
          </div>
          <h1 className="fade-up fade-up-d2">
            YOUR <span className="accent">STYLE</span><br />YOUR STATEMENT
          </h1>
          <div className="hero-line" />
          <p className="hero-sub fade-up fade-up-d3">
            Precision cuts, creative styling, and an experience crafted just for you. Every chair visit is a masterpiece.
          </p>
          <div className="hero-ctas fade-up fade-up-d4">
            <button className="btn-primary" onClick={() => scrollTo("booking")}>
              {Icons.scissors} Book Now
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("services")}>
              View Services {Icons.chevron}
            </button>
            <a href="#loyalty" className="btn-loyalty">
              Loyalty App
            </a>
          </div>
        </div>
        <div className="hero-scroll">Scroll to explore</div>
      </section>

      {/* ── Services ── */}
      <section className="section" id="services">
        <div className="section-label">Services</div>
        <h2 className="section-title">THE MENU</h2>
        <p className="section-sub">Every service includes a consultation and premium finish. Because details matter.</p>

        <h3 className="services-category-title">HAIR SERVICES</h3>
        <div className="services-grid" style={{ marginBottom: 48 }}>
          {SERVICES.filter((s) => s.category === "Hair Services").map((s) => (
            <div key={s.id} className="service-card" onClick={() => scrollTo("booking")}>
              {s.popular && <div className="service-badge">Popular</div>}
              <h3>{s.name.toUpperCase()}</h3>
              <div className="service-meta"><span>{Icons.clock} {s.duration}</span></div>
              <p>{s.description}</p>
              <div className="service-price">${s.price.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <h3 className="services-category-title">GROOMING SERVICES</h3>
        <div className="services-grid">
          {SERVICES.filter((s) => s.category === "Grooming").map((s) => (
            <div key={s.id} className="service-card" onClick={() => scrollTo("booking")}>
              <h3>{s.name.toUpperCase()}</h3>
              <div className="service-meta"><span>{Icons.clock} {s.duration}</span></div>
              <p>{s.description}</p>
              <div className="service-price">${s.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking ── */}
      <section className="section" id="booking">
        <div className="section-label">{Icons.calendar} Book</div>
        <h2 className="section-title">RESERVE YOUR CHAIR</h2>
        <p className="section-sub">Pick a service, a date, and a time — done in a few taps.</p>
        <BookingCalendar />
      </section>

      {/* ── About ── */}
      <section className="about-section" id="barber">
        <div className="about-inner">
          <div className="about-photo">
            <img src="./artist.jpg" alt={BARBER.name} />
          </div>
          <div className="about-info">
            <div className="section-label">The Artist</div>
            <h2 className="section-title">{BARBER.name.toUpperCase()}</h2>
            <p className="section-sub">{BARBER.bio}</p>
            <button className="btn-primary" onClick={() => scrollTo("booking")} style={{ display: "inline-flex" }}>
              Book a Session
            </button>
            <div className="about-stats">
              <div>
                <div className="stat-num"><CountUp end={10} suffix="+" duration={2000} /></div>
                <div className="stat-label">Years</div>
              </div>
              <div>
                <div className="stat-num"><CountUp end={5000} suffix="+" duration={2500} /></div>
                <div className="stat-label">Clients</div>
              </div>
              <div>
                <div className="stat-num"><CountUp end={4.9} decimals={1} duration={2000} /></div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="section" id="gallery">
        <div className="section-label">Gallery</div>
        <h2 className="section-title">LATEST WORK</h2>
        <p className="section-sub">Fresh cuts from the chair. Follow along for daily inspiration.</p>
        <div className="gallery-grid">
          {INSTAGRAM_POSTS.map((p) => p.flip ? (
            <div key={p.id} className="gallery-flip">
              <div className="gallery-flip-inner">
                <div className="flip-front" style={{ background: "#1a1714" }}>
                  <img src={p.photo} alt={p.label} />
                  <div className="flip-front-overlay">
                    <span className="flip-front-label">{p.label}</span>
                  </div>
                </div>
                <div className="flip-back">
                  <div className="flip-back-title">VIEW<br/>THE LOOK</div>
                  <div className="flip-back-sub">See it on Instagram</div>
                  <a href={BARBER.instagram} target="_blank" rel="noreferrer" className="flip-back-btn">
                    {Icons.instagram} Follow
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <a key={p.id} href={BARBER.instagram} target="_blank" rel="noreferrer" className="gallery-item">
              <div className="gallery-item-bg">
                <img src={p.photo} alt={p.label} />
              </div>
              <div className="gallery-item-overlay">{Icons.instagram} View</div>
            </a>
          ))}
        </div>
        <a href={BARBER.instagram} target="_blank" rel="noreferrer" className="btn-secondary gallery-follow">
          {Icons.instagram} Follow @stylzzbycliff__thebarber
        </a>
      </section>

      {/* ── Loyalty ── */}
      <section className="section" id="loyalty">
        <div className="section-label">Rewards</div>
        <h2 className="section-title">LOYALTY PROGRAM</h2>
        <p className="section-sub">Every visit counts. Earn your way to a free cut and other treatments of recognition — we value you as much as you value the service.</p>
        <button className="loyalty-btn" type="button">Record Your Visit</button>
      </section>

      {/* ── Membership ── */}
      <section className="section" id="membership">
        <div className="section-label">Membership</div>
        <h2 className="section-title">CHOOSE YOUR PLAN</h2>
        <p className="section-sub">Premium perks, priority access, and savings that grow with you.</p>
        <div className="membership-grid">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div key={tier.name} className={`membership-card${tier.recommended ? " recommended" : ""}`}>
              <div className="membership-name">{tier.name.toUpperCase()}</div>
              <div className="membership-price">
                {tier.price}<span>{tier.period}</span>
              </div>
              <ul className="membership-features">
                {tier.features.map((f, i) => (
                  <li key={i}>{Icons.check} {f}</li>
                ))}
              </ul>
              <button
                className="membership-btn"
                onClick={() => showToast(`${tier.name} plan selected — link your payment system here`)}
              >
                {tier.name === "Classic" ? "Current Plan" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="section" id="reviews">
        <div className="section-label">Reviews</div>
        <h2 className="section-title">WHAT CLIENTS SAY</h2>
        <p className="section-sub">Real experiences from the chair.</p>
        <div className="reviews-track">
          {REVIEWS.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">
                {Array.from({ length: r.rating }).map((_, j) => <span key={j}>{Icons.star}</span>)}
              </div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-name">{r.name}</div>
              <div className="review-date">{r.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hours & Contact ── */}
      <section className="section" id="contact">
        <div className="section-label">Visit</div>
        <h2 className="section-title">HOURS & CONTACT</h2>
        <p className="section-sub">Walk-ins welcome. Appointments recommended.</p>
        <div className="contact-grid">
          <div className="contact-card">
            <h3 className="contact-card-title">HOURS</h3>
            {BARBER.hours.map((h) => (
              <div key={h.day} className={`hours-row${h.time === "Closed" ? " closed" : ""}`}>
                <span className="hours-day">{h.day}</span>
                <span className="hours-time">{h.time}</span>
              </div>
            ))}
          </div>
          <div className="contact-card">
            <h3 className="contact-card-title">CONTACT</h3>
            <div className="contact-item">{Icons.map} {BARBER.address}</div>
            <div className="contact-item">{Icons.phone} {BARBER.phone}</div>
            <div className="contact-item">
              {Icons.instagram}
              <a href={BARBER.instagram} target="_blank" rel="noreferrer">@stylzzbycliff__thebarber</a>
            </div>
            <button className="btn-primary" onClick={() => scrollTo("booking")} style={{ marginTop: 28, display: "inline-flex" }}>
              {Icons.scissors} Book Now
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <img src="./logo.jpg" alt={BARBER.shopName} className="footer-logo" />
        <p>© {new Date().getFullYear()} STYLZZBYCLIFF. All rights reserved.</p>
      </footer>

      {/* ── Toast ── */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
