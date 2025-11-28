import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface GameTimerProps {
    seconds: number;
    totalSeconds: number;
}

export const GameTimer: React.FC<GameTimerProps> = ({ seconds, totalSeconds }) => {
    // Výpočet procent pro progress bar
    const progress = (seconds / totalSeconds) * 100;

    // Formátování MM:SS
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');

    // Barva se mění na červenou, když zbývá méně než 10%
    const isCritical = progress < 10;
    const colorClass = isCritical ? 'text-red-500 border-red-500' : 'text-cyan-400 border-cyan-400';
    const bgClass = isCritical ? 'bg-red-500' : 'bg-cyan-400';

    return (
        <div className={`flex flex-col w-full max-w-[200px] ${colorClass}`}>
            <div className={`flex items-center justify-between border px-3 py-1 bg-black/50 backdrop-blur`}>
                <TimerIcon size={16} className={isCritical ? 'animate-pulse' : ''} />
                <span className="font-mono text-xl font-bold tracking-widest">
          {mins}:{secs}
        </span>
            </div>
            {/* Progress Line */}
            <div className="h-1 w-full bg-gray-900 mt-1">
                <div
                    className={`h-full ${bgClass} transition-all duration-1000 ease-linear`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};