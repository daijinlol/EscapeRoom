import React from 'react';
import { useTranslation } from 'react-i18next';
import { CyberButton } from '../components/ui/CyberButton';
import type { GameSettings } from '../types';

interface GameScreenProps {
    settings: GameSettings;
    onExit: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ settings, onExit }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
            <div className="w-24 h-24 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-8" />

            <h2 className="text-2xl font-mono text-white mb-2">{t('game_start_msg')}</h2>

            <div className="bg-slate-900/50 border border-slate-700 p-4 rounded mb-8 font-mono text-sm">
                <p className="text-slate-400 mb-1">SELECTED CONFIGURATION:</p>
                <p className="text-cyan-400 font-bold">{settings.difficulty.toUpperCase().replace('_', ' ')}</p>
                <p className="text-slate-500 text-xs mt-2">
                    HINTS: {settings.allowHints ? <span className="text-green-400">ENABLED</span> : <span className="text-red-400">DISABLED</span>}
                </p>
            </div>

            {/* Zde bude v budoucnu logika pro renderování konkrétních hádanek (PuzzleOne, atd.) */}

            <CyberButton variant="danger" onClick={onExit}>
                ABORT SIMULATION
            </CyberButton>
        </div>
    );
};