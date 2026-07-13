import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Timer, Users, Flame, ChefHat, ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import { recipes } from '../data';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-sand">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-brand-charcoal mb-4">Recipe Not Found</h2>
          <Link to="/" className="btn btn-primary">Back to Kitchen</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-sand">
      {/* Hero Header Banner */}
      <div className="relative h-[65vh] min-h-[450px] bg-brand-charcoal overflow-hidden flex items-end pb-12 sm:pb-20">
        <div className="absolute inset-0">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/45 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 text-white/60 hover:text-white mb-8 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                <ArrowLeft className="w-4 h-4" />
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
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
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
              className="bg-white rounded-[40px] p-8 md:p-10 border border-zinc-200/60 shadow-xl shadow-brand-charcoal/5 text-left"
            >
              <h3 className="text-xl font-display font-bold text-brand-charcoal mb-6 flex items-center gap-3">
                <ChefHat className="w-5 h-5 text-brand-terracotta" />
                Meet the Chef
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={`https://picsum.photos/seed/${recipe.author.replace(' ', '')}/100/100`} 
                  alt={recipe.author} 
                  className="w-16 h-16 rounded-2xl object-cover border border-zinc-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-lg text-brand-charcoal">{recipe.author}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    <span className="text-xs font-bold text-zinc-600">4.9 · Verified Chef</span>
                  </div>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-light">
                Every order supports {recipe.author} and helps sustain authentic regional Indian cooking heritage.
              </p>
              <Link to="/chefs" className="btn btn-outline w-full justify-center text-xs uppercase tracking-wider py-4 rounded-2xl">
                Chef Profile & Reels
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-8 space-y-12 text-left">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[40px] p-8 md:p-12 border border-zinc-200/60 shadow-xl shadow-brand-charcoal/5"
            >
              <h2 className="text-3xl font-display font-bold text-brand-charcoal mb-8 border-b border-zinc-100 pb-6">Ingredients</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {recipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-brand-sand border border-transparent hover:border-brand-terracotta/20 hover:bg-white hover:shadow-sm transition-all group cursor-pointer">
                    <div className="w-4 h-4 rounded-full border-2 border-zinc-300 group-hover:border-brand-terracotta flex items-center justify-center transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <span className="block font-bold text-brand-charcoal text-sm">{ing.item}</span>
                      <span className="block text-xs text-zinc-400 font-medium">{ing.amount} {ing.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-[40px] p-8 md:p-12 border border-zinc-200/60 shadow-xl shadow-brand-charcoal/5"
            >
              <h2 className="text-3xl font-display font-bold text-brand-charcoal mb-10 border-b border-zinc-100 pb-6">Preparation Steps</h2>
              <div className="relative border-l-2 border-zinc-100 pl-6 sm:pl-8 ml-4 space-y-12">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[41px] sm:-left-[49px] w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-brand-sand flex items-center justify-center shadow-lg md:mx-auto relative z-10 group-hover:scale-110 group-hover:bg-brand-charcoal transition-all duration-300">
                      <span className="font-display font-bold text-brand-terracotta text-sm sm:text-base group-hover:text-brand-gold transition-colors">{step.step}</span>
                    </div>
                    <div className="w-full bg-white p-6 md:p-8 rounded-[32px] border border-zinc-200/60 shadow-sm group-hover:shadow-xl group-hover:border-brand-terracotta/30 transition-all duration-500">
                      <p className="text-zinc-600 leading-relaxed font-light text-base sm:text-lg">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
