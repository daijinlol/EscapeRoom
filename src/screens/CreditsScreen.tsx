import React from 'react';
import { useTranslation } from 'react-i18next';
import { CyberButton } from '../components/ui/CyberButton';

interface CreditsScreenProps {
    onBack: () => void;
}

export const CreditsScreen: React.FC<CreditsScreenProps> = ({ onBack }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-full max-w-md w-full mx-auto p-6 justify-center text-center animate-fade-in">
            <h2 className="text-2xl text-white mb-4 font-mono font-bold">
                {t('credits')}
            </h2>

            <div className="bg-slate-900/50 border border-slate-700 p-6 font-mono text-sm text-slate-300 space-y-4 mb-8 rounded shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <p>
                    <span className="text-cyan-400 block text-xs uppercase tracking-widest mb-1">{t('credits_author_label')}</span>
                    {t('credits_author_name')}
                </p>
                <p>
                    <span className="text-cyan-400 block text-xs uppercase tracking-widest mb-1">{t('credits_type_label')}</span>
                    {t('credits_type_value')}
                </p>
                <p>
                    <span className="text-cyan-400 block text-xs uppercase tracking-widest mb-1">{t('credits_version_label')}</span>
                    2.0 (New Architecture)
                </p>
            </div>

            <div className="w-full">
                <CyberButton variant="secondary" onClick={onBack}>
                    {t('back')}
                </CyberButton>
            </div>
        </div>
    );
};