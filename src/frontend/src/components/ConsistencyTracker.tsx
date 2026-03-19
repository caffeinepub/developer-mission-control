import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ConsistencyTrackerProps {
  checkedDays: boolean[];
  onToggle: (i: number) => void;
}

export default function ConsistencyTracker({
  checkedDays,
  onToggle,
}: ConsistencyTrackerProps) {
  const checkedCount = checkedDays.filter(Boolean).length;
  const progressPct = Math.round((checkedCount / 100) * 100);

  const streakCount = (() => {
    let streak = 0;
    for (let i = checkedDays.length - 1; i >= 0; i--) {
      if (checkedDays[i]) streak++;
      else break;
    }
    return streak;
  })();

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col h-full"
      data-ocid="consistency.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-primary" />
          <h2 className="text-base font-bold text-foreground">
            100 Days Tracker
          </h2>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              data-ocid="consistency.open_modal_button"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              title="Reset tracker"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent data-ocid="consistency.dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Reset 100-Day Tracker?</AlertDialogTitle>
              <AlertDialogDescription>
                This will uncheck all 100 days. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="consistency.cancel_button">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                data-ocid="consistency.confirm_button"
                onClick={() => {
                  for (let i = 0; i < 100; i++) {
                    if (checkedDays[i]) onToggle(i);
                  }
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Reset All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 rounded-xl bg-muted/20 border border-border">
          <div className="text-xl font-extrabold neon-text">{checkedCount}</div>
          <div className="text-[10px] text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-2 rounded-xl bg-muted/20 border border-border">
          <div className="text-xl font-extrabold neon-text">
            {100 - checkedCount}
          </div>
          <div className="text-[10px] text-muted-foreground">Remaining</div>
        </div>
        <div className="text-center p-2 rounded-xl bg-muted/20 border border-border">
          <div className="text-xl font-extrabold neon-text">{streakCount}</div>
          <div className="text-[10px] text-muted-foreground">Streak 🔥</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
          <span>Progress</span>
          <span className="neon-text font-bold">{progressPct}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary progress-bar-glow"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* 100 Day Grid */}
      <div
        className="grid gap-1.5 flex-1"
        style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
        data-ocid="consistency.table"
      >
        {checkedDays.map((checked, i) => (
          <motion.button
            key={`day-${i + 1}`}
            type="button"
            data-ocid={`consistency.item.${i + 1}`}
            onClick={() => onToggle(i)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title={`Day ${i + 1}${checked ? " ✓" : ""}`}
            className={`aspect-square rounded-md text-[9px] font-bold border transition-all duration-200 cursor-pointer ${
              checked
                ? "bg-primary/80 border-primary neon-glow text-primary-foreground"
                : "bg-muted/25 border-border hover:border-primary/40 hover:bg-primary/10 text-muted-foreground"
            }`}
          >
            <AnimatePresence mode="wait">
              {checked ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="block text-center"
                >
                  ✓
                </motion.span>
              ) : (
                <motion.span
                  key="num"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="block text-center"
                >
                  {i + 1}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Motivational message */}
      <div className="mt-4 text-center">
        {checkedCount === 0 && (
          <p className="text-xs text-muted-foreground">
            Start your journey — click Day 1! 🚀
          </p>
        )}
        {checkedCount > 0 && checkedCount < 50 && (
          <p className="text-xs text-muted-foreground">
            Keep going! {50 - checkedCount} days to the halfway mark 💪
          </p>
        )}
        {checkedCount >= 50 && checkedCount < 100 && (
          <p className="text-xs neon-text font-semibold">
            Over halfway! {100 - checkedCount} days to glory 🔥
          </p>
        )}
        {checkedCount === 100 && (
          <p className="text-xs neon-text font-bold animate-pulse-glow">
            🎉 MISSION COMPLETE! You&apos;re a legend!
          </p>
        )}
      </div>
    </div>
  );
}
