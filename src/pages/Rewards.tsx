import React from 'react';
import { useGame } from '../contexts/GameContext';
import { SHOP_ITEMS } from '../lib/gameData';
import { Coins, Check } from 'lucide-react';
import { Avatar } from '../components/Avatar';

const Rewards = () => {
  const { profile, progress, inventory, unlockItem } = useGame();

  const handleBuy = (id: string, cost: number) => {
    unlockItem(id, cost);
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-card p-4 rounded-3xl shadow-sm border-2 border-border">
          <h1 className="text-3xl font-bold text-primary">Rewards Shop</h1>
          <div className="flex items-center gap-2 font-bold text-2xl text-accent bg-accent/10 px-4 py-2 rounded-2xl">
            <Coins className="w-8 h-8 fill-accent" />
            {progress.coins}
          </div>
        </div>

        {profile && (
          <div className="flex justify-center mb-10">
            <Avatar avatarId={profile.avatarId} size="lg" />
          </div>
        )}

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground px-2">Hats & Accessories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SHOP_ITEMS.filter(item => item.type === 'hat').map(item => {
                const owned = inventory.includes(item.id);
                const affordable = progress.coins >= item.cost;
                
                return (
                  <div key={item.id} className={`bg-card p-4 rounded-3xl border-4 flex flex-col items-center text-center ${owned ? 'border-success' : 'border-card-border'}`}>
                    <div className="w-16 h-16 bg-muted rounded-full mb-3 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                      {item.name[0]}
                    </div>
                    <h3 className="font-bold mb-3">{item.name}</h3>
                    
                    {owned ? (
                      <div className="flex items-center gap-1 text-success font-bold mt-auto">
                        <Check className="w-5 h-5" /> Owned
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuy(item.id, item.cost)}
                        disabled={!affordable}
                        className={`mt-auto w-full py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-transform
                          ${affordable ? 'bg-accent text-accent-foreground active:scale-95' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                      >
                        <Coins className="w-4 h-4" /> {item.cost}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground px-2">Themes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SHOP_ITEMS.filter(item => item.type === 'background').map(item => {
                const owned = inventory.includes(item.id);
                const affordable = progress.coins >= item.cost;
                
                return (
                  <div key={item.id} className={`bg-card p-4 rounded-3xl border-4 flex flex-col items-center text-center ${owned ? 'border-success' : 'border-card-border'}`}>
                    <div className="w-full h-16 bg-muted rounded-xl mb-3" />
                    <h3 className="font-bold mb-3">{item.name}</h3>
                    
                    {owned ? (
                      <div className="flex items-center gap-1 text-success font-bold mt-auto">
                        <Check className="w-5 h-5" /> Owned
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuy(item.id, item.cost)}
                        disabled={!affordable}
                        className={`mt-auto w-full py-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-transform
                          ${affordable ? 'bg-accent text-accent-foreground active:scale-95' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                      >
                        <Coins className="w-4 h-4" /> {item.cost}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
