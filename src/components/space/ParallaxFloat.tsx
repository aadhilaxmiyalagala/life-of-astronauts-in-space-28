import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  /** Strength of the cursor parallax — 0 = off, 1 = subtle, 3 = strong */
  strength?: number;
  className?: string;
}

/**
 * Wraps children and translates them slightly in response to mouse movement,
 * creating a floating, depth-aware feel.
 */
const ParallaxFloat = ({ children, strength = 1, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 12 * strength;
      targetY = ((e.clientY - cy) / cy) * 12 * strength;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animate();
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
};

export default ParallaxFloat;
