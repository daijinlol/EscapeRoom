import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSound } from '../hooks/useSound';
import type { GameSettings, ScreenState, GamePhase, LogEntry } from '../types';

// Defaultní nastavení
const DEFAULT_SETTINGS: GameSettings = {
    language: 'cs',
    difficulty: 'zs_8',
    allowHints: true,
    soundEnabled: true,
    volume: 0.5,
};

const TOTAL_TIME = 3600; // 60 minut

interface GameContextType {
    // State
    settings: GameSettings;
    screen: ScreenState | 'intro';
    gameState: GamePhase;
    remainingTime: number;
    logs: LogEntry[];

    // Actions
    updateSettings: (newSettings: Partial<GameSettings>) => void;
    navigate: (screen: ScreenState | 'intro') => void;
    startGame: () => void;
    resetGame: () => void;
    setGameState: (phase: GamePhase) => void; // Pro debug nebo přímý skok
    solvePuzzle: (nextPhase: GamePhase, logMessage?: string) => void; // Posun na další level
    addLog: (text: string, type?: LogEntry['type']) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t, i18n } = useTranslation();
    const { play } = useSound();

    // --- STATE ---
    const [screen, setScreen] = useState<ScreenState | 'intro'>('menu');
    const [gameState, setGameState] = useState<GamePhase>('puzzle1');
    const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Load Settings
    const [settings, setSettings] = useState<GameSettings>(() => {
        const saved = localStorage.getItem('aura_settings');
        if (saved) {
            try { return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }; } catch (e) { console.error(e); }
        }
        return DEFAULT_SETTINGS;
    });

    // --- EFFECTS ---

    // 1. Ukládání settings
    const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
        setSettings(prev => {
            const next = { ...prev, ...newSettings };
            localStorage.setItem('aura_settings', JSON.stringify(next));
            return next;
        });
    }, []);

    // 2. Synchronizace jazyka
    useEffect(() => {
        if (i18n.language !== settings.language) {
            i18n.changeLanguage(settings.language);
        }
    }, [settings.language, i18n]);

    // 3. Timer
    useEffect(() => {
        const isGameActive = screen === 'game' && gameState !== 'outro' && gameState !== 'gameOver';
        if (!isGameActive) return;

        const interval = setInterval(() => {
            setRemainingTime(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setGameState('gameOver');
                    play('error');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [screen, gameState, play]);

    // --- ACTIONS ---

    const addLog = useCallback((text: string, type: LogEntry['type'] = 'info') => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('cs-CZ', { hour12: false });
        setLogs(prev => [...prev, { id: Date.now().toString() + Math.random(), text, type, timestamp: timeString }]);

        if (type === 'error') play('error');
        if (type === 'success') play('success');
        else play('typing');
    }, [play]);

    const navigate = useCallback((target: ScreenState | 'intro') => {
        play('menu_open');
        setScreen(target);
    }, [play]);

    const startGame = useCallback(() => {
        setRemainingTime(TOTAL_TIME);
        setGameState('puzzle1');
        setLogs([]); // Vyčistit logy

        // Úvodní logy
        setTimeout(() => addLog(t('game_log_init'), 'system'), 500);
        setTimeout(() => addLog(t('game_log_connected'), 'success'), 1500);

        setScreen('game');
        play('success');
    }, [addLog, t, play]);

    const resetGame = useCallback(() => {
        setScreen('menu');
        setGameState('puzzle1');
        setRemainingTime(TOTAL_TIME);
        setLogs([]);
    }, []);

    const solvePuzzle = useCallback((nextPhase: GamePhase, logMessage?: string) => {
        play('success');
        if (logMessage) addLog(logMessage, 'success');
        setGameState(nextPhase);
    }, [addLog, play]);

    return (
        <GameContext.Provider value={{
            settings, screen, gameState, remainingTime, logs,
            updateSettings, navigate, startGame, resetGame, setGameState, solvePuzzle, addLog
        }}>
            {children}
        </GameContext.Provider>
    );
};

// Hook pro použití v komponentách
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};