import React from 'react';
import { motion } from 'motion/react';

const winners = [
  {
    year: '2026',
    name: 'Leila Lopes',
    category: 'Beauty, Fashion & Social Advocacy',
    description: 'Former Miss Universe 2011, beauty pageants, brand ambassadorship, philanthropy, HIV/AIDS awareness, and pageant administration. She currently leads the Miss Angola organization.',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2026',
    name: 'Maria Borges',
    category: 'Fashion & Modeling',
    description: "International fashion model, luxury brand ambassador, runway modeling, fashion campaigns, and media. She has worked with major global fashion houses and was a Victoria's Secret model.",
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2026',
    name: 'Paulo Flores',
    category: 'Music & Entertainment',
    description: "Musician, singer, songwriter, cultural ambassador, and one of Angola's most influential Semba artists.",
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2026',
    name: 'Ivanilson Machado',
    category: 'Media, Journalism & Broadcasting',
    description: 'Chief Executive Officer of Pumangol. Television, radio, journalism, media production, communications, and public engagement.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2026',
    name: 'Jean-Claude Bastos de Morais',
    category: 'Investment Management, Finance & Venture Capital',
    description: 'Entrepreneur, private equity, infrastructure investment, asset management, innovation funding, and strategic investment across Africa through Quantum Global.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2026',
    name: 'Agostinho Kapaia',
    category: 'Chairman of the Board and CEO of OPAIA Group SA',
    description: 'Entrepreneur, private equity, Automotive and Distibution, asset management, innovation funding, and strategic investment across Africa through Quantum Global.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  }
];

export function Gallery() {
  return (
    <section className="bg-dark-soft py-24 px-6 md:px-12 border-t border-gold/10" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="font-display text-[11px] tracking-[5px] uppercase text-gold/80 flex items-center gap-4 mb-5">
              <span className="w-8 h-px bg-gold"></span>
              LEGACY & EXCELLENCE
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] text-ivory">
              Hall of <span className="text-gold">Fame</span>
            </h2>
          </motion.div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#all" 
            className="inline-flex items-center gap-2 text-gold font-sans text-xs tracking-[2px] uppercase opacity-70 hover:opacity-100 transition-opacity"
          >
            Explore Complete Archive →
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.map((winner, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className="group relative overflow-hidden bg-dark-card rounded-xl border border-white/5 transition-all duration-300 hover:border-gold/30"
             >
               <div className="aspect-[4/5] overflow-hidden relative">
                 {/* Dark overlay that deepens on hover to keep description text highly legible */}
                 <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/50 to-transparent z-10 opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
                 <img src={winner.img} alt={winner.name} className="w-full h-full object-cover transform duration-750 opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all" />
                 
                 <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-dark/80 backdrop-blur-sm border border-white/10 text-gold font-sans text-[10px] tracking-widest leading-none">
                   {winner.year}
                 </div>

                 <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-sans text-[10px] tracking-[3px] uppercase text-gold mb-1">{winner.category}</p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ivory mb-2 leading-tight">{winner.name}</h3>
                    <p className="text-xs text-dim leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4 line-clamp-4">
                      {winner.description}
                    </p>
                    <div className="w-8 h-[2px] bg-gold transition-all duration-300 group-hover:w-16"></div>
                 </div>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
