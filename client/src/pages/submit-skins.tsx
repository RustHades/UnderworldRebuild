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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Form schema validation
const formSchema = z.object({
  steamId: z.string().min(1, { message: "Steam ID is required" }),
  skinName: z.string().min(3, { message: "Skin name must be at least 3 characters" }),
  skinUrl: z.string().url({ message: "Please enter a valid URL" })
    .refine((url) => url.includes("steamcommunity.com") || url.includes("rustlabs.com"), {
      message: "URL must be from Steam Community or RustLabs"
    }),
  itemType: z.string().min(1, { message: "Item type is required" }),
  reason: z.string().min(10, { message: "Reason must be at least 10 characters" }).max(500, { message: "Reason must be less than 500 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitSkins = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steamId: "",
      skinName: "",
      skinUrl: "",
      itemType: "",
      reason: "",
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      return await apiRequest("POST", "/api/submit-skin", values);
    },
    onSuccess: () => {
      toast({
        title: "Skin submission successful",
        description: "Your skin has been submitted for review.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/skins"] });
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your skin. Please try again.",
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
              Submit <span className="text-primary">Skins</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Request your favorite Rust skins to be added to our server's skin box
            </p>
          </div>
        </div>
      </section>
      
      {/* Submission Form */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Skin Submission Form</CardTitle>
              <CardDescription>
                Fill out this form to request a skin you'd like to see on our server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="steamId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Steam ID</FormLabel>
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
                    
                    <FormField
                      control={form.control}
                      name="itemType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Type</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. AK-47, Hoodie, Door" {...field} />
                          </FormControl>
                          <FormDescription>
                            The type of item for this skin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="skinName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skin Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of the skin" {...field} />
                        </FormControl>
                        <FormDescription>
                          The exact name of the skin as shown on Steam
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="skinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skin URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://steamcommunity.com/market/listings/..." {...field} />
                        </FormControl>
                        <FormDescription>
                          Link to the skin on Steam Community Market or RustLabs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Why would you like this skin to be added to the server?" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Tell us why this skin should be added to our server
                        </FormDescription>
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
                      <><i className="fas fa-spinner fa-spin mr-2"></i>Submitting...</>
                    ) : (
                      <>Submit Skin Request</>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Submission Guidelines */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Submission Guidelines</h2>
          
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Approved Item Types</h3>
                  <p className="text-muted-foreground text-sm">
                    We accept skins for weapons, attire, building parts, and tools. We currently do not accept skins for deployables.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Review Process</h3>
                  <p className="text-muted-foreground text-sm">
                    All skin submissions are reviewed by our admin team. We consider popularity, aesthetic fit with our server, and community demand.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Submission Limits</h3>
                  <p className="text-muted-foreground text-sm">
                    Each player may submit up to 5 skin requests per week. Duplicate submissions will be automatically rejected.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Implementation Timeline</h3>
                  <p className="text-muted-foreground text-sm">
                    Approved skins are typically added to the server within 1-2 weeks after approval, usually during our regular update cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitSkins;
