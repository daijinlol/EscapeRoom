import React from 'react';

interface ToggleProps {
    label: string;
    active: boolean;
    onToggle: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, active, onToggle }) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-800">
        <span className="font-mono text-slate-300 text-sm">{label}</span>
        <button
            onClick={onToggle}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${active ? 'bg-cyan-500' : 'bg-slate-700'}`}
        >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    </div>
);