import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Link2, Plus, Trash2, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Contest {
  platform: "LeetCode" | "Codeforces" | "CodeChef";
  name: string;
  date: string;
  time: string;
  registerUrl: string;
}

interface ProfileLink {
  id: string;
  label: string;
  url: string;
}

const PLATFORM_STYLES: Record<string, { badge: string; dot: string }> = {
  LeetCode: {
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    dot: "bg-orange-400",
  },
  Codeforces: {
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    dot: "bg-blue-400",
  },
  CodeChef: {
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    dot: "bg-amber-400",
  },
};

const UPCOMING_CONTESTS: Contest[] = [
  {
    platform: "CodeChef",
    name: "Starters 185",
    date: "Mar 18, 2026",
    time: "8:00 PM IST",
    registerUrl: "https://www.codechef.com/START185",
  },
  {
    platform: "Codeforces",
    name: "Round 1000 (Div. 2)",
    date: "Mar 19, 2026",
    time: "7:35 PM IST",
    registerUrl: "https://codeforces.com/contests",
  },
  {
    platform: "LeetCode",
    name: "Biweekly Contest 155",
    date: "Mar 21, 2026",
    time: "8:00 PM IST",
    registerUrl: "https://leetcode.com/contest",
  },
  {
    platform: "Codeforces",
    name: "Round 1001 (Div. 1+2)",
    date: "Mar 21, 2026",
    time: "10:05 PM IST",
    registerUrl: "https://codeforces.com/contests",
  },
  {
    platform: "LeetCode",
    name: "Weekly Contest 442",
    date: "Mar 22, 2026",
    time: "8:00 AM IST",
    registerUrl: "https://leetcode.com/contest",
  },
  {
    platform: "CodeChef",
    name: "Starters 186",
    date: "Mar 25, 2026",
    time: "8:00 PM IST",
    registerUrl: "https://www.codechef.com/START186",
  },
  {
    platform: "Codeforces",
    name: "Educational Round 180",
    date: "Mar 28, 2026",
    time: "7:35 PM IST",
    registerUrl: "https://codeforces.com/contests",
  },
  {
    platform: "LeetCode",
    name: "Weekly Contest 443",
    date: "Mar 29, 2026",
    time: "8:00 AM IST",
    registerUrl: "https://leetcode.com/contest",
  },
];

function getDaysLeft(dateStr: string): number {
  const contestDate = new Date(dateStr);
  contestDate.setHours(23, 59, 59, 999);
  const now = new Date();
  return Math.ceil(
    (contestDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function DaysLeftBadge({ dateStr }: { dateStr: string }) {
  const days = getDaysLeft(dateStr);
  let label: string;
  let cls: string;

  if (days <= 0) {
    label = "TODAY";
    cls = "bg-green-500/20 text-green-300 border-green-500/30";
  } else if (days === 1) {
    label = "TOMORROW";
    cls = "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  } else if (days <= 6) {
    label = `${days} days`;
    cls = "bg-primary/20 text-primary border-primary/30";
  } else {
    label = `${days} days`;
    cls = "bg-muted/30 text-muted-foreground border-border";
  }

  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded-md border font-semibold ${cls}`}
    >
      {label}
    </span>
  );
}

export default function ContestFeed() {
  const [profileLinks, setProfileLinks] = useLocalStorage<ProfileLink[]>(
    "dmc-profiles",
    [
      { id: "1", label: "LeetCode", url: "https://leetcode.com/u/yourhandle" },
      {
        id: "2",
        label: "Codeforces",
        url: "https://codeforces.com/profile/yourhandle",
      },
      {
        id: "3",
        label: "CodeChef",
        url: "https://www.codechef.com/users/yourhandle",
      },
    ],
  );
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  function addLink() {
    if (!newLabel.trim() || !newUrl.trim()) {
      toast.error("Please enter both label and URL");
      return;
    }
    let url = newUrl.trim();
    if (!url.startsWith("http")) url = `https://${url}`;
    setProfileLinks((prev) => [
      ...prev,
      { id: Date.now().toString(), label: newLabel.trim(), url },
    ]);
    setNewLabel("");
    setNewUrl("");
    toast.success("Profile link added!");
  }

  function removeLink(id: string) {
    setProfileLinks((prev) => prev.filter((l) => l.id !== id));
    toast.success("Link removed");
  }

  return (
    <>
      {/* Contest Feed Card */}
      <div className="glass-card rounded-2xl p-4" data-ocid="contests.panel">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-primary" />
          <h2 className="text-base font-bold text-foreground">
            Live Contest Feed
          </h2>
          <span className="ml-auto">
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-medium animate-pulse-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              LIVE
            </span>
          </span>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {UPCOMING_CONTESTS.map((contest, i) => {
            const styles = PLATFORM_STYLES[contest.platform];
            return (
              <motion.div
                key={`${contest.platform}-${contest.name}`}
                data-ocid={`contests.item.${i + 1}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20 border border-border hover:border-primary/25 hover:bg-primary/5 transition-all duration-200 group"
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${styles.dot}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md border font-semibold ${styles.badge}`}
                    >
                      {contest.platform}
                    </span>
                    <span className="text-xs font-medium text-foreground truncate">
                      {contest.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {contest.date} &bull; {contest.time}
                  </div>
                  <div className="mt-1">
                    <DaysLeftBadge dateStr={contest.date} />
                  </div>
                </div>
                <a
                  href={contest.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`contests.link.${i + 1}`}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Register"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-primary" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Profile Link Manager Card */}
      <div className="glass-card rounded-2xl p-4" data-ocid="profiles.panel">
        <div className="flex items-center gap-2 mb-4">
          <Link2 className="w-4 h-4 text-primary" />
          <h2 className="text-base font-bold text-foreground">Profile Links</h2>
        </div>

        {/* Add form */}
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Label (e.g. GitHub)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            data-ocid="profiles.input"
            onKeyDown={(e) => e.key === "Enter" && addLink()}
            className="h-8 text-xs bg-muted/30 border-border focus:border-primary/50"
          />
          <Input
            placeholder="https://..."
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            data-ocid="profiles.input"
            onKeyDown={(e) => e.key === "Enter" && addLink()}
            className="h-8 text-xs bg-muted/30 border-border focus:border-primary/50"
          />
          <Button
            size="sm"
            onClick={addLink}
            data-ocid="profiles.add_button"
            className="h-8 px-2.5 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 neon-glow"
            variant="outline"
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Links list */}
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          <AnimatePresence>
            {profileLinks.length === 0 && (
              <div
                className="text-xs text-muted-foreground text-center py-4"
                data-ocid="profiles.empty_state"
              >
                No profile links yet. Add your coding profiles above.
              </div>
            )}
            {profileLinks.map((link, i) => (
              <motion.div
                key={link.id}
                data-ocid={`profiles.item.${i + 1}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 border border-border hover:border-primary/30 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`profiles.link.${i + 1}`}
                  className="flex-1 min-w-0"
                >
                  <div className="text-xs font-semibold text-foreground">
                    {link.label}
                  </div>
                  <div className="text-[10px] text-primary truncate hover:underline">
                    {link.url}
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => removeLink(link.id)}
                  data-ocid={`profiles.delete_button.${i + 1}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  title="Remove link"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
