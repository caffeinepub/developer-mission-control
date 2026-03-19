import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Circle,
  Clock,
  GripVertical,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Category = "DSA" | "Dev" | "Core CS" | "Break" | "";

interface TimeSlot {
  time: string;
  checked: boolean;
  task: string;
  category: Category;
}

const CATEGORY_COLORS: Record<Category, string> = {
  DSA: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Dev: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Core CS": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Break: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "": "bg-muted/30 text-muted-foreground border-border",
};

const DEFAULT_SLOTS: TimeSlot[] = [
  {
    time: "6:00 AM",
    checked: false,
    task: "Morning warm-up: LeetCode Easy",
    category: "DSA",
  },
  {
    time: "7:00 AM",
    checked: false,
    task: "Array & Strings problems",
    category: "DSA",
  },
  {
    time: "8:00 AM",
    checked: false,
    task: "Breakfast break",
    category: "Break",
  },
  {
    time: "9:00 AM",
    checked: false,
    task: "React project — feature development",
    category: "Dev",
  },
  {
    time: "10:00 AM",
    checked: false,
    task: "System design concepts",
    category: "Core CS",
  },
  {
    time: "11:00 AM",
    checked: false,
    task: "Dynamic programming practice",
    category: "DSA",
  },
  { time: "12:00 PM", checked: false, task: "Lunch break", category: "Break" },
  {
    time: "1:00 PM",
    checked: false,
    task: "Backend API development",
    category: "Dev",
  },
  {
    time: "2:00 PM",
    checked: false,
    task: "OS — Process & Threads",
    category: "Core CS",
  },
  {
    time: "3:00 PM",
    checked: false,
    task: "Trees & Graphs LeetCode",
    category: "DSA",
  },
  {
    time: "4:00 PM",
    checked: false,
    task: "TypeScript deep dive",
    category: "Dev",
  },
  {
    time: "5:00 PM",
    checked: false,
    task: "Short break / walk",
    category: "Break",
  },
  {
    time: "6:00 PM",
    checked: false,
    task: "DBMS — Indexing & Transactions",
    category: "Core CS",
  },
  {
    time: "7:00 PM",
    checked: false,
    task: "Full stack mini-project",
    category: "Dev",
  },
  {
    time: "8:00 PM",
    checked: false,
    task: "Contest prep — Mock test",
    category: "DSA",
  },
  {
    time: "9:00 PM",
    checked: false,
    task: "Computer Networks review",
    category: "Core CS",
  },
  {
    time: "10:00 PM",
    checked: false,
    task: "Daily review & planning",
    category: "Dev",
  },
  {
    time: "11:00 PM",
    checked: false,
    task: "Wind down — read/notes",
    category: "Break",
  },
];

// Task pools for AI generator
const TASK_POOLS: Record<"DSA" | "Dev" | "Core CS", string[]> = {
  DSA: [
    "Two Pointers — LeetCode Medium",
    "Binary Search problems",
    "Dynamic Programming — Knapsack variants",
    "Graph BFS/DFS traversal",
    "Sliding Window technique",
    "Heap & Priority Queue problems",
    "Trie implementation & problems",
    "Backtracking — N-Queens, Sudoku",
    "Segment Tree / Fenwick Tree",
    "String algorithms — KMP, Z-function",
  ],
  Dev: [
    "React hooks deep dive",
    "REST API design & implementation",
    "TypeScript generics & advanced types",
    "Docker & containerisation",
    "CI/CD pipeline setup",
    "State management with Zustand/Redux",
    "Next.js SSR & App Router",
    "Unit testing with Vitest",
    "GraphQL schema & resolvers",
    "Web performance optimisation",
  ],
  "Core CS": [
    "OS — Virtual Memory & Paging",
    "DBMS — Query optimisation",
    "Computer Networks — TCP/IP stack",
    "Distributed Systems concepts",
    "OS — Deadlocks & Synchronisation",
    "DBMS — Normalisation & ACID",
    "Networks — HTTP/2 & QUIC",
    "Concurrency patterns",
    "System design — Load balancer",
    "Compiler design basics",
  ],
};

function formatHour(hour: number): string {
  if (hour === 0 || hour === 24) return "12:00 AM";
  if (hour < 12) return `${hour}:00 AM`;
  if (hour === 12) return "12:00 PM";
  return `${hour - 12}:00 PM`;
}

