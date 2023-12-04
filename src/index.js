import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import MachinesPage from "./pages/admin/machines.page";
import Auth0 from "./components/auth0";
import LoginPage from "./pages/login.page";
import EstablishmentsPage from "./pages/admin/establishments.page";
import MachinesProfilePage from "./pages/machine-profile.page";
import UserProfilePage from "./pages/user-profile.page";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <UserProfilePage />,
      },
      {
        path: "/user/profile",
        element: <UserProfilePage />,
      },
      {
        path: "/machines",
        element: <MachinesPage />,
      },
      {
        path: "/establishments",
        element: <EstablishmentsPage />,
      },
      {
        path: "/machine/:machineId",
        element: <MachinesProfilePage />,
      },
      {
        path: "/404",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth0>
          <RouterProvider router={router} />
        </Auth0>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
