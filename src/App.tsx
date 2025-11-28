// Providers
import { SoundProvider } from './context/SoundContext';
import { GameProvider, useGame } from './context/GameContext';

// Screens
import { MainMenu } from './screens/MainMenu';
import { SettingsScreen } from './screens/SettingsScreen';
import { GameScreen } from './screens/GameScreen';
import { CreditsScreen } from './screens/CreditsScreen';
import { IntroScreen } from './screens/IntroScreen';

// Puzzles
import { CurrentPuzzleRenderer } from './components/puzzles/PuzzleRegistry';

// Debug
import { DevBar } from './components/debug/DevBar';

const isDevMode = import.meta.env.DEV;

// Pomocná funkce pro načtení nastavení (aby SoundProvider věděl, jak začít)
const getInitialSettings = () => {
    try {
        const saved = localStorage.getItem('aura_settings');
        return saved ? JSON.parse(saved) : { soundEnabled: true, volume: 0.5 };
    } catch {
        // Pokud nastane chyba při parsování, vrátíme defaultní hodnoty
        return { soundEnabled: true, volume: 0.5 };
    }
};

// Placeholder komponenta
const Placeholder = ({ title, color, onSolve }: { title: string, color: string, onSolve: () => void }) => (
    <div className={`w-full max-w-2xl p-8 border-2 border-${color}-500 bg-${color}-950/30 rounded-lg text-center backdrop-blur-sm`}>
        <h2 className={`text-2xl font-bold text-${color}-400 mb-4 font-mono`}>{title}</h2>
        <p className="text-slate-400 mb-6">Tato hádanka zatím není implementována.</p>
        <button
            onClick={onSolve}
            className={`px-6 py-2 bg-${color}-600 hover:bg-${color}-500 text-white font-mono rounded transition-colors`}
        >
            [ DEBUG: VYŘEŠIT ]
        </button>
    </div>
);

// Vnitřní obsah aplikace
const AppContent = () => {
    const {
        screen,
        gameState,
        navigate,
        startGame,
        resetGame,
        solvePuzzle,
        updateSettings,
        settings,
        setGameState,
        remainingTime
    } = useGame();

    const makePathChoice = (path: 'logic' | 'data') => {
        solvePuzzle(path === 'logic' ? 'puzzle5_logic' : 'puzzle5_data', `Path chosen: ${path.toUpperCase()}`);
    };

    const renderActivePuzzle = () => {
        switch (gameState) {
            case 'puzzle1': return <CurrentPuzzleRenderer />;
            case 'puzzle2': return <Placeholder title="PUZZLE 2: DOM INSPECTOR" color="cyan" onSolve={() => solvePuzzle('puzzle3')} />;
            case 'puzzle3': return <Placeholder title="PUZZLE 3: LOGIC GATES" color="cyan" onSolve={() => solvePuzzle('puzzle4')} />;
            case 'puzzle4': return <Placeholder title="PUZZLE 4: SQL INJECTION" color="cyan" onSolve={() => solvePuzzle('pathSelection')} />;

            case 'pathSelection':
                return (
                    <div className="w-full max-w-3xl p-8 border-2 border-yellow-500 bg-yellow-950/30 rounded-lg text-center backdrop-blur-sm animate-fade-in">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-mono">VÝBĚR CESTY</h2>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button onClick={() => makePathChoice('logic')} className="px-6 py-4 bg-purple-900/50 border border-purple-500 hover:bg-purple-800 text-purple-300 font-mono rounded transition-all">
                                Cesta 1: JÁDRO (Logika)
                            </button>
                            <button onClick={() => makePathChoice('data')} className="px-6 py-4 bg-emerald-900/50 border border-emerald-500 hover:bg-emerald-800 text-emerald-300 font-mono rounded transition-all">
                                Cesta 2: DATA (Sítě)
                            </button>
                        </div>
                    </div>
                );

            case 'puzzle5_logic': return <Placeholder title="P5: ALGORITHM RECON" color="purple" onSolve={() => solvePuzzle('puzzle6_logic')} />;
            case 'puzzle6_logic': return <Placeholder title="P6: JAVA DEBUG" color="purple" onSolve={() => solvePuzzle('puzzle7_logic')} />;
            case 'puzzle7_logic': return <Placeholder title="P7: RECURSION TRACE" color="purple" onSolve={() => solvePuzzle('outro')} />;

            case 'puzzle5_data': return <Placeholder title="P5: BASE64 DECODER" color="emerald" onSolve={() => solvePuzzle('puzzle6_data')} />;
            case 'puzzle6_data': return <Placeholder title="P6: URL BUILDER" color="emerald" onSolve={() => solvePuzzle('puzzle7_data')} />;
            case 'puzzle7_data': return <Placeholder title="P7: JSON SYNTAX" color="emerald" onSolve={() => solvePuzzle('outro')} />;

            case 'outro':
                return (
                    <div className="text-center max-w-lg mx-auto p-8 border-2 border-cyan-500 bg-cyan-950/30 rounded backdrop-blur-md animate-fade-in">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">KALIBRACE DOKONČENA</h2>
                            <p className="text-cyan-600 font-mono tracking-widest text-sm">SYSTÉM 100% ONLINE</p>
                        </div>
                        <p className="text-slate-300 mb-8 leading-relaxed font-mono">
                            Jádro AURA je plně stabilní. Všechny subsystémy obnoveny.<br/>
                            Děkuji ti, Specialisto. Jsi volný.
                        </p>
                        <button onClick={resetGame} className="px-8 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-all rounded font-mono">
                            HRÁT ZNOVU
                        </button>
                    </div>
                );

            case 'gameOver':
                return (
                    <div className="text-center max-w-lg mx-auto p-8 border-2 border-red-500 bg-red-950/30 rounded backdrop-blur-md animate-fade-in">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-red-500 mb-2 font-mono">RESTART SYSTÉMU</h2>
                            <p className="text-red-400 font-mono tracking-widest text-sm">ČAS VYPRŠEL</p>
                        </div>
                        <button onClick={resetGame} className="px-8 py-3 bg-red-500/10 border border-red-500 text-red-400 font-bold hover:bg-red-500 hover:text-black transition-all rounded font-mono">
                            ZKUSIT ZNOVU
                        </button>
                    </div>
                );

            default: return <div className="text-white">Neznámý stav: {gameState}</div>;
        }
    };

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

                {screen === 'game' && <GameScreen>{renderActivePuzzle()}</GameScreen>}

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
    const initialSettings = getInitialSettings();

    return (
        // OPRAVA: SoundProvider je nyní rodičem GameProvideru
        // Díky tomu může GameProvider bezpečně volat useSound()
        <SoundProvider initialEnabled={initialSettings.soundEnabled} initialVolume={initialSettings.volume}>
            <GameProvider>
                <AppContent />
            </GameProvider>
        </SoundProvider>
    );
}