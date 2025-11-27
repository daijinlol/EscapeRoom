import React from 'react';
// ZMĚNA ZDE: Přidáno 'type' před LucideIcon
import { ChevronRight, type LucideIcon } from 'lucide-react';

interface CyberButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    icon?: LucideIcon;
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
                                                            onClick,
                                                            children,
                                                            icon: Icon,
                                                            variant = 'primary',
                                                            className = ''
                                                        }) => {
    const baseStyle = "relative group w-full px-6 py-4 mb-4 font-mono font-bold tracking-widest uppercase transition-all duration-200 border-2 clip-path-polygon cursor-pointer flex items-center justify-between";

    const variants = {
        primary: "bg-cyan-950/50 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]",
        secondary: "bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-300 hover:text-white",
        danger: "bg-red-950/30 border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]",
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span className="flex items-center gap-3">
        {Icon && <Icon size={20} />}
          {children}
      </span>
            <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
        </button>
    );
};