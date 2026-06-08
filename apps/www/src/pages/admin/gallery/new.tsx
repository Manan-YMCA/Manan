import { NewGalleryItemForm } from "@/components/gallery/NewGalleryItemForm";

export function NewGalleryItem() {
  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Add Image</h1>
      <NewGalleryItemForm />
    </div>
  );
}
