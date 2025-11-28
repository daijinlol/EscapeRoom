import React, { useEffect, useRef } from 'react';
import type { LogEntry } from '../../types'; // <--- ZMĚNA: Import z types

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
        <div className="w-full h-full bg-black/80 border-t-2 border-cyan-900/50 p-4 font-mono text-xs overflow-y-auto custom-scrollbar flex flex-col gap-1">
            <div className="text-slate-500 border-b border-slate-800 pb-2 mb-2 sticky top-0 bg-black/90 w-full flex justify-between">
                <span>// SYSTEM_LOG_OUTPUT</span>
                <span>AURA_CORE_V2</span>
            </div>

            {logs.length === 0 && (
                <span className="text-slate-700 italic">// Waiting for input...</span>
            )}

            {logs.map((log) => (
                <div key={log.id} className={`flex gap-3 animate-fade-in`}>
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
    );
};