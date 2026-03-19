import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AIChatBox from "./AIChatBox";

// Waypoints for the drifting animation (relative offsets from start position)
const WAYPOINTS_X = [0, 30, -20, 40, -35, 15, -10, 25, -40, 0];
const WAYPOINTS_Y = [0, -25, -45, -15, -50, -30, -60, -20, -35, 0];

export default function FloatingAIBubble() {
  const [open, setOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear drift timer on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, []);

  return (
    <>
      {/* Floating bubble */}
      <motion.div
        className="fixed z-50"
        style={{
          bottom: "96px",
          right: "24px",
          x,
          y,
        }}
        animate={{
          x: WAYPOINTS_X,
          y: WAYPOINTS_Y,
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
          times: WAYPOINTS_X.map((_, i) => i / (WAYPOINTS_X.length - 1)),
        }}
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen((v) => !v)}
          data-ocid="floating_ai.open_modal_button"
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-2xl neon-glow cursor-pointer border-2 border-primary/60 hover:border-primary transition-all"
          title="AI Assistant"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="w-6 h-6 text-primary-foreground" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Bot className="w-6 h-6 text-primary-foreground" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Slide-up panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="ai-panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed z-50 bottom-44 right-6 w-[380px] h-[500px] flex flex-col"
            data-ocid="floating_ai.panel"
          >
            <div className="glass-card rounded-2xl flex flex-col h-full overflow-hidden border border-primary/20 shadow-2xl neon-glow">
              {/* Panel header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-primary/5">
                <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    AI Assistant
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    Tips & Problem Solver
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    className="h-6 w-6 p-0 hover:bg-muted/50"
                    data-ocid="floating_ai.close_button"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Embedded AIChatBox content (tabs only, no header) */}
              <div className="flex-1 overflow-hidden">
                <AIChatBox />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
