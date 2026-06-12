import mananLogo from "@/assets/manan.svg";

const contacts = [
  { name: "Vaibhav", phone: "+91 8168326332" },
  { name: "Kavya Gupta", phone: "+91 7906640652" },
  { name: "Shubham", phone: "+91 8222835995" },
];

const socials = [
  { href: "https://www.instagram.com/manantechnosurge/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/manan-ymca", label: "LinkedIn" },
  {
    href: "https://www.youtube.com/channel/UC_wkbc5yiQyol-ONyVdcE4w",
    label: "YouTube",
  },
];

const metaLinks = [
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/50 backdrop-blur-lg px-4 md:px-8 lg:px-12">
      <div className="border-x px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <img src={mananLogo} alt="Manan logo" className="size-6" />
              <span>Manan Website</span>
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div className="space-y-2">
              <p className="text-sm font-medium text-black/70 dark:text-white/70">
                Contact
              </p>
              <div className="space-y-1">
                {contacts.map(({ name, phone }) => (
                  <a
                    key={name}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {name} &mdash; {phone}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-black/70 dark:text-white/70">
                Meta
              </p>
              <div className="space-y-1">
                {metaLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="block text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="-mx-4 mt-8 border-t px-4 pt-4 text-center text-sm text-black/50 dark:border-white/10 dark:text-white/50 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
          Made by Manan &mdash; A Techno Surge
        </div>
      </div>


    </footer>
  );
}
