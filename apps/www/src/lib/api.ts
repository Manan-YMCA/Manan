const url = import.meta.env.VITE_API_URL;
if (!url) throw new Error("VITE_API_URL is not set");

export const API_URL: string = url;
