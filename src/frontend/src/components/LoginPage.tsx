import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Rocket, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import type { Profile } from "../hooks/useProfile";

interface LoginPageProps {
  onComplete: (profile: Profile) => void;
}

const PARTICLES = [
  { id: "p1", left: "15%", top: "20%", duration: 3, delay: 0 },
  { id: "p2", left: "29%", top: "45%", duration: 3.5, delay: 0.4 },
  { id: "p3", left: "43%", top: "70%", duration: 4, delay: 0.8 },
  { id: "p4", left: "57%", top: "20%", duration: 4.5, delay: 1.2 },
  { id: "p5", left: "71%", top: "45%", duration: 5, delay: 1.6 },
  { id: "p6", left: "85%", top: "70%", duration: 5.5, delay: 2.0 },
];

export default function LoginPage({ onComplete }: LoginPageProps) {
  const [name, setName] = useState("");
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onComplete({ name: name.trim(), avatarDataUrl });
  }

  const initials = name.trim() ? name.trim()[0].toUpperCase() : "?";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 font-inter">
      {/* Background grid */}
      <div className="bg-grid-overlay" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: p.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-card rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 neon-glow mb-4"
            >
              <Zap className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Developer
            </h1>
            <p className="text-sm font-bold neon-text tracking-widest uppercase mt-0.5">
              Mission Control
            </p>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Set up your profile to launch your coding mission.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar upload */}
            <div className="flex flex-col items-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileRef.current?.click()}
                className="relative w-20 h-20 rounded-full border-2 border-primary/50 bg-primary/10 flex items-center justify-center overflow-hidden group cursor-pointer neon-glow transition-all hover:border-primary"
                data-ocid="login.upload_button"
              >
                {avatarDataUrl ? (
                  <img
                    src={avatarDataUrl}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold neon-text">
                    {initials}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </motion.button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <p className="text-[10px] text-muted-foreground">
                Click to upload profile picture (optional)
              </p>
            </div>

            {/* Name input */}
            <div className="space-y-2">
              <Label
                htmlFor="display-name"
                className="text-xs font-semibold text-foreground"
              >
                Display Name <span className="text-primary">*</span>
              </Label>
              <Input
                id="display-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name, coder..."
                className="bg-muted/40 border-border/50 h-10 text-sm focus-visible:ring-primary/40"
                autoFocus
                data-ocid="login.input"
              />
            </div>

            {/* Launch button */}
            <motion.div
              whileHover={name.trim() ? { scale: 1.02 } : {}}
              whileTap={name.trim() ? { scale: 0.98 } : {}}
            >
              <Button
                type="submit"
                disabled={!name.trim()}
                className="w-full h-11 text-sm font-bold gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 neon-glow"
                data-ocid="login.submit_button"
              >
                <Rocket className="w-4 h-4" />
                Launch Mission 🚀
              </Button>
            </motion.div>
          </form>

          {/* Decoration */}
          <div className="mt-6 pt-4 border-t border-border/30 text-center">
            <p className="text-[10px] text-muted-foreground">
              Your data stays local — no account required
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
