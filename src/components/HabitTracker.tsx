"use client";

import { useState, useEffect } from "react";

// Habit state types
// 0: Gray (none)
// 1: Green (🌟 Logro Alto)
// 2: Purple (🔄 Logro Medio)
// 3: Red (⚠️ Logro Bajo)

type HabitState = 0 | 1 | 2 | 3;

interface Habit {
  id: string;
  name: string;
  type: "obligatorio" | "opcional";
}

// 32 days as per Excel template
const DAYS = Array.from({ length: 32 }, (_, i) => i + 1);

const INITIAL_HABITS: Habit[] = [
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `ob-${i + 1}`,
    name: `Obligatorio ${i + 1}`,
    type: "obligatorio" as const,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `op-${i + 1}`,
    name: `Opcional ${i + 1}`,
    type: "opcional" as const,
  })),
];

// Color mapping based on state
const STATE_COLORS = {
  0: "bg-neutral-800 hover:bg-neutral-700 border-neutral-700", // Gray
  1: "bg-emerald-500 hover:bg-emerald-400 border-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]", // Green
  2: "bg-purple-500 hover:bg-purple-400 border-purple-600 shadow-[0_0_10px_rgba(168,85,247,0.5)]", // Purple
  3: "bg-rose-500 hover:bg-rose-400 border-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]", // Red
};

