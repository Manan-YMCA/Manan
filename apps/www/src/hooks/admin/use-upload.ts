import { useMutation } from "@tanstack/react-query";
import type { UploadResult } from "@/types/admin";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
if (!cloudName || !uploadPreset) {
  throw new Error("VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET must be set");
}

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

async function uploadToCloudinary(file: File): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);

  return fetch(CLOUDINARY_URL, { method: "POST", body: form })
    .catch(() => { throw new Error("Network error during upload"); })
    .then((res) =>
      res.json()
        .catch(() => { throw new Error(`Upload failed with status ${res.status}`); })
        .then((json) => {
          if (!res.ok) throw new Error(json.error?.message ?? "Upload failed");
          return { url: json.secure_url, publicId: json.public_id } as UploadResult;
        })
    );
}

export function useUploadImage() {
  return useMutation({ mutationFn: uploadToCloudinary });
}
