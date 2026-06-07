import { Card } from "@/components/ui/card";

export type Member = {
  name: string;
  role: string;
  pfp: string;
  banner: string;
  languages: string;
  frameworks: string;
  otherSkills: string;
  socialLinks: { title: string; link: string }[];
};

export function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="overflow-hidden bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 backdrop-blur-sm">
      <div className="aspect-[3/1] w-full overflow-hidden bg-slate-300 dark:bg-slate-700">
        <img src={member.banner} alt="banner" className="h-full w-full object-cover object-top" />
      </div>

      <div className="px-4">
        <div className="flex items-end justify-between -mt-16 mb-3">
          <div className="shrink-0 aspect-square size-24 overflow-hidden rounded-full border-4 border-white dark:border-neutral-900 bg-slate-300 dark:bg-slate-700">
            <img src={member.pfp} alt={member.name} className="h-full w-full object-cover object-center" />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {member.socialLinks.map(({ title, link }) => (
              <a
                key={title}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full border border-black/20 dark:border-white/20 px-3 py-1 text-xs font-medium transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white"
              >
                {title}
              </a>
            ))}
          </div>
        </div>

        <h2 className="text-base font-bold text-black dark:text-white leading-tight">{member.name}</h2>
        <p className="text-sm text-black/50 dark:text-white/50 mb-3">{member.role}</p>

        <div className="space-y-1.5 pb-3 text-sm text-gray-700 dark:text-gray-300 border-t border-black/10 dark:border-white/10 pt-3">
          <p><span className="font-semibold text-black dark:text-white">Languages: </span>{member.languages}</p>
          <p><span className="font-semibold text-black dark:text-white">Tech Stack: </span>{member.frameworks}</p>
          <p><span className="font-semibold text-black dark:text-white">Other Skills: </span>{member.otherSkills}</p>
        </div>

      </div>
    </Card>
  );
}
