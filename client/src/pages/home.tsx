import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import NavigationCard from "@/components/ui/navigation-card";
import { 
  navigationCards, 
  serverFeatures, 
  serverStats,
  latestUpdates,
  galleryImages
} from "@/lib/utils";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-background/90 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 z-0">
          {/* This would be your hero background image */}
          <div className="w-full h-full bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              WELCOME TO <span className="text-primary">UNDERWORLD RUST</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Join our thriving community of Rust players and experience the ultimate survival adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <a>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                    <i className="fas fa-server mr-2"></i>
                    <span>Join Our Server</span>
                  </Button>
                </a>
              </Link>
              <Link href="/discord">
                <a>
                  <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white w-full sm:w-auto">
                    <i className="fab fa-discord mr-2"></i>
                    <span>Join Discord</span>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Server Stats Section */}
      <section className="bg-secondary py-6 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serverStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-3">
                <div className="text-primary mb-1">
                  <i className={`${stat.icon} text-2xl`}></i>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Navigation</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-10"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card, index) => (
              <NavigationCard
                key={index}
                href={card.href}
                title={card.title}
                description={card.description}
                icon={card.icon}
                borderColor={card.borderColor}
                hoverColor={card.hoverColor}
                iconColor={card.iconColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Server Features</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {serverFeatures.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg">
                <div className="text-primary mb-4">
                  <i className={`${feature.icon} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/features">
              <a className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                <span>View All Features</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Latest Updates</h2>
              <div className="w-24 h-1 bg-primary"></div>
            </div>
            <Link href="/changelog">
              <a className="mt-4 md:mt-0 inline-flex items-center text-primary hover:text-primary/80 font-medium">
                <span>View All Updates</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </Link>
          </div>
          
          {latestUpdates.map((update, index) => (
            <div key={index} className="mb-6 bg-card rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">{update.title}</h3>
                  <span className="text-sm text-muted-foreground">{update.date}</span>
                </div>
                <p className="text-muted-foreground mb-4">{update.description}</p>
                <div className="space-y-2">
                  {update.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-1"></i>
                      <p className="text-muted-foreground">{change}</p>
                    </div>
                  ))}
                </div>
                <Link href={update.link}>
                  <a className="mt-4 inline-flex items-center text-primary hover:text-primary/80 font-medium">
                    <span>Read More</span>
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Server Gallery</h2>
              <div className="w-24 h-1 bg-primary"></div>
            </div>
            <Link href="/gallery">
              <a className="mt-4 md:mt-0 inline-flex items-center text-primary hover:text-primary/80 font-medium">
                <span>View Full Gallery</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <Link key={image.id} href={`/gallery/${image.id}`}>
                <a className="block overflow-hidden rounded-lg hover:opacity-90 transition-opacity">
                  <div className="w-full h-48 bg-card flex items-center justify-center">
                    <i className="fas fa-image text-4xl text-muted-foreground"></i>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-background/95 z-10"></div>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-card/50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Join the Adventure?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Connect to our server today and become part of our growing community of Rust players.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <a>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                    <i className="fas fa-server mr-2"></i>
                    <span>Join Server</span>
                  </Button>
                </a>
              </Link>
              <Link href="/discord">
                <a>
                  <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white w-full sm:w-auto">
                    <i className="fab fa-discord mr-2"></i>
                    <span>Join Discord</span>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
