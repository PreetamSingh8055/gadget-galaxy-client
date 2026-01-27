import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import "./index.css";

import App from "./App.jsx";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>
  </StrictMode>
);
