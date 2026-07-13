import { motion } from 'motion/react';
import { Calendar, Plus, ChefHat, Sparkles, ArrowRight, Timer } from 'lucide-react';
import { recipes } from '../data';

export default function MealPlannerPage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <div className="pt-32 pb-20 bg-brand-sand min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-terracotta/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 pb-10 border-b border-zinc-200">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand-charcoal font-bold text-[10px] uppercase tracking-[0.25em] mb-6 shadow-sm border border-zinc-200/50 w-max">
              <span className="w-2 h-2 rounded-full bg-brand-terracotta" />
              Strategic Planning
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-charcoal tracking-tight leading-[1.1]">
              Weekly <br/><span className="italic text-brand-forest font-medium">Blueprint.</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4"
          >
            <button className="bg-white text-brand-charcoal px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-50 transition-colors border border-zinc-200 shadow-sm flex items-center justify-center">
              Clear All
            </button>
            <button className="bg-brand-charcoal text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-terracotta transition-colors shadow-lg flex items-center gap-3 group hover:scale-105 duration-300">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Auto-Generate
            </button>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-7 gap-4 md:gap-6"
        >
          {days.map((day, idx) => (
            <motion.div 
              key={day}
              variants={item}
              className="bg-white rounded-[40px] p-6 border border-zinc-200/60 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full min-h-[400px]"
            >
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-100">
                <div className="w-10 h-10 rounded-2xl bg-brand-sand flex items-center justify-center text-brand-charcoal font-bold group-hover:bg-brand-terracotta group-hover:text-white transition-colors duration-500 shadow-sm">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-charcoal tracking-tight">{day.substring(0, 3)}</h3>
              </div>
              
              <div className="flex-1 space-y-4">
                {idx === 0 || idx === 3 ? (
                  <div className="relative rounded-[24px] overflow-hidden group/item cursor-pointer h-[160px]">
                    <img src={recipes[idx === 0 ? 0 : 1].image} alt="Meal" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/40 to-transparent p-5 flex flex-col justify-end opacity-90 group-hover/item:opacity-100 transition-opacity">
                      <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-2 inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded-md w-max">Dinner</span>
                      <p className="text-white font-bold text-sm leading-tight group-hover/item:text-brand-gold transition-colors">{recipes[idx === 0 ? 0 : 1].title}</p>
                      
                      <div className="overflow-hidden max-h-0 group-hover/item:max-h-20 transition-all duration-500 ease-in-out opacity-0 group-hover/item:opacity-100 mt-0 group-hover/item:mt-3 flex items-center gap-3">
                         <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300">
                           <Timer className="w-3 h-3 text-brand-terracotta" /> {recipes[idx === 0 ? 0 : 1].time}
                         </div>
                         <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300">
                           <Sparkles className="w-3 h-3 text-brand-gold" /> {recipes[idx === 0 ? 0 : 1].calories} kcal
                         </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button className="w-full h-[160px] rounded-[24px] border border-dashed border-zinc-300 flex flex-col items-center justify-center gap-3 text-zinc-400 hover:text-brand-terracotta hover:border-brand-terracotta hover:bg-brand-terracotta/5 transition-all duration-300 group/btn bg-brand-sand/50">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/btn:scale-110 transition-transform duration-300">
                       <Plus className="w-5 h-5 text-brand-charcoal group-hover/btn:text-brand-terracotta transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Plan Meal</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-brand-charcoal rounded-[48px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-terracotta/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-forest/30 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
            <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner">
              <ChefHat className="w-12 h-12 text-brand-gold" />
            </div>
            <div>
              <h3 className="text-3xl font-display font-bold text-white mb-3">Automated Grocery List</h3>
              <p className="text-zinc-400 font-light text-lg">Your planned meals require <span className="text-white font-medium">24 distinct ingredients</span>.</p>
            </div>
          </div>
          
          <button className="w-full md:w-auto bg-brand-terracotta text-white px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-brand-terracotta hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4 group relative z-10 shadow-lg">
            Export to Cart
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
