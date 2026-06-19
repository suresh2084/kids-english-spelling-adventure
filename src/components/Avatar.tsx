import React from 'react';
import { useGame } from '../contexts/GameContext';
import { User, Sparkles, Star } from 'lucide-react';

const avatars = [
  { id: 'fox', emoji: '🦊', color: 'bg-orange-500' },
  { id: 'bear', emoji: '🐻', color: 'bg-yellow-700' },
  { id: 'panda', emoji: '🐼', color: 'bg-zinc-800' },
  { id: 'tiger', emoji: '🐯', color: 'bg-orange-400' },
  { id: 'lion', emoji: '🦁', color: 'bg-yellow-500' },
  { id: 'frog', emoji: '🐸', color: 'bg-green-500' },
  { id: 'monkey', emoji: '🐵', color: 'bg-amber-600' },
  { id: 'penguin', emoji: '🐧', color: 'bg-slate-800' },
  { id: 'unicorn', emoji: '🦄', color: 'bg-pink-400' },
  { id: 'dragon', emoji: '🐉', color: 'bg-emerald-500' },
  { id: 'alien', emoji: '👽', color: 'bg-lime-400' },
  { id: 'robot', emoji: '🤖', color: 'bg-slate-400' },
];

export const Avatar: React.FC<{ avatarId: string, size?: 'sm' | 'md' | 'lg' | 'xl', className?: string }> = ({ avatarId, size = 'md', className = '' }) => {
  const { inventory } = useGame();
  const avatar = avatars.find(a => a.id === avatarId) || avatars[0];
  
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
    xl: 'w-32 h-32 text-6xl'
  };

  const hasHatCrown = inventory.includes('hat_crown');
  const hasHatPirate = inventory.includes('hat_pirate');
  const hasHatWizard = inventory.includes('hat_wizard');

  return (
    <div className={`relative flex items-center justify-center rounded-full border-4 border-white shadow-md ${avatar.color} ${sizeClasses[size]} ${className}`}>
      {/* We use generic icons instead of emojis per constraint, or text representations if SVG not ready */}
      {/* Since constraint says no emojis, we will map them to lucide icons or simple shapes */}
      <User className="text-white w-1/2 h-1/2" />
      
      {/* Hats */}
      {hasHatCrown && <div className="absolute -top-1/4 text-yellow-400"><Star fill="currentColor" /></div>}
      {hasHatWizard && <div className="absolute -top-1/4 text-purple-600"><Sparkles /></div>}
    </div>
  );
};

export const AvatarPicker: React.FC<{ selected: string, onSelect: (id: string) => void }> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {avatars.slice(0, 8).map(a => (
        <button
          key={a.id}
          onClick={() => onSelect(a.id)}
          className={`flex flex-col items-center p-2 rounded-2xl transition-transform ${selected === a.id ? 'scale-110 ring-4 ring-primary' : 'hover:scale-105'}`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${a.color}`}>
            <User className="text-white w-8 h-8" />
          </div>
        </button>
      ))}
    </div>
  );
};
