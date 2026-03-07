import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Samantha R.', role: 'Project Director', text: 'Rahil built our platform from scratch. The performance and UX are stunning.', avatar: 'https://i.pravatar.cc/100?u=samantha' },
  { name: 'David L.', role: 'Product Manager', text: 'Exceptional full-stack skills. The 3D integration specifically wowed our clients.', avatar: 'https://i.pravatar.cc/100?u=david' },
  { name: 'Amid P.', role: 'Tech Lead', text: 'Clean code and great communication. Highly recommend for any complex React project.', avatar: 'https://i.pravatar.cc/100?u=amid' },
  { name: 'Amit P.', role: 'Founder', text: 'The best developer we have worked with. Scaled our app to 10k users in a month.', avatar: 'https://i.pravatar.cc/100?u=amit' },
];

const Reviews = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card-premium p-10 h-full"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold italic">Client Reviews</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-[#0B0A25]/80 border border-white/15 p-6 rounded-2xl flex flex-col gap-4 group hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(217,70,239,0.2)] transition-all duration-300">
            <div className="flex items-center gap-3">
              <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full border border-white/10" />
              <div>
                <div className="text-xs font-bold text-white">{review.name}</div>
                <div className="text-[10px] text-[#8E91B3]">{review.role}</div>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-[#f59e0b] text-[#f59e0b]" />)}
            </div>
            <p className="text-[10px] text-text-muted leading-relaxed italic line-clamp-2">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>
      {/* Signature & Lighting */}
      <div className="glass-shine"></div>
      <div className="neon-strip-blue"></div>
    </motion.div>
  );
};

export default Reviews;
