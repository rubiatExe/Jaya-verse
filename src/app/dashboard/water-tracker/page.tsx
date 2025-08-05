"use client";

import { useWaterStatus, updateWater } from '@/lib/data-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlassWater, Plus, Minus, Sprout, Loader2 } from "lucide-react";
import { Progress } from '@/components/ui/progress';

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

    const PlantIcon = ({ progress }: { progress: number }) => {
        const height = 24 + (progress * 0.76); // from 24px to 100px
        return <Sprout className="text-primary transition-all duration-500" style={{ height: `${height}px`, width: `${height}px` }} />;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><GlassWater className="text-primary" /> Water Tracker</CardTitle>
                    <CardDescription>Log your daily water intake and watch your digital plant grow!</CardDescription>
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
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Plant</CardTitle>
                    <CardDescription>It blooms when you reach your goal!</CardDescription>
                </CardHeader>
                <CardContent className="flex items-end justify-center h-[200px] bg-accent/20 rounded-lg p-4 relative">
                     <PlantIcon progress={progress} />
                     {progress >= 100 && (
                        <>
                           <span className='text-3xl absolute' style={{top: '40%', left: '45%', transform: 'rotate(-10deg)'}}>🌸</span>
                           <span className='text-3xl absolute' style={{top: '30%', left: '60%', transform: 'rotate(15deg)'}}>🌺</span>
                           <span className='text-3xl absolute' style={{top: '50%', left: '30%', transform: 'rotate(5deg)'}}>🌷</span>
                        </>
                     )}
                </CardContent>
            </Card>
        </div>
    );
}