function generateSchedule({
  wakeUp,
  studyHours,
  dsaPct,
  devPct,
  corePct,
  breakFreq,
  goal,
}: {
  wakeUp: string;
  studyHours: number;
  dsaPct: number;
  devPct: number;
  corePct: number;
  breakFreq: string;
  goal: string;
}): TimeSlot[] {
  const [hStr, mStr] = wakeUp.split(":");
  const startHour = Number.parseInt(hStr, 10);
  const startMin = Number.parseInt(mStr || "0", 10);
  const startHourAdj = startMin >= 30 ? startHour + 1 : startHour;

  const slots: TimeSlot[] = [];

  // Prepend goal slot
  if (goal.trim()) {
    slots.push({
      time: formatHour(startHourAdj),
      checked: false,
      task: `🎯 Goal: ${goal.trim()}`,
      category: "DSA",
    });
  }

  const total = dsaPct + devPct + corePct;
  const dsaNorm = total > 0 ? dsaPct / total : 0.4;
  const devNorm = total > 0 ? devPct / total : 0.4;

  const dsaSlots = Math.round(studyHours * dsaNorm);
  const devSlots = Math.round(studyHours * devNorm);
  const coreSlots = studyHours - dsaSlots - devSlots;

  const taskQueue: Array<{
    task: string;
    category: "DSA" | "Dev" | "Core CS";
  }> = [];
  for (let i = 0; i < dsaSlots; i++) {
    taskQueue.push({
      task: TASK_POOLS.DSA[i % TASK_POOLS.DSA.length],
      category: "DSA",
    });
  }
  for (let i = 0; i < devSlots; i++) {
    taskQueue.push({
      task: TASK_POOLS.Dev[i % TASK_POOLS.Dev.length],
      category: "Dev",
    });
  }
  for (let i = 0; i < Math.max(0, coreSlots); i++) {
    taskQueue.push({
      task: TASK_POOLS["Core CS"][i % TASK_POOLS["Core CS"].length],
      category: "Core CS",
    });
  }

  // Shuffle for variety
  for (let i = taskQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [taskQueue[i], taskQueue[j]] = [taskQueue[j], taskQueue[i]];
  }

  let hour = startHourAdj + (goal.trim() ? 1 : 0);
  const breakInterval =
    breakFreq === "Every 2 hours" ? 2 : breakFreq === "Every 3 hours" ? 3 : 0;
  let workCount = 0;

  for (const item of taskQueue) {
    if (hour >= 24) break;
    slots.push({
      time: formatHour(hour),
      checked: false,
      task: item.task,
      category: item.category,
    });
    workCount++;
    hour++;

    if (breakInterval > 0 && workCount % breakInterval === 0) {
      if (hour < 24) {
        slots.push({
          time: formatHour(hour),
          checked: false,
          task: "☕ Break — stretch & hydrate",
          category: "Break",
        });
        hour++;
      }
    }
  }

  return slots;
}

