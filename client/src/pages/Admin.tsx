import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, LayoutDashboard, Users, FileText, Settings, BarChart3, MessageSquare } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface UserWithCompanies {
  id: string;
  phone: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  unitPreference: string | null;
  isRegistered: boolean | null;
  createdAt: string | null;
  companies: {
    id: string;
    name: string;
    roles: string[] | null;
  }[];
}

interface ContactRequestItem {
  id: string;
  role: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  createdAt: string | null;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState<UserWithCompanies[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequestItem[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "contacts">("users");
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/me", { credentials: "include" });
      if (res.ok) {
        setIsAuthed(true);
        loadUsers();
        loadContactRequests();
      } else {
        setLocation("/login");
      }
    } catch {
      setLocation("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch("/api/admin/users", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setRegisteredUsers(data);
      }
    } catch {
    } finally {
      setUsersLoading(false);
    }
  };

  const loadContactRequests = async () => {
    try {
      const res = await fetch("/api/admin/contact-requests", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setContactRequests(data);
      }
    } catch {
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

  const registeredCount = registeredUsers.filter(u => u.isRegistered).length;

  const stats = [
    { label: "Active Harvest Areas", value: "847", icon: BarChart3 },
    { label: "Digital Tickets Today", value: "2,341", icon: FileText },
    { label: "Registered Users", value: String(registeredCount), icon: Users },
    { label: "Contact Requests", value: String(contactRequests.length), icon: MessageSquare },
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

        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
            data-testid="tab-users"
          >
            <Users className="w-4 h-4 mr-2" />
            Users ({registeredCount})
          </Button>
          <Button
            variant={activeTab === "contacts" ? "default" : "outline"}
            onClick={() => setActiveTab("contacts")}
            data-testid="tab-contacts"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Requests ({contactRequests.length})
          </Button>
        </div>

        {activeTab === "users" && (
          <Card className="p-6 mb-8" data-testid="card-registered-users">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Registered Users
              </h3>
              <Button variant="outline" onClick={loadUsers} disabled={usersLoading} data-testid="button-refresh-users">
                {usersLoading ? "Loading..." : "Refresh"}
              </Button>
            </div>

            {registeredUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center" data-testid="text-no-users">
                No registered users yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="table-users">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Phone</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">DOB</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Registered</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Companies</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Roles</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                        data-testid={`user-row-${user.id}`}
                      >
                        <td className="py-3 px-2 font-medium text-foreground">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : "\u2014"}
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">{user.phone}</td>
                        <td className="py-3 px-2 text-muted-foreground">{user.dateOfBirth || "\u2014"}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${
                            user.isRegistered
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                          }`}>
                            {user.isRegistered ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">
                          {user.companies.length > 0
                            ? user.companies.map(c => c.name).join(", ")
                            : "\u2014"}
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">
                          {user.companies.length > 0
                            ? user.companies.flatMap(c => c.roles || []).join(", ") || "\u2014"
                            : "\u2014"}
                        </td>
                        <td className="py-3 px-2 text-muted-foreground text-xs">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "\u2014"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {activeTab === "contacts" && (
          <Card className="p-6 mb-8" data-testid="card-contact-requests">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Contact Form Submissions
              </h3>
              <Button variant="outline" onClick={loadContactRequests} data-testid="button-refresh-contacts">
                Refresh
              </Button>
            </div>

            {contactRequests.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center" data-testid="text-no-contacts">
                No contact requests yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="table-contacts">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Email</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Phone</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Company</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Role</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Message</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                        data-testid={`contact-row-${req.id}`}
                      >
                        <td className="py-3 px-2 font-medium text-foreground">{req.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">
                          <a href={`mailto:${req.email}`} className="text-orange-500 hover:underline">{req.email}</a>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">{req.phone || "\u2014"}</td>
                        <td className="py-3 px-2 text-muted-foreground">{req.company || "\u2014"}</td>
                        <td className="py-3 px-2 text-muted-foreground">{req.role || "\u2014"}</td>
                        <td className="py-3 px-2 text-muted-foreground text-xs max-w-[200px] truncate">{req.message || "\u2014"}</td>
                        <td className="py-3 px-2 text-muted-foreground text-xs">
                          {req.createdAt
                            ? new Date(req.createdAt).toLocaleDateString()
                            : "\u2014"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6" data-testid="card-recent-activity">
            <h3 className="text-base font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { text: "New harvest area created \u2014 Sector 14B", time: "2 min ago" },
                { text: "Load #4521 delivered to Northern Pine Mill", time: "15 min ago" },
                { text: "Scale ticket verified \u2014 Load #4518", time: "32 min ago" },
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
