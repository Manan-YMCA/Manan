import { useRef } from "react";
import { useUploadImage } from "@/hooks/admin";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (url: string, publicId: string) => void;
};

export function ImageUploadField({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadImage();

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    upload.mutate(file, {
      onSuccess: ({ url, publicId }) => onChange(url, publicId),
    });
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={upload.isPending}
        onClick={() => inputRef.current?.click()}
      >
        {upload.isPending ? "Uploading…" : "Choose image"}
      </Button>
      {value && (
        <img
          src={value}
          alt="Preview"
          className="h-32 w-full object-cover rounded-md"
        />
      )}
      {upload.isError && (
        <p className="text-xs text-destructive">{upload.error.message}</p>
      )}
    </div>
  );
}
