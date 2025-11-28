import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGame } from '../hooks/useGame';
import { useSound } from '../hooks/useSound';
import { GameTimer } from '../components/ui/GameTimer';
import { TerminalLog } from '../components/ui/TerminalLog';
import { AlertTriangle, Menu, X, Lock, CheckCircle, ChevronRight, Bug } from 'lucide-react';
import { type GamePhase } from '../types';
import { getLevelConfig, PUZZLE_LABELS } from '../data/difficultyRules'; // Import helperů

interface GameScreenProps {
    children: React.ReactNode;
}

// Definujeme, které fáze hry se mají v menu zobrazit jako "Levely"
const VISIBLE_PHASES: GamePhase[] = ['puzzle1', 'puzzle2', 'puzzle3', 'puzzle4', 'pathSelection'];

export const GameScreen: React.FC<GameScreenProps> = ({ children }) => {
    const { t } = useTranslation();

    const {
        settings,
        gameState: currentPhase,
        remainingTime: timeLeft,
        logs,
        addLog,
        navigate
    } = useGame();

    const { play } = useSound();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Načteme konfiguraci pro aktuální obtížnost
    const config = getLevelConfig(settings.difficulty);

    const getLevelStatus = (levelPhase: GamePhase) => {
        // Kompletní flow hry pro určení pořadí
        const phasesOrder: GamePhase[] = ['puzzle1', 'puzzle2', 'puzzle3', 'puzzle4', 'pathSelection', 'puzzle5_logic', 'puzzle6_logic', 'puzzle7_logic', 'outro'];

        const currentIndex = phasesOrder.indexOf(currentPhase);
        const levelIndex = phasesOrder.indexOf(levelPhase);

        if (currentPhase === levelPhase) return 'current';
        if (currentIndex > levelIndex) return 'completed';
        return 'locked';
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#050a10] overflow-hidden relative">

            {/* === HERNÍ MENU (OVERLAY) === */}
            <div
                className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            >
                <div className={`absolute top-0 left-0 h-full w-full max-w-sm bg-[#0a0f20] border-r border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] transform transition-transform duration-300 flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>

                    {/* ... (Header menu) ... */}
                    <div className="p-6 border-b border-cyan-900/50 flex justify-between items-center bg-black/20">
                        <h2 className="text-2xl font-mono font-bold text-white tracking-widest glitch-text">{t('game_menu_title')}</h2>
                        <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
                    </div>

                    <div className="px-6 py-2 bg-cyan-950/30 border-b border-cyan-900/30 text-xs font-mono text-cyan-400 flex justify-between">
                        <span>DIFFICULTY: {settings.difficulty.toUpperCase()}</span>
                        <span>HINTS: {settings.allowHints ? 'ON' : 'OFF'}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                            {t('game_menu_levels')}
                        </h3>

                        <div className="space-y-2">
                            {/* DYNAMICKÉ GENEROVÁNÍ SEZNAMU */}
                            {VISIBLE_PHASES.map((phase) => {
                                const status = getLevelStatus(phase);

                                // 1. Zjistíme typ hádanky pro tuto fázi v aktuální obtížnosti
                                const puzzleType = config.puzzles[phase];
                                // 2. Najdeme klíč pro překlad
                                const labelKey = PUZZLE_LABELS[puzzleType] || 'puzzletype_placeholder';
                                // 3. Přeložíme
                                const label = t(labelKey);

                                return (
                                    <div
                                        key={phase}
                                        className={`p-3 border rounded flex items-center justify-between font-mono text-sm transition-all ${
                                            status === 'current' ? 'border-cyan-400 bg-cyan-950/30 text-white' :
                                                status === 'completed' ? 'border-green-900/50 bg-green-950/10 text-green-400/70' :
                                                    'border-slate-800 bg-slate-900/20 text-slate-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {status === 'completed' && <CheckCircle size={16} />}
                                            {status === 'locked' && <Lock size={16} />}
                                            {status === 'current' && <ChevronRight size={16} className="text-cyan-400" />}

                                            {/* Zobrazíme dynamický název */}
                                            <span>{label}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ... (Debug Button) ... */}
                        <button onClick={() => { addLog('Manual diagnostics run.', 'system'); play('click'); }} className="mt-8 w-full border border-dashed border-slate-700 p-2 text-xs text-slate-500 hover:text-white flex items-center justify-center gap-2">
                            <Bug size={12} /> Test System Log
                        </button>
                    </div>

                    {/* ... (Footer menu) ... */}
                    <div className="p-6 border-t border-cyan-900/50 bg-black/40 space-y-3">
                        <button onClick={() => setIsMenuOpen(false)} className="w-full py-3 border border-cyan-500/50 text-cyan-400 font-mono font-bold hover:bg-cyan-500 hover:text-black transition-all">{t('game_menu_resume')}</button>
                        <button onClick={() => navigate('menu')} className="w-full py-3 border border-red-900/50 text-red-500 font-mono font-bold hover:bg-red-900/20 transition-all text-xs">{t('game_menu_exit')}</button>
                    </div>
                </div>
            </div>

            {/* ... (Top Bar) ... */}
            <header className="flex-none h-16 border-b border-cyan-900/30 bg-black/40 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMenuOpen(true)} className="text-cyan-600 hover:text-cyan-400 transition-colors p-2 rounded">
                        <Menu size={24} />
                    </button>
                    <div className="hidden md:block">
                        <div className="text-xs text-slate-500 uppercase tracking-widest">{t('game_current_module')}</div>
                        <div className="text-sm font-bold text-white font-mono uppercase">
                            {/* Dynamický název i v hlavičce */}
                            {t(PUZZLE_LABELS[config.puzzles[currentPhase]] || 'puzzletype_placeholder')}
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2 text-yellow-500/50 text-xs font-mono border border-yellow-900/30 px-3 py-1 rounded">
                    <AlertTriangle size={12} />
                    {t('game_system_unstable')}
                </div>

                <GameTimer seconds={timeLeft} totalSeconds={3600} />
            </header>

            {/* ... (zbytek souboru) ... */}
            <div className="flex-1 overflow-y-auto relative p-4 md:p-8 flex flex-col items-center justify-center">
                {children}
            </div>
            <div className="flex-none h-48 md:h-40 w-full z-20">
                <TerminalLog logs={logs} />
            </div>
        </div>
    );
};