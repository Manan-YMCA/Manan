import {
  forwardRef,
  useRef,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/utils";
import {
  useAsciiField,
  type UseAsciiFieldOptions,
} from "@/hooks/useAsciiField";

export interface AsciiHeroProps
  extends ComponentPropsWithoutRef<"div">,
  UseAsciiFieldOptions {
  variant?: "panel" | "bare";
}

export const AsciiHero = forwardRef<HTMLDivElement, AsciiHeroProps>(
  (
    {
      variant = "panel",
      cols,
      rows,
      fontSize,
      fontFamily,
      charRamp,
      colorful,
      palette,
      baseOpacity,
      reactive,
      rippleStrength,
      rippleRadius,
      spotlightOpacity,
      spotlightRadius,
      frameMs,
      className,
      ...rest
    },
    ref,
  ) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useAsciiField(canvasRef, hostRef, {
      cols,
      rows,
      fontSize,
      fontFamily,
      charRamp,
      colorful,
      palette,
      baseOpacity,
      reactive,
      rippleStrength,
      rippleRadius,
      spotlightOpacity,
      spotlightRadius,
      frameMs,
    });

    const setRef = (el: HTMLDivElement | null) => {
      hostRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref)
        (ref as React.RefObject<HTMLDivElement | null>).current = el;
    };

    return (
      <div
        ref={setRef}
        className={cn(
          "pui-ascii",
          variant === "panel" && "pui-ascii--panel",
          variant === "bare" && "pointer-events-none",
          className,
        )}
        aria-hidden="true"
        {...rest}
      >
        <canvas ref={canvasRef} className="absolute inset-0 block size-full border-x" />
      </div>
    );
  },
);
AsciiHero.displayName = "AsciiHero";
