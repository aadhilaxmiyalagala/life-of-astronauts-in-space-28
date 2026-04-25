import { useEffect, useRef, useState } from "react";
import Starfield from "@/components/space/Starfield";
import SpaceNav from "@/components/space/SpaceNav";
import HeroSection from "@/components/space/HeroSection";
import AboutSection from "@/components/space/AboutSection";
import DailySection from "@/components/space/DailySection";
import GravitySection from "@/components/space/GravitySection";
import GallerySection from "@/components/space/GallerySection";
import QuizSection from "@/components/space/QuizSection";
import ContactSection from "@/components/space/ContactSection";
import Loader from "@/components/space/Loader";

const Index = () => {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Lazily create the audio element. Using a free ambient space pad from a CDN.
    if (!audioRef.current) {
      const a = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=space-ambient-cinematic-tension-117930.mp3"
      );
      a.loop = true;
      a.volume = 0.35;
      audioRef.current = a;
    }
    const audio = audioRef.current;
    if (musicOn) {
      audio.play().catch(() => {
        /* autoplay blocked silently */
      });
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
    };
  }, [musicOn]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Loader />
      <Starfield />
      <SpaceNav musicOn={musicOn} onToggleMusic={() => setMusicOn((m) => !m)} />

      <main>
        <HeroSection />
        <AboutSection />
        <DailySection />
        <GravitySection />
        <GallerySection />
        <QuizSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
