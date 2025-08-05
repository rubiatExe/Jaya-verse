import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Sparkles } from "lucide-react";

export default function SelfTalkPage() {
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
            <Textarea id="doubt" placeholder="e.g., I'm not good enough to do this." className="min-h-[120px]" />
          </div>
          <div className="space-y-2">
            <label htmlFor="reframe" className="font-semibold text-lg">2. How can you reframe it with kindness?</label>
            <Textarea id="reframe" placeholder="e.g., I am capable and I will try my best. That is enough." className="min-h-[120px]" />
          </div>
        </div>
        <div className="text-center">
            <Button size="lg">
                <BrainCircuit className="mr-2 h-5 w-5" />
                Solidify Positive Thought
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
