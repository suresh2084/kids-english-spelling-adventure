import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { WORD_LISTS } from '../lib/gameData';
import { speakWord, playSound } from '../lib/sounds';
import { Confetti } from '../components/Confetti';
import { Volume2, Heart, Coins, ArrowRight, X, Star } from 'lucide-react';

const Game = () => {
  const [location, setLocation] = useLocation();
  const { progress, updateProgress, settings, awardBadge } = useGame();
  
  const searchParams = new URLSearchParams(window.location.search);
  const levelId = parseInt(searchParams.get('level') || '1');
  
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [hearts, setHearts] = useState(3);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong' | 'break' | 'completed'>('playing');
  const [breakTimer, setBreakTimer] = useState(30);
  // wordHeard tracks whether the kid has tapped the speaker for the current word.
  // Speech synthesis REQUIRES a direct user gesture — auto-play from useEffect is
  // silently blocked by all modern browsers.
  const [wordHeard, setWordHeard] = useState(false);

  useEffect(() => {
    const levelWords = WORD_LISTS[levelId] || WORD_LISTS[1];
    const shuffled = [...levelWords].sort(() => 0.5 - Math.random());
    setWords(shuffled.slice(0, 10));
    setCurrentWordIndex(0);
    setHearts(3);
    setStatus('playing');
    setWordHeard(false);
  }, [levelId]);

  // Reset wordHeard whenever we advance to the next word
  useEffect(() => {
    setWordHeard(false);
  }, [currentWordIndex]);

  useEffect(() => {
    if (status === 'break' && breakTimer > 0) {
      const timer = setTimeout(() => setBreakTimer(b => b - 1), 1000);
      return () => clearTimeout(timer);
    } else if (status === 'break' && breakTimer === 0) {
      setHearts(3);
      setStatus('playing');
      setBreakTimer(30);
    }
  }, [status, breakTimer]);

  const currentWord = words[currentWordIndex] || '';

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (status !== 'playing') return;

    const isCorrect = input.toLowerCase().trim() === currentWord.toLowerCase();
    
    updateProgress({ totalAttempted: progress.totalAttempted + 1 });

    if (isCorrect) {
      playSound('correct', settings.muted);
      setStatus('correct');
      updateProgress({ 
        totalCorrect: progress.totalCorrect + 1,
        coins: progress.coins + 5
      });
      
      const levelProg = progress.levelProgress[levelId] || { correct: 0, unlocked: true };
      const newCorrect = levelProg.correct + 1;
      
      updateProgress({
        levelProgress: {
          ...progress.levelProgress,
          [levelId]: { ...levelProg, correct: newCorrect }
        }
      });

      // Badges
      if (progress.totalCorrect === 0) awardBadge('first_word');
      if (progress.totalCorrect + 1 === 10) awardBadge('10_correct');
      if (progress.totalCorrect + 1 === 50) awardBadge('50_correct');

      setTimeout(() => {
        if (currentWordIndex + 1 < words.length) {
          setCurrentWordIndex(i => i + 1);
          setInput('');
          setStatus('playing');
        } else {
          // Level complete
          playSound('levelup', settings.muted);
          setStatus('completed');
          updateProgress({ coins: progress.coins + 50 });
          awardBadge('level_master');
          
          // Unlock next level
          if (levelId < 5) {
            updateProgress({
              levelProgress: {
                ...progress.levelProgress,
                [levelId]: { correct: 10, unlocked: true },
                [levelId + 1]: { correct: 0, unlocked: true }
              }
            });
          } else {
            awardBadge('super_speller');
          }
        }
      }, 2000);

    } else {
      playSound('wrong', settings.muted);
      const newHearts = hearts - 1;
      setHearts(newHearts);
      
      if (newHearts <= 0) {
        setStatus('break');
      } else {
        setStatus('wrong');
        setTimeout(() => {
          setStatus('playing');
          setInput('');
        }, 3000);
      }
    }
  };

  if (words.length === 0) return null;

  if (status === 'break') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-8 rounded-3xl shadow-xl text-center max-w-md w-full"
        >
          <div className="text-6xl mb-4">💤</div>
          <h2 className="text-3xl font-bold text-primary mb-4">Take a short break!</h2>
          <p className="text-xl mb-6">Let's rest our brains and try again soon.</p>
          <div className="text-4xl font-bold text-accent mb-8">{breakTimer}s</div>
        </motion.div>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Confetti active={true} />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-8 rounded-3xl shadow-xl text-center max-w-md w-full border-4 border-accent"
        >
          <div className="text-6xl mb-4 text-accent"><Star fill="currentColor" /></div>
          <h2 className="text-4xl font-bold text-primary mb-4">Level Complete!</h2>
          <p className="text-2xl font-bold text-secondary mb-2">+50 Bonus Coins!</p>
          <p className="text-lg text-muted-foreground mb-8">You are doing amazing!</p>
          
          <button
            onClick={() => setLocation('/map')}
            className="w-full py-4 px-6 bg-primary text-primary-foreground font-bold text-xl rounded-2xl btn-bouncy"
          >
            Back to Map
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <Confetti active={status === 'correct'} />
      
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-8 bg-card p-4 rounded-3xl shadow-sm">
        <button onClick={() => setLocation('/map')} className="p-2 text-muted-foreground hover:text-primary">
          <X className="w-8 h-8" />
        </button>
        
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Heart 
              key={i} 
              className={`w-8 h-8 ${i < hearts ? 'text-secondary fill-secondary' : 'text-muted-foreground/30'}`} 
            />
          ))}
        </div>
        
        <div className="flex items-center gap-2 font-bold text-xl text-accent">
          <Coins className="w-6 h-6 fill-accent" />
          {progress.coins}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-card rounded-full h-6 mb-8 border-2 border-border overflow-hidden relative">
        <motion.div 
          className="absolute left-0 top-0 bottom-0 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(currentWordIndex / words.length) * 100}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold mix-blend-difference text-white">
          {currentWordIndex} / {words.length}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto">

        {/* Speaker button — pulsing when word not yet heard */}
        <div className="mb-6 flex flex-col items-center">
          <motion.button
            data-testid="button-speak-word"
            onClick={() => {
              speakWord(currentWord, settings.muted);
              setWordHeard(true);
            }}
            animate={!wordHeard ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={!wordHeard ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } : {}}
            className="p-6 bg-accent text-accent-foreground rounded-full shadow-lg active:scale-95 transition-all border-b-8 border-accent-foreground/10"
          >
            <Volume2 className="w-14 h-14" />
          </motion.button>
          <AnimatePresence>
            {!wordHeard && (
              <motion.p
                key="tap-hint"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-lg font-bold text-accent"
              >
                Tap to hear the word!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative mb-6">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={status !== 'playing' || !wordHeard}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className={`w-full text-center text-4xl md:text-5xl font-bold p-6 rounded-3xl border-4 shadow-sm focus:outline-none transition-colors
                ${!wordHeard ? 'opacity-40 cursor-not-allowed border-border bg-card' :
                  status === 'wrong' ? 'border-destructive bg-destructive/10 text-destructive' : 
                  status === 'correct' ? 'border-success bg-success/10 text-success' : 
                  'border-primary bg-card focus:border-accent'}`}
              placeholder={wordHeard ? 'Type here...' : 'Hear the word first!'}
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'playing' || !input.trim() || !wordHeard}
            className="w-full py-4 bg-primary text-primary-foreground text-2xl font-bold rounded-2xl btn-bouncy disabled:opacity-50 flex items-center justify-center gap-2 border-b-8 border-primary-foreground/20"
          >
            Check Answer <ArrowRight className="w-8 h-8" />
          </button>
        </form>

        <AnimatePresence>
          {status === 'wrong' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <p className="text-xl font-bold text-destructive mb-2">Great try! Let's learn together.</p>
              <p className="text-2xl font-bold text-foreground">The word is: <span className="text-primary uppercase tracking-widest">{currentWord}</span></p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Game;
