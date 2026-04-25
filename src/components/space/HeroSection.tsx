import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import ParallaxFloat from "./ParallaxFloat";
import astronaut from "@/assets/astronaut-floating.png";

const HeroSection = () => {
  const scrollNext = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Floating glow orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-drift pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[28rem] h-[28rem] rounded-full bg-secondary/20 blur-3xl animate-drift pointer-events-none" style={{ animationDelay: "5s" }} />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center lg:text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-widest text-foreground/80">
              An Interactive Space Experience
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Life of <span className="text-aurora">Astronauts</span>
            <br /> in Space
          </h1>

          <p className="text-lg text-foreground/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Float weightlessly through the daily reality of orbital life. Explore how astronauts eat,
            sleep, work and dream while spinning 400 km above Earth.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              onClick={scrollNext}
              className="rounded-full bg-gradient-aurora text-primary-foreground hover:opacity-90 glow-primary transition-all hover:scale-105"
            >
              Start Exploring
              <ArrowDown className="ml-2 w-4 h-4 animate-bounce" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("gravity")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full glass border-foreground/20 hover:border-primary/50"
            >
              Try Zero Gravity
            </Button>
          </div>
        </div>

        <ParallaxFloat strength={2} className="relative flex justify-center">
          {/* Glow halo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 rounded-full bg-gradient-aurora opacity-30 blur-3xl animate-pulse-glow" />
          </div>
          {/* Astronaut */}
          <img
            src={astronaut}
            alt="Astronaut floating in zero gravity"
            width={560}
            height={560}
            className="relative w-[20rem] sm:w-[26rem] lg:w-[32rem] animate-float drop-shadow-[0_0_60px_hsl(190_100%_60%_/_0.4)]"
          />
          {/* Tiny orbiting particles */}
          <div className="absolute inset-0 animate-spin-slow pointer-events-none">
            <div className="absolute top-10 left-1/2 w-2 h-2 rounded-full bg-primary glow-primary" />
            <div className="absolute bottom-12 left-12 w-1.5 h-1.5 rounded-full bg-secondary" />
            <div className="absolute top-1/2 right-8 w-2 h-2 rounded-full bg-accent" />
          </div>
        </ParallaxFloat>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollNext}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/60 hover:text-primary transition-colors animate-bounce"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSection;
