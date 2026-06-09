import {
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";

const socials = [
  {
    href: "mailto:manantechnosurge@gmail.com",
    label: "Email",
    icon: <EnvelopeSimpleIcon size={20} />,
  },
  {
    href: "https://www.instagram.com/manantechnosurge/",
    label: "Instagram",
    icon: <InstagramLogoIcon size={20} />,
  },
  {
    href: "https://www.linkedin.com/company/manan-ymca",
    label: "LinkedIn",
    icon: <LinkedinLogoIcon size={20} />,
  },
  {
    href: "https://www.youtube.com/channel/UC_wkbc5yiQyol-ONyVdcE4w",
    label: "YouTube",
    icon: <YoutubeLogoIcon size={20} />,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/50 backdrop-blur-lg px-6 py-4 flex items-center justify-between">
      <p className="text-sm text-black/50 dark:text-white/50">
        © {new Date().getFullYear()} Manan — A Techno Surge
      </p>
      <div className="flex items-center gap-4">
        {socials.map(({ href, label, icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="text-black/50 dark:text-white/50 transition-colors hover:text-black dark:hover:text-white"
          >
            {icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
