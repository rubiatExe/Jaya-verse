import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, PlusCircle } from "lucide-react";
import Image from "next/image";

const dreams = [
  { title: "Visit Japan", image: "https://placehold.co/600x400.png", dataAiHint: "tokyo street cherry blossom" },
  { title: "Learn Pottery", image: "https://placehold.co/600x400.png", dataAiHint: "pottery wheel hands" },
  { title: "Adopt a Corgi", image: "https://placehold.co/600x400.png", dataAiHint: "corgi puppy" },
  { title: "Master a new recipe", image: "https://placehold.co/600x400.png", dataAiHint: "baking bread" },
];

export default function DreamBoardPage() {
  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><ImageIcon className="text-primary" /> Dream Board</CardTitle>
                <CardDescription>A visual, collage-style board for your personal goals and dreams.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
                <Input placeholder="What's a new dream?" />
                <Input type="file" />
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Dream</Button>
            </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dreams.map((dream, index) => (
                <Card key={index} className="group overflow-hidden relative">
                    <Image src={dream.image} alt={dream.title} width={600} height={400} data-ai-hint={dream.dataAiHint} className="w-full h-auto object-cover aspect-video transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <CardHeader className="absolute bottom-0 text-white">
                        <CardTitle className="font-headline text-2xl">{dream.title}</CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </div>
  );
}
