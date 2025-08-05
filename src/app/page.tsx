
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Droplet, Send, Gift, MapPin, Loader2 } from 'lucide-react';
import { LifeRpg } from '@/components/life-rpg';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { addReason } from '@/app/actions';

const reasonSchema = z.object({
  reason: z.string().min(3, "Your reason should be a little longer!").max(100, "That's a beautiful thought! Can you make it a bit more concise?"),
});

const noteSchema = z.object({
  note: z.string().min(10, "Please write a bit more!").max(200, "Your note is a bit long, please keep it concise!"),
  from: z.string().min(1, "Please let us know who this is from!"),
});

const pinSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  location: z.string().min(3, "Please enter a valid location."),
  message: z.string().min(3, "Please leave a short message!").max(50, "Message is too long."),
});


export default function Home() {
  const { toast } = useToast();

  const reasonForm = useForm<z.infer<typeof reasonSchema>>({
    resolver: zodResolver(reasonSchema),
    defaultValues: { reason: "" },
  });

  const noteForm = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: { note: "", from: "" },
  });

  const pinForm = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
    defaultValues: { name: "", location: "", message: "" },
  });
  
  const onReasonSubmit = async (data: z.infer<typeof reasonSchema>) => {
    try {
      await addReason(data.reason);
      toast({
        title: "Reason Submitted!",
        description: "Thank you for sharing your love for Jaya.",
      });
      reasonForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh no!",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const onNoteSubmit = (data: z.infer<typeof noteSchema>) => {
    console.log(data);
    toast({
      title: "Note Submitted!",
      description: "Thank you for leaving a note for Jaya.",
    });
    noteForm.reset();
  };

  const onPinSubmit = (data: z.infer<typeof pinSchema>) => {
    console.log(data);
    toast({
      title: "Pin Added!",
      description: "Your pin has been added to the map. Thank you!",
    });
    pinForm.reset();
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold font-headline">Jaya's Universe</h1>
        </div>
        <Button asChild variant="ghost" className="hover:bg-primary/10">
          <Link href="/dashboard">Jaya's Login</Link>
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-5xl md:text-7xl font-headline font-bold shimmer">A Little Universe for Jaya</h2>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl">
          Welcome to a special place created just for Jaya. Here's what she's up to right now!
        </p>

        <div className="mt-8 w-full flex justify-center">
            <LifeRpg isInteractive={false} />
        </div>

        <div className="mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Column 1 */}
            <div className="space-y-8">
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                         <MessageSquare className="w-8 h-8 text-primary flex-shrink-0"/>
                         <div>
                            <CardTitle className="font-headline text-2xl">Recent Love Feed</CardTitle>
                            <CardDescription>See the latest messages from friends and family.</CardDescription>
                         </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="p-3 bg-accent/20 rounded-lg">
                            <p className="italic">"You're the best!"</p>
                            <p className="text-right text-sm font-semibold text-primary">- Ben</p>
                        </div>
                         <div className="p-3 bg-accent/20 rounded-lg">
                            <p className="italic">"Thinking of you!"</p>
                            <p className="text-right text-sm font-semibold text-primary">- Mom</p>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                         <Droplet className="w-8 h-8 text-primary flex-shrink-0"/>
                         <div>
                            <CardTitle className="font-headline text-2xl">Water Intake</CardTitle>
                            <CardDescription>Jaya's hitting her hydration goals!</CardDescription>
                         </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Progress value={75} className="h-3" />
                        <p className="text-sm text-muted-foreground text-center">Jaya has drunk 6/8 glasses today!</p>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                         <Send className="w-8 h-8 text-primary flex-shrink-0"/>
                         <div>
                            <CardTitle className="font-headline text-2xl">Leave a Public Note</CardTitle>
                            <CardDescription>Leave a note for one of the "Open When..." letters.</CardDescription>
                         </div>
                    </CardHeader>
                    <CardContent>
                        <Form {...noteForm}>
                          <form onSubmit={noteForm.handleSubmit(onNoteSubmit)} className="space-y-4">
                            <FormField control={noteForm.control} name="note" render={({ field }) => (
                                <FormItem>
                                    <Textarea placeholder="Write a note of encouragement..." {...field}/>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                             <FormField control={noteForm.control} name="from" render={({ field }) => (
                                <FormItem>
                                    <Input placeholder="Your name" {...field}/>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <Button type="submit" className="w-full" disabled={noteForm.formState.isSubmitting}>
                                {noteForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Note
                            </Button>
                          </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            {/* Column 2 */}
            <div className="space-y-8">
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                         <Gift className="w-8 h-8 text-primary flex-shrink-0"/>
                         <div>
                            <CardTitle className="font-headline text-2xl">Share a Reason You Love Jaya</CardTitle>
                            <CardDescription>Your reason will be added to her "Reasons We Love You" jar!</CardDescription>
                         </div>
                    </CardHeader>
                    <CardContent>
                       <Form {...reasonForm}>
                          <form onSubmit={reasonForm.handleSubmit(onReasonSubmit)} className="space-y-4">
                            <FormField
                              control={reasonForm.control}
                              name="reason"
                              render={({ field }) => (
                                <FormItem>
                                  <Textarea placeholder="She is kind because..." {...field} />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" className="w-full" disabled={reasonForm.formState.isSubmitting}>
                                {reasonForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Share Reason
                            </Button>
                          </form>
                        </Form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                         <MapPin className="w-8 h-8 text-primary flex-shrink-0"/>
                         <div>
                            <CardTitle className="font-headline text-2xl">Add Your Pin to the Map</CardTitle>
                            <CardDescription>Let Jaya know where in the world her friends are.</CardDescription>
                         </div>
                    </CardHeader>
                    <CardContent>
                         <Form {...pinForm}>
                          <form onSubmit={pinForm.handleSubmit(onPinSubmit)} className="space-y-4">
                            <FormField control={pinForm.control} name="name" render={({ field }) => (
                                <FormItem><Input placeholder="Your Name" {...field}/><FormMessage /></FormItem>
                            )}/>
                             <FormField control={pinForm.control} name="location" render={({ field }) => (
                                <FormItem><Input placeholder="Your Location (e.g., City, Country)" {...field}/><FormMessage /></FormItem>
                            )}/>
                            <FormField control={pinForm.control} name="message" render={({ field }) => (
                                <FormItem><Textarea placeholder="A short message..." {...field}/><FormMessage /></FormItem>
                            )}/>
                            <Button type="submit" className="w-full" disabled={pinForm.formState.isSubmitting}>
                                {pinForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Add Pin
                            </Button>
                          </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>

      <footer className="text-center p-6 text-sm text-muted-foreground">
        Made with ❤️ for the one and only Jaya.
      </footer>
    </div>
  );
}
