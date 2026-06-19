import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { LEVELS } from '../lib/gameData';
import { Star, Lock, Play } from 'lucide-react';

const MapScreen = () => {
  const [, setLocation] = useLocation();
  const { progress } = useGame();

  const handleLevelClick = (levelId: number) => {
    if (progress.levelProgress[levelId]?.unlocked) {
      setLocation(`/game?level=${levelId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-8 drop-shadow-sm">Adventure Map</h1>
        
        <div className="relative">
          {/* Path line connecting levels */}
          <div className="absolute left-1/2 top-10 bottom-10 w-4 bg-primary/20 -translate-x-1/2 rounded-full" />
          
          <div className="flex flex-col gap-12 relative z-10">
            {LEVELS.map((level, i) => {
              const info = progress.levelProgress[level.id];
              const isUnlocked = info?.unlocked;
              const isCompleted = info?.correct >= 10;
              const isCurrent = progress.currentLevel === level.id;
              
              // Alternate left/right alignment
              const alignLeft = i % 2 === 0;

              return (
                <motion.div 
                  key={level.id}
                  initial={{ opacity: 0, x: alignLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex ${alignLeft ? 'justify-start' : 'justify-end'} px-4`}
                >
                  <button
                    onClick={() => handleLevelClick(level.id)}
                    disabled={!isUnlocked}
                    className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center border-8 transition-transform
                      ${isCurrent ? 'scale-110 animate-pulse border-accent bg-card' : 'hover:scale-105 border-card-border bg-card'}
                      ${!isUnlocked ? 'opacity-50 cursor-not-allowed grayscale' : 'shadow-xl'}
                    `}
                  >
                    {isCompleted ? (
                      <Star className="w-12 h-12 text-accent fill-accent mb-1" />
                    ) : isUnlocked ? (
                      <Play className="w-10 h-10 text-primary mb-1 ml-1" fill="currentColor" />
                    ) : (
                      <Lock className="w-10 h-10 text-muted-foreground mb-1" />
                    )}
                    <span className="font-bold text-sm bg-background/80 px-2 py-1 rounded-full">{level.id}</span>
                    
                    {/* Level Title Popup on hover/focus - simplified for mobile */}
                    <div className="absolute -bottom-8 whitespace-nowrap font-bold text-foreground bg-card px-3 py-1 rounded-full shadow-sm text-sm border-2 border-border">
                      {level.title}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
