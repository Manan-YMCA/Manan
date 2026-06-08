export type GalleryItem = {
  id: string;
  name: string;
  desc: string;
  imageUrl: string;
  timestamp: string;
};

export type ApiGalleryItem = GalleryItem;

export type GalleryPage = { data: GalleryItem[]; total: number };

export type CreateGalleryInput = {
  name: string;
  desc: string;
  image: string;
  imagePublicId?: string;
};
