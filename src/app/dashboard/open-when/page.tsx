'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Trash2, Wand2 } from "lucide-react";
import { useLetters, type Letter } from "@/lib/data-store";

const moodCategories = {
  sad: "💌 ...You're feeling sad",
  laugh: "😂 ...You need a laugh",
  stressed: "🤯 ...You're feeling stressed",
};

export default function OpenWhenPage() {
  const letters = useLetters();

  const getLettersByMood = (mood: keyof typeof moodCategories): Letter[] => {
    return letters.filter(l => l.mood === mood);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline"><Mail className="text-primary" /> Interactive "Open When..." Letters</CardTitle>
        <CardDescription>Open a letter for any mood. Filled with messages from your loved ones.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(moodCategories).map(([mood, title]) => {
            const moodLetters = getLettersByMood(mood as keyof typeof moodCategories);
            return (
              <AccordionItem value={mood} key={mood}>
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">{title}</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  {moodLetters.length > 0 ? (
                    moodLetters.map((letter) => (
                      <div key={letter.id} className="p-4 bg-accent/20 rounded-lg relative group">
                        <p className="italic">"{letter.message}"</p>
                        <p className="text-right font-semibold text-primary mt-2">- {letter.from}</p>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-accent/20 rounded-lg text-center">No letters for this mood yet.</div>
                  )}
                  <Button variant="outline" className="w-full" disabled><Wand2 className="mr-2 h-4 w-4" />See a new note (coming soon!)</Button>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        