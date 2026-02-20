import { db } from "./firebase";
import { collection, doc, getDocs, setDoc, query, deleteDoc } from "firebase/firestore";
import { Challenge, HabitState } from "@/types";

/**
 * Get all challenges for a specific user
 */
export const getUserChallenges = async (userId: string): Promise<Challenge[]> => {
    try {
        const q = query(collection(db, "users", userId, "challenges"));
        const snapshot = await getDocs(q);

        const challenges: Challenge[] = [];
        snapshot.forEach((doc) => {
            challenges.push(doc.data() as Challenge);
        });

        return challenges;
    } catch (error) {
        console.error("Error fetching challenges:", error);
        throw error;
    }
};

/**
 * Save or completely overwrite a challenge
 */
export const saveChallenge = async (userId: string, challenge: Challenge): Promise<void> => {
    try {
        const challengeRef = doc(db, "users", userId, "challenges", challenge.id);
        await setDoc(challengeRef, challenge);
    } catch (error) {
        console.error("Error saving challenge:", error);
        throw error;
    }
};

/**
 * Delete a challenge
 */
export const deleteChallenge = async (userId: string, challengeId: string): Promise<void> => {
    try {
        const challengeRef = doc(db, "users", userId, "challenges", challengeId);
        await deleteDoc(challengeRef);
    } catch (error) {
        console.error("Error deleting challenge:", error);
        throw error;
    }
};
