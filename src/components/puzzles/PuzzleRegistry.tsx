import React from 'react';
import { useGame } from '../../hooks/useGame';
import { getLevelConfig, type PuzzleType } from '../../data/difficultyRules';

// Importy konkrétních hádanek
import { BinaryPuzzle } from './BinaryPuzzle';

// Placeholder pro neexistující hádanky (aby aplikace nespadla)
const PuzzlePlaceholder = ({ type }: { type: string }) => (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-lg text-center animate-pulse">
        <h3 className="text-xl font-mono text-slate-400 mb-2">MODULE NOT FOUND</h3>
        <p className="text-sm font-mono text-slate-600">ID: {type}</p>
        <p className="text-xs text-slate-700 mt-4">Work in progress...</p>
    </div>
);

// Mapování klíčů na komponenty
export const CurrentPuzzleRenderer: React.FC = () => {
    const { settings, gameState } = useGame();

    // 1. Zjistíme konfiguraci pro aktuální obtížnost
    const config = getLevelConfig(settings.difficulty);

    // 2. Zjistíme, jaký typ hádanky má být v aktuální fázi
    // ZDE JE OPRAVA: Explicitně říkáme, že tato proměnná je typu PuzzleType
    // Tím využijeme importovaný typ a ESLint přestane křičet.
    const puzzleType: PuzzleType = config.puzzles[gameState] || 'placeholder';

    console.log(`[PuzzleRegistry] Rendering: ${puzzleType} for phase: ${gameState}`);

    // 3. Router komponent
    switch (puzzleType) {
        // --- BINÁRNÍ VARIANTY ---
        case 'binary_basic':
            return <BinaryPuzzle mode="number" bitCount={5} />;
        case 'binary_advanced':
            return <BinaryPuzzle mode="ascii" bitCount={8} />;

        // --- PŘÍPRAVA PRO DALŠÍ HÁDANKY ---
        case 'cipher_caesar':
            return <PuzzlePlaceholder type="cipher_caesar" />;

        case 'network_path':
            return <PuzzlePlaceholder type="network_path" />;

        case 'logic_gates_basic':
        case 'logic_gates_adv':
            return <PuzzlePlaceholder type={puzzleType} />;

        case 'coding_blocks':
        case 'coding_js':
            return <PuzzlePlaceholder type={puzzleType} />;

        case 'sql_basic':
            return <PuzzlePlaceholder type="sql_basic" />;

        // --- FALLBACK ---
        case 'placeholder':
        default:
            return <PuzzlePlaceholder type={puzzleType} />;
    }
};