import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Camera, Check, Flame, Moon, Sun, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Theme } from "../App";
import type { Profile } from "../hooks/useProfile";

interface HeaderProps {
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  progressPct: number;
  checkedCount: number;
  profile: Profile;
  onProfileChange: (p: Profile) => void;
}

function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="hidden md:flex flex-col items-end" data-ocid="clock.panel">
      <span className="text-[10px] text-muted-foreground leading-tight">
        {dateStr}
      </span>
      <span className="text-sm font-mono font-bold neon-text leading-tight tracking-widest">
        {timeStr}
      </span>
    </div>
  );
}

interface ProfilePopoverProps {
  profile: Profile;
  onSave: (p: Profile) => void;
}

function ProfilePopover({ profile, onSave }: ProfilePopoverProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(profile.name);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(
    profile.avatarDataUrl,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  // Sync when profile changes externally
  useEffect(() => {
    setName(profile.name);
    setAvatarDataUrl(profile.avatarDataUrl);
  }, [profile]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!name.trim()) return;
    onSave({ name: name.trim(), avatarDataUrl });
    setOpen(false);
  }

  const initials = profile.name ? profile.name[0].toUpperCase() : "D";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-8 h-8 rounded-full border-2 border-primary/50 bg-primary/20 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-all neon-glow"
          data-ocid="header.avatar.open_modal_button"
          title="Edit Profile"
        >
          {profile.avatarDataUrl ? (
            <img
              src={profile.avatarDataUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-bold neon-text">{initials}</span>
          )}
        </motion.button>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 glass-card border border-primary/20 p-4"
        align="end"
        data-ocid="header.profile.popover"
      >
        <p className="text-xs font-bold text-foreground mb-4 neon-text tracking-wide uppercase">
          Edit Profile
        </p>

        {/* Avatar upload */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative w-16 h-16 rounded-full border-2 border-primary/50 bg-primary/10 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-primary transition-all"
            data-ocid="header.profile.upload_button"
          >
            {avatarDataUrl ? (
              <img
                src={avatarDataUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold neon-text">
                {name ? name[0].toUpperCase() : "?"}
              </span>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-[10px] text-muted-foreground">
            Click to change photo
          </p>
        </div>

        {/* Name field */}
        <div className="space-y-1.5 mb-4">
          <Label className="text-[11px] font-semibold text-foreground">
            Display Name
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8 text-xs bg-muted/40 border-border/50 focus-visible:ring-primary/40"
            placeholder="Your name"
            data-ocid="header.profile.input"
          />
        </div>

        <Button
          size="sm"
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90"
          data-ocid="header.profile.save_button"
        >
          <Check className="w-3.5 h-3.5" />
          Save Changes
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default function Header({
  theme,
  onThemeChange,
  progressPct,
  checkedCount,
  profile,
  onProfileChange,
}: HeaderProps) {
  const themes: { key: Theme; label: string; icon: React.ReactNode }[] = [
    { key: "dark", label: "Dark", icon: <Moon className="w-3.5 h-3.5" /> },
    { key: "light", label: "Light", icon: <Sun className="w-3.5 h-3.5" /> },
    { key: "dare", label: "Dare", icon: <Flame className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-1 z-40 px-4 pt-3 pb-2">
      <div className="glass-card rounded-2xl max-w-[1600px] mx-auto px-4 py-3 flex items-center gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center neon-glow">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-sm text-foreground hidden sm:block leading-tight">
            Developer
            <br />
            <span className="neon-text text-xs font-semibold">
              Mission Control
            </span>
          </span>
        </div>

        <div className="flex-1" />

        {/* Progress indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">
            <span className="neon-text font-bold">{checkedCount}</span>/100 days
          </span>
          <div className="w-24 h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="neon-text font-bold">{progressPct}%</span>
        </div>

        {/* Welcome name */}
        {profile.name && (
          <span className="hidden lg:block text-xs text-muted-foreground">
            Hey,{" "}
            <span className="text-foreground font-semibold">
              {profile.name}
            </span>{" "}
            👋
          </span>
        )}

        {/* Live Clock */}
        <LiveClock />

        {/* Theme switcher */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl bg-muted/30 border border-border"
          data-ocid="theme.toggle"
        >
          {themes.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onThemeChange(key)}
              data-ocid={`theme.${key}.button`}
              title={`${label} mode`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                theme === key
                  ? "bg-primary text-primary-foreground neon-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Profile Avatar + Popover */}
        <ProfilePopover profile={profile} onSave={onProfileChange} />
      </div>
    </header>
  );
}
