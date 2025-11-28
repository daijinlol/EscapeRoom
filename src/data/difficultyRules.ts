import { type Difficulty, type GamePhase } from '../types';

// Definice typů hádanek (klíče do registru)
export type PuzzleType =
    | 'binary_basic'       // ZŠ: 5 bitů, čísla
    | 'binary_advanced'    // SŠ: 8 bitů, ASCII
    | 'cipher_caesar'      // ZŠ: Jednoduchá šifra
    | 'logic_gates_basic'  // ZŠ: Jednoduchá hradla
    | 'logic_gates_adv'    // SŠ: Složité obvody
    | 'coding_blocks'      // ZŠ: Blokové programování
    | 'coding_js'          // SŠ: Oprava JS kódu
    | 'network_path'       // Spojování kabelů
    | 'sql_basic'          // SŠ: SQL Injection
    | 'placeholder';       // Pro zatím neexistující

// Konfigurace Levelu
export interface LevelConfig {
    storyKey: string;
    themeColor: string;
    // Mapování fází hry na konkrétní typy hádanek
    puzzles: Record<GamePhase, PuzzleType>;
}

const DEFAULT_PUZZLES: Record<GamePhase, PuzzleType> = {
    puzzle1: 'placeholder', puzzle2: 'placeholder', puzzle3: 'placeholder',
    puzzle4: 'placeholder', pathSelection: 'placeholder',
    puzzle5_logic: 'placeholder', puzzle6_logic: 'placeholder', puzzle7_logic: 'placeholder',
    puzzle5_data: 'placeholder', puzzle6_data: 'placeholder', puzzle7_data: 'placeholder',
    outro: 'placeholder', gameOver: 'placeholder'
};

export const DIFFICULTY_RULES: Record<Difficulty, LevelConfig> = {
    // --- ZŠ 6 ---
    'zs_6': {
        storyKey: 'story_zs_6', // Junior Detective
        themeColor: '#4ade80', // green-400
        puzzles: { ...DEFAULT_PUZZLES, puzzle1: 'cipher_caesar', puzzle2: 'network_path' }
    },
    // --- ZŠ 7 ---
    'zs_7': {
        storyKey: 'story_zs_7', // Explorer
        themeColor: '#4ade80',
        puzzles: { ...DEFAULT_PUZZLES, puzzle1: 'cipher_caesar' }
    },
    // --- ZŠ 8 ---
    'zs_8': {
        storyKey: 'story_zs_8', // Admin (Binary)
        themeColor: '#fbbf24', // amber-400
        puzzles: { ...DEFAULT_PUZZLES, puzzle1: 'binary_basic', puzzle2: 'coding_blocks' }
    },
    // --- ZŠ 9 ---
    'zs_9': {
        storyKey: 'story_zs_9', // Architect
        themeColor: '#fbbf24',
        puzzles: { ...DEFAULT_PUZZLES, puzzle1: 'binary_basic' }
    },

    // --- SŠ 1 ---
    'ss_1': {
        storyKey: 'story_ss_1', // Hacker
        themeColor: '#22d3ee', // cyan-400
        puzzles: { ...DEFAULT_PUZZLES, puzzle1: 'binary_advanced', puzzle2: 'logic_gates_adv' }
    },
    // --- SŠ 2 ---
    'ss_2': {
        storyKey: 'story_ss_2', // Network
        themeColor: '#22d3ee',
        puzzles: { ...DEFAULT_PUZZLES, puzzle1: 'binary_advanced' }
    },
    // --- SŠ 3 ---
    'ss_3': {
        storyKey: 'story_ss_3', // Database
        themeColor: '#a78bfa', // violet-400
        puzzles: { ...DEFAULT_PUZZLES, puzzle1: 'binary_advanced', puzzle4: 'sql_basic' }
    },
    // --- SŠ 4 ---
    'ss_4': {
        storyKey: 'story_ss_4', // Expert
        themeColor: '#f472b6', // pink-400
        puzzles: { ...DEFAULT_PUZZLES, puzzle1: 'binary_advanced', puzzle4: 'sql_basic' }
    },
};

export const getLevelConfig = (difficulty: Difficulty): LevelConfig => {
    return DIFFICULTY_RULES[difficulty];
};