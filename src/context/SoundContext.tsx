import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

// Typy zvuků
export type SoundType =
    | 'click' | 'hover' | 'success' | 'error'
    | 'typing' | 'glitch' | 'menu_open' | 'toggle_on' | 'toggle_off';

interface SoundContextType {
    soundEnabled: boolean;
    volume: number;
    setSoundEnabled: (enabled: boolean) => void;
    setVolume: (volume: number) => void;
    play: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Singleton AudioContext
const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = () => {
    if (!sharedAudioCtx) {
        sharedAudioCtx = new AudioContextClass();
    }
    return sharedAudioCtx;
};

export const SoundProvider: React.FC<{
    children: React.ReactNode;
    initialEnabled: boolean;
    initialVolume?: number;
    onSettingsChange?: (enabled: boolean, volume: number) => void;
}> = ({ children, initialEnabled, initialVolume = 0.5, onSettingsChange }) => {

    const [soundEnabled, setSoundEnabledState] = useState(initialEnabled);
    const [volume, setVolumeState] = useState(initialVolume);
    const ctxRef = useRef<AudioContext | null>(null);

    // Synchronizace s rodičem (App.tsx), pokud se změní nastavení zde
    const updateSettings = (en: boolean, vol: number) => {
        setSoundEnabledState(en);
        setVolumeState(vol);
        if (onSettingsChange) onSettingsChange(en, vol);
    };

    const setSoundEnabled = (val: boolean) => updateSettings(val, volume);
    const setVolume = (val: number) => updateSettings(soundEnabled, val);

    // Inicializace AudioContextu
    useEffect(() => {
        if (!ctxRef.current) {
            ctxRef.current = getAudioContext();
        }
    }, []);

    // --- GENERÁTOR ZVUKŮ ---
    const playTone = useCallback((freq: number, type: OscillatorType, duration: number, specificVol: number = 0.1) => {
        const ctx = ctxRef.current;
        if (!ctx || !soundEnabled) return;

        if (ctx.state === 'suspended') ctx.resume().catch(() => {});

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Master Volume aplikace * Hlasitost konkrétního efektu
        const finalVolume = volume * specificVol;

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Obálka (ADSR - Attack, Decay, Sustain, Release zjednodušeně)
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(finalVolume, ctx.currentTime + 0.01); // Attack
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration); // Release

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, [soundEnabled, volume]);

    // --- DEFINICE EFEKTŮ ---
    const play = useCallback((type: SoundType) => {
        if (!soundEnabled) return;

        switch (type) {
            case 'click':
                playTone(1200, 'sine', 0.1, 0.2);
                setTimeout(() => playTone(600, 'square', 0.05, 0.1), 10);
                break;
            case 'hover':
                playTone(400, 'triangle', 0.05, 0.05);
                break;
            case 'success':
                playTone(523.25, 'sine', 0.1, 0.2); // C5
                setTimeout(() => playTone(659.25, 'sine', 0.1, 0.2), 80); // E5
                setTimeout(() => playTone(783.99, 'square', 0.3, 0.1), 160); // G5
                break;
            case 'error':
                playTone(150, 'sawtooth', 0.2, 0.3);
                setTimeout(() => playTone(140, 'sawtooth', 0.2, 0.3), 100);
                break;
            case 'menu_open':
                playTone(200, 'sine', 0.3, 0.2);
                setTimeout(() => playTone(400, 'sine', 0.3, 0.1), 50);
                break;
            case 'toggle_on':
                playTone(800, 'sine', 0.1, 0.2);
                setTimeout(() => playTone(1200, 'sine', 0.1, 0.2), 50);
                break;
            case 'toggle_off':
                playTone(1200, 'sine', 0.1, 0.2);
                setTimeout(() => playTone(800, 'sine', 0.1, 0.2), 50);
                break;
            case 'glitch':
                playTone(Math.random() * 500 + 100, 'sawtooth', 0.1, 0.1);
                break;
            default:
                break;
        }
    }, [soundEnabled, playTone]);

    return (
        <SoundContext.Provider value={{ soundEnabled, volume, setSoundEnabled, setVolume, play }}>
            {children}
        </SoundContext.Provider>
    );
};

// Hook pro použití v komponentách
export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};