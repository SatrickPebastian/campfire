import App from "./pages/Home/App.tsx";
import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell, MantineProvider } from "@mantine/core";
import AppNavbar from "./components/AppNavbar.tsx";
import RobotsPage from "./pages/Robots/Overview/index.tsx";
import CreateRobot from "./pages/Robots/Create/index.tsx";
import UpdateRobot from "./pages/Robots/Update/index.tsx";
import ImagesPage from "./pages/Images/Overview/index.tsx";
import UploadFile from "./pages/Images/Upload/index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider>
          <AppShell padding="md" navbar={<AppNavbar />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="robots" element={<RobotsPage />} />
              <Route path="robots/create" element={<CreateRobot />} />
              <Route path="robots/:robotID/update" element={<UpdateRobot />} />
              <Route path="images" element={<ImagesPage />} />
              <Route path="images/upload" element={<UploadFile />} />
              <Route path="robots/create" element={<CreateRobot />} />
            </Routes>
          </AppShell>
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
