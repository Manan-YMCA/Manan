export type MemberCardData = {
  name: string;
  role: string;
  pfp: string;
  banner: string;
  languages: string;
  frameworks: string;
  otherSkills: string;
  socialLinks: { title: string; link: string }[];
};

export type PublicMember = {
  id: string;
  name: string;
  image: string | null;
  role: string;
  admissionYear: number;
  designation: string;
  techStack: string;
  languages: string;
  otherSkills: string;
  bannerUrl: string;
  socialLinks: { title: string; link: string }[];
};

export type CreateMemberInput = {
  name: string;
  email: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  banned: boolean;
  banReason: string | null;
  createdAt: string;
};

export type MembersPage = { data: Member[]; total: number };
