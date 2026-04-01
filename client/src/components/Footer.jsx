import React from 'react';

const Footer = () => (
  <footer className="border-t border-white/5 py-8 mt-16">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text/60">
      <div>
        © {new Date().getFullYear()} Dhyey Pavagadhi Collective. All rights reserved.
      </div>
      <div className="flex gap-4">
        <a href="mailto:hello@example.com" className="hover:text-white">Email</a>
        <a href="https://wa.me/1234567890" className="hover:text-white">WhatsApp</a>
        <a href="https://www.linkedin.com" className="hover:text-white">LinkedIn</a>
      </div>
    </div>
  </footer>
);

export default Footer;
