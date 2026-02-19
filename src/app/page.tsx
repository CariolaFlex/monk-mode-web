"use client";

import { useState, useEffect } from "react";
import HabitTracker from "@/components/HabitTracker";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import NewChallengeModal from "@/components/NewChallengeModal";
import { Challenge, INITIAL_HABITS, HabitState } from "@/types";
import { Menu, X } from "lucide-react"; // for mobile menu

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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallengeId, setActiveChallengeId] = useState<string>("");

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load from localStorage on map
  useEffect(() => {
    try {
      const savedStr = localStorage.getItem("monkMode_challenges");
      const savedActive = localStorage.getItem("monkMode_activeId");

      let loadedChallenges = [];
      if (savedStr) {
        loadedChallenges = JSON.parse(savedStr);
      }

      // Migration from old version (if old version exists, wrap it in a challenge)
      if (loadedChallenges.length === 0) {
        const oldTracker = localStorage.getItem("monkMode_trackerState");
        const oldHabits = localStorage.getItem("monkMode_habits");

        const defaultChall = createDefaultChallenge();
        if (oldTracker) defaultChall.trackerState = JSON.parse(oldTracker);
        if (oldHabits) defaultChall.habits = JSON.parse(oldHabits);

        loadedChallenges = [defaultChall];

        // clean up old keys optionally
        localStorage.removeItem("monkMode_trackerState");
        localStorage.removeItem("monkMode_habits");
      }

      setChallenges(loadedChallenges);

      if (savedActive && loadedChallenges.find((c: Challenge) => c.id === savedActive)) {
        setActiveChallengeId(savedActive);
      } else {
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
    setIsMobileMenuOpen(false); // Close mobile menu if open
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
      <div className="flex h-screen w-full items-center justify-center bg-black text-neutral-500">
        Iniciando Plataforma Monk Mode...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      {/* Desktop Sidebar */}
      <Sidebar
        challenges={challenges}
        activeChallengeId={activeChallengeId}
        onSelectChallenge={setActiveChallengeId}
        onNewChallenge={() => setIsModalOpen(true)}
      />

      {/* Mobile Topbar */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-neutral-950 border-b border-neutral-800 z-40 flex items-center justify-between px-4">
        <div className="font-bold text-neutral-100 flex flex-col">
          <span>{activeChallenge?.name || "Monk Mode"}</span>
          <span className="text-[10px] text-emerald-500 uppercase tracking-widest">Plataforma Pro</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-neutral-300">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bottom-0 bg-neutral-950 z-30 p-4 border-t border-neutral-800 flex flex-col gap-4 overflow-y-auto">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            Mis Plantillas
          </div>
          {challenges.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveChallengeId(c.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-left transition-colors ${activeChallengeId === c.id
                  ? "bg-neutral-800 text-neutral-100 font-bold"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800"
                }`}
            >
              <span className="truncate">{c.name}</span>
            </button>
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 mt-4 rounded-lg text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
          >
            Crear Nuevo Reto
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full pt-20 md:pt-8 px-4 sm:px-8 pb-12 custom-scrollbar relative">
        <div className="max-w-[1400px] mx-auto w-full">
          {activeChallenge ? (
            <>
              <Dashboard challenge={activeChallenge} />
              <HabitTracker
                challenge={activeChallenge}
                onChangeHabitName={handleChangeHabitName}
                onToggleState={handleToggleState}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-20 text-neutral-500 border border-dashed border-neutral-800 rounded-2xl">
              <p>No hay retos activos.</p>
              <button onClick={() => setIsModalOpen(true)} className="mt-4 text-emerald-500 hover:underline">
                Crear uno nuevo
              </button>
            </div>
          )}
        </div>
      </main>

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
