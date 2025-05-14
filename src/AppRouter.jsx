import {
  Route,
  Routes,
}from "react-router-dom";
import VehiculosPage from "./pages/VehiculosPage";
import ChoferesPage from "./pages/ChoferesPage";
import DepositosPage from "./pages/DepositosPage";
import TransportistasPage from "./pages/TransportistasPage";
import ViajesPage from "./pages/ViajesPage";
import DashboardPage from "./pages/DashboardPage";
import NuevoViajePage from "./pages/NuevoViajePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/vehiculos" element={<VehiculosPage />} />
      <Route path="/choferes" element={<ChoferesPage />} />
      <Route path="/depositos" element={<DepositosPage />} />
      <Route path="/transportistas" element={<TransportistasPage />} />
      <Route path="/viajes" element={<ViajesPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/nuevoViaje" element={<NuevoViajePage/>} />
    </Routes>
  );
}
