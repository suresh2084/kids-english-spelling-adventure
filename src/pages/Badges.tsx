import React from 'react';
import { useGame } from '../contexts/GameContext';
import { BADGES } from '../lib/gameData';
import { Trophy, Star, Shield, Medal, Award, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  'first_word': Star,
  '10_correct': Shield,
  '50_correct': Medal,
  'level_master': Trophy,
  'super_speller': Crown,
  'daily_champion': Award,
};

const Badges = () => {
  const { badges } = useGame();

  return (
    <div className="min-h-screen bg-background p-4 pt-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-2">My Badges</h1>
        <p className="text-center text-muted-foreground font-bold mb-8">
          You have earned {badges.length} of {BADGES.length} badges!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {BADGES.map((badge, i) => {
            const earned = badges.includes(badge.id);
            const Icon = iconMap[badge.id] || Trophy;

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-3xl border-4 flex flex-col items-center text-center relative overflow-hidden
                  ${earned ? 'bg-card border-secondary shadow-lg' : 'bg-muted/50 border-muted grayscale'}`}
              >
                {earned && (
                  <div className="absolute inset-0 bg-secondary/5 -z-10" />
                )}
                
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 
                  ${earned ? 'bg-secondary text-secondary-foreground shadow-md' : 'bg-muted-foreground/20 text-muted-foreground'}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className={`font-bold text-lg mb-2 ${earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {badge.title}
                </h3>
                <p className={`text-sm ${earned ? 'text-muted-foreground font-bold' : 'text-muted-foreground'}`}>
                  {badge.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Badges;
