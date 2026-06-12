import type { ElementType } from "react";
import {
  BarChart3,
  Brain,
  Cloud,
  Code2,
  Gamepad2,
  Globe,
  Hexagon,
  Palette,
  Pen,
  Server,
  Shield,
  Smartphone,
} from "lucide-react";

const specialties: { Icon: ElementType; title: string }[] = [
  { Icon: Palette, title: "Graphic Designers" },
  { Icon: Globe, title: "Web Developers" },
  { Icon: Smartphone, title: "App Developers" },
  { Icon: Pen, title: "UI/UX Designers" },
  { Icon: Code2, title: "Programmers" },
  { Icon: Hexagon, title: "Blockchain Developers" },
  { Icon: BarChart3, title: "Data Scientists" },
  { Icon: Brain, title: "ML Engineers" },
  { Icon: Gamepad2, title: "Game Developers" },
  { Icon: Server, title: "DevOps Engineers" },
  { Icon: Cloud, title: "Cloud Architects" },
  { Icon: Shield, title: "Cybersecurity Analysts" },
];

export function SpecialtiesMarquee() {
  return (
    <div className="relative border-x border-y overflow-hidden py-5">
      <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="marquee-track flex w-max text-xs md:text-sm font-semibold text-black dark:text-white uppercase tracking-[0.2em]">
        <SpecialtiesGroup />
        <SpecialtiesGroup ariaHidden />
      </div>
    </div>
  );
}

function SpecialtiesGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="marquee-group flex shrink-0 gap-12 pr-12 md:gap-16 md:pr-16"
      aria-hidden={ariaHidden}
    >
      {specialties.map((specialty) => (
        <span key={specialty.title} className="shrink-0 flex items-center gap-3 md:gap-4">
          <specialty.Icon
            className="size-4 shrink-0 text-[#FB5343]"
            strokeWidth={2}
          />
          {specialty.title}
        </span>
      ))}
    </div>
  );
}
