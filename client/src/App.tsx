import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Home from "@/pages/home";
import Discord from "@/pages/discord";
import Gallery from "@/pages/gallery";
import Changelog from "@/pages/changelog";
import Store from "@/pages/store";
import SubmitSkins from "@/pages/submit-skins";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/discord" component={Discord} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/changelog" component={Changelog} />
      <Route path="/store" component={Store} />
      <Route path="/submit-skins" component={SubmitSkins} />
      <Route path="/contact" component={Contact} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1">
            <Router />
          </main>
          <SiteFooter />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
