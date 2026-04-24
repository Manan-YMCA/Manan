import { cloudinary } from "../config/cloudinary.js";
import { env } from "../config/env.js";
export const uploadBufferToCloudinary = (buffer, options) => new Promise((resolve, reject) => {
    if (!env.CLOUDINARY_CLOUD_NAME ||
        !env.CLOUDINARY_API_KEY ||
        !env.CLOUDINARY_API_SECRET) {
        reject(new Error("Cloudinary credentials are missing."));
        return;
    }
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error || !result) {
            reject(error || new Error("Cloudinary upload failed."));
            return;
        }
        resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
        });
    });
    stream.end(buffer);
});
