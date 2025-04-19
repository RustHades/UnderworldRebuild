import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { navigationLinks } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [location] = useLocation();
  // For demo purposes - in real implementation this would come from useAuth hook
  const isLoggedIn = false;
  
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
        
        {/* User profile section */}
        {isLoggedIn ? (
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/avatars/default.png" alt="User avatar" />
                <AvatarFallback className="bg-primary/10 text-primary">UR</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">username</div>
                <div className="text-sm text-muted-foreground">user@example.com</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-border">
            <Link href="/auth">
              <div className="flex items-center gap-2 cursor-pointer">
                <i className="fas fa-sign-in-alt text-primary"></i>
                <span className="font-medium">Login / Register</span>
              </div>
            </Link>
          </div>
        )}
        
        {/* Main navigation */}
        <div className="p-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">NAVIGATION</div>
          <nav>
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div className={`flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer ${
                      location === link.href
                        ? "bg-secondary text-primary"
                        : "hover:bg-secondary"
                    }`}>
                      <i className={`${getIconForLink(link.label)} text-primary`}></i>
                      <span>{link.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Account settings for logged in users */}
        {isLoggedIn && (
          <div className="p-4 border-t border-border">
            <div className="text-sm font-medium text-muted-foreground mb-2">ACCOUNT</div>
            <nav>
              <ul className="space-y-1">
                <li>
                  <Link href="/profile">
                    <div className="flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer hover:bg-secondary">
                      <i className="fas fa-user text-primary"></i>
                      <span>Profile</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/settings">
                    <div className="flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer hover:bg-secondary">
                      <i className="fas fa-cog text-primary"></i>
                      <span>Settings</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/api/logout">
                    <div className="flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer hover:bg-secondary text-red-500">
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
        
        {/* Join server button */}
        <div className="p-4 mt-4">
          <Link href="/join">
            <div className="cursor-pointer">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <i className="fas fa-server mr-2"></i>
                <span>Join Server</span>
              </Button>
            </div>
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
