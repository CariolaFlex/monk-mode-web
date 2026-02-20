"use client";

import { useState, useEffect } from "react";
import HabitTracker from "@/components/HabitTracker";
import NewChallengeModal from "@/components/NewChallengeModal";
import { Challenge, INITIAL_HABITS, HabitState } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getUserChallenges, saveChallenge } from "@/lib/db";

// Helper to generate a default challenge if none exists
const createDefaultChallenge = (): Challenge => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

  return {
    id: `chal-${Date.now()}`,
    name: "Monk Mode Base",
    description: "Mi primer desafío sincronizado en la nube.",
    startDate: now.toISOString().split("T")[0],
    endDate: nextMonth.toISOString().split("T")[0],
    habits: INITIAL_HABITS,
    trackerState: {},
  };
};

export default function TrackersPage() {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallengeId, setActiveChallengeId] = useState<string>("");

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from Firestore
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!user) return;

      try {
        const loadedChallenges = await getUserChallenges(user.uid);

        if (!isMounted) return;

        if (loadedChallenges.length === 0) {
          // If completely new user, generate one and save it directly
          const defaultChall = createDefaultChallenge();
          await saveChallenge(user.uid, defaultChall);

          setChallenges([defaultChall]);
          setActiveChallengeId(defaultChall.id);
        } else {
          setChallenges(loadedChallenges);
          setActiveChallengeId(loadedChallenges[0].id);
        }
      } catch (error) {
        console.error("Failed to load generic challenges from Firestore", error);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Derived active challenge
  const activeChallenge = challenges.find((c) => c.id === activeChallengeId);

  // Actions
  const handleCreateChallenge = async (name: string, desc: string, start: string, end: string) => {
    if (!user) return;

    const newChallenge: Challenge = {
      id: `chal-${Date.now()}`,
      name,
      description: desc,
      startDate: start,
      endDate: end,
      habits: JSON.parse(JSON.stringify(INITIAL_HABITS)),
      trackerState: {},
    };

    // Optimistic UI update
    setChallenges((prev) => [...prev, newChallenge]);
    setActiveChallengeId(newChallenge.id);
    setIsModalOpen(false);

    try {
      await saveChallenge(user.uid, newChallenge);
    } catch (error) {
      console.error("Error creating challenge in DB", error);
      // Revert UI could happen here
    }
  };

  const handleChangeHabitName = async (habitId: string, newName: string) => {
    if (!user || !activeChallenge) return;

    const updatedChallenge = {
      ...activeChallenge,
      habits: activeChallenge.habits.map((h) => (h.id === habitId ? { ...h, name: newName } : h)),
    };

    // Optimistic UI
    setChallenges((prev) => prev.map((c) => (c.id === activeChallengeId ? updatedChallenge : c)));

    // Save async
    try {
      setIsSaving(true);
      await saveChallenge(user.uid, updatedChallenge);
    } catch (error) {
      console.error("Error updating habit name in DB", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleState = async (habitId: string, dayIndex: number) => {
    if (!user || !activeChallenge) return;

    const key = `${habitId}-${dayIndex}`;
    const currentState = activeChallenge.trackerState[key] || 0;
    const nextState = ((currentState + 1) % 4) as HabitState;

    const updatedChallenge = {
      ...activeChallenge,
      trackerState: {
        ...activeChallenge.trackerState,
        [key]: nextState,
      },
    };

    // Optimistic UI Update for zero latency
    setChallenges((prev) => prev.map((c) => (c.id === activeChallengeId ? updatedChallenge : c)));

    // Save async
    try {
      setIsSaving(true);
      await saveChallenge(user.uid, updatedChallenge);
    } catch (error) {
      console.error("Error updating day state in DB", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center text-emerald-500 gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
        <p className="text-sm font-medium animate-pulse">Sincronizando Trackers desde la Nube...</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Challenge Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">Mis Trackers</h1>
          <p className="text-neutral-500 text-sm mt-1">Gestiona el progreso sincronizado de tus plantillas activas.</p>
        </div>
        <div className="flex gap-2">
          <select
            className="bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none cursor-pointer"
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

      {/* Network Saving Indicator */}
      <div className="mb-6 flex justify-end">
        <div className={`text-xs flex items-center gap-2 transition-opacity duration-300 ${isSaving ? 'opacity-100 text-emerald-500' : 'opacity-0 text-neutral-500'}`}>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Guardando en la nube...
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
