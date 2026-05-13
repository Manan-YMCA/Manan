export const successResponse = (message: string, data: unknown) => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, details?: unknown) => ({
  success: false,
  message,
  details,
});
