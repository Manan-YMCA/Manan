export type Event = {
  name: string;
  venue: string;
  date: string;
  description: string;
  banner: string;
  eventReport?: string | null;
  activityReport?: string | null;
};

export type ApiEvent = {
  id: string;
  name: string;
  venue: string;
  description: string;
  fromDate: string;
  toDate: string;
  imageUrl: string;
  activityReportUrl: string | null;
  eventReportUrl: string | null;
  timestamp: string;
};

export type AdminEvent = {
  id: string;
  name: string;
  venue: string;
  description: string;
  fromDate: string;
  toDate: string;
  imageUrl: string;
  activityReportUrl: string | null;
  eventReportUrl: string | null;
  timestamp: string;
};

export type EventsPage = { data: AdminEvent[]; total: number };
