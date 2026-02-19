"use client";

import { Challenge } from "@/types";
import { Target, User, Plus, LayoutList } from "lucide-react";

interface SidebarProps {
    challenges: Challenge[];
    activeChallengeId: string;
    onSelectChallenge: (id: string) => void;
    onNewChallenge: () => void;
}

export default function Sidebar({
    challenges,
    activeChallengeId,
    onSelectChallenge,
    onNewChallenge,
}: SidebarProps) {
    return (
        <aside className="w-64 bg-neutral-950 border-r border-neutral-800 h-screen flex flex-col flex-shrink-0 sticky top-0 hidden md:flex">
            {/* Profile Section */}
            <div className="p-6 border-b border-neutral-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                    <User size={24} />
                </div>
                <div>
                    <div className="text-sm font-bold text-neutral-100">CariolaFlex</div>
                    <div className="text-xs text-emerald-500">Monk Mode</div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                <div className="text-xs font-bold text-neutral-500 mb-4 px-2 uppercase tracking-wider">
                    Mis Plantillas
                </div>

                <div className="space-y-1">
                    {challenges.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => onSelectChallenge(c.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${activeChallengeId === c.id
                                    ? "bg-neutral-800 text-neutral-100"
                                    : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                                }`}
                        >
                            <Target size={16} className={activeChallengeId === c.id ? "text-emerald-500" : ""} />
                            <span className="truncate">{c.name}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onNewChallenge}
                    className="w-full flex items-center gap-3 px-3 py-2 mt-4 rounded-lg text-sm text-left text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 border border-neutral-800 border-dashed transition-colors"
                >
                    <Plus size={16} />
                    <span>Nuevo Reto</span>
                </button>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-neutral-500 text-xs px-2">
                    <LayoutList size={14} />
                    <span>Plataforma Pro</span>
                </div>
            </div>
        </aside>
    );
}
