import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Importujeme styly pro animace (musí existovat ve složce src/styles)
import '../styles/intro-animations.css';
// Importujeme pravidla obtížnosti a typy
import { getLevelConfig } from '../data/difficultyRules';
import type { GameSettings } from '../types';

interface IntroScreenProps {
    onStartGame: () => void;
    settings: GameSettings; // Potřebujeme znát nastavenou obtížnost
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStartGame, settings }) => {
    const { t } = useTranslation();

    // Načteme konfiguraci (barvu a klíč příběhu) podle zvolené obtížnosti
    const config = getLevelConfig(settings.difficulty);

    const [bootProgress, setBootProgress] = useState(0);
    const [isBooted, setIsBooted] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [charIndex, setCharIndex] = useState(0);

    // Načteme text příběhu dynamicky.
    // @ts-ignore (TypeScriptu se nelíbí dynamické klíče, ale i18next to zvládne)
    const storyText = t(config.storyKey);

    // FÁZE 1: Bootovací sekvence
    useEffect(() => {
        if (bootProgress < 100) {
            const timeout = setTimeout(() => {
                const increment = Math.floor(Math.random() * 5) + 1;
                setBootProgress(prev => Math.min(prev + increment, 100));
            }, 50);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => { setIsBooted(true); }, 800);
            return () => clearTimeout(timeout);
        }
    }, [bootProgress]);

    // FÁZE 2: Psaní textu
    useEffect(() => {
        if (isBooted && charIndex < storyText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + storyText.charAt(charIndex));
                setCharIndex(prev => prev + 1);
            }, 30);
            return () => clearTimeout(timeout);
        }
    }, [isBooted, charIndex, storyText]);

    return (
        // Celý wrapper má nastavenou barvu textu podle tématu
        <div className="intro-wrapper" style={{ color: config.themeColor }}>
            {/* Mřížka na pozadí */}
            <div className="intro-grid-bg"></div>
            {/* Scanline efekt */}
            <div className="scanline"></div>

            {/* Obsahový box s dynamickým okrajem */}
            <div className="intro-content-box" style={{ borderColor: config.themeColor }}>

                {/* Dekorativní rohy boxu - dynamicky obarvené */}
                <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-4 border-l-4" style={{ borderColor: config.themeColor }} />
                <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-4 border-r-4" style={{ borderColor: config.themeColor }} />

                {/* Hlavička */}
                <h1 className="glitch-title text-5xl md:text-7xl font-black text-center text-white mb-2 tracking-widest">
                    {t('intro_app_title')}
                </h1>

                <p className="intro-subtitle" style={{ color: config.themeColor }}>
                    {t('intro_app_subtitle')}
                </p>

                {!isBooted ? (
                    /* LOADING BAR */
                    <div className="w-full my-8">
                        <div className="text-sm text-gray-400 mb-2 font-mono">
                            {t('intro_loading')} {bootProgress}%
                        </div>
                        <div className="w-full h-1.5 bg-gray-900 border border-gray-700">
                            <div
                                className="h-full shadow-[0_0_10px_currentColor] transition-all duration-100 ease-linear"
                                style={{ width: `${bootProgress}%`, backgroundColor: config.themeColor }}
                            />
                        </div>

                        <div className="mt-4 text-xs text-gray-500 font-mono space-y-1">
                            {bootProgress > 20 && <div>{t('intro_log_1')}</div>}
                            {bootProgress > 50 && <div>{t('intro_log_2')}</div>}
                            {bootProgress > 80 && <div>{t('intro_log_3')}</div>}
                        </div>
                    </div>
                ) : (
                    /* PŘÍBĚH A TLAČÍTKO */
                    <>
                        <div className="text-base md:text-lg leading-relaxed text-gray-200 whitespace-pre-wrap min-h-[150px]">
                            {displayedText}
                            <span
                                className="inline-block w-2.5 h-5 ml-1 align-text-bottom animate-blink"
                                style={{ backgroundColor: config.themeColor }}
                            />
                        </div>

                        {charIndex === storyText.length && (
                            <div className="flex justify-center mt-12 animate-fade-in">
                                <button
                                    onClick={onStartGame}
                                    className="bg-transparent font-bold text-xl py-4 px-10 border-2 hover:text-black transition-all duration-300 tracking-widest uppercase relative overflow-hidden group"
                                    // Dynamické styly pro tlačítko (barva, stín)
                                    style={{
                                        color: config.themeColor,
                                        borderColor: config.themeColor,
                                        boxShadow: `0 0 10px ${config.themeColor}40`
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = config.themeColor;
                                        e.currentTarget.style.boxShadow = `0 0 20px ${config.themeColor}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.boxShadow = `0 0 10px ${config.themeColor}40`;
                                    }}
                                >
                                    {t('intro_btn_start')}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};