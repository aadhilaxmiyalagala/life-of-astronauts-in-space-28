import { useEffect, useState } from "react";
import { Rocket, Music, Music2, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "daily", label: "Daily Life" },
  { id: "gravity", label: "Zero-G" },
  { id: "gallery", label: "Gallery" },
  { id: "quiz", label: "Quiz" },
  { id: "contact", label: "Contact" },
];

interface Props {
  musicOn: boolean;
  onToggleMusic: () => void;
}

const SpaceNav = ({ musicOn, onToggleMusic }: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass-strong" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 group"
          aria-label="Antigravity home"
        >
          <Rocket className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-lg font-bold tracking-tight text-aurora">ANTIGRAVITY</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-3 py-2 text-sm text-foreground/80 hover:text-primary transition-colors relative group"
            >
              {l.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gradient-aurora scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMusic}
            aria-label={musicOn ? "Mute music" : "Play music"}
            className="rounded-full"
          >
            {musicOn ? <Music className="w-4 h-4" /> : <Music2 className="w-4 h-4 opacity-60" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-border mt-3 animate-fade-in-up">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SpaceNav;
