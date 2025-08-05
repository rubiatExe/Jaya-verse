import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import HeartClickAnimation from '@/components/heart-click-animation';
import BackgroundMusic from '@/components/background-music';
import AnimatedFooter from '@/components/animated-footer';

export const metadata: Metadata = {
  title: "Jaya's Universe",
  description: 'A little universe for Jaya, filled with love and magic.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <div className="flex-grow">{children}</div>
        <Toaster />
        <HeartClickAnimation />
        <BackgroundMusic />
        <AnimatedFooter />
      </body>
    </html>
  );
}
