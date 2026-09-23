import "core-js/es/array/at";
import "core-js/es/string/at";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { message, notification } from "antd";

message.config({
  maxCount: 1,
  duration: 2,
});

notification.config({
  maxCount: 1,
  duration: 2,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
