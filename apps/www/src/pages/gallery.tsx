import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

type ApiGalleryItem = {
  id: string;
  name: string;
  desc: string;
  imageUrl: string;
  timestamp: string;
};

function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/gallery?limit=100`)
        .catch(() => { throw new Error("Network error"); });
      const json = await res.json()
        .catch(() => { throw new Error(`Request failed with status ${res.status}`); });
      if (!res.ok) throw new Error(json.message || "Request failed");
      return json.data.data as ApiGalleryItem[];
    },
  });
}

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
            <Skeleton key={i} className="aspect-video w-full rounded-xl" />
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
                  <div key={item.id} className="group relative overflow-hidden rounded-xl">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-400 rounded-xl" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 px-4 text-center">
                      <h3 className="text-white font-semibold tracking-widest uppercase text-sm mb-2">{item.name}</h3>
                      {item.desc && <p className="text-white/80 text-xs">{item.desc}</p>}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
