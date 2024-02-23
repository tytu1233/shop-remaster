import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Test from "./Test.tsx";

const RootLayout = React.lazy(() => import("./layouts/RootLayout.tsx"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/test",
    element: <Test />,
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
