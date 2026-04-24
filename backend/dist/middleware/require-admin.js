import { errorResponse } from "../utils/api-response.js";
export const requireAdmin = (req, res, next) => {
    const authenticatedRequest = req;
    if (authenticatedRequest.auth.user.role !== "admin") {
        res.status(403).json(errorResponse("Admin access required."));
        return;
    }
    next();
};
