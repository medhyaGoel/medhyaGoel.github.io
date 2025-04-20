'use server';
/**
 * @fileOverview An AI agent that refines the intro blurb.
 *
 * - refineBlurb - A function that refines the intro blurb based on user prompts.
 * - RefineBlurbInput - The input type for the refineBlurb function.
 * - RefineBlurbOutput - The return type for the refineBlurb function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RefineBlurbInputSchema = z.object({
  blurb: z.string().describe('The original intro blurb.'),
  prompt: z.string().describe('The user prompt for refining the blurb, including desired tone and keywords.'),
});
export type RefineBlurbInput = z.infer<typeof RefineBlurbInputSchema>;

const RefineBlurbOutputSchema = z.object({
  refinedBlurb: z.string().describe('The refined intro blurb.'),
});
export type RefineBlurbOutput = z.infer<typeof RefineBlurbOutputSchema>;

export async function refineBlurb(input: RefineBlurbInput): Promise<RefineBlurbOutput> {
  return refineBlurbFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineBlurbPrompt',
  input: {
    schema: z.object({
      blurb: z.string().describe('The original intro blurb.'),
      prompt: z.string().describe('The user prompt for refining the blurb, including desired tone and keywords.'),
    }),
  },
  output: {
    schema: z.object({
      refinedBlurb: z.string().describe('The refined intro blurb.'),
    }),
  },
  prompt: `You are a professional copywriter. Refine the following intro blurb based on the user's prompt to make it more engaging and professional.\n\nOriginal Blurb: {{{blurb}}}\n\nUser Prompt: {{{prompt}}}\n\nRefined Blurb:`, // The prompt asks the LLM to refine the blurb based on the original blurb and the user prompt.
});

const refineBlurbFlow = ai.defineFlow<
  typeof RefineBlurbInputSchema,
  typeof RefineBlurbOutputSchema
>({
  name: 'refineBlurbFlow',
  inputSchema: RefineBlurbInputSchema,
  outputSchema: RefineBlurbOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
