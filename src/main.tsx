import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import MainContainer from "./pages/main/MainContainer.tsx";
import CartContainer from "./pages/cart/CartContainer.tsx";
import "react-toastify/dist/ReactToastify.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import RootLayout from "./layouts/RootLayout.tsx";
import RegisterContainer from "./pages/user/RegisterContainer.tsx";

const persistor = persistStore(store);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<MainContainer />} />
      <Route path="/app" element={<App />} />
      <Route path="/cart" element={<CartContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
