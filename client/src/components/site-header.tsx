import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { navigationLinks, adminNavigationLinks, hasPermission } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNav from "./mobile-nav";
import { useAuth } from "@/hooks/use-auth";

const SiteHeader = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  
  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (!user || !user.displayName) return "UR";
    const nameParts = user.displayName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
  };
  
  // Handle logout
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logoutMutation.mutateAsync();
  };

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
          {/* Regular navigation links */}
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
          
          {/* Admin links - only show if user has proper role */}
          {user && user.role && adminNavigationLinks.some(link => 
            hasPermission(user.role, link.requiredRole)
          ) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <i className="fas fa-shield-alt"></i>
                  <span>Admin</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {adminNavigationLinks
                  .filter(link => hasPermission(user.role, link.requiredRole))
                  .map(link => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>
                        <div className="cursor-pointer flex items-center w-full">
                          <i className={`${getIconForAdminLink(link.label)} mr-2`}></i>
                          <span>{link.label}</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
        
        {/* User Profile & Join Server Button */}
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={user.avatarUrl || undefined} 
                      alt={`${user.displayName || user.username}'s avatar`} 
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="px-2 py-1.5 text-sm font-medium">
                  <div className="text-muted-foreground text-xs">Signed in as</div>
                  <div className="text-foreground">{user.displayName || user.username}</div>
                </div>
                <DropdownMenuSeparator />
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
                  <a href="#" onClick={handleLogout}>
                    <div className="cursor-pointer flex items-center w-full text-red-500">
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      <span>Logout</span>
                    </div>
                  </a>
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

// Helper function to get icons for admin links
function getIconForAdminLink(label: string): string {
  switch (label) {
    case "Admin Dashboard":
      return "fas fa-tachometer-alt";
    case "Manage Users":
      return "fas fa-users-cog";
    case "Skin Submissions":
      return "fas fa-tshirt";
    case "Contact Requests":
      return "fas fa-envelope";
    case "Store Management":
      return "fas fa-shopping-cart";
    case "Content Editor":
      return "fas fa-edit";
    default:
      return "fas fa-cog";
  }
}

export default SiteHeader;
