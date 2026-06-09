import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/hooks/admin/api";
import type { UploadResult } from "@/types/admin";

type SignatureResponse = {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
};

async function uploadToCloudinary(file: File): Promise<UploadResult> {
  const { signature, timestamp, cloudName, apiKey, folder } =
    await apiPost<SignatureResponse>("/api/upload/signature", { folder: "manan" });

  const form = new FormData();
  form.append("file", file);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("api_key", apiKey);
  form.append("signature", signature);

  return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  })
    .catch(() => { throw new Error("Network error during upload"); })
    .then((res) =>
      res
        .json()
        .catch(() => { throw new Error(`Upload failed with status ${res.status}`); })
        .then((json) => {
          if (!res.ok) throw new Error(json.error?.message ?? "Upload failed");
          return { url: json.secure_url, publicId: json.public_id } as UploadResult;
        }),
    );
}

export function useUploadImage() {
  return useMutation({ mutationFn: uploadToCloudinary });
}
