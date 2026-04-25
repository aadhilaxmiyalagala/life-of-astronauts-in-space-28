import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100, "Max 100 characters"),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000, "Max 1000 characters"),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSent(true);
    toast({
      title: "Transmission received 🛰️",
      description: "Your message is on its way to mission control.",
    });
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-12 animate-fade-in-up text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">06 — Contact</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Send a <span className="text-aurora">transmission</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Questions, ideas, or just want to say hi from Earth? Drop us a signal.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="glass-strong rounded-3xl p-6 sm:p-10 shadow-cosmic space-y-5"
          noValidate
        >
          <div>
            <Label htmlFor="name" className="text-sm uppercase tracking-wider text-foreground/60">
              Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className="mt-2 bg-background/50 border-foreground/15 focus:border-primary rounded-xl"
              placeholder="Commander Reed"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm uppercase tracking-wider text-foreground/60">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="mt-2 bg-background/50 border-foreground/15 focus:border-primary rounded-xl"
              placeholder="you@earth.com"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="message" className="text-sm uppercase tracking-wider text-foreground/60">
              Message
            </Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              rows={5}
              className="mt-2 bg-background/50 border-foreground/15 focus:border-primary rounded-xl resize-none"
              placeholder="Tell us what's on your mind..."
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            <p className="text-xs text-foreground/40 mt-1 text-right">{form.message.length}/1000</p>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={sent}
            className="w-full rounded-full bg-gradient-aurora text-primary-foreground hover:opacity-90 glow-primary transition-all"
          >
            {sent ? (
              <>
                <CheckCircle2 className="mr-2 w-4 h-4" /> Transmission Sent
              </>
            ) : (
              <>
                <Send className="mr-2 w-4 h-4" /> Send Transmission
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-foreground/40 mt-8">
          © {new Date().getFullYear()} Antigravity — A journey through life in space.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
