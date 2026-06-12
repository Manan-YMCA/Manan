import { useEffect, useMemo } from "react";
import type { RefObject } from "react";

export interface UseAsciiFieldOptions {
  cols?: number;
  rows?: number;
  fontSize?: number;
  fontFamily?: string;
  charRamp?: string;
  colorful?: boolean;
  palette?: string[];
  baseOpacity?: number;
  reactive?: boolean;
  rippleStrength?: number;
  rippleRadius?: number;
  spotlightOpacity?: number;
  spotlightRadius?: number;
  frameMs?: number;
}

const DEFAULT_RAMP =
  " .`'\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

const DEFAULT_PALETTE = ["#a78bfa", "#ec4899", "#67e8f9", "#fbbf24"];

function mixHexColor(from: string, to: string, amount: number) {
  const a = parseHexColor(from);
  const b = parseHexColor(to);
  if (!a || !b) return from;

  const r = Math.round(a[0] + (b[0] - a[0]) * amount);
  const g = Math.round(a[1] + (b[1] - a[1]) * amount);
  const bl = Math.round(a[2] + (b[2] - a[2]) * amount);

  return `rgb(${r}, ${g}, ${bl})`;
}

function parseHexColor(value: string) {
  const hex = value.replace("#", "");
  if (hex.length !== 6) return null;

  return [
    Number.parseInt(hex.slice(0, 2), 16),
    Number.parseInt(hex.slice(2, 4), 16),
    Number.parseInt(hex.slice(4, 6), 16),
  ] as const;
}

export function useAsciiField(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  hostRef: RefObject<HTMLElement | null>,
  options: UseAsciiFieldOptions = {},
): void {
  const {
    cols: colsOpt,
    rows: rowsOpt,
    fontSize = 11,
    fontFamily = "JetBrains Mono, ui-monospace, monospace",
    charRamp = DEFAULT_RAMP,
    colorful = false,
    palette: paletteOpt,
    baseOpacity = 1,
    reactive = true,
    rippleStrength = 1.4,
    rippleRadius = 6,
    spotlightOpacity,
    spotlightRadius = 8,
    frameMs = 50,
  } = options;

  const palette = useMemo<string[] | null>(
    () => paletteOpt ?? (colorful ? DEFAULT_PALETTE : null),
    [paletteOpt, colorful],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lastFrame = 0;
    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let baseField = new Float32Array(0);
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };

    const seed = () => {
      baseField = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = (x / cols) * 2 - 1;
          const ny = (y / rows) * 2 - 1;
          const r = Math.sqrt(nx * nx + ny * ny);
          const stripes = 0.5 + 0.5 * Math.sin(nx * 6 + ny * 2);
          const radial = 1 - Math.min(1, r * 1.2);
          baseField[y * cols + x] = 0.25 * stripes + 0.55 * radial;
        }
      }
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = "top";

      const m = ctx.measureText("M");
      const measured = m.width || fontSize * 0.6;
      cellW = measured;
      cellH = fontSize * 1.15;

      cols = colsOpt ?? Math.max(1, Math.floor(rect.width / cellW));
      rows = rowsOpt ?? Math.max(1, Math.floor(rect.height / cellH));

      if (colsOpt !== undefined) cellW = rect.width / cols;
      if (rowsOpt !== undefined) cellH = rect.height / rows;

      seed();
    };

    const render = (t: number) => {
      if (t - lastFrame < frameMs) {
        raf = requestAnimationFrame(render);
        return;
      }
      lastFrame = t;
      if (cols === 0 || rows === 0) {
        resize();
        raf = requestAnimationFrame(render);
        return;
      }

      const time = t * 0.001;
      const rect = canvas.getBoundingClientRect();
      const cx = (mouse.x - rect.left) / cellW;
      const cy = (mouse.y - rect.top) / cellH;
      const margin = 24;
      const mouseInside =
        mouse.x >= rect.left - margin &&
        mouse.x <= rect.right + margin &&
        mouse.y >= rect.top - margin &&
        mouse.y <= rect.bottom + margin;

      ctx.clearRect(0, 0, rect.width, rect.height);

      const rampMax = charRamp.length - 1;
      const useSpotlight =
        typeof spotlightOpacity === "number" &&
        spotlightOpacity !== baseOpacity;
      const spotR2 = spotlightRadius * spotlightRadius * 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const base = baseField[y * cols + x];
          const wave =
            0.15 *
            Math.sin(x * 0.18 + time * 1.4) *
            Math.cos(y * 0.22 - time * 1.1);

          const dx = x - cx;
          const dy = (y - cy) * 1.8;
          const d2 = dx * dx + dy * dy;
          const d = Math.sqrt(d2);

          const ripple =
            reactive && mouseInside
              ? rippleStrength * Math.exp(-d2 / 80) -
                0.6 *
                  Math.exp(
                    -((d - rippleRadius) * (d - rippleRadius)) / 30,
                  )
              : 0;

          const v = Math.max(0, Math.min(1, base + wave + ripple));
          const ch = charRamp[Math.floor(v * rampMax)];
          if (ch === " ") continue;

          let alpha = baseOpacity;
          if (useSpotlight && mouseInside) {
            const spot = Math.exp(-d2 / spotR2);
            alpha = baseOpacity + (spotlightOpacity! - baseOpacity) * spot;
            if (alpha < 0) alpha = 0;
            if (alpha > 1) alpha = 1;
          }
          if (alpha <= 0.01) continue;

          let color = "#c8c8d4";
          if (palette && palette.length) {
            const huePos = Math.abs(
              (x * 0.05 + y * 0.035 + time * 0.08) % palette.length,
            );
            const idx = Math.floor(huePos);
            const nextIdx = (idx + 1) % palette.length;
            color = mixHexColor(
              palette[idx % palette.length],
              palette[nextIdx],
              huePos - idx,
            );
          }

          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx.fillText(ch, x * cellW, y * cellH);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    if (reactive) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (reactive) {
        window.removeEventListener("mousemove", onMove);
      }
    };
  }, [
    canvasRef,
    hostRef,
    colsOpt,
    rowsOpt,
    fontSize,
    fontFamily,
    charRamp,
    palette,
    baseOpacity,
    reactive,
    rippleStrength,
    rippleRadius,
    spotlightOpacity,
    spotlightRadius,
    frameMs,
  ]);
}
