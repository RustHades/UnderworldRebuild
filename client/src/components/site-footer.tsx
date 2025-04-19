import React, { useState } from "react";
import { Link } from "wouter";
import { navigationLinks } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SiteFooter = () => {
  const [copied, setCopied] = useState(false);
  const serverIP = "play.underworldrust.com";
  
  const copyServerIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <footer className="bg-background pt-12 pb-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Underworld Rust</h3>
            <p className="text-muted-foreground mb-4">
              Join our thriving Rust community for an enhanced survival experience with custom features and active administration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-discord text-lg"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-steam text-lg"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <i className="fab fa-youtube text-lg"></i>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigationLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rules">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Server Rules</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Support</a>
                </Link>
              </li>
              <li>
                <Link href="/submit-skins">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Submit Skins</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="bg-card p-4 rounded-lg mb-4">
              <p className="text-muted-foreground mb-2">Server IP:</p>
              <div className="flex">
                <Input 
                  type="text" 
                  value={serverIP}
                  readOnly
                  className="rounded-r-none bg-secondary text-foreground"
                />
                <Button 
                  className={`rounded-l-none ${copied ? 'bg-green-600' : 'bg-primary'}`}
                  onClick={copyServerIP}
                >
                  <i className={`${copied ? 'fas fa-check' : 'fas fa-copy'}`}></i>
                </Button>
              </div>
            </div>
            <Link href="/join">
              <a>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <i className="fas fa-server mr-2"></i>
                  <span>Connect Now</span>
                </Button>
              </a>
            </Link>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">© 2023 Underworld Rust. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy">
              <a className="text-muted-foreground hover:text-muted-foreground/80 text-sm transition-colors">
                Privacy Policy
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-muted-foreground hover:text-muted-foreground/80 text-sm transition-colors">
                Terms of Service
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
