import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ShieldAlert, Settings as SettingsIcon, Volume2 } from 'lucide-react';
import { CyberButton } from '../components/ui/CyberButton';
import { SelectionCard } from '../components/ui/SelectionCard';
import { Toggle } from '../components/ui/Toggle';
import { VolumeSlider } from '../components/ui/VolumeSlider';
import { useSound } from '../hooks/useSound';
import type { GameSettings, Difficulty } from '../types';

interface SettingsScreenProps {
    settings: GameSettings;
    onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
    onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings, onUpdateSettings, onBack }) => {
    const { t, i18n } = useTranslation();
    const { play, setVolume, setSoundEnabled } = useSound();

    const changeLanguage = (lang: 'cs' | 'en') => {
        play('click');
        i18n.changeLanguage(lang);
        onUpdateSettings({ language: lang });
    };

    // Handler pro přepnutí zvuku
    const handleToggleSound = () => {
        const newState = !settings.soundEnabled;
        play(newState ? 'toggle_on' : 'toggle_off');

        // 1. Aktualizace Audio Enginu
        setSoundEnabled(newState);
        // 2. Uložení do nastavení hry
        onUpdateSettings({ soundEnabled: newState });
    };

    // Handler pro změnu hlasitosti
    const handleVolumeChange = (vol: number) => {
        // 1. Okamžitá změna hlasitosti v AudioEngine
        setVolume(vol);

        const newSettings: Partial<GameSettings> = { volume: vol };

        // Pokud uživatel hýbe sliderem a má vypnutý zvuk, automaticky ho zapneme
        if (vol > 0 && !settings.soundEnabled) {
            setSoundEnabled(true);
            newSettings.soundEnabled = true;
        }

        // 2. Uložení do nastavení hry
        onUpdateSettings(newSettings);
    };

    return (
        <div className="flex flex-col h-full max-w-2xl w-full mx-auto p-6 animate-fade-in">
            <h2 className="text-2xl font-mono font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">
                {t('settings')}
            </h2>

            <div className="space-y-8 overflow-y-auto pb-20 custom-scrollbar pr-2">

                {/* Jazyk */}
                <section>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
                        <Globe size={14} /> {t('lang')}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => changeLanguage('cs')}
                            className={`p-3 font-mono text-sm border transition-all ${i18n.language === 'cs' ? 'bg-cyan-500 text-black border-cyan-500 font-bold' : 'border-slate-700 text-slate-400'}`}
                        >
                            ČEŠTINA
                        </button>
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`p-3 font-mono text-sm border transition-all ${i18n.language === 'en' ? 'bg-cyan-500 text-black border-cyan-500 font-bold' : 'border-slate-700 text-slate-400'}`}
                        >
                            ENGLISH
                        </button>
                    </div>
                </section>

                {/* Obtížnost */}
                <section>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
                        <ShieldAlert size={14} /> {t('difficulty')}
                    </h3>

                    <div className="mb-6">
                        <p className="text-cyan-400/70 text-[10px] font-bold mb-3 uppercase tracking-wider border-b border-cyan-900/30 pb-1">
                            {t('section_primary')}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(['zs_6', 'zs_7', 'zs_8', 'zs_9'] as Difficulty[]).map((diff) => (
                                <SelectionCard
                                    key={diff}
                                    title={t(`diff_${diff}`)}
                                    description={t(`diff_desc_${diff}`)}
                                    active={settings.difficulty === diff}
                                    onClick={() => onUpdateSettings({ difficulty: diff })}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-cyan-400/70 text-[10px] font-bold mb-3 uppercase tracking-wider border-b border-cyan-900/30 pb-1">
                            {t('section_secondary')}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(['ss_1', 'ss_2', 'ss_3', 'ss_4'] as Difficulty[]).map((diff) => (
                                <SelectionCard
                                    key={diff}
                                    title={t(`diff_${diff}`)}
                                    description={t(`diff_desc_${diff}`)}
                                    active={settings.difficulty === diff}
                                    onClick={() => onUpdateSettings({ difficulty: diff })}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Nastavení a Zvuk */}
                <section>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2">
                        <SettingsIcon size={14} /> {t('options')}
                    </h3>

                    <Toggle
                        label={t('allow_hints')}
                        active={settings.allowHints}
                        onToggle={() => {
                            play('click');
                            onUpdateSettings({ allowHints: !settings.allowHints });
                        }}
                    />

                    <Toggle
                        label={t('sound')}
                        active={settings.soundEnabled}
                        onToggle={handleToggleSound}
                    />

                    <div className={`mt-2 px-2 border-l-2 border-slate-800 transition-all duration-300 ${settings.soundEnabled ? 'opacity-100 translate-x-0' : 'opacity-40 pointer-events-none -translate-x-2'}`}>
                        <div className="flex items-center gap-2 mb-1 text-xs text-slate-400 font-mono uppercase tracking-wider">
                            <Volume2 size={12} /> Master Volume
                        </div>
                        <VolumeSlider
                            value={settings.volume ?? 0.5}
                            onChange={handleVolumeChange}
                        />
                    </div>
                </section>

            </div>

            <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto pointer-events-none">
                <div className="pointer-events-auto">
                    <CyberButton variant="secondary" onClick={onBack}>
                        {t('back')}
                    </CyberButton>
                </div>
            </div>
        </div>
    );
};