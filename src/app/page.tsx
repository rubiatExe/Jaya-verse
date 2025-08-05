'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { LifeRpg } from '@/components/life-rpg';


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
      </main>

      <footer className="text-center p-6 text-sm text-muted-foreground">
        Made with ❤️ for the one and only Jaya.
      </footer>
    </div>
  );
}
