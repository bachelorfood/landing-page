import { motion } from 'motion/react';
import { MessageSquare, Heart, Share2, Flame, Award, ChefHat, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommunityPage() {
  const posts = [
    {
      id: 1,
      author: 'David Kim',
      avatar: 'https://picsum.photos/seed/david/100/100',
      time: '2 hours ago',
      content: 'Finally nailed the crust on the Signature Smoked Ribeye. The key was leaving it uncovered in the fridge overnight. Total game changer.',
      image: 'https://images.unsplash.com/photo-1544025162-81152a559828?auto=format&fit=crop&q=80&w=800',
      likes: 124,
      comments: 18,
      recipe: 'Signature Smoked Ribeye'
    },
    {
      id: 2,
      author: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/seed/sarah/100/100',
      time: '5 hours ago',
      content: 'Meal prep Sunday! Got 10 portions of the Charred Miso Salmon ready for the week. Efficiency is key.',
      image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=800',
      likes: 89,
      comments: 5,
      recipe: 'Charred Miso Salmon'
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-brand-sand min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-terracotta/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 pb-10 border-b border-zinc-200">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand-charcoal font-bold text-[10px] uppercase tracking-[0.25em] mb-6 shadow-sm border border-zinc-200/50 w-max">
              <span className="w-2 h-2 rounded-full bg-brand-terracotta" />
              The Society
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-charcoal tracking-tight leading-[1.1]">
              Community <br/><span className="italic text-brand-forest font-medium">Feed.</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4"
          >
            <button className="bg-brand-charcoal text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-terracotta transition-colors shadow-lg flex items-center gap-3 group hover:scale-105 duration-300">
              New Post
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-10">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-[40px] border border-zinc-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="p-6 sm:p-8 md:p-10 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={post.avatar} alt={post.author} className="w-14 h-14 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-sage rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-lg">{post.author}</h4>
                        <span className="text-xs text-zinc-400 font-bold tracking-[0.2em] uppercase">{post.time}</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-brand-sand text-brand-charcoal border border-zinc-200 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:bg-brand-forest group-hover:text-white transition-colors duration-500 cursor-pointer self-start sm:self-auto">
                      <ChefHat className="w-4 h-4" />
                      {post.recipe}
                    </div>
                  </div>
                  
                  <p className="text-zinc-600 mb-8 leading-relaxed font-light text-lg">{post.content}</p>
                  
                  <div className="relative rounded-[32px] overflow-hidden mb-8 aspect-[16/10] bg-zinc-100">
                    <img src={post.image} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex items-center gap-6 sm:gap-8 pt-6 border-t border-zinc-100">
                    <button className="flex items-center gap-3 text-zinc-400 hover:text-brand-terracotta transition-colors group/btn">
                      <div className="p-3 rounded-full group-hover/btn:bg-brand-terracotta/10 transition-colors">
                        <Heart className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-3 text-zinc-400 hover:text-brand-forest transition-colors group/btn">
                      <div className="p-3 rounded-full group-hover/btn:bg-brand-forest/10 transition-colors">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold">{post.comments}</span>
                    </button>
                    <button className="ml-auto p-3 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-all">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10 text-left">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-10 rounded-[40px] border border-zinc-200/60 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <Flame className="w-6 h-6 text-brand-terracotta" />
                <h3 className="text-2xl font-display font-bold text-brand-charcoal">Trending</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Cast Iron Maintenance 101",
                  "Best local butchers in NY?",
                  "Miso alternatives for the Salmon?",
                  "Knife sharpening techniques"
                ].map((topic, i) => (
                  <Link key={i} to="#" className="block p-5 rounded-2xl border border-zinc-100 bg-brand-sand hover:border-brand-terracotta/30 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                    <h4 className="font-bold text-sm text-zinc-800 group-hover:text-brand-terracotta transition-colors leading-tight">{topic}</h4>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400 mt-3 block">{120 - i * 15} participants</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-brand-charcoal text-white p-8 md:p-10 rounded-[40px] shadow-xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
               <div className="flex items-center gap-3 mb-8 relative z-10">
                <Award className="w-6 h-6 text-brand-gold" />
                <h3 className="text-2xl font-display font-bold">Top Contributors</h3>
              </div>
              <div className="space-y-6 relative z-10">
                {[
                  { name: 'Michael C.', rank: 1, points: '12.4k' },
                  { name: 'Chef Elena', rank: 2, points: '9.8k' },
                  { name: 'James W.', rank: 3, points: '8.2k' }
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between group hover:bg-white/5 p-3 -mx-3 rounded-2xl transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-brand-gold font-display font-bold text-xl w-6">#{user.rank}</span>
                      <div className="flex items-center gap-4">
                        <img src={`https://picsum.photos/seed/${user.name.replace(' ', '')}/50/50`} alt={user.name} className="w-10 h-10 rounded-full border border-white/20 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                        <span className="font-bold text-sm text-white/90 group-hover:text-white transition-colors">{user.name}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-terracotta">{user.points}</span>
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
