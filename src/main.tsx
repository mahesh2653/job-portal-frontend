import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthLayout from "./layout/AuthLayout";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <AuthLayout>
          <App />
        </AuthLayout>
        <ToastContainer />
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
