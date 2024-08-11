import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Home />,
  },
]);

function RouteConfig() {
  return <RouterProvider router={router} />;
}

export default RouteConfig;