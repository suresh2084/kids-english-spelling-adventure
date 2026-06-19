import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { AvatarPicker } from '../components/Avatar';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
  const [, setLocation] = useLocation();
  const { profile, updateProfile } = useGame();
  
  const [name, setName] = useState(profile?.name || '');
  const [avatarId, setAvatarId] = useState(profile?.avatarId || 'fox');

  const handleSave = () => {
    if (!name.trim()) return;
    
    updateProfile({
      name: name.trim(),
      avatarId,
      createdAt: profile?.createdAt || Date.now()
    });
    
    setLocation('/map');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-md mx-auto relative pt-12">
        <button 
          onClick={() => setLocation('/')}
          className="absolute top-0 left-0 p-3 bg-card rounded-full shadow-sm text-primary hover:scale-110 transition-transform"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-6 md:p-8 rounded-3xl shadow-xl border-4 border-card-border"
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">Create Profile</h1>
          
          <div className="mb-8">
            <label className="block text-lg font-bold mb-3 text-muted-foreground">What's your name?</label>
            <input 
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full text-2xl p-4 rounded-2xl border-4 border-input bg-background font-bold text-center focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
              maxLength={15}
            />
          </div>

          <div className="mb-8">
            <label className="block text-lg font-bold mb-3 text-muted-foreground">Pick your character!</label>
            <AvatarPicker selected={avatarId} onSelect={setAvatarId} />
          </div>

          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full py-4 px-6 bg-secondary text-secondary-foreground font-bold text-xl rounded-2xl btn-bouncy disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
          >
            Let's Go!
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
