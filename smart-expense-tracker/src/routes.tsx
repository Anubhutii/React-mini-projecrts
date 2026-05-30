import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Layout from "./components/layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/reports",
    element: (
      <Layout>
        <Reports />
      </Layout>
    ),
  },
  {
    path: "/analytics",
    element: (
      <Layout>
        <Analytics />
      </Layout>
    ),
  },
]);