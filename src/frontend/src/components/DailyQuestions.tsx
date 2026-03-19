import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  getDailyQuestions,
  getDifficultyLabel,
  getTodayKey,
} from "../data/questionPool";
import type { Question } from "../data/questionPool";

const PLATFORM_COLORS: Record<string, string> = {
  LeetCode: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Codeforces: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  CodeChef: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const DIFF_COLORS: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

const DIFF_LABEL_COLORS: Record<string, string> = {
  Beginner: "text-green-400",
  Novice: "text-teal-400",
  Intermediate: "text-yellow-400",
  Skilled: "text-orange-400",
  Advanced: "text-red-400",
  Expert: "text-purple-400",
  Elite: "text-pink-400",
};

interface Props {
  dayNumber: number;
}

export default function DailyQuestions({ dayNumber }: Props) {
  const [questions] = useState<Question[]>(() => getDailyQuestions(dayNumber));
  const [checked, setChecked] = useState<boolean[]>(() => {
    const key = getTodayKey();
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored) as boolean[];
    } catch {}
    return Array(5).fill(false);
  });

  useEffect(() => {
    localStorage.setItem(getTodayKey(), JSON.stringify(checked));
  }, [checked]);

  const completedCount = checked.filter(Boolean).length;
  const allDone = completedCount === 5;
  const diffLabel = getDifficultyLabel(dayNumber);

  // Difficulty track stages
  const stages = ["Easy", "Medium", "Hard"];
  const currentStage = dayNumber <= 15 ? 0 : dayNumber <= 65 ? 1 : 2;

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div className="glass-card rounded-2xl flex flex-col h-full min-h-[420px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground tracking-tight">
            Daily 5 Questions
          </h2>
          <p className="text-[10px] text-muted-foreground">
            AI-curated from LeetCode · Codeforces · CodeChef
          </p>
        </div>
        <div className="ml-auto flex flex-col items-end gap-0.5">
          <div className="text-[11px] text-muted-foreground font-medium">
            {today}
          </div>
          <div
            className={`text-[10px] font-bold ${DIFF_LABEL_COLORS[diffLabel] ?? "text-primary"}`}
          >
            Day {dayNumber} · {diffLabel}
          </div>
        </div>
      </div>

      {/* Difficulty progress track */}
      <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-border/30">
        <span className="text-[10px] text-muted-foreground mr-1">Path:</span>
        {stages.map((stage, idx) => (
          <div key={stage} className="flex items-center gap-1">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all ${
                idx === currentStage
                  ? "bg-primary/20 text-primary border-primary/40 shadow-[0_0_6px_var(--tw-shadow-color)] shadow-primary/30"
                  : idx < currentStage
                    ? "bg-muted/40 text-muted-foreground/50 border-border/30 line-through"
                    : "bg-muted/20 text-muted-foreground/40 border-border/20"
              }`}
            >
              {stage}
            </span>
            {idx < stages.length - 1 && (
              <span className="text-muted-foreground/30 text-[10px]">→</span>
            )}
          </div>
        ))}
        <Badge
          variant="outline"
          className="ml-auto text-[9px] h-4 px-1.5 border-primary/30 text-primary"
        >
          {diffLabel}
        </Badge>
      </div>

      {/* Questions list */}
      <div
        className="flex-1 px-4 py-3 space-y-2"
        data-ocid="daily_questions.list"
      >
        {questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
              checked[i]
                ? "bg-primary/5 border-primary/20 opacity-70"
                : "bg-muted/30 border-border/40 hover:border-primary/30"
            }`}
            data-ocid={`daily_questions.item.${i + 1}`}
          >
            <Checkbox
              id={`dq-${i}`}
              checked={checked[i]}
              onCheckedChange={() => toggle(i)}
              className="mt-0.5 shrink-0 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              data-ocid={`daily_questions.checkbox.${i + 1}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${
                    PLATFORM_COLORS[q.platform]
                  }`}
                >
                  {q.platform}
                </span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${
                    DIFF_COLORS[q.difficulty]
                  }`}
                >
                  {q.difficulty}
                </span>
                <span className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">
                  {q.topic}
                </span>
              </div>
              <a
                href={q.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-medium flex items-center gap-1 group w-fit ${
                  checked[i]
                    ? "line-through text-muted-foreground"
                    : "text-foreground hover:text-primary transition-colors"
                }`}
                data-ocid={`daily_questions.link.${i + 1}`}
              >
                {q.title}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer progress */}
      <div className="px-5 pb-4 pt-2 border-t border-border/50">
        {allDone ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-xs font-bold neon-text py-1"
            data-ocid="daily_questions.success_state"
          >
            All done! Great work today 🔥
          </motion.div>
        ) : (
          <div className="space-y-1.5" data-ocid="daily_questions.panel">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-semibold">
                {completedCount} / 5 completed
              </span>
            </div>
            <Progress
              value={(completedCount / 5) * 100}
              className="h-1.5 bg-muted/50 [&>div]:bg-primary [&>div]:transition-all"
            />
          </div>
        )}
      </div>
    </div>
  );
}
