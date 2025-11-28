import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import type { SoundType } from '../types';

// Rozhraní pro kontext
interface SoundContextType {
    soundEnabled: boolean;
    volume: number;
    setSoundEnabled: (enabled: boolean) => void;
    setVolume: (volume: number) => void;
    play: (type: SoundType) => void;
}

// 1. Vytvoření kontextu
// eslint-disable-next-line react-refresh/only-export-components
export const SoundContext = createContext<SoundContextType | undefined>(undefined);

// 2. Singleton AudioContext (mimo komponentu, aby přežil re-rendery)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = () => {
    if (!sharedAudioCtx) {
        sharedAudioCtx = new AudioContextClass();
    }
    return sharedAudioCtx;
};

// 3. Provider Komponenta
export const SoundProvider: React.FC<{
    children: React.ReactNode;
    initialEnabled: boolean;
    initialVolume?: number;
    // Callback, kterým SoundProvider informuje svět o změně (např. pro uložení do localStorage)
    onSettingsChange?: (enabled: boolean, volume: number) => void;
}> = ({ children, initialEnabled, initialVolume = 0.5, onSettingsChange }) => {

    const [soundEnabled, setSoundEnabledState] = useState(initialEnabled);
    const [volume, setVolumeState] = useState(initialVolume);
    const ctxRef = useRef<AudioContext | null>(null);

    // Inicializace Audio Contextu
    useEffect(() => {
        if (!ctxRef.current) {
            ctxRef.current = getAudioContext();
        }
    }, []);

    // Reakce na změnu props (např. při startu aplikace)
    useEffect(() => {
        setSoundEnabledState(initialEnabled);
    }, [initialEnabled]);

    useEffect(() => {
        setVolumeState(initialVolume);
    }, [initialVolume]);

    // Interní funkce pro změnu stavu + notifikace rodiče
    const updateState = (en: boolean, vol: number) => {
        setSoundEnabledState(en);
        setVolumeState(vol);
        if (onSettingsChange) {
            onSettingsChange(en, vol);
        }
    };

    const setSoundEnabled = (val: boolean) => updateState(val, volume);
    const setVolume = (val: number) => updateState(soundEnabled, val);

    // Generátor tónů
    const playTone = useCallback((freq: number, type: OscillatorType, duration: number, specificVol: number = 0.1) => {
        const ctx = ctxRef.current;
        if (!ctx || !soundEnabled) return;

        if (ctx.state === 'suspended') ctx.resume().catch(() => {});

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        const finalVolume = volume * specificVol;

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(finalVolume, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, [soundEnabled, volume]);

    // Veřejná funkce play()
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
                playTone(523.25, 'sine', 0.1, 0.2);
                setTimeout(() => playTone(659.25, 'sine', 0.1, 0.2), 80);
                setTimeout(() => playTone(783.99, 'square', 0.3, 0.1), 160);
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
            case 'typing':
                playTone(800, 'sine', 0.03, 0.05);
                break;
        }
    }, [soundEnabled, playTone]);

    return (
        <SoundContext.Provider value={{ soundEnabled, volume, setSoundEnabled, setVolume, play }}>
            {children}
        </SoundContext.Provider>
    );
};

// 4. Hook (exportovaný přímo odtud, aby to bylo jednoduché)
// eslint-disable-next-line react-refresh/only-export-components
export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};