import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import martijnPhoto from "@assets/IMG_0610_1770844232329.jpg";
import ceciliaPhoto from "@assets/Screenshot_2026-04-02_at_7.53.21_AM_1775130804371.png";

const roleOptions = [
  "Land Manager",
  "Land Owner",
  "Logger",
  "Trucker",
  "Mill",
  "Certification Manager",
  "Something Else",
];

export default function TalkToExpert() {
  const [formData, setFormData] = useState({ role: "", name: "", email: "", phone: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", formData);
      toast({ title: "Request submitted!", description: "We'll get back to you within 24 hours." });
      setFormData({ role: "", name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-talk-to-expert">
      <Header />
      <main className="pt-16">
        <section className="min-h-[calc(100vh-4rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
            <div className="bg-neutral-100 dark:bg-neutral-900 px-6 sm:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-orange-600 bg-orange-100 dark:bg-orange-900/30 rounded-md mb-6">
                  PCT
                </span>
                <h1
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  data-testid="text-expert-title"
                >
                  Talk with an Expert
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Get answers for your operation, learn about integrations, or see a demo of the platform.
                </p>

                <div className="flex flex-col gap-3 mb-10 max-w-sm">
                  <div className="flex items-center gap-4 p-4 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={martijnPhoto}
                        alt="Martijn Craig Volman"
                        className="w-full h-full object-cover"
                        data-testid="img-expert-photo"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground" data-testid="text-expert-name">Martijn Craig Volman</div>
                      <div className="text-xs text-muted-foreground">Supply Chain & Implementation</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={ceciliaPhoto}
                        alt="Cecilia Graffin"
                        className="w-full h-full object-cover"
                        data-testid="img-expert-photo-cecilia"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground" data-testid="text-expert-name-cecilia">Cecilia Graffin</div>
                      <div className="text-xs text-muted-foreground">Project Manager</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3">What can I expect?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Get all your questions answered</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Get a pricing proposal (if desired)</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="bg-white dark:bg-neutral-950 px-6 sm:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2
                  className="text-2xl sm:text-3xl font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  data-testid="text-lets-chat"
                >
                  Let's Chat.
                </h2>
                <p className="text-sm text-muted-foreground mb-8 max-w-md">
                  We're happy to analyze your forestry tech stack if needed. We've seen it all. We want to serve your goals.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-lg" data-testid="form-expert">
                  <div className="space-y-2">
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger data-testid="select-role">
                        <SelectValue placeholder="What's your role in the supply-chain?" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role} data-testid={`select-option-${role.toLowerCase().replace(/\s+/g, "-")}`}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Input
                      id="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-expert-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="input-expert-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="input-expert-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      id="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      data-testid="input-expert-company"
                    />
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      id="message"
                      placeholder="Tell us briefly about your needs or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="resize-none"
                      data-testid="input-expert-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-auto bg-neutral-900 dark:bg-white dark:text-neutral-900 text-white font-semibold rounded-md px-8"
                    data-testid="button-submit-expert"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
