'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Map, MapPin } from "lucide-react";
import { useFriends, type Friend } from "@/lib/data-store";

// World Map SVG Component
const WorldMapSVG = () => (
    <svg viewBox="0 0 1000 500" className="w-full h-full" fill="#a1d2e6" stroke="#fff" strokeWidth="1">
        <path fill="#90c68a" d="M295 140l-30 20 -20 30 -10 30 10 20 20 30 30 20 40 -10 30 -30 10 -40 -20 -30 -40 -20z M150 300l-20 20 -10 30 10 20 30 10 40 -10 20 -20 -10 -30 -30 -20z M450 120l-20 30 10 40 30 30 40 10 30 -20 10 -40 -20 -30 -40 -20z M600 150l20 20 10 30 20 20 30 0 30 -20 10 -30 -10 -20 -30 0 -30 20z M750 250l20 20 10 30 20 20 30 0 30 -20 10 -30 -10 -20 -30 0 -30 20z M500 300l-20 20 -10 30 10 20 30 10 40 -10 20 -20 -10 -30 -30 -20z M800 350l20 20 10 30 20 20 30 0 30 -20 10 -30 -10 -20 -30 0 -30 20z" />
    </svg>
);


// Global Friends Widget Component
const GlobalFriendsWidget = ({ friendPins }: { friendPins: Friend[] }) => {
    const [times, setTimes] = useState<Record<string, { time: string; emoji: string }>>({});

    useEffect(() => {
        const getTimes = () => {
            const newTimes: Record<string, { time: string; emoji: string }> = {};
            friendPins.forEach(pin => {
                if(pin.timeZone) {
                    try {
                        const time = new Date().toLocaleTimeString('en-US', { timeZone: pin.timeZone, hour: 'numeric', minute: '2-digit', hour12: true });
                        const hour = parseInt(new Date().toLocaleTimeString('en-US', { timeZone: pin.timeZone, hour: 'numeric', hour12: false }));
                        const emoji = (hour >= 6 && hour < 12) ? '☀️' : (hour >= 12 && hour < 18) ? '🏙️' : (hour >= 18 && hour < 22) ? '🌇' : '🌙';
                        newTimes[pin.name] = { time, emoji };
                    } catch (e) {
                        // Invalid timezone
                        newTimes[pin.name] = { time: "N/A", emoji: "🤷" };
                    }
                }
            });
            setTimes(newTimes);
        };

        if (friendPins.length > 0) {
            getTimes();
            const interval = setInterval(getTimes, 60000); // Update every minute
            return () => clearInterval(interval);
        }
    }, [friendPins]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl text-center">Friends Around the World</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {friendPins.map(pin => (
                        <div key={pin.id} className="p-3 bg-accent/20 rounded-lg text-center flex flex-col items-center">
                             <Avatar>
                                <AvatarImage src={pin.avatar} />
                                <AvatarFallback>{pin.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                            <p className="font-bold text-primary mt-2">{pin.name}</p>
                            <p className="text-sm text-muted-foreground">{pin.location}</p>
                            <p className="text-lg font-mono text-accent-foreground mt-1">{times[pin.name]?.time} {times[pin.name]?.emoji}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

// Friend Map Component
const FriendMap = ({ friendPins }: { friendPins: Friend[] }) => {
    const [activePin, setActivePin] = useState<Friend | null>(null);
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><Map className="text-primary" /> Jaya's World of Friends</CardTitle>
                    <CardDescription>A world map showing pins from all your friends and their lovely messages.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full max-w-4xl mx-auto aspect-video bg-blue-200 rounded-lg overflow-hidden border-2 border-primary/20">
                        <WorldMapSVG />
                        {friendPins.map((pin) => (
                            <div key={pin.id} className="absolute" style={{ left: pin.coords.left, top: pin.coords.top }} onMouseEnter={() => setActivePin(pin)} onMouseLeave={() => setActivePin(null)}>
                                <div className="animate-bounce transform -translate-x-1/2 -translate-y-full">
                                    <MapPin className="w-8 h-8 text-primary cursor-pointer drop-shadow-lg" fill="hsl(var(--primary))"/>
                                </div>
                                {activePin && activePin.id === pin.id && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-background p-2 rounded-lg shadow-lg text-center z-10 border">
                                        <p className="font-bold text-primary">{pin.name}</p>
                                        <p className="text-sm text-muted-foreground">{pin.location}</p>
                                        <p className="text-sm text-accent-foreground italic">"{pin.message}"</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <GlobalFriendsWidget friendPins={friendPins} />
        </div>
    );
};


export default function FriendMapPage() {
  const friendList = useFriends();

  return <FriendMap friendPins={friendList} />;
}
