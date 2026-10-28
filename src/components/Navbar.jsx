import { useEffect, useState } from 'react';
import { company, navLinks } from '../data.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#top" className="brand" aria-label={company.name}>
          <img src="/img/logo.png" alt="" className="brand-logo" width="182" height="156" />
          <span className="brand-name">
            {company.short}
            <small>{company.tagline}</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-label="Buka menu"
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
        <nav id="navLinks" className={`nav-links ${open ? 'open' : ''}`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a href="#kontak" className="btn btn-primary" onClick={close}>
            Hubungi Kami
          </a>
        </nav>
      </div>
    </header>
  );
}
