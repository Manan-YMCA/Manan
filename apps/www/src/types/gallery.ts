export type GalleryItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  timestamp: string;
};

export type ApiGalleryItem = GalleryItem;

export type GalleryPage = { data: GalleryItem[]; total: number };
