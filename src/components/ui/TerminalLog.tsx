import React, { useEffect, useRef } from 'react';

export interface LogEntry {
    id: string;
    text: string;
    type: 'info' | 'error' | 'success' | 'system';
    timestamp: string; // např. "10:42:05"
}

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
            <div className="text-slate-500 border-b border-slate-800 pb-2 mb-2 sticky top-0 bg-black/90 w-full">
                // SYSTEM_LOG_OUTPUT // AURA_CORE_V2
            </div>

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