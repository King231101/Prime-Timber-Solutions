import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, LayoutDashboard, Users, FileText, Settings, BarChart3 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/me", { credentials: "include" });
      if (res.ok) {
        setIsAuthed(true);
      } else {
        setLocation("/login");
      }
    } catch {
      setLocation("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/admin/logout");
      toast({ title: "Logged out", description: "You have been logged out." });
      setLocation("/login");
    } catch {
      setLocation("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthed) return null;

  const stats = [
    { label: "Active Harvest Areas", value: "847", icon: BarChart3 },
    { label: "Digital Tickets Today", value: "2,341", icon: FileText },
    { label: "Active Users", value: "1,208", icon: Users },
    { label: "Uptime", value: "99.9%", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900" data-testid="page-admin">
      <header className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <span className="text-xl font-extrabold text-orange-600 cursor-pointer" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  PRIME CUT TIMBER
                </span>
              </Link>
              <span className="text-[9px] font-bold tracking-widest text-orange-500/70 bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-md border border-orange-200 dark:border-orange-800/40">
                PCT
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">Admin</span>
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="w-5 h-5 text-orange-500" />
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }} data-testid="text-admin-title">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Welcome to the Prime Cut Timber administration panel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={stat.label} className="p-6" data-testid={`card-stat-${i}`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {stat.value}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6" data-testid="card-recent-activity">
            <h3 className="text-base font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { text: "New harvest area created — Sector 14B", time: "2 min ago" },
                { text: "Load #4521 delivered to Northern Pine Mill", time: "15 min ago" },
                { text: "Scale ticket verified — Load #4518", time: "32 min ago" },
                { text: "Rowlee Farms Trucking joined harvest #892", time: "1 hr ago" },
                { text: "Compliance report generated for FSC audit", time: "2 hrs ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                  <span className="text-sm text-foreground">{item.text}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6" data-testid="card-quick-actions">
            <h3 className="text-base font-bold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Manage Users", icon: Users },
                { label: "View Reports", icon: FileText },
                { label: "Analytics", icon: BarChart3 },
                { label: "Settings", icon: Settings },
              ].map((action) => (
                <Card key={action.label} className="p-4 text-center cursor-pointer hover-elevate" data-testid={`action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <action.icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
