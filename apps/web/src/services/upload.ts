import imageCompression from "browser-image-compression";
import api from "./api";

export async function uploadImage(file, folder) {
  const compressedFile = await imageCompression(file, {
    maxSizeMB: folder === "gallery" ? 0.2 : 0.1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });

  const formData = new FormData();
  formData.append("image", compressedFile);
  formData.append("folder", folder);

  const response = await api.post("/uploads/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
}
