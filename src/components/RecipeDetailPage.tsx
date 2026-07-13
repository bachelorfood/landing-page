import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { recipes } from '../data';
import { Timer, ChefHat, Users, Flame, ArrowLeft, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { useRef, useState } from 'react';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id);
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [activeStep, setActiveStep] = useState(0);

  if (!recipe) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-sand">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
        <Link to="/" className="text-brand-terracotta font-bold uppercase tracking-widest text-sm">Return Home</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-brand-sand min-h-screen" ref={ref}>
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-brand-charcoal">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/50 to-transparent" />
        </motion.div>
        
        <div className="absolute inset-0 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-10 group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-charcoal transition-colors">
                 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Kitchen</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-brand-terracotta/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-md">
                {recipe.category}
              </span>
              <span className="px-4 py-2 bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-md">
                {recipe.difficulty}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-6 text-white tracking-tight max-w-4xl">{recipe.title}</h1>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl">{recipe.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4 lg:-mt-40 relative z-10 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-brand-charcoal/5 border border-zinc-200/60"
            >
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-brand-sand border border-zinc-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 text-brand-terracotta">
                     <Timer className="w-4 h-4" />
                  </div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Time</span>
                  <span className="block font-bold text-lg text-brand-charcoal">{recipe.time}</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-brand-sand border border-zinc-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 text-brand-terracotta">
                     <Users className="w-4 h-4" />
                  </div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Servings</span>
                  <span className="block font-bold text-lg text-brand-charcoal">{recipe.servings} Pax</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-brand-sand border border-zinc-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 text-brand-terracotta">
                     <Flame className="w-4 h-4" />
                  </div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Energy</span>
                  <span className="block font-bold text-lg text-brand-charcoal">{recipe.calories} kcal</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-brand-sand border border-zinc-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 text-brand-terracotta">
                     <ChefHat className="w-4 h-4" />
                  </div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Level</span>
                  <span className="block font-bold text-lg text-brand-charcoal">{recipe.difficulty}</span>
                </div>
              </div>
              
              <div className="flex gap-4 pt-8 border-t border-zinc-100">
                <button className="flex-1 bg-brand-charcoal text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-terracotta transition-colors flex items-center justify-center gap-3 group shadow-lg shadow-brand-charcoal/10">
                  <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" /> Save
                </button>
                <button className="flex-1 bg-white border border-zinc-200 text-brand-charcoal py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-50 transition-colors flex items-center justify-center gap-3">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white rounded-[40px] p-8 md:p-10 border border-zinc-200/60 shadow-xl shadow-brand-charcoal/5"
            >
              <h3 className="text-2xl font-display font-bold mb-8 text-brand-charcoal">Ingredients</h3>
              <div className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-brand-sand border border-transparent hover:border-brand-terracotta/20 hover:bg-white hover:shadow-sm transition-all group cursor-pointer">
                    <div className="w-4 h-4 rounded-full border-2 border-zinc-300 group-hover:border-brand-terracotta flex items-center justify-center transition-colors">
                      <div className="w-2 h-2 rounded-full bg-brand-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-medium text-brand-charcoal text-sm">{ing.item}</span>
                    <span className="ml-auto text-sm font-bold text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-lg">
                      {ing.amount} {ing.unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex items-center gap-6 mb-12">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal">
                  Execution Strategy
                </h3>
                <div className="flex-1 h-px bg-zinc-200 mt-2" />
              </div>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[35px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
                {recipe.instructions.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active ${activeStep === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'} transition-opacity duration-500 cursor-pointer`}
                    onClick={() => setActiveStep(idx)}
                  >
                    
                    <div className="w-16 h-16 shrink-0 rounded-full border-4 border-white bg-brand-sand flex items-center justify-center shadow-lg md:mx-auto relative z-10 group-hover:scale-110 group-hover:bg-brand-charcoal transition-all duration-300">
                      <span className="font-display font-bold text-xl text-brand-charcoal group-hover:text-white transition-colors">{step.step}</span>
                    </div>

                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 md:p-8 rounded-[32px] border border-zinc-200/60 shadow-sm group-hover:shadow-xl group-hover:border-brand-terracotta/30 transition-all duration-500">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-bold text-brand-charcoal">Step {step.step}</h4>
                        <p className="text-zinc-600 leading-relaxed font-light">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
