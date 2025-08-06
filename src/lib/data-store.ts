'use client';

import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, limit, doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import type { ActivityKey } from '@/components/life-rpg';

// ========= TYPES =========

export interface Reason {
  id?: string;
  reason: string;
  from: string;
  createdAt: Timestamp;
}

export interface AddReasonData {
    reason: string;
    from?: string;
}

export interface DisplayReason {
    id: string;
    reason: string;
    from: string;
    createdAt: Date;
}

export interface Letter {
  id?: string;
  from: string;
  message: string;
  mood: 'sad' | 'laugh' | 'stressed';
  createdAt?: Date;
}

export interface AddLetterData extends Omit<Letter, 'id' | 'createdAt'> {}

export interface Friend {
  id?: string;
  name: string;
  location: string;
  time: string;
  message: string;
  avatar: string;
  coords: { top: string; left: string };
  createdAt?: Date;
}

export interface AddFriendData extends Omit<Friend, 'id' | 'time' | 'avatar' | 'coords' | 'createdAt'> {}

export interface WaterStatus {
    currentGlasses: number;
    goalGlasses: number;
    date: string; // YYYY-MM-DD
}

export interface LifeRpgStatus {
    activity: ActivityKey;
    details: Record<ActivityKey, string>;
}

// Helper to get date string in GMT+5:30
function getIndiaDateString() {
    // 'en-CA' locale formats date as YYYY-MM-DD
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}


// ========= HOOKS for real-time data =========

function createRealtimeHook<T>(collectionName: string, orderField: string = 'createdAt', lim: number | null = null) {
  return function useData() {
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
      let q;
      const coll = collection(db, collectionName);
      if (lim) {
         q = query(coll, orderBy(orderField, 'desc'), limit(lim));
      } else {
         q = query(coll, orderBy(orderField, 'desc'));
      }
      

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => {
            const docData = doc.data();
            // Firestore timestamps need to be converted to JS Dates
            if (docData.createdAt && docData.createdAt.toDate) {
                docData.createdAt = docData.createdAt.toDate();
            }
            return { id: doc.id, ...docData } as T
        });
        setData(docs);
      }, (error) => {
        console.error(`Error fetching ${collectionName}:`, error);
      });

      return () => unsubscribe();
    }, []);

    return data;
  }
}

export function useWaterStatus() {
    const [status, setStatus] = useState<WaterStatus | null>(null);
    const today = getIndiaDateString();

    useEffect(() => {
        const docRef = doc(db, 'waterStatus', today);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setStatus(docSnap.data() as WaterStatus);
            } else {
                // If no document for today, create one
                const newStatus: WaterStatus = { currentGlasses: 0, goalGlasses: 10, date: today };
                setDoc(docRef, newStatus);
                setStatus(newStatus);
            }
        }, (error) => {
            console.error("Error fetching water status:", error);
        });

        return () => unsubscribe();
    }, [today]);

    return status;
}

export function useLifeRpgStatus() {
    const [status, setStatus] = useState<LifeRpgStatus | null>(null);
    const docId = "main"; // Using a single document for the status

    useEffect(() => {
        const docRef = doc(db, 'lifeRpg', docId);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setStatus(docSnap.data() as LifeRpgStatus);
            } else {
                const defaultStatus: LifeRpgStatus = {
                    activity: 'idle',
                    details: { idle: '', reading: '', sleeping: '', tv: '', eating: '', travel: '', creating: '' }
                };
                setDoc(docRef, defaultStatus);
                setStatus(defaultStatus);
            }
        }, (error) => {
            console.error("Error fetching Life RPG status:", error);
        });

        return () => unsubscribe();
    }, []);

    return status;
}

export const useReasons = createRealtimeHook<Reason>('reasons');
export const useRecentReasons = createRealtimeHook<DisplayReason>('reasons', 'createdAt', 2);
export const useLetters = createRealtimeHook<Letter>('letters');
export const useFriends = createRealtimeHook<Friend>('friends');


// ========= ACTIONS (writing to Firestore) =========

export async function updateLifeRpgStatus(newStatus: Partial<LifeRpgStatus>) {
    const docRef = doc(db, 'lifeRpg', "main");
    try {
        await updateDoc(docRef, newStatus);
    } catch (error) {
        if ((error as any).code === 'not-found') {
            await setDoc(docRef, newStatus, { merge: true });
        } else {
            console.error("Error updating Life RPG status: ", error);
            throw new Error("Could not update Life RPG status.");
        }
    }
}

export async function updateWater(glasses: number) {
    const today = getIndiaDateString();
    const docRef = doc(db, 'waterStatus', today);
    try {
        await updateDoc(docRef, { currentGlasses: glasses });
    } catch (error) {
        // If doc doesn't exist, create it.
        if ((error as any).code === 'not-found') {
             await setDoc(docRef, { currentGlasses: glasses, goalGlasses: 10, date: today });
        } else {
            console.error("Error updating water status: ", error);
            throw new Error("Could not update water status.");
        }
    }
}

export async function addReasonToDb(data: AddReasonData) {
  try {
    await addDoc(collection(db, 'reasons'), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding reason: ", error);
    throw new Error("Could not add reason.");
  }
}

export async function addLetterToDb(newLetter: AddLetterData) {
  try {
    await addDoc(collection(db, 'letters'), {
        ...newLetter,
        createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding letter: ", error);
    throw new Error("Could not add letter.");
  }
}

export async function addFriendToDb(newFriend: AddFriendData) {
  try {
    const top = `${Math.random() * 60 + 20}%`;
    const left = `${Math.random() * 80 + 10}%`;

    const friend: Omit<Friend, 'id' | 'createdAt'> = {
        ...newFriend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}),
        avatar: `https://placehold.co/100x100.png?text=${newFriend.name.charAt(0)}`,
        coords: { top, left },
    }
     await addDoc(collection(db, 'friends'), {
      ...friend,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding friend: ", error);
    throw new Error("Could not add friend.");
  }
}
