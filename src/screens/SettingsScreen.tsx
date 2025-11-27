import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ShieldAlert, Settings as SettingsIcon } from 'lucide-react';
import { CyberButton } from '../components/ui/CyberButton';
import { SelectionCard } from '../components/ui/SelectionCard';
import { Toggle } from '../components/ui/Toggle';
import type { GameSettings, Difficulty } from '../types';

interface SettingsScreenProps {
    settings: GameSettings;
    onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
    onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings, onUpdateSettings, onBack }) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang: 'cs' | 'en') => {
        i18n.changeLanguage(lang);
        onUpdateSettings({ language: lang });
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

                {/* Obtížnost - ZŠ */}
                <section>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
                        <ShieldAlert size={14} /> {t('difficulty')}
                    </h3>

                    <div className="mb-6">
                        <p className="text-cyan-400/70 text-[10px] font-bold mb-3 uppercase tracking-wider border-b border-cyan-900/30 pb-1">
                            {t('section_primary')}
                        </p>
                        {/* Grid 2 sloupce pro ZŠ */}
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

                    {/* Obtížnost - SŠ */}
                    <div>
                        <p className="text-cyan-400/70 text-[10px] font-bold mb-3 uppercase tracking-wider border-b border-cyan-900/30 pb-1">
                            {t('section_secondary')}
                        </p>
                        {/* Grid 2 sloupce pro SŠ */}
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

                {/* Přepínače */}
                <section>
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2">
                        <SettingsIcon size={14} /> {t('options')}
                    </h3>
                    <Toggle
                        label={t('allow_hints')}
                        active={settings.allowHints}
                        onToggle={() => onUpdateSettings({ allowHints: !settings.allowHints })}
                    />
                    <Toggle
                        label={t('sound')}
                        active={settings.soundEnabled}
                        onToggle={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                    />
                </section>

            </div>

            {/* Back Button */}
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