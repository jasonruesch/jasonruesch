import { scan } from "react-scan"; // Must be imported before React and React DOM

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";
import App from "./app.tsx";
import "./index.css";
import { isScanEnabled } from "./utils.ts";

scan({ enabled: isScanEnabled() });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
