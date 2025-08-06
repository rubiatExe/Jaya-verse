
"use client";

import { useState, useEffect } from 'react';
import { useWaterStatus, updateWater } from '@/lib/data-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlassWater, Plus, Minus, Sprout, Loader2, Timer } from "lucide-react";
import { Progress } from '@/components/ui/progress';

const RoseFlower = () => (
    <div className="relative w-12 h-12">
        <div className="absolute w-12 h-12 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-pink-500 rounded-full" style={{transform: 'translate(-50%, -50%)'}}></div>
        <div className="absolute w-4 h-4 bg-pink-600 rounded-full" style={{top: '25%', left: '25%', transform: 'translate(-50%, -50%)'}}></div>
    </div>
);


const RoseStem = ({ progress }: { progress: number }) => {
    const height = progress > 0 ? (progress / 100) * 80 : 0; // Stem height up to 80px
    return (
        <div className="relative w-full h-full flex items-end justify-center">
             <div className="w-1.5 bg-green-600 rounded-t-full" style={{ height: `${height}px`, transition: 'height 0.5s ease-out' }}></div>
             {/* Leaves */}
             {progress > 30 && <div className="absolute w-8 h-4 bg-green-500 rounded-full -translate-x-3 transition-opacity duration-500" style={{ bottom: '25%', transform: 'rotate(-30deg)'}} />}
             {progress > 50 && <div className="absolute w-8 h-4 bg-green-500 rounded-full translate-x-3 transition-opacity duration-500" style={{ bottom: '45%', transform: 'rotate(30deg)'}} />}
        </div>
    );
};

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            // Get current date in UTC
            const now = new Date();
            
            // Create a date object for current time in India
            const indiaNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

            // Create a date object for the next midnight in India
            const tomorrow = new Date(indiaNow);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            // Calculate difference in milliseconds
            const diff = tomorrow.getTime() - indiaNow.getTime();

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return <Loader2 className="w-4 h-4 animate-spin" />;
    }

    return (
         <div className="flex items-center text-sm text-muted-foreground">
            <Timer className="mr-2 h-4 w-4" />
            Resets in: <span className="font-semibold ml-1 text-primary">{timeLeft}</span>
        </div>
    );
};


export default function WaterTrackerPage() {
    const waterStatus = useWaterStatus();

    if (!waterStatus) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }
    
    const { currentGlasses, goalGlasses } = waterStatus;
    const progress = (currentGlasses / goalGlasses) * 100;

    const handleUpdateWater = (newCount: number) => {
        const clampedCount = Math.max(0, Math.min(goalGlasses, newCount));
        updateWater(clampedCount);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><GlassWater className="text-primary" /> Water Tracker</CardTitle>
                    <CardDescription>Log your daily water intake and watch your digital rose grow!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        <p className="text-6xl font-bold text-primary">{currentGlasses}<span className="text-2xl text-muted-foreground">/{goalGlasses}</span></p>
                        <p className="text-muted-foreground">glasses drunk today</p>
                    </div>
                    <Progress value={progress} className="h-4" />
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" size="lg" onClick={() => handleUpdateWater(currentGlasses - 1)}>
                            <Minus className="h-5 w-5 mr-2" />
                            Remove Glass
                        </Button>
                        <Button size="lg" onClick={() => handleUpdateWater(currentGlasses + 1)}>
                            <Plus className="h-5 w-5 mr-2" />
                            Add Glass
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <CountdownTimer />
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Rose</CardTitle>
                    <CardDescription>It blooms when you reach your goal!</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[200px] bg-accent/20 rounded-lg p-4 relative">
                     <div className="absolute inset-0 flex flex-col items-center justify-end">
                        <div className="h-[120px] w-full relative">
                           {progress >= 100 && (
                             <div className="absolute bottom-[70px] left-1/2 -translate-x-1/2">
                                 <RoseFlower />
                             </div>
                           )}
                           <RoseStem progress={progress} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
