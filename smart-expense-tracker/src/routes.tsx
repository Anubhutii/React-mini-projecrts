import { createBrowserRouter } from "react-router-dom";

import Home from "./components/layout/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Update_Expense";
import Analytics from "./pages/Analytics";
import Layout from "./components/layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/update_expense",
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