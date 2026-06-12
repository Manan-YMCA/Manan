export function AboutSection() {
  return (
    <div className="grid gap-8 border-y p-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-center">
      <div className="space-y-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          We are <span className="bg-linear-to-r dark:from-violet-500 dark:via-cyan-300 dark:to-orange-400 bg-clip-text font-semibold text-transparent from-violet-700 via-cyan-500 to-orange-600">Manan</span>.
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-3xl flex flex-col gap-5">
          <div><span className="font-bold">Manan - A Techno Surge</span> is the premier student-led technical club at J.C. Bose
            University of Science and Technology (YMCA), Faridabad. Our core mission is simple: to harvest
            creativity, nurture engineering talent, and spread technical awareness
            among ingenious minds.</div>
          <div>
            We provide students with a collaborative platform to unlock their full
            potential, master real-world skills, and showcase their talents. From
            hands-on coding workshops and expert tech talks to high-stakes
            hackathons, competitive programming, and development projects - Manan
            shapes the next generation of industry-ready tech innovators.</div>
        </p>
      </div>

      <aside className="border p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FB5343]">
          Philosophy
        </p>
        <h3
          className="mt-3 text-2xl font-bold text-black dark:text-white"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Build. Share. Evolve.
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          We believe technology grows fastest in the open: through experiments,
          peer learning, useful failures, and projects that leave something
          better behind for the next team.
        </p>
      </aside>
    </div>
  );
}
