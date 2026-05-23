import { useState, useEffect, useRef } from "react";
import groomImg from "./assets/image1.jpg";
import brideImg from "./assets/image2.jpg";
import tripImg from "./assets/image3.jpg";
import sunriseImg from "./assets/image4.jpg";
import proposalImg from "./assets/image5.jpg";
import engagementImg from "./assets/image6.jpg";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c9a84c;
    --gold-light: #e8d08a;
    --gold-dark: #8b6914;
    --cream: #fdf6e9;
    --cream-dark: #f5e8c8;
    --rose: #c4717a;
    --rose-light: #e8a0a8;
    --deep: #1a0e05;
    --text: #3d2b1a;
  }

  html, body { height: 100%; overflow-x: hidden; }

  body {
    background: var(--deep);
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .card-root {
    min-height: 100vh;
    width: 100%;
    max-width: 430px;
    margin: 0 auto;
    background: linear-gradient(225deg, var(--cream) 0%, var(--cream-dark) 35%, var(--cream) 70%, var(--cream-dark) 100%);
    background-size: 400% 400%;
    animation: auroraGlow 20s ease infinite;
    position: relative;
    overflow: hidden;
  }
  @keyframes auroraGlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* ── PARTICLES ── */
  .particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .particle {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    animation: floatUp linear infinite;
    will-change: transform, opacity;
    filter: blur(0.5px);
  }
  @keyframes floatUp {
    0%   { transform: translateY(110vh) rotate(0deg); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(-10vh) rotate(720deg); opacity: 0; }
  }

  /* ── ENVELOPE SCREEN ── */
  .envelope-screen {
    position: fixed; inset: 0; z-index: 100;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: radial-gradient(ellipse at center, #2d1a08 0%, #0d0602 100%);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .envelope-screen.hidden { opacity: 0; pointer-events: none; transform: scale(1.05); }

  .envelope-wrap {
    position: relative; width: 240px; height: 160px; cursor: pointer; outline: none;
    animation: envelopeBreathe 3s ease-in-out infinite;
    transition: transform 0.3s ease;
  }
  .envelope-wrap:hover {
    animation-play-state: paused;
    transform: scale(1.04);
  }
  @keyframes envelopeBreathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.025); }
  }
  .envelope-wrap:focus-visible { box-shadow: 0 0 0 3px var(--gold-light); border-radius: 12px; }
  
  .env-body {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #c9a84c 0%, #8b6914 100%);
    border-radius: 4px 4px 12px 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2);
    z-index: 1;
  }
  .env-flap {
    position: absolute; top: 0; left: 0; right: 0;
    height: 100px;
    background: linear-gradient(160deg, #e8d08a 0%, #c9a84c 100%);
    clip-path: polygon(0 0, 50% 65%, 100% 0);
    transform-origin: top center;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 4px 4px 0 0;
    z-index: 5;
  }
  .envelope-wrap.open .env-flap { transform: rotateX(180deg); z-index: 2; }
  .env-left {
    position: absolute; bottom: 0; left: 0;
    width: 0; height: 0;
    border-style: solid;
    border-width: 80px 0 0 120px;
    border-color: transparent transparent transparent #b8922e;
    border-radius: 0 0 0 12px;
    z-index: 4;
  }
  .env-right {
    position: absolute; bottom: 0; right: 0;
    width: 0; height: 0;
    border-style: solid;
    border-width: 80px 120px 0 0;
    border-color: transparent #a07820 transparent transparent;
    border-radius: 0 0 12px 0;
    z-index: 4;
  }
  .env-seal {
    position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%);
    width: 44px; height: 44px; border-radius: 50%;
    background: radial-gradient(circle, #e8d08a, #c9a84c);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; z-index: 6;
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
    transition: opacity 0.3s;
  }
  .envelope-wrap.open .env-seal { opacity: 0; }

  .env-card-peek {
    position: absolute; left: 16px; right: 16px; bottom: 10px;
    height: 0; background: linear-gradient(180deg, #fefbf4 0%, var(--cream) 100%);
    border-radius: 8px; z-index: 3;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
    transition: height 0.8s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;
    border: 1px solid rgba(201, 168, 76, 0.15);
  }
  .envelope-wrap.open .env-card-peek { height: 130px; transform: translateY(-60px); }
  
  .peek-text {
    font-family: 'Great Vibes', cursive;
    color: var(--gold-dark);
    font-size: 20px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s 0.8s, transform 0.4s 0.8s;
  }
  .envelope-wrap.open .peek-text { opacity: 1; transform: translateY(0); }

  .tap-hint {
    color: rgba(201,168,76,0.7); font-size: 12px; letter-spacing: 3px;
    text-transform: uppercase; margin-top: 32px;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
  .env-title { font-family: 'Great Vibes', cursive; color: var(--gold-light); font-size: 28px; margin-bottom: 32px; text-align: center; }

  /* ── MAIN CARD ── */
  .main-card { position: relative; z-index: 1; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background: linear-gradient(170deg, #1a0e05 0%, #2d1a08 40%, #1a0e05 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 60px 24px 100px;
  }
  .hero-ornament-top {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 200px; height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    animation: ribbonExpand 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }
  @keyframes ribbonExpand {
    from { width: 0%; opacity: 0; }
    to { width: 200px; opacity: 1; }
  }
  .hero-ornament-top::before, .hero-ornament-top::after {
    content: ''; position: absolute; top: 8px; width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
  }
  .hero-ornament-top::before { left: 20%; }
  .hero-ornament-top::after { right: 20%; }

  .hero-bg-circle {
    position: absolute; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06), transparent);
  }

  .together-text {
    font-family: 'Montserrat', sans-serif; font-weight: 300;
    letter-spacing: 6px; font-size: 10px; color: var(--gold);
    text-transform: uppercase; margin-bottom: 24px;
    opacity: 0; animation: premiumFadeUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.3s both;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
  .names-wrap { text-align: center; margin-bottom: 8px; }
  .name-primary {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(52px, 14vw, 72px);
    color: var(--gold-light);
    line-height: 1.1;
    text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.3), 0px 3px 6px rgba(0, 0, 0, 0.5), 0px 10px 25px rgba(201,168,76,0.35);
    opacity: 0; animation: nameReveal 1.6s cubic-bezier(0.25, 1, 0.5, 1) 0.6s both;
    display: block;
  }
  .name-amp {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 32px; color: var(--rose-light);
    display: block; margin: -4px 0;
    opacity: 0; animation: premiumFadeUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.9s both;
  }
  .hero-divider {
    width: 120px; height: 1px; margin: 28px auto;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    position: relative;
    opacity: 0; animation: premiumFadeUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) 1.1s both;
  }
  .hero-divider::before {
    content: '✦'; position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    color: var(--gold); font-size: 12px;
    background: #2d1a08; padding: 0 8px;
  }
  .invite-text {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 16px; color: rgba(232,208,138,0.8); text-align: center;
    line-height: 1.8; max-width: 260px;
    opacity: 0; animation: premiumFadeUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) 1.3s both;
  }
  .hero-date {
    margin-top: 32px; text-align: center;
    opacity: 0; animation: premiumFadeUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) 1.5s both;
  }
  .hero-date .day {
    font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 300;
    color: var(--gold); line-height: 1; display: block;
  }
  .hero-date .month-year {
    font-family: 'Montserrat', sans-serif; font-weight: 300;
    letter-spacing: 5px; font-size: 11px; color: var(--gold-light);
    text-transform: uppercase; margin-top: 4px; display: block;
  }

  .scroll-cue {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    margin-top: 40px;
    opacity: 0; animation: fadeIn 1s 2.5s forwards;
  }
  .scroll-cue span { font-size: 9px; letter-spacing: 3px; color: rgba(201,168,76,0.5); text-transform: uppercase; }
  
  .scroll-arrow {
    width: 1px;
    height: 40px;
    background: linear-gradient(180deg, var(--gold), transparent);
    position: relative;
    overflow: hidden;
  }
  .scroll-arrow::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 100%;
    background: linear-gradient(180deg, transparent, var(--gold-light), transparent);
    animation: arrowLightSweep 2s infinite linear;
  }
  @keyframes arrowLightSweep {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  @keyframes premiumFadeUp {
    from { opacity: 0; transform: translateY(24px) scale(0.98); filter: blur(4px); }
    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes nameReveal {
    from { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(8px); letter-spacing: 0.12em; }
    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); letter-spacing: 0.02em; }
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  /* ── SECTIONS ── */
  .section {
    padding: 64px 28px;
    position: relative;
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    will-change: transform, opacity;
  }
  .section.visible { opacity: 1; transform: translateY(0); }

  .section-label {
    font-family: 'Montserrat', sans-serif; font-weight: 300;
    letter-spacing: 5px; font-size: 9px; color: var(--gold);
    text-transform: uppercase; text-align: center; margin-bottom: 20px;
  }
  .section-title {
    font-family: 'Great Vibes', cursive; font-size: 40px;
    color: var(--text); text-align: center; margin-bottom: 8px;
    line-height: 1.2;
    text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.9), 1px 1px 2px rgba(61, 43, 26, 0.12);
  }
  .section-rule {
    width: 60px; height: 1px; margin: 16px auto 28px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  /* ── ACTION LINKS (MAP/CALENDAR) ── */
  .action-link {
    position: relative;
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 400;
    color: var(--gold-dark); text-decoration: none; text-transform: uppercase; letter-spacing: 1px;
    margin-top: 8px; padding: 4px 0;
    transition: color 0.3s;
  }
  .action-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 50%; width: 0; height: 1px;
    background-color: var(--gold-dark);
    transition: width 0.3s ease, left 0.3s ease;
  }
  .action-link:hover::after {
    width: 100%;
    left: 0;
  }

  /* ── COUNTDOWN WITH ENTRY ANIMATION ── */
  .countdown-bg {
    background: linear-gradient(135deg, #1a0e05, #2d1a08);
    padding: 64px 28px;
    opacity: 0; transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .countdown-bg.visible { opacity: 1; transform: translateY(0); }
  .countdown-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 32px; }
  
  .countdown-item {
    text-align: center;
    perspective: 1000px;
  }
  .countdown-box {
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.25);
    border-radius: 8px; padding: 16px 8px;
    margin-bottom: 8px; position: relative; overflow: hidden;
    transform-style: preserve-3d;
    transform: rotateY(-90deg);
    opacity: 0;
    will-change: transform, opacity;
    animation: goldBorderPulse 4s infinite ease-in-out;
    transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.6s ease, border-color 0.6s ease, opacity 0.8s ease;
  }
  @keyframes goldBorderPulse {
    0%, 100% { border-color: rgba(201, 168, 76, 0.25); box-shadow: 0 0 5px rgba(201, 168, 76, 0.05); }
    50% { border-color: rgba(201, 168, 76, 0.55); box-shadow: 0 0 15px rgba(201, 168, 76, 0.15); }
  }
  .countdown-bg.visible .countdown-box {
    transform: rotateY(0deg);
    opacity: 1;
  }
  .countdown-bg.visible .countdown-item:nth-child(1) .countdown-box { transition-delay: 0.1s; }
  .countdown-bg.visible .countdown-item:nth-child(2) .countdown-box { transition-delay: 0.22s; }
  .countdown-bg.visible .countdown-item:nth-child(3) .countdown-box { transition-delay: 0.34s; }
  .countdown-bg.visible .countdown-item:nth-child(4) .countdown-box { transition-delay: 0.46s; }

  .countdown-box:hover {
    transform: translateY(-6px) scale(1.03);
    border-color: rgba(201,168,76,0.6);
    box-shadow: 0 10px 24px rgba(201, 168, 76, 0.15);
  }
  .countdown-box::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(201,168,76,0.05), transparent);
  }
  .countdown-num {
    font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300;
    color: var(--gold-light); line-height: 1; display: block;
    text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1), 0px 2px 6px rgba(201, 168, 76, 0.25);
  }
  .countdown-lbl { font-size: 8px; letter-spacing: 2px; color: rgba(201,168,76,0.6); text-transform: uppercase; }

  /* ── EVENT DETAILS ── */
  .details-bg { background: var(--cream); }
  .event-card {
    background: white;
    border-radius: 16px;
    padding: 28px 24px;
    margin-bottom: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    border-left: 3px solid var(--gold);
    position: relative; overflow: hidden;
    will-change: transform, opacity;
  }
  .event-card::before {
    content: ''; position: absolute; top: 0; right: 0;
    width: 60px; height: 60px;
    background: radial-gradient(circle at top right, rgba(201,168,76,0.1), transparent);
  }
  
  .event-card::after {
    content: '';
    position: absolute;
    top: 0; left: -150%; width: 100%; height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4) 30%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 255, 255, 0.4) 70%,
      transparent
    );
    transform: skewX(-25deg);
    transition: left 0.8s ease;
  }
  .event-card:hover::after {
    left: 150%;
  }

  .event-icon { font-size: 24px; margin-bottom: 12px; display: block; }
  .event-name { 
    font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--text); font-weight: 400; margin-bottom: 12px; 
    text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.9), 1px 1px 2px rgba(61, 43, 26, 0.08);
  }
  .event-detail { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
  .event-detail-icon { color: var(--gold); font-size: 13px; margin-top: 2px; flex-shrink: 0; }
  .event-detail-text { font-size: 13px; color: #6b5240; line-height: 1.5; font-family: 'Cormorant Garamond', serif; font-size: 15px; }

  /* ── COUPLE ── */
  .couple-bg { background: linear-gradient(160deg, var(--cream-dark), var(--cream)); }
  .couple-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; margin-top: 32px; }
  
  .person-card { text-align: center; }
  
  .groom-card {
    transform: translateX(-40px);
    opacity: 0;
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease;
    will-change: transform, opacity;
  }
  .bride-card {
    transform: translateX(40px);
    opacity: 0;
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease;
    will-change: transform, opacity;
  }
  .couple-bg.visible .groom-card,
  .couple-bg.visible .bride-card {
    transform: translateX(0);
    opacity: 1;
  }

  .person-avatar {
    position: relative;
    width: 90px; height: 90px; border-radius: 50%; margin: 0 auto 16px;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 24px rgba(201,168,76,0.25);
    border: 3px solid var(--cream);
    overflow: visible;
  }
  .person-avatar-img-wrap {
    width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
    position: relative; z-index: 2;
  }
  .avatar-ring {
    position: absolute;
    inset: -4px;
    border: 1px solid var(--gold-light);
    border-radius: 50%;
    z-index: 1;
    pointer-events: none;
    animation: avatarRingRipple 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }
  .avatar-ring-2 {
    animation-delay: 1.5s;
  }
  @keyframes avatarRingRipple {
    0% { transform: scale(0.95); opacity: 0.8; }
    100% { transform: scale(1.2); opacity: 0; }
  }

  .person-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .person-name { 
    font-family: 'Great Vibes', cursive; font-size: 26px; color: var(--text);
    text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.9), 1px 1px 2px rgba(61, 43, 26, 0.1);
  }
  .person-role { font-size: 10px; letter-spacing: 2px; color: var(--gold); text-transform: uppercase; margin-top: 4px; }
  
  .couple-amp {
    font-family: 'Great Vibes', cursive; font-size: 40px; color: var(--rose); text-align: center;
    animation: heartbeat 2s infinite ease-in-out;
    display: inline-block;
  }
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.15); }
    40% { transform: scale(1.05); }
    55% { transform: scale(1.2); }
  }

  /* ── GALLERY ── */
  .gallery-bg { background: #1a0e05; }
  .gallery-bg .section-title { color: var(--gold-light); }
  .gallery-bg .section-label { color: rgba(201,168,76,0.7); }
  .memory-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-top: 28px; }
  
  .memory-item {
    border-radius: 12px; overflow: hidden; position: relative;
    aspect-ratio: 1;
    opacity: 0;
    transform: scale(0.9) translateY(24px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }
  .memory-item:first-child { grid-column: 1 / -1; aspect-ratio: 16/9; }
  
  .gallery-bg.visible .memory-item {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  .gallery-bg.visible .memory-item:nth-child(1) { transition-delay: 0s; }
  .gallery-bg.visible .memory-item:nth-child(2) { transition-delay: 0.15s; }
  .gallery-bg.visible .memory-item:nth-child(3) { transition-delay: 0.3s; }
  .gallery-bg.visible .memory-item:nth-child(4) { transition-delay: 0.45s; }

  .memory-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .memory-item:hover .memory-img { transform: scale(1.08) rotate(1deg); }
  
  .memory-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(26,14,5,0.85) 0%, rgba(26,14,5,0.2) 60%, transparent 100%);
    display: flex; align-items: flex-end; padding: 16px;
    transition: background 0.5s ease;
  }
  .memory-item:hover .memory-overlay {
    background: linear-gradient(to top, rgba(139,105,20,0.85) 0%, rgba(196,113,122,0.35) 60%, transparent 100%);
  }
  
  .memory-text {
    font-size: 10px; letter-spacing: 2px; color: var(--gold-light); text-transform: uppercase;
    transition: transform 0.4s ease, letter-spacing 0.4s ease;
  }
  .memory-item:hover .memory-text {
    transform: translateY(-4px);
    letter-spacing: 3px;
  }

  /* ── RSVP ── */
  .rsvp-bg {
    background: linear-gradient(160deg, var(--gold-dark), #1a0e05);
    text-align: center; padding: 64px 28px;
    opacity: 0; transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .rsvp-bg.visible { opacity: 1; transform: translateY(0); }
  .rsvp-bg .section-title { color: var(--gold-light); font-size: 48px; }
  .rsvp-bg .section-label { color: rgba(232,208,138,0.7); }
  .rsvp-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 16px; color: rgba(232,208,138,0.8); line-height: 1.8; margin-bottom: 36px; }
  
  .rsvp-btn {
    position: relative;
    overflow: hidden;
    display: inline-block; padding: 16px 48px;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    color: var(--deep); font-family: 'Montserrat', sans-serif;
    font-size: 11px; font-weight: 500; letter-spacing: 4px;
    text-transform: uppercase; text-decoration: none;
    border-radius: 50px; border: none; cursor: pointer;
    box-shadow: 0 8px 32px rgba(201,168,76,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
    -webkit-tap-highlight-color: transparent;
    z-index: 1;
  }
  .rsvp-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25) 30%,
      rgba(255, 255, 255, 0.45) 50%,
      rgba(255, 255, 255, 0.25) 70%,
      transparent
    );
    transform: skewX(-25deg);
    animation: rsvpShimmer 4s infinite linear;
    z-index: -1;
  }
  @keyframes rsvpShimmer {
    0% { left: -120%; }
    30% { left: 120%; }
    100% { left: 120%; }
  }
  
  .rsvp-btn:hover { box-shadow: 0 12px 40px rgba(201,168,76,0.6); transform: translateY(-2px); }
  .rsvp-btn:active { transform: scale(0.97); box-shadow: 0 4px 16px rgba(201,168,76,0.3); }
  .rsvp-deadline { margin-top: 20px; font-size: 11px; letter-spacing: 2px; color: rgba(201,168,76,0.5); text-transform: uppercase; }

  /* ── FOOTER ── */
  .footer { background: #0d0602; padding: 40px 28px; text-align: center; }
  .footer-monogram {
    width: 76px; height: 76px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;
    font-family: 'Great Vibes', cursive; font-size: 26px; color: var(--deep);
    box-shadow: 0 4px 20px rgba(201,168,76,0.4);
    letter-spacing: 0.05em;
  }
  .footer-text { font-size: 11px; letter-spacing: 3px; color: rgba(201,168,76,0.4); text-transform: uppercase; }
  .footer-names { font-family: 'Great Vibes', cursive; font-size: 24px; color: var(--gold); margin: 8px 0 16px; }

  /* ── PETAL BURST ── */
  .petal { position: fixed; pointer-events: none; z-index: 200; animation: petalFall 3.5s ease-in forwards; }
  @keyframes petalFall {
    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }

  /* ── PREMIUM LOADING SCREEN ── */
  .preloader {
    position: fixed; inset: 0; z-index: 999;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: radial-gradient(ellipse at center, #2d1a08 0%, #0d0602 100%);
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .preloader.fade-out { opacity: 0; pointer-events: none; }
  .preloader-ring-wrapper {
    position: relative;
    width: 90px; height: 90px;
    margin-bottom: 24px;
    display: flex; align-items: center; justify-content: center;
  }
  .preloader-ring {
    position: absolute; inset: 0;
    border: 2px solid rgba(201,168,76,0.1);
    border-top: 2px solid var(--gold-light);
    border-radius: 50%;
    animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    box-shadow: 0 0 30px rgba(201,168,76,0.05);
  }
  
  @keyframes textShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .preloader-monogram {
    font-family: 'Great Vibes', cursive;
    position: absolute;
    font-size: 28px;
    background: linear-gradient(90deg, var(--gold-light) 0%, #ffffff 25%, var(--gold-light) 50%, #ffffff 75%, var(--gold-light) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: pulse 1.5s ease-in-out infinite, textShimmer 3s linear infinite;
    z-index: 1;
  }

  .preloader-bar-bg {
    width: 200px; height: 2px;
    background: rgba(201,168,76,0.15);
    border-radius: 2px; overflow: hidden;
    margin-bottom: 16px;
  }
  .preloader-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    transition: width 0.05s linear;
  }
  .preloader-text {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 14px;
    color: var(--gold-light);
    letter-spacing: 2px;
    opacity: 0.8;
  }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

  /* ── REFINED ESTHETICS & UPGRADES ── */

  /* 1. Great Vibes Word Spacing */
  .peek-text, 
  .env-title, 
  .name-primary, 
  .section-title, 
  .person-name, 
  .couple-amp, 
  .footer-monogram, 
  .footer-names, 
  .preloader-monogram {
    word-spacing: 0.15em;
  }

  /* 2. Background Blob Animation */
  .bg-glow-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    opacity: 0.65; /* Increased opacity for high visibility on mobile */
    animation: floatBlobShifting 25s infinite alternate ease-in-out;
  }
  .bg-glow-blob-1 {
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(201, 168, 76, 0.16) 0%, transparent 80%);
    top: 15%; left: -20%;
  }
  .bg-glow-blob-2 {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(196, 113, 122, 0.12) 0%, transparent 80%);
    top: 45%; right: -25%;
    animation-duration: 30s;
    animation-delay: -5s;
  }
  .bg-glow-blob-3 {
    width: 260px; height: 260px;
    background: radial-gradient(circle, rgba(201, 168, 76, 0.14) 0%, transparent 80%);
    bottom: 15%; left: -15%;
    animation-duration: 22s;
    animation-delay: -10s;
  }
  .interactive-bg-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(
      circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(201, 168, 76, 0.05) 0%,
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .card-root:hover .interactive-bg-glow,
  .card-root:active .interactive-bg-glow {
    opacity: 1;
  }

  @keyframes floatBlobShifting {
    0% {
      transform: translate(0, 0) scale(1) rotate(0deg);
      background: radial-gradient(circle, rgba(201, 168, 76, 0.16) 0%, transparent 80%);
    }
    50% {
      transform: translate(40px, -60px) scale(1.15) rotate(180deg);
      background: radial-gradient(circle, rgba(196, 113, 122, 0.14) 0%, transparent 80%);
    }
    100% {
      transform: translate(-20px, 30px) scale(0.9) rotate(360deg);
      background: radial-gradient(circle, rgba(232, 208, 138, 0.15) 0%, transparent 80%);
    }
  }

  /* 3. Hero Blob floating */
  .hero-bg-circle {
    animation: floatBlobShifting 20s infinite alternate ease-in-out;
  }
  .hero-bg-circle:nth-child(2) {
    animation-duration: 25s;
    animation-delay: -5s;
  }

  /* 4. Translucency for middle light sections so main-card blobs show through */
  .details-bg {
    background: transparent !important;
    z-index: 1;
  }
  .couple-bg {
    background: linear-gradient(160deg, rgba(245, 232, 200, 0.45) 0%, rgba(253, 246, 233, 0.25) 100%) !important;
    z-index: 1;
  }

  /* 5. Glassmorphism Upgrade for Event Card */
  .event-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(253, 246, 233, 0.48) 100%) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(201, 168, 76, 0.18) !important;
    border-left: 4px solid var(--gold) !important;
    box-shadow: 
      0 8px 32px rgba(139, 105, 20, 0.04), 
      inset 0 1px 0 rgba(255, 255, 255, 0.8),
      0 1px 2px rgba(0, 0, 0, 0.02) !important;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease !important;
  }
  .event-card:hover {
    transform: translateY(-4px) !important;
    border-color: rgba(201, 168, 76, 0.35) !important;
    box-shadow: 
      0 16px 40px rgba(139, 105, 20, 0.08), 
      inset 0 1px 0 rgba(255, 255, 255, 0.95),
      0 1px 3px rgba(0, 0, 0, 0.03) !important;
  }

  /* 6. Monogram Ampersand spacing & styling to resolve overlapping cursive letters */
  .monogram-amp {
    font-family: 'Cormorant Garamond', serif !important;
    font-style: italic !important;
    font-weight: 300 !important;
    font-size: 0.85em !important;
    color: inherit !important;
    margin: 0 6px !important;
    vertical-align: middle !important;
    display: inline-block !important;
    text-shadow: none !important;
  }

  /* 7. Footer Monogram Circle Spacing & Breathability Upgrade */
  .footer-monogram {
    width: 76px !important;
    height: 76px !important;
    font-size: 26px !important;
    letter-spacing: 0.05em !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 6px 24px rgba(201, 168, 76, 0.3) !important;
  }

  /* 8. The Golden Starburst Sparkle Glint Field */
  .sparkles-field {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .sparkle-star {
    position: absolute;
    color: var(--gold-light);
    opacity: 0;
    animation: sparkleGlint 5s infinite ease-in-out;
    will-change: transform, opacity;
    text-shadow: 0 0 8px rgba(232, 208, 138, 0.8);
  }
  @keyframes sparkleGlint {
    0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
    50% { opacity: 0.85; transform: scale(1.1) rotate(180deg); }
  }
`;

// Particle config
const PARTICLE_CONFIG = [
  { color: '#c9a84c', size: 3 },
  { color: '#e8d08a', size: 2 },
  { color: '#c4717a', size: 2 },
  { color: '#ffffff', size: 1.5 },
];

function Particle({ index }) {
  const cfg = PARTICLE_CONFIG[index % PARTICLE_CONFIG.length];
  const left = `${(index * 7.3 + 11) % 100}%`;
  const duration = `${8 + (index * 1.7) % 8}s`;
  const delay = `${(index * 0.8) % 6}s`;
  const size = `${cfg.size + (index % 2)}px`;
  return (
    <div className="particle" style={{
      left, width: size, height: size,
      background: cfg.color,
      animationDuration: duration,
      animationDelay: delay,
      boxShadow: `0 0 ${cfg.size * 2}px ${cfg.color}`,
    }} />
  );
}

// Sparkle decorations for high-visibility luxury background shimmer on mobile
const SPARKLE_DECORATIONS = [
  { top: '8%', left: '15%', symbol: '✦', delay: '0s', duration: '5s' },
  { top: '15%', left: '80%', symbol: '✨', delay: '1.5s', duration: '6s' },
  { top: '28%', left: '10%', symbol: '✦', delay: '3s', duration: '7s' },
  { top: '38%', left: '85%', symbol: '✦', delay: '0.8s', duration: '5.5s' },
  { top: '48%', left: '5%', symbol: '✨', delay: '2.2s', duration: '6.5s' },
  { top: '58%', left: '78%', symbol: '✦', delay: '4s', duration: '8s' },
  { top: '72%', left: '12%', symbol: '✦', delay: '1.2s', duration: '5.8s' },
  { top: '85%', left: '82%', symbol: '✨', delay: '2.7s', duration: '6.2s' },
  { top: '92%', left: '20%', symbol: '✦', delay: '0.2s', duration: '4.8s' }
];

function SparklesField() {
  return (
    <div className="sparkles-field">
      {SPARKLE_DECORATIONS.map((s, idx) => (
        <span 
          key={idx} 
          className="sparkle-star" 
          style={{
            top: s.top, 
            left: s.left, 
            animationDelay: s.delay, 
            animationDuration: s.duration,
            fontSize: s.symbol === '✨' ? '12px' : '15px'
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
}

// React-friendly Petal Burst
function PetalBurst({ active }) {
  const [petals, setPetals] = useState([]);
  
  useEffect(() => {
    if (!active) {
      const timer = setTimeout(() => {
        setPetals([]);
      }, 0);
      return () => clearTimeout(timer);
    }
    const emojis = ['🌸', '🌹', '✨', '💛', '🌼', '💕'];
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}vw`,
      delay: `${i * 0.1}s`,
      duration: `${2 + Math.random() * 2}s`,
      size: `${16 + Math.random() * 16}px`
    }));
    
    const timer = setTimeout(() => {
      setPetals(newPetals);
    }, 0);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  return (
    <>
      {petals.map((p) => (
        <div key={p.id} className="petal" style={{
          left: p.left, animationDelay: p.delay, 
          animationDuration: p.duration, fontSize: p.size
        }}>
          {p.emoji}
        </div>
      ))}
    </>
  );
}

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Section({ className = '', children, style: s }) {
  const ref = useRef();
  const visible = useInView(ref);
  return <div ref={ref} className={`section ${className} ${visible ? 'visible' : ''}`} style={s}>{children}</div>;
}

