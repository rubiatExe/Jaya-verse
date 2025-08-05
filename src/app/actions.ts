'use server';

import { getRandomReason as getRandomReasonFlow } from '@/ai/flows/reasons-we-love-you-jar';
import type { GetRandomReasonOutput } from '@/ai/flows/reasons-we-love-you-jar';

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
