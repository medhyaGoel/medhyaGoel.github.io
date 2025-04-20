
'use client';

import {refineBlurb} from '@/ai/flows/refine-blurb';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';

export function AiBlurbRefiner() {
  const [blurb, setBlurb] = useState('Short blurb about who I am and what I am interested in');
  const [prompt, setPrompt] = useState('Refine the blurb.');
  const [refinedBlurb, setRefinedBlurb] = useState('');

  const handleRefineBlurb = async () => {
    const result = await refineBlurb({blurb: blurb, prompt: prompt});
    setRefinedBlurb(result.refinedBlurb);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">AI Blurb Refiner</h2>
      <div className="mb-4">
        <label htmlFor="blurb" className="block text-sm font-medium text-foreground">
          Original Blurb
        </label>
        <Textarea
          id="blurb"
          value={blurb}
          onChange={(e) => setBlurb(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-foreground">
          Refinement Prompt
        </label>
        <Input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>
      <Button onClick={handleRefineBlurb} className="bg-primary text-primary-foreground hover:bg-primary/80">
        Refine Blurb
      </Button>
      {refinedBlurb && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Refined Blurb</h3>
          <p>{refinedBlurb}</p>
        </div>
      )}
    </div>
  );
}
