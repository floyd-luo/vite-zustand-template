import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
//StrictMode严格模式渲染两次 https://react.docschina.org/learn/synchronizing-with-effects
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