function AnimDiv({ className = '', children, style: s }) {
  const ref = useRef();
  const visible = useInView(ref);
  return <div ref={ref} className={`${className} ${visible ? 'visible' : ''}`} style={s}>{children}</div>;
}

function useCountdown(targetDate) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

function Envelope({ onOpen }) {
  const [opened, setOpened] = useState(false);
  const handle = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 1200);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="env-title">You're Invited ✨</div>
      <div 
        className={`envelope-wrap ${opened ? 'open' : ''}`} 
        onClick={handle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handle()}
        role="button"
        tabIndex={0}
        aria-label="Open Invitation Envelope"
      >
        <div className="env-body" />
        <div className="env-flap" />
        <div className="env-left" />
        <div className="env-right" />
        <div className="env-seal" role="img" aria-label="Ring Seal">💍</div>
        <div className="env-card-peek">
          <span className="peek-text">With love & joy...</span>
        </div>
      </div>
      <div className="tap-hint">{opened ? 'Opening...' : 'Tap to Open'}</div>
    </div>
  );
}

export default function WeddingCard() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Polishing the gold seals...");
  const [showCard, setShowCard] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);
  const containerRef = useRef(null);

  // Track cursor and touch movement to dynamically move the background glow spotlight
  useEffect(() => {
    if (!showCard) return;
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMove);
      
      const handleTouchMove = (e) => {
        if (e.touches && e.touches[0]) {
          handleMove(e.touches[0]);
        }
      };
      container.addEventListener('touchmove', handleTouchMove, { passive: true });

      return () => {
        container.removeEventListener('mousemove', handleMove);
        container.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [showCard]);

  // Read guest name from URL
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('guest');

  const countdown = useCountdown('2026-07-07T18:00:00');

  useEffect(() => {
    let start = null;
    const duration = 2000; // 2 seconds loader
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);
      
      if (currentProgress < 33) {
        setLoadingText("Polishing the gold seals...");
      } else if (currentProgress < 66) {
        setLoadingText("Gathering flower petals...");
      } else {
        setLoadingText("Revealing the invite...");
      }
      
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setLoading(false), 300);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  const handleOpen = () => {
    setShowCard(true);
    setTimeout(() => setHideEnvelope(true), 900);
  };

  return (
    <>
      <style>{style}</style>
      
      {/* Premium Preloader Screen */}
      {loading && (
        <div className={`preloader ${progress === 100 ? 'fade-out' : ''}`}>
          <div className="preloader-ring-wrapper">
            <div className="preloader-ring" />
            <span className="preloader-monogram">R&amp;S</span>
          </div>
          <div className="preloader-bar-bg">
            <div className="preloader-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="preloader-text">{loadingText}</div>
        </div>
      )}

      {/* Declarative React Petals */}
      <PetalBurst active={showCard} />

      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 20 }, (_, i) => <Particle key={i} index={i} />)}
      </div>

      {/* Envelope screen */}
      <div className={`envelope-screen ${hideEnvelope ? 'hidden' : ''}`}>
        <Envelope onOpen={handleOpen} />
      </div>

      {/* Main card */}
      {showCard && (
        <div ref={containerRef} className="card-root main-card">
          {/* Subtle Ambient Background Animation Blobs & Interactive Spotlight */}
          <div className="bg-glow-blob bg-glow-blob-1" />
          <div className="bg-glow-blob bg-glow-blob-2" />
          <div className="bg-glow-blob bg-glow-blob-3" />
          <div className="interactive-bg-glow" />
          <SparklesField />

          {/* ── HERO ── */}
          <div className="hero">
            <div className="hero-ornament-top" />
            <div className="hero-bg-circle" style={{ width: 300, height: 300, top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
            <div className="hero-bg-circle" style={{ width: 200, height: 200, bottom: '15%', right: '-10%' }} />

            {guestName && (
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 16, color: 'rgba(232,208,138,0.85)', marginBottom: 20, textAlign: 'center', animation: 'fadeUp 1s 0.1s both' }}>
                Dear {guestName},
              </div>
            )}

            <div className="together-text">Together with their families</div>
            <div className="names-wrap">
              <span className="name-primary">Rahul</span>
              <span className="name-amp">&amp;</span>
              <span className="name-primary">Sayani</span>
            </div>
            <div className="hero-divider" />
            <p className="invite-text">
              joyfully invite you to celebrate<br />the beginning of their<br />forever together
            </p>
            <div className="hero-date">
              <span className="day">07</span>
              <span className="month-year">July · 2026</span>
            </div>
            <div className="scroll-cue">
              <span>Scroll</span>
              <div className="scroll-arrow" />
            </div>
          </div>

          {/* ── COUNTDOWN ── */}
          <AnimDiv className="countdown-bg">
            <div className="section-label">Counting down to forever</div>
            <div className="section-title" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 36, color: 'var(--gold-light)', textAlign: 'center', wordSpacing: '0.15em' }}>Days Until We Say I Do</div>
            <div className="countdown-grid">
              {[['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Mins'], ['seconds', 'Secs']].map(([k, l]) => (
                <div className="countdown-item" key={k}>
                  <div className="countdown-box">
                    <span className="countdown-num">{String(countdown[k]).padStart(2, '0')}</span>
                  </div>
                  <div className="countdown-lbl">{l}</div>
                </div>
              ))}
            </div>
          </AnimDiv>

          {/* ── COUPLE ── */}
          <Section className="couple-bg">
            <div className="section-label">The Happy Couple</div>
            <div className="section-title">Our Story</div>
            <div className="section-rule" />
            <div className="couple-grid">
              <div className="person-card groom-card">
                <div className="person-avatar" role="img" aria-label="Groom">
                  <div className="avatar-ring" />
                  <div className="avatar-ring avatar-ring-2" />
                  <div className="person-avatar-img-wrap">
                    <img src={groomImg} alt="Groom" className="person-avatar-img" />
                  </div>
                </div>
                <div className="person-name">Rahul</div>
                <div className="person-role">The Groom</div>
              </div>
              <div className="couple-amp">❤</div>
              <div className="person-card bride-card">
                <div className="person-avatar" role="img" aria-label="Bride">
                  <div className="avatar-ring" />
                  <div className="avatar-ring avatar-ring-2" />
                  <div className="person-avatar-img-wrap">
                    <img src={brideImg} alt="Bride" className="person-avatar-img" />
                  </div>
                </div>
                <div className="person-name">Sayani</div>
                <div className="person-role">The Bride</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 16, color: '#6b5240', textAlign: 'center', lineHeight: 1.9, marginTop: 28 }}>
              Two hearts, one journey.<br />
              What started as a chance meeting<br />
              blossomed into a love story<br />
              we cannot wait to celebrate with you.
            </p>
          </Section>

          {/* ── EVENT DETAILS ── */}
          <Section className="details-bg">
            <div className="section-label">You Are Invited</div>
            <div className="section-title">The Celebration</div>
            <div className="section-rule" />

            <div className="event-card">
              <span className="event-icon" role="img" aria-label="Church">💒</span>
              <div className="event-name">Wedding Ceremony</div>
              
              <div className="event-detail">
                <span className="event-detail-icon">📅</span>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span className="event-detail-text">Tuesday, 7th July 2026</span>
                  <a href="/wedding.ics" download="wedding.ics" className="action-link">✚ Add to Calendar</a>
                </div>
              </div>
              
              <div className="event-detail" style={{ marginTop: 12 }}>
                <span className="event-detail-icon">🕖</span>
                <span className="event-detail-text">7:00 PM onwards</span>
              </div>
              
              <div className="event-detail" style={{ marginTop: 12 }}>
                <span className="event-detail-icon">📍</span>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span className="event-detail-text">ITC Royal Bengal , West Bengal 700046</span>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="action-link">📍 View on Map</a>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 12, padding: '20px 20px',
              textAlign: 'center', marginTop: 8
            }}>
              <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: 28, color: 'var(--gold)', marginBottom: 8, wordSpacing: '0.15em' }}>
                With love & blessings
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 14, color: '#8b6914', lineHeight: 1.8 }}>
                Your presence is the greatest gift.<br />
                No presents please, just your warm company.
              </div>
            </div>
          </Section>

          {/* ── MEMORIES / GALLERY ── */}
          <Section className="gallery-bg">
            <div className="section-label">Our Moments</div>
            <div className="section-title">A Glimpse of Us</div>
            <div className="section-rule" />
            <div className="memory-grid">
              {/* Added realistic placeholder images to make it look truly fabulous */}
              {[
                [tripImg, 'Our First Trip'], 
                [sunriseImg, 'Sunrise Together'], 
                [proposalImg, 'The Proposal'], 
                [engagementImg, 'Engagement Day']
              ].map(([imgSrc, label], i) => (
                <div className="memory-item" key={i}>
                  <img src={imgSrc} alt={label} className="memory-img" loading="lazy" />
                  <div className="memory-overlay">
                    <span className="memory-text">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── RSVP ── */}
          <AnimDiv className="rsvp-bg">
            <div className="section-label">Will you join us?</div>
            <div className="section-title" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 48, color: 'var(--gold-light)', textAlign: 'center', marginBottom: 8, wordSpacing: '0.15em' }}>RSVP</div>
            <div className="section-rule" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />
            <p className="rsvp-text">
              Your presence would make our day<br />
              infinitely more special.<br />
              Please let us know you're coming!
            </p>
            <a
              className="rsvp-btn"
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Confirm Attendance
            </a>
            <div className="rsvp-deadline">Kindly respond by 1st June 2026</div>
          </AnimDiv>

          {/* ── FOOTER ── */}
          <div className="footer">
            <div className="footer-monogram">R <span className="monogram-amp">&amp;</span> S</div>
            <div className="footer-names">Rahul &amp; Sayani</div>
            <div className="footer-text">07 · 07 · 2026 &nbsp;·&nbsp; Kolkata, India</div>
            <div style={{ marginTop: 24, fontSize: 20 }} role="img" aria-label="flowers and ring">🌸 💍 🌸</div>
            <div style={{ marginTop: 16, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 14, color: 'rgba(201,168,76,0.4)', lineHeight: 1.8 }}>
              "And they lived happily ever after..."
            </div>
          </div>

        </div>
      )}
    </>
  );
}
