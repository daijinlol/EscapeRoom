import { useState } from 'react';
// Importy obrazovek
import { MainMenu } from './screens/MainMenu';
import { SettingsScreen } from './screens/SettingsScreen';
import { GameScreen } from './screens/GameScreen';
import { CreditsScreen } from './screens/CreditsScreen'; // Nový import

import type { GameSettings, ScreenState } from './types';

export default function App() {
    // Hook pro překlady (jen pro případné globální texty, momentálně ho zde ani nutně nepotřebujeme,
    // protože si ho volají jednotlivé obrazovky, ale necháme ho pro jistotu)
    // Stav pro přepínání obrazovek
    const [screen, setScreen] = useState<ScreenState>('menu');

    // Stav pro globální nastavení hry
    const [settings, setSettings] = useState<GameSettings>({
        language: 'cs',
        difficulty: 'zs_8',
        allowHints: true,
        soundEnabled: true,
    });

    // Funkce pro aktualizaci nastavení
    const updateSettings = (newSettings: Partial<GameSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <div className="min-h-screen bg-[#050a10] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
            {/* Pozadí - mřížka */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(13,148,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Renderování obrazovky podle stavu */}
            <main className="relative z-10 h-screen">

                {screen === 'menu' && (
                    <MainMenu onNavigate={setScreen} />
                )}

                {screen === 'settings' && (
                    <SettingsScreen
                        settings={settings}
                        onUpdateSettings={updateSettings}
                        onBack={() => setScreen('menu')}
                    />
                )}

                {screen === 'game' && (
                    <GameScreen
                        settings={settings}
                        onExit={() => setScreen('menu')}
                    />
                )}

                {screen === 'credits' && (
                    <CreditsScreen onBack={() => setScreen('menu')} />
                )}

            </main>
        </div>
    );
}