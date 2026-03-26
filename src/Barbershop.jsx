import { useState, useEffect, useRef } from "react";
import React from "react";

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

const PRODUCTS = [
  { id: 1, name: "Matte Clay Pomade",   price: 3500, image: "🫙", category: "Styling" },
  { id: 2, name: "Beard Oil — Cedar",   price: 2800, image: "🧴", category: "Beard"   },
  { id: 3, name: "Sea Salt Spray",      price: 2200, image: "💧", category: "Styling" },
  { id: 4, name: "Charcoal Face Wash",  price: 3000, image: "🖤", category: "Skin"    },
  { id: 5, name: "Boar Bristle Brush",  price: 4000, image: "🪮", category: "Tools"   },
  { id: 6, name: "Aftershave Balm",     price: 2500, image: "✨", category: "Skin"    },
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
  { id: 3, photo: "./photo5.jpg",  label: "Fresh Cut",      flip: true },
  { id: 4, photo: "./photo3.jpeg", label: "Line Up"        },
  { id: 5, photo: "./photo4.jpeg", label: "Classic Taper"  },
  { id: 6, photo: "./photo6.jpg",  label: "Sharp Lines",   flip: true },
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
  cart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  gift: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polyline points="20,12 20,22 4,22 4,12"/>
      <rect x="2" y="7" width="20" height="5"/>
      <line x1="12" y1="22" x2="12" y2="7"/>
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
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
};

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
    background: rgba(196,187,179,0.92);
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
  .loyalty-card {
    background: var(--bg-card); border: 1px solid var(--border-light);
    border-radius: var(--radius); padding: 40px; position: relative; overflow: hidden;
  }
  .loyalty-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-warm), var(--accent));
  }
  .loyalty-title { font-family: var(--font-display); font-size: 24px; letter-spacing: 2px; display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .loyalty-dots { display: flex; gap: 10px; align-items: center; margin: 28px 0 16px; }
  .loyalty-dot {
    width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 16px; color: var(--text-tertiary);
    transition: var(--transition); letter-spacing: 1px; flex-shrink: 0;
  }
  .loyalty-dot.filled { background: var(--accent); border-color: var(--accent); color: white; animation: progressPulse 2s ease infinite; }
  .loyalty-dot.reward { border-color: var(--accent); color: var(--accent); width: 58px; height: 58px; }
  .loyalty-connector { flex: 1; height: 2px; background: var(--border); }
  .loyalty-connector.filled { background: var(--accent); }
  .loyalty-info { font-size: 15px; color: var(--text-secondary); line-height: 1.7; }
  .loyalty-info strong { color: var(--text-primary); }
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

  /* ── Shop ── */
  .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 14px; }
  .product-card {
    background: var(--bg-card); border: 1px solid var(--border-light);
    border-radius: var(--radius); padding: 24px; text-align: center;
    transition: var(--transition); cursor: pointer;
  }
  .product-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
  .product-emoji { font-size: 44px; margin-bottom: 16px; display: block; }
  .product-cat { font-family: var(--font-condensed); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .product-name { font-weight: 500; font-size: 14px; margin-bottom: 8px; }
  .product-price { font-family: var(--font-display); font-size: 24px; font-weight: 400; color: var(--text-primary); letter-spacing: 1px; }
  .product-add {
    margin-top: 16px; width: 100%; padding: 10px; border-radius: 6px;
    border: 1px solid var(--border); background: transparent;
    font-family: var(--font-condensed); font-size: 12px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: var(--transition);
  }
  .product-add:hover { background: var(--accent); color: white; border-color: var(--accent); }

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
    border-top: 1px solid var(--border-light);
    background: var(--charcoal); color: rgba(255,255,255,0.5);
  }
  .footer-logo { height: 56px; margin-bottom: 20px; opacity: 0.6; filter: brightness(3); }
  .footer p { font-size: 13px; }

  /* ── Cart badge ── */
  .cart-fab {
    position: fixed; bottom: 24px; right: 24px; z-index: 90;
    background: var(--accent); color: white; width: 58px; height: 58px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 6px 24px rgba(196,80,42,0.35);
    transition: var(--transition); animation: scaleIn 0.3s ease;
    border: none;
  }
  .cart-fab:hover { transform: scale(1.1); background: var(--accent-dark); }
  .cart-count {
    position: absolute; top: -4px; right: -4px;
    background: var(--charcoal); width: 22px; height: 22px; border-radius: 50%;
    font-family: var(--font-condensed); font-size: 12px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; color: white;
  }

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
    .products-grid { grid-template-columns: repeat(2, 1fr); }
    .loyalty-dot { width: 40px; height: 40px; font-size: 13px; }
    .loyalty-dot.reward { width: 48px; height: 48px; }
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

/* ── Main component ── */
export default function StylzzByCliff() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [loyalty,     setLoyalty]     = useState(3);
  const [cart,        setCart]        = useState([]);
  const [toast,       setToast]       = useState(null);

  const TOTAL_STEPS = 5;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    showToast(`${product.name} added to cart`);
  };

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 300);
  };

  const scrollTo = (id) => {
    closeMenu();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleLoyalty = () => {
    if (loyalty < TOTAL_STEPS) {
      const next = loyalty + 1;
      setLoyalty(next);
      showToast(next >= TOTAL_STEPS ? "🎉 Free haircut unlocked!" : "Visit recorded!");
    } else {
      setLoyalty(0);
      showToast("Reward redeemed! Counter reset.");
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="noise-overlay" />

      {/* ── Nav ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <img src="./logo.jpg" alt={BARBER.shopName} className="nav-logo" />
        <div className="nav-links">
          {[["services", "Services"], ["barber", "About"], ["gallery", "Gallery"], ["membership", "Membership"], ["shop", "Shop"]].map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</button>
          ))}
          <a href={BARBER.bookingLink} className="nav-cta" target="_blank" rel="noreferrer">Book Now</a>
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
          {["services", "barber", "gallery", "loyalty", "membership", "shop", "reviews", "contact"].map((id) => (
            <button key={id} className="mobile-nav-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <a href={BARBER.bookingLink} className="btn-primary" style={{ marginTop: 32, justifyContent: "center" }} target="_blank" rel="noreferrer">Book Now</a>
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
            <a href={BARBER.bookingLink} className="btn-primary" target="_blank" rel="noreferrer">
              {Icons.scissors} Book Now
            </a>
            <button className="btn-secondary" onClick={() => scrollTo("services")}>
              View Services {Icons.chevron}
            </button>
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
            <div key={s.id} className="service-card" onClick={() => window.open(BARBER.bookingLink, "_blank")}>
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
            <div key={s.id} className="service-card" onClick={() => window.open(BARBER.bookingLink, "_blank")}>
              <h3>{s.name.toUpperCase()}</h3>
              <div className="service-meta"><span>{Icons.clock} {s.duration}</span></div>
              <p>{s.description}</p>
              <div className="service-price">${s.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
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
            <a href={BARBER.bookingLink} className="btn-primary" target="_blank" rel="noreferrer" style={{ display: "inline-flex" }}>
              Book a Session
            </a>
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
        <p className="section-sub">Every visit counts. Earn your way to a free cut.</p>
        <div className="loyalty-card">
          <div className="loyalty-title">{Icons.gift} YOUR PROGRESS</div>
          <div className="loyalty-dots">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <React.Fragment key={i}>
                <div className={`loyalty-dot${i < loyalty ? " filled" : ""}${i === TOTAL_STEPS - 1 ? " reward" : ""}`}>
                  {i < loyalty ? "" : i === TOTAL_STEPS - 1 ? "🎁" : i + 1}
                </div>
                {i < TOTAL_STEPS - 1 && (
                  <div className={`loyalty-connector${i < loyalty - 1 ? " filled" : ""}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="loyalty-info">
            <strong>{loyalty} of {TOTAL_STEPS}</strong> visits completed.{" "}
            {loyalty >= TOTAL_STEPS
              ? "🎉 You've earned a FREE cut! Redeem on your next visit."
              : `${TOTAL_STEPS - loyalty} more until your free haircut.`}
          </p>
          <button className="loyalty-btn" onClick={handleLoyalty}>
            {loyalty >= TOTAL_STEPS ? "Redeem Reward" : "Record Visit"} (Demo)
          </button>
        </div>
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

      {/* ── Shop ── */}
      <section className="section" id="shop">
        <div className="section-label">Shop</div>
        <h2 className="section-title">RECOMMENDED PRODUCTS</h2>
        <p className="section-sub">The same products used in-chair, now for your daily routine.</p>
        <div className="products-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="product-card">
              <span className="product-emoji">{p.image}</span>
              <div className="product-cat">{p.category}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-price">${p.price.toLocaleString()}</div>
              <button className="product-add" onClick={() => addToCart(p)}>Add to Cart</button>
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
            <a href={BARBER.bookingLink} className="btn-primary" target="_blank" rel="noreferrer" style={{ marginTop: 28, display: "inline-flex" }}>
              {Icons.scissors} Book Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <img src="./logo.jpg" alt={BARBER.shopName} className="footer-logo" />
        <p>© {new Date().getFullYear()} STYLZZBYCLIFF. All rights reserved.</p>
      </footer>

      {/* ── Cart FAB ── */}
      {cart.length > 0 && (
        <button className="cart-fab" onClick={() => showToast(`${cart.length} item(s) — $${cart.reduce((a, b) => a + b.price, 0).toLocaleString()}`)}>
          {Icons.cart}
          <span className="cart-count">{cart.length}</span>
        </button>
      )}

      {/* ── Toast ── */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
