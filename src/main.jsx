import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.jsx";
import { router } from "./Routes/AppRoutes.jsx";

export const getStore = () => store;

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  // </StrictMode>,
);
