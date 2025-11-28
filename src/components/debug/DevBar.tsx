import React, { useState } from 'react';
import { Terminal, RefreshCcw, SkipForward, X } from 'lucide-react';
import type { ScreenState } from '../../types';

interface DevBarProps {
    currentScreen: ScreenState;
    onNavigate: (screen: ScreenState) => void;
    // Zde si můžeme připravit props pro budoucí ovládání levelů
    // currentLevel?: number;
    // onSetLevel?: (level: number) => void;
}

export const DevBar: React.FC<DevBarProps> = ({ currentScreen, onNavigate }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Seznam všech obrazovek pro rychlý skok
    const screens: ScreenState[] = ['menu', 'game', 'settings', 'credits'];

    if (!isExpanded) {
        return (
            <button
                onClick={() => setIsExpanded(true)}
                className="fixed bottom-4 right-4 z-50 bg-pink-600/20 text-pink-500 border border-pink-500 p-2 font-mono text-xs uppercase hover:bg-pink-600 hover:text-white transition-all backdrop-blur-md rounded-sm"
            >
                <div className="flex items-center gap-2">
                    <Terminal size={14} />
                    <span>DEV_TOOLS</span>
                </div>
            </button>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-black/90 border-t-2 border-pink-500 text-pink-500 font-mono p-2 shadow-[0_0_30px_rgba(236,72,153,0.3)] animate-fade-in">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Header panelu */}
                <div className="flex items-center gap-4 border-r border-pink-900 pr-4">
                    <div className="flex items-center gap-2 font-bold text-pink-400">
                        <Terminal size={16} />
                        <span className="tracking-widest">DEBUG_MODE</span>
                    </div>
                    <span className="text-xs text-pink-700">|</span>
                    <div className="text-xs">
                        CURRENT_SCREEN: <span className="text-white font-bold">{currentScreen.toUpperCase()}</span>
                    </div>
                </div>

                {/* Ovládací prvky */}
                <div className="flex items-center gap-2 flex-wrap justify-center">

                    {/* Skok na konkrétní obrazovky */}
                    <div className="flex gap-1">
                        {screens.map((s) => (
                            <button
                                key={s}
                                onClick={() => onNavigate(s)}
                                className={`px-3 py-1 text-xs border ${
                                    currentScreen === s
                                        ? 'bg-pink-600 text-white border-pink-600'
                                        : 'border-pink-800/50 hover:border-pink-500 text-pink-700 hover:text-pink-400'
                                } transition-all uppercase`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <span className="text-pink-900">|</span>

                    {/* Akční tlačítka */}
                    <button
                        onClick={() => window.location.reload()} // Tvrdý reset
                        className="flex items-center gap-1 px-3 py-1 text-xs border border-pink-500 bg-pink-950/30 hover:bg-pink-500 hover:text-black transition-all"
                        title="Reload App"
                    >
                        <RefreshCcw size={12} />
                        RESET_APP
                    </button>

                    {/* Placeholder pro budoucí "Skip Puzzle" */}
                    <button
                        disabled
                        className="flex items-center gap-1 px-3 py-1 text-xs border border-pink-900 text-pink-900 cursor-not-allowed opacity-50"
                        title="Bude dostupné ve hře"
                    >
                        <SkipForward size={12} />
                        SKIP_LEVEL
                    </button>
                </div>

                {/* Zavřít panel */}
                <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};