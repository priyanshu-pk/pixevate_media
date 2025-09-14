'use client';
import React from 'react';
import Image from 'next/image';

export default function BlogFallback() {
  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--site-bg)' }}>
      {/* Navbar consistent with blog/home */}
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

      <div className="w-full flex items-center justify-center flex-col py-24">
        <Image src="/logo.png.png" alt="Pixevate Media" width={200} height={200} style={{ width: 200, height: 200 }} />
        <div className="mt-6 text-white text-2xl font-bold">Error 404 — page not found</div>
      </div>
    </div>
  );
}


