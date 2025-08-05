'use server';

import { getRandomReason as getRandomReasonFlow, addReason as addReasonFlow } from '@/ai/flows/reasons-we-love-you-jar';
import type { GetRandomReasonOutput } from '@/ai/flows/reasons-we-love-you-jar';
import { addFriend, addLetter, type Friend, type Letter, type AddFriendData, type AddLetterData } from '@/lib/data-store';

export async function getRandomReason(): Promise<GetRandomReasonOutput> {
  try {
    const result = await getRandomReasonFlow();
    return result;
  } catch (error) {
    console.error('Error in getRandomReason server action:', error);
    // Return a friendly error message, but still in the expected format.
    return { reason: "There was a little hiccup, but know that you're loved immensely!" };
  }
}

export async function addReason(reason: string): Promise<void> {
    try {
        await addReasonFlow(reason);
    } catch (error) {
        console.error('Error in addReason server action:', error);
        throw new Error("Could not add reason.");
    }
}

export async function addNoteAction(data: AddLetterData) {
  try {
    addLetter(data);
  } catch (error) {
    console.error('Error in addNoteAction:', error);
    throw new Error('Could not add your note.');
  }
}

export async function addPinAction(data: AddFriendData) {
  try {
    addFriend(data);
  } catch (error) {
    console.error('Error in addPinAction:', error);
    throw new Error('Could not add your pin.');
  }
}
