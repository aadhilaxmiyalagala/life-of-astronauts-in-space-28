import { useEffect, useState } from "react";
import { X } from "lucide-react";
import earthImg from "@/assets/space-earth.jpg";
import issImg from "@/assets/iss-interior.jpg";
import spacewalkImg from "@/assets/spacewalk.jpg";
import nebulaImg from "@/assets/nebula.jpg";
import rocketImg from "@/assets/rocket-launch.jpg";
import marsImg from "@/assets/mars.jpg";

const images = [
  { src: earthImg, alt: "Earth at night from orbit", caption: "Earth at night" },
  { src: spacewalkImg, alt: "Astronaut during spacewalk", caption: "Spacewalk" },
  { src: issImg, alt: "Inside the ISS", caption: "Inside the ISS" },
  { src: nebulaImg, alt: "Colorful cosmic nebula", caption: "Carina Nebula" },
  { src: rocketImg, alt: "Rocket launch at sunset", caption: "Lift-off" },
  { src: marsImg, alt: "Mars surface with rover", caption: "The red planet" },
];

const GallerySection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">04 — Space Gallery</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Through the <span className="text-aurora">cupola</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Hover to lift, click to expand. Each frame is a glimpse from somewhere most humans will
            never go.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActiveIdx(i)}
              className={`relative group overflow-hidden rounded-3xl border border-foreground/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-cosmic ${
                i % 3 === 1 ? "sm:translate-y-8" : ""
              }`}
              aria-label={`Open ${img.caption}`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm font-medium text-foreground">{img.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in-up"
          onClick={() => setActiveIdx(null)}
        >
          <button
            onClick={() => setActiveIdx(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:bg-primary/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
          <figure
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIdx].src}
              alt={images[activeIdx].alt}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-cosmic"
            />
            <figcaption className="text-center mt-4 text-foreground/80">
              {images[activeIdx].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
