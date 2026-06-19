import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useGame } from '../contexts/GameContext';
import { WORD_LISTS } from '../lib/gameData';
import { speakWord, playSound } from '../lib/sounds';
import { Confetti } from '../components/Confetti';
import { Volume2, ArrowRight, X, Calendar, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Daily = () => {
  const [, setLocation] = useLocation();
  const { progress, settings, daily, completeDaily } = useGame();
  
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'intro' | 'playing' | 'correct' | 'wrong' | 'completed' | 'already_done'>('intro');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (daily?.lastDate === today && daily.completed) {
      setStatus('already_done');
      return;
    }

    // Pick 5 words from unlocked levels
    const maxUnlocked = Math.max(...Object.entries(progress.levelProgress)
      .filter(([_, data]) => data.unlocked)
      .map(([lvl]) => parseInt(lvl)));
      
    let pool: string[] = [];
    for (let i = 1; i <= maxUnlocked; i++) {
      if (WORD_LISTS[i]) pool = pool.concat(WORD_LISTS[i]);
    }
    
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setWords(shuffled.slice(0, 5));
  }, [daily, progress.levelProgress]);

  const currentWord = words[currentWordIndex] || '';

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (status !== 'playing') return;

    const isCorrect = input.toLowerCase().trim() === currentWord.toLowerCase();
    
    if (isCorrect) {
      playSound('correct', settings.muted);
      setStatus('correct');

      setTimeout(() => {
        if (currentWordIndex + 1 < words.length) {
          setCurrentWordIndex(i => i + 1);
          setInput('');
          setStatus('playing');
          speakWord(words[currentWordIndex + 1], settings.muted);
        } else {
          playSound('levelup', settings.muted);
          setStatus('completed');
          completeDaily(words);
        }
      }, 1500);
    } else {
      playSound('wrong', settings.muted);
      setStatus('wrong');
      setTimeout(() => {
        setStatus('playing');
        setInput('');
        speakWord(currentWord, settings.muted);
      }, 2000);
    }
  };

  if (status === 'already_done') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-card p-8 rounded-3xl shadow-xl text-center max-w-md w-full border-4 border-accent">
          <Calendar className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-primary mb-4">All done for today!</h2>
          <p className="text-xl text-muted-foreground font-bold mb-8">Come back tomorrow for a new challenge.</p>
          <button onClick={() => setLocation('/map')} className="w-full py-4 px-6 bg-primary text-primary-foreground font-bold text-xl rounded-2xl btn-bouncy">
            Back to Map
          </button>
        </motion.div>
      </div>
    );
  }

  if (status === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-card p-8 rounded-3xl shadow-xl text-center max-w-md w-full border-4 border-secondary">
          <Gift className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-primary mb-2">Daily Challenge</h2>
          <p className="text-lg font-bold text-accent mb-6">Reward: 25 Coins + Badge</p>
          <p className="text-muted-foreground font-bold mb-8">Spell 5 random words correctly to win the daily prize!</p>
          
          <div className="flex gap-4">
            <button onClick={() => setLocation('/map')} className="flex-1 py-4 bg-muted text-muted-foreground font-bold rounded-2xl btn-bouncy">
              Later
            </button>
            <button onClick={() => { setStatus('playing'); speakWord(words[0], settings.muted); }} className="flex-1 py-4 bg-secondary text-secondary-foreground font-bold text-xl rounded-2xl btn-bouncy">
              Start
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Confetti active={true} />
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-card p-8 rounded-3xl shadow-xl text-center max-w-md w-full border-4 border-accent">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-bold text-primary mb-4">Challenge Complete!</h2>
          <p className="text-2xl font-bold text-accent mb-2">+25 Coins!</p>
          <p className="text-lg text-muted-foreground font-bold mb-8">You earned the Daily Champion badge!</p>
          
          <button onClick={() => setLocation('/map')} className="w-full py-4 px-6 bg-primary text-primary-foreground font-bold text-xl rounded-2xl btn-bouncy">
            Awesome!
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <div className="flex justify-between items-center mb-8 bg-card p-4 rounded-3xl shadow-sm">
        <button onClick={() => setLocation('/map')} className="p-2 text-muted-foreground hover:text-primary">
          <X className="w-8 h-8" />
        </button>
        <div className="font-bold text-xl text-secondary">
          Daily Challenge
        </div>
        <div className="font-bold text-xl bg-muted px-4 py-1 rounded-full">
          {currentWordIndex + 1}/5
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto">
        <button 
          onClick={() => speakWord(currentWord, settings.muted)}
          className="mb-8 p-6 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-b-8 border-secondary-foreground/10"
        >
          <Volume2 className="w-12 h-12" />
        </button>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative mb-6">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={status !== 'playing'}
              autoFocus
              className={`w-full text-center text-4xl font-bold p-6 rounded-3xl border-4 focus:outline-none transition-colors
                ${status === 'wrong' ? 'border-destructive bg-destructive/10 text-destructive' : 
                  status === 'correct' ? 'border-success bg-success/10 text-success' : 
                  'border-primary bg-card focus:border-secondary'}`}
              placeholder="Type..."
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'playing' || !input.trim()}
            className="w-full py-4 bg-primary text-primary-foreground text-2xl font-bold rounded-2xl btn-bouncy disabled:opacity-50"
          >
            Submit
          </button>
        </form>
        
        <AnimatePresence>
          {status === 'wrong' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 text-xl font-bold text-destructive"
            >
              Oops, try again!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Daily;
