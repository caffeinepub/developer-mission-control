import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  BookOpen,
  ExternalLink,
  FileText,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ProblemLink {
  url: string;
  snippet: string;
  platform: string;
}

interface PDFProblemsState {
  filename: string;
  problems: ProblemLink[];
  uploadedAt: string;
}

const PLATFORM_PATTERNS: { pattern: RegExp; label: string; color: string }[] = [
  { pattern: /leetcode\.com/i, label: "LeetCode", color: "#f89c1c" },
  { pattern: /codeforces\.com/i, label: "Codeforces", color: "#38bdf8" },
  { pattern: /codechef\.com/i, label: "CodeChef", color: "#a855f7" },
  { pattern: /hackerrank\.com/i, label: "HackerRank", color: "#22c55e" },
  { pattern: /geeksforgeeks\.org/i, label: "GeeksForGeeks", color: "#4ade80" },
  { pattern: /atcoder\.jp/i, label: "AtCoder", color: "#e879f9" },
  { pattern: /spoj\.com/i, label: "SPOJ", color: "#fb923c" },
  { pattern: /interviewbit\.com/i, label: "InterviewBit", color: "#60a5fa" },
];

const URL_REGEX =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*/gi;

function detectPlatform(url: string): { label: string; color: string } {
  for (const { pattern, label, color } of PLATFORM_PATTERNS) {
    if (pattern.test(url)) return { label, color };
  }
  return { label: "Problem", color: "#94a3b8" };
}

function isCodingPlatformUrl(url: string): boolean {
  return PLATFORM_PATTERNS.some(({ pattern }) => pattern.test(url));
}

function extractSnippet(
  text: string,
  urlStart: number,
  urlEnd: number,
): string {
  const before = text.slice(Math.max(0, urlStart - 60), urlStart).trim();
  const after = text.slice(urlEnd, Math.min(text.length, urlEnd + 40)).trim();
  const snippet = `${before} ${after}`.trim();
  return snippet.length > 0 ? snippet.slice(0, 120) : "Problem from PDF";
}

async function parsePDFProblems(file: File): Promise<ProblemLink[]> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .join(" ");
    fullText += `${pageText}\n`;
  }

  const problems: ProblemLink[] = [];
  const seen = new Set<string>();

  URL_REGEX.lastIndex = 0;
  const matches = [...fullText.matchAll(URL_REGEX)];

  for (const match of matches) {
    const url = match[0].replace(/[.)]+$/, "");
    if (!isCodingPlatformUrl(url) || seen.has(url)) continue;
    seen.add(url);

    const snippet = extractSnippet(
      fullText,
      match.index ?? 0,
      (match.index ?? 0) + url.length,
    );
    const platform = detectPlatform(url);
    problems.push({ url, snippet, platform: platform.label });
  }

  return problems;
}

export default function PDFProblemsPanel() {
  const [state, setState] = useLocalStorage<PDFProblemsState | null>(
    "pdf_problems",
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const problems = await parsePDFProblems(file);
      setState({
        filename: file.name,
        problems,
        uploadedAt: new Date().toLocaleString(),
      });
    } catch (err) {
      console.error(err);
      setError(
        "Failed to parse PDF. Please ensure it contains selectable text.",
      );
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleClear = () => {
    setState(null);
    setError(null);
  };

  return (
    <section className="glass-card rounded-xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            PDF Problems
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {state && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-destructive hover:text-destructive gap-1"
              data-ocid="pdf.delete_button"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="gap-1.5 neon-border"
            data-ocid="pdf.upload_button"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            {loading ? "Parsing…" : "Upload PDF"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="pdf.dropzone"
          />
        </div>
      </div>

      {/* Status bar */}
      <AnimatePresence mode="wait">
        {state && (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20"
          >
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm text-foreground font-medium truncate flex-1">
              {state.filename}
            </span>
            <Badge
              variant="secondary"
              className="shrink-0 bg-primary/20 text-primary border-primary/30"
            >
              {state.problems.length} problem
              {state.problems.length !== 1 ? "s" : ""}
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/30"
            data-ocid="pdf.error_state"
          >
            <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
            <span className="text-sm text-destructive">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      {loading && (
        <div
          className="flex flex-col items-center gap-3 py-8 text-muted-foreground"
          data-ocid="pdf.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Scanning PDF for coding problem links…</p>
        </div>
      )}

      {/* Problems list */}
      {!loading && state && state.problems.length > 0 && (
        <ScrollArea className="max-h-80">
          <div className="flex flex-col gap-2 pr-2">
            <AnimatePresence>
              {state.problems.map((problem, idx) => {
                const info =
                  PLATFORM_PATTERNS.find((p) => p.label === problem.platform) ??
                  PLATFORM_PATTERNS[0];
                return (
                  <motion.div
                    key={problem.url}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card/60 border border-border/40 hover:border-primary/40 transition-colors"
                    data-ocid={`pdf.item.${idx + 1}`}
                  >
                    <div className="shrink-0 mt-0.5">
                      <span
                        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                        style={{
                          backgroundColor: `${info.color}22`,
                          color: info.color,
                          border: `1px solid ${info.color}44`,
                        }}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">
                        {problem.snippet}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0"
                          style={{
                            borderColor: `${info.color}55`,
                            color: info.color,
                          }}
                        >
                          {problem.platform}
                        </Badge>
                        <a
                          href={problem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors truncate max-w-[200px]"
                          data-ocid={`pdf.link.${idx + 1}`}
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          Open Problem
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollArea>
      )}

      {/* No links found */}
      {!loading && state && state.problems.length === 0 && (
        <div
          className="flex flex-col items-center gap-2 py-8 text-muted-foreground"
          data-ocid="pdf.empty_state"
        >
          <AlertCircle className="w-8 h-8 opacity-40" />
          <p className="text-sm text-center">
            No coding platform links detected in this PDF.
          </p>
          <p className="text-xs text-center opacity-60">
            Supported: LeetCode, Codeforces, CodeChef, HackerRank,
            GeeksForGeeks, AtCoder, SPOJ, InterviewBit
          </p>
        </div>
      )}

      {/* Empty initial state */}
      {!loading && !state && !error && (
        <div
          className="flex flex-col items-center gap-3 py-10 text-muted-foreground border-2 border-dashed border-border/40 rounded-lg"
          data-ocid="pdf.empty_state"
        >
          <FileText className="w-10 h-10 opacity-30" />
          <div className="text-center">
            <p className="text-sm font-medium">
              Upload a PDF with coding problems
            </p>
            <p className="text-xs opacity-60 mt-1">
              Links to LeetCode, Codeforces, CodeChef &amp; more will be
              auto-detected
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            Choose PDF
          </Button>
        </div>
      )}
    </section>
  );
}
