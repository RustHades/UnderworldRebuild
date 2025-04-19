import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { serverStats } from "@/lib/utils";

const JoinServer = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Underworld Rust Server</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect to our community and experience the best Rust gameplay with balanced rates, active admins, and regular events.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="steam://connect/underworldrust.com:28015" className="no-underline">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <i className="fas fa-server mr-2"></i>
                Connect via Steam
              </Button>
            </a>
            <a href="https://discord.gg/underworldrust" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button size="lg" variant="outline">
                <i className="fab fa-discord mr-2"></i>
                Join Discord
              </Button>
            </a>
          </div>
        </div>

        {/* Server stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serverStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-2">
                <CardTitle>
                  <i className={`${stat.icon} text-primary text-3xl mb-2`}></i>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">How to Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <span>Launch Rust</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Start by launching Rust from your Steam library. Make sure your game is updated to the latest version.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <span>Open Server Browser</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From the main menu, click on "Play Game" and then select "Servers" to open the server browser.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <span>Find Our Server</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Search for "Underworld Rust" in the search box, or click the "Connect via Steam" button above.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Server rules */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Server Rules</CardTitle>
              <CardDescription>
                Please read and follow our server rules to ensure a great experience for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>No hacking, cheating, or exploiting game mechanics</li>
                <li>No racist, homophobic, or discriminatory language</li>
                <li>No harassment or bullying of other players</li>
                <li>No advertising other servers in chat</li>
                <li>No foundation wiping during raids</li>
                <li>Respect base boundaries and avoid excessive griefing</li>
                <li>Max group size is 5 players</li>
                <li>Report bugs and exploits to admins</li>
              </ul>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Admins reserve the right to enforce these rules at their discretion. Violations may result in temporary or permanent bans.
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-muted-foreground mb-6">
            Join our Discord server to connect with other players, participate in events, and stay updated on server news.
          </p>
          <a href="steam://connect/underworldrust.com:28015" className="no-underline">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <i className="fas fa-server mr-2"></i>
              Connect Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinServer;