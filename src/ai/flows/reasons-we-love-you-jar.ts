'use server';

/**
 * @fileOverview This file defines a Genkit flow to display a random reason why Jaya is loved.
 *
 * - getRandomReason - A function that returns a random reason why Jaya is loved.
 * - GetRandomReasonOutput - The output type for the getRandomReason function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// This is a stand-in for a database to store reasons.
// In a real application, you would use a proper database like Firestore.
const userSubmittedReasons: string[] = [];


const GetRandomReasonOutputSchema = z.object({
  reason: z.string().describe('A randomly selected reason why Jaya is loved.'),
});

export type GetRandomReasonOutput = z.infer<typeof GetRandomReasonOutputSchema>;

const AddReasonInputSchema = z.object({
    reason: z.string().describe('A new reason why Jaya is loved.'),
});

export type AddReasonInput = z.infer<typeof AddReasonInputSchema>;


const baseReasons = [
    "She is kind",
    "She is smart",
    "She is beautiful",
    "She is funny",
    "She is a good friend",
    "She is a good daughter",
    "She is a good sister"
];

const getRandomReasonFlow = ai.defineFlow(
    {
        name: "getRandomReasonFlow",
        outputSchema: GetRandomReasonOutputSchema
    },
    async () => {
        const allReasons = [...baseReasons, ...userSubmittedReasons];
        
        const response = await ai.generate({
            prompt: `You are a helpful assistant. From the following list of reasons, select one at random and return it.

            List of reasons:
            ${allReasons.map(r => `- ${r}`).join('\n')}
            
            Return only the text of the reason.`,
            model: 'googleai/gemini-2.0-flash',
        });

        return { reason: response.text! };
    }
);


export async function getRandomReason(): Promise<GetRandomReasonOutput> {
  return await getRandomReasonFlow();
}


const addReasonFlow = ai.defineFlow(
    {
        name: "addReasonFlow",
        inputSchema: AddReasonInputSchema,
    },
    async ({ reason }) => {
        console.log(`New reason added: ${reason}`);
        userSubmittedReasons.push(reason);
        // In a real app, you would save this to a database.
    }
);

export async function addReason(reason: string): Promise<void> {
    await addReasonFlow({ reason });
}
