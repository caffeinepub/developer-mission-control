import { Toaster } from "@/components/ui/sonner";
import { motion } from "motion/react";
import { useEffect } from "react";
import AIChatBox from "./components/AIChatBox";
import CodingTimetable from "./components/CodingTimetable";
import ConsistencyTracker from "./components/ConsistencyTracker";
import ContestFeed from "./components/ContestFeed";
import DailyQuestions from "./components/DailyQuestions";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import MascotCompanion from "./components/MascotCompanion";
import PDFProblemsPanel from "./components/PDFProblemsPanel";
import { getTodayKey } from "./data/questionPool";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useProfile } from "./hooks/useProfile";

export type Theme = "dark" | "light" | "dare";

export default function App() {
  const [theme, setTheme] = useLocalStorage<Theme>("dmc-theme", "dark");
  const [checkedDays, setCheckedDays] = useLocalStorage<boolean[]>(
    "dmc-consistency",
    Array(100).fill(false),
  );
  const [profile, setProfile] = useProfile();

  const checkedCount = checkedDays.filter(Boolean).length;
  const progressPct = Math.round((checkedCount / 100) * 100);
  const currentDay = Math.max(1, checkedCount);

  const streak = (() => {
    let s = 0;
    for (let i = checkedDays.length - 1; i >= 0; i--) {
      if (checkedDays[i]) s++;
      else break;
    }
    return s;
  })();

  const completedToday = (() => {
    try {
      const stored = localStorage.getItem(getTodayKey());
      if (!stored) return false;
      const arr = JSON.parse(stored) as boolean[];
      return arr.length >= 5 && arr.slice(0, 5).every(Boolean);
    } catch {
      return false;
    }
  })();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Show login page if no profile name
  if (!profile.name) {
    return (
      <div data-theme={theme}>
        <LoginPage onComplete={setProfile} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-inter">
      {/* Grid overlay */}
      <div className="bg-grid-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/40">
          <motion.div
            className="h-full bg-primary progress-bar-glow"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <Header
          theme={theme}
          onThemeChange={setTheme}
          progressPct={progressPct}
          checkedCount={checkedCount}
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center pt-10 pb-6 px-4"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-3">
            Welcome back, <span className="neon-text">{profile.name}.</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Status: <span className="neon-text font-semibold">Active</span>{" "}
            &nbsp;|&nbsp; Goal:{" "}
            <span className="text-foreground font-medium">
              Build &amp; Learn (100 Days)
            </span>
            &nbsp;|&nbsp; Progress:{" "}
            <span className="neon-text font-semibold">
              {checkedCount}/100 Days
            </span>
          </p>
        </motion.section>

        {/* Main 3-column grid */}
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CodingTimetable />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-5"
            >
              <ContestFeed />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ConsistencyTracker
                checkedDays={checkedDays}
                onToggle={(i) =>
                  setCheckedDays((prev) => {
                    const next = [...prev];
                    next[i] = !next[i];
                    return next;
                  })
                }
              />
            </motion.div>
          </div>

          {/* AI + Daily Questions row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5"
          >
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <AIChatBox />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
            >
              <DailyQuestions dayNumber={currentDay} />
            </motion.div>
          </motion.div>

          {/* PDF Problems row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-5"
          >
            <PDFProblemsPanel />
          </motion.div>
        </main>

        <Footer />
      </div>

      <Toaster />
      <MascotCompanion
        dayNumber={currentDay}
        completedToday={completedToday}
        streak={streak}
      />
    </div>
  );
}
