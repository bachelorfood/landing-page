import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, MapPin, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CHEFS = [
  { name:'Chef Fatima Begum',   specialty:'Hyderabadi & Mughlai',   orders:'3,200+', rating:4.9, city:'Hyderabad', badge:'Top Chef',     badgeStyle:'badge-orange', feat:'Dum Biryani',    img:'/assets/hyderabadi_biryani.png' },
  { name:'Chef Selvan Kumar',   specialty:'Chettinad & Tamil',      orders:'2,800+', rating:4.8, city:'Karaikudi', badge:'Fan Favourite',badgeStyle:'badge-gold',   feat:'Chettinad Curry',img:'/assets/chettinad_chicken.png' },
  { name:'Chef Rajesh Sharma',  specialty:'Punjabi & North Indian',  orders:'4,100+', rating:5.0, city:'Delhi NCR', badge:'Legend',       badgeStyle:'badge-green',  feat:'Dal Makhani',    img:'/assets/dal_makhani.png' },
  { name:'Chef Meenakshi Sundaram', specialty:'Traditional Breakfasts', orders:'1,900+', rating:4.9, city:'Chennai',   badge:'Rising Star',  badgeStyle:'badge-navy',   feat:'Masala Dosa',    img:'/assets/masala_dosa.png' },
];

const TESTIMONIALS = [
  { name:'Priya S.',  city:'Bangalore',  text:"Reminds me of my mom's cooking. The dal makhani is absolutely divine — I've ordered three times this week.",                       rating:5, seed:'301' },
  { name:'Rahul M.',  city:'Chennai',    text:'Best decision as a working professional. Fresh, hygienic, and tastes exactly like home. No more restaurant guilt.',               rating:5, seed:'302' },
  { name:'Ananya K.', city:'Hyderabad',  text:'The biryani here beats most restaurants. Chef Fatima Begum is extraordinary. Worth every single rupee.',                          rating:5, seed:'303' },
  { name:'Vikram T.', city:'Mumbai',     text:'Completely hooked. The food is exactly what a busy bachelor needs after a long day — real, comforting, nourishing.',              rating:4, seed:'304' },
  { name:'Divya R.',  city:'Coimbatore', text:'Ordered for my whole office. Everyone was amazed. Real home taste, delivered with so much care and warmth.',                      rating:5, seed:'305' },
  { name:'Sanjay P.', city:'Pune',       text:"This platform changed how my family eats. My wife says Chef Gurpreet's chole bhature beats hers!",                               rating:5, seed:'306' },
  { name:'Meena L.',  city:'Kochi',      text:"Lakshmi Rao's Kerala fish curry is authentic perfection. It transported me straight to my grandmother's home.",                   rating:5, seed:'307' },
  { name:'Arjun V.',  city:'Delhi',      text:'Super fast delivery, piping hot food, and the chef actually calls to confirm preferences. Such genuine service!',                 rating:5, seed:'308' },
];

export default function Testimonials() {
  const chefRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!chefRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.chef-section-header', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.chef-section-header', start: 'top 80%', once: true },
      });
      gsap.from(chefRef.current!.querySelectorAll('.chef-card'), {
        y: 60, opacity: 0, duration: 0.7, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: '.chef-grid', start: 'top 78%', once: true },
      });
    }, chefRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Chefs ── */}
      <section id="chefs" ref={chefRef} className="bg-bf-surface py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <div className="chef-section-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <div className="t-overline mb-5">Meet Our Chefs</div>
              <h2 className="t-headline text-bf-ink">
                The Heart Behind<br />
                <span className="italic-orange">Every Dish</span>
              </h2>
            </div>
            <p className="text-bf-muted max-w-[260px] lg:text-right leading-relaxed">
              Real home cooks sharing their family recipes with your city.
            </p>
          </div>

          <div className="chef-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CHEFS.map((chef, i) => (
              <div key={i} className="chef-card group">
                <img src={chef.img} alt={chef.name} referrerPolicy="no-referrer" />
                <div className="chef-overlay" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`badge ${chef.badgeStyle} flex items-center gap-1`}>
                    <Award size={10} /> {chef.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white/55 text-[11px] font-semibold uppercase tracking-wider mb-1">{chef.feat}</p>
                  <h3 className="text-white font-serif text-xl font-bold leading-tight mb-1">{chef.name}</h3>
                  <p className="text-white/55 text-sm mb-4">{chef.specialty}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-white/60"><MapPin size={11} />{chef.city}</div>
                    <div className="flex items-center gap-1">
                      <Star size={11} className="fill-bf-gold text-bf-gold" />
                      <span className="text-white font-bold">{chef.rating}</span>
                      <span className="text-white/45">· {chef.orders}</span>
                    </div>
                  </div>
                  {/* Hover CTA */}
                  <div className="max-h-0 overflow-hidden transition-all duration-350 group-hover:max-h-14 mt-0 group-hover:mt-4">
                    <button className="btn btn-ghost btn-sm w-full justify-center">View Menu</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-bf-cream py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14 text-center">
          <div className="t-overline justify-center mb-5">Customer Stories</div>
          <h2 className="t-headline text-bf-ink">
            Loved by <span className="italic-orange">50,000+ Families</span>
          </h2>
        </div>

        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({length:5}).map((_,j) => (
                    <Star key={j} size={12} className={j < t.rating ? 'fill-bf-gold text-bf-gold' : 'text-bf-border'} />
                  ))}
                </div>
                <p className="text-bf-body/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-bf-border-light">
                  <img src={`https://picsum.photos/seed/${t.seed}/40/40`} alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border border-bf-border"
                    referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-bf-ink font-semibold text-sm">{t.name}</p>
                    <p className="text-bf-subtle text-xs flex items-center gap-1"><MapPin size={10} />{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
