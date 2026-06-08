export type AdminSummary = {
  counts: {
    members: number;
    events: number;
    gallery: number;
  };
};

export type UploadResult = {
  url: string;
  publicId: string;
};
