"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FolderGit2, Flame, Award, ArrowUpRight, Target } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    // Simulated data for the SaaS dashboard
    const stats = [
        { title: "Plantillas Activas", value: "2", icon: FolderGit2, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Racha Actual", value: "5 días", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
        { title: "Logros (Verdes)", value: "128", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    ];

    // Simulated Weekly compliance
    const weeklyData = [
        { day: "Lun", score: 85 },
        { day: "Mar", score: 90 },
        { day: "Mie", score: 100 },
        { day: "Jue", score: 60 },
        { day: "Vie", score: 80 },
        { day: "Sab", score: 40 },
        { day: "Dom", score: 100 },
    ];

    return (
        <div className="p-6 md:p-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mb-2">Resumen General</h1>
                <p className="text-neutral-500">Bienvenido de vuelta, Cariola. Aquí está tu progreso.</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl flex items-center justify-between group hover:border-neutral-700 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-neutral-400 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-neutral-100">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <Icon size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Section */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-neutral-100">Cumplimiento Semanal</h2>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                            Esta semana
                        </span>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#737373', fontSize: 12 }}
                                    dy={10}
                                />
                                <Tooltip
                                    cursor={{ fill: '#262626' }}
                                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                                    {weeklyData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.score >= 80 ? '#10b981' : entry.score >= 50 ? '#a855f7' : '#f43f5e'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions / Recent Activity */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col">
                    <h2 className="text-xl font-bold text-neutral-100 mb-6">Acciones Rápidas</h2>

                    <div className="space-y-4 flex-1">
                        <Link href="/trackers" className="flex items-center justify-between p-4 rounded-xl border border-neutral-800 hover:bg-neutral-900 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-500"><Target size={20} /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-200">Ir al Tracker Actual</h3>
                                    <p className="text-xs text-neutral-500">Actualiza tus hábitos de hoy</p>
                                </div>
                            </div>
                            <ArrowUpRight size={18} className="text-neutral-600 group-hover:text-emerald-500 transition-colors" />
                        </Link>

                        <Link href="/templates" className="flex items-center justify-between p-4 rounded-xl border border-neutral-800 hover:bg-neutral-900 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-500/10 p-2 rounded-lg text-purple-500"><FolderGit2 size={20} /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-200">Explorar Plantillas</h3>
                                    <p className="text-xs text-neutral-500">Inicia un nuevo desafío de 30 días</p>
                                </div>
                            </div>
                            <ArrowUpRight size={18} className="text-neutral-600 group-hover:text-purple-500 transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
