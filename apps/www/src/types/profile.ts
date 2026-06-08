export type SocialLink = { title: string; link: string };

export type UserProfile = {
  name: string;
  image: string | null;
  admissionYear: number;
  rollNumber: string;
  graduationYear: number;
  designation: string;
  techStack: string;
  languages: string;
  otherSkills: string;
  bannerUrl: string;
  socialLinks: SocialLink[];
};

export type ProfileInput = {
  name: string;
  image: string | null;
  admissionYear: number;
  rollNumber: string;
  graduationYear: number;
  designation: string;
  techStack: string;
  languages: string;
  otherSkills: string;
  bannerUrl: string;
  socialLinks: SocialLink[];
};
