import { FC } from 'react';
import { motion } from 'motion/react';
import { Timer, Star, ChefHat, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
  dark?: boolean;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe, index = 0, dark = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-[48px] overflow-hidden transition-all duration-700 cursor-pointer flex flex-col ${
        dark 
          ? 'bg-brand-forest border border-white/10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]' 
          : 'bg-white border border-zinc-100/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(30,57,50,0.15)]'
      }`}
    >
      <Link to={`/recipe/${recipe.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] m-4 mb-0">
          <motion.img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="absolute top-6 left-6 flex flex-col gap-1.5 z-10 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1]">
            {recipe.ingredients.slice(0, 3).map((ing, i) => (
              <div key={i} className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                {ing.item}
              </div>
            ))}
            {recipe.ingredients.length > 3 && (
              <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] text-white w-max">
                + {recipe.ingredients.length - 3} more
              </div>
            )}
          </div>
          
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
            <button 
              onClick={(e) => { e.preventDefault(); }}
              className="w-12 h-12 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center text-zinc-400 hover:text-brand-terracotta hover:scale-110 transition-all duration-300 shadow-xl"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1] flex items-center justify-between z-10">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              {recipe.category}
            </span>
            <div className="w-12 h-12 bg-brand-terracotta text-white rounded-2xl flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
        
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-full">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Elite Recipe</span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {recipe.difficulty}
            </span>
          </div>
          
          <h3 className={`text-2xl font-display font-bold mb-6 transition-colors duration-300 leading-tight flex-1 ${
            dark ? 'text-white group-hover:text-brand-gold' : 'group-hover:text-brand-terracotta'
          }`}>
            {recipe.title}
          </h3>
          
          <div className={`flex items-center justify-between pt-6 border-t ${dark ? 'border-white/10' : 'border-zinc-100/80'}`}>
            <div className={`flex items-center gap-2 ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              <Timer className={`w-4 h-4 ${dark ? 'text-brand-gold' : 'text-brand-terracotta'}`} />
              <span className="text-xs font-bold uppercase tracking-widest">{recipe.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {recipe.author}
              </span>
              <div className={`w-8 h-8 rounded-full overflow-hidden shadow-sm border ${dark ? 'border-white/20' : 'border-zinc-200'}`}>
                 <img src={`https://picsum.photos/seed/${recipe.author.replace(' ', '')}/50/50`} alt={recipe.author} referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
