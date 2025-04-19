import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNav from "./mobile-nav";

const SiteHeader = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // For demo purposes - in real implementation this would come from useAuth hook
  const isLoggedIn = false;

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
            <div className="flex items-center gap-2 cursor-pointer">
              {/* You should replace this with your actual logo */}
              <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                <i className="fas fa-fire-alt text-primary"></i>
              </div>
              <span className="font-bold text-lg md:text-xl hidden md:block">UNDERWORLD RUST</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div 
                className={`cursor-pointer ${
                  location === link.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary transition-colors"
                }`}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </nav>
        
        {/* User Profile & Join Server Button */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/default.png" alt="User avatar" />
                    <AvatarFallback className="bg-primary/10 text-primary">UR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <div className="cursor-pointer flex items-center w-full">
                      <i className="fas fa-user mr-2"></i>
                      <span>Profile</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <div className="cursor-pointer flex items-center w-full">
                      <i className="fas fa-cog mr-2"></i>
                      <span>Settings</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/api/logout">
                    <div className="cursor-pointer flex items-center w-full text-red-500">
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      <span>Logout</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <div className="cursor-pointer">
                <Button variant="outline" size="sm">
                  <i className="fas fa-user mr-2"></i>
                  <span>Login</span>
                </Button>
              </div>
            </Link>
          )}
          
          <Link href="/join">
            <div className="cursor-pointer">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <i className="fas fa-server mr-2"></i>
                <span>Join Server</span>
              </Button>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default SiteHeader;
