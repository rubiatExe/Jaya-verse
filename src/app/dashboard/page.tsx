
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Gamepad2, Bed, Book, Tv, Utensils, Plane, Palette, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const HER_NAME = "Jaya";

const activities = {
  idle: { scene: 'in her room.', sprite: '🧍‍♀️', bg: 'bg-indigo-200 dark:bg-indigo-800', icon: MessageCircle },
  reading: { scene: 'reading a good book.', sprite: '📖', bg: 'bg-blue-200 dark:bg-blue-800', icon: Book },
  sleeping: { scene: 'sleeping soundly.', sprite: '😴', bg: 'bg-purple-200 dark:bg-purple-800', icon: Bed },
  tv: { scene: 'watching TV.', sprite: '📺', bg: 'bg-green-200 dark:bg-green-800', icon: Tv },
  eating: { scene: 'having a snack.', sprite: '🍔', bg: 'bg-yellow-200 dark:bg-yellow-800', icon: Utensils },
  travel: { scene: 'on an adventure.', sprite: '✈️', bg: 'bg-sky-200 dark:bg-sky-800', icon: Plane },
  creating: { scene: 'making art.', sprite: '🎨', bg: 'bg-pink-200 dark:bg-pink-800', icon: Palette },
};

type ActivityKey = keyof typeof activities;

export default function LifeRPGPage() {
  const [activity, setActivity] = useState<ActivityKey>('idle');
  const [details, setDetails] = useState<Record<ActivityKey, string>>(() => ({
    idle: '', reading: '', sleeping: '', tv: '', eating: '', travel: '', creating: ''
  }));
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedActivity = localStorage.getItem('lifeRpgActivity');
    if (savedActivity && activities.hasOwnProperty(savedActivity)) {
      setActivity(savedActivity as ActivityKey);
    }
    const savedDetails = localStorage.getItem('lifeRpgDetails');
    if (savedDetails) {
      setDetails(JSON.parse(savedDetails));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lifeRpgActivity', activity);
  }, [activity]);

  useEffect(() => {
    localStorage.setItem('lifeRpgDetails', JSON.stringify(details));
  }, [details]);
  
  useEffect(() => {
    if (isEditing) {
      // Pre-fill input with existing detail
      setEditInput(details[activity] || '');
      // Focus the input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isEditing, activity, details]);

  const handleActivityChange = (newActivity: ActivityKey) => {
    setActivity(newActivity);
    setIsEditing(true);
  };

  const handleDetailSave = () => {
    setDetails(prev => ({ ...prev, [activity]: editInput }));
    setIsEditing(false);
    setEditInput('');
  };

  const handleModalClose = () => {
    setIsEditing(false);
    setEditInput('');
  };

  const current = activities[activity];
  const detailText = details[activity];
  const displayText = detailText ? `${activity.charAt(0).toUpperCase() + activity.slice(1)}: ${detailText}` : current.scene;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Game Screen */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline"><Gamepad2 className="text-primary" /> Life RPG</CardTitle>
          <CardDescription>A real-time, interactive view of Jaya's current status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={cn("aspect-video w-full rounded-lg flex flex-col items-center justify-center p-4 text-center transition-colors duration-300", current.bg)}>
            <div className="flex-grow flex items-center justify-center">
              <div className="text-8xl animate-bounce">{current.sprite}</div>
            </div>
            <div className="w-full bg-background/80 text-foreground p-3 rounded-md shadow-inner text-lg font-medium font-mono">
              <p>{HER_NAME} is currently {displayText}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Update Status</CardTitle>
          <CardDescription>Choose Jaya's current activity.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          {Object.keys(activities).map(key => {
            const actKey = key as ActivityKey;
            const Icon = activities[actKey].icon;
            return (
              <Button 
                key={actKey}
                variant={activity === actKey ? "default" : "outline"}
                onClick={() => handleActivityChange(actKey)}
                className="capitalize"
              >
                <Icon className="mr-2" />
                {actKey}
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent onEscapeKeyDown={handleModalClose}>
          <DialogHeader>
            <DialogTitle className="capitalize font-headline text-2xl">What about: {activity}?</DialogTitle>
            <DialogDescription>
              Add some specific details. What are you reading/watching/eating?
            </DialogDescription>
          </DialogHeader>
          <Input 
            ref={inputRef}
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDetailSave()}
            placeholder="e.g., 'The Midnight Library'"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={handleModalClose}>Skip</Button>
            <Button onClick={handleDetailSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
