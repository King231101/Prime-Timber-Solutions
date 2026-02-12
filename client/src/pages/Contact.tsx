import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
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
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email Us",
      lines: ["support@primecuttimber.com", "sales@primecuttimber.com"],
      testId: "card-email",
    },
    {
      icon: MapPin,
      title: "Main Office",
      lines: ["Lakeshore Center", "Suite 111", "600 Lakeshore Drive,", "Houghton, MI 49931"],
      testId: "card-office",
    },
    {
      icon: MapPin,
      title: "Mailing Address",
      lines: ["40709 Lower Pike Rd,", "Chassell, MI 49916"],
      testId: "card-mailing",
    },
    {
      icon: Phone,
      title: "24/7 Phone Support",
      lines: ["Phone: (407) 813-5384"],
      testId: "card-phone",
    },
    {
      icon: Clock,
      title: "Office Hours",
      lines: ["Mon to Fri: 9am-", "5pm EST"],
      testId: "card-hours",
    },
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1 text-xs font-semibold tracking-wider uppercase border border-neutral-300 dark:border-neutral-600 rounded-md mb-4 text-foreground" data-testid="badge-pct">
                PCT
              </span>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                data-testid="text-contact-title"
              >
                Contact Us
              </h1>
              <p className="text-lg font-medium text-orange-500" data-testid="text-contact-subtitle">
                24/7 Customer Support
              </p>
            </motion.div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {contactCards.map((card, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-md p-5 flex flex-col"
                  data-testid={card.testId}
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{card.title}</h3>
                  <div className="flex-1">
                    {card.lines.map((line, i) => (
                      <p key={i} className="text-xs text-muted-foreground leading-relaxed">{line}</p>
                    ))}
                  </div>
                  <div className="mt-4 self-end">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-neutral-100 dark:bg-neutral-900 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
              >
                <span className="inline-block w-fit px-3 py-1 text-xs font-semibold tracking-wider uppercase text-orange-600 border border-orange-300 dark:border-orange-700 rounded-md mb-6" data-testid="badge-contact-us">
                  CONTACT US
                </span>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  data-testid="text-help-heading"
                >
                  We are always ready to help you and answer your questions
                </h2>
                <p className="text-sm text-muted-foreground max-w-md" data-testid="text-help-description">
                  If you need immediate assistance or are experiencing server downtime, please call us directly at (407) 813-5384.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-neutral-950 rounded-md border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8">
                  <h3
                    className="text-xl font-bold text-foreground mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    data-testid="text-form-title"
                  >
                    Send a message to PCT
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6">
                    Your email address will not be published. Required fields are marked *
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
                    <div>
                      <Input
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
                        data-testid="input-contact-email"
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
                        data-testid="input-contact-phone"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 resize-none"
                        data-testid="input-contact-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-orange-500 text-white font-semibold rounded-md px-8"
                      data-testid="button-submit-contact"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
