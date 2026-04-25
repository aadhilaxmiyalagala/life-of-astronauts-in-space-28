import ParallaxFloat from "./ParallaxFloat";
import earthImg from "@/assets/space-earth.jpg";
import issImg from "@/assets/iss-interior.jpg";

const facts = [
  { value: "400 km", label: "Orbit altitude" },
  { value: "28,000", label: "km/h orbital speed" },
  { value: "16", label: "Sunrises per day" },
  { value: "0 g", label: "Effective gravity" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">01 — About Space Life</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            A day where the <span className="text-aurora">Sun rises 16 times</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Aboard the International Space Station, astronauts orbit Earth every 90 minutes. Without
            gravity to anchor them, every routine — drinking water, sleeping, even crying — becomes a
            new kind of choreography.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <ParallaxFloat strength={0.6}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-aurora opacity-30 blur-2xl rounded-3xl group-hover:opacity-50 transition-opacity" />
              <img
                src={earthImg}
                alt="Earth at night seen from orbit"
                loading="lazy"
                width={1280}
                height={800}
                className="relative w-full rounded-3xl border border-foreground/10 shadow-cosmic"
              />
            </div>
          </ParallaxFloat>

          <div className="space-y-6">
            <ParallaxFloat strength={0.4}>
              <div className="glass-strong rounded-3xl p-6 sm:p-8 hover:border-primary/40 transition-colors">
                <h3 className="text-2xl font-semibold mb-3">Living among the stars</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Crew members spend up to six months aboard the station, conducting experiments that
                  benefit science back home — from cancer research to climate observation.
                </p>
              </div>
            </ParallaxFloat>

            <ParallaxFloat strength={0.8}>
              <div className="glass-strong rounded-3xl p-6 sm:p-8 hover:border-secondary/40 transition-colors">
                <img
                  src={issImg}
                  alt="Astronaut floating inside the ISS"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-2xl font-semibold mb-3">A floating laboratory</h3>
                <p className="text-foreground/70 leading-relaxed">
                  The ISS is the size of a football field, with labs, sleeping quarters, and a cupola
                  with the most spectacular view in the universe.
                </p>
              </div>
            </ParallaxFloat>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {facts.map((f, i) => (
            <ParallaxFloat key={f.label} strength={0.3 + i * 0.1}>
              <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <div className="text-3xl sm:text-4xl font-bold text-aurora mb-1">{f.value}</div>
                <div className="text-xs uppercase tracking-wider text-foreground/60">{f.label}</div>
              </div>
            </ParallaxFloat>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
