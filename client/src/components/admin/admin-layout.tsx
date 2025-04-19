import { FC, ReactNode } from "react";
import { useLocation, Link, useRoute } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, hasPermission } from "@/lib/utils";
import { adminNavigationLinks } from "@/lib/utils";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import {
  AlertCircle,
  CheckCircle2,
  PanelLeftOpen,
  PanelLeftClose,
  LayoutDashboard,
  Settings,
  LogOut,
  User,
  Users,
  FileText,
  MessageCircle,
  Image as ImageIcon,
  Link as LinkIcon,
  Server,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const AdminLayout: FC<AdminLayoutProps> = ({
  children,
  title,
  description,
}) => {
  const { user, logoutMutation } = useAuth();
  const [location, navigate] = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  if (!user) {
    navigate("/auth");
    return null;
  }
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/auth");
      },
    });
  };
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Check if user has access to the admin section
  if (!hasPermission(user.role, "admin")) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-6">You don't have permission to access the admin area.</p>
            <Button onClick={() => navigate("/")} className="w-full">
              Return to Home
            </Button>
          </Card>
        </div>
        <SiteFooter />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-muted/50 border-r border-border flex flex-col transition-all duration-300",
            sidebarCollapsed ? "w-16" : "w-64"
          )}
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                <h2 className="font-semibold">Admin Panel</h2>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex-1 py-4">
            <nav className="space-y-1 px-2">
              {adminNavigationLinks.map((link) => {
                const [isActive] = useRoute(link.href);
                
                // Check if user has permission to see this link
                if (link.requiredRole && !hasPermission(user.role, link.requiredRole)) {
                  return null;
                }
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted",
                      "group"
                    )}
                  >
                    {link.icon && (
                      <span className="mr-3">
                        {renderIcon(link.icon)}
                      </span>
                    )}
                    {!sidebarCollapsed && <span>{link.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">
                    {user.displayName || user.username}
                  </h3>
                  <p className="text-xs text-foreground/70 truncate">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && <p className="text-foreground/70 mt-1">{description}</p>}
            </div>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;