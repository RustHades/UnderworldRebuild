import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { latestUpdates } from "@/lib/utils";

// Additional changelog entries for the full page
const allChangelogs = [
  ...latestUpdates,
  {
    title: "Plugin Updates",
    date: "April 15, 2023",
    description: "We've updated several plugins and added some new ones to enhance your gameplay experience.",
    changes: [
      "Updated ZLevels to the latest version with bug fixes",
      "Added new custom plugin for enhanced raiding events",
      "Fixed compatibility issues with other plugins"
    ],
    link: "/changelog/plugin-updates",
    type: "update"
  },
  {
    title: "Map Wipe and New Monument",
    date: "March 30, 2023",
    description: "The server has been wiped with a brand new map featuring custom monuments.",
    changes: [
      "Fresh map with optimized terrain",
      "Added new custom nuclear facility monument",
      "Increased resource spawn rates in desert biomes"
    ],
    link: "/changelog/march-wipe",
    type: "wipe"
  },
  {
    title: "Performance Improvements",
    date: "March 15, 2023",
    description: "We've made significant performance improvements to ensure smoother gameplay.",
    changes: [
      "Upgraded server hardware for better performance",
      "Optimized entity spawning to reduce lag",
      "Implemented better anti-cheat measures"
    ],
    link: "/changelog/performance-update",
    type: "update"
  }
];

const Changelog = () => {
  // Group changelogs by month/year
  const groupedChangelogs = allChangelogs.reduce((groups, update) => {
    const date = new Date(update.date);
    const monthYear = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    
    groups[monthYear].push(update);
    return groups;
  }, {} as Record<string, typeof allChangelogs>);
  
  // Sort keys by date (newest first)
  const sortedMonths = Object.keys(groupedChangelogs).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Server <span className="text-primary">Changelog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest changes, improvements, and updates to our Rust server
            </p>
          </div>
        </div>
      </section>
      
      {/* Changelog Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {sortedMonths.map((month, index) => (
              <AccordionItem key={index} value={month} className="border-b border-border">
                <AccordionTrigger className="text-xl font-bold py-4">
                  {month}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 py-2">
                    {groupedChangelogs[month].map((update, updateIndex) => (
                      <div key={updateIndex} className="bg-card rounded-lg overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-xl">{update.title}</h3>
                              {update.type === 'wipe' && (
                                <Badge className="bg-red-500 hover:bg-red-600">Wipe</Badge>
                              )}
                              {update.type === 'update' && (
                                <Badge className="bg-blue-500 hover:bg-blue-600">Update</Badge>
                              )}
                            </div>
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
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* Wipe Schedule Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Wipe Schedule</h2>
          <p className="text-muted-foreground mb-6">
            Our server follows a consistent wipe schedule to ensure fresh gameplay experiences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg">
              <div className="text-primary mb-4">
                <i className="fas fa-sync-alt text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Map Wipes</h3>
              <p className="text-muted-foreground">Every Thursday at 4 PM EST</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="text-primary mb-4">
                <i className="fas fa-database text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Blueprint Wipes</h3>
              <p className="text-muted-foreground">First Thursday of each month</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Changelog;
