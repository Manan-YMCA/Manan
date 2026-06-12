import { AsciiHero } from "@/components/home/AsciiHero";

const heroPalette = [
  "#1a0b5f",
  "#3423a6",
  "#4b5cff",
  "#4fb7ff",
  "#8fe7ff",
  "#e9fbff",
  "#ffffff",
  "#fff6c8",
  "#ffe08a",
  "#ffbf5a",
  "#ff8a2a",
  "#f04414",
  "#9f1d0f",
];

const lightHeroPalette = [
  "#eef4ff",
  "#b7ccff",
  "#7fa3ff",
  "#4f7fff",
  "#245dff",
  "#00d8ff",
  "#ffffff",
  "#ffff9e",
  "#ffd93d",
  "#ffb000",
  "#ff7a00",
  "#ff4500",
  "#e00000",
];


export function HomeHero() {
  return (
    <div className="relative border-x border-cyan-200/20 dark:border-cyan-100/10">
      <AsciiHero
        variant="bare"
        palette={lightHeroPalette}
        baseOpacity={0.67}
        spotlightOpacity={0.99}
        spotlightRadius={10}
        fontSize={16}
        frameMs={42}
        className="absolute inset-0 -mt-3 sm:mt-0 dark:hidden"
      />
      <AsciiHero
        variant="bare"
        palette={heroPalette}
        baseOpacity={0.23}
        spotlightOpacity={0.7}
        spotlightRadius={10}
        fontSize={16}
        frameMs={42}
        className="absolute inset-0 -mt-3 hidden sm:mt-0 dark:block"
      />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] flex-col justify-between px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16">
        <div>
          <h1
            className="text-black dark:text-white text-[clamp(3.5rem,18vw,7.5rem)] font-bold leading-none tracking-tight"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Manan
          </h1>
          <p
            className="mt-2 text-base tracking-wide sm:text-lg md:text-2xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            A Technosurge
          </p>
        </div>
        <div className="max-w-xl self-end pl-8 text-right sm:pl-12">
          <p
            className="text-xs leading-relaxed tracking-wide sm:text-sm md:text-base"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            "Technical society of YMCA University of Science and Technology -
            fostering knowledge through tech-talks, workshops, hackathons, and
            more."
          </p>
        </div>
      </section>
    </div>
  );
}
