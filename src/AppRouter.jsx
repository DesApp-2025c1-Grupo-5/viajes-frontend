import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Box } from "@mui/material";

import VehiculosPage from "./pages/VehiculosPage";
import ChoferesPage from "./pages/ChoferesPage";
import DepositosPage from "./pages/DepositosPage";
import TransportistasPage from "./pages/TransportistasPage";
import ViajesPage from "./pages/ViajesPage";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import DashboardPage from "./pages/DashboardPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/vehiculos" element={<VehiculosPage />} />
      <Route path="/choferes" element={<ChoferesPage />} />
      <Route path="/depositos" element={<DepositosPage />} />
      <Route path="/transportistas" element={<TransportistasPage />} />
      <Route path="/viajes" element={<ViajesPage />} />
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}
