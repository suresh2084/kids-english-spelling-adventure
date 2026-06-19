import React from 'react';
import { useLocation } from 'wouter';
import { useGame } from '../contexts/GameContext';
import { LogOut, Activity, Clock, Target, Hash } from 'lucide-react';

const Parent = () => {
  const [, setLocation] = useLocation();
  const { progress, badges, profile } = useGame();

  const accuracy = progress.totalAttempted > 0 
    ? Math.round((progress.totalCorrect / progress.totalAttempted) * 100) 
    : 0;
    
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Parent Dashboard</h1>
            <p className="text-slate-500">Stats for {profile?.name || 'Player'}</p>
          </div>
          <button 
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Exit Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Accuracy</h2>
            </div>
            <div className="text-5xl font-bold text-blue-500 mb-2">{accuracy}%</div>
            <p className="text-slate-500">{progress.totalCorrect} correct out of {progress.totalAttempted} attempts</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Progress</h2>
            </div>
            <div className="text-5xl font-bold text-green-500 mb-2">Lv. {progress.currentLevel}</div>
            <p className="text-slate-500">{badges.length} badges earned</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Time Played</h2>
            </div>
            <div className="text-5xl font-bold text-purple-500 mb-2">{formatTime(progress.timeSpent)}</div>
            <p className="text-slate-500">Total session time</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Hash className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Total Words</h2>
            </div>
            <div className="text-5xl font-bold text-orange-500 mb-2">{progress.totalCorrect}</div>
            <p className="text-slate-500">Words spelled correctly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parent;
