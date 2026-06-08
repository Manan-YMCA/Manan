export type Event = {
  name: string;
  date: string;
  description: string;
  banner: string;
  eventReport?: string;
  activityReport?: string;
};

export type ApiEvent = {
  id: string;
  name: string;
  desc: string;
  eventDate: string;
  eventImage: string;
  eventlinks: { activityReport: string; eventReport: string };
  timestamp: string;
};

export type EventLinks = {
  activityReport: string;
  eventReport: string;
};

export type AdminEvent = {
  id: string;
  name: string;
  desc: string;
  eventDate: string;
  eventImage: string;
  eventlinks: EventLinks;
  timestamp: string;
};

export type EventsPage = { data: AdminEvent[]; total: number };

export type CreateEventInput = {
  name: string;
  date: string;
  desc: string;
  activityReportLink: string;
  eventReportLink: string;
  eventImage: string;
  eventImagePublicId: string;
};
