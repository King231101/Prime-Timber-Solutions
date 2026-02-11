import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { DashboardSidebar } from "./UserDashboard";
import type { TeamMember } from "@shared/schema";

const ROLES = [
  "Land Management",
  "Logger/Cutter",
  "Skidder/Forwarder",
  "Hauler",
  "Mill",
];

type WizardStep = "role" | "name" | "team";

export default function CompanySetup() {
  const [step, setStep] = useState<WizardStep>("role");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [teamFirstName, setTeamFirstName] = useState("");
  const [teamLastName, setTeamLastName] = useState("");
  const [teamPhone, setTeamPhone] = useState("");
  const [teamIsAdmin, setTeamIsAdmin] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/user/me", { credentials: "include" });
      if (!res.ok) {
        setLocation("/app-login");
        return;
      }
      setAuthChecked(true);
    } catch {
      setLocation("/app-login");
    }
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleRoleNext = () => {
    if (selectedRoles.length === 0) {
      toast({ title: "Please select at least one role", variant: "destructive" });
      return;
    }
    setStep("name");
  };

  const handleNameNext = async () => {
    if (!companyName.trim()) {
      toast({ title: "Please enter a company name", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/companies", {
        name: companyName,
        roles: selectedRoles,
      });
      const company = await res.json();
      setCompanyId(company.id);
      setStep("team");
    } catch (error: any) {
      toast({ title: "Error creating company", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!teamFirstName.trim() || !teamLastName.trim() || !teamPhone.trim()) {
      toast({ title: "Please fill in all team member fields", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", `/api/companies/${companyId}/team`, {
        firstName: teamFirstName,
        lastName: teamLastName,
        phone: teamPhone,
        isAdmin: teamIsAdmin,
      });
      const member = await res.json();
      setTeamMembers((prev) => [...prev, member]);
      setTeamFirstName("");
      setTeamLastName("");
      setTeamPhone("");
      setTeamIsAdmin(false);
      toast({ title: "Team member added" });
    } catch (error: any) {
      toast({ title: "Error adding team member", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    toast({ title: "Company setup complete!" });
    setLocation("/dashboard");
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <div className="w-8 h-8 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const stepIndex = step === "role" ? 0 : step === "name" ? 1 : 2;
  const steps = ["Role", "Name", "Team"];

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-900" data-testid="page-company-setup">
      <DashboardSidebar active="company" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-8">
            <div className="w-40 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <span className="text-sm font-bold text-neutral-900 dark:text-white">Company</span>
              </div>
              <div className="ml-3.5 border-l-2 border-neutral-300 dark:border-neutral-700 pl-6 space-y-3 pb-4">
                {steps.map((s, i) => (
                  <p
                    key={s}
                    className={`text-sm font-medium cursor-pointer ${
                      i === stepIndex ? "text-orange-500" : "text-neutral-500"
                    }`}
                    data-testid={`step-indicator-${s.toLowerCase()}`}
                  >
                    {s}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex-1">
              {step === "role" && (
                <Card className="p-8" data-testid="card-role-step">
                  <h2
                    className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    What roles does your company perform in the forest industry?
                  </h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    Please select which function(s) best align with what your company does. You may select more than one role.
                  </p>

                  <div className="space-y-4">
                    {ROLES.map((role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between gap-4"
                        data-testid={`role-option-${role.toLowerCase().replace(/[\s/]+/g, "-")}`}
                      >
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">{role}</span>
                        <Switch
                          checked={selectedRoles.includes(role)}
                          onCheckedChange={() => toggleRole(role)}
                          data-testid={`switch-role-${role.toLowerCase().replace(/[\s/]+/g, "-")}`}
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    className="mt-6 bg-neutral-400 text-white font-semibold"
                    onClick={handleRoleNext}
                    disabled={selectedRoles.length === 0}
                    data-testid="button-role-next"
                  >
                    Next
                  </Button>
                </Card>
              )}

              {step === "name" && (
                <Card className="p-8" data-testid="card-name-step">
                  <h2
                    className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Tell us some details about your company
                  </h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    Fill out the following information to get your company started.
                  </p>

                  <div className="mb-4">
                    <label className="text-sm font-bold text-neutral-900 dark:text-white mb-1 block">Name</label>
                    <Input
                      type="text"
                      placeholder="Company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600"
                      data-testid="input-company-name"
                    />
                  </div>

                  <Button
                    className="bg-neutral-400 text-white font-semibold"
                    onClick={handleNameNext}
                    disabled={isLoading || !companyName.trim()}
                    data-testid="button-name-next"
                  >
                    {isLoading ? "Creating..." : "Next"}
                  </Button>
                </Card>
              )}

              {step === "team" && (
                <Card className="p-8" data-testid="card-team-step">
                  <h2
                    className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Invite Your Team
                  </h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    Adding team members below will create them an account and text an invitation to download Prime Cut Timber. You can always add more team members later.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4 border border-neutral-200 dark:border-neutral-700 rounded-md p-4">
                      <div>
                        <label className="text-sm font-bold text-neutral-900 dark:text-white mb-1 block">First Name</label>
                        <Input
                          type="text"
                          value={teamFirstName}
                          onChange={(e) => setTeamFirstName(e.target.value)}
                          className="bg-white dark:bg-neutral-800"
                          data-testid="input-team-first-name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-neutral-900 dark:text-white mb-1 block">Last Name</label>
                        <Input
                          type="text"
                          value={teamLastName}
                          onChange={(e) => setTeamLastName(e.target.value)}
                          className="bg-white dark:bg-neutral-800"
                          data-testid="input-team-last-name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-neutral-900 dark:text-white mb-1 block">Phone Number</label>
                        <Input
                          type="tel"
                          value={teamPhone}
                          onChange={(e) => setTeamPhone(e.target.value)}
                          className="bg-white dark:bg-neutral-800"
                          data-testid="input-team-phone"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-neutral-900 dark:text-white">Is Admin?</span>
                        <Switch
                          checked={teamIsAdmin}
                          onCheckedChange={setTeamIsAdmin}
                          data-testid="switch-team-admin"
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="text-orange-500 border-orange-500 font-semibold"
                        onClick={handleAddMember}
                        disabled={isLoading}
                        data-testid="button-add-member"
                      >
                        {isLoading ? "Adding..." : "Add Team Member"}
                      </Button>
                    </div>

                    <div className="border border-neutral-200 dark:border-neutral-700 rounded-md p-4">
                      <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-3">Team Members</h4>
                      <div className="border-b border-neutral-200 dark:border-neutral-700 pb-2 mb-2">
                        <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-neutral-500 uppercase">
                          <span>Name</span>
                          <span>Phone Number</span>
                          <span>Is Admin</span>
                        </div>
                      </div>
                      {teamMembers.length === 0 ? (
                        <p className="text-sm text-neutral-400 py-4 text-center" data-testid="text-no-members">
                          No team members added yet. Use the form to add a team member.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {teamMembers.map((member) => (
                            <div
                              key={member.id}
                              className="grid grid-cols-3 gap-2 py-2 text-sm border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                              data-testid={`team-member-${member.id}`}
                            >
                              <span className="text-neutral-900 dark:text-white">{member.firstName} {member.lastName}</span>
                              <span className="text-neutral-600 dark:text-neutral-400">{member.phone}</span>
                              <span className="text-neutral-600 dark:text-neutral-400">{member.isAdmin ? "Yes" : "No"}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6 flex-wrap">
                    <Button
                      variant="default"
                      className="bg-orange-500 border-orange-500 text-white font-semibold"
                      onClick={handleFinish}
                      data-testid="button-invite-finish"
                    >
                      {teamMembers.length > 0 ? "Invite Team Members" : "Skip for Now"}
                    </Button>
                    {teamMembers.length === 0 && (
                      <button
                        className="text-sm text-orange-500 font-semibold"
                        onClick={handleFinish}
                        data-testid="button-skip"
                      >
                        Skip for Now
                      </button>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
