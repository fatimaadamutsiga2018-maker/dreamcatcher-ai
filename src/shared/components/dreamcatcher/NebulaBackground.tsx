"use client";

import { useEffect, useMemo, useRef } from "react";
import { TWELVE_OFFICERS, calculateTwelveOfficer } from "@/shared/lib/dreamcatcher/constants";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  hue: number;
};

interface NebulaBackgroundProps {
  date?: Date;
}

export default function NebulaBackground({ date = new Date() }: NebulaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  // Calculate current officer
  const officerKey = calculateTwelveOfficer(date);
  const officer = TWELVE_OFFICERS[officerKey];

  const config = useMemo(
    () => {
      // Base hue: Use indigo (260-270) and teal/green (170-180) based on officer type
      let baseHue = 265; // default indigo
      if (officer.color_type === 'expanding') {
        baseHue = 175; // teal/green for expanding
      } else {
        baseHue = 260; // deep indigo for contracting
      }

      return {
        count: 85,
        baseHue,
        hueRange: 25,
        minR: officer.color_type === 'expanding' ? 0.6 : 0.4,
        maxR: officer.color_type === 'expanding' ? 2.2 : 1.8,
        speed: officer.color_type === 'expanding' ? 0.09 : 0.05,
        drift: officer.color_type === 'expanding' ? 0.045 : 0.025,
      };
    },
    [officer],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();

      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        for (let i = 0; i < config.count; i++) {
          particles.push({
            x: rand(0, w),
            y: rand(0, h),
            vx: rand(-1, 1) * config.speed,
            vy: rand(-1, 1) * config.speed,
            r: rand(config.minR, config.maxR),
            a: rand(0.08, 0.22),
            hue: config.baseHue + rand(-config.hueRange, config.hueRange),
          });
        }
      }
    };

    const step = (t: number) => {
      const time = t * 0.0002;

      ctx.clearRect(0, 0, w, h);

      // Deep indigo to teal gradient
      const g = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.max(w, h) * 0.95);
      g.addColorStop(0, "rgba(30,20,60,0.96)");
      g.addColorStop(0.5, "rgba(15,10,35,0.97)");
      g.addColorStop(1, "rgba(5,5,15,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const ax = Math.cos(time + p.y * 0.01) * config.drift;
        const ay = Math.sin(time + p.x * 0.01) * config.drift;

        p.vx += ax;
        p.vy += ay;

        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Galactic green/teal and indigo palette
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 18);
        glow.addColorStop(0, `hsla(${p.hue}, 75%, 65%, ${p.a})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${Math.min(0.85, p.a + 0.25)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      raf = window.requestAnimationFrame(step);
    };

    resize();
    raf = window.requestAnimationFrame(step);

    window.addEventListener("resize", resize);

    // Add ResizeObserver to handle content changes (like opening FAQs)
    const parent = canvas.parentElement;
    let resizeObserver: ResizeObserver | null = null;

    if (parent) {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(parent);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) window.cancelAnimationFrame(raf);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [config, dpr]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
