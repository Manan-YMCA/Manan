import { ZodError } from "zod";
import { errorResponse } from "../utils/api-response.js";
export const errorHandler = (error, _req, res, _next) => {
    if (error instanceof ZodError) {
        res.status(400).json(errorResponse("Validation failed.", error.flatten()));
        return;
    }
    if (error instanceof Error) {
        res.status(400).json(errorResponse(error.message));
        return;
    }
    res.status(500).json(errorResponse("Internal server error."));
};
