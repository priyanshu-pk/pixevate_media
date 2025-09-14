'use client';
import React, { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import BookCallModal from './components/BookCallModal';

export default function Home() {
  // For navbar selection
  const [selected, setSelected] = useState('Home');
  // For smooth scroll
  const trustedRef = useRef<HTMLDivElement>(null);
  // For animated counters
  const [counts, setCounts] = useState({ projects: 0, clients: 0, experience: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  // For quote animation
  const [quoteVisible, setQuoteVisible] = useState(false);
  // For letter-by-letter animation
  const [letterIndex, setLetterIndex] = useState(0);
  const [isQuoteAnimating, setIsQuoteAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const quoteText = "Ready to elevate your brand?";
  
  // Cursor blue hue effect (no shape, just glow)
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'pixel-cursor-hue';
    Object.assign(cursor.style, {
      position: 'fixed',
      width: '72px',
      height: '72px',
      pointerEvents: 'none',
      zIndex: 9999,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,40,180,0.32) 0%, rgba(0,40,180,0.18) 60%, transparent 100%)',
      boxShadow: '0 0 48px 16px #003cff55',
      transform: 'translate(-50%, -50%)',
      transition: 'left 0.08s, top 0.08s',
      mixBlendMode: 'multiply',
      opacity: 0.85,
    });
    document.body.appendChild(cursor);
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    // 3D effect: z-index behind buttons
    const handlePointerOver = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName === 'BUTTON') {
        cursor.style.zIndex = '0';
      }
    };
    const handlePointerOut = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName === 'BUTTON') {
        cursor.style.zIndex = '9999';
      }
    };
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      document.body.removeChild(cursor);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Letter-by-letter animation effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isQuoteAnimating) {
          setIsQuoteAnimating(true);
          setLetterIndex(0);
          
          const letterInterval = setInterval(() => {
            setLetterIndex(prev => {
              if (prev >= quoteText.length - 1) {
                clearInterval(letterInterval);
                // Restart animation after 5 seconds
                setTimeout(() => {
                  setLetterIndex(0);
                  setIsQuoteAnimating(false);
                }, 5000);
                return prev;
              }
              return prev + 1;
            });
          }, 100); // 100ms per letter
        }
      });
    }, { threshold: 0.3 });

    const quoteSection = document.getElementById('quote-section');
    if (quoteSection) observer.observe(quoteSection);

    return () => observer.disconnect();
  }, [isQuoteAnimating]);

  // Quote animation effect
  useEffect(() => {
    const animateQuote = () => {
      setQuoteVisible(true);
      
      // After 5 seconds, fade out
      setTimeout(() => {
        setQuoteVisible(false);
        
        // After fade out, restart the cycle
        setTimeout(() => {
          animateQuote();
        }, 1000); // 1 second pause before restart
      }, 5000);
    };

    // Start animation after a short delay
    const startTimer = setTimeout(() => {
      animateQuote();
    }, 1000);

    return () => {
      clearTimeout(startTimer);
    };
  }, []);

  // Animated counters effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, [hasAnimated, animateCounters]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        projects: Math.floor(100 * progress),
        clients: Math.floor(50 * progress),
        experience: Math.floor(3 * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({ projects: 100, clients: 50, experience: 3 });
        
        // Repeat animation after 5 seconds
        setTimeout(() => {
          setCounts({ projects: 0, clients: 0, experience: 0 });
          setTimeout(() => {
            animateCounters();
          }, 100); // Small delay before starting next animation
        }, 5000);
      }
    }, stepDuration);
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative font-primary overflow-x-hidden" style={{ background: 'var(--site-bg)' }}>
      {/* Blue hue only on the left lower side, behind hero */}
      <div className="absolute left-[-15vw] top-[45vh] w-[50vw] h-[70vh] bg-[#3388ff44] rounded-full blur-[120px] pointer-events-none" style={{ zIndex: 0 }} />
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-12 pt-8 relative font-primary" style={{ background: 'var(--site-bg)' }}>
        {/* Logo on the left */}
        <div className="flex items-center">
          <Image src="/logo.png.png" alt="Logo" width={64} height={64} style={{ width: 64, height: 64 }} />
        </div>
        
        {/* Center navigation (absolutely centered) */}
        <ul className="flex gap-10 text-lg font-medium px-8 py-2 shadow-[0_8px_32px_0_rgba(0,60,255,0.15)] absolute left-1/2 -translate-x-1/2" style={{ borderRadius: 0, background: 'color-mix(in oklab, var(--site-bg) 80%, #0b1a5e)' }}>
          {['Home', 'Services', 'About Us', 'Blog'].map((item) => (
            <li key={item} className="relative group">
              <a
                className={`px-4 py-1 transition-colors font-semibold cursor-pointer select-none ${selected === item ? 'pixel-nav-selected' : 'text-[#3388ff]'}`}
                style={{ borderRadius: 0 }}
                onClick={() => setSelected(item)}
                href={
                  item === 'Home' ? '#' :
                  item === 'Services' ? '#whatwedo' :
                  item === 'About Us' ? '#pixevatemedia' :
                  item === 'Blog' ? '/blog' :
                  `#${item.replace(/\s+/g, '').toLowerCase()}`
                }
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Right side kept empty for balance; theme toggle removed per request */}
      </nav>
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 w-full mt-20 font-primary" style={{ background: 'transparent' }}>
        <div className="font-secondary italic text-3xl text-[#3388ff] mb-4 mt-8 text-center">
          Your Brand In Perfect Focus
        </div>
        <h1 className={`text-6xl md:text-8xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#003cff] to-[#8bb6ff] bg-clip-text text-transparent transition-all duration-1000 ${
          quoteVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          One Pixel, At a time
        </h1>
        <p className="text-base md:text-lg text-[#b3c6ff] text-center max-w-2xl mb-12">
          We blend 60% human creativity with 40% AI, precision to design brands that<br />
          cut through the noise and speak directly to your audience<br />
          without wasting time, money, or attention.
        </p>
        <button
          className="mt-2 mb-16 px-16 py-3 border-2 border-[#3388ff] text-[#3388ff] text-lg font-semibold bg-transparent hover:bg-[#3388ff] hover:text-white transition-all duration-200"
          style={{ borderRadius: 0 }}
          onClick={() => setIsModalOpen(true)}
        >
          Book a Call
        </button>
        <div className="mt-2 text-2xl font-bold text-[#3388ff]" id="pixevatemedia">
          Pixevate <span className="font-normal text-white">Media</span>
        </div>
      </main>
      {/* Statistics Section */}
      <section id="stats-section" className="w-full flex justify-center items-center py-20 relative font-primary">
        <div className="flex justify-between items-center w-full max-w-5xl px-8 gap-8">
          {/* Projects Completed */}
          <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-br from-[#003cff]/10 to-[#00031f]/50 border border-[#003cff]/20 shadow-[0_8px_32px_rgba(0,60,255,0.1)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,60,255,0.2)]" style={{ borderRadius: 0 }}>
            <div className="text-5xl md:text-6xl font-bold text-[#8bb6ff] mb-4 transition-all duration-500">
              {counts.projects}+
            </div>
            <div className="text-lg font-semibold text-white mb-2">Projects</div>
            <div className="text-sm text-[#c9d6ff] text-center">Completed</div>
          </div>
          
          {/* Happy Clients */}
          <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-br from-[#003cff]/10 to-[#00031f]/50 border border-[#003cff]/20 shadow-[0_8px_32px_rgba(0,60,255,0.1)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,60,255,0.2)]" style={{ borderRadius: 0 }}>
            <div className="text-5xl md:text-6xl font-bold text-[#8bb6ff] mb-4 transition-all duration-500">
              {counts.clients}+
            </div>
            <div className="text-lg font-semibold text-white mb-2">Happy</div>
            <div className="text-sm text-[#c9d6ff] text-center">Clients</div>
          </div>
          
          {/* Experience */}
          <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-br from-[#003cff]/10 to-[#00031f]/50 border border-[#003cff]/20 shadow-[0_8px_32px_rgba(0,60,255,0.1)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,60,255,0.2)]" style={{ borderRadius: 0 }}>
            <div className="text-5xl md:text-6xl font-bold text-[#8bb6ff] mb-4 transition-all duration-500">
              {counts.experience}
            </div>
            <div className="text-lg font-semibold text-white mb-2">Years</div>
            <div className="text-sm text-[#c9d6ff] text-center">Experience</div>
          </div>
        </div>
      </section>
      {/* Trusted By Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 relative overflow-hidden font-primary" style={{ background: 'var(--site-bg)' }}>
        {/* Large background text */}
        <span className="absolute left-0 top-0 w-full text-[7vw] font-extrabold text-[#003cff]/40 select-none pointer-events-none text-center" style={{ zIndex: 0, userSelect: 'none', opacity: 0.4 }}>
          Trusted By
        </span>
        <h2 className="text-5xl md:text-6xl italic font-extrabold text-center text-white mb-24 mt-8 relative z-10 font-secondary" style={{ fontStyle: 'italic', marginTop: '-2rem' }}>
          Trusted By
        </h2>
        
        {/* Logo Carousel Container */}
        <div className="w-full relative z-10 py-8 px-4" style={{ background: 'white' }}>
          {/* First Row - Left to Right */}
          <div className="flex gap-16 mb-8 animate-scroll-left" style={{ animation: 'scrollLeft 25s linear infinite' }}>
            {/* First set of logos */}
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/rodbez.png" alt="RodBez" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/timesnow.png" alt="Times Now Navbharat" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/heroearth.png" alt="Hero Earth" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/mate.png" alt="Mate" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/mabeaute.png" alt="MA BEAUTE" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/myntra.png" alt="Myntra" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/upakarma.png" alt="UPAKARMA & ayurveda co." width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/rodbez.png" alt="RodBez" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/timesnow.png" alt="Times Now Navbharat" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/heroearth.png" alt="Hero Earth" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/mate.png" alt="Mate" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/mabeaute.png" alt="MA BEAUTE" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/myntra.png" alt="Myntra" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/upakarma.png" alt="UPAKARMA & ayurveda co." width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="flex gap-16 animate-scroll-right" style={{ animation: 'scrollRight 25s linear infinite' }}>
            {/* Second set of logos */}
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/naukri.png" alt="Naukri" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/sirona.png" alt="SIRONA" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/meon.png" alt="ME-ON" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/coinswitch.png" alt="CoinSwitch" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/finnovate.png" alt="FINNOVATE" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/rodbez.png" alt="RodBez" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/timesnow.png" alt="Times Now Navbharat" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/naukri.png" alt="Naukri" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/sirona.png" alt="SIRONA" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/meon.png" alt="ME-ON" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/coinswitch.png" alt="CoinSwitch" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/finnovate.png" alt="FINNOVATE" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/rodbez.png" alt="RodBez" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
            <div className="flex items-center justify-center" style={{ minWidth: '200px' }}>
              <Image src="/timesnow.png" alt="Times Now Navbharat" width={200} height={100} style={{ width: 200, height: 100, objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>
      {/* What We Do Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 relative overflow-hidden font-primary" style={{ background: 'var(--site-bg)' }} id="whatwedo">
        {/* Large background text */}
        <span className="absolute left-0 top-0 w-full text-[7vw] font-extrabold text-[#003cff]/40 select-none pointer-events-none text-center" style={{ zIndex: 0, userSelect: 'none', opacity: 0.4 }}>
          What We Do
        </span>
        <h2 className="text-5xl md:text-6xl italic font-extrabold text-center text-white mb-16 mt-8 relative z-10 font-secondary" style={{ fontStyle: 'italic', marginTop: '-2rem' }}>
          What We Do
        </h2>
        
        {/* Three-column services layout */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl relative z-10 mb-16">
          {/* Column 1: Brand Foundation */}
          <div className="flex-1 bg-[#001a4a] border border-[#003cff]/20 p-8 shadow-[0_8px_32px_rgba(0,60,255,0.1)] hover:shadow-[0_12px_40px_rgba(0,60,255,0.2)] transition-all duration-300" style={{ borderRadius: 0 }}>
            {/* Icon */}
            <div className="w-16 h-16 bg-[#003cff] flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(0,60,255,0.3)]" style={{ borderRadius: 0 }}>
              <span className="text-2xl">🎯</span>
            </div>
            
            {/* Headings */}
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Brand Foundation</h3>
            <h4 className="text-xl font-bold text-[#3388ff] uppercase mb-6">Strategy & Positioning</h4>
            
            {/* Services List */}
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#3388ff] rounded-full mr-3"></div>
                <span className="text-white text-sm">BrandStorm Session</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#3388ff] rounded-full mr-3"></div>
                <span className="text-white text-sm">Pixel Positioning™</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#3388ff] rounded-full mr-3"></div>
                <span className="text-white text-sm">AI-aided market fit + voice mapping</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#3388ff] rounded-full mr-3"></div>
                <span className="text-white text-sm">The Founder Mirror</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#3388ff] rounded-full mr-3"></div>
                <span className="text-white text-sm">(Story-driven brand messaging system)</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Visual Excellence */}
          <div className="flex-1 bg-[#001a4a] border border-[#003cff]/20 p-8 shadow-[0_8px_32px_rgba(0,60,255,0.1)] hover:shadow-[0_12px_40px_rgba(0,60,255,0.2)] transition-all duration-300" style={{ borderRadius: 0 }}>
            {/* Icon */}
            <div className="w-16 h-16 bg-[#8b5cf6] flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(139,92,246,0.3)]" style={{ borderRadius: 0 }}>
              <span className="text-2xl">🎨</span>
            </div>
            
            {/* Headings */}
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Visual Excellence</h3>
            <h4 className="text-xl font-bold text-white uppercase mb-6">Design & Identity</h4>
            
            {/* Services List */}
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#a78bfa] rounded-full mr-3"></div>
                <span className="text-white text-sm">Visual DNA Kit</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#a78bfa] rounded-full mr-3"></div>
                <span className="text-white text-sm">SwipeStopper System™</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#a78bfa] rounded-full mr-3"></div>
                <span className="text-white text-sm">BrandOS Build</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Revenue Acceleration */}
          <div className="flex-1 bg-[#001a4a] border border-[#003cff]/20 p-8 shadow-[0_8px_32px_rgba(0,60,255,0.1)] hover:shadow-[0_12px_40px_rgba(0,60,255,0.2)] transition-all duration-300" style={{ borderRadius: 0 }}>
            {/* Icon */}
            <div className="w-16 h-16 bg-[#059669] flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(5,150,105,0.3)]" style={{ borderRadius: 0 }}>
              <span className="text-2xl">📈</span>
            </div>
            
            {/* Headings */}
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Revenue Acceleration</h3>
            <h4 className="text-xl font-bold text-white uppercase mb-6">Marketing & Growth</h4>
            
            {/* Services List */}
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#10b981] rounded-full mr-3"></div>
                <span className="text-white text-sm">OH-HO Marketing</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#10b981] rounded-full mr-3"></div>
                <span className="text-white text-sm">Launch Content Pack</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#10b981] rounded-full mr-3"></div>
                <span className="text-white text-sm">Organic Campaigns</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#10b981] rounded-full mr-3"></div>
                <span className="text-white text-sm">Paid Funnel Starter</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#10b981] rounded-full mr-3"></div>
                <span className="text-white text-sm">Growth Tracker Setup</span>
              </li>
            </ul>
          </div>
        </div>

        {/* AI Integration Section */}
        <div className="w-full max-w-6xl relative z-10">
          {/* Top Banner */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#001a4a] border border-[#003cff] px-6 py-3 rounded-lg flex items-center gap-3 shadow-[0_4px_16px_rgba(0,60,255,0.2)]">
              <span className="text-[#3388ff] text-lg">🧠</span>
              <span className="text-[#3388ff] font-semibold text-sm uppercase tracking-wider">AI-Powered Innovation</span>
              <span className="text-[#3388ff] text-lg">⚡</span>
            </div>
          </div>

          {/* Main Title with Gradient */}
          <div className="text-center mb-6">
            <h3 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-[#3388ff]">AI</span>
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#10b981] bg-clip-text text-transparent"> INTEGRATION</span>
            </h3>
            <p className="text-lg text-[#b3c6ff] max-w-3xl mx-auto">
              Revolutionary artificial intelligence tools that supercharge your creative process and automate your workflow.
            </p>
          </div>

          {/* 2x2 Grid of AI Tools - now flex row: boxes left, image right */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-12">
            {/* Left: Smaller feature boxes in a column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full md:w-2/3 max-w-xl">
              {/* Box 1: Brand-trained GPT */}
              <div className="bg-[#001a4a] border border-[#003cff]/20 p-4 shadow-[0_4px_16px_rgba(0,60,255,0.08)] hover:shadow-[0_8px_24px_rgba(0,60,255,0.15)] transition-all duration-300" style={{ borderRadius: 0, fontSize: '0.95rem' }}>
                <div className="w-10 h-10 bg-[#003cff] flex items-center justify-center mb-3 shadow-[0_2px_8px_rgba(0,60,255,0.2)]" style={{ borderRadius: 0 }}>
                  <span className="text-lg">🧠</span>
                </div>
                <h4 className="text-white font-bold text-base mb-1">Brand-trained GPT</h4>
                <p className="text-[#b3c6ff] text-xs">Custom AI model trained on your brand voice</p>
              </div>
              {/* Box 2: Caption + Headline Generator */}
              <div className="bg-[#001a4a] border border-[#003cff]/20 p-4 shadow-[0_4px_16px_rgba(0,60,255,0.08)] hover:shadow-[0_8px_24px_rgba(0,60,255,0.15)] transition-all duration-300" style={{ borderRadius: 0, fontSize: '0.95rem' }}>
                <div className="w-10 h-10 bg-[#8b5cf6] flex items-center justify-center mb-3 shadow-[0_2px_8px_rgba(139,92,246,0.2)]" style={{ borderRadius: 0 }}>
                  <span className="text-lg">⚡</span>
                </div>
                <h4 className="text-white font-bold text-base mb-1">Caption + Headline Generator</h4>
                <p className="text-[#b3c6ff] text-xs">Instant, on-brand content creation</p>
              </div>
              {/* Box 3: Visual Idea Sketch Tool */}
              <div className="bg-[#001a4a] border border-[#003cff]/20 p-4 shadow-[0_4px_16px_rgba(0,60,255,0.08)] hover:shadow-[0_8px_24px_rgba(0,60,255,0.15)] transition-all duration-300" style={{ borderRadius: 0, fontSize: '0.95rem' }}>
                <div className="w-10 h-10 bg-[#10b981] flex items-center justify-center mb-3 shadow-[0_2px_8px_rgba(16,185,129,0.2)]" style={{ borderRadius: 0 }}>
                  <span className="text-lg">🎨</span>
                </div>
                <h4 className="text-white font-bold text-base mb-1">Visual Idea Sketch Tool</h4>
                <p className="text-[#b3c6ff] text-xs">AI-powered design conceptualization</p>
              </div>
              {/* Box 4: Automation Setup */}
              <div className="bg-[#001a4a] border border-[#003cff]/20 p-4 shadow-[0_4px_16px_rgba(0,60,255,0.08)] hover:shadow-[0_8px_24px_rgba(0,60,255,0.15)] transition-all duration-300" style={{ borderRadius: 0, fontSize: '0.95rem' }}>
                <div className="w-10 h-10 bg-[#f97316] flex items-center justify-center mb-3 shadow-[0_2px_8px_rgba(249,115,22,0.2)]" style={{ borderRadius: 0 }}>
                  <span className="text-lg">🌐</span>
                </div>
                <h4 className="text-white font-bold text-base mb-1">Automation Setup</h4>
                <p className="text-[#b3c6ff] text-xs">Seamless Canva/Notion integrations</p>
              </div>
            </div>
            {/* Right: Greek man image from local storage, larger and shifted right */}
            <div className="hidden md:flex flex-1 items-center justify-end pr-16">
              <Image src="/greek man updated.png" alt="Greek Man" width={520} height={520} style={{ width: 520, height: 520, objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>
      {/* What We Do Different Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 relative overflow-hidden font-primary" style={{ background: 'var(--site-bg)' }}>
        {/* Large background text */}
        <span className="absolute left-0 top-0 w-full text-[7vw] font-extrabold text-[#003cff]/40 select-none pointer-events-none text-center" style={{ zIndex: 0, userSelect: 'none', opacity: 0.4 }}>
          What We do Different?
        </span>
        <h2 className="text-5xl md:text-6xl italic font-extrabold text-center text-white mb-12 mt-8 relative z-10 font-secondary" style={{ fontStyle: 'italic', marginTop: '-2rem' }}>
          What We Do Different?
        </h2>
        {/* Content area */}
        <div className="flex flex-row justify-between items-center w-full max-w-6xl gap-12 relative z-10">
          {/* Left: Text */}
          <div className="flex-1" style={{ color: 'var(--text)' }}>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Branding that makes <span className="font-secondary italic">investors listen</span> and <span className="font-secondary italic">customers stay</span>.
            </h3>
            <p className="text-lg mb-4 text-[#c9d6ff]">
              Pixevate.Media is an AI-powered branding agency that helps visionary businesses craft smart strategies, iconic designs, and scroll-stopping campaigns.
            </p>
            <p className="text-lg text-[#c9d6ff]">
              From brand identity systems to performance-driven visuals, we create brands that don&apos;t just look good—they grow stronger.
            </p>
          </div>
          {/* Right: Chess Image */}
          <div className="flex-shrink-0">
            <Image src="/Chess.png" alt="Chess" width={360} height={360} style={{ width: 360, height: 360, objectFit: 'cover' }} />
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 relative overflow-hidden font-primary" style={{ background: 'var(--site-bg)' }}>
        {/* Large background text */}
        <span className="absolute left-0 top-0 w-full text-[7vw] font-extrabold text-[#003cff]/40 select-none pointer-events-none text-center" style={{ zIndex: 0, userSelect: 'none', opacity: 0.4 }}>
          Testimonials
        </span>
        {/* Section heading */}
        <h2 className="text-5xl md:text-6xl italic font-extrabold text-center text-white mb-12 mt-8 relative z-10 font-secondary" style={{ fontStyle: 'italic', marginTop: '-2rem' }}>
          Testimonials
        </h2>
        {/* Modern testimonial cards with continuous scroll */}
        <div className="w-full overflow-hidden relative">
          <div className="flex gap-12 animate-scroll" style={{ animation: 'scroll 30s linear infinite' }}>
            {[
              {
                review: "When I was launching my personal brand through YouTube and the Awakening Code podcast, Pixevate.Media brought structure and vision. They didn’t just design thumbnails or visuals — they built an identity that truly reflected my voice. It felt like I had a partner who understood my journey, not just an agency.",
                name: "Vishal Gondal",
                role: "CEO, GOQii",
                avatar: "👨‍💼"
              },
              {
                review: "We worked with Pixevate.Media on YouTube branding, and the impact was clear. Their creative direction helped our content stand out in a crowded space. From thumbnails to overall channel design, everything felt sharper and more aligned with our brand voice. It’s rare to find a team that understands performance and aesthetics so well.",
                name: "Naukri.com",
                role: "",
                avatar: "🏢"
              },
              {
                review: "Pixevate.Media designed our website from the ground up, and the result exceeded expectations. They managed to balance beauty and functionality — the site feels premium yet easy to navigate. Most importantly, it reflects Meon’s brand perfectly. Customers have noticed, and so have we.",
                name: "Meon Cosmetics",
                role: "",
                avatar: "💄"
              },
              {
                review: "We needed a top-of-funnel brand video that simplified our offering while making it engaging. Pixevate.Media cracked the code. They turned complex messaging into something clear, creative, and high-energy. The video has become a key asset in explaining Sharpely’s value — both to users and investors.",
                name: "Sharpely (Pranav Nanekar)",
                role: "",
                avatar: "🎬"
              },
              {
                review: "When we wanted to elevate Maate’s YouTube branding and Instagram master page, Pixevate.Media stepped in with fresh thinking. They created visuals that were not just beautiful but also scalable for our content calendar. Their work gave our channels a consistent, premium look that strengthened our digital presence.",
                name: "Priyanka Raina",
                role: "Founder & CEO, Maate",
                avatar: "👩‍💼"
              },
              {
                review: "For our podcast project, Pixevate.Media handled the branding and creative execution end-to-end. From cover art to episode visuals, everything looked professional and consistent. They captured the essence of our finance-first identity without making it dull — something our team and audience both appreciated.",
                name: "One Finance (Podcast Project)",
                role: "",
                avatar: "🎧"
              },
              {
                review: "We collaborated with Pixevate.Media for campaign thumbnails and seasonal visuals. The results were fantastic — designs that grabbed attention and improved click-through rates. Their speed and creativity made a real difference during high-pressure sale periods.",
                name: "Myntra (E-commerce Visuals)",
                role: "",
                avatar: "🛍️"
              }
            ].map((testimonial, index) => (
              <div key={index} className="w-80 h-96 border border-[#003cff]/20 shadow-[0_16px_48px_rgba(0,60,255,0.2),0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col p-5 relative transform hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,60,255,0.3),0_12px_36px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300" style={{ borderRadius: 0, minWidth: '320px', background: `linear-gradient(135deg, #003cff22 0%, #8b5cf622 50%, #10b98122 100%)` }}>
                {/* 3D depth effect with pseudo-element */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#003cff]/5 to-transparent" style={{ borderRadius: 0 }}></div>
                
                {/* Quote icon */}
                <div className="text-xl mb-3 text-[#3388ff]">💬</div>
                
                {/* Review text */}
                <p className="text-white text-sm leading-relaxed mb-2 flex-1 relative z-10">
                  "{testimonial.review}"
                </p>
                
                {/* Client info */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-[#b3c6ff] text-xs">{testimonial.role}</div>
                  </div>
                  <div className="w-10 h-10 bg-[#003cff] flex items-center justify-center text-lg shadow-[0_6px_16px_rgba(0,60,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]" style={{ borderRadius: 0 }}>
                    {testimonial.avatar}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our Philosophy Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 relative overflow-hidden font-primary" style={{ background: 'var(--site-bg)' }}>
        {/* Large background text */}
        <span className="absolute left-0 top-0 w-full text-[7vw] font-extrabold text-[#003cff]/40 select-none pointer-events-none text-center" style={{ zIndex: 0, userSelect: 'none', opacity: 0.4 }}>
          Our Philosophy
        </span>
        {/* Section heading */}
        <h2 className="text-5xl md:text-6xl italic font-extrabold text-center text-white mb-12 mt-8 relative z-10 font-secondary" style={{ fontStyle: 'italic', marginTop: '-2rem' }}>
          Our Philosophy
        </h2>
        {/* Content area */}
        <div className="flex flex-row justify-between items-center w-full max-w-6xl gap-12 relative z-10">
          {/* Left: Thumbs up Man Image */}
          <div className="flex-shrink-0" style={{ marginLeft: '-120px' }}>
            <Image src="/thumbs up man.png" alt="Thumbs Up Man" width={600} height={600} style={{ width: 600, height: 600, objectFit: 'contain' }} />
          </div>
          {/* Right: Text */}
          <div className="flex-1 text-white">
            <h3 className="text-5xl md:text-6xl font-bold mb-4">
              Branding that<br />drives revenue.
            </h3>
            <p className="text-lg text-[#b3c6ff] mt-4 text-right">
              -Pixevate Media
            </p>
          </div>
        </div>
      </section>
      {/* CTA + Footer Section */}
      <section id="quote-section" className="w-full flex flex-col items-center justify-center pt-32 pb-0 relative overflow-hidden font-primary" style={{ background: 'var(--site-bg)' }}>
        {/* Enhanced spotlight gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] bg-[radial-gradient(circle_at_center,_rgba(0,60,255,0.08)_0%,_rgba(0,3,31,0.02)_60%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Letter-by-letter animated quote */}
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8" style={{ color: 'var(--text)' }}>
            <div className="flex flex-wrap justify-center items-center">
              {quoteText.split('').map((letter, index) => (
                <span
                  key={index}
                  className={`transition-all duration-500 ${
                    index <= letterIndex
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    color: letter === ' ' ? 'transparent' : 'inherit',
                    marginRight: letter === ' ' ? '1.5rem' : '0.1rem'
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-[#c9d6ff] max-w-4xl leading-relaxed">
            Let&apos;s turn your pixels into powerful brands. <a className="text-[#c9d6ff] hover:text-[#3388ff] transition-colors" href="#">Book your free discovery call</a> and
            take the first step to build something extraordinary.
          </p>
          <button 
            className="mt-12 mb-16 px-12 py-4 bg-gradient-to-r from-[#1740ff] to-[#003cff] text-white text-lg font-bold shadow-[0_8px_32px_rgba(0,60,255,0.35)] hover:shadow-[0_12px_48px_rgba(0,60,255,0.5)] transition-all duration-300 transform hover:scale-105" 
            style={{ borderRadius: 0 }}
            onClick={() => setIsModalOpen(true)}
          >
            Book a Discovery Call
          </button>
        </div>
        
        {/* Modern footer with enhanced styling */}
        <div className="w-full relative">
          {/* Gradient divider */}
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#1740ff] to-transparent my-20" />
          
          {/* Footer content with modern layout */}
          <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start pb-24">
            {/* Left: Logo with enhanced styling */}
            <div className="flex items-start">
              <div className="relative">
                <Image src="/logo.png.png" alt="Logo" width={220} height={220} style={{ width: 220, height: 220 }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#003cff]/20 to-transparent rounded-lg" />
              </div>
            </div>
            
            {/* Middle: Navigation and About with modern styling */}
            <div className="flex flex-col space-y-8">
              <div className="flex gap-8 text-lg">
                <a className="text-white hover:text-[#3388ff] transition-colors duration-300 font-medium" href="#">Home</a>
                <a className="text-[#c9d6ff] hover:text-[#3388ff] transition-colors duration-300 font-medium" href="#whatwedo">Services</a>
                <a className="text-[#c9d6ff] hover:text-[#3388ff] transition-colors duration-300 font-medium" href="#pixevatemedia">About Us</a>
                <Link className="text-[#c9d6ff] hover:text-[#3388ff] transition-colors duration-300 font-medium" href="/blog">Blog</Link>
              </div>
              <div className="space-y-4">
                <div className="text-xl font-bold text-white mb-3">About Us</div>
                <p className="text-[#c9d6ff] leading-relaxed max-w-md text-sm">
                  Pixevate.Media builds smarter, AI-powered brands that drive clarity, trust, and growth turning pixels into powerful business results.
                </p>
              </div>
            </div>
            
            {/* Right: Contact and Social */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="space-y-4">
                  <div className="text-xl font-bold text-white">Get In Touch</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#003cff] flex items-center justify-center rounded">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                </div>
                      <div className="text-[#c9d6ff] text-sm hover:text-[#3388ff] transition-colors cursor-pointer">pixevatemedia@gmail.com</div>
              </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#25D366] flex items-center justify-center rounded">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </div>
                      <div className="text-[#c9d6ff] text-sm">+91 99712 65806</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-xl font-bold text-white">Follow Us</div>
                  <div className="flex gap-4">
                    <a href="https://www.linkedin.com/company/pixevate-media/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#003cff]/20 border border-[#003cff]/30 flex items-center justify-center rounded hover:bg-[#003cff]/30 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#8bb6ff">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/pixevate.media?igsh=MWR0bzNpZnRqcDFlbQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#003cff]/20 border border-[#003cff]/30 flex items-center justify-center rounded hover:bg-[#003cff]/30 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#8bb6ff">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced copyright bar */}
          <div className="w-full bg-gradient-to-r from-[#1740ff] via-[#003cff] to-[#1740ff] text-white text-center py-4 text-sm font-medium">
            © 2025 Pixevate.Media — All Rights Reserved.
          </div>
        </div>
      </section>
      {/* WhatsApp Chat Button - pill style, always visible, lower right */}
      <a
        href="https://wa.me/919971265806"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          background: '#25D366',
          color: 'white',
          borderRadius: '9999px',
          boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
          padding: '0 20px 0 16px',
          height: '48px',
          fontWeight: 600,
          fontSize: '1rem',
          textDecoration: 'none',
          opacity: 0.95,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
          <path d="M16 7C11.03 7 7 11.03 7 16c0 1.4.36 2.77 1.04 3.98L7 25l5.18-1.97C13.19 23.68 14.57 24 16 24c4.97 0 9-4.03 9-9s-4.03-8-9-8zm0 15c-1.29 0-2.56-.34-3.66-.99l-.26-.15-3.08 1.17 1.16-3.01-.17-.27C9.34 18.56 9 17.29 9 16c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7zm4.13-5.47c-.22-.11-1.3-.64-1.5-.71-.2-.07-.34-.11-.48.11-.14.22-.55.71-.67.85-.12.14-.25.16-.47.05-.22-.11-.92-.34-1.75-1.09-.65-.58-1.09-1.29-1.22-1.51-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.14-.22.22-.36.07-.14.04-.27-.02-.39-.07-.11-.48-1.16-.66-1.59-.17-.41-.34-.35-.48-.36-.12-.01-.27-.01-.41-.01-.14 0-.36.05-.55.27-.19.22-.75.73-.75 1.77 0 1.04.76 2.05.87 2.19.11.14 1.5 2.39 3.65 3.26.51.22.91.35 1.22.45.51.16.97.14 1.34.09.41-.06 1.29-.52 1.47-1.02.18-.5.18-.93.13-1.02-.05-.09-.2-.15-.42-.26z" fill="#fff"/>
        </svg>
        Chat on WhatsApp
      </a>
      
      {/* Book Call Modal */}
      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
