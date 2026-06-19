import React from 'react';
import { useGame } from '../contexts/GameContext';
import { VolumeX, Volume2, Eye, Moon, Type, Trash2 } from 'lucide-react';
import { useLocation } from 'wouter';

const Settings = () => {
  const [, setLocation] = useLocation();
  const { settings, updateSettings, updateProgress } = useGame();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.removeItem('spellingAdventure_progress');
      localStorage.removeItem('spellingAdventure_badges');
      localStorage.removeItem('spellingAdventure_inventory');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-8">
      <div className="max-w-xl mx-auto bg-card p-6 md:p-8 rounded-3xl shadow-sm border-2 border-border">
        <h1 className="text-3xl font-bold text-primary mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
            <div className="flex items-center gap-3">
              {settings.muted ? <VolumeX className="w-6 h-6 text-muted-foreground" /> : <Volume2 className="w-6 h-6 text-primary" />}
              <div>
                <h3 className="font-bold text-lg">Sound Effects</h3>
                <p className="text-sm text-muted-foreground font-medium">Play sounds and speech</p>
              </div>
            </div>
            <button 
              onClick={() => updateSettings({ muted: !settings.muted })}
              className={`w-14 h-8 rounded-full transition-colors relative ${!settings.muted ? 'bg-success' : 'bg-muted-foreground/30'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${!settings.muted ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
            <div className="flex items-center gap-3">
              <Type className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-bold text-lg">Dyslexic Font</h3>
                <p className="text-sm text-muted-foreground font-medium">Easier to read letters</p>
              </div>
            </div>
            <button 
              onClick={() => updateSettings({ dyslexicFont: !settings.dyslexicFont })}
              className={`w-14 h-8 rounded-full transition-colors relative ${settings.dyslexicFont ? 'bg-success' : 'bg-muted-foreground/30'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${settings.dyslexicFont ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-bold text-lg">High Contrast</h3>
                <p className="text-sm text-muted-foreground font-medium">Black background, bright text</p>
              </div>
            </div>
            <button 
              onClick={() => updateSettings({ highContrast: !settings.highContrast })}
              className={`w-14 h-8 rounded-full transition-colors relative ${settings.highContrast ? 'bg-success' : 'bg-muted-foreground/30'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${settings.highContrast ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
            <div className="flex items-center gap-3">
              <Moon className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-bold text-lg">Dark Mode</h3>
                <p className="text-sm text-muted-foreground font-medium">Darker colors</p>
              </div>
            </div>
            <button 
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className={`w-14 h-8 rounded-full transition-colors relative ${settings.darkMode ? 'bg-success' : 'bg-muted-foreground/30'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${settings.darkMode ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="pt-8 border-t border-border mt-8">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-destructive font-bold p-4 hover:bg-destructive/10 rounded-2xl w-full transition-colors"
            >
              <Trash2 className="w-6 h-6" />
              Reset All Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
