import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Header />
      <main className="pt-16">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/forest-bg.png)" }} />
          <div className="absolute inset-0 bg-neutral-900/85" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-semibold tracking-wider uppercase text-orange-400 mb-3 block">Contact Us</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }} data-testid="text-contact-title">
                Talk to an Expert
              </h1>
              <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
                Ready to digitize your forestry operations? Get in touch and we'll show you how PCT can transform your supply chain.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get in Touch</h2>
                <Card className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required data-testid="input-contact-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required data-testid="input-contact-email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Your company name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} data-testid="input-contact-company" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us about your operation and how we can help..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="min-h-[120px] resize-none" required data-testid="input-contact-message" />
                    </div>
                    <Button type="submit" className="w-full bg-orange-600 border-orange-600 text-white font-semibold" data-testid="button-submit-contact">
                      Send Message
                    </Button>
                  </form>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1">Phone</h3>
                      <a href="tel:+19062815000" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors" data-testid="link-phone">(906) 281-5000</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1">Email</h3>
                      <span className="text-sm text-muted-foreground" data-testid="text-email">info@primecuttimber.com</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1">Office</h3>
                      <span className="text-sm text-muted-foreground" data-testid="text-address">Upper Peninsula, Michigan</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <img src="/images/field-worker.png" alt="Forestry professional using PCT" className="w-full rounded-md object-cover h-64" />
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
