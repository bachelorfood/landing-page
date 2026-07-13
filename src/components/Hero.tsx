import { useRef, useEffect } from 'react';
import { Star, Zap, Clock, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { val: '50K+', label: 'Happy Families',  Icon: Star },
  { val: '2,800',label: 'Home Chefs',      Icon: ShieldCheck },
  { val: '35min',label: 'Avg. Delivery',   Icon: Clock },
  { val: '24',   label: 'Cities Served',   Icon: MapPin },
];

const TRUST = ['FSSAI Certified', 'No Hidden Fees', 'Live Tracking', 'Fresh Daily', 'Custom Meals'];

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const trustRef    = useRef<HTMLDivElement>(null);
  const card1Ref    = useRef<HTMLDivElement>(null);
  const card3Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      // ── Entrance timeline ──
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animate headline words in a beautiful stagger sequence
      tl.fromTo(headlineRef.current?.querySelectorAll('.headline-word'), 
        { y: '110%', opacity: 0 }, 
        { y: '0%', opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power4.out' }, 
        0.1
      )
      // Tagline entrance with smooth blur
      .fromTo(taglineRef.current,    
        { y: 30, opacity: 0, filter: 'blur(6px)' }, 
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 }, 
        0.45
      )
      // CTA buttons staggered entry
      .fromTo(ctaRef.current?.querySelectorAll('a'),        
        { y: 24, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.3)' }, 
        0.6
      )
      // Trust chips springy stagger
      .fromTo(trustRef.current?.querySelectorAll('.trust-chip'),      
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'back.out(1.6)' }, 
        0.75
      )
      // Image container coming in from right
      .fromTo(imageRef.current,      
        { x: 50, opacity: 0, scale: 0.97 }, 
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, 
        0.25
      )
      // Floating cards
      .fromTo(card1Ref.current,      
        { x: 40, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }, 
        0.8
      )
      .fromTo(card3Ref.current,      
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }, 
        1.0
      )
      // Stats panel entrance (guarantees full opacity on load)
      .fromTo(statsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0.9
      );

      // ── Stats counter scroll trigger ──
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll<HTMLElement>('[data-count]');
        counters.forEach(el => {
          const raw = el.getAttribute('data-count') || '';
          const num = parseInt(raw.replace(/\D/g,''), 10);
          const sfx = raw.replace(/\d/g, '');
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo({ v: 0 }, { v: num }, {
                duration: 1.8,
                ease: 'power2.out',
                onUpdate() {
                  const t = this.targets()[0] as { v: number };
                  el.textContent = Math.round(t.v).toLocaleString() + sfx;
                },
              });
            },
          });
        });
      }

      // ── Subtle parallax on image while scrolling ──
      gsap.to(imageRef.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bf-cream pt-28 pb-0 overflow-hidden">

      {/* Background warm blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-bg-blob w-[600px] h-[600px] -top-48 -right-48 opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(244,96,26,0.08) 0%, transparent 65%)' }} />
        <div className="hero-bg-blob w-[500px] h-[500px] top-1/2 -left-56 opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(232,160,32,0.07) 0%, transparent 65%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] xl:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-16 items-start">

          {/* ── LEFT ── */}
          <div className="pt-8 lg:pt-14 pb-10">
            {/* Overline */}
            <div className="t-overline mb-7 opacity-0" ref={el => { if (el) gsap.set(el, { opacity: 0 }); }}>
              <span className="bg-bf-orange-tint text-bf-orange px-3 py-1 rounded-full border border-bf-orange/15" style={{ letterSpacing: '0.08em', fontSize: 11 }}>
                India's #1 Home Kitchen Platform
              </span>
            </div>

            {/* Headline */}
            <div ref={headlineRef} className="mb-6 text-left">
              <h1 className="t-display text-bf-ink leading-tight overflow-hidden">
                <span className="inline-block headline-word">Real</span>{' '}
                <span className="inline-block headline-word">Food,</span><br />
                <span className="inline-block headline-word italic-orange underline-orange">Real Kitchens,</span><br />
                <span className="inline-block headline-word">Your</span>{' '}
                <span className="inline-block headline-word">Doorstep.</span>
              </h1>
            </div>

            {/* Tagline */}
            <p ref={taglineRef} className="text-bf-muted text-lg leading-relaxed max-w-[440px] mb-10 text-left">
              Order freshly home-cooked meals from verified local chefs in your
              neighbourhood — delivered piping hot in under 45 minutes.
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
              <a href="#menu" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); (window as any).lenis?.scrollTo('#menu', { duration: 1.2 }); }}>
                Explore Menu <ArrowRight size={18} />
              </a>
              <a href="#chefs" className="btn btn-outline btn-lg" onClick={(e) => { e.preventDefault(); (window as any).lenis?.scrollTo('#chefs', { duration: 1.2 }); }}>
                Meet Our Chefs
              </a>
            </div>

            {/* Trust chips */}
            <div ref={trustRef} className="flex flex-wrap gap-2 mb-10">
              {TRUST.map(t => (
                <span key={t} className="trust-chip inline-flex items-center gap-1.5 text-xs font-semibold text-bf-muted bg-white border border-bf-border rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bf-green flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-7 border-t border-bf-border-light">
              <div className="flex -space-x-2.5">
                {[121,122,123,124,125].map((s,i) => (
                  <img key={s} src={`https://picsum.photos/seed/${s}/48/48`} alt="customer"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    referrerPolicy="no-referrer"
                    style={{ zIndex: 5-i }}
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-bf-gold text-bf-gold" />)}
                </div>
                <p className="text-sm text-bf-muted">
                  <span className="font-bold text-bf-orange">50,000+</span> families trust Bachelor Food
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Image + Floating Cards ── */}
          <div ref={imageRef} className="relative mt-8 lg:mt-0 lg:pt-10 max-w-md mx-auto lg:max-w-none w-full">
            {/* Main image */}
            <div className="hero-frame aspect-[4/5] w-full relative">
              <img
                src="/assets/hero_food_bright.png"
                alt="Authentic home-cooked Indian food by Bachelor Food"
                className="w-full h-full object-cover"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(24,14,4,0.6) 0%, transparent 50%)' }} />

              {/* Image text overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-left">
                <div>
                  <p className="text-white/65 text-xs font-semibold uppercase tracking-widest mb-1">Today's Special</p>
                  <p className="text-white font-serif text-xl font-bold">Hyderabadi Dum Biryani</p>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Star size={12} className="fill-bf-gold text-bf-gold" />
                  <span className="text-white text-xs font-bold">4.9</span>
                </div>
              </div>
            </div>

            {/* Floating Card 1 — Delivery */}
            <div ref={card1Ref} className="floating-card absolute top-14 -right-1 sm:-right-4 lg:-right-10 flex items-center gap-3 opacity-0 text-left">
              <div className="icon-box ib-orange flex-shrink-0" style={{ width: 44, height: 44, borderRadius: 13 }}>
                <Zap size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-bf-muted uppercase tracking-wider mb-0.5">Delivery Time</p>
                <p className="text-bf-ink font-serif font-bold text-xl leading-tight">35 Minutes</p>
              </div>
            </div>

            {/* Floating Card 3 — Chef */}
            <div ref={card3Ref} className="floating-card absolute -bottom-5 right-2 sm:right-4 lg:right-0 flex items-center gap-3 opacity-0 text-left">
              <img src="https://picsum.photos/seed/chef99/44/44" alt="Chef"
                className="w-11 h-11 rounded-2xl object-cover flex-shrink-0"
                referrerPolicy="no-referrer" />
              <div>
                <p className="text-bf-ink font-semibold text-sm">Chef Fatima B.</p>
                <div className="flex items-center gap-1">
                  <Star size={11} className="fill-bf-gold text-bf-gold" />
                  <span className="text-bf-muted text-xs">4.9 · Hyderabad</span>
                </div>
              </div>
              <span className="badge badge-green ml-1">Top Chef</span>
            </div>
          </div>
        </div>

        {/* ── Recreated Premium High-Contrast Dark Stats Panel ── */}
        <div ref={statsRef} className="mt-24 relative z-10 text-left opacity-0">
          <div className="bg-[#180E04] rounded-[32px] border border-[#2D1D10] shadow-[0_24px_60px_rgba(24,14,4,0.15)] p-8 sm:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#2D1D10]">
              
              {STATS.map(({ val, label, Icon }, idx) => (
                <div 
                  key={label} 
                  className={`flex flex-col items-start transition-all duration-300 hover:translate-y-[-4px] group ${
                    idx > 0 ? 'lg:pl-8 pt-6 lg:pt-0' : 'pt-0'
                  } ${
                    idx === 1 ? 'pt-6 sm:pt-0' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-bf-orange/10 text-bf-orange flex items-center justify-center group-hover:bg-bf-orange group-hover:text-white transition-colors duration-300">
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
                  </div>
                  
                  <div className="font-serif text-4xl lg:text-5xl font-extrabold text-white tracking-tight group-hover:text-bf-orange transition-colors duration-300" data-count={val}>
                    {val}
                  </div>
                  
                  <p className="text-[10px] text-bf-orange font-bold uppercase tracking-wider mt-2.5">
                    {idx === 0 && 'Active registered users'}
                    {idx === 1 && 'Verified tiffin experts'}
                    {idx === 2 && 'Average transit duration'}
                    {idx === 3 && 'Operating state capitals'}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>

      </div>

      {/* Dynamic scrolling brand ticker between sections (Infinite Marquee) */}
      <div className="marquee-wrap relative w-full bg-bf-orange py-5 select-none print:hidden mt-20 border-y border-bf-orange-deep/15">
        <div className="marquee-track flex items-center">
          
          {/* Track segment 1 */}
          <div className="flex gap-16 items-center shrink-0 pr-16">
            <span className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
              Pure Home Ingredients
            </span>
            <span className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
              100% Verified Home Kitchens
            </span>
            <span className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
              Zero Preservatives & Artificial Colors
            </span>
            <span className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
              Daily Fresh Tiffin Subscriptions
            </span>
          </div>

          {/* Track segment 2 (Duplicate for loop) */}
          <div className="flex gap-16 items-center shrink-0 pr-16" aria-hidden="true">
            <span className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
              Pure Home Ingredients
            </span>
            <span className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
              100% Verified Home Kitchens
            </span>
            <span className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
              Zero Preservatives & Artificial Colors
            </span>
            <span className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
              Daily Fresh Tiffin Subscriptions
            </span>
          </div>

        </div>
      </div>

      {/* Section wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0 Q360 80 720 40 Q1080 0 1440 60 L1440 80 L0 80 Z" fill="#FFF5EE"/>
        </svg>
      </div>
    </section>
  );
}
