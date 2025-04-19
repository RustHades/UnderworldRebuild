import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Form schema validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  discordId: z.string().optional(),
  steamId: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(1000, { message: "Message must be less than 1000 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      discordId: "",
      steamId: "",
      subject: "",
      message: "",
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      return await apiRequest("POST", "/api/contact", values);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-primary text-2xl mt-1">
                        <i className="fab fa-discord"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Discord</h3>
                        <p className="text-muted-foreground">
                          The fastest way to reach us is through our Discord server
                        </p>
                        <a 
                          href="https://discord.gg/ZMsbaBNexV"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 inline-block mt-2"
                        >
                          Join Discord
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-primary text-2xl mt-1">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Email</h3>
                        <p className="text-muted-foreground">
                          For business inquiries or partnership opportunities
                        </p>
                        <a 
                          href="mailto:admin@underworldrust.com"
                          className="text-primary hover:text-primary/80 inline-block mt-2"
                        >
                          admin@underworldrust.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-primary text-2xl mt-1">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Admin Hours</h3>
                        <p className="text-muted-foreground">
                          Our admin team is available during the following hours:
                        </p>
                        <ul className="text-muted-foreground mt-2 space-y-1">
                          <li>Weekdays: 4PM - 12AM EST</li>
                          <li>Weekends: 10AM - 2AM EST</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="discordId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Discord ID (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. username#1234" {...field} />
                              </FormControl>
                              <FormDescription>
                                Your Discord username with tag
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="steamId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Steam ID (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Steam ID" {...field} />
                              </FormControl>
                              <FormDescription>
                                Your Steam ID or vanity URL
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="report">Player Report</SelectItem>
                                <SelectItem value="suggestion">Suggestion</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your message..." 
                                className="min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? (
                          <><i className="fas fa-spinner fa-spin mr-2"></i>Sending...</>
                        ) : (
                          <>Send Message</>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <Card className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">When do server wipes happen?</h3>
                <p className="text-muted-foreground">
                  We wipe the server every Thursday at 4 PM EST. Blueprint wipes occur on the first Thursday of each month.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">How do I report a player?</h3>
                <p className="text-muted-foreground">
                  You can report players through our Discord server in the #player-reports channel or by using this contact form and selecting "Player Report" as the subject.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">How do I join the server?</h3>
                <p className="text-muted-foreground">
                  You can connect to our server by searching for "Underworld Rust" in the server browser or by using the connect button on our website.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">What are the gathering rates?</h3>
                <p className="text-muted-foreground">
                  Our server features 3x gathering rates for all resources to provide a balanced gameplay experience that respects your time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
