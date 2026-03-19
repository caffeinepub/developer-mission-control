import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Brain, Lightbulb, Send, Sparkles, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { analyzeProblem, getAIResponse } from "../data/aiTips";
import type { ProblemAnalysis } from "../data/aiTips";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "ai",
  text: "Hey! Ask me about any coding topic — DSA, algorithms, recursion, dynamic programming, system design, and more.",
};

const DOTS: { key: string; delay: number }[] = [
  { key: "dot-0", delay: 0 },
  { key: "dot-1", delay: 0.15 },
  { key: "dot-2", delay: 0.3 },
];

const TYPE_COLORS: Record<string, string> = {
  "Two Pointers / Hash Map": "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  "Sliding Window": "bg-violet-500/20 text-violet-300 border-violet-500/40",
  "Binary Search": "bg-amber-500/20 text-amber-300 border-amber-500/40",
  "Tree / DFS / BFS": "bg-green-500/20 text-green-300 border-green-500/40",
  "Graph Traversal": "bg-blue-500/20 text-blue-300 border-blue-500/40",
  "Dynamic Programming": "bg-pink-500/20 text-pink-300 border-pink-500/40",
  Stack: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  "Heap / Priority Queue": "bg-red-500/20 text-red-300 border-red-500/40",
  "String Manipulation": "bg-teal-500/20 text-teal-300 border-teal-500/40",
  "Matrix / Grid BFS-DFS": "bg-lime-500/20 text-lime-300 border-lime-500/40",
  Backtracking: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
  "Linked List": "bg-sky-500/20 text-sky-300 border-sky-500/40",
  "General / Unknown": "bg-muted/60 text-muted-foreground border-border/40",
};

function getTypeBadgeClass(type: string): string {
  return TYPE_COLORS[type] ?? "bg-primary/20 text-primary border-primary/40";
}

