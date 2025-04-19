import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [location] = useLocation();
  
  // Close mobile nav when location changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location, isOpen, onClose]);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-card w-64 h-full overflow-y-auto animate-in slide-in-from-left duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-primary">UNDERWORLD RUST</h2>
            <button 
              className="text-muted-foreground hover:text-foreground"
              onClick={onClose}
              aria-label="Close menu"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-4">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                    location === link.href
                      ? "bg-secondary text-primary"
                      : "hover:bg-secondary"
                  }`}>
                    <i className={`${getIconForLink(link.label)} text-primary`}></i>
                    <span>{link.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 mt-4">
          <Link href="/join">
            <a>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <i className="fas fa-server mr-2"></i>
                <span>Join Server</span>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper function to get icons for nav links
function getIconForLink(label: string): string {
  switch (label) {
    case "Home":
      return "fas fa-home";
    case "Discord":
      return "fab fa-discord";
    case "Changelog":
      return "fas fa-history";
    case "Gallery":
      return "fas fa-images";
    case "Store":
      return "fas fa-shopping-cart";
    case "Submit Skins":
      return "fas fa-tshirt";
    case "Contact":
      return "fas fa-envelope";
    default:
      return "fas fa-link";
  }
}

export default MobileNav;
