import { errorResponse, successResponse } from "../../utils/api-response.js";
import { memberPayloadSchema } from "./members.validation.js";
import { membersService } from "./members.service.js";
export const membersController = {
    async listMembers(_req, res, next) {
        try {
            const members = await membersService.listMembers();
            res.json(successResponse("Members fetched successfully.", members));
        }
        catch (error) {
            next(error);
        }
    },
    async getMyProfile(req, res, next) {
        try {
            const authenticatedRequest = req;
            const profile = await membersService.getMemberByUserId(authenticatedRequest.auth.user.id);
            if (!profile) {
                res.status(404).json(errorResponse("Profile not found."));
                return;
            }
            res.json(successResponse("Profile fetched successfully.", profile));
        }
        catch (error) {
            next(error);
        }
    },
    async createMyProfile(req, res, next) {
        try {
            const authenticatedRequest = req;
            const existingProfile = await membersService.getMemberByUserId(authenticatedRequest.auth.user.id);
            if (existingProfile) {
                res.status(409).json(errorResponse("Profile already exists."));
                return;
            }
            const payload = memberPayloadSchema.parse(req.body);
            const createdProfile = await membersService.createMember({
                userId: authenticatedRequest.auth.user.id,
                email: authenticatedRequest.auth.user.email,
                name: payload.name,
                admission: payload.admission,
                role: payload.role,
                frameworks: payload.frameworks,
                languages: payload.languages,
                otherSkills: payload.otherSkills,
                banner: payload.banner,
                pfp: payload.pfp,
                pfpPublicId: payload.pfpPublicId,
                permission: authenticatedRequest.auth.user.role ?? "user",
                socialLinks: payload.socialLinks,
            });
            res.status(201).json(successResponse("Profile created successfully.", createdProfile));
        }
        catch (error) {
            next(error);
        }
    },
    async updateMyProfile(req, res, next) {
        try {
            const authenticatedRequest = req;
            const payload = memberPayloadSchema.parse(req.body);
            const existingProfile = await membersService.getMemberByUserId(authenticatedRequest.auth.user.id);
            if (!existingProfile) {
                res.status(404).json(errorResponse("Profile not found."));
                return;
            }
            const updatedProfile = await membersService.updateMemberByUserId(authenticatedRequest.auth.user.id, {
                email: authenticatedRequest.auth.user.email,
                name: payload.name,
                admission: payload.admission,
                role: payload.role,
                frameworks: payload.frameworks,
                languages: payload.languages,
                otherSkills: payload.otherSkills,
                banner: payload.banner,
                pfp: payload.pfp,
                pfpPublicId: payload.pfpPublicId,
                permission: authenticatedRequest.auth.user.role ?? "user",
                socialLinks: payload.socialLinks,
            });
            res.json(successResponse("Profile updated successfully.", updatedProfile));
        }
        catch (error) {
            next(error);
        }
    },
};
