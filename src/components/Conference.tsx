import React from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';

const categories = [
  { title: 'Business Leader' },
  { title: 'Entrepreneur' },
  { title: 'Community Impact' },
  { title: 'Technology Innovator' },
  { title: 'Education Excellence' },
  { title: 'Healthcare Champion' },
  { title: 'Arts & Culture' },
  { title: 'Legal & Advocacy' },
  { title: 'Trade & Investment' },
  { title: 'Youth Excellence' }
];

export function ConferenceAndAwards() {
  return (
    <section className="bg-dark-soft border-t border-white/5 py-24 px-6 md:px-12" id="awards">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-sans text-[10px] tracking-[5px] uppercase text-gold flex items-center gap-4 mb-5">
              <span className="w-8 h-px bg-gold"></span>
              Recognition
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.15]">
              Award <span className="text-gold">Categories</span>
            </h2>
          </motion.div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#vote" 
            className="inline-block px-8 py-3 bg-gold hover:bg-gold-light text-dark font-sans text-xs tracking-[2px] font-bold transition-all rounded-lg shadow-lg"
          >
            VOTE NOW
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-dark-card border border-white/5 rounded-xl p-6 md:p-8 text-center transition-all duration-300 hover:border-gold/40 hover:-translate-y-2 relative group overflow-hidden shadow-xl"
            >
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-[60px] h-[60px] rounded-full mx-auto mb-4 border border-gold/20 flex items-center justify-center bg-gold/5 group-hover:scale-115 group-hover:border-gold group-hover:bg-gold/15 transition-all duration-300 shadow-lg">
                <Trophy className="w-6 h-6 text-gold group-hover:text-gold-light transition-colors" />
              </div>
              <h4 className="font-serif text-[15px] tracking-[1px] text-ivory leading-relaxed">{cat.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
