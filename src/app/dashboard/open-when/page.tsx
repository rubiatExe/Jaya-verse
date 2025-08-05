import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Trash2, Wand2 } from "lucide-react";

const letters = {
  sad: [{ from: "Dad", message: "Remember that time we... you always bounce back stronger!" }, { from: "Bestie", message: "You are a ray of sunshine, even on cloudy days. ✨" }],
  happy: [{ from: "Ben", message: "Let's celebrate! So proud of whatever you did!" }, { from: "Mom", message: "Your happiness is my happiness." }],
  stressed: [{ from: "Grandma", message: "Take a deep breath. This too shall pass. I love you." }],
};

export default function OpenWhenPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline"><Mail className="text-primary" /> Interactive "Open When..." Letters</CardTitle>
        <CardDescription>Open a letter for any mood. Filled with messages from your loved ones.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold text-lg hover:no-underline">💌 ...You're feeling sad</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {letters.sad.map((letter, index) => (
                <div key={index} className="p-4 bg-accent/20 rounded-lg relative group">
                  <p className="italic">"{letter.message}"</p>
                  <p className="text-right font-semibold text-primary mt-2">- {letter.from}</p>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
               <Button variant="outline" className="w-full"><Wand2 className="mr-2 h-4 w-4" />See a new note</Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold text-lg hover:no-underline">😂 ...You need a laugh</AccordionTrigger>
            <AccordionContent>
                <div className="p-4 bg-accent/20 rounded-lg text-center">More letters coming soon!</div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold text-lg hover:no-underline">🤯 ...You're feeling stressed</AccordionTrigger>
             <AccordionContent>
                 <div className="p-4 bg-accent/20 rounded-lg text-center">More letters coming soon!</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
