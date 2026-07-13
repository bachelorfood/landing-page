/**
 * Bachelor Food — Main App
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, ReactNode } from 'react';
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

    // Wire Lenis into GSAP's ticker so ScrollTrigger stays in sync
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Sync scroll triggers
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  // Smooth scroll to element if hash is present in URL on home path
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

export default function App() {
  return (
    <Router>
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
