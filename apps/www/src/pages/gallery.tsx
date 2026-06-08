import { useGallery } from "@/hooks/use-gallery";
import { GalleryItem } from "@/components/gallery/GalleryItem";
import { GalleryItemSkeleton } from "@/components/gallery/GalleryItemSkeleton";

export function Gallery() {
  const { data: items = [], isLoading } = useGallery();

  const years = [...new Set(
    items.map((i) => new Date(i.timestamp).getFullYear().toString())
  )].sort().reverse();

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 pb-32">
      <h1 className="text-4xl font-bold mb-2">Gallery</h1>
      <p className="text-muted-foreground mb-12">Moments from our events.</p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <GalleryItemSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">No gallery items yet.</p>
      ) : (
        years.map((year) => (
          <div key={year} className="mb-16">
            <div className="flex items-center gap-3 pl-4 border-l-4 border-[#FB5343] mb-8">
              <span className="text-3xl font-bold text-[#FB5343]">{year}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items
                .filter((i) => new Date(i.timestamp).getFullYear().toString() === year)
                .map((item) => (
                  <GalleryItem
                    key={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    desc={item.desc}
                  />
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Gallery;
