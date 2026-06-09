import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { authClient } from "@/lib/auth-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout = lazy(() => import("@/layout"));
const AdminLayout = lazy(() => import("@/admin-layout"));

const Home = lazy(() => import("@/pages/index"));
const Members = lazy(() => import("@/pages/members"));
const Events = lazy(() => import("@/pages/events"));
const Gallery = lazy(() => import("@/pages/gallery"));
const Login = lazy(() => import("@/pages/login"));
const Profile = lazy(() => import("@/pages/profile"));

const AdminDashboard = lazy(() => import("@/pages/admin/index"));
const AdminMembers = lazy(() => import("@/pages/admin/members/index"));
const NewMember = lazy(() => import("@/pages/admin/members/new"));
const AdminEvents = lazy(() => import("@/pages/admin/events/index"));
const NewEvent = lazy(() => import("@/pages/admin/events/new"));
const EditEvent = lazy(() => import("@/pages/admin/events/edit"));
const AdminGallery = lazy(() => import("@/pages/admin/gallery/index"));
const NewGalleryItem = lazy(() => import("@/pages/admin/gallery/new"));

const router = createBrowserRouter([
  {
    element: (
      <Suspense>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/members",
        element: (
          <Suspense>
            <Members />
          </Suspense>
        ),
      },
      {
        path: "/events",
        element: (
          <Suspense>
            <Events />
          </Suspense>
        ),
      },
      {
        path: "/gallery",
        element: (
          <Suspense>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense>
        <AdminLayout />
      </Suspense>
    ),
    loader: async () => {
      const { data: session } = await authClient.getSession();
      if (!session) return redirect("/login");
      if (session.user.role !== "admin") return redirect("/");
      return null;
    },
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "members",
        element: (
          <Suspense>
            <AdminMembers />
          </Suspense>
        ),
      },
      {
        path: "members/new",
        element: (
          <Suspense>
            <NewMember />
          </Suspense>
        ),
      },
      {
        path: "events",
        element: (
          <Suspense>
            <AdminEvents />
          </Suspense>
        ),
      },
      {
        path: "events/new",
        element: (
          <Suspense>
            <NewEvent />
          </Suspense>
        ),
      },
      {
        path: "events/:id",
        element: (
          <Suspense>
            <EditEvent />
          </Suspense>
        ),
      },
      {
        path: "gallery",
        element: (
          <Suspense>
            <AdminGallery />
          </Suspense>
        ),
      },
      {
        path: "gallery/new",
        element: (
          <Suspense>
            <NewGalleryItem />
          </Suspense>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
