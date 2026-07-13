/**
 * Bachelor Food — Main App
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import RecipeShowcase from './components/RecipeShowcase';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import RecipeDetailPage from './components/RecipeDetailPage';
import OurChefsPage from './components/OurChefsPage';
import CommunityPage from './components/CommunityPage';
import TermsPage from './components/TermsPage';

gsap.registerPlugin(ScrollTrigger);

/* ── Lenis smooth scroll — properly wired to GSAP ticker ── */
function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  useEffect(() => {
    if (pathname === '/' && hash) {
      const el = document.querySelector(hash);
      if (el) {
        const timer = setTimeout(() => {
          (window as any).lenis?.scrollTo(el, { duration: 1.2 });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, hash]);

  return <>{children}</>;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      (window as any).lenis?.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);
  return null;
}

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  exit:    { opacity: 0,        transition: { duration: 0.25 } },
};

function Page({ children }: { children: ReactNode }) {
  return <motion.div variants={fade} initial="initial" animate="animate" exit="exit">{children}</motion.div>;
}

function LandingPage() {
  return (
    <Page>
      <Hero />
      <Features />
      <RecipeShowcase />
      <Testimonials />
      <CTA />
    </Page>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="flex flex-col flex-1">
        <Routes location={location}>
          <Route path="/"           element={<LandingPage />} />
          <Route path="/recipe/:id" element={<Page><RecipeDetailPage /></Page>} />
          <Route path="/chefs"      element={<Page><OurChefsPage /></Page>} />
          <Route path="/community"  element={<Page><CommunityPage /></Page>} />
          <Route path="/terms"      element={<Page><TermsPage /></Page>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Interactive Circular Wipe Splash Screen Loader ── */
function SplashLoader() {
  return (
    <motion.div
      initial={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ 
        clipPath: 'circle(0% at 50% 50%)',
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 bg-bf-orange z-[99999] flex flex-col items-center justify-center text-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-5"
      >
        {/* Pulsing White Logo */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="filter drop-shadow-xl"
        >
          <svg width="96" height="96" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="13" fill="white"/>
            <path d="M15 13H36C42.627 13 48 18.373 48 25C48 28.314 46.657 31.314 44.485 33.5C46.657 35.686 48 38.686 48 42C48 48.627 42.627 54 36 54H15V13Z" fill="#F4601A"/>
            <rect x="22" y="20" width="16" height="12" rx="6" fill="white"/>
            <rect x="22" y="34" width="17" height="13" rx="6.5" fill="white"/>
            <ellipse cx="33" cy="40.5" rx="7.5" ry="2" fill="#F4601A"/>
            <path d="M25.5 40.5 C25.5 35.5 29 32 33 32 C37 32 40.5 35.5 40.5 40.5" fill="#F4601A"/>
            <circle cx="33" cy="31.5" r="1.5" fill="white"/>
          </svg>
        </motion.div>

        <div className="text-center">
          <h1 className="font-serif text-4xl font-extrabold tracking-tight mb-2">Bachelor Food</h1>
          <p className="text-white/75 text-xs font-bold uppercase tracking-widest">India's #1 Home Kitchen Platform</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keep splash open for a moment to let the initial page render fully under it
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {loading && <SplashLoader />}
      </AnimatePresence>
      <SmoothScrollProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-bf-cream">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </Router>
  );
}
