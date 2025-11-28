import { type Difficulty } from '../types';

// Definice toho, co všechno se mění podle obtížnosti
export interface LevelConfig {
    storyKey: string;      // Klíč pro překlad příběhu v Intru
    themeColor: string;    // Hlavní barva (pro CSS/Tailwind třídy nebo styly)
    puzzleSet: 'basic' | 'advanced'; // Jakou sadu hádanek použít (pro budoucí logiku)
}

// Konfigurace pro každou obtížnost
export const DIFFICULTY_RULES: Record<Difficulty, LevelConfig> = {
    // --- ZŠ (Zelená/Oranžová tématika, jednodušší příběh) ---
    'zs_6': {
        storyKey: 'intro_story_junior',
        themeColor: '#4ade80', // green-400
        puzzleSet: 'basic',
    },
    'zs_7': {
        storyKey: 'intro_story_junior',
        themeColor: '#4ade80',
        puzzleSet: 'basic',
    },
    'zs_8': {
        storyKey: 'intro_story_junior', // Zde už bychom mohli dát 'intro_story_med'
        themeColor: '#fbbf24', // amber-400
        puzzleSet: 'basic',
    },
    'zs_9': {
        storyKey: 'intro_story_senior', // Deváťáci už snesou "dospělejší" příběh
        themeColor: '#fbbf24',
        puzzleSet: 'advanced', // Už mohou mít těžší hádanky
    },

    // --- SŠ (Modrá/Fialová tématika, technický příběh) ---
    'ss_1': {
        storyKey: 'intro_story_senior',
        themeColor: '#60a5fa', // blue-400
        puzzleSet: 'advanced',
    },
    'ss_2': {
        storyKey: 'intro_story_senior',
        themeColor: '#22d3ee', // cyan-400 (Naše výchozí)
        puzzleSet: 'advanced',
    },
    'ss_3': {
        storyKey: 'intro_story_senior',
        themeColor: '#a78bfa', // violet-400
        puzzleSet: 'advanced',
    },
    'ss_4': {
        storyKey: 'intro_story_senior',
        themeColor: '#f472b6', // pink-400 (Expert/Hardcore)
        puzzleSet: 'advanced',
    },
};

// Pomocná funkce pro získání konfigurace
export const getLevelConfig = (difficulty: Difficulty): LevelConfig => {
    return DIFFICULTY_RULES[difficulty];
};