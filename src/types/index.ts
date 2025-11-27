export type Language = 'cs' | 'en';

// ZMĚNA: 8 úrovní obtížnosti podle ročníků
export type Difficulty =
// 2. stupeň ZŠ
    | 'zs_6' // 6. třída
    | 'zs_7' // 7. třída
    | 'zs_8' // 8. třída (Nová informatika - Datové typy)
    | 'zs_9' // 9. třída
    // Střední škola (Gymnázium/SOŠ)
    | 'ss_1' // 1. ročník
    | 'ss_2' // 2. ročník
    | 'ss_3' // 3. ročník
    | 'ss_4'; // 4. ročník (Maturitní)

export type ScreenState = 'menu' | 'game' | 'settings' | 'credits';

export interface GameSettings {
    language: Language;
    difficulty: Difficulty;
    allowHints: boolean;
    soundEnabled: boolean;
}