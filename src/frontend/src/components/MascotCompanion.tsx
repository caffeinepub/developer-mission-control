import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type MascotType = "cat" | "dog" | "fox" | "robot";

const MASCOTS: {
  type: MascotType;
  emoji: string;
  sleepEmoji: string;
  name: string;
  prefix: string;
}[] = [
  { type: "cat", emoji: "🐱", sleepEmoji: "😴", name: "Cat", prefix: "Meow~ " },
  { type: "dog", emoji: "🐶", sleepEmoji: "😴", name: "Dog", prefix: "Woof! " },
  { type: "fox", emoji: "🦊", sleepEmoji: "😴", name: "Fox", prefix: "Hey! " },
  {
    type: "robot",
    emoji: "🤖",
    sleepEmoji: "🔌",
    name: "Robot",
    prefix: "SYSTEM: ",
  },
];

function getMessages(
  dayNumber: number,
  completedToday: boolean,
  streak: number,
): string[] {
  const msgs: string[] = [];

  if (completedToday) {
    msgs.push("Daily questions done! You're on fire! 🔥");
    msgs.push("Mission complete for today! Rest up and come back stronger!");
  }

  if (streak >= 7) {
    msgs.push(`${streak}-day streak! You're unstoppable! 🔥`);
    msgs.push("Consistency is your superpower!");
  }

  if (dayNumber <= 10) {
    msgs.push(
      "You're just getting started! Easy problems first — build that foundation 🧱",
    );
    msgs.push("Consistency beats talent. Show up every day!");
    msgs.push("Read the problem twice before coding. Always!");
  } else if (dayNumber <= 40) {
    msgs.push("Moving to Medium problems soon! Keep solving!");
    msgs.push("Two-pointer and sliding window are your best friends now.");
    msgs.push(`You've done ${dayNumber} days! Keep that streak alive 🔥`);
  } else if (dayNumber <= 70) {
    msgs.push("Hard problems ahead — break them into smaller subproblems!");
    msgs.push("Dynamic Programming: think recursion first, then memoize.");
    msgs.push(
      "You're halfway there! The grind is real but so are the rewards.",
    );
  } else {
    msgs.push("You're in the elite zone now. Hard problems only! 💪");
    msgs.push("Think time complexity FIRST before writing any code.");
    msgs.push("Almost 100 days! Legendary status incoming 👑");
  }

  return msgs.length > 0 ? msgs : ["Keep grinding! Every line of code counts."];
}

interface Props {
  dayNumber: number;
  completedToday: boolean;
  streak: number;
}

