'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Map, Pin } from "lucide-react";
import Image from "next/image";
import { useFriends } from "@/lib/data-store";

export default function FriendMapPage() {
  const friendList = useFriends();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline"><Map className="text-primary" /> Friend Map</CardTitle>
          <CardDescription>A world map showing pins from all your friends and their lovely messages.</CardDescription>
        </CardHeader>
        <CardContent>
            <TooltipProvider>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                    <Image src="https://placehold.co/1200x600/FDE2F3/d05e94.png" alt="A World of Love for Jaya" layout="fill" objectFit="cover" data-ai-hint="pink world map"/>
                    {friendList.map(friend => (
                        <Tooltip key={friend.id}>
                            <TooltipTrigger asChild>
                                <div className="absolute transition-transform hover:scale-125" style={{ top: friend.coords.top, left: friend.coords.left }}>
                                    <Pin className="w-8 h-8 text-primary drop-shadow-lg" fill="hsl(var(--primary))"/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-bold">{friend.name}</p>
                                <p className="text-sm">{friend.location}</p>
                                <p className="italic">"{friend.message}"</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </TooltipProvider>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline"><Pin className="text-primary" /> Global Friends</CardTitle>
          <CardDescription>See what time it is for your friends around the world.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {friendList.map(friend => (
            <div key={friend.id} className="flex items-center gap-4 p-2 bg-accent/10 rounded-lg">
              <Avatar>
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-semibold">{friend.name}</p>
                <p className="text-sm text-muted-foreground">{friend.location}</p>
                 <p className="text-xs italic text-primary">"{friend.message}"</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-primary">{friend.time}</p>
              </div>
            </div>
          ))}
        </