export default function AIChatBox() {
  // ── Tips tab state ──────────────────────────────────────────────────────
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollKey = `${messages.length}-${typing}`;

  // ── Solve tab state ─────────────────────────────────────────────────────
  const [problemText, setProblemText] = useState("");
  const [solveResult, setSolveResult] = useState<ProblemAnalysis | null>(null);
  const [solveMode, setSolveMode] = useState<"hint" | "full" | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollKey encodes messages+typing state
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollKey]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: "ai",
        text: getAIResponse(trimmed),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 600);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleGetHint() {
    if (!problemText.trim()) return;
    setSolveResult(analyzeProblem(problemText));
    setSolveMode("hint");
  }

  function handleFullApproach() {
    if (!problemText.trim()) return;
    setSolveResult(analyzeProblem(problemText));
    setSolveMode("full");
  }

  return (
    <div className="glass-card rounded-2xl flex flex-col h-full min-h-[420px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground tracking-tight">
            AI Tips Assistant
          </h2>
          <p className="text-[10px] text-muted-foreground">
            Tips & Problem Solver
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="tips"
        className="flex flex-col flex-1 overflow-hidden"
      >
        <TabsList className="mx-4 mt-3 mb-0 h-8 bg-muted/40 border border-border/40 p-0.5">
          <TabsTrigger
            value="tips"
            className="flex-1 h-7 text-[11px] gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            data-ocid="ai_chat.tab"
          >
            <Sparkles className="w-3 h-3" />
            Tips
          </TabsTrigger>
          <TabsTrigger
            value="solve"
            className="flex-1 h-7 text-[11px] gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            data-ocid="ai_solve.tab"
          >
            <Brain className="w-3 h-3" />
            Solve
          </TabsTrigger>
        </TabsList>

        {/* ── Tips Tab ─────────────────────────────────────────────────── */}
        <TabsContent
          value="tips"
          className="flex flex-col flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden"
        >
          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{ maxHeight: "288px" }}
            data-ocid="ai_chat.panel"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  data-ocid={`ai_chat.item.${idx + 1}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground font-medium"
                        : "bg-muted/60 text-foreground border border-border/40"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
                data-ocid="ai_chat.loading_state"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
                <div className="bg-muted/60 border border-border/40 rounded-xl px-3 py-2.5 flex items-center gap-1">
                  {DOTS.map(({ key, delay }) => (
                    <motion.span
                      key={key}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{
                        duration: 0.6,
                        delay,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border/50 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about arrays, DP, system design…"
              className="flex-1 text-xs bg-muted/40 border-border/50 h-9 focus-visible:ring-primary/40"
              data-ocid="ai_chat.input"
            />
            <Button
              size="sm"
              onClick={handleSend}
              disabled={!input.trim() || typing}
              className="h-9 w-9 p-0 shrink-0 bg-primary hover:bg-primary/90"
              data-ocid="ai_chat.submit_button"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </TabsContent>

        {/* ── Solve Tab ─────────────────────────────────────────────────── */}
        <TabsContent
          value="solve"
          className="flex flex-col flex-1 overflow-y-auto mt-0 px-4 py-3 gap-3 data-[state=inactive]:hidden"
          data-ocid="ai_solve.panel"
        >
          <Textarea
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder="Paste your coding problem here…"
            className="text-xs bg-muted/40 border-border/50 resize-y focus-visible:ring-primary/40 min-h-[80px]"
            rows={3}
            data-ocid="ai_solve.textarea"
          />

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleGetHint}
              disabled={!problemText.trim()}
              className="flex-1 h-8 text-xs gap-1.5 border-primary/40 text-primary hover:bg-primary/10"
              data-ocid="ai_solve.primary_button"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Get Hint
            </Button>
            <Button
              size="sm"
              onClick={handleFullApproach}
              disabled={!problemText.trim()}
              className="flex-1 h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90"
              data-ocid="ai_solve.secondary_button"
            >
              <Zap className="w-3.5 h-3.5" />
              Full Approach
            </Button>
          </div>

          {/* Result card */}
          <AnimatePresence>
            {solveResult && solveMode && (
              <motion.div
                key={`${solveMode}-${solveResult.type}`}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="rounded-xl border border-border/50 bg-muted/40 overflow-hidden"
                data-ocid="ai_solve.card"
              >
                {/* Type badge row */}
                <div className="px-3 pt-3 pb-2 border-b border-border/30 flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    Detected Pattern
                  </span>
                  <Badge
                    className={`ml-auto text-[10px] px-2 py-0 h-5 border font-semibold ${getTypeBadgeClass(
                      solveResult.type,
                    )}`}
                  >
                    {solveResult.type}
                  </Badge>
                </div>

                <div className="px-3 py-2.5 space-y-3">
                  {/* Hint */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Lightbulb className="w-3 h-3 text-amber-400" />
                      <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                        Key Insight
                      </span>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      {solveResult.hint}
                    </p>
                  </div>

                  {/* Full approach (only when mode = full) */}
                  {solveMode === "full" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.22 }}
                      className="space-y-2"
                    >
                      <div className="border-t border-border/30 pt-2">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Zap className="w-3 h-3 text-primary" />
                          <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                            Step-by-Step Approach
                          </span>
                        </div>
                        <pre className="text-[11px] text-foreground/85 leading-relaxed whitespace-pre-wrap font-mono">
                          {solveResult.approach}
                        </pre>
                      </div>

                      <div className="border-t border-border/30 pt-2 flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                          Complexity:
                        </span>
                        <code className="text-[11px] text-green-400 font-mono">
                          {solveResult.complexity}
                        </code>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!solveResult && (
            <div
              className="flex-1 flex flex-col items-center justify-center gap-2 py-4 text-center"
              data-ocid="ai_solve.empty_state"
            >
              <Brain className="w-8 h-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">
                Paste a problem above and tap{" "}
                <span className="text-primary font-medium">Get Hint</span> or{" "}
                <span className="text-primary font-medium">Full Approach</span>
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
