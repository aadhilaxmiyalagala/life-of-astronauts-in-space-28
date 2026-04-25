import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, RotateCcw, Trophy } from "lucide-react";

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    q: "How many sunrises do astronauts see per day on the ISS?",
    options: ["1", "4", "16", "24"],
    answer: 2,
    explanation: "The ISS orbits Earth every ~90 minutes, giving 16 sunrises a day.",
  },
  {
    q: "Why don't astronauts eat regular bread?",
    options: ["Allergies", "Crumbs float and damage equipment", "It's too heavy", "It tastes bad"],
    answer: 1,
    explanation: "Crumbs would drift into vents and electronics. Tortillas are used instead.",
  },
  {
    q: "How long do astronauts exercise daily to fight muscle loss?",
    options: ["30 min", "1 hour", "2 hours", "4 hours"],
    answer: 2,
    explanation: "Two hours of daily exercise on a treadmill, bike and ARED machine.",
  },
  {
    q: "Roughly how fast does the ISS travel?",
    options: ["1,000 km/h", "10,000 km/h", "28,000 km/h", "100,000 km/h"],
    answer: 2,
    explanation: "About 28,000 km/h — fast enough to circle Earth in 90 minutes.",
  },
  {
    q: "How do astronauts sleep in zero gravity?",
    options: [
      "On normal beds",
      "Strapped into a sleeping bag tethered to the wall",
      "Floating freely",
      "On the floor",
    ],
    answer: 1,
    explanation: "They zip into bags fixed to the wall — there is no up or down.",
  },
];

const QuizSection = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[step];

  const choose = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= questions.length) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const pct = Math.round((score / questions.length) * 100);

  return (
    <section id="quiz" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-12 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">05 — Mission Quiz</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Are you <span className="text-aurora">astronaut material</span>?
          </h2>
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-10 shadow-cosmic">
          {!done ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-foreground/60">
                  Question {step + 1} of {questions.length}
                </span>
                <span className="text-sm text-primary font-medium">Score: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-muted rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-gradient-aurora transition-all duration-500"
                  style={{ width: `${((step + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mb-6">{current.q}</h3>

              <div className="grid gap-3 mb-6">
                {current.options.map((opt, idx) => {
                  const isCorrect = idx === current.answer;
                  const isPicked = idx === selected;
                  let style = "border-foreground/15 hover:border-primary/40 hover:bg-primary/5";
                  if (selected !== null) {
                    if (isCorrect) style = "border-primary bg-primary/10 text-primary";
                    else if (isPicked) style = "border-destructive bg-destructive/10 text-destructive";
                    else style = "border-foreground/10 opacity-60";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => choose(idx)}
                      disabled={selected !== null}
                      className={`text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between gap-3 ${style}`}
                    >
                      <span>{opt}</span>
                      {selected !== null && isCorrect && <Check className="w-5 h-5" />}
                      {selected !== null && isPicked && !isCorrect && <X className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="animate-fade-in-up">
                  <div className="p-4 rounded-2xl bg-muted/50 border border-foreground/10 mb-4 text-sm text-foreground/80">
                    {current.explanation}
                  </div>
                  <Button
                    onClick={next}
                    className="w-full rounded-full bg-gradient-aurora text-primary-foreground glow-primary"
                  >
                    {step + 1 >= questions.length ? "See My Score" : "Next Question"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 animate-fade-in-up">
              <div className="inline-flex w-20 h-20 rounded-full bg-gradient-aurora items-center justify-center mb-6 glow-primary">
                <Trophy className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold mb-3">
                You scored <span className="text-aurora">{score} / {questions.length}</span>
              </h3>
              <p className="text-foreground/70 mb-2">{pct}% — {pct === 100 ? "Mission Commander!" : pct >= 60 ? "Ready for liftoff!" : "Back to flight school 🚀"}</p>
              <Button
                onClick={reset}
                variant="outline"
                className="rounded-full mt-6 glass border-foreground/20"
              >
                <RotateCcw className="mr-2 w-4 h-4" /> Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
