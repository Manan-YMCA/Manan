import multer from "multer";
import { uploadBufferToCloudinary } from "../../utils/cloudinary-upload.js";
const storage = multer.memoryStorage();
export const uploadImageMiddleware = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
export const uploadImageFile = async (file, folder) => {
    if (!file?.buffer) {
        throw new Error("Image file is required.");
    }
    const normalizedFolder = folder.trim().toLowerCase();
    const upload = await uploadBufferToCloudinary(file.buffer, {
        folder: `manan-website/${normalizedFolder}`,
        resource_type: "image",
    });
    return {
        secureUrl: upload.secure_url,
        publicId: upload.public_id,
    };
};
