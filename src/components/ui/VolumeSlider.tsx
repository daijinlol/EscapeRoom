import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeSliderProps {
    value: number; // 0 až 1
    onChange: (val: number) => void;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({ value, onChange }) => {
    // Zajistíme, že hodnota je validní číslo (pro jistotu)
    const safeValue = isNaN(value) ? 0.5 : Math.max(0, Math.min(1, value));

    return (
        <div className="flex items-center gap-4 py-2 w-full animate-fade-in">
            <button
                onClick={() => onChange(safeValue === 0 ? 0.5 : 0)}
                className="text-cyan-400 hover:text-white transition-colors focus:outline-none"
                title={safeValue === 0 ? "Zapnout zvuk" : "Vypnout zvuk"}
            >
                {safeValue === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <div className="relative flex-1 h-6 flex items-center group cursor-pointer">
                {/* Background Track */}
                <div className="absolute w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    {/* Active Track */}
                    <div
                        className="h-full bg-cyan-500 transition-all duration-75 ease-out group-hover:bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        style={{ width: `${safeValue * 100}%` }}
                    />
                </div>

                {/* Range Input (neviditelný, ale zajišťuje funkčnost) */}
                {/* Důležité: z-20 zajistí, že je nad vším ostatním a chytá eventy */}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={safeValue}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    aria-label="Volume"
                />

                {/* Custom "Držátko" (Thumb) */}
                {/* Pointer-events-none je klíčové, aby držátko neblokovalo input pod ním */}
                <div
                    className="absolute h-3 w-3 bg-cyan-200 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-white z-10"
                    style={{ left: `calc(${safeValue * 100}% - 6px)` }}
                />
            </div>

            <span className="font-mono text-xs text-cyan-400 w-8 text-right font-bold">
                {Math.round(safeValue * 100)}%
            </span>
        </div>
    );
};