export type HabitState = 0 | 1 | 2 | 3;

export interface Habit {
    id: string;
    name: string;
    type: "obligatorio" | "opcional";
}

export interface Challenge {
    id: string;
    name: string;
    description: string;
    startDate: string; // ISO format YYYY-MM-DD
    endDate: string; // ISO format YYYY-MM-DD
    habits: Habit[];
    trackerState: Record<string, HabitState>;
}

export const INITIAL_HABITS: Habit[] = [
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
