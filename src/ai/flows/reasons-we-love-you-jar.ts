'use server';

/**
 * @fileOverview This file defines a Genkit flow to display a random reason why Jaya is loved.
 *
 * - getRandomReason - A function that returns a random reason why Jaya is loved.
 * - GetRandomReasonOutput - The output type for the getRandomReason function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetRandomReasonOutputSchema = z.object({
  reason: z.string().describe('A randomly selected reason why Jaya is loved.'),
});

export type GetRandomReasonOutput = z.infer<typeof GetRandomReasonOutputSchema>;

async function getRandomReasonFlow(): Promise<GetRandomReasonOutput> {
  return ai.generate({
    prompt: `You are a helpful assistant. Return a random reason why Jaya is loved from the following list:\n- She is kind\n- She is smart\n- She is beautiful\n- She is funny\n- She is a good friend\n- She is a good daughter\n- She is a good sister`,
    model: 'googleai/gemini-2.0-flash',
    config: {
      outputSchema: GetRandomReasonOutputSchema,
    },
  }).then(result => {
    return {reason: result.text!};
  });
}

export async function getRandomReason(): Promise<GetRandomReasonOutput> {
  return getRandomReasonFlow();
}
