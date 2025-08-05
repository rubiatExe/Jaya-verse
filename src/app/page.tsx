'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Droplets, BookOpen, MessageSquare, MapPin, Send, Rss } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold font-headline">Jaya's Universe</h1>
        </div>
        <Button asChild variant="ghost" className="hover:bg-primary/10">
          <Link href="/dashboard">Jaya's Login</Link>
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-5xl md:text-7xl font-headline font-bold shimmer">A Little Universe for Jaya</h2>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl">
          Welcome to a special place created just for Jaya, filled with love, magic, and happy thoughts from everyone who adores her.
        </p>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Life RPG View */}
          <Card className="w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><HeartPulseIcon className="w-6 h-6 text-primary" /> Life RPG</CardTitle>
              <CardDescription>Jaya's current status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                <p className="font-semibold">Currently:</p>
                <p className="text-primary font-bold">Napping 😴</p>
              </div>
            </CardContent>
          </Card>

          {/* Water Status */}
          <Card className="w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><Droplets className="w-6 h-6 text-primary" /> Water Intake</CardTitle>
              <CardDescription>Her hydration goal for today!</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={60} className="w-full h-4" />
              <p className="text-sm text-muted-foreground mt-2 text-center">6/10 glasses</p>
            </CardContent>
          </Card>
          
          {/* Recent Love Feed */}
          <Card className="w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><Rss className="w-6 h-6 text-primary" /> Recent Love</CardTitle>
              <CardDescription>Latest messages from friends.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-left">
              <div className="text-sm p-2 bg-accent/30 rounded-lg"><strong>Mom:</strong> "You have the best smile!" 😊</div>
              <div className="text-sm p-2 bg-accent/30 rounded-lg"><strong>Alex:</strong> "Thinking of you!" ❤️</div>
            </CardContent>
          </Card>

          {/* Leave a Note */}
          <Card className="w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><BookOpen className="w-6 h-6 text-primary" /> "Open When..." Letter</CardTitle>
              <CardDescription>Leave a note for a future moment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select>
                <SelectTrigger><SelectValue placeholder="Choose a category..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sad">You're feeling sad</SelectItem>
                  <SelectItem value="happy">You need a laugh</SelectItem>
                  <SelectItem value="stressed">You're stressed</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Your secret message..." />
              <Button className="w-full"><Send className="mr-2" /> Send Note</Button>
            </CardContent>
          </Card>

          {/* Share a Reason */}
          <Card className="w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><MessageSquare className="w-6 h-6 text-primary" /> Share a Reason</CardTitle>
              <CardDescription>Why do you love Jaya?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="e.g., her contagious laugh" />
              <Input placeholder="Your name (optional)" />
              <Button className="w-full"><Heart className="mr-2" /> Share Love</Button>
            </CardContent>
          </Card>

          {/* Add Pin to Map */}
          <Card className="w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><MapPin className="w-6 h-6 text-primary" /> Friend Map</CardTitle>
              <CardDescription>Add your pin to her world.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Your name" />
              <Input placeholder="Your location (e.g., Paris, France)" />
              <Button className="w-full"><MapPin className="mr-2" /> Add Pin</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="text-center p-6 text-sm text-muted-foreground">
        Made with ❤️ for the one and only Jaya.
      </footer>
    </div>
  );
}

// Custom icon to be used in the file
function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.7-1.5L11.5 12h5.8" />
    </svg>
  )
}
