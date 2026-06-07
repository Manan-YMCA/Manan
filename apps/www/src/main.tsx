import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from './pages';
import { Members } from './pages/members';
import { Events } from './pages/events';
import { Gallery } from './pages/gallery';
import { Layout } from './layout';
import { AdminLayout } from './admin-layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/members", element: <Members /> },
      { path: "/events", element: <Events /> },
      { path: "/gallery", element: <Gallery /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
