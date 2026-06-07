type GalleryItem = {
  name: string;
  description: string;
  image: string;
  year: string;
};

const items: GalleryItem[] = [];

const years = [...new Set(items.map((i) => i.year))].sort().reverse();

export function Gallery() {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 pb-32">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Gallery</h1>
      <p className="text-black/50 dark:text-white/50 mb-12">Moments from our events.</p>

      {years.map((year) => (
        <div key={year} className="mb-16">
          <div className="flex items-center gap-3 pl-4 border-l-4 border-[#FB5343] mb-8">
            <span className="text-3xl font-bold text-[#FB5343]">{year}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items
              .filter((i) => i.year === year)
              .map((item) => (
                <div key={item.name} className="group relative overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-400 rounded-xl" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 px-4 text-center">
                    <h3 className="text-white font-semibold tracking-widest uppercase text-sm mb-2">{item.name}</h3>
                    <p className="text-white/80 text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
