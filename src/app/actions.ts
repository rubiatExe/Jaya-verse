'use server';

import { getRandomReason as getRandomReasonFromFlow } from '@/ai/flows/reasons-we-love-you-jar';
import type { GetRandomReasonOutput } from '@/ai/flows/reasons-we-love-you-jar';
import { addFriend as addFriendToDb, addLetter as addLetterToDb, addReason as addReasonToDb, type AddFriendData, type AddLetterData } from '@/lib/data-store';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function getReasonsFromDb() {
    const reasonsCol = collection(db, 'reasons');
    const reasonSnapshot = await getDocs(reasonsCol);
    const reasonList = reasonSnapshot.docs.map(doc => doc.data().reason);
    return reasonList;
}


export async function getRandomReason(): Promise<GetRandomReasonOutput> {
  try {
    const reasons = await getReasonsFromDb();
    if (reasons.length === 0) {
        return { reason: "No reasons yet, but we know you're loved!" };
    }
    const result = await getRandomReasonFromFlow({reasons});
    return result;
  } catch (error) {
    console.error('Error in getRandomReason server action:', error);
    // Return a friendly error message, but still in the expected format.
    return { reason: "There was a little hiccup, but know that you're loved immensely!" };
  }
}

export async function addReason(reason: string): Promise<void> {
    try {
        await addReasonToDb(reason);
    } catch (error) {
        console.error('Error in addReason server action:', error);
        throw new Error("Could not add reason.");
    }
}

export async function addNoteAction(data: AddLetterData) {
  try {
    await addLetterToDb(data);
  } catch (error) {
    console.error('Error in addNoteAction:', error);
    throw new Error('Could not add your note.');
  }
}

export async function addPinAction(data: AddFriendData) {
  try {
    await addFriendToDb(data);
  } catch (error) {
    console.error('Error in addPinAction:', error);
    throw new Error('Could not add your pin.');
  }
}
