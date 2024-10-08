import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function RouteConfig() {
  return <RouterProvider router={router} />;
}

export default RouteConfig;