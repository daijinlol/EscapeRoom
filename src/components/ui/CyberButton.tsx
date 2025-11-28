import React from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

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

    const { play } = useSound();

    // Přidáno overflow-hidden, aby posuvné pozadí nevyčuhovalo
    const baseStyle = "relative group w-full px-6 py-4 mb-4 font-mono font-bold tracking-widest uppercase border-2 clip-path-polygon cursor-pointer flex items-center justify-between overflow-hidden transition-all duration-200";

    const variants = {
        // Odebráno hover:text-black z kontejneru, budeme to řešit na elementech uvnitř pro lepší kontrolu
        primary: "bg-cyan-950/50 border-cyan-400 text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]",
        secondary: "bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-300 hover:text-white",
        danger: "bg-red-950/30 border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]",
    };

    const handleClick = () => {
        play('click');
        onClick();
    };

    const handleMouseEnter = () => {
        play('hover');
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {/* 1. Pozadí pro hover efekt (Slide in) */}
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
            )}

            {/* 2. Obsah tlačítka - Text */}
            <span className={`flex items-center gap-3 relative z-10 transition-colors duration-300 ${variant === 'primary' ? 'group-hover:text-black' : ''}`}>
                {Icon && <Icon size={20} />}
                {children}
            </span>

            {/* 3. Šipka */}
            <ChevronRight
                size={18}
                className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 relative z-10 ${variant === 'primary' ? 'group-hover:text-black' : ''}`}
            />
        </button>
    );
};