export type Language = 'cs' | 'en';

export type Difficulty =
    | 'zs_6' | 'zs_7' | 'zs_8' | 'zs_9'
    | 'ss_1' | 'ss_2' | 'ss_3' | 'ss_4';

export type ScreenState = 'menu' | 'intro' | 'game' | 'settings' | 'credits';

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
    | 'gameOver';

export interface GameSettings {
    language: Language;
    difficulty: Difficulty;
    allowHints: boolean;
    soundEnabled: boolean;
    volume: number;
}

export interface LevelInfo {
    id: string;
    labelKey: string;
    phase: GamePhase;
}

export interface LogEntry {
    id: string;
    text: string;
    type: 'info' | 'error' | 'success' | 'system';
    timestamp: string;
}

// --- ZVUKY (Přesunuto sem pro globální dostupnost) ---
export type SoundType =
    | 'click' | 'hover' | 'success' | 'error'
    | 'typing' | 'glitch' | 'menu_open' | 'toggle_on' | 'toggle_off';