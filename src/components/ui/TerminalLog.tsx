import React, { useEffect, useRef } from 'react';
import type { LogEntry } from '../../types';

interface TerminalLogProps {
    logs: LogEntry[];
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll dolů při nové zprávě
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        // Hlavní kontejner bez paddingu, aby hlavička seděla na okraji
        <div className="w-full h-full bg-black/80 border-t-2 border-cyan-900/50 font-mono text-xs flex flex-col">

            {/* Fixní hlavička - oddělená od scrollu */}
            <div className="flex-none py-2 px-4 text-slate-500 border-b border-slate-800 bg-black/90 w-full flex justify-between z-10">
                <span>// SYSTEM_LOG_OUTPUT</span>
                <span>AURA_CORE_V2</span>
            </div>

            {/* Scrollovatelná oblast pro logy - padding je až tady uvnitř */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-1">
                {logs.length === 0 && (
                    <span className="text-slate-700 italic">// Waiting for input...</span>
                )}

                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 animate-fade-in">
                        <span className="text-slate-600">[{log.timestamp}]</span>
                        <span className={`
                            ${log.type === 'error' ? 'text-red-400' : ''}
                            ${log.type === 'success' ? 'text-green-400' : ''}
                            ${log.type === 'system' ? 'text-yellow-400' : ''}
                            ${log.type === 'info' ? 'text-cyan-200' : ''}
                        `}>
                            {log.type === 'system' ? '>' : ''} {log.text}
                        </span>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};