import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { type GameSettings, type GamePhase, type LevelInfo } from '../types';
import { GameTimer } from '../components/ui/GameTimer';
import { TerminalLog, type LogEntry } from '../components/ui/TerminalLog';
import { AlertTriangle, Menu, X, Lock, CheckCircle, ChevronRight, Bug } from 'lucide-react';

interface GameScreenProps {
    settings: GameSettings;
    currentPhase: GamePhase; // Abychom věděli, kde jsme
    children: React.ReactNode; // Samotná hádanka
    onExit: () => void;
}

// Definice posloupnosti levelů (pro menu)
const GAME_LEVELS: LevelInfo[] = [
    { id: 'p1', labelKey: 'game_module_binary', phase: 'puzzle1' },
    { id: 'p2', labelKey: 'game_module_dom', phase: 'puzzle2' },
    { id: 'p3', labelKey: 'game_module_logic', phase: 'puzzle3' },
    { id: 'p4', labelKey: 'game_module_sql', phase: 'puzzle4' },
    { id: 'path', labelKey: 'game_module_path', phase: 'pathSelection' },
];

export const GameScreen: React.FC<GameScreenProps> = ({ settings, currentPhase, children, onExit }) => {
    const { t } = useTranslation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Ref pro sledování, zda už proběhla inicializace logů (řeší varování setState-in-effect)
    const logsInitialized = useRef(false);

    // Inicializace logů (běží jen jednou)
    useEffect(() => {
        if (!logsInitialized.current) {
            setLogs([
                { id: '1', timestamp: '00:00:01', type: 'system', text: t('game_log_init') },
                { id: '2', timestamp: '00:00:02', type: 'info', text: t('game_log_connected') },
            ]);
            logsInitialized.current = true;
        }
    }, [t]);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(p => Math.max(0, p - 1)), 1000);
        return () => clearInterval(timer);
    }, []);

    // Funkce pro přidání logu
    const addLog = (text: string, type: LogEntry['type'] = 'info') => {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        setLogs(prev => [...prev, { id: Date.now().toString(), text, type, timestamp: timeString }]);
    };

    // Funkce pro určení stavu levelu v menu
    const getLevelStatus = (levelPhase: GamePhase) => {
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
                <div
                    className={`absolute top-0 left-0 h-full w-full max-w-sm bg-[#0a0f20] border-r border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] transform transition-transform duration-300 flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Hlavička menu */}
                    <div className="p-6 border-b border-cyan-900/50 flex justify-between items-center bg-black/20">
                        <h2 className="text-2xl font-mono font-bold text-white tracking-widest glitch-text">
                            {t('game_menu_title')}
                        </h2>
                        <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Informace o nastavení (Využití props 'settings') */}
                    <div className="px-6 py-2 bg-cyan-950/30 border-b border-cyan-900/30 text-xs font-mono text-cyan-400 flex justify-between">
                        <span>DIFFICULTY: {settings.difficulty.toUpperCase()}</span>
                        <span>HINTS: {settings.allowHints ? 'ON' : 'OFF'}</span>
                    </div>

                    {/* Obsah menu - Dynamický seznam levelů */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                            {t('game_menu_levels')}
                        </h3>

                        <div className="space-y-2">
                            {GAME_LEVELS.map((level) => {
                                const status = getLevelStatus(level.phase);
                                return (
                                    <div
                                        key={level.id}
                                        className={`p-3 border rounded flex items-center justify-between font-mono text-sm transition-all ${
                                            status === 'current'
                                                ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                                                : status === 'completed'
                                                    ? 'border-green-900/50 bg-green-950/10 text-green-400/70'
                                                    : 'border-slate-800 bg-slate-900/20 text-slate-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {status === 'completed' && <CheckCircle size={16} />}
                                            {status === 'locked' && <Lock size={16} />}
                                            {status === 'current' && <ChevronRight size={16} className="text-cyan-400" />}
                                            {/* Odstraněno 'as string', level.labelKey je string */}
                                            <span>{t(level.labelKey) || level.id}</span>
                                        </div>

                                        <span className="text-[10px] uppercase tracking-wider opacity-60">
                                            {status === 'current' && t('game_level_current')}
                                            {status === 'completed' && t('game_level_completed')}
                                            {status === 'locked' && t('game_level_locked')}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Debug tlačítko pro využití 'addLog' */}
                        <button
                            onClick={() => addLog('Manual diagnostics run.', 'system')}
                            className="mt-8 w-full border border-dashed border-slate-700 p-2 text-xs text-slate-500 hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-2"
                        >
                            <Bug size={12} /> Test System Log
                        </button>
                    </div>

                    {/* Patička menu */}
                    <div className="p-6 border-t border-cyan-900/50 bg-black/40 space-y-3">
                        <button onClick={() => setIsMenuOpen(false)} className="w-full py-3 border border-cyan-500/50 text-cyan-400 font-mono font-bold hover:bg-cyan-500 hover:text-black transition-all">
                            {t('game_menu_resume')}
                        </button>
                        <button onClick={onExit} className="w-full py-3 border border-red-900/50 text-red-500 font-mono font-bold hover:bg-red-900/20 transition-all text-xs">
                            {t('game_menu_exit')}
                        </button>
                    </div>
                </div>
            </div>

            {/* 1. TOP BAR (HUD) */}
            <header className="flex-none h-16 border-b border-cyan-900/30 bg-black/40 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMenuOpen(true)} className="text-cyan-600 hover:text-cyan-400 transition-colors p-2 hover:bg-cyan-950/30 rounded">
                        <Menu size={24} />
                    </button>
                    <div className="hidden md:block">
                        <div className="text-xs text-slate-500 uppercase tracking-widest">{t('game_current_module')}</div>
                        {/* Dynamický název aktuálního modulu */}
                        <div className="text-sm font-bold text-white font-mono uppercase">
                            {currentPhase.replace('puzzle', 'MODUL_').replace('_', ' ')}
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2 text-yellow-500/50 text-xs font-mono border border-yellow-900/30 px-3 py-1 rounded">
                    <AlertTriangle size={12} />
                    {t('game_system_unstable')}
                </div>

                <GameTimer seconds={timeLeft} totalSeconds={3600} />
            </header>

            {/* 2. MAIN PUZZLE AREA - Zde se renderují děti (samotné hádanky) */}
            <div className="flex-1 overflow-y-auto relative p-4 md:p-8 flex flex-col items-center justify-center">
                {children}
            </div>

            {/* 3. BOTTOM TERMINAL */}
            <div className="flex-none h-48 md:h-40 w-full z-20">
                <TerminalLog logs={logs} />
            </div>

        </div>
    );
};