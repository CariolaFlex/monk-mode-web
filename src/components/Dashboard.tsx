"use client";

import { Challenge } from "@/types";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { differenceInDays } from "date-fns";

interface DashboardProps {
    challenge: Challenge;
}

export default function Dashboard({ challenge }: DashboardProps) {
    // Simple stats calculation
    const totalCells = challenge.habits.length * Math.max(1, differenceInDays(new Date(challenge.endDate), new Date(challenge.startDate)) + 1);
    let completedCells = 0;
    let highestStreak = 0;
    let currentStreak = 0;

    // For Bar chart: completion per habit
    const habitCompletion = challenge.habits.map((h) => ({
        name: h.name.substring(0, 10) + (h.name.length > 10 ? "..." : ""),
        score: 0,
    }));

    const daysCount = Math.max(1, differenceInDays(new Date(challenge.endDate), new Date(challenge.startDate)) + 1);

    for (let day = 1; day <= daysCount; day++) {
        let dayCompletedMandaory = true;
        challenge.habits.forEach((h, idx) => {
            const state = challenge.trackerState[`${h.id}-${day}`] || 0;
            if (state === 1 || state === 2) {
                completedCells++;
                habitCompletion[idx].score += (state === 1 ? 1 : 0.5); // Green is 1, Purple is 0.5 for charts
            }
            if (h.type === "obligatorio" && (state === 0 || state === 3)) {
                dayCompletedMandaory = false;
            }
        });

        if (dayCompletedMandaory) {
            currentStreak++;
            if (currentStreak > highestStreak) highestStreak = currentStreak;
        } else {
            currentStreak = 0;
        }
    }

    const completionPercentage = totalCells > 0 ? Math.round((completedCells / totalCells) * 100) : 0;
    const pieData = [
        { name: "Completed", value: completedCells },
        { name: "Remaining", value: totalCells - completedCells },
    ];
    const COLORS = ["#10b981", "#262626"]; // emerald-500, neutral-800

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-neutral-200">

            {/* Stat 1: Overall Completion */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
                <div>
                    <h3 className="text-neutral-400 text-sm font-medium mb-1">Cumplimiento General</h3>
                    <div className="text-4xl font-bold">{completionPercentage}%</div>
                </div>
                <div className="w-24 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={30}
                                outerRadius={40}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Stat 2: Streak */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
                <h3 className="text-neutral-400 text-sm font-medium mb-1">Racha Actual</h3>
                <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-bold text-purple-500">{highestStreak}</div>
                    <div className="text-neutral-500">días seguidos</div>
                </div>
                <p className="text-xs text-neutral-600 mt-2">Días cumpliendo todos los obligatorios.</p>
            </div>

            {/* Stat 3: Habit Performance */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
                <h3 className="text-neutral-400 text-sm font-medium mb-4">Top Hábitos</h3>
                <div className="w-full h-20">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={habitCompletion.sort((a, b) => b.score - a.score).slice(0, 5)}>
                            <Tooltip
                                cursor={{ fill: '#262626' }}
                                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', borderRadius: '8px' }}
                            />
                            <Bar dataKey="score" fill="#a855f7" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}
