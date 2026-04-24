import { errorResponse } from "../utils/api-response.js";
export const requireSelfOrAdmin = (getOwnerId) => {
    return (req, res, next) => {
        if (req.auth.user.role === "admin") {
            next();
            return;
        }
        const ownerId = getOwnerId(req);
        if (!ownerId || ownerId !== req.auth.user.id) {
            res.status(403).json(errorResponse("You can only access your own data."));
            return;
        }
        next();
    };
};
