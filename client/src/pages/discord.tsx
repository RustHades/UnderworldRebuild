import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Discord = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our <span className="text-primary">Discord</span> Community
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with other players, stay updated on server events, and get support from our admins.
            </p>
            <a 
              href="https://discord.gg/ZMsbaBNexV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                <i className="fab fa-discord mr-2"></i>
                <span>Join Our Discord Server</span>
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Discord Benefits Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Community Benefits</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <i className="fas fa-bullhorn text-primary"></i>
                  Server Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay updated with the latest server news, wipe schedules, and upcoming events.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <i className="fas fa-users text-primary"></i>
                  Find Teammates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with other players to form alliances, create clans, and dominate the server together.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <i className="fas fa-life-ring text-primary"></i>
                  Live Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get help directly from our admin team for any issues you encounter on the server.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <i className="fas fa-gift text-primary"></i>
                  Exclusive Giveaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Participate in Discord-exclusive events and giveaways for in-game items and rewards.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <i className="fas fa-code text-primary"></i>
                  Bot Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access server information, check online players, and view your stats with custom bot commands.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <i className="fas fa-comments text-primary"></i>
                  Voice Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Communicate with your team in real-time through dedicated voice channels for better coordination.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Community Rules Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Community Rules</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-10"></div>
          
          <div className="max-w-3xl mx-auto bg-card p-6 rounded-lg">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Respect All Members</h3>
                  <p className="text-muted-foreground text-sm">
                    Treat everyone with respect. Harassment, hate speech, and discrimination will not be tolerated.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">No Spam or Self-Promotion</h3>
                  <p className="text-muted-foreground text-sm">
                    Do not spam channels with repetitive messages or advertise other servers without permission.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Keep Content Appropriate</h3>
                  <p className="text-muted-foreground text-sm">
                    No NSFW content, gore, or any material that violates Discord's Terms of Service.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Use Channels Correctly</h3>
                  <p className="text-muted-foreground text-sm">
                    Post messages in the appropriate channels as indicated by their descriptions.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="text-primary mt-1">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Admin Decisions Are Final</h3>
                  <p className="text-muted-foreground text-sm">
                    Respect the decisions made by the admin team. If you have concerns, address them privately.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Our community is waiting for you. Join our Discord server now and become part of the Underworld Rust family.
          </p>
          <a 
            href="https://discord.gg/ZMsbaBNexV" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
              <i className="fab fa-discord mr-2"></i>
              <span>Join Discord</span>
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Discord;
