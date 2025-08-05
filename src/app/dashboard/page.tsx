
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Gamepad2, Bed, Book, Tv, Utensils, Plane, Palette, MessageCircle, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const HER_NAME = "Jaya";

const activities = {
  idle: { scene: 'in her room.', sprite: '🧍‍♀️', bg: 'bg-green-200 dark:bg-green-800', icon: MessageCircle },
  reading: { scene: 'reading a good book.', sprite: '📖', bg: 'bg-green-200 dark:bg-green-800', icon: Book },
  sleeping: { scene: 'sleeping soundly.', sprite: '😴', bg: 'bg-green-200 dark:bg-green-800', icon: Bed },
  tv: { scene: 'watching TV.', sprite: '📺', bg: 'bg-green-200 dark:bg-green-800', icon: Tv },
  eating: { scene: 'having a snack.', sprite: '🍔', bg: 'bg-green-200 dark:bg-green-800', icon: Utensils },
  travel: { scene: 'on an adventure.', sprite: '✈️', bg: 'bg-green-200 dark:bg-green-800', icon: Plane },
  creating: { scene: 'making art.', sprite: '🎨', bg: 'bg-green-200 dark:bg-green-800', icon: Palette },
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
      setEditInput(details[activity] || '');
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
    <div className="flex items-center justify-center">
      {/* Gameboy Container */}
      <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 p-4 rounded-xl border-4 border-gray-300 dark:border-gray-700 shadow-2xl space-y-4">
          <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 font-headline text-2xl text-gray-700 dark:text-gray-300"><Gamepad2 /> Life RPG</CardTitle>
              <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
          </div>
          
          {/* Screen Area */}
          <div className="bg-gray-800 p-2 rounded-lg border-2 border-gray-900 shadow-inner">
             <div className={cn("aspect-video w-full rounded-md flex flex-col items-center justify-center p-4 text-center transition-colors duration-300 border-4 border-gray-700", 'bg-lime-200')}>
                 <div className="flex-grow flex items-center justify-center">
                    <div className="text-8xl" style={{ textShadow: '2px 2px #0003' }}>{current.sprite}</div>
                 </div>
                 <div className="w-full bg-black/80 text-lime-300 p-2 rounded-md shadow-inner text-lg font-mono tracking-tighter border-t-2 border-lime-400">
                    <p>{HER_NAME} is currently {displayText}</p>
                 </div>
             </div>
          </div>
          
          {/* Controls Area */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="col-span-1 flex items-center justify-center">
              {/* D-Pad - simplified for this use case */}
              <div className="grid grid-cols-3 grid-rows-3 w-24 h-24">
                <div /> <Button className="col-start-2 bg-gray-700 hover:bg-gray-600 border-b-4 border-gray-900" /> <div />
                <Button className="col-start-1 row-start-2 bg-gray-700 hover:bg-gray-600 border-b-4 border-gray-900" /> 
                <div className="bg-gray-700" />
                <Button className="col-start-3 row-start-2 bg-gray-700 hover:bg-gray-600 border-b-4 border-gray-900" />
                <div /> <Button className="col-start-2 row-start-3 bg-gray-700 hover:bg-gray-600 border-b-4 border-gray-900" /> <div />
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-2 items-center">
              {Object.keys(activities).map((key) => {
                const actKey = key as ActivityKey;
                const { icon: Icon } = activities[actKey];
                return (
                  <Button 
                    key={actKey}
                    variant={activity === actKey ? "destructive" : "secondary"}
                    onClick={() => handleActivityChange(actKey)}
                    className="capitalize rounded-full h-14 w-14 text-xs flex-col gap-1 shadow-md border-b-4 border-gray-900/50"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{actKey}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
      </div>

      {/* Detail Modal (unchanged) */}
      <Dialog open={isEditing} onOpenChange={handleModalClose}>
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
