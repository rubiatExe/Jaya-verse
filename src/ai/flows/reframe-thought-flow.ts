'use server';

/**
 * @fileOverview This file defines a Genkit flow for reframing self-doubting thoughts.
 *
 * - reframeThought - A function that takes a negative thought and returns a positive reframing.
 * - ReframeThoughtInput - The input type for the reframeThought function.
 * - ReframeThoughtOutput - The output type for the reframeThought function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReframeThoughtInputSchema = z.object({
  thought: z.string().describe('The self-doubting thought to reframe.'),
});
export type ReframeThoughtInput = z.infer<typeof ReframeThoughtInputSchema>;

const ReframeThoughtOutputSchema = z.object({
  reframedThought: z.string().describe('The kind and empowering reframing of the thought.'),
});
export type ReframeThoughtOutput = z.infer<typeof ReframeThoughtOutputSchema>;


export async function reframeThought(input: ReframeThoughtInput): Promise<ReframeThoughtOutput> {
    return reframeThoughtFlow(input);
}


const prompt = ai.definePrompt({
    name: "reframeThoughtPrompt",
    input: { schema: ReframeThoughtInputSchema },
    output: { schema: ReframeThoughtOutputSchema },
    prompt: `You are a compassionate and wise friend. A user is sharing a self-doubting thought. Your task is to reframe it with kindness, empathy, and empowerment.

Original thought: "{{thought}}"

Reframe this thought into a positive, constructive, and loving one. Return only the reframed thought.`,
});

const reframeThoughtFlow = ai.defineFlow(
    {
        name: "reframeThoughtFlow",
        inputSchema: ReframeThoughtInputSchema,
        outputSchema: ReframeThoughtOutputSchema
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
