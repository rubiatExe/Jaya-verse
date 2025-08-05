'use server';

/**
 * @fileOverview This file defines a Genkit flow to display a random reason why Jaya is loved.
 *
 * - getRandomReason - A function that returns a random reason why Jaya is loved.
 * - GetRandomReasonOutput - The output type for the getRandomReason function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetRandomReasonInputSchema = z.object({
  reasons: z.array(z.string()).describe('A list of reasons why Jaya is loved.'),
});

const GetRandomReasonOutputSchema = z.object({
  reason: z.string().describe('A randomly selected reason why Jaya is loved.'),
});

export type GetRandomReasonOutput = z.infer<typeof GetRandomReasonOutputSchema>;
export type GetRandomReasonInput = z.infer<typeof GetRandomReasonInputSchema>;

const AddReasonInputSchema = z.object({
    reason: z.string().describe('A new reason why Jaya is loved.'),
});

export type AddReasonInput = z.infer<typeof AddReasonInputSchema>;

export async function getRandomReason(input: GetRandomReasonInput): Promise<GetRandomReasonOutput> {
  return getRandomReasonFlow(input);
}

const getRandomReasonFlow = ai.defineFlow(
    {
        name: "getRandomReasonFlow",
        inputSchema: GetRandomReasonInputSchema,
        outputSchema: GetRandomReasonOutputSchema
    },
    async ({reasons}) => {
        const response = await ai.generate({
            prompt: `You are a helpful assistant. From the following list of reasons, select one at random and return it.

            List of reasons:
            {{#each reasons}}
            - {{{this}}}
            {{/each}}
            
            Return only the text of the reason. Do not include the leading dash or any other formatting.`,
            model: 'googleai/gemini-2.0-flash',
            input: {
                reasons,
            }
        });

        return { reason: response.text! };
    }
);
