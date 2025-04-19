import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Users,
  Layout,
  MessageSquare,
  Image,
  FileText,
  Server,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Skin, Contact } from "@shared/schema";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  const { data: skins } = useQuery<Skin[]>({
    queryKey: ["/api/skins"],
    enabled: !!user,
  });

  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    enabled: !!user,
  });
  
  const dashboardStats = [
    {
      title: "Users",
      value: "N/A",
      icon: <Users className="h-4 w-4 text-blue-500" />,
      description: "Total registered users",
    },
    {
      title: "Skin Submissions",
      value: skins?.length?.toString() || "0",
      icon: <Layout className="h-4 w-4 text-orange-500" />,
      description: "Total skin submissions",
    },
    {
      title: "Contact Messages",
      value: contacts?.length?.toString() || "0",
      icon: <MessageSquare className="h-4 w-4 text-green-500" />,
      description: "Total contact messages",
    },
    {
      title: "Gallery Images",
      value: "N/A",
      icon: <Image className="h-4 w-4 text-purple-500" />,
      description: "Total gallery images",
    },
    {
      title: "Changelog Entries",
      value: "N/A",
      icon: <FileText className="h-4 w-4 text-yellow-500" />,
      description: "Published changelog entries",
    },
    {
      title: "Game Servers",
      value: "N/A",
      icon: <Server className="h-4 w-4 text-red-500" />,
      description: "Active game servers",
    },
  ];
  
  const pendingItems = [
    {
      category: "Skin Submissions",
      count: skins?.filter(skin => skin.status === "pending").length || 0,
      icon: <Layout className="h-4 w-4 text-orange-500" />,
    },
    {
      category: "Contact Messages",
      count: contacts?.filter(contact => !contact.isResolved).length || 0,
      icon: <MessageSquare className="h-4 w-4 text-green-500" />,
    },
    {
      category: "Gallery Approvals",
      count: 0,
      icon: <Image className="h-4 w-4 text-purple-500" />,
    },
  ];
  
  // Filter out items with zero count
  const filteredPendingItems = pendingItems.filter(item => item.count > 0);
  
  return (
    <AdminLayout
      title="Admin Dashboard"
      description="Overview of your website statistics and pending items"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Pending Items Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Pending Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPendingItems.length > 0 ? (
              <div className="space-y-4">
                {filteredPendingItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-500 px-2 py-1 text-xs font-medium">
                        {item.count} pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-500 mb-2">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-2 text-sm font-medium">All Caught Up!</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  There are no pending items that require your attention.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Activity Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500 mb-2">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="mt-2 text-sm font-medium">Activity Will Appear Here</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Recent system activities will be displayed in this section.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}