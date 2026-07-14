import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Heart, Volume2, VolumeX, Play, ArrowRight, UserCheck, ShieldCheck, Flame, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Chef {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  specialty: string;
  experience: string;
  orders: string;
  bio: string;
  location: string;
}

const CHEFS: Chef[] = [
  {
    id: 1,
    name: 'Chef Fatima Begum',
    avatar: 'https://picsum.photos/seed/cheffatima/150/150',
    rating: 4.9,
    specialty: 'Hyderabadi Dum Biryani & Traditional Nizami Cuisine',
    experience: '12 Years',
    orders: '18,400+',
    location: 'Hyderabad',
    bio: 'Fatima is a custodian of traditional Nizami flavors. Her Dum Biryani is cooked in small brass pots, utilizing slow charcoal heat (Dum) to yield rich, fragrant grains of rice.'
  },
  {
    id: 2,
    name: 'Chef Selvan Kumar',
    avatar: 'https://picsum.photos/seed/chefselvan/150/150',
    rating: 4.85,
    specialty: 'Tamil Chettinad Kitchen & Claypot Curries',
    experience: '15 Years',
    orders: '14,200+',
    location: 'Karaikudi, Tamil Nadu',
    bio: 'Selvan is a master of Chettinad spices. His signature dishes are cooked in traditional earthenware pots to enrich the deep pepper and coconut notes of authentic Tamil country curries.'
  },
  {
    id: 3,
    name: 'Chef Meenakshi Sundaram',
    avatar: 'https://picsum.photos/seed/chefmeenakshi/150/150',
    rating: 4.92,
    specialty: 'Traditional South Indian Breakfasts & Filter Coffee',
    experience: '8 Years',
    orders: '22,100+',
    location: 'Chennai',
    bio: 'From thin ghee roasts to fluffy steamed idlis, Meenakshi grinds her batters fresh daily. Her home kitchen follows age-old fermentation cycles passed down through three generations.'
  },
  {
    id: 4,
    name: 'Chef Rajesh Sharma',
    avatar: 'https://picsum.photos/seed/chefrajesh/150/150',
    rating: 4.78,
    specialty: 'North Indian Clay Tandoor & Slow Cooked Dals',
    experience: '10 Years',
    orders: '9,800+',
    location: 'Delhi NCR',
    bio: 'Rajesh specializes in hearty clay tandoor breads and dals cooked overnight on embers. His Dal Makhani is simmered for 18 hours to achieve unmatched creaminess without preservatives.'
  }
];

const REELS = [
  {
    id: 1,
    chef: 'Bachelor Food India',
    title: 'Tired of hostel food 😭 We got you 🫵🏻',
    location: 'Official Campaign Reel',
    url: '/assets/hostel_food.mp4',
    likes: 2450,
    igUrl: 'https://www.instagram.com/bachelorfood_india/',
    clickAction: 'redirect'
  },
  {
    id: 2,
    chef: 'Chef Fatima Begum',
    title: 'Layering Hyderabadi Dum Biryani',
    location: 'Nizami Slow Kitchen',
    url: 'https://player.vimeo.com/external/435674703.sd.mp4?s=7fdb2c5b1b46747d25e834ef19a16f2c069270e5&profile_id=165&oauth2_token_id=57447761',
    likes: 1240,
    igUrl: 'https://www.instagram.com/reel/DV0mZ5Qk4ae/?igsh=cDlod2V2NGxwMThx',
    clickAction: 'play'
  },
  {
    id: 3,
    chef: 'Chef Selvan Kumar',
    title: 'Sizzling Chettinad Spice Tempering',
    location: 'Tamil Earthenware Kitchen',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e082a5c2d3a9d9841f3e79b5c3ff&profile_id=139&oauth2_token_id=57447761',
    likes: 480,
    igUrl: null,
    clickAction: 'play'
  }
];