export default function CodingTimetable() {
  const [slots, setSlots] = useLocalStorage<TimeSlot[]>(
    "dmc-timetable",
    DEFAULT_SLOTS,
  );
  const [editMode, setEditMode] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const dragIndex = useRef<number | null>(null);

  // AI form state
  const [wakeUp, setWakeUp] = useState("06:00");
  const [studyHours, setStudyHours] = useState(8);
  const [dsaPct, setDsaPct] = useState(40);
  const [devPct, setDevPct] = useState(40);
  const [corePct, setCorePct] = useState(20);
  const [breakFreq, setBreakFreq] = useState("Every 2 hours");
  const [goal, setGoal] = useState("");

  const completedCount = slots.filter((s) => s.checked).length;

  function toggleSlot(i: number) {
    setSlots((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], checked: !next[i].checked };
      return next;
    });
  }

  function updateTask(i: number, task: string) {
    setSlots((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], task };
      return next;
    });
  }

  function updateCategory(i: number, category: Category) {
    setSlots((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], category };
      return next;
    });
  }

  function deleteSlot(i: number) {
    setSlots((prev) => prev.filter((_, idx) => idx !== i));
  }

  function addSlot() {
    const lastTime =
      slots.length > 0 ? slots[slots.length - 1].time : "6:00 AM";
    setSlots((prev) => [
      ...prev,
      { time: lastTime, checked: false, task: "", category: "" },
    ]);
  }

  function handleDragStart(i: number) {
    dragIndex.current = i;
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === i) return;
    setSlots((prev) => {
      const next = [...prev];
      const dragged = next.splice(dragIndex.current!, 1)[0];
      next.splice(i, 0, dragged);
      dragIndex.current = i;
      return next;
    });
  }

  function handleDragEnd() {
    dragIndex.current = null;
  }

  function handleGenerate() {
    const generated = generateSchedule({
      wakeUp,
      studyHours,
      dsaPct,
      devPct,
      corePct,
      breakFreq,
      goal,
    });
    setSlots(generated);
    setAiOpen(false);
    setGoal("");
  }

  return (
    <div
      className={`glass-card rounded-2xl p-4 h-full flex flex-col transition-all duration-300 ${
        editMode
          ? "border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
          : ""
      }`}
      data-ocid="timetable.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="w-4 h-4 text-primary flex-shrink-0" />
          <h2 className="text-base font-bold text-foreground truncate">
            Coding Timetable
          </h2>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs font-mono neon-text">
            {completedCount}/{slots.length}
          </span>

          {/* AI Generate button */}
          <Dialog open={aiOpen} onOpenChange={setAiOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                data-ocid="timetable.ai_generate.button"
                className="h-7 px-2 text-[11px] bg-gradient-to-r from-cyan-500/80 to-sky-500/80 hover:from-cyan-400 hover:to-sky-400 text-white border-0 gap-1"
              >
                <Sparkles className="w-3 h-3" />
                AI
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-md bg-[#020617]/95 border border-cyan-500/30 shadow-[0_0_40px_rgba(56,189,248,0.15)] backdrop-blur-xl"
              data-ocid="timetable.ai_dialog"
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-cyan-300">
                  <Sparkles className="w-4 h-4" />
                  AI Schedule Generator
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Wake-up time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Wake-up Time
                    </Label>
                    <input
                      type="time"
                      value={wakeUp}
                      onChange={(e) => setWakeUp(e.target.value)}
                      data-ocid="timetable.wakeup.input"
                      className="w-full h-8 px-2 text-xs rounded-lg bg-muted/30 border border-border text-foreground outline-none focus:border-cyan-500/60"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Study Hours:{" "}
                      <span className="text-cyan-300 font-mono">
                        {studyHours}h
                      </span>
                    </Label>
                    <input
                      type="number"
                      min={1}
                      max={16}
                      value={studyHours}
                      onChange={(e) => setStudyHours(Number(e.target.value))}
                      data-ocid="timetable.studyhours.input"
                      className="w-full h-8 px-2 text-xs rounded-lg bg-muted/30 border border-border text-foreground outline-none focus:border-cyan-500/60"
                    />
                  </div>
                </div>

                {/* Focus mix sliders */}
                <div className="space-y-3">
                  <Label className="text-xs text-muted-foreground">
                    Focus Mix
                  </Label>
                  <div className="space-y-2.5">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-blue-300">DSA</span>
                        <span className="font-mono text-blue-300">
                          {dsaPct}%
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[dsaPct]}
                        onValueChange={([v]) => setDsaPct(v)}
                        className="[&_[role=slider]]:bg-blue-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-emerald-300">Dev</span>
                        <span className="font-mono text-emerald-300">
                          {devPct}%
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[devPct]}
                        onValueChange={([v]) => setDevPct(v)}
                        className="[&_[role=slider]]:bg-emerald-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-violet-300">Core CS</span>
                        <span className="font-mono text-violet-300">
                          {corePct}%
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[corePct]}
                        onValueChange={([v]) => setCorePct(v)}
                        className="[&_[role=slider]]:bg-violet-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Break frequency */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Break Frequency
                  </Label>
                  <Select value={breakFreq} onValueChange={setBreakFreq}>
                    <SelectTrigger
                      data-ocid="timetable.breakfreq.select"
                      className="h-8 text-xs bg-muted/30 border-border"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Every 2 hours">
                        Every 2 hours
                      </SelectItem>
                      <SelectItem value="Every 3 hours">
                        Every 3 hours
                      </SelectItem>
                      <SelectItem value="No breaks">No breaks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goal */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Your Goal Today{" "}
                    <span className="opacity-50">(optional)</span>
                  </Label>
                  <Textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    data-ocid="timetable.goal.textarea"
                    placeholder="e.g. Finish DP chapter, prep for Codeforces round..."
                    className="text-xs resize-none h-16 bg-muted/30 border-border focus:border-cyan-500/60"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                data-ocid="timetable.generate.button"
                className="w-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white border-0 gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Schedule
              </Button>
            </DialogContent>
          </Dialog>

          {/* Edit / Done button */}
          <Button
            size="sm"
            variant={editMode ? "default" : "outline"}
            onClick={() => setEditMode((v) => !v)}
            data-ocid="timetable.edit.toggle"
            className={`h-7 px-2 text-[11px] gap-1 ${
              editMode
                ? "bg-amber-500/80 hover:bg-amber-400 text-black border-0"
                : "border-border hover:border-amber-400/50"
            }`}
          >
            <Pencil className="w-3 h-3" />
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {(["DSA", "Dev", "Core CS", "Break"] as Category[]).map((cat) => (
          <span
            key={cat}
            className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[cat]}`}
          >
            {cat}
          </span>
        ))}
        {editMode && (
          <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse">
            ✏️ Edit Mode
          </span>
        )}
      </div>

      {/* Slots */}
      <div
        className="flex-1 overflow-y-auto space-y-1.5 pr-1"
        style={{ maxHeight: "calc(100vh - 340px)", minHeight: "400px" }}
      >
        <AnimatePresence initial={false}>
          {slots.map((slot, i) => (
            <motion.div
              key={`${slot.time}-${i}`}
              data-ocid={`timetable.item.${i + 1}`}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.15 }}
              draggable={editMode}
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 p-2 rounded-xl border transition-all duration-200 group ${
                editMode
                  ? "border-amber-500/20 bg-amber-500/5 cursor-grab active:cursor-grabbing"
                  : slot.checked
                    ? "bg-primary/8 border-primary/20 opacity-60"
                    : "bg-muted/20 border-border hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              {/* Drag handle (edit mode) */}
              {editMode && (
                <GripVertical className="w-3.5 h-3.5 text-amber-400/60 flex-shrink-0" />
              )}

              {/* Checkbox (non-edit mode) */}
              {!editMode && (
                <button
                  type="button"
                  onClick={() => toggleSlot(i)}
                  data-ocid={`timetable.checkbox.${i + 1}`}
                  className="flex-shrink-0 transition-transform active:scale-90"
                  aria-label={`Toggle ${slot.time}`}
                >
                  <AnimatePresence mode="wait">
                    {slot.checked ? (
                      <motion.div
                        key="checked"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unchecked"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Circle className="w-4 h-4 text-muted-foreground group-hover:text-primary/60" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )}

              {/* Time label */}
              <span className="font-mono text-[10px] text-muted-foreground flex-shrink-0 w-14">
                {slot.time}
              </span>

              {/* Task input */}
              <input
                type="text"
                value={slot.task}
                onChange={(e) => updateTask(i, e.target.value)}
                data-ocid={`timetable.input.${i + 1}`}
                placeholder="Add task..."
                className={`flex-1 min-w-0 text-xs bg-transparent outline-none border-none text-foreground placeholder:text-muted-foreground/50 ${
                  slot.checked && !editMode
                    ? "line-through text-muted-foreground"
                    : ""
                }`}
              />

              {/* Category tag */}
              <div className="flex-shrink-0">
                <Select
                  value={slot.category}
                  onValueChange={(v) => updateCategory(i, v as Category)}
                >
                  <SelectTrigger
                    className={`h-5 text-[10px] px-1.5 py-0 border rounded-full font-medium w-auto min-w-0 ${
                      CATEGORY_COLORS[slot.category]
                    }`}
                  >
                    <SelectValue placeholder="Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DSA">DSA</SelectItem>
                    <SelectItem value="Dev">Dev</SelectItem>
                    <SelectItem value="Core CS">Core CS</SelectItem>
                    <SelectItem value="Break">Break</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Delete button (edit mode) */}
              {editMode && (
                <button
                  type="button"
                  onClick={() => deleteSlot(i)}
                  data-ocid={`timetable.delete_button.${i + 1}`}
                  className="flex-shrink-0 p-1 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  aria-label="Delete slot"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add slot button (edit mode) */}
        {editMode && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            type="button"
            onClick={addSlot}
            data-ocid="timetable.add.button"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-amber-500/40 text-amber-400/70 hover:text-amber-300 hover:border-amber-400/60 hover:bg-amber-500/5 transition-all text-xs mt-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add time slot
          </motion.button>
        )}
      </div>
    </div>
  );
}
