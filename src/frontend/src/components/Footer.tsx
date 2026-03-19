import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  const footerLinks = ["About", "Terms", "Privacy", "Support"];

  return (
    <footer className="relative z-10 mt-4 border-t border-border/50">
      <div className="max-w-[1600px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-bold neon-text text-sm">⚡ DMC</span>
          <span className="hidden sm:inline">Developer Mission Control</span>
        </div>

        <nav className="flex items-center gap-4 text-xs text-muted-foreground">
          {footerLinks.map((label) => (
            <span
              key={label}
              className="hover:text-primary transition-colors cursor-default"
            >
              {label}
            </span>
          ))}
        </nav>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          © {year}. Built with{" "}
          <Heart className="w-3 h-3 text-primary fill-primary" /> using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-text hover:underline font-semibold"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
