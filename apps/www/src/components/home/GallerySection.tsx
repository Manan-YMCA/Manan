import { GalleryItem } from "@/components/gallery/GalleryItem";
import { GalleryItemSkeleton } from "@/components/gallery/GalleryItemSkeleton";
import { useGallery } from "@/hooks/use-gallery";

export function GallerySection() {
  const { data: items = [], isLoading } = useGallery();
  const display = items.slice(0, 6);

  return (
    <section className="p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h2
          className="text-2xl md:text-3xl font-bold text-black dark:text-white tracking-tight"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Gallery
        </h2>
        <a href="/gallery" className="text-sm text-[#FB5343] hover:underline font-medium">
          View all {"->"}
        </a>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <GalleryItemSkeleton key={index} />
          ))}
        </div>
      ) : display.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {display.map((item) => (
            <GalleryItem
              key={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No gallery images yet.</p>
        </div>
      )}
    </section>
  );
}
