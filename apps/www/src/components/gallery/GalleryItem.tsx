import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type GalleryItemProps = {
  imageUrl: string;
  name: string;
  description?: string;
};

export function GalleryItem({ imageUrl, name, description }: GalleryItemProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative w-full overflow-hidden rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`Open ${name}`}
        >
          <img
            src={imageUrl}
            alt={name}
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-400 rounded-xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 px-4 text-center">
            <h3 className="text-white font-semibold tracking-widest uppercase text-sm mb-2">
              {name}
            </h3>
            {description && (
              <p className="text-white/80 text-xs">{description}</p>
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] gap-3 p-3 sm:max-w-5xl">
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <img
          src={imageUrl}
          alt={name}
          className="max-h-[calc(100vh-9rem)] w-full object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
