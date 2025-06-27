import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import HackContextProvider from "../context/HackContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HackContextProvider>
      <App />
    </HackContextProvider>
  </BrowserRouter>
);
