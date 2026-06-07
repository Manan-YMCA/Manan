import { MemberCard, type Member } from "@/components/MemberCard";

export type MemberWithYear = Member & { admission: string };

const members: MemberWithYear[] = [];

const years = [...new Set(members.map((m) => m.admission))].sort().reverse();

export function Members() {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 pb-32">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Members</h1>
      <p className="text-black/50 dark:text-white/50 mb-12">The people behind Manan.</p>

      {years.map((year) => (
        <div key={year} className="mb-16">
          <div className="flex items-center gap-3 pl-4 border-l-4 border-[#FB5343] mb-8">
            <span className="text-3xl font-bold text-[#FB5343]">{year}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {members
              .filter((m) => m.admission === year)
              .map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
