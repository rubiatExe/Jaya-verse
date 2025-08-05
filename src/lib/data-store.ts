'use client';

import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';

// ========= TYPES =========

export interface Reason {
  id?: string;
  reason: string;
  from: string;
  createdAt?: Date;
}

export interface Letter {
  id?: string;
  from: string;
  message: string;
  mood: 'sad' | 'laugh' | 'stressed';
  createdAt?: Date;
}

export interface AddLetterData extends Omit<Letter, 'id' | 'createdAt' | 'mood'> {
    mood: 'sad' | 'laugh' | 'stressed';
}

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


// ========= HOOKS for real-time data =========

function createRealtimeHook<T>(collectionName: string, orderField: string = 'createdAt', lim: number | null = null) {
  return function useData() {
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
      let q;
      if (lim) {
         q = query(collection(db, collectionName), orderBy(orderField, 'desc'), limit(lim));
      } else {
         q = query(collection(db, collectionName), orderBy(orderField, 'desc'));
      }
      

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
        setData(docs);
      }, (error) => {
        console.error(`Error fetching ${collectionName}:`, error);
        // Optionally, set an error state here
      });

      return () => unsubscribe();
    }, [collectionName, orderField, lim]);

    return data;
  }
}

export const useReasons = createRealtimeHook<Reason>('reasons');
export const useRecentReasons = createRealtimeHook<Reason>('reasons', 'createdAt', 2);
export const useLetters = createRealtimeHook<Letter>('letters');
export const useFriends = createRealtimeHook<Friend>('friends');


// ========= ACTIONS (writing to Firestore) =========

export async function addReason(newReason: Omit<Reason, 'from' | 'id' | 'createdAt'> & { from?: string }) {
  try {
    await addDoc(collection(db, 'reasons'), {
      ...newReason,
      from: newReason.from || 'a friend',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding reason: ", error);
    throw new Error("Could not add reason.");
  }
}

export async function addLetter(newLetter: AddLetterData) {
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

export async function addFriend(newFriend: AddFriendData) {
  try {
    // Generate random coordinates for the map pin
    const top = `${Math.random() * 60 + 20}%`; // 20% to 80%
    const left = `${Math.random() * 80 + 10}%`; // 10% to 90%

    const friend: Omit<Friend, 'id'> = {
        ...newFriend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}),
        avatar: `https://placehold.co/100x100.png?text=${newFriend.name.charAt(0)}`,
        coords: { top, left },
        createdAt: new Date(), // Using client-side date for simplicity here
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