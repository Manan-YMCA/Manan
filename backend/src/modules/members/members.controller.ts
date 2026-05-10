import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/api-response.js";
import { AuthenticatedRequest } from "../../middleware/require-session.js";
import { memberPayloadSchema } from "./members.validation.js";
import { membersService } from "./members.service.js";

const buildMemberPayload = (
  req: AuthenticatedRequest,
  payload: ReturnType<typeof memberPayloadSchema.parse>
) => {
  const resolvedPassOutYear = payload.passOutYear ?? payload.admission!;

  return {
    name: payload.name,
    admission: resolvedPassOutYear,
    passOutYear: resolvedPassOutYear,
    batchDate: `${resolvedPassOutYear}-01-01`,
    role: payload.role,
    frameworks: payload.frameworks,
    languages: payload.languages,
    otherSkills: payload.otherSkills,
    banner: payload.banner,
    pfp: payload.pfp,
    pfpPublicId: payload.pfpPublicId,
    permission: req.auth.user.role ?? "user",
    socialLinks: payload.socialLinks,
  };
};

export const membersController = {
  async listMembers(_req: Request, res: Response, next: NextFunction) {
    try {
      const members = await membersService.listMembers();
      res.json(successResponse("Members fetched successfully.", members));
    } catch (error) {
      next(error);
    }
  },

  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticatedRequest = req as AuthenticatedRequest;
      const profile = await membersService.getMemberByUserId(
        authenticatedRequest.auth.user.id
      );
      res.json(
        successResponse(
          profile ? "Profile fetched successfully." : "Profile not created yet.",
          profile ?? null
        )
      );
    } catch (error) {
      next(error);
    }
  },

  async createMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticatedRequest = req as AuthenticatedRequest;
      const payload = memberPayloadSchema.parse(req.body);
      const result = await membersService.saveMemberForUser(
        {
          userId: authenticatedRequest.auth.user.id,
          email: authenticatedRequest.auth.user.email,
        },
        buildMemberPayload(authenticatedRequest, payload)
      );

      res
        .status(result.created ? 201 : 200)
        .json(
          successResponse(
            result.created
              ? "Profile created successfully."
              : "Profile updated successfully.",
            result.member
          )
        );
    } catch (error) {
      next(error);
    }
  },

  async updateMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticatedRequest = req as AuthenticatedRequest;
      const payload = memberPayloadSchema.parse(req.body);
      const result = await membersService.saveMemberForUser(
        {
          userId: authenticatedRequest.auth.user.id,
          email: authenticatedRequest.auth.user.email,
        },
        buildMemberPayload(authenticatedRequest, payload)
      );

      res.json(successResponse("Profile updated successfully.", result.member));
    } catch (error) {
      next(error);
    }
  },
};
