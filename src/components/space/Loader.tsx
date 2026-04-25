import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

const Loader = () => {
  const [hidden, setHidden] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 1400);
    const t2 = setTimeout(() => setHidden(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-aurora blur-2xl opacity-60 animate-pulse-glow" />
        <Rocket className="relative w-14 h-14 text-primary animate-float" />
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.4em] text-foreground/60 animate-pulse">
        Preparing for lift-off…
      </p>
    </div>
  );
};

export default Loader;
