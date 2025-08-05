"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Loader2 } from "lucide-react";
import { getRandomReason as getNewReasonAction } from "@/app/actions";
import type { GetRandomReasonOutput } from "@/ai/flows/reasons-we-love-you-jar";

export default function ReasonsJarPage() {
  const [reason, setReason] = useState<GetRandomReasonOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetReason = async () => {
    setIsLoading(true);
    setReason(null);
    try {
      const result = await getNewReasonAction();
      setReason(result);
    } catch (error) {
      console.error("Failed to get a reason:", error);
      setReason({ reason: "Couldn't get a reason right now, but we still love you!" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <Gift className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="mt-4 font-headline text-3xl">Reasons We Love You Jar</CardTitle>
          <CardDescription className="text-lg">
            A little reminder of how wonderful you are. Click the button to pull a reason from the jar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[120px] flex items-center justify-center bg-accent/20 p-6 rounded-lg border-2 border-dashed border-accent">
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : reason ? (
              <p className="text-2xl font-semibold text-accent-foreground font-headline">
                "{reason.reason}"
              </p>
            ) : (
              <p className="text-muted-foreground">Click the button to see some love!</p>
            )}
          </div>
          <Button onClick={handleGetReason} disabled={isLoading} size="lg">
            <Heart className="mr-2 h-5 w-5" />
            {isLoading ? "Getting some love..." : "Show me some love"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
