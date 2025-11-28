export type Language = 'cs' | 'en';

// Definice obtížností
export type Difficulty =
    | 'zs_6' | 'zs_7' | 'zs_8' | 'zs_9'
    | 'ss_1' | 'ss_2' | 'ss_3' | 'ss_4';

// Seznam obrazovek
export type ScreenState = 'menu' | 'intro' | 'game' | 'settings' | 'credits';

// Definice stavů pro konkrétní hádanky
export type GamePhase =
    | 'puzzle1'
    | 'puzzle2'
    | 'puzzle3'
    | 'puzzle4'
    | 'pathSelection'
    | 'puzzle5_logic' | 'puzzle5_data'
    | 'puzzle6_logic' | 'puzzle6_data'
    | 'puzzle7_logic' | 'puzzle7_data'
    | 'outro'
    | 'gameOver'; // <--- PŘIDÁNO

export interface GameSettings {
    language: Language;
    difficulty: Difficulty;
    allowHints: boolean;
    soundEnabled: boolean;
}

// Struktura pro Level v menu
export interface LevelInfo {
    id: string;
    labelKey: string;
    phase: GamePhase;
}