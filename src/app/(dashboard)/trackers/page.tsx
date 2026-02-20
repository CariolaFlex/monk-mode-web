"use client";

import { useState, useEffect } from "react";
import HabitTracker from "@/components/HabitTracker";
import NewChallengeModal from "@/components/NewChallengeModal";
import { Challenge, INITIAL_HABITS, HabitState } from "@/types";

// Helper to generate a default challenge if none exists
const createDefaultChallenge = (): Challenge => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

  return {
    id: "default-1",
    name: "Monk Mode Base",
    description: "Plantilla inicial",
    startDate: now.toISOString().split("T")[0],
    endDate: nextMonth.toISOString().split("T")[0],
    habits: INITIAL_HABITS,
    trackerState: {},
  };
};

export default function TrackersPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallengeId, setActiveChallengeId] = useState<string>("");

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from localStorage on map
  useEffect(() => {
    try {
      const savedStr = localStorage.getItem("monkMode_challenges");
      const savedActive = localStorage.getItem("monkMode_activeId");

      let loadedChallenges = [];
      if (savedStr) {
        loadedChallenges = JSON.parse(savedStr);
      }

      // Migration
      if (loadedChallenges.length === 0) {
        const defaultChall = createDefaultChallenge();
        loadedChallenges = [defaultChall];
      }

      setChallenges(loadedChallenges);

      if (savedActive && loadedChallenges.find((c: Challenge) => c.id === savedActive)) {
        setActiveChallengeId(savedActive);
      } else if (loadedChallenges.length > 0) {
        setActiveChallengeId(loadedChallenges[0].id);
      }
    } catch (e) {
      console.error("Failed to load challenges from localStorage", e);
      // Fallback
      const fallback = createDefaultChallenge();
      setChallenges([fallback]);
      setActiveChallengeId(fallback.id);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("monkMode_challenges", JSON.stringify(challenges));
      localStorage.setItem("monkMode_activeId", activeChallengeId);
    }
  }, [challenges, activeChallengeId, isLoaded]);

  // Derived active challenge
  const activeChallenge = challenges.find((c) => c.id === activeChallengeId);

  // Actions
  const handleCreateChallenge = (name: string, desc: string, start: string, end: string) => {
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      name,
      description: desc,
      startDate: start,
      endDate: end,
      habits: JSON.parse(JSON.stringify(INITIAL_HABITS)), // Deep copy 
      trackerState: {},
    };
    setChallenges((prev) => [...prev, newChallenge]);
    setActiveChallengeId(newChallenge.id);
    setIsModalOpen(false);
  };

  const handleChangeHabitName = (habitId: string, newName: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id !== activeChallengeId) return c;
        return {
          ...c,
          habits: c.habits.map((h) => (h.id === habitId ? { ...h, name: newName } : h)),
        };
      })
    );
  };

  const handleToggleState = (habitId: string, dayIndex: number) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id !== activeChallengeId) return c;

        const key = `${habitId}-${dayIndex}`;
        const currentState = c.trackerState[key] || 0;
        const nextState = ((currentState + 1) % 4) as HabitState;

        return {
          ...c,
          trackerState: {
            ...c.trackerState,
            [key]: nextState,
          },
        };
      })
    );
  };

  if (!isLoaded) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center text-neutral-500">
        Iniciando Trackers...
      </div>
    );
  }

  return (
    <div className="p-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Challenge Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">Mis Trackers</h1>
          <p className="text-neutral-500 text-sm mt-1">Gestiona el progreso diario de tus plantillas activas.</p>
        </div>
        <div className="flex gap-2">
          <select
            className="bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
            value={activeChallengeId}
            onChange={(e) => setActiveChallengeId(e.target.value)}
          >
            {challenges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
          >
            Nuevo Tracker
          </button>
        </div>
      </div>

      {activeChallenge ? (
        <HabitTracker
          challenge={activeChallenge}
          onChangeHabitName={handleChangeHabitName}
          onToggleState={handleToggleState}
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-20 text-neutral-500 border border-dashed border-neutral-800 rounded-2xl">
          <p>No hay trackers activos.</p>
          <button onClick={() => setIsModalOpen(true)} className="mt-4 text-emerald-500 hover:underline">
            Crear uno nuevo
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <NewChallengeModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateChallenge}
        />
      )}
    </div>
  );
}
