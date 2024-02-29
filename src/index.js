import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
let query = new QueryClient();
root.render(
  <QueryClientProvider client={query}>
    <App />
  </QueryClientProvider>
);