export default function MascotCompanion({
  dayNumber,
  completedToday,
  streak,
}: Props) {
  const [mascot, setMascot] = useState<MascotType>(() => {
    try {
      const stored = localStorage.getItem("dmc-mascot");
      if (stored && ["cat", "dog", "fox", "robot"].includes(stored))
        return stored as MascotType;
    } catch {}
    return "cat";
  });

  const [isSleeping, setIsSleeping] = useState(() => {
    try {
      return localStorage.getItem("dmc-mascot-sleep") === "true";
    } catch {}
    return false;
  });

  const [isFirstTime] = useState(() => !localStorage.getItem("dmc-mascot"));
  const [showBubble, setShowBubble] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [wiggle, setWiggle] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Cursor following
  const posRef = useRef({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });
  const targetRef = useRef({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });
  const [pos, setPos] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wiggleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const messages = getMessages(dayNumber, completedToday, streak);
  const msgCount = messages.length;
  const currentMascot = MASCOTS.find((m) => m.type === mascot)!;

  // Track mouse
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isSleeping) {
        targetRef.current = { x: e.clientX + 16, y: e.clientY + 16 };
      }
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isSleeping]);

  // Lerp animation loop
  useEffect(() => {
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      const LERP = 0.08;
      const size = 64;
      const maxX = window.innerWidth - size;
      const maxY = window.innerHeight - size;

      let targetX = targetRef.current.x;
      let targetY = targetRef.current.y;

      if (isSleeping) {
        targetX = window.innerWidth - 88;
        targetY = window.innerHeight - 88;
      }

      const newX = Math.max(
        0,
        Math.min(maxX, lerp(posRef.current.x, targetX, LERP)),
      );
      const newY = Math.max(
        0,
        Math.min(maxY, lerp(posRef.current.y, targetY, LERP)),
      );

      posRef.current = { x: newX, y: newY };
      setPos({ x: newX, y: newY });
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isSleeping]);

  // Rotate messages every 8 seconds
  useEffect(() => {
    if (!showBubble) return;
    timerRef.current = setTimeout(() => {
      setMsgIndex((prev) => (prev + 1) % msgCount);
    }, 8000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: msgIndex needed to restart timer
  }, [showBubble, msgCount]);

  // Idle wiggle every 6 seconds
  useEffect(() => {
    wiggleTimerRef.current = setInterval(() => {
      if (!showBubble && !isSleeping) {
        setWiggle(true);
        setTimeout(() => setWiggle(false), 600);
      }
    }, 6000);
    return () => {
      if (wiggleTimerRef.current) clearInterval(wiggleTimerRef.current);
    };
  }, [showBubble, isSleeping]);

  function selectMascot(type: MascotType) {
    setMascot(type);
    localStorage.setItem("dmc-mascot", type);
    setShowSelector(false);
    setMsgIndex(0);
  }

  function toggleBubble() {
    setShowSelector(false);
    setShowBubble((prev) => !prev);
    setMsgIndex(0);
  }

  function setSleep(sleeping: boolean) {
    setIsSleeping(sleeping);
    localStorage.setItem("dmc-mascot-sleep", String(sleeping));
    if (sleeping) {
      setShowBubble(false);
      setShowSelector(false);
    }
  }

  const fullMessage = currentMascot.prefix + messages[msgIndex];

  // Bubble position: above and to the left of mascot
  const bubbleLeft = Math.max(0, pos.x - 200);
  const bubbleTop = Math.max(0, pos.y - 180);

  // Near-edge bounce scale
  const nearEdge =
    pos.x < 80 ||
    pos.x > window.innerWidth - 144 ||
    pos.y < 80 ||
    pos.y > window.innerHeight - 144;

  return (
    <>
      {/* Mascot selector panel */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[60] glass-card rounded-2xl p-4 w-52 shadow-xl border border-border/60"
            style={{
              left: Math.max(0, pos.x - 160),
              top: Math.max(0, pos.y - 220),
            }}
            data-ocid="mascot.dialog"
          >
            <p className="text-xs font-bold text-foreground mb-3">
              Choose your buddy
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MASCOTS.map((m) => (
                <button
                  type="button"
                  key={m.type}
                  onClick={() => selectMascot(m.type)}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all hover:scale-105 cursor-pointer ${
                    mascot === m.type
                      ? "border-primary bg-primary/10 shadow-[0_0_8px_var(--tw-shadow-color)] shadow-primary/30"
                      : "border-border/40 bg-muted/20 hover:border-primary/40"
                  }`}
                  data-ocid={`mascot.${m.type}.button`}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-[10px] font-medium text-foreground">
                    {m.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && !isSleeping && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed z-[60] glass-card rounded-2xl p-4 w-64 shadow-xl border border-primary/30"
            style={{ left: bubbleLeft, top: bubbleTop }}
            data-ocid="mascot.popover"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowBubble(false)}
              className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              data-ocid="mascot.close_button"
            >
              <span className="text-[10px] font-bold">✕</span>
            </button>

            <div className="flex items-start gap-2.5 mb-3">
              <span className="text-2xl shrink-0">{currentMascot.emoji}</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] leading-relaxed text-foreground pr-4"
                >
                  {fullMessage}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Message dots */}
            <div className="flex items-center gap-1 mb-2">
              {messages.map((msg, idx) => (
                <button
                  type="button"
                  key={msg.slice(0, 12)}
                  onClick={() => setMsgIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === msgIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowBubble(false);
                setShowSelector(true);
              }}
              className="text-[10px] text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
              data-ocid="mascot.edit_button"
            >
              Change buddy
            </button>

            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-8 w-4 h-2 overflow-hidden">
              <div className="w-3 h-3 bg-card border-r border-b border-primary/30 rotate-45 translate-y-[-6px] translate-x-[2px]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First-time tooltip */}
      <AnimatePresence>
        {isFirstTime && !showBubble && !showSelector && !isSleeping && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="fixed z-[60] glass-card rounded-xl px-3 py-2 text-[11px] text-foreground border border-primary/20 shadow-lg"
            style={{ left: Math.max(0, pos.x - 80), top: pos.y - 48 }}
          >
            Meet your buddy! 👋
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleeping ZZZ floaties */}
      <AnimatePresence>
        {isSleeping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-[60] pointer-events-none select-none"
            style={{ left: pos.x - 8, top: pos.y - 40 }}
          >
            <motion.span
              animate={{ y: [-4, -16, -4], opacity: [0.8, 0.3, 0.8] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0,
              }}
              className="absolute text-sm text-cyan-400 font-bold"
              style={{ left: 0, top: 0 }}
            >
              z
            </motion.span>
            <motion.span
              animate={{ y: [-4, -20, -4], opacity: [0.6, 0.2, 0.6] }}
              transition={{
                duration: 2.4,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.4,
              }}
              className="absolute text-base text-cyan-300 font-bold"
              style={{ left: 10, top: -8 }}
            >
              z
            </motion.span>
            <motion.span
              animate={{ y: [-4, -24, -4], opacity: [0.4, 0.1, 0.4] }}
              transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.8,
              }}
              className="absolute text-lg text-cyan-200 font-bold"
              style={{ left: 20, top: -18 }}
            >
              Z
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main mascot button — cursor following */}
      <motion.div
        className="fixed z-50"
        style={{
          left: pos.x,
          top: pos.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        data-ocid="mascot.panel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Settings icon — show on hover */}
        <AnimatePresence>
          {isHovered && !isSleeping && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                setShowBubble(false);
                setShowSelector((prev) => !prev);
              }}
              className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-muted/80 border border-border/60 flex items-center justify-center hover:bg-muted transition-colors z-10"
              data-ocid="mascot.open_modal_button"
            >
              <span className="text-[9px]">⚙</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Sleep / Wake button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSleep(!isSleeping)}
              className="absolute -top-1 -right-1 rounded-full bg-muted/80 border border-border/60 px-1.5 py-0.5 text-[9px] font-medium hover:bg-muted transition-colors z-10 whitespace-nowrap"
              data-ocid="mascot.toggle"
            >
              {isSleeping ? "Wake up" : "💤 Sleep"}
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={isSleeping ? undefined : toggleBubble}
          animate={
            wiggle
              ? { rotate: [0, -12, 12, -8, 8, 0], scale: [1, 1.05, 1] }
              : isSleeping
                ? { scale: [1, 1.04, 1] }
                : nearEdge
                  ? { scale: [1, 1.12, 0.92, 1] }
                  : showBubble
                    ? { scale: [1, 1.08, 0.95, 1] }
                    : { scale: 1, rotate: 0 }
          }
          transition={{
            duration: wiggle ? 0.5 : isSleeping ? 3 : nearEdge ? 0.3 : 0.3,
            repeat: isSleeping
              ? Number.POSITIVE_INFINITY
              : nearEdge
                ? 0
                : showBubble
                  ? Number.POSITIVE_INFINITY
                  : 0,
            repeatDelay: isSleeping ? 2 : 1.5,
          }}
          className={`w-14 h-14 rounded-full glass-card border-2 flex items-center justify-center transition-shadow cursor-pointer ${
            isSleeping
              ? "border-muted/40 shadow-[0_0_10px_var(--tw-shadow-color)] shadow-muted/20"
              : "border-primary/60 shadow-[0_0_16px_var(--tw-shadow-color)] shadow-primary/40 hover:shadow-primary/70"
          }`}
          style={{ fontSize: "1.75rem" }}
        >
          {isSleeping ? currentMascot.sleepEmoji : currentMascot.emoji}
        </motion.button>
      </motion.div>
    </>
  );
}
