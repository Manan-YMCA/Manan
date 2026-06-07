import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { authClient } from "./lib/auth-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from './pages';
import { Members } from './pages/members';
import { Events } from './pages/events';
import { Gallery } from './pages/gallery';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Layout } from './layout';
import { AdminLayout } from './admin-layout';
import { AdminDashboard } from './pages/admin/index';
import { AdminMembers } from './pages/admin/members/index';
import { NewMember } from './pages/admin/members/new';
import { AdminEvents } from './pages/admin/events/index';
import { NewEvent } from './pages/admin/events/new';
import { EditEvent } from './pages/admin/events/edit';
import { AdminGallery } from './pages/admin/gallery/index';
import { NewGalleryItem } from './pages/admin/gallery/new';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/members", element: <Members /> },
      { path: "/events", element: <Events /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: async () => {
      const { data: session } = await authClient.getSession();
      if (!session) return redirect("/login");
      if (session.user.role !== "admin") return redirect("/");
      return null;
    },
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "members", element: <AdminMembers /> },
      { path: "members/new", element: <NewMember /> },
      { path: "events", element: <AdminEvents /> },
      { path: "events/new", element: <NewEvent /> },
      { path: "events/:id", element: <EditEvent /> },
      { path: "gallery", element: <AdminGallery /> },
      { path: "gallery/new", element: <NewGalleryItem /> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
