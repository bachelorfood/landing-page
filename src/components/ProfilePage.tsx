import { motion, useScroll, useTransform } from 'motion/react';
import { Settings, Bookmark, Trophy, Activity, Calendar, MapPin, ChefHat, LogOut, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import RecipeCard from './RecipeCard';
import { recipes } from '../data';

export default function ProfilePage() {
  const savedRecipes = recipes.slice(0, 2);
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="pt-32 pb-20 bg-brand-sand min-h-screen" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          style={{ y, opacity }}
          className="bg-white rounded-[48px] border border-zinc-200/60 p-8 md:p-14 mb-20 shadow-xl shadow-brand-charcoal/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-terracotta/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400" alt="Chef Alex" className="w-40 h-40 rounded-[32px] object-cover border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-brand-charcoal/10 rounded-[32px] group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg tooltip hover:scale-110 transition-transform cursor-pointer">
                <Trophy className="w-5 h-5" />
              </div>
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row items-center md:items-center gap-4 mb-4"
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal tracking-tight">Alexander Vance</h1>
                <span className="px-4 py-1.5 bg-brand-forest text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">Pro Member</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] mb-12"
              >
                <span className="flex items-center gap-2 bg-brand-sand px-3 py-1.5 rounded-lg border border-zinc-100"><MapPin className="w-4 h-4 text-brand-terracotta" /> Seattle, WA</span>
                <span className="flex items-center gap-2 bg-brand-sand px-3 py-1.5 rounded-lg border border-zinc-100"><Calendar className="w-4 h-4 text-brand-terracotta" /> Joined Mar 2024</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-12"
              >
                <div className="group cursor-pointer">
                  <span className="block text-4xl font-display font-bold text-brand-charcoal mb-1 group-hover:text-brand-terracotta transition-colors">42</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Recipes Mastered</span>
                </div>
                <div className="w-px h-12 bg-zinc-200" />
                <div className="group cursor-pointer">
                  <span className="block text-4xl font-display font-bold text-brand-charcoal mb-1 group-hover:text-brand-terracotta transition-colors">14</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Day Streak</span>
                </div>
                <div className="w-px h-12 bg-zinc-200" />
                <div className="group cursor-pointer">
                  <span className="block text-4xl font-display font-bold text-brand-terracotta mb-1 group-hover:scale-110 transition-transform origin-left">1.2k</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Society Points</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 w-full md:w-auto"
            >
              <button className="w-full bg-brand-charcoal text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-terracotta hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group">
                <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" /> Edit Profile
              </button>
              <button className="w-full bg-brand-sand border border-zinc-200 text-brand-charcoal px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:border-brand-terracotta/30 transition-all duration-300 flex items-center justify-center gap-3">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200/50">
              <h2 className="text-3xl font-display font-bold flex items-center gap-4 text-brand-charcoal">
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center">
                   <Bookmark className="w-5 h-5 text-brand-terracotta fill-brand-terracotta/10" />
                </div>
                Saved Vault
              </h2>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-brand-terracotta transition-colors flex items-center gap-2 group bg-white px-4 py-2 rounded-xl border border-zinc-200 shadow-sm">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {savedRecipes.map((recipe, idx) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-[40px] border border-zinc-200/60 shadow-sm"
            >
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3 text-brand-charcoal">
                <div className="w-10 h-10 rounded-xl bg-brand-forest/5 flex items-center justify-center">
                   <Activity className="w-5 h-5 text-brand-forest" />
                </div>
                Recent Activity
              </h3>
              <div className="space-y-8">
                {[
                  { action: 'Completed', item: 'Signature Smoked Ribeye', time: '2 days ago' },
                  { action: 'Saved', item: 'Midnight Pasta Carbonara', time: '3 days ago' },
                  { action: 'Earned Badge', item: 'Grill Master Level 1', time: '1 week ago' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-5 group cursor-pointer hover:bg-brand-sand p-2 -mx-2 rounded-xl transition-colors">
                    <div className="relative mt-2">
                      <div className="w-3 h-3 rounded-full border-2 border-brand-terracotta bg-white group-hover:bg-brand-terracotta transition-colors z-10 relative" />
                      {i !== 2 && <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-[60px] bg-zinc-200 group-hover:bg-brand-terracotta/30 transition-colors" />}
                    </div>
                    <div>
                      <p className="text-[15px] text-zinc-600 font-light mb-1">{act.action} <span className="font-bold text-brand-charcoal">{act.item}</span></p>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-brand-terracotta transition-colors">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-brand-charcoal text-white p-10 rounded-[40px] shadow-xl text-center relative overflow-hidden group"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-forest/20 rounded-full blur-[50px] group-hover:bg-brand-terracotta/20 transition-colors duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 relative z-10 backdrop-blur-md">
                 <ChefHat className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 relative z-10">Pro Mastery Course</h3>
              <p className="text-sm text-zinc-400 mb-10 font-light leading-relaxed relative z-10">You are 40% through the <span className="text-white font-medium">Knife Skills Fundamentals</span> course.</p>
              
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-10 relative z-10 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="bg-brand-terracotta h-full relative rounded-full" 
                >
                  <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]" />
                </motion.div>
              </div>
              
              <button className="w-full bg-white text-brand-charcoal py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-terracotta hover:text-white hover:scale-105 transition-all duration-300 relative z-10 shadow-xl flex items-center justify-center gap-3">
                Continue Course
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
