import React, { createContext, useContext, useEffect, useState } from 'react';
import { Profile, Progress, Settings, Daily, defaultProgress, defaultSettings, getStorage, setStorage } from '../lib/storage';

interface GameState {
  profile: Profile | null;
  progress: Progress;
  settings: Settings;
  inventory: string[];
  badges: string[];
  daily: Daily | null;
  
  updateProfile: (profile: Profile) => void;
  updateProgress: (progress: Partial<Progress>) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  unlockItem: (itemId: string, cost: number) => boolean;
  awardBadge: (badgeId: string) => void;
  completeDaily: (words: string[]) => void;
}

const GameContext = createContext<GameState | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};

export const GameProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(() => getStorage('profile', null));
  const [progress, setProgress] = useState<Progress>(() => getStorage('progress', defaultProgress));
  const [settings, setSettings] = useState<Settings>(() => getStorage('settings', defaultSettings));
  const [inventory, setInventory] = useState<string[]>(() => getStorage('inventory', []));
  const [badges, setBadges] = useState<string[]>(() => getStorage('badges', []));
  const [daily, setDaily] = useState<Daily | null>(() => getStorage('daily', null));

  // Initialize session timer
  useEffect(() => {
    const startTime = Date.now();
    let interval: NodeJS.Timeout;
    
    interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = { ...prev, timeSpent: prev.timeSpent + 1 };
        setStorage('progress', newProgress);
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sync settings to document classes
  useEffect(() => {
    if (settings.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    if (settings.highContrast) document.documentElement.classList.add('high-contrast');
    else document.documentElement.classList.remove('high-contrast');

    if (settings.dyslexicFont) document.documentElement.classList.add('dyslexic');
    else document.documentElement.classList.remove('dyslexic');
  }, [settings]);

  const updateProfile = (p: Profile) => {
    setProfile(p);
    setStorage('profile', p);
  };

  const updateProgress = (p: Partial<Progress>) => {
    setProgress(prev => {
      const next = { ...prev, ...p };
      setStorage('progress', next);
      return next;
    });
  };

  const updateSettings = (s: Partial<Settings>) => {
    setSettings(prev => {
      const next = { ...prev, ...s };
      setStorage('settings', next);
      return next;
    });
  };

  const unlockItem = (itemId: string, cost: number) => {
    if (progress.coins >= cost && !inventory.includes(itemId)) {
      updateProgress({ coins: progress.coins - cost });
      setInventory(prev => {
        const next = [...prev, itemId];
        setStorage('inventory', next);
        return next;
      });
      return true;
    }
    return false;
  };

  const awardBadge = (badgeId: string) => {
    if (!badges.includes(badgeId)) {
      setBadges(prev => {
        const next = [...prev, badgeId];
        setStorage('badges', next);
        return next;
      });
    }
  };

  const completeDaily = (words: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    const newDaily = { lastDate: today, completed: true, words };
    setDaily(newDaily);
    setStorage('daily', newDaily);
    updateProgress({ coins: progress.coins + 25 });
    awardBadge('daily_champion');
  };

  return (
    <GameContext.Provider value={{
      profile, progress, settings, inventory, badges, daily,
      updateProfile, updateProgress, updateSettings, unlockItem, awardBadge, completeDaily
    }}>
      {children}
    </GameContext.Provider>
  );
};
