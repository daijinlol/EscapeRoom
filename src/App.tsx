import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
// Importy obrazovek (Screens)
import { MainMenu } from './screens/MainMenu';
import { SettingsScreen } from './screens/SettingsScreen';
import { GameScreen } from './screens/GameScreen';
import { CreditsScreen } from './screens/CreditsScreen';
import { IntroScreen } from './screens/IntroScreen';

// Ostatní komponenty
import { DevBar } from './components/debug/DevBar';
// Import typů
import type { GameSettings, ScreenState, GamePhase } from './types';

// Definice stavů aplikace
type AppState = ScreenState | 'intro';

const TOTAL_TIME = 3600; // 60 minut
const isDevMode = import.meta.env.DEV;

// Výchozí nastavení
const DEFAULT_SETTINGS: GameSettings = {
    language: 'cs',
    difficulty: 'zs_8',
    allowHints: true,
    soundEnabled: true,
};

export default function App() {
    const { i18n } = useTranslation();

    // --- STAVY APLIKACE ---
    const [screen, setScreen] = useState<AppState>('menu');
    const [gameState, setGameState] = useState<GamePhase>('puzzle1');
    const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);

    // Načtení nastavení z localStorage
    const [settings, setSettings] = useState<GameSettings>(() => {
        const saved = localStorage.getItem('aura_settings');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return DEFAULT_SETTINGS;
    });

    // Aplikace jazyka
    useEffect(() => {
        if (i18n.language !== settings.language) {
            i18n.changeLanguage(settings.language);
        }
    }, [settings.language, i18n]);

    // Ukládání nastavení
    const updateSettings = (newSettings: Partial<GameSettings>) => {
        setSettings(prev => {
            const next = { ...prev, ...newSettings };
            localStorage.setItem('aura_settings', JSON.stringify(next));
            return next;
        });
    };

    // --- LOGIKA ČASOVAČE ---
    useEffect(() => {
        const isGameActive = screen === 'game' && gameState !== 'outro' && gameState !== 'gameOver';
        if (!isGameActive) return;

        const interval = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    setGameState('gameOver'); // ZMĚNA: Už není potřeba 'as any'
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [screen, gameState]);


    // --- NAVIGACE ---

    const resetToIntro = useCallback(() => {
        setScreen('menu');
        setGameState('puzzle1');
        setRemainingTime(TOTAL_TIME);
    }, []);

    const startGame = useCallback(() => {
        setRemainingTime(TOTAL_TIME);
        setGameState('puzzle1');
        setScreen('game');
    }, []);

    // Funkce pro posun ve hře
    const solvePuzzleOne = useCallback(() => setGameState('puzzle2'), []);
    const solvePuzzleTwo = useCallback(() => setGameState('puzzle3'), []);
    const solvePuzzleThree = useCallback(() => setGameState('puzzle4'), []);
    const solvePuzzleFour = useCallback(() => setGameState('pathSelection'), []);

    const makePathChoice = useCallback((path: 'logic' | 'data') => {
        if (path === 'logic') setGameState('puzzle5_logic');
        else setGameState('puzzle5_data');
    }, []);

    const solvePuzzleFiveLogic = useCallback(() => setGameState('puzzle6_logic'), []);
    const solvePuzzleSixLogic = useCallback(() => setGameState('puzzle7_logic'), []);
    const solvePuzzleSevenLogic = useCallback(() => setGameState('outro'), []);

    const solvePuzzleFiveData = useCallback(() => setGameState('puzzle6_data'), []);
    const solvePuzzleSixData = useCallback(() => setGameState('puzzle7_data'), []);
    const solvePuzzleSevenData = useCallback(() => setGameState('outro'), []);


    // --- PLACEHOLDER RENDERER ---
    const renderActivePuzzle = () => {
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

        switch (gameState) {
            case 'puzzle1': return <Placeholder title="PUZZLE 1: BINARY" color="cyan" onSolve={solvePuzzleOne} />;
            case 'puzzle2': return <Placeholder title="PUZZLE 2: DOM INSPECTOR" color="cyan" onSolve={solvePuzzleTwo} />;
            case 'puzzle3': return <Placeholder title="PUZZLE 3: LOGIC GATES" color="cyan" onSolve={solvePuzzleThree} />;
            case 'puzzle4': return <Placeholder title="PUZZLE 4: SQL INJECTION" color="cyan" onSolve={solvePuzzleFour} />;

            case 'pathSelection':
                return (
                    <div className="w-full max-w-3xl p-8 border-2 border-yellow-500 bg-yellow-950/30 rounded-lg text-center backdrop-blur-sm">
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

            case 'puzzle5_logic': return <Placeholder title="P5: ALGORITHM RECON" color="purple" onSolve={solvePuzzleFiveLogic} />;
            case 'puzzle6_logic': return <Placeholder title="P6: JAVA DEBUG" color="purple" onSolve={solvePuzzleSixLogic} />;
            case 'puzzle7_logic': return <Placeholder title="P7: RECURSION TRACE" color="purple" onSolve={solvePuzzleSevenLogic} />;

            case 'puzzle5_data': return <Placeholder title="P5: BASE64 DECODER" color="emerald" onSolve={solvePuzzleFiveData} />;
            case 'puzzle6_data': return <Placeholder title="P6: URL BUILDER" color="emerald" onSolve={solvePuzzleSixData} />;
            case 'puzzle7_data': return <Placeholder title="P7: JSON SYNTAX" color="emerald" onSolve={solvePuzzleSevenData} />;

            case 'outro':
                return (
                    <div className="text-center max-w-lg mx-auto p-8 border-2 border-cyan-500 bg-cyan-950/30 rounded backdrop-blur-md">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">KALIBRACE DOKONČENA</h2>
                            <p className="text-cyan-600 font-mono tracking-widest text-sm">SYSTÉM 100% ONLINE</p>
                        </div>
                        <p className="text-slate-300 mb-8 leading-relaxed font-mono">
                            Jádro AURA je plně stabilní. Všechny subsystémy obnoveny.<br/>
                            Děkuji ti, Specialisto. Jsi volný.
                        </p>
                        <button
                            onClick={resetToIntro}
                            className="px-8 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-all rounded font-mono"
                        >
                            HRÁT ZNOVU
                        </button>
                    </div>
                );

            // ZMĚNA: Přidán standardní case pro gameOver místo default fallbacku
            case 'gameOver':
                return (
                    <div className="text-center max-w-lg mx-auto p-8 border-2 border-red-500 bg-red-950/30 rounded backdrop-blur-md">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-red-500 mb-2 font-mono">RESTART SYSTÉMU</h2>
                            <p className="text-red-400 font-mono tracking-widest text-sm">ČAS VYPRŠEL</p>
                        </div>
                        <p className="text-red-300 mb-8 leading-relaxed font-mono">
                            Časový limit vypršel. Jádro AURA selhalo.
                        </p>
                        <button
                            onClick={resetToIntro}
                            className="px-8 py-3 bg-red-500/10 border border-red-500 text-red-400 font-bold hover:bg-red-500 hover:text-black transition-all rounded font-mono"
                        >
                            ZKUSIT ZNOVU
                        </button>
                    </div>
                );

            default:
                return <div className="text-white">Neznámý stav hry: {gameState}</div>;
        }
    };

    // --- HLAVNÍ RENDER ---
    return (
        <div className="min-h-screen bg-[#050a10] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
            {/* Pozadí */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(13,148,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <main className="relative z-10 h-screen">

                {screen === 'menu' && (
                    <MainMenu onNavigate={(target) => {
                        if (target === 'game') setScreen('intro');
                        else setScreen(target);
                    }} />
                )}

                {screen === 'settings' && (
                    <SettingsScreen
                        settings={settings}
                        onUpdateSettings={updateSettings}
                        onBack={() => setScreen('menu')}
                    />
                )}

                {screen === 'intro' && (
                    <IntroScreen
                        onStartGame={startGame}
                        settings={settings}
                    />
                )}

                {screen === 'game' && (
                    <GameScreen
                        settings={settings}
                        currentPhase={gameState} // ZMĚNA: Předáváme aktuální fázi hry (oprava chyby TS2741)
                        onExit={() => setScreen('menu')}
                    >
                        {renderActivePuzzle()}
                    </GameScreen>
                )}

                {screen === 'credits' && (
                    <CreditsScreen onBack={() => setScreen('menu')} />
                )}

            </main>

            {isDevMode && (
                <DevBar
                    currentScreen={screen}
                    onNavigate={(s) => {
                        if (s === 'game' && screen !== 'game') setGameState('puzzle1');
                        setScreen(s);
                    }}
                />
            )}

            {/* Tlačítka pro skok v levelu (zobrazíme jen ve hře) */}
            {isDevMode && screen === 'game' && (
                <div className="fixed bottom-14 right-4 z-50 flex gap-2 items-center">
              <span className="text-xs text-white bg-black/50 px-2 py-1 border border-slate-700 rounded mr-2">
                Time: {remainingTime}s
              </span>
                    <button
                        onClick={() => setRemainingTime(5)}
                        className="bg-red-900 text-white px-2 py-1 text-xs border border-red-500 rounded"
                    >
                        Test Timeout
                    </button>
                </div>
            )}
        </div>
    );
}