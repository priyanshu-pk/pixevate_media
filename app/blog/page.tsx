'use client';
import React from 'react';
import Image from 'next/image';

export default function BlogPage() {
  return (
    <div className="min-h-screen w-full font-primary" style={{ background: 'var(--site-bg)' }}>
      {/* Navbar (consistent with home, without theme toggle) */}
      <nav className="w-full flex items-center justify-between px-12 pt-8 relative font-primary" style={{ background: 'var(--site-bg)' }}>
        <div className="flex items-center">
          <Image src="/logo.png.png" alt="Logo" width={56} height={56} style={{ width: 56, height: 56 }} />
        </div>
        <ul className="flex gap-10 text-lg font-medium px-8 py-2 shadow-[0_8px_32px_0_rgba(0,60,255,0.15)]" style={{ borderRadius: 0, background: 'color-mix(in oklab, var(--site-bg) 80%, #0b1a5e)' }}>
          <li className="relative group">
            <a className="px-4 py-1 transition-colors font-semibold text-[#3388ff]" style={{ borderRadius: 0 }} href="/">Home</a>
          </li>
          <li className="relative group">
            <a className="px-4 py-1 transition-colors font-semibold text-[#3388ff]" style={{ borderRadius: 0 }} href="/#whatwedo">Services</a>
          </li>
          <li className="relative group">
            <a className="px-4 py-1 transition-colors font-semibold text-[#3388ff]" style={{ borderRadius: 0 }} href="/#pixevatemedia">About Us</a>
          </li>
          <li className="relative group">
            <a className="px-4 py-1 transition-colors font-semibold pixel-nav-selected" style={{ borderRadius: 0 }} href="/blog">Blog</a>
          </li>
        </ul>
        <div style={{ width: 40, height: 40 }} />
      </nav>
      {/* Hero Image with overlay title */}
      <section className="w-full relative overflow-hidden">
        <div className="w-full max-w-5xl mx-auto px-6 py-10 md:py-16">
          <div className="relative w-full h-[50vh] md:h-[70vh] shadow-[0_16px_48px_rgba(0,60,255,0.18)] border border-[#003cff]/20 bg-black/40" style={{ borderRadius: 0 }}>
            <Image src="/mona-blog.jpg" alt="Good brands get noticed" fill priority sizes="100vw" style={{ objectFit: 'contain' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {/* Overlay title removed as same line exists in the image */}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full">
        <div className="max-w-4xl mx-auto px-6 pb-24">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8bb6ff] bg-[#001a4a] border border-[#003cff]/30 px-3 py-1 mb-6" style={{ borderRadius: 0 }}>
            <span>Insights</span>
            <span className="opacity-60">•</span>
            <span>Pixevate.Media</span>
          </div>

          <article className="prose prose-invert max-w-none">
            <p className="text-[#c9d6ff] text-lg leading-relaxed">
              In today's market, speed and strategy define success. Businesses don't just need design; they need clarity, precision, and impact, delivered faster than ever.
            </p>
            <p className="text-[#c9d6ff] text-lg leading-relaxed mt-4">
              At Pixevate.Media, we've been studying the shift: attention spans are shrinking, competition is multiplying, and AI is reshaping the way brands connect with their audience. The brands that adapt quickly are the ones that dominate, because in this new era, being good isn't enough; you have to be unforgettable.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">Here's what we've learned from the latest trends:</h2>

            <ul className="space-y-4">
              <li className="bg-[#001a4a] border border-[#003cff]/20 p-4" style={{ borderRadius: 0 }}>
                <span className="text-white font-semibold">AI-powered positioning:</span>{' '}
                <span className="text-[#c9d6ff]">Smart tools help us map markets, refine messaging, and find your perfect audience in less time.</span>
              </li>
              <li className="bg-[#001a4a] border border-[#003cff]/20 p-4" style={{ borderRadius: 0 }}>
                <span className="text-white font-semibold">Design for attention:</span>{' '}
                <span className="text-[#c9d6ff]">Scroll-stopping visuals and strategic storytelling aren't optional anymore; they're your first impression.</span>
              </li>
              <li className="bg-[#001a4a] border border-[#003cff]/20 p-4" style={{ borderRadius: 0 }}>
                <span className="text-white font-semibold">Faster to market:</span>{' '}
                <span className="text-[#c9d6ff]">Rapid testing and iteration mean your brand evolves with the pace of the market, not behind it.</span>
              </li>
              <li className="bg-[#001a4a] border border-[#003cff]/20 p-4" style={{ borderRadius: 0 }}>
                <span className="text-white font-semibold">Value-driven branding:</span>{' '}
                <span className="text-[#c9d6ff]">High-ticket clients invest where they see strategy, clarity, and a promise of ROI, not noise.</span>
              </li>
            </ul>

            <p className="text-[#c9d6ff] text-lg leading-relaxed mt-8">
              Whether you're a founder looking to launch or an established business aiming to scale, you don't need more time or more money — you need smarter moves. At Pixevate.Media, that's what we do: turn pixels into power moves, building brands that investors listen to and customers remember.
            </p>
          </article>

          {/* Extras typical for blog pages */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#001a4a] border border-[#003cff]/20 p-5" style={{ borderRadius: 0 }}>
              <div className="text-xs text-[#8bb6ff] uppercase tracking-wider">Category</div>
              <div className="text-white font-semibold mt-1">Brand Strategy</div>
            </div>
            <div className="bg-[#001a4a] border border-[#003cff]/20 p-5" style={{ borderRadius: 0 }}>
              <div className="text-xs text-[#8bb6ff] uppercase tracking-wider">Reading Time</div>
              <div className="text-white font-semibold mt-1">4 min</div>
            </div>
            <div className="bg-[#001a4a] border border-[#003cff]/20 p-5" style={{ borderRadius: 0 }}>
              <div className="text-xs text-[#8bb6ff] uppercase tracking-wider">Share</div>
              <div className="flex gap-3 mt-2 text-[#c9d6ff]">
                <a href="#" className="hover:text-[#3388ff]">LinkedIn</a>
                <a href="#" className="hover:text-[#3388ff]">Twitter</a>
                <a href="#" className="hover:text-[#3388ff]">Copy Link</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Blogs Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 relative overflow-hidden font-primary" style={{ background: 'var(--site-bg)' }}>
        <div className="w-full max-w-6xl px-6">
          <h3 className="text-4xl font-extrabold text-white mb-10">More from Pixevate</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { slug: 'design-that-sells', title: 'Design That Sells: Crafting Scroll-Stopping Creatives', desc: 'How to combine brand voice with performance visuals for higher CTRs.', tag: 'Design' },
              { slug: 'ai-x-branding', title: 'AI x Branding: Position Faster, Communicate Smarter', desc: 'A practical workflow to map markets and sharpen brand messaging with AI.', tag: 'AI' },
              { slug: 'ten-day-brand-sprint', title: 'Launch Faster: A 10-Day Brand Sprint', desc: 'What we include in a rapid go-to-market pack for founders.', tag: 'Go-To-Market' },
              { slug: 'content-funnels', title: 'From Awareness to ROI: Building Content Funnels', desc: 'Turn content into a performance engine across channels.', tag: 'Growth' },
              { slug: 'visual-dna', title: 'Visual DNA: Make Your Brand Instantly Recognizable', desc: 'Systems that keep every asset consistent and premium.', tag: 'Identity' },
              { slug: 'pitch-ready-branding', title: 'Pitch-Ready Branding For Investors', desc: 'What investors look for in brand clarity and narrative.', tag: 'Strategy' }
            ].map((post, i) => (
              <div key={i} className="bg-[#001a4a] border border-[#003cff]/20 p-6 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,60,255,0.08)] hover:shadow-[0_12px_40px_rgba(0,60,255,0.18)] transition-all duration-300" style={{ borderRadius: 0 }}>
                <div>
                  <div className="text-xs text-[#8bb6ff] uppercase tracking-wider mb-3">{post.tag}</div>
                  <h4 className="text-white font-bold text-xl mb-2">{post.title}</h4>
                  <p className="text-[#c9d6ff] text-sm">{post.desc}</p>
                </div>
                <div className="mt-6">
                  <a href={`/blog/${post.slug}`} className="text-[#3388ff] font-semibold">Read more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


