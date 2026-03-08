'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// --- Types ---

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

// --- Configuration Constants ---

const PARTICLE_DENSITY = 0.00008; // Reduced for subtlety
const BG_PARTICLE_DENSITY = 0.00003;
const MOUSE_RADIUS = 150;
const RETURN_SPEED = 0.06;
const DAMPING = 0.92;
const REPULSION_STRENGTH = 0.8; // Gentler push

// --- Helper Functions ---

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Main Component ---

interface AmbientParticlesProps {
  variant?: 'warm' | 'cool' | 'emerald';
  intensity?: 'subtle' | 'medium' | 'high';
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  variant = 'warm',
  intensity = 'subtle'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const particlesRef = useRef<Particle[]>([]);
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef<number>(0);

  // Color schemes based on variant
  const getColors = () => {
    switch (variant) {
      case 'warm':
        return {
          primary: '#f59e0b', // amber-500
          secondary: '#fbbf24', // amber-400
          glow: 'rgba(245, 158, 11, 0.08)'
        };
      case 'emerald':
        return {
          primary: '#10b981', // emerald-500
          secondary: '#34d399', // emerald-400
          glow: 'rgba(16, 185, 129, 0.08)'
        };
      case 'cool':
      default:
        return {
          primary: '#6366f1', // indigo-500
          secondary: '#818cf8', // indigo-400
          glow: 'rgba(99, 102, 241, 0.08)'
        };
    }
  };

  const colors = getColors();

  // Initialize Particles
  const initParticles = useCallback((width: number, height: number) => {
    const densityMultiplier = intensity === 'high' ? 1.5 : intensity === 'medium' ? 1 : 0.7;

    // Main Interactive Particles
    const particleCount = Math.floor(width * height * PARTICLE_DENSITY * densityMultiplier);
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      newParticles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(0.8, 2),
        color: Math.random() > 0.85 ? colors.primary : colors.secondary,
      });
    }
    particlesRef.current = newParticles;

    // Background Ambient Particles
    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY * densityMultiplier);
    const newBgParticles: BackgroundParticle[] = [];

    for (let i = 0; i < bgCount; i++) {
      newBgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: randomRange(0.5, 1.2),
        alpha: randomRange(0.1, 0.3),
        phase: Math.random() * Math.PI * 2
      });
    }
    backgroundParticlesRef.current = newBgParticles;
  }, [colors, intensity]);

  // Animation Loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pulsating Radial Glow
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pulseOpacity = Math.sin(time * 0.0006) * 0.02 + 0.05;

    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, Math.max(canvas.width, canvas.height) * 0.6
    );
    gradient.addColorStop(0, colors.glow.replace('0.08', String(pulseOpacity)));
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Background Particles
    const bgParticles = backgroundParticlesRef.current;

    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const twinkle = Math.sin(time * 0.0015 + p.phase) * 0.5 + 0.5;
      const currentAlpha = p.alpha * (0.4 + 0.6 * twinkle);

      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = colors.secondary;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Main Foreground Physics
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (mouse.isActive && distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;

        const repulsion = force * REPULSION_STRENGTH;
        p.vx -= forceDirectionX * repulsion * 3;
        p.vy -= forceDirectionY * repulsion * 3;
      }

      const springDx = p.originX - p.x;
      const springDy = p.originY - p.y;

      p.vx += springDx * RETURN_SPEED;
      p.vy += springDy * RETURN_SPEED;

      p.vx *= DAMPING;
      p.vy *= DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.2 + velocity * 0.08, 0.6);

      ctx.fillStyle = p.color.includes('#')
        ? `${p.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
        : p.color;

      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, [colors]);

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        initParticles(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  // Start Animation
  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  // Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
