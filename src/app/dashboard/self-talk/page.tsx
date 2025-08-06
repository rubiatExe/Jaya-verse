'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Sparkles, Loader2 } from "lucide-react";
import { reframeThoughtAction } from '@/app/actions';

export default function SelfTalkPage() {
  const [doubt, setDoubt] = useState('');
  const [reframed, setReframed] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReframe = async () => {
    if (!doubt) return;
    setIsLoading(true);
    setReframed('');
    try {
      const result = await reframeThoughtAction({ thought: doubt });
      setReframed(result.reframedThought);
    } catch (error) {
      console.error('Failed to reframe thought:', error);
      setReframed('There was a little trouble reframing that, but remember to be kind to yourself. You are doing great.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="mt-4 font-headline text-3xl">Self-Talk Sesh</CardTitle>
        <CardDescription className="text-lg max-w-xl mx-auto">
          An empowering exercise to challenge self-doubt with positive reinforcement.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="doubt" className="font-semibold text-lg">1. What's a self-doubting thought you're having?</label>
            <Textarea 
              id="doubt" 
              placeholder="e.g., I'm not good enough to do this." 
              className="min-h-[120px]" 
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="reframe" className="font-semibold text-lg">2. Let's reframe it with kindness.</label>
            <Textarea 
              id="reframe" 
              placeholder="Your reframed thought will appear here..." 
              className="min-h-[120px] bg-accent/20" 
              value={reframed}
              readOnly
            />
          </div>
        </div>
        <div className="text-center">
            <Button size="lg" onClick={handleReframe} disabled={isLoading || !doubt}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <BrainCircuit className="mr-2 h-5 w-5" />}
                {isLoading ? "Reframing..." : "Reframe My Thought"}
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