export default function OurChefsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'tamil' | 'north'>('all');
  const [muted, setMuted] = useState(true);
  const [playingId, setPlayingId] = useState<number | null>(1);
  const [reelLikes, setReelLikes] = useState<{ [key: number]: number }>({ 1: 2450, 2: 1240, 3: 480 });
  const [likedReels, setLikedReels] = useState<{ [key: number]: boolean }>({});

  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Our Verified Home Chefs — Bachelor Food";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Meet the verified local chefs of Bachelor Food. Explore real home kitchens cooking authentic Tamil Chettinad, Hyderabadi Nizami, and traditional North Indian dishes.');
    }
  }, []);

  const handleVideoIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const id = parseInt(entry.target.getAttribute('data-reel-id') || '0', 10);
      if (entry.isIntersecting) {
        setPlayingId(id);
        const video = videoRefs.current[id];
        if (video) {
          video.play().catch(() => {});
        }
      } else {
        const video = videoRefs.current[id];
        if (video) {
          video.pause();
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleVideoIntersection, {
      threshold: 0.6,
      rootMargin: '0px'
    });

    const elements = document.querySelectorAll('.reel-slide');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const togglePlay = (id: number) => {
    const reel = REELS.find(r => r.id === id);
    if (reel && reel.clickAction === 'redirect' && reel.igUrl) {
      window.open(reel.igUrl, '_blank');
      return;
    }
    const video = videoRefs.current[id];
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlayingId(id);
    } else {
      video.pause();
      setPlayingId(null);
    }
  };

  const handleLike = (id: number) => {
    setLikedReels(prev => {
      const newLiked = !prev[id];
      setReelLikes(likes => ({
        ...likes,
        [id]: newLiked ? likes[id] + 1 : likes[id] - 1
      }));
      return { ...prev, [id]: newLiked };
    });
  };

  const filteredChefs = CHEFS.filter(chef => {
    if (activeTab === 'all') return true;
    if (activeTab === 'tamil') return chef.location.toLowerCase().includes('tamil') || chef.location.toLowerCase().includes('chennai') || chef.location.toLowerCase().includes('karaikudi');
    if (activeTab === 'north') return chef.location.toLowerCase().includes('delhi');
    return true;
  });

  return (
    <div className="bg-bf-cream min-h-screen pt-24 pb-20">
      
      {/* ── HERO INTRODUCTION ── */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-bf-sand border-b border-bf-border/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="text-left order-2 lg:order-1">
            <div className="t-overline mb-5">Our Chefs</div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-bf-ink font-bold leading-tight mb-6">
              Real Kitchens, <br />
              <span className="italic-orange">Traditional Taste</span>
            </h1>
            <p className="text-bf-muted text-lg leading-relaxed max-w-xl mb-8">
              At Bachelor Food, we do not support dark kitchens or industrial mess services. Every meal is cooked inside local home kitchens by verified regional chefs, utilizing traditional slow-cooking techniques and fresh regional ingredients.
            </p>
            
            <div className="grid grid-cols-3 gap-6 border-t border-bf-border-light pt-8">
              {[
                { label: 'Verified Chefs', val: '2,800+' },
                { label: 'Weekly Audits', val: '100%' },
                { label: 'Tamil Kitchens', val: '840+' }
              ].map(s => (
                <div key={s.label}>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-bf-orange mb-1">{s.val}</p>
                  <p className="text-bf-muted text-xs font-semibold uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
              <img 
                src="/assets/chef_cooking.png" 
                alt="Tamil home chef cooking South Indian dishes in a traditional claypot"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                <div>
                  <span className="badge badge-green mb-2">Tamil Kitchen Visual</span>
                  <p className="font-serif text-lg font-bold">Traditional Slow Earthenware Claypot Cooking</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Flame className="text-bf-orange fill-bf-orange" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLL-SNAPPED VIDEO REELS ── */}
      <section className="py-20 bg-brand-charcoal text-white overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-bf-orange uppercase text-xs font-bold tracking-widest mb-3 block">CHEF STORIES</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 text-white">
              Watch Our Chefs In Action
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              Scroll or swipe through our kitchen reels to watch our verified home chefs prepare traditional curries, freshly ground idli batters, and hand-rolled flatbreads in real-time.
            </p>
          </div>

          <div className="flex justify-center items-center">
            {/* Reel Mobile Container */}
            <div className="relative w-full max-w-[340px] h-[580px] rounded-[40px] border-[10px] border-[#2A2A2A] bg-black shadow-2xl overflow-hidden">
              {/* Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2A2A2A] rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-black rounded-full" />
              </div>

              {/* Mute Button */}
              <button 
                onClick={() => setMuted(!muted)}
                className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Reels Vertical Scroll Wrapper */}
              <div className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none">
                {REELS.map((reel) => (
                  <div 
                    key={reel.id}
                    data-reel-id={reel.id}
                    className="reel-slide w-full h-full snap-start snap-always relative flex-shrink-0"
                  >
                    <div className="relative w-full h-full cursor-pointer" onClick={() => togglePlay(reel.id)}>
                      <video
                        ref={el => videoRefs.current[reel.id] = el}
                        src={reel.url}
                        className="w-full h-full object-cover"
                        loop
                        muted={muted}
                        playsInline
                      />
                      
                      {/* Play/Pause Overlay indicator */}
                      {playingId !== reel.id && reel.clickAction !== 'redirect' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white animate-pulse">
                            <Play size={24} className="fill-white translate-x-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Tap to Instagram Redirect Overlay */}
                      {reel.clickAction === 'redirect' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 gap-3 p-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center text-white shadow-xl animate-bounce">
                            <Instagram size={26} className="text-white" />
                          </div>
                          <span className="text-white font-bold text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                            Tap to view on Instagram 🫵🏻
                          </span>
                        </div>
                      )}

                      {/* Instagram Reel Button Overlay */}
                      {reel.igUrl && reel.clickAction !== 'redirect' && (
                        <a 
                          href={reel.igUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-16 left-5 z-30 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-[10px] tracking-wider uppercase flex items-center gap-1.5 shadow-lg border border-white/10 hover:scale-105 transition-transform"
                        >
                          <Instagram size={12} />
                          <span>View original Reel</span>
                        </a>
                      )}
                    </div>

                    {/* Left overlay details */}
                    <div className="absolute bottom-6 left-5 right-14 z-20 pointer-events-none text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-bf-green animate-pulse" />
                        <p className="text-white font-bold text-sm tracking-wide">{reel.chef}</p>
                      </div>
                      <p className="text-white/95 font-serif text-base font-semibold leading-snug mb-1">{reel.title}</p>
                      <p className="text-white/60 text-xs tracking-wider uppercase font-medium">{reel.location}</p>
                    </div>

                    {/* Right action column */}
                    <div className="absolute bottom-16 right-4 z-20 flex flex-col items-center gap-5">
                      <button 
                        onClick={() => handleLike(reel.id)}
                        className="flex flex-col items-center gap-1 group"
                      >
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                          likedReels[reel.id] ? 'bg-bf-orange text-white' : 'bg-black/40 text-white backdrop-blur-md group-hover:bg-black/60'
                        }`}>
                          <Heart size={18} className={likedReels[reel.id] ? 'fill-white' : ''} />
                        </div>
                        <span className="text-[10px] font-bold text-white">{reelLikes[reel.id]}</span>
                      </button>

                      <div className="flex flex-col items-center gap-1">
                        <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                          <Star size={16} className="fill-bf-gold text-bf-gold" />
                        </div>
                        <span className="text-[10px] font-bold text-white">4.9</span>
                      </div>
                    </div>

                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHEFS DIRECTORY ── */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="t-overline mb-3">Our Roster</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bf-ink">
              Verified Home Kitchen Chefs
            </h2>
          </div>

          {/* Filtering Tab */}
          <div className="flex gap-2 bg-bf-sand p-1.5 rounded-2xl border border-bf-border-light self-start">
            {[
              { id: 'all', label: 'All Kitchens' },
              { id: 'tamil', label: 'Tamil Specialties' },
              { id: 'north', label: 'North Indian' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t.id
                    ? 'bg-bf-orange text-white shadow-sm'
                    : 'text-bf-muted hover:text-bf-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredChefs.map(chef => (
            <div key={chef.id} className="card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:border-bf-orange/30 transition-all duration-300">
              <img 
                src={chef.avatar} 
                alt={chef.name} 
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border border-bf-border-light flex-shrink-0"
              />
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif text-xl font-bold text-bf-ink">{chef.name}</h3>
                  <div className="flex items-center gap-1 bg-bf-gold-tint border border-bf-gold/15 px-2 py-0.5 rounded-full">
                    <Star size={11} className="fill-bf-gold text-bf-gold" />
                    <span className="text-bf-ink text-[11px] font-bold">{chef.rating}</span>
                  </div>
                </div>
                
                <p className="text-bf-orange font-semibold text-xs mb-3">{chef.specialty}</p>
                <p className="text-bf-muted text-sm leading-relaxed mb-4">{chef.bio}</p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-bf-border-light pt-4">
                  <div>
                    <span className="text-bf-subtle text-[10px] font-bold uppercase tracking-wider block">Experience</span>
                    <span className="text-bf-ink text-sm font-semibold">{chef.experience}</span>
                  </div>
                  <div>
                    <span className="text-bf-subtle text-[10px] font-bold uppercase tracking-wider block">Completed Orders</span>
                    <span className="text-bf-ink text-sm font-semibold">{chef.orders}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SAFETY STATS ── */}
      <section className="bg-bf-sand py-16 border-t border-b border-bf-border/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { Icon: UserCheck, title: 'Verified Background Check', desc: 'Every chef goes through double ID verifications and rigorous personal interviews.' },
            { Icon: ShieldCheck, title: 'FSSAI Hygiene Audits', desc: 'Regular surprise checks by certified food safety auditors verify clean kitchens.' },
            { Icon: Flame, title: 'Preservative-Free Prep', desc: 'No store-bought curry pastes. Fresh spices are grounded daily in small quantities.' }
          ].map((f, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-bf-border flex items-center justify-center flex-shrink-0 text-bf-orange">
                <f.Icon size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-lg text-bf-ink mb-1.5">{f.title}</h4>
                <p className="text-bf-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── bottom CTA ── */}
      <section className="py-20 text-center max-w-3xl mx-auto px-5">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bf-ink mb-5">
          Ready to Taste Authentic Home Cooking?
        </h2>
        <p className="text-bf-muted text-base mb-8">
          Order freshly home-cooked daily meals and subscription tiffin services directly from these verified chefs in your neighbourhood.
        </p>
        <Link to="/" className="btn btn-primary btn-lg inline-flex items-center gap-2">
          Browse Cooking Menu <ArrowRight size={17} />
        </Link>
      </section>

    </div>
  );
}
