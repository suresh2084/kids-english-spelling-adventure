import React from 'react';
import { Link, useLocation } from 'wouter';
import { Map, ShoppingBag, Trophy, Home, Calendar, Settings } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export const Navigation = () => {
  const [location] = useLocation();
  const { profile } = useGame();

  if (!profile && location !== '/') return null;
  if (location === '/') return null;

  const links = [
    { href: '/map', icon: Map, label: 'Map' },
    { href: '/rewards', icon: ShoppingBag, label: 'Shop' },
    { href: '/badges', icon: Trophy, label: 'Badges' },
    { href: '/daily', icon: Calendar, label: 'Daily' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-card border-t-4 border-primary/20 p-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40">
      <div className="max-w-md mx-auto flex justify-between items-center px-4">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href} className="block relative">
              <div className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${isActive ? 'text-primary scale-110' : 'text-muted-foreground hover:text-primary'}`}>
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl -z-10" />
                )}
                <Icon className="w-7 h-7 mb-1" strokeWidth={isActive ? 3 : 2} />
                <span className="text-[10px] font-bold tracking-wider uppercase">{label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
