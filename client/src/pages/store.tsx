import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Store = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Server <span className="text-primary">Store</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Support the server and enhance your gameplay with exclusive perks and packages
            </p>
            <a 
              href="https://store.underworldrust.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <i className="fas fa-shopping-cart mr-2"></i>
                <span>Visit Store</span>
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Store Categories */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="kits" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-card">
                <TabsTrigger value="kits">Kits</TabsTrigger>
                <TabsTrigger value="vip">VIP Packages</TabsTrigger>
                <TabsTrigger value="commands">Commands</TabsTrigger>
                <TabsTrigger value="cosmetics">Cosmetics</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Kits Tab */}
            <TabsContent value="kits">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Starter Kit</span>
                      <span className="text-primary">$5.99</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        Stone Tools Set
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        1x Sleeping Bag
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        1x Wood Door
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        200x Wood
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        100x Stone
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Warrior Kit</span>
                      <span className="text-primary">$9.99</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        1x Thompson SMG
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        1x Road Sign Armor Set
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        3x Medical Syringes
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        100x 5.56 Ammo
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        1x Large Medkit
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Builder Kit</span>
                      <span className="text-primary">$12.99</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        1000x Wood
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        500x Stone
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        200x Metal Fragments
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        5x Sheet Metal Door
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        1x Tool Cupboard
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* VIP Packages Tab */}
            <TabsContent value="vip">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Bronze VIP</span>
                      <span className="text-primary">$14.99/month</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        Reserved Slot
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /kit vip command (24h cooldown)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /home command (2 homes)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        Bronze rank on Discord
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-card border border-primary">
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-bold">
                    MOST POPULAR
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Silver VIP</span>
                      <span className="text-primary">$24.99/month</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        All Bronze benefits
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /kit elite command (24h cooldown)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /home command (4 homes)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /tpr command (5 min cooldown)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        Silver rank on Discord
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Gold VIP</span>
                      <span className="text-primary">$39.99/month</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        All Silver benefits
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /kit gold command (12h cooldown)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /home command (6 homes)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /tpr command (2 min cooldown)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        /remove command (remove walls/doors)
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        Gold rank on Discord
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Commands Tab */}
            <TabsContent value="commands">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {["Remove Tool", "Teleport Command", "Recycle Command", "Skin Box"].map((item, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <CardTitle className="text-center">{item}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-primary text-2xl font-bold mb-2">$4.99</p>
                      <p className="text-muted-foreground text-sm">One-time purchase</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Cosmetics Tab */}
            <TabsContent value="cosmetics">
              <div className="text-center mb-8">
                <p className="text-muted-foreground">
                  Coming soon! We're working on adding custom cosmetics to our store.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Store Policy */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Store Policy</h2>
          
          <div className="bg-card rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Refund Policy</h3>
                <p className="text-muted-foreground text-sm">
                  We offer refunds within 24 hours of purchase if you haven't used the items or services. 
                  Contact an admin on Discord for assistance.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">Terms of Service</h3>
                <p className="text-muted-foreground text-sm">
                  By making a purchase, you agree to our terms of service. Items and services are for use on our 
                  server only and cannot be transferred or sold to other players.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">Payment Processing</h3>
                <p className="text-muted-foreground text-sm">
                  All payments are processed securely through PayPal or Stripe. We never store your payment information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Store;
