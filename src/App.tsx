import { SoundProvider } from './context/SoundContext';
import { GameProvider, useGame } from './context/GameContext';

import { MainMenu } from './screens/MainMenu';
import { SettingsScreen } from './screens/SettingsScreen';
import { GameScreen } from './screens/GameScreen';
import { CreditsScreen } from './screens/CreditsScreen';
import { IntroScreen } from './screens/IntroScreen';
import { DevBar } from './components/debug/DevBar';

// IMPORT REGISTRU MÍSTO KONKRÉTNÍCH PUZZLŮ
import { CurrentPuzzleRenderer } from './components/puzzles/PuzzleRegistry';

const isDevMode = import.meta.env.DEV;

// AppContent je nyní extrémně čistý
const AppContent = () => {
    const {
        screen,
        navigate,
        startGame,
        updateSettings,
        settings,
        setGameState,
        remainingTime
    } = useGame();

    return (
        <div className="min-h-screen bg-[#050a10] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
            <div className="fixed inset-0 bg-[linear-gradient(rgba(13,148,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <main className="relative z-10 h-screen">
                {screen === 'menu' && <MainMenu onNavigate={(t) => { if(t==='game') navigate('intro'); else navigate(t); }} />}

                {screen === 'settings' && (
                    <SettingsScreen
                        settings={settings}
                        onUpdateSettings={updateSettings}
                        onBack={() => navigate('menu')}
                    />
                )}

                {screen === 'intro' && <IntroScreen onStartGame={startGame} settings={settings} />}

                {screen === 'game' && (
                    <GameScreen>
                        {/* TADY SE DĚJE MAGIE - Dynamické načtení hádanky podle pravidel */}
                        <CurrentPuzzleRenderer />
                    </GameScreen>
                )}

                {screen === 'credits' && <CreditsScreen onBack={() => navigate('menu')} />}
            </main>

            {isDevMode && (
                <DevBar
                    currentScreen={screen === 'intro' ? 'game' : screen}
                    onNavigate={(s) => {
                        if (s === 'game' && screen !== 'game') setGameState('puzzle1');
                        navigate(s);
                    }}
                />
            )}

            {isDevMode && screen === 'game' && (
                <div className="fixed bottom-14 right-4 z-50 text-xs text-white bg-black/50 px-2 py-1 border border-slate-700 rounded">
                    Time: {remainingTime}s
                </div>
            )}
        </div>
    );
};

export default function App() {
    const { settings } = useGameContextSettingsPlaceholder();

    return (
        <SoundProvider initialEnabled={settings.soundEnabled} initialVolume={settings.volume}>
            <GameProvider>
                <AppContent />
            </GameProvider>
        </SoundProvider>
    );
}

function useGameContextSettingsPlaceholder() {
    const saved = localStorage.getItem('aura_settings');
    const settings = saved ? JSON.parse(saved) : { soundEnabled: true, volume: 0.5 };
    return { settings };
}