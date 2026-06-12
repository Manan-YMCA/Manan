import { usePublicMembers } from "@/hooks/use-members";
import { MemberCard } from "@/components/members/MemberCard";
import { MemberSkeleton } from "@/components/members/MemberSkeleton";

export function Members() {
  const { data: members = [], isLoading } = usePublicMembers();

  const years = [...new Set(members.map((m) => m.admissionYear))]
    .sort()
    .reverse();

  return (
    <div className="mx-auto border-x px-4 py-12 pb-32 sm:px-8 md:px-12 lg:px-20">
      <h1 className="text-4xl font-bold mb-2">Members</h1>
      <p className="text-muted-foreground mb-12">The people behind Manan.</p>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <MemberSkeleton key={i} />
          ))}
        </div>
      ) : members.length === 0 ? (
        <p className="text-muted-foreground">No members yet.</p>
      ) : (
        years.map((year) => (
          <div key={year} className="mb-16">
            <div className="flex items-center gap-3 pl-4 border-l-4 border-[#FB5343] mb-8">
              <span className="text-3xl font-bold text-[#FB5343]">{year}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {members
                .filter((m) => m.admissionYear === year)
                .map((member) => (
                  <MemberCard
                    key={member.id}
                    member={{
                      name: member.name,
                      role: member.designation,
                      pfp:
                        member.image ??
                        `https://avatar.vercel.sh/${encodeURIComponent(member.name)}`,
                      banner: member.bannerUrl,
                      languages: member.languages,
                      frameworks: member.techStack,
                      otherSkills: member.otherSkills,
                      socialLinks: member.socialLinks ?? [],
                    }}
                  />
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Members;
