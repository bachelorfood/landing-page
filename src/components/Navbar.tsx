import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

/* ── Bachelor Food inline SVG logo (matches the B+cloche brand) ── */
function BFLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="13" fill="#F4601A"/>
      {/* Letter B body */}
      <path d="M15 13H36C42.627 13 48 18.373 48 25C48 28.314 46.657 31.314 44.485 33.5C46.657 35.686 48 38.686 48 42C48 48.627 42.627 54 36 54H15V13Z" fill="white"/>
      {/* B inner cutouts */}
      <rect x="22" y="20" width="16" height="12" rx="6" fill="#F4601A"/>
      <rect x="22" y="34" width="17" height="13" rx="6.5" fill="#F4601A"/>
      {/* Cloche icon integrated into B */}
      <ellipse cx="33" cy="40.5" rx="7.5" ry="2" fill="white"/>
      <path d="M25.5 40.5 C25.5 35.5 29 32 33 32 C37 32 40.5 35.5 40.5 40.5" fill="white"/>
      <circle cx="33" cy="31.5" r="1.5" fill="#F4601A"/>
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Home',          href: '/' },
  { label: 'Menu',          href: '#menu' },
  { label: 'Our Chefs',     href: '/chefs' },
  { label: 'How It Works',  href: '#how-it-works' },
  { label: 'Community',     href: '/community' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [rippleCoords, setRippleCoords] = useState({ x: 0, y: 0 });
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = '';
      (window as any).lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      (window as any).lenis?.start();
    };
  }, [mobileOpen]);

  const scrollTo = (href: string, e: React.MouseEvent) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const el = document.querySelector(href);
      if (el) {
        (window as any).lenis?.scrollTo(el, { duration: 1.2 });
      }
    }
    setMobileOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Get logo position for ripple origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    setRippleCoords({ x, y });
    setRippleActive(true);

    // Spring bounce animation on the logo itself using GSAP
    gsap.fromTo(e.currentTarget.querySelector('.logo-wrap'),
      { scale: 0.95, rotate: -4 },
      { scale: 1.25, rotate: 4, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }
    );

    e.preventDefault();

    // Trigger full screen visual wipe
    setTimeout(() => {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'instant' });
      (window as any).lenis?.scrollTo(0, { immediate: true });
    }, 450);

    setTimeout(() => {
      setRippleActive(false);
    }, 1000);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/96 backdrop-blur-xl shadow-sm border-b border-bf-border-light py-3'
            : 'bg-white/80 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
            <div className="logo-wrap transition-transform duration-300">
              <BFLogo size={40} />
            </div>
            <div className="leading-none text-left">
              <span className="block font-serif text-xl font-bold text-bf-ink leading-none tracking-tight">
                Bachelor Food
              </span>
              <span className="block text-[10px] font-semibold text-bf-muted tracking-[0.15em] uppercase leading-none mt-1">
                Home Kitchen
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center lg:gap-4 xl:gap-7">
            {NAV_LINKS.map(link => (
              link.href.startsWith('#') ? (
                <a key={link.label} href={link.href} onClick={(e) => scrollTo(link.href, e)} className="nav-link">{link.label}</a>
              ) : (
                <Link key={link.label} to={link.href} className="nav-link">{link.label}</Link>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center lg:gap-2 xl:gap-3">
            <a href="#menu" className="btn btn-outline btn-sm" onClick={(e) => scrollTo('#menu', e)}>Order Now</a>
            <a href="#download" className="btn btn-primary btn-sm" onClick={(e) => scrollTo('#download', e)}>
              Get the App
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden w-10 h-10 rounded-2xl bg-bf-surface border border-bf-border flex items-center justify-center text-bf-ink hover:border-bf-orange transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={18} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={18} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 overflow-y-auto pb-10"
          >
            {/* Decorative top strip */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #F4601A, #E8A020)' }} />

            <div className="px-6 py-6 flex-1 flex flex-col">
              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {link.href.startsWith('#') ? (
                      <a href={link.href} onClick={(e) => scrollTo(link.href, e)}
                        className="block py-4 text-2xl font-serif font-bold text-bf-ink border-b border-bf-border-light hover:text-bf-orange transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} onClick={() => setMobileOpen(false)}
                        className="block py-4 text-2xl font-serif font-bold text-bf-ink border-b border-bf-border-light hover:text-bf-orange transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col gap-3"
              >
                <a href="#download" className="btn btn-primary btn-lg justify-center" onClick={() => setMobileOpen(false)}>
                  Download Bachelor Food — Free
                </a>
                <a href="#menu" className="btn btn-outline btn-lg justify-center" onClick={() => setMobileOpen(false)}>
                  Browse Menu
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Brand Page Transition Wipe Ripple ── */}
      <AnimatePresence>
        {rippleActive && (
          <motion.div
            initial={{ 
              clipPath: `circle(0px at ${rippleCoords.x}px ${rippleCoords.y}px)` 
            }}
            animate={{ 
              clipPath: `circle(150% at ${rippleCoords.x}px ${rippleCoords.y}px)` 
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.4, ease: 'easeInOut' }
            }}
            transition={{ 
              duration: 0.55, 
              ease: [0.76, 0, 0.24, 1] 
            }}
            className="fixed inset-0 bg-bf-orange z-[9999] pointer-events-none flex items-center justify-center"
          >
            {/* Pulsing White Logo in the center of the screen during wipe */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 1.3, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center gap-4 text-white"
            >
              <svg width="84" height="84" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-lg">
                <rect width="64" height="64" rx="13" fill="white"/>
                <path d="M15 13H36C42.627 13 48 18.373 48 25C48 28.314 46.657 31.314 44.485 33.5C46.657 35.686 48 38.686 48 42C48 48.627 42.627 54 36 54H15V13Z" fill="#F4601A"/>
                <rect x="22" y="20" width="16" height="12" rx="6" fill="white"/>
                <rect x="22" y="34" width="17" height="13" rx="6.5" fill="white"/>
                <ellipse cx="33" cy="40.5" rx="7.5" ry="2" fill="#F4601A"/>
                <path d="M25.5 40.5 C25.5 35.5 29 32 33 32 C37 32 40.5 35.5 40.5 40.5" fill="#F4601A"/>
                <circle cx="33" cy="31.5" r="1.5" fill="white"/>
              </svg>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight">Bachelor Food</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
