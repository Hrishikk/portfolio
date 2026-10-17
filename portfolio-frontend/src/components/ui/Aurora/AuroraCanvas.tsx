import { useEffect, useRef } from 'react';
import { useTheme } from '@/theme/useTheme';

/** Internal resolution: the gradients are smooth, so a small canvas upscaled by CSS looks identical and costs little. */
const WIDTH = 320;
const HEIGHT = 180;
/** Cap the animation at ~30fps; the motion is slow, more frames buy nothing. */
const FRAME_MS = 33;
/** Time multiplier: one full drift of the colour field takes roughly a minute. */
const SPEED = 0.00011;

interface Blob {
  color: [number, number, number];
  ax: number;
  ay: number;
  fx: number;
  fy: number;
  phase: number;
  radius: number;
}

function parseHex(value: string): [number, number, number] {
  const hex = value.replace('#', '').trim();
  const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Reads the aurora palette from the theme tokens so light and dark each get their own field. */
function readPalette() {
  const css = getComputedStyle(document.documentElement);
  const read = (name: string) => css.getPropertyValue(name).trim();
  const colors = [1, 2, 3, 4, 5].map((i) => parseHex(read(`--aurora-${i}`)));
  const blobs: Blob[] = colors.map((color, i) => ({
    color,
    ax: 0.32 + (i % 3) * 0.08,
    ay: 0.28 + (i % 2) * 0.12,
    fx: 0.7 + i * 0.23,
    fy: 0.9 + i * 0.17,
    phase: i * 1.7,
    radius: 0.42 + (i % 2) * 0.1,
  }));
  return { base: read('--aurora-base'), blobs };
}

/**
 * A slowly drifting mesh of soft colour (the hero's "living" band).
 * Pauses off screen and in background tabs; draws a single still frame under reduced motion.
 */
export function AuroraCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const { base, blobs } = readPalette();
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = (time: number) => {
      const t = time * SPEED;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      for (const b of blobs) {
        const x = WIDTH * (0.5 + b.ax * Math.sin(t * b.fx + b.phase));
        const y = HEIGHT * (0.5 + b.ay * Math.cos(t * b.fy + b.phase));
        const r = WIDTH * b.radius;
        const [red, green, blue] = b.color;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgb(${red} ${green} ${blue} / 0.95)`);
        g.addColorStop(0.55, `rgb(${red} ${green} ${blue} / 0.35)`);
        g.addColorStop(1, `rgb(${red} ${green} ${blue} / 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }
    };

    // Start mid-drift so the first frame is already a composed field, not the blobs' origin.
    const offset = 18000;
    if (still) {
      draw(offset);
      return;
    }

    let frame = 0;
    let last = 0;
    let visible = true;

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(now + offset);
    };

    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    draw(offset);
    start();
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [theme]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
