import React, { useState, useEffect, useMemo } from 'react';
import { useGame } from '../../hooks/useGame';
import { useSound } from '../../hooks/useSound';
import { CyberButton } from '../ui/CyberButton';
import { Check, RefreshCw, Calculator, Binary } from 'lucide-react';

// Props pro konfiguraci zvenčí
interface BinaryPuzzleProps {
    mode: 'number' | 'ascii';
    bitCount: number;
}

export const BinaryPuzzle: React.FC<BinaryPuzzleProps> = ({ mode, bitCount }) => {
    const { solvePuzzle, addLog } = useGame();
    const { play } = useSound();

    const [targetValue, setTargetValue] = useState<number | string>(0);
    const [bits, setBits] = useState<boolean[]>(Array(bitCount).fill(false));

    useEffect(() => {
        generatePuzzle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, bitCount]);

    const generatePuzzle = () => {
        if (mode === 'ascii') {
            // ASCII A-Z (65-90)
            const charCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
            setTargetValue(String.fromCharCode(charCode));
        } else {
            // Číslo podle počtu bitů (např. 5 bitů = max 31)
            const maxVal = Math.pow(2, bitCount) - 1;
            const num = Math.floor(Math.random() * maxVal) + 1;
            setTargetValue(num);
        }
        setBits(Array(bitCount).fill(false));
    };

    const currentValue = useMemo(() => {
        return bits.reduce((acc, bit, index) => {
            const power = bitCount - 1 - index;
            return acc + (bit ? Math.pow(2, power) : 0);
        }, 0);
    }, [bits, bitCount]);

    const handleBitToggle = (index: number) => {
        play('click');
        const newBits = [...bits];
        newBits[index] = !newBits[index];
        setBits(newBits);
    };

    const checkSolution = () => {
        let isCorrect = false;
        if (mode === 'ascii') {
            isCorrect = currentValue === (targetValue as string).charCodeAt(0);
        } else {
            isCorrect = currentValue === (targetValue as number);
        }

        if (isCorrect) {
            solvePuzzle('puzzle2', `Sequence verified. ${mode.toUpperCase()} decoder unlocked.`);
        } else {
            addLog('Incorrect binary sequence.', 'error');
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl animate-fade-in">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-cyan-400/80 font-mono text-sm tracking-widest uppercase">
                    {mode === 'ascii' ? <Binary size={16} /> : <Calculator size={16} />}
                    {mode === 'ascii' ? 'ASCII DECODER' : 'BINARY NUMBER DECODER'}
                </div>

                <div className="relative group">
                    <div className="text-6xl md:text-7xl font-black text-white font-mono bg-black/40 border-2 border-cyan-900/50 px-12 py-6 rounded shadow-[0_0_30px_rgba(34,211,238,0.1)] backdrop-blur-sm">
                        {targetValue}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 md:gap-4 justify-center flex-wrap bg-slate-900/20 p-6 rounded-xl border border-slate-800/50">
                {bits.map((isOn, index) => {
                    const power = bitCount - 1 - index;
                    const value = Math.pow(2, power);

                    return (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <div className="text-slate-600 font-mono text-[10px] mb-1">{value}</div>
                            <button
                                onClick={() => handleBitToggle(index)}
                                className={`
                                    w-10 h-14 md:w-14 md:h-20 rounded border-2 font-mono text-xl md:text-2xl font-bold transition-all duration-200
                                    flex items-center justify-center relative overflow-hidden
                                    ${isOn
                                    ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)] translate-y-0.5'
                                    : 'bg-black/40 border-slate-700 text-slate-600 hover:border-slate-500 -translate-y-0.5'}
                                `}
                            >
                                <span className="z-10">{isOn ? '1' : '0'}</span>
                            </button>
                            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isOn ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-slate-800'}`} />
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col items-center gap-1 font-mono">
                <div className="text-cyan-600 text-xs tracking-widest">CURRENT VALUE</div>
                <div className="text-xl text-white">
                    {currentValue}
                    {mode === 'ascii' && <span className="text-slate-500 ml-2">('{String.fromCharCode(currentValue)}')</span>}
                </div>
            </div>

            <div className="flex gap-4 w-full max-w-md mt-4">
                <CyberButton onClick={checkSolution} icon={Check} className="flex-1">
                    VERIFY
                </CyberButton>
                <button
                    onClick={() => { play('click'); generatePuzzle(); }}
                    className="p-4 border border-slate-700 text-slate-500 hover:text-white hover:border-white transition-all rounded"
                >
                    <RefreshCw size={20} />
                </button>
            </div>
        </div>
    );
};