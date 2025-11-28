import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeSliderProps {
    value: number; // 0 až 1
    onChange: (val: number) => void;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({ value, onChange }) => {
    return (
        <div className="flex items-center gap-4 py-2 w-full">
            <button
                onClick={() => onChange(value === 0 ? 0.5 : 0)}
                className="text-cyan-400 hover:text-white transition-colors"
            >
                {value === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <div className="relative flex-1 h-6 flex items-center group">
                {/* Background Track */}
                <div className="absolute w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    {/* Active Track */}
                    <div
                        className="h-full bg-cyan-500 transition-all duration-100 ease-out group-hover:bg-cyan-400"
                        style={{ width: `${value * 100}%` }}
                    />
                </div>

                {/* Range Input (neviditelný, ale funkční) */}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                />

                {/* Custom Thumb (Držátko) */}
                <div
                    className="absolute h-4 w-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] pointer-events-none transition-all duration-100 ease-out group-hover:scale-125"
                    style={{ left: `calc(${value * 100}% - 8px)` }}
                />
            </div>

            <span className="font-mono text-xs text-cyan-400 w-8 text-right">
                {Math.round(value * 100)}%
            </span>
        </div>
    );
};