'use client';
import React, { useState } from 'react';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    goal: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xgvlbwbd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          goal: formData.goal,
          message: formData.message,
          _subject: 'New Lead - Book a Call Request from Pixevate.Media',
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({ name: '', email: '', company: '', phone: '', goal: '', message: '' });
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error submitting your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#001a4a] border border-[#003cff]/30 rounded-lg shadow-[0_20px_60px_rgba(0,60,255,0.3)] max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8bb6ff] hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className="p-5 border-b border-[#003cff]/20">
          <h2 className="text-xl font-bold text-white mb-1">Book a Discovery Call</h2>
          <p className="text-[#8bb6ff] text-xs">Let&apos;s discuss how we can elevate your brand</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-xs font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#00031f] border border-[#003cff]/30 text-white px-3 py-2 text-sm rounded focus:border-[#003cff] focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-white text-xs font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#00031f] border border-[#003cff]/30 text-white px-3 py-2 text-sm rounded focus:border-[#003cff] focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-xs font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-[#00031f] border border-[#003cff]/30 text-white px-3 py-2 text-sm rounded focus:border-[#003cff] focus:outline-none transition-colors"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-white text-xs font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#00031f] border border-[#003cff]/30 text-white px-3 py-2 text-sm rounded focus:border-[#003cff] focus:outline-none transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-xs font-medium mb-1">What&apos;s your main goal? *</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
              className="w-full bg-[#00031f] border border-[#003cff]/30 text-white px-3 py-2 text-sm rounded focus:border-[#003cff] focus:outline-none transition-colors"
            >
              <option value="">Select your goal</option>
              <option value="Brand Strategy">Brand Strategy & Positioning</option>
              <option value="Visual Design">Visual Design & Identity</option>
              <option value="Marketing Campaigns">Marketing Campaigns</option>
              <option value="Website Design">Website Design</option>
              <option value="Complete Rebrand">Complete Rebrand</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-xs font-medium mb-1">Additional Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={2}
              className="w-full bg-[#00031f] border border-[#003cff]/30 text-white px-3 py-2 text-sm rounded focus:border-[#003cff] focus:outline-none transition-colors resize-none"
              placeholder="Tell us more about your project..."
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="w-full bg-gradient-to-r from-[#1740ff] to-[#003cff] text-white font-bold py-2.5 px-6 rounded shadow-[0_8px_32px_rgba(0,60,255,0.35)] hover:shadow-[0_12px_48px_rgba(0,60,255,0.5)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
          >
            {isSubmitting ? 'Sending...' : isSubmitted ? '✓ Request Sent!' : 'Send Request'}
          </button>

          {isSubmitted && (
            <p className="text-[#10b981] text-xs text-center">
              Thank you! We&apos;ll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
