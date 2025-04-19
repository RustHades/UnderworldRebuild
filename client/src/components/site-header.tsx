import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/utils";
import MobileNav from "./mobile-nav";

const SiteHeader = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <button 
            className="lg:hidden text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <Link href="/">
            <a className="flex items-center gap-2">
              {/* You should replace this with your actual logo */}
              <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                <i className="fas fa-fire-alt text-primary"></i>
              </div>
              <span className="font-bold text-lg md:text-xl hidden md:block">UNDERWORLD RUST</span>
            </a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a 
                className={
                  location === link.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary transition-colors"
                }
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>
        
        {/* Join Server Button */}
        <Link href="/join">
          <a>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <i className="fas fa-server mr-2"></i>
              <span>Join Server</span>
            </Button>
          </a>
        </Link>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default SiteHeader;
