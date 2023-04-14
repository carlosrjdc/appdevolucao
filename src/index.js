import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { InfoProvider } from "./context";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import router from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InfoProvider>
      <ReactNotifications />
      <RouterProvider router={router} />
    </InfoProvider>
  </React.StrictMode>
);
