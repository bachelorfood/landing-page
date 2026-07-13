import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Flame, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Biryani', 'South Indian', 'North Indian', 'Healthy', 'Desserts'];

const DISHES = [
  { id:1, name:'Hyderabadi Dum Biryani',  chef:'Fatima Begum',  price:220, rating:4.9, reviews:842,  time:'40 min', cat:'Biryani',      image:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600', tag:'Best Seller', tagStyle:'badge-orange', spicy:true },
  { id:2, name:'Chettinad Chicken Curry',  chef:'Kamala Devi',   price:180, rating:4.8, reviews:613,  time:'35 min', cat:'South Indian',  image:'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=600', tag:'Spicy',       tagStyle:'badge-gold',   spicy:true },
  { id:3, name:'Dal Makhani with Naan',    chef:'Gurpreet Kaur', price:160, rating:4.7, reviews:1021, time:'30 min', cat:'North Indian',  image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600', tag:'Comfort',    tagStyle:'badge-navy',   spicy:false },
  { id:4, name:'Masala Dosa & Sambar',     chef:'Lakshmi Rao',   price:120, rating:4.9, reviews:1344, time:'25 min', cat:'South Indian',  image:'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=600', tag:'Fan Fav',    tagStyle:'badge-green',  spicy:false },
  { id:5, name:'Rajma Rice Bowl',          chef:'Sunita Sharma', price:140, rating:4.6, reviews:429,  time:'35 min', cat:'Healthy',       image:'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&q=80&w=600', tag:'Healthy',    tagStyle:'badge-green',  spicy:false },
  { id:6, name:'Gulab Jamun & Rabri',      chef:'Radha Krishnan',price:90,  rating:4.9, reviews:768,  time:'15 min', cat:'Desserts',      image:'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600', tag:'Sweet',      tagStyle:'badge-gold',   spicy:false },
];

export default function Features() {
  const [cat, setCat] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const filtered = cat === 'All' ? DISHES : DISHES.filter(d => d.cat === cat);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header glide-in
      gsap.from(headerRef.current, {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards when category changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.food-card');
    gsap.fromTo(cards,
      { y: 30, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
    );
  }, [cat, filtered.length]);

  return (
    <section id="menu" ref={sectionRef} className="bg-bf-surface py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="t-overline mb-5">Today's Menu</div>
            <h2 className="t-headline text-bf-ink">
              Crafted with Love,<br />
              <span className="italic-orange">Served with Pride</span>
            </h2>
          </div>
          <p className="text-bf-muted max-w-[280px] lg:text-right leading-relaxed">
            Every dish prepared fresh by verified home chefs who pour their heart into each recipe.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto no-scroll pb-2 mb-12">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`cat-pill ${cat === c ? 'active' : ''}`}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(dish => (
            <div key={dish.id} className="food-card group">
              <div className="relative h-56 overflow-hidden">
                <img src={dish.image} alt={dish.name}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`badge ${dish.tagStyle}`}>{dish.tag}</span>
                </div>

                {/* Spicy tag */}
                {dish.spicy && (
                  <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Flame size={13} className="text-bf-orange" />
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs text-bf-muted font-medium">by {dish.chef}</span>
                  <div className="flex items-center gap-1">
                    <Star size={11} className="fill-bf-gold text-bf-gold" />
                    <span className="text-xs font-bold text-bf-ink">{dish.rating}</span>
                    <span className="text-xs text-bf-subtle">({dish.reviews})</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-bf-ink leading-snug mb-4">{dish.name}</h3>
                <div className="flex items-center gap-4 text-xs text-bf-muted mb-5">
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-bf-subtle" />{dish.time}</span>
                  <span className="w-1 h-1 rounded-full bg-bf-border" />
                  <span>Home-cooked fresh</span>
                </div>
                
                {/* Available on App details instead of pricing/ordering */}
                <div className="flex items-center justify-between pt-4 border-t border-bf-border-light">
                  <span className="text-[10px] text-bf-muted font-bold uppercase tracking-wider">Available on App</span>
                  <motion.button 
                    onClick={() => {
                      const el = document.querySelector('#download');
                      if (el) (window as any).lenis?.scrollTo(el, { duration: 1.2 });
                    }}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary btn-sm px-4"
                  >
                    Get App
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA linked to download */}
        <div className="text-center mt-14">
          <a 
            href="#download" 
            className="btn btn-outline btn-lg inline-flex"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#download');
              if (el) (window as any).lenis?.scrollTo(el, { duration: 1.2 });
            }}
          >
            Get the App for Full Menu <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
