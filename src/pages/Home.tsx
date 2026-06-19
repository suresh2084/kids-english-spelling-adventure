import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { Avatar } from '../components/Avatar';

const Home = () => {
  const [, setLocation] = useLocation();
  const { profile } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="z-10 text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4 drop-shadow-md">
          Spelling
          <br />
          <span className="text-secondary">Adventure!</span>
        </h1>
        <p className="text-xl text-muted-foreground font-bold">Learn to spell, have fun!</p>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="z-10 w-full max-w-sm"
      >
        {profile ? (
          <div className="bg-card p-6 rounded-3xl shadow-xl border-4 border-primary/20 flex flex-col items-center mb-6">
            <Avatar avatarId={profile.avatarId} size="lg" className="mb-4" />
            <h2 className="text-2xl font-bold mb-6">Welcome back, {profile.name}!</h2>
            <button
              onClick={() => setLocation('/map')}
              className="w-full py-4 px-6 bg-primary text-primary-foreground font-bold text-xl rounded-2xl btn-bouncy"
            >
              Continue Adventure
            </button>
            <button
              onClick={() => setLocation('/profile')}
              className="mt-4 text-muted-foreground font-bold hover:text-primary transition-colors"
            >
              Switch Profile
            </button>
          </div>
        ) : (
          <button
            onClick={() => setLocation('/profile')}
            className="w-full py-6 px-8 bg-accent text-accent-foreground font-bold text-3xl rounded-3xl btn-bouncy border-b-8 border-accent-foreground/20"
          >
            Start Adventure!
          </button>
        )}
      </motion.div>
      
      <button 
        onClick={() => setLocation('/parent')}
        className="absolute top-4 right-4 text-muted-foreground hover:text-primary font-bold p-2"
      >
        Parents
      </button>
    </div>
  );
};

export default Home;
