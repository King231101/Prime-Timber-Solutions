import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Edit2, LogOut } from "lucide-react";
import { DashboardSidebar } from "./UserDashboard";
import type { AppUser, Company } from "@shared/schema";

export default function UserProfile() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userRes, companiesRes] = await Promise.all([
        fetch("/api/user/me", { credentials: "include" }),
        fetch("/api/companies", { credentials: "include" }),
      ]);

      if (!userRes.ok) {
        setLocation("/app-login");
        return;
      }

      const userData = await userRes.json();
      setUser(userData);

      if (companiesRes.ok) {
        const companiesData = await companiesRes.json();
        setCompanies(companiesData);
      }
    } catch {
      setLocation("/app-login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/user/logout");
      toast({ title: "Logged out" });
      setLocation("/app-login");
    } catch {
      setLocation("/app-login");
    }
  };

  const handleUnitToggle = async (unit: string) => {
    try {
      const res = await apiRequest("PATCH", "/api/user/me", { unitPreference: unit });
      const updated = await res.json();
      setUser(updated);
    } catch {
      toast({ title: "Error updating preference", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <div className="w-8 h-8 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-900" data-testid="page-profile">
      <DashboardSidebar active="profile" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <button
              className="text-sm text-neutral-500 font-medium"
              onClick={() => setLocation("/dashboard")}
              data-testid="link-back-dashboard"
            >
              Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="p-6 text-center relative" data-testid="card-profile-info">
                <button
                  className="absolute top-4 right-4 text-neutral-400"
                  data-testid="button-edit-profile"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>

                <h2
                  className="text-xl font-bold text-neutral-900 dark:text-white mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  data-testid="text-profile-name"
                >
                  {user.firstName} {user.lastName}
                </h2>

                <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span data-testid="text-profile-phone">{user.phone}</span>
                </div>

                <Button
                  variant="default"
                  className="bg-orange-500 border-orange-500 text-white font-semibold"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6" data-testid="card-my-companies">
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    My Companies
                  </h3>
                  <Button
                    variant="default"
                    className="bg-orange-500 border-orange-500 text-white font-semibold"
                    onClick={() => setLocation("/dashboard/company")}
                    data-testid="button-create-company"
                  >
                    + Create New Company
                  </Button>
                </div>
                {companies.length === 0 ? (
                  <p className="text-sm text-neutral-500 py-4">No companies yet. Create one to get started.</p>
                ) : (
                  <div className="space-y-2">
                    {companies.map((company) => (
                      <div
                        key={company.id}
                        className="flex items-center justify-between gap-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md"
                        data-testid={`company-item-${company.id}`}
                      >
                        <div>
                          <p className="font-medium text-sm text-neutral-900 dark:text-white">{company.name}</p>
                          <p className="text-xs text-neutral-500">
                            {company.roles && company.roles.length > 0 ? company.roles.join(", ") : "No roles assigned"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="p-6" data-testid="card-preferences">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  My Preferences
                </h3>
                <div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Unit System</p>
                  <div className="inline-flex rounded-md overflow-visible border border-neutral-200 dark:border-neutral-700">
                    <button
                      className={`px-6 py-2 text-sm font-semibold transition-colors ${
                        user.unitPreference === "imperial"
                          ? "bg-orange-500 text-white"
                          : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      }`}
                      onClick={() => handleUnitToggle("imperial")}
                      data-testid="button-imperial"
                    >
                      Imperial
                    </button>
                    <button
                      className={`px-6 py-2 text-sm font-semibold transition-colors ${
                        user.unitPreference === "metric"
                          ? "bg-orange-500 text-white"
                          : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      }`}
                      onClick={() => handleUnitToggle("metric")}
                      data-testid="button-metric"
                    >
                      Metric
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
