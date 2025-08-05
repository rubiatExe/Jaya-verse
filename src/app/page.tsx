
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Droplet, Send, Gift, MapPin } from 'lucide-react';
import { LifeRpg } from '@/components/life-rpg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


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
          Welcome to a special place created just for Jaya. Here's what she's up to right now!
        </p>

        <div className="mt-8 w-full flex justify-center">
            <LifeRpg isInteractive={false} />
        </div>

        <Card className="mt-12 w-full max-w-4xl text-left">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Ways to Share Your Love</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                  <div>
                      <h3 className="font-semibold">Recent Love Feed</h3>
                      <p className="text-sm text-muted-foreground">A live-updating feed that shows the last few messages and reasons left by friends and family.</p>
                  </div>
              </div>
               <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <Droplet className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                  <div>
                      <h3 className="font-semibold">Public Water Status</h3>
                      <p className="text-sm text-muted-foreground">View Jaya's daily water intake progress.</p>
                  </div>
              </div>
               <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <Send className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                  <div>
                      <h3 className="font-semibold">Leave a Public Note</h3>
                      <p className="text-sm text-muted-foreground">Leave a personal note for one of the "Open When..." letter categories.</p>
                  </div>
              </div>
               <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <Gift className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                  <div>
                      <h3 className="font-semibold">Share a Reason (Public)</h3>
                      <p className="text-sm text-muted-foreground">Share a reason they love Jaya.</p>
                  </div>
              </div>
               <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                  <div>
                      <h3 className="font-semibold">Add Pin to Public Map</h3>
                      <p className="text-sm text-muted-foreground">Add their location to the interactive friend map.</p>
                  </div>
              </div>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center p-6 text-sm text-muted-foreground">
        Made with ❤️ for the one and only Jaya.
      </footer>
    </div>
  );
}
