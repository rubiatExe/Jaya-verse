import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, PlusCircle } from "lucide-react";

export default function CycleTrackerPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><CalendarDays className="text-primary" /> Cycle Tracker</CardTitle>
                <CardDescription>A simple, private tracker for your menstrual cycle. Select the start date of your last period.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={new Date()}
                    className="rounded-md border"
                />
            </CardContent>
        </Card>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Next Predicted Period</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-primary">In 12 days</p>
                    <p className="text-muted-foreground">Around October 28th</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Log Symptoms</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button variant="outline">Cramps</Button>
                    <Button variant="outline">Headache</Button>
                    <Button variant="outline">Feeling great!</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
