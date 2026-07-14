import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ChefHat, Smartphone, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01', Icon: MapPin,     iconStyle: 'ib-orange',
    title: 'Set Your Location',
    desc:  'Enter your address and instantly discover home chefs cooking delicious meals in your neighbourhood right now. GPS-precise, down to your street.',
    check: 'Available across 24 cities',
    img:   '/assets/step_location.png',
  },
  {
    num: '02', Icon: ChefHat,    iconStyle: 'ib-gold',
    title: 'Browse & Choose Your Chef',
    desc:  'Explore verified home chefs near you — see their menus, read reviews, check specialties and find your perfect culinary match.',
    check: '2,800+ verified home chefs',
    img:   '/assets/step_choose_chef.png',
  },
  {
    num: '03', Icon: Smartphone, iconStyle: 'ib-navy',
    title: 'Order in One Tap',
    desc:  'Place your order instantly, customise your meal, and watch your food being prepared in real time with live GPS tracking.',
    check: 'Live GPS tracking on every order',
    img:   '/assets/step_order_tap.png',
  },
  {
    num: '04', Icon: CheckCircle, iconStyle: 'ib-green',
    title: 'Enjoy Authentic Home Cooking',
    desc:  'Freshly cooked, piping hot, just like family made it — delivered to your door in an average of 35 minutes. No compromise, ever.',
    check: 'Average delivery: 35 min',
    img:   '/assets/step_enjoy_food.png',
  },
];

export default function RecipeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.hiw-header', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.hiw-header', start: 'top 80%', once: true },
      });

      // Each step — alternating glide
      const steps = sectionRef.current!.querySelectorAll<HTMLElement>('.step-row');
      steps.forEach((row, i) => {
        const text = row.querySelector('.step-text');
        const img  = row.querySelector('.step-img');
        const isRight = i % 2 !== 0;

        gsap.from(text, {
          x: isRight ? 60 : -60, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 78%', once: true },
        });
        gsap.from(img, {
          x: isRight ? -60 : 60, opacity: 0, scale: 0.95, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 78%', once: true },
          delay: 0.1,
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-bf-cream py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="hiw-header text-center max-w-xl mx-auto mb-20">
          <div className="t-overline justify-center mb-5">Simple Process</div>
          <h2 className="t-headline text-bf-ink mb-4">
            From Kitchen<br />
            <span className="italic-orange">to Your Table</span>
          </h2>
          <p className="text-bf-muted leading-relaxed">
            Four steps to authentic home-cooked food without leaving your home.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-10">
          {STEPS.map((step, i) => {
            const reversed = i % 2 !== 0;
            return (
              <div key={i} className={`step-row grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${reversed ? 'lg:grid-flow-dense' : ''}`}>

                {/* Text card */}
                <div className={`step-text ${reversed ? 'lg:col-start-2' : ''}`}>
                  <div className="step-card">
                    <span className="step-ghost-num">{step.num}</span>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`icon-box ${step.iconStyle}`}>
                        <step.Icon size={22} />
                      </div>
                      <span className="text-xs font-bold text-bf-subtle uppercase tracking-[0.14em]">Step {i+1} of {STEPS.length}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-bf-ink mb-3">{step.title}</h3>
                    <p className="text-bf-muted leading-relaxed mb-6">{step.desc}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-bf-green">
                      <CheckCircle size={15} />
                      {step.check}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={`step-img ${reversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="rounded-3xl overflow-hidden h-72 lg:h-80 relative">
                    <img src={step.img} alt={step.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer" />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, rgba(244,96,26,0.14) 0%, transparent 55%)' }} />
                    <span className="absolute bottom-4 left-4 badge badge-white">Step {i+1} of 4</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
