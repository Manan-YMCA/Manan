import { allowlistService } from "../allowlist/allowlist.service.js";
import { membersService } from "../members/members.service.js";
import { eventsService } from "../events/events.service.js";
import { galleryService } from "../gallery/gallery.service.js";

export const adminService = {
  async getDashboardSummary() {
    const [members, events, gallery] = await Promise.all([
      membersService.listMembers(),
      eventsService.listEvents(),
      galleryService.listGallery(),
    ]);

    return {
      counts: {
        members: members.length,
        events: events.length,
        gallery: gallery.length,
      },
      allowlist: {
        admin: allowlistService.getAdminEmail(),
        users: allowlistService.getAllowedUserEmails(),
      },
    };
  },
};
