'use client';

import { useState, useEffect } from 'react';

// In-memory data store to simulate a database.
// In a real application, you would use a proper database like Firestore.

// ========= TYPES =========

export interface Reason {
  reason: string;
  from: string;
}

export interface Letter {
  from: string;
  message: string;
  mood: 'sad' | 'laugh' | 'stressed';
}

export interface AddLetterData extends Omit<Letter, 'mood'> {
    mood: 'sad' | 'laugh' | 'stressed';
}


export interface Friend {
  name: string;
  location: string;
  time: string;
  message: string;
  avatar: string;
  coords: { top: string; left: string };
}

export interface AddFriendData extends Omit<Friend, 'time' | 'avatar' | 'coords'> {}


// ========= DATA =========

const defaultReasons: Reason[] = [
    { reason: "She is kind", from: "Ben"},
    { reason: "She is smart", from: "Mom"},
    { reason: "She is beautiful", from: "Dad"},
    { reason: "She is funny", from: "Bestie"},
];

const defaultLetters: Letter[] = [
    { from: "Dad", message: "Remember that time we... you always bounce back stronger!", mood: 'sad' }, 
    { from: "Bestie", message: "You are a ray of sunshine, even on cloudy days. ✨", mood: 'sad' },
    { from: "Ben", message: "Let's celebrate! So proud of whatever you did!", mood: 'laugh' }, 
    { from: "Mom", message: "Your happiness is my happiness.", mood: 'laugh' },
    { from: "Grandma", message: "Take a deep breath. This too shall pass. I love you.", mood: 'stressed' },
];

const defaultFriends: Friend[] = [
  { name: 'Alex', location: 'Tokyo, Japan', time: '9:00 PM', message: 'Miss you!', avatar: 'https://placehold.co/100x100/F9A8D4/4A234E.png?text=A', coords: { top: '35%', left: '85%' } },
  { name: 'Mom', location: 'New York, USA', time: '8:00 AM', message: 'Call me soon!', avatar: 'https://placehold.co/100x100/E1BEE7/4A234E.png?text=M', coords: { top: '30%', left: '25%' } },
  { name: 'Ben', location: 'London, UK', time: '1:00 PM', message: 'Hope you are well!', avatar: 'https://placehold.co/100x100/FDE2F3/4A234E.png?text=B', coords: { top: '25%', left: '48%' } },
];


export let reasons: Reason[] = [...defaultReasons];
export let letters: Letter[] = [...defaultLetters];
export let friends: Friend[] = [...defaultFriends];

// ========= STATE MANAGEMENT & HOOKS =========

// A simple event emitter to notify components of data changes.
class EventEmitter {
  private listeners: Set<() => void> = new Set();
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  emit() {
    this.listeners.forEach(listener => listener());
  }
}

const dataStoreEmitter = new EventEmitter();


function createDataHook<T>(dataArray: T[]) {
  return function useData() {
    const [data, setData] = useState(dataArray);

    useEffect(() => {
      const unsubscribe = dataStoreEmitter.subscribe(() => {
        setData([...dataArray]);
      });
      return unsubscribe;
    }, []);

    return data;
  }
}

export const useReasons = createDataHook(reasons);
export const useLetters = createDataHook(letters);
export const useFriends = createDataHook(friends);


// ========= ACTIONS =========

export function addReason(newReason: Omit<Reason, 'from'> & { from?: string }) {
  reasons.push({ from: 'a friend', ...newReason });
  dataStoreEmitter.emit();
}

export function addLetter(newLetter: AddLetterData) {
  letters.push({ ...newLetter });
  dataStoreEmitter.emit();
}

export function addFriend(newFriend: AddFriendData) {
    // Generate random coordinates for the map pin
    const top = `${Math.random() * 60 + 20}%`; // 20% to 80%
    const left = `${Math.random() * 80 + 10}%`; // 10% to 90%

    const friend: Friend = {
        ...newFriend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}),
        avatar: `https://placehold.co/100x100.png?text=${newFriend.name.charAt(0)}`,
        coords: { top, left },
    }
    friends.push(friend);
    dataStoreEmitter.emit();
}
