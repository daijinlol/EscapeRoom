import React from 'react';
import { Check } from 'lucide-react';

interface SelectionCardProps {
    title: string;
    description: string;
    active: boolean;
    onClick: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ title, description, active, onClick }) => (
    <div
        onClick={onClick}
        className={`cursor-pointer p-4 mb-3 border-l-4 border transition-all duration-300 ${
            active
                ? 'bg-cyan-950/40 border-cyan-400 border-l-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                : 'bg-slate-900/40 border-slate-700 border-l-slate-700 hover:border-slate-500'
        }`}
    >
        <div className="flex items-center justify-between mb-1">
            <h3 className={`font-mono font-bold ${active ? 'text-cyan-400' : 'text-slate-300'}`}>{title}</h3>
            {active && <Check size={18} className="text-cyan-400" />}
        </div>
        <p className="text-xs text-slate-400 font-mono leading-relaxed">{description}</p>
    </div>
);