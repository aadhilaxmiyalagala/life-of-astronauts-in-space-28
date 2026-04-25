import { useEffect, useRef } from "react";

/**
 * Animated canvas starfield with twinkling stars + slow-drifting space particles.
 * Sits behind all content as a fixed background.
 */
const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    type Star = { x: number; y: number; r: number; alpha: number; dAlpha: number; vx: number; vy: number };
    const stars: Star[] = [];
    const STAR_COUNT = Math.min(220, Math.floor((width * height) / 9000));

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.3,
        alpha: Math.random(),
        dAlpha: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
      });
    }

    // Occasional shooting stars
    type Shooting = { x: number; y: number; len: number; speed: number; angle: number; life: number };
    const shooting: Shooting[] = [];

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      for (const s of stars) {
        s.alpha += s.dAlpha;
        if (s.alpha <= 0.1 || s.alpha >= 1) s.dAlpha *= -1;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(190, 100%, 90%, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "hsl(190, 100%, 70%)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Random shooting stars
      if (Math.random() < 0.005) {
        shooting.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          len: Math.random() * 80 + 60,
          speed: Math.random() * 6 + 6,
          angle: Math.PI / 4,
          life: 1,
        });
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.life -= 0.015;
        const grad = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - Math.cos(m.angle) * m.len,
          m.y - Math.sin(m.angle) * m.len
        );
        grad.addColorStop(0, `hsla(280, 100%, 85%, ${m.life})`);
        grad.addColorStop(1, "hsla(280, 100%, 85%, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - Math.cos(m.angle) * m.len, m.y - Math.sin(m.angle) * m.len);
        ctx.stroke();
        if (m.life <= 0 || m.x > width || m.y > height) shooting.splice(i, 1);
      }

      raf = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
};

export default Starfield;