export default function HabitTracker() {
  // Application State
  const [trackerState, setTrackerState] = useState<Record<string, HabitState>>({});
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);

  // UI State
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedTracker = localStorage.getItem("monkMode_trackerState");
      const savedHabits = localStorage.getItem("monkMode_habits");

      if (savedTracker) {
        setTrackerState(JSON.parse(savedTracker));
      }
      if (savedHabits) {
        // Ensure that loaded habits maintain the correct structural count
        // For robustness, we will trust the saved state if it exists.
        setHabits(JSON.parse(savedHabits));
      }
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    } finally {
      setIsLoaded(true); // Prevents hydration mismatch by delaying render until loaded
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("monkMode_trackerState", JSON.stringify(trackerState));
    }
  }, [trackerState, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("monkMode_habits", JSON.stringify(habits));
    }
  }, [habits, isLoaded]);

  // Actions
  const toggleState = (habitId: string, day: number) => {
    const key = `${habitId}-${day}`;
    setTrackerState((prev) => {
      const currentState = prev[key] || 0;
      const nextState = ((currentState + 1) % 4) as HabitState;
      return { ...prev, [key]: nextState };
    });
  };

  const startEditing = (habitId: string, currentName: string) => {
    setEditingHabitId(habitId);
    setEditValue(currentName);
  };

  const saveEdit = (habitId: string) => {
    if (editValue.trim() !== "") {
      setHabits((prev) =>
        prev.map((h) => (h.id === habitId ? { ...h, name: editValue.trim() } : h))
      );
    }
    setEditingHabitId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, habitId: string) => {
    if (e.key === "Enter") {
      saveEdit(habitId);
    } else if (e.key === "Escape") {
      setEditingHabitId(null);
    }
  };

  // Prevent hydration mismatch: don't render until localStorage is read
  if (!isLoaded) {
    return (
      <div className="w-full flex items-center justify-center p-12 text-neutral-500">
        Cargando Monk Mode...
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95vw] mx-auto p-6 bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col items-center">
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="inline-block min-w-max">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-neutral-950 p-4 text-left border-b border-r border-neutral-800 font-semibold text-neutral-300 min-w-[250px]">
                  M O N K M O D E
                  <div className="text-xs font-normal text-neutral-500 mt-1">
                    Let's fcking Go!
                  </div>
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="p-3 text-center border-b border-neutral-800 font-medium text-neutral-400 min-w-[48px]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Obligatorios */}
              <tr>
                <td
                  colSpan={DAYS.length + 1}
                  className="bg-neutral-900/50 p-3 text-sm font-semibold text-neutral-300 border-b border-neutral-800 uppercase tracking-wider"
                >
                  Obligatorios
                </td>
              </tr>
              {habits
                .filter((h) => h.type === "obligatorio")
                .map((habit, idx) => (
                  <tr
                    key={habit.id}
                    className="group hover:bg-neutral-900/30 transition-colors"
                  >
                    <td className="sticky left-0 z-10 bg-neutral-950 group-hover:bg-neutral-900 p-3 text-sm text-neutral-300 border-b border-r border-neutral-800 transition-colors">
                      <div className="flex items-center">
                        <span className="text-neutral-500 mr-3 shrink-0">
                          {idx + 1}.
                        </span>
                        {editingHabitId === habit.id ? (
                          <input
                            autoFocus
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => saveEdit(habit.id)}
                            onKeyDown={(e) => handleKeyDown(e, habit.id)}
                            className="bg-neutral-800 text-neutral-100 px-2 py-1 rounded outline-none border border-neutral-600 focus:border-emerald-500 w-full"
                          />
                        ) : (
                          <div
                            onClick={() => startEditing(habit.id, habit.name)}
                            className="group/edit flex items-center justify-between w-full cursor-pointer hover:text-white"
                            title="Click para editar"
                          >
                            <span className="truncate pr-2">{habit.name}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-neutral-600 opacity-0 group-hover/edit:opacity-100 transition-opacity shrink-0"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    {DAYS.map((day) => {
                      const key = `${habit.id}-${day}`;
                      const state = trackerState[key] || 0;
                      return (
                        <td
                          key={day}
                          className="p-1.5 border-b border-neutral-800/50"
                        >
                          <button
                            onClick={() => toggleState(habit.id, day)}
                            className={`w-full aspect-square rounded-md border transition-all duration-200 ease-in-out ${STATE_COLORS[state]}`}
                            aria-label={`Mark day ${day} for ${habit.name}`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}

              {/* Opcionales */}
              <tr>
                <td
                  colSpan={DAYS.length + 1}
                  className="bg-neutral-900/50 p-3 text-sm font-semibold text-neutral-300 border-b border-neutral-800 uppercase tracking-wider mt-4"
                >
                  Opcionales
                </td>
              </tr>
              {habits
                .filter((h) => h.type === "opcional")
                .map((habit, idx) => (
                  <tr
                    key={habit.id}
                    className="group hover:bg-neutral-900/30 transition-colors"
                  >
                    <td className="sticky left-0 z-10 bg-neutral-950 group-hover:bg-neutral-900 p-3 text-sm text-neutral-300 border-b border-r border-neutral-800 transition-colors">
                      <div className="flex items-center">
                        <span className="text-neutral-500 mr-3 shrink-0">
                          {idx + 1}.
                        </span>
                        {editingHabitId === habit.id ? (
                          <input
                            autoFocus
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => saveEdit(habit.id)}
                            onKeyDown={(e) => handleKeyDown(e, habit.id)}
                            className="bg-neutral-800 text-neutral-100 px-2 py-1 rounded outline-none border border-neutral-600 focus:border-emerald-500 w-full"
                          />
                        ) : (
                          <div
                            onClick={() => startEditing(habit.id, habit.name)}
                            className="group/edit flex items-center justify-between w-full cursor-pointer hover:text-white"
                            title="Click para editar"
                          >
                            <span className="truncate pr-2">{habit.name}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-neutral-600 opacity-0 group-hover/edit:opacity-100 transition-opacity shrink-0"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    {DAYS.map((day) => {
                      const key = `${habit.id}-${day}`;
                      const state = trackerState[key] || 0;
                      return (
                        <td
                          key={day}
                          className="p-1.5 border-b border-neutral-800/50"
                        >
                          <button
                            onClick={() => toggleState(habit.id, day)}
                            className={`w-full aspect-square rounded-md border transition-all duration-200 ease-in-out ${STATE_COLORS[state]}`}
                            aria-label={`Mark day ${day} for ${habit.name}`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-6 text-sm text-neutral-400 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-emerald-500 border border-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <span>Verde (Logro Alto) 🌟</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-purple-500 border border-purple-600 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
          <span>Morado (Logro Medio) 🔄</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-rose-500 border border-rose-600 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
          <span>Rojo (Logro Bajo) ⚠️</span>
        </div>
      </div>
    </div>
  );
}
