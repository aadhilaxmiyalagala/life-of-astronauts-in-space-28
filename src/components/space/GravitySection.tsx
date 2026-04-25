import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Magnet, Feather } from "lucide-react";

interface Body {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

/**
 * Physics sandbox — toggle gravity to see floating objects fall (or rise) inside an arena.
 * Pure DOM/RAF, no extra deps.
 */
const GravitySection = () => {
  const arenaRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<Body[]>([]);
  const [gravityOn, setGravityOn] = useState(false);
  const gravityRef = useRef(false);

  useEffect(() => {
    gravityRef.current = gravityOn;
  }, [gravityOn]);

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const palette = [
      "from-primary to-primary-glow",
      "from-secondary to-secondary-glow",
      "from-accent to-secondary",
      "from-primary to-secondary",
      "from-secondary to-accent",
      "from-accent to-primary",
    ];

    const bodies: Body[] = [];
    const rect = () => arena.getBoundingClientRect();
    const r = rect();

    for (let i = 0; i < 8; i++) {
      const el = document.createElement("div");
      const size = 28 + Math.random() * 32;
      el.className = `absolute rounded-full bg-gradient-to-br ${palette[i % palette.length]} shadow-glow`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.willChange = "transform";
      arena.appendChild(el);
      bodies.push({
        el,
        x: Math.random() * (r.width - size),
        y: Math.random() * (r.height - size),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size,
      });
    }
    bodiesRef.current = bodies;

    let raf = 0;
    const step = () => {
      const a = arena.getBoundingClientRect();
      for (const b of bodies) {
        if (gravityRef.current) {
          b.vy += 0.35; // gravity acceleration
          b.vx *= 0.995;
        } else {
          // Subtle Brownian-like drift in zero G
          b.vx += (Math.random() - 0.5) * 0.04;
          b.vy += (Math.random() - 0.5) * 0.04;
          b.vx = Math.max(-1.5, Math.min(1.5, b.vx));
          b.vy = Math.max(-1.5, Math.min(1.5, b.vy));
        }
        b.x += b.vx;
        b.y += b.vy;

        // Walls
        if (b.x <= 0) {
          b.x = 0;
          b.vx = Math.abs(b.vx) * 0.7;
        }
        if (b.x + b.size >= a.width) {
          b.x = a.width - b.size;
          b.vx = -Math.abs(b.vx) * 0.7;
        }
        if (b.y <= 0) {
          b.y = 0;
          b.vy = Math.abs(b.vy) * 0.7;
        }
        if (b.y + b.size >= a.height) {
          b.y = a.height - b.size;
          b.vy = -Math.abs(b.vy) * (gravityRef.current ? 0.6 : 0.7);
        }
        b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
      }
      raf = requestAnimationFrame(step);
    };
    step();

    return () => {
      cancelAnimationFrame(raf);
      bodies.forEach((b) => b.el.remove());
    };
  }, []);

  return (
    <section id="gravity" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">03 — Zero-G Simulation</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Toggle <span className="text-aurora">gravity</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Watch what happens when 9.8 m/s² disappears. The objects below behave the way water drops,
            tools, and crumbs do aboard the ISS.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-4 sm:p-6 shadow-cosmic">
          <div
            ref={arenaRef}
            className="relative w-full h-[420px] sm:h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-background/60 to-muted/40 border border-foreground/10"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <div className="text-sm text-foreground/70">
              Status:{" "}
              <span className={`font-semibold ${gravityOn ? "text-accent" : "text-primary"}`}>
                {gravityOn ? "Gravity ON — Earth-like" : "Zero Gravity — Orbital"}
              </span>
            </div>
            <Button
              size="lg"
              onClick={() => setGravityOn((g) => !g)}
              className="rounded-full bg-gradient-aurora text-primary-foreground hover:opacity-90 glow-primary"
            >
              {gravityOn ? <Feather className="mr-2 w-4 h-4" /> : <Magnet className="mr-2 w-4 h-4" />}
              Toggle Gravity
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravitySection;
