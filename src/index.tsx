import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App";
import "./App.css";
import VideoPlayerProvider from "./contexts/VideoPlayer";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <VideoPlayerProvider>
        <App />
        <Toaster />
      </VideoPlayerProvider>
    </React.StrictMode>
  );
}
