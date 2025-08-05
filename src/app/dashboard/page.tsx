import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Gamepad2 } from "lucide-react";

export default function LifeRPGPage() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Gamepad2 className="text-primary" />
            Update Your Life RPG
          </CardTitle>
          <CardDescription>
            Let everyone know what you're up to. Your status will be saved and shown on the public page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="status" className="font-medium">Current Status</label>
            <Input id="status" placeholder="e.g., Studying, Napping, Creating art" defaultValue="Napping 😴" />
          </div>
          <div className="space-y-2">
            <label htmlFor="details" className="font-medium">Activity Details</label>
            <Textarea id="details" placeholder="e.g., Reading 'The Midnight Library', sketching a new character" />
          </div>
          <Button size="lg">
            <Save className="mr-2 h-5 w-5" />
            Save Status
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Current Vibe</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl text-center p-8 bg-accent/20 rounded-lg">🌸✨🧘‍♀️</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Quick Energy Boost</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Button variant="outline">Listen to a happy song</Button>
                <Button variant="outline">Look at a cute puppy pic</Button>
                <Button variant="outline">Do a 1-min meditation</Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
