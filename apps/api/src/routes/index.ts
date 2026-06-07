import { Router } from "express";
import { membersRoutes } from "../modules/members/members.routes.js";
import { eventsRoutes } from "../modules/events/events.routes.js";
import { galleryRoutes } from "../modules/gallery/gallery.routes.js";
import { adminRoutes } from "../modules/admin/admin.routes.js";

const apirouter = Router();

apirouter.use("/members", membersRoutes);
apirouter.use("/events", eventsRoutes);
apirouter.use("/gallery", galleryRoutes);
apirouter.use("/admin", adminRoutes);

export default apirouter;
