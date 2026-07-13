import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Apple, Smartphone, Compass, ShieldCheck, Heart, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WHY = [
  { Icon: Compass,     title: 'Local Discovery', desc: 'Find verified home kitchens right in your neighborhood.', ib: 'ib-orange' },
  { Icon: ShieldCheck, title: 'FSSAI Certified',  desc: 'Every single chef is rigorously verified and certified.', ib: 'ib-green' },
  { Icon: Heart,       title: 'Zero Preservatives',desc: 'Healthy meals prepared with pure, high-quality home ingredients.', ib: 'ib-gold' },
  { Icon: Users,       title: 'Community First',   desc: 'Support local culinary talent and micro-entrepreneurs.', ib: 'ib-navy' },
];

const APP_FEATURES = [
  'Custom daily tiffin scheduling',
  'FSSAI verified kitchen auditing',
  'Zero-preservative hygiene rating',
  'Live order status & ETA updates',
  'Direct communication with chefs',
  'No minimum order requirements',
];

export default function CTA() {
  const whySectionRef = useRef<HTMLDivElement>(null);
  const titleRef      = useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);
  const appRef        = useRef<HTMLDivElement>(null);
  const phoneRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Why Section ScrollTrigger ──
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%', once: true },
        });
      }

      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll('.why-card'), {
          y: 50, opacity: 0, scale: 0.97, duration: 0.8, stagger: 0.08, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        });
      }

      // ── App Section ScrollTrigger ──
      if (appRef.current) {
        gsap.from(appRef.current.querySelector('.app-text'), {
          x: -50, opacity: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: appRef.current, start: 'top 78%', once: true },
        });
      }

      if (phoneRef.current) {
        gsap.from(phoneRef.current, {
          x: 50, opacity: 0, rotate: 10, scale: 0.9, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: phoneRef.current, start: 'top 78%', once: true },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Why Section ── */}
      <section ref={whySectionRef} className="py-24 bg-white overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text & Grid */}
            <div className="relative">
              <div ref={titleRef} className="mb-10">
                <div className="t-overline mb-5">Why Choose Us</div>
                <h2 className="t-headline text-bf-ink mb-4">
                  Taste the Freshness of<br />
                  <span className="italic-orange">Authentic Home Kitchens</span>
                </h2>
                <p className="text-bf-muted leading-relaxed max-w-md">
                  We are redefining meal times by bringing healthy, fresh, and hygienic home-cooked food straight to you.
                </p>
              </div>

              <div ref={gridRef} className="why-grid grid sm:grid-cols-2 gap-4 mb-10">
                {WHY.map((f,i) => (
                  <div key={i} className="why-card card p-5">
                    <div className={`icon-box ${f.ib} mb-4`}><f.Icon size={20} /></div>
                    <h4 className="font-semibold text-bf-ink text-sm mb-1.5">{f.title}</h4>
                    <p className="text-bf-muted text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              <a href="#download" className="btn btn-primary btn-lg inline-flex" onClick={(e) => { e.preventDefault(); (window as any).lenis?.scrollTo('#download', { duration: 1.2 }); }}>
                Get the App <ArrowRight size={17} />
              </a>
            </div>

            {/* Chef image showcase */}
            <div className="why-image relative">
              <div className="rounded-3xl overflow-hidden h-96 sm:h-[540px] relative">
                <img src="/assets/home_chef.png" alt="Home chef preparing food"
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(24,14,4,0.65) 0%, transparent 55%)' }} />
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3">
                  {[{ label:'Platform Rating', val:'4.8★' }, { label:'Meals Today', val:'12,847' }].map(s => (
                    <div key={s.label} className="floating-card">
                      <p className="text-bf-muted text-[10px] font-bold uppercase tracking-wider mb-1">{s.label}</p>
                      <p className="font-serif text-2xl font-bold text-bf-ink">{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Orange CTA Banner ── */}
      <section className="orange-banner py-16">
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          <div className="text-center lg:text-left">
            <h2 className="font-serif text-3xl lg:text-4xl text-white font-bold mb-2">
              Become a Home Chef on Bachelor Food
            </h2>
            <p className="text-white/70 text-lg max-w-lg">
              Love to cook? Share your recipes and earn from your own kitchen — no investment needed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button className="btn btn-white btn-lg">Join as Chef <ArrowRight size={17} /></button>
            <button className="btn btn-ghost btn-lg">Learn More</button>
          </div>
        </div>
      </section>

      {/* ── App Download ── */}
      <section id="download" ref={appRef} className="bg-bf-surface py-24 text-left">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div className="app-text">
            <div className="t-overline mb-5">Get the App</div>
            <h2 className="t-headline text-bf-ink mb-5">
              Home Cooking,<br />
              <span className="italic-orange">In Your Pocket.</span>
            </h2>
            <p className="text-bf-muted leading-relaxed max-w-md mb-10">
              Download Bachelor Food and access 2,800+ home chefs, live tracking, meal scheduling
              and exclusive offers — completely free.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {APP_FEATURES.map((f,i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-bf-green-tint flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-bf-green" />
                  </div>
                  <span className="text-bf-muted text-sm">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="store-btn">
                <Apple size={26} className="text-bf-ink flex-shrink-0" />
                <div className="text-left">
                  <p className="text-bf-muted text-[10px] font-bold uppercase tracking-wider">Download on the</p>
                  <p className="text-bf-ink font-serif font-bold text-lg leading-tight">App Store</p>
                </div>
              </button>
              <button className="store-btn">
                <Smartphone size={26} className="text-bf-ink flex-shrink-0" />
                <div className="text-left">
                  <p className="text-bf-muted text-[10px] font-bold uppercase tracking-wider">Get it on</p>
                  <p className="text-bf-ink font-serif font-bold text-lg leading-tight">Google Play</p>
                </div>
              </button>
            </div>
            <p className="text-bf-subtle text-sm mt-5">4.8 stars · 100,000+ downloads · Always free</p>
          </div>

          {/* Phone mockup */}
          <div ref={phoneRef} className="flex justify-center items-center relative">
            {/* Glow blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(24,14,26,0.12) 0%, transparent 65%)' }} />
            </div>

            <div className="phone-shell w-72 relative overflow-hidden" style={{ transform: 'rotate(-2deg)' }}>
              {/* Status bar */}
              <div className="bg-bf-orange px-5 pt-6 pb-3 flex items-center justify-between">
                <span className="text-white font-serif text-xl font-bold">Bachelor Food</span>
                <span className="text-white/75 text-xs font-semibold">9:41</span>
              </div>

              <div className="bg-bf-cream p-5">
                <p className="text-bf-muted text-xs font-semibold uppercase tracking-wider mb-0.5">Good evening</p>
                <p className="font-serif text-xl font-bold text-bf-ink mb-4">What shall we cook tonight?</p>

                {/* Search */}
                <div className="bg-white rounded-2xl border border-bf-border-light px-4 py-3 text-bf-subtle text-sm mb-5 shadow-sm">
                  Search dishes or chefs...
                </div>

                {/* Mini card */}
                <div className="rounded-2xl overflow-hidden border border-bf-border-light mb-3 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400"
                    alt="dish" className="w-full h-28 object-cover" referrerPolicy="no-referrer" />
                  <div className="bg-white px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-bf-ink text-sm">Dum Biryani</p>
                      <p className="text-bf-muted text-xs">Fatima B. · 40 min</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-bf-orange flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg leading-none font-bold">+</span>
                    </div>
                  </div>
                </div>

                {/* Order status pill */}
                <div className="bg-bf-green-tint rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-bf-green animate-pulse flex-shrink-0" />
                  <div>
                    <p className="text-bf-green font-semibold text-xs">Order on the way</p>
                    <p className="text-bf-muted text-[11px]">ETA 12 minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="floating-card absolute -right-2 top-20 flex items-center gap-2">
              <div className="icon-box ib-gold" style={{ width:36, height:36, borderRadius:10, fontSize:13, fontWeight:700 }}>
                <span className="text-bf-gold font-bold text-sm">4.8</span>
              </div>
              <div>
                <p className="text-bf-ink font-bold text-xs">App Rating</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-bf-gold text-[10px]">★</span>)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
