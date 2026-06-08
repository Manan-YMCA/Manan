type GalleryItemProps = {
  imageUrl: string;
  name: string;
  desc?: string;
};

export function GalleryItem({ imageUrl, name, desc }: GalleryItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      <img
        src={imageUrl}
        alt={name}
        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-400 rounded-xl" />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 px-4 text-center">
        <h3 className="text-white font-semibold tracking-widest uppercase text-sm mb-2">{name}</h3>
        {desc && <p className="text-white/80 text-xs">{desc}</p>}
      </div>
    </div>
  );
}
