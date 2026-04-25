import { useState } from "react";
import { Utensils, Moon, Dumbbell, Droplets, Brain, Camera, ChevronDown } from "lucide-react";

interface Activity {
  icon: typeof Utensils;
  title: string;
  short: string;
  detail: string;
  color: string;
}

const activities: Activity[] = [
  {
    icon: Utensils,
    title: "Eating",
    short: "Floating tortillas, sticky sauces",
    detail:
      "Bread is banned — crumbs would float into electronics. Astronauts use tortillas instead. Liquids are sipped through pouches with straws, and salt and pepper come dissolved in water.",
    color: "from-primary/30 to-primary/5",
  },
  {
    icon: Moon,
    title: "Sleeping",
    short: "Strapped into a vertical sleeping bag",
    detail:
      "There is no up or down, so astronauts zip themselves into bags tethered to the wall. Without gravity pulling on their spine, most grow about 5 cm taller during a mission.",
    color: "from-secondary/30 to-secondary/5",
  },
  {
    icon: Dumbbell,
    title: "Exercising",
    short: "2 hours daily to fight muscle loss",
    detail:
      "Microgravity causes rapid bone and muscle loss. Crew use a treadmill (with bungee harness), a bike, and the ARED resistance machine for two hours every day.",
    color: "from-accent/30 to-accent/5",
  },
  {
    icon: Droplets,
    title: "Hygiene",
    short: "No showers — just rinseless wipes",
    detail:
      "Water is too precious to spray. Astronauts use rinseless shampoo and damp towels. Toothpaste? You can either swallow it or spit into a tissue.",
    color: "from-primary/30 to-secondary/5",
  },
  {
    icon: Brain,
    title: "Working",
    short: "Science, repairs, and outreach",
    detail:
      "Each crew member runs dozens of experiments — protein crystals, plant biology, fluid physics — while maintaining the station's complex life-support systems.",
    color: "from-secondary/30 to-accent/5",
  },
  {
    icon: Camera,
    title: "Free Time",
    short: "Photography from the cupola",
    detail:
      "Off-hours often mean floating in the cupola module to photograph Earth, calling family, watching movies, or playing musical instruments — yes, even guitars in space.",
    color: "from-accent/30 to-primary/5",
  },
];

const DailySection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="daily" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">02 — Daily Activities</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            A day in <span className="text-aurora">orbit</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Tap a card to expand. Every routine you take for granted on Earth becomes a small puzzle
            in zero gravity.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a, i) => {
            const Icon = a.icon;
            const open = openIdx === i;
            return (
              <button
                key={a.title}
                onClick={() => setOpenIdx(open ? null : i)}
                className={`text-left glass-strong rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-cosmic group ${
                  open ? "ring-2 ring-primary/50 shadow-cosmic" : ""
                }`}
                aria-expanded={open}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{a.title}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground/50 transition-transform shrink-0 ${
                      open ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </div>
                <p className="text-sm text-foreground/60 mb-2">{a.short}</p>
                <div
                  className={`grid transition-all duration-500 ${
                    open ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-foreground/80 leading-relaxed pt-3 border-t border-foreground/10">
                      {a.detail}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DailySection;
