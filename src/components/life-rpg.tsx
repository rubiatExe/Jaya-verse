
"use client";

import { useState, useEffect, useRef } from 'react';
import { useLifeRpgStatus, updateLifeRpgStatus, LifeRpgStatus } from '@/lib/data-store';
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Gamepad2, Bed, Book, Tv, Utensils, Plane, Palette, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const HER_NAME = "Jaya";

const activities = {
  idle: { scene: 'in her room.', sprite: '🧍‍♀️', bg: 'bg-lime-200', icon: MessageCircle },
  reading: { scene: 'reading a good book.', sprite: '📖', bg: 'bg-blue-300', icon: Book },
  sleeping: { scene: 'sleeping soundly.', sprite: '😴', bg: 'bg-indigo-300', icon: Bed },
  tv: { scene: 'watching TV.', sprite: '📺', bg: 'bg-purple-300', icon: Tv },
  eating: { scene: 'having a snack.', sprite: '🍔', bg: 'bg-pink-300', icon: Utensils },
  travel: { scene: 'on an adventure.', sprite: '✈️', bg: 'bg-yellow-300', icon: Plane },
  creating: { scene: 'making art.', sprite: '🎨', bg: 'bg-teal-300', icon: Palette },
};

export type ActivityKey = keyof typeof activities;

interface LifeRpgProps {
  isInteractive: boolean;
}

export function LifeRpg({ isInteractive }: LifeRpgProps) {
  const status = useLifeRpgStatus();
  const [isEditing, setIsEditing] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityKey | null>(null);
  const [editInput, setEditInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editingActivity && status?.details) {
      setEditInput(status.details[editingActivity] || '');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isEditing, editingActivity, status]);
  
  if (!status) {
    return (
       <div className="flex items-center justify-center font-mono">
         <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-2xl border-4 border-gray-600 max-w-md mx-auto w-full">
             <div className="mt-4 aspect-[4/3] w-full rounded-md flex flex-col items-center justify-center p-4 text-center transition-colors duration-300 border-4 border-gray-700 shadow-inner bg-gray-600">
                <Loader2 className="w-12 h-12 animate-spin text-white" />
             </div>
         </div>
       </div>
    )
  }

  const { activity, details } = status;

  const handleActivityChange = (newActivity: ActivityKey) => {
    if (!isInteractive) return;
    setEditingActivity(newActivity);
    setIsEditing(true);
  };

  const handleDetailSave = async () => {
    if (!editingActivity) return;
    
    const newStatus: Partial<LifeRpgStatus> = {
        activity: editingActivity,
        details: {
            ...status.details,
            [editingActivity]: editInput,
        }
    };
    await updateLifeRpgStatus(newStatus);
    setIsEditing(false);
    setEditingActivity(null);
    setEditInput('');
  };
  
  const handleModalClose = () => {
    setIsEditing(false);
    setEditingActivity(null);
    setEditInput('');
  };

  const current = activities[activity];
  const detailText = details[activity];
  const displayText = detailText ? `${activity}: ${detailText}` : current.scene;

  return (
    <div className="flex items-center justify-center font-mono">
      <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-2xl border-4 border-gray-600 max-w-md mx-auto w-full">
          <div className="flex justify-between items-center text-gray-300">
              <CardTitle className="flex items-center gap-2 font-headline text-xl"><Gamepad2 /> Life RPG</CardTitle>
              <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
          </div>
          
          <div className={cn("mt-4 aspect-[4/3] w-full rounded-md flex flex-col items-center justify-center p-4 text-center transition-colors duration-300 border-4 border-gray-700 shadow-inner", current.bg)}>
              <div className="flex-grow flex items-center justify-center">
                 <div className="text-6xl animate-bounce">{current.sprite}</div>
              </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-200 text-gray-900 rounded border-2 border-gray-400 h-20 flex items-center justify-center text-center">
            <p className="text-sm">
                {HER_NAME} is currently {displayText}
            </p>
          </div>

           {isInteractive && (
             <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(activities).map((key) => {
                  const actKey = key as ActivityKey;
                  const { icon: Icon, bg } = activities[actKey];
                  return (
                    <button 
                      key={actKey}
                      onClick={() => handleActivityChange(actKey)}
                      className={cn(
                          "p-2 text-white rounded capitalize shadow-md border-b-4 border-black/20 flex flex-col items-center justify-center gap-1 text-xs h-16 transition-transform transform active:scale-95",
                          bg
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{actKey}</span>
                    </button>
                  );
                })}
              </div>
            )}
      </div>

      <Dialog open={isEditing} onOpenChange={handleModalClose}>
        <DialogContent onEscapeKeyDown={handleModalClose} className="font-sans">
          <DialogHeader>
            <DialogTitle className="capitalize font-headline text-2xl">What about: {editingActivity}?</DialogTitle>
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
