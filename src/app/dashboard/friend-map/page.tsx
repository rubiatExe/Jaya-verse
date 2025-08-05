import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Map, Pin } from "lucide-react";
import Image from "next/image";

const friends = [
  { name: 'Alex', location: 'Tokyo, Japan', time: '9:00 PM', message: 'Miss you!', avatar: 'https://placehold.co/100x100/F9A8D4/4A234E.png?text=A' },
  { name: 'Mom', location: 'New York, USA', time: '8:00 AM', message: 'Call me soon!', avatar: 'https://placehold.co/100x100/E1BEE7/4A234E.png?text=M' },
  { name: 'Ben', location: 'London, UK', time: '1:00 PM', message: 'Hope you are well!', avatar: 'https://placehold.co/100x100/FDE2F3/4A234E.png?text=B' },
];

export default function FriendMapPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline"><Map className="text-primary" /> Friend Map</CardTitle>
          <CardDescription>A world map showing pins from all your friends and their lovely messages.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative aspect-video w-full bg-accent/20 rounded-lg overflow-hidden flex items-center justify-center">
                 <Image src="https://placehold.co/800x450.png" alt="World map with pins" layout="fill" objectFit="cover" data-ai-hint="world map illustration"/>
                 <p className="z-10 font-semibold text-accent-foreground p-4 bg-background/80 rounded-md">Interactive Map Coming Soon!</p>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline"><Pin className="text-primary" /> Global Friends</CardTitle>
          <CardDescription>See what time it is for your friends around the world.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {friends.map(friend => (
            <div key={friend.name} className="flex items-center gap-4 p-2 bg-accent/10 rounded-lg">
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
        </CardContent>
      </Card>
    </div>
  );
}
