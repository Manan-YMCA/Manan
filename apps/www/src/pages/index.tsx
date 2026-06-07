import { ChevronDown } from "lucide-react";

export function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="flex flex-col items-center leading-tight">
          <span className="bg-gradient-to-r from-[#7747cd] to-[#f8514b] bg-clip-text text-transparent text-[80px] font-bold tracking-wide md:text-[120px]">
            Manan
          </span>
          <span className="bg-gradient-to-r from-[#7747cd] to-[#f8514b] bg-clip-text text-transparent text-[42px] font-light tracking-wide md:text-[75px]">
            A Techno Surge
          </span>
        </div>
        <div className="animate-chevron mt-12 flex flex-col items-center gap-1 text-sm text-black/50 dark:text-white/50">
          <span>Know More</span>
          <ChevronDown className="size-4" />
        </div>
      </section>

      <div className="px-4 pb-32 sm:px-8 md:px-12 lg:px-20 py-20">
        <div className="rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/5 p-8 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-lg md:text-xl font-medium leading-relaxed">
          <p>
            <strong className="text-black dark:text-white">
              We are the Technical Society of YMCA University of Science and Technology
            </strong>
            , believes in rising by the means of learning ever so more. The word Manan comes from Sanskrit
            and it means deep thought, contemplation, or profound reflection. We are proud of our culture
            wherein we share our knowledge between people to gather more perspective towards things.
            <br />
            <br />
            <strong className="text-black dark:text-white">
              That's why we organise, and also take part in tech-talks, workshops, hackathons, coding
              contests, gaming events, and much more.
            </strong>
          </p>
        </div>

        {features.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col pt-20 ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
          >
            <div className="flex h-72 flex-1 items-center justify-center">
              <iframe
                title={item.title}
                className="relative h-full w-full z-10 pointer-events-none"
                src={item.frame}
              />
            </div>
            <div className="flex flex-1 items-center justify-center px-4 md:px-8">
              <div className="rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/5 px-6 py-5 backdrop-blur-sm">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-200 md:text-2xl">
                  <span className="flex items-center gap-2 text-[#FB5343] font-bold text-2xl md:text-4xl mb-2">
                    {item.title}
                  </span>
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    frame: "https://embed.lottiefiles.com/animation/55932",
    title: "We are Programmers",
    subtitle:
      "Our members are proficient in various programming languages and excel in coding competitions around the world like code hash and ICPC etc.",
    reverse: false,
  },
  {
    frame: "https://embed.lottiefiles.com/animation/96512",
    title: "We are Developers",
    subtitle:
      "We have one of the best developers in various domains such as Web, Mobile, Blockchain, etc and exploring various domains such as data science and machine learning.",
    reverse: true,
  },
  {
    frame: "https://embed.lottiefiles.com/animation/89964",
    title: "We are Designers",
    subtitle:
      "Our Designers stays up to date with the latest trend in web designing, graphic designing and have great skills in software like Figma and Photoshop.",
    reverse: false,
  },
];
