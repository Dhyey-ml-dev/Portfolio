import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ logo }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="navbar"
      style={{ borderBottomColor: scrolled ? 'rgba(255,255,255,0.08)' : 'transparent' }}
    >
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/home" className="navbar__logo">
          <span className="navbar__logo-dot" />
          DS TECHVIBE
        </Link>

        {/* Links */}
        <nav>
          <ul className="navbar__links">
            {[
              { label: 'Portfolio', href: '#projects' },
              { label: 'Services', href: '#services' },
              { label: 'About', href: '#why' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="navbar__link">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <motion.a
          href="#contact"
          className="btn btn-ghost navbar__cta"
          style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Hire me
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Navbar;
