import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Settings, HelpCircle, Cpu } from 'lucide-react';
import { CyberButton } from '../components/ui/CyberButton';
import type { ScreenState } from '../types';

interface MainMenuProps {
    onNavigate: (screen: ScreenState) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-full max-w-md w-full mx-auto p-6 justify-center animate-fade-in">
            {/* Logo / Header */}
            <div className="mb-12 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/10 blur-[50px] rounded-full" />
                <Cpu size={64} className="mx-auto text-cyan-400 mb-4 animate-pulse" />
                <h1 className="text-4xl font-black text-white tracking-[0.2em] mb-2 font-mono glitch-text">
                    {t('title')}
                </h1>
                <p className="text-cyan-600 font-mono text-xs tracking-widest uppercase border-t border-b border-cyan-900/50 py-2 inline-block">
                    v 2.0.4 :: {t('subtitle')}
                </p>
            </div>

            {/* Menu Items */}
            <div className="space-y-4 z-10">
                <CyberButton icon={Play} onClick={() => onNavigate('game')}>
                    {t('start')}
                </CyberButton>

                <CyberButton variant="secondary" icon={Settings} onClick={() => onNavigate('settings')}>
                    {t('settings')}
                </CyberButton>

                <CyberButton variant="secondary" icon={HelpCircle} onClick={() => onNavigate('credits')}>
                    {t('credits')}
                </CyberButton>
            </div>

            <div className="mt-12 text-center text-slate-600 text-xs font-mono">
                <p>SYSTEM STATUS: STABLE</p>
                <p>USER: GUEST</p>
            </div>
        </div>
    );
};