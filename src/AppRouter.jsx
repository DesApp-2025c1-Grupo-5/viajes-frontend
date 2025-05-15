import { Route, Routes } from "react-router-dom";
import VehiculosPage from "./pages/VehiculosPage";
import ChoferesPage from "./pages/ChoferesPage";
import DepositosPage from "./pages/DepositosPage";
import TransportistasPage from "./pages/TransportistasPage";
import ViajesPage from "./pages/ViajesPage";
import DashboardPage from "./pages/DashboardPage";
import NuevoChoferPage from "./pages/nuevoPages/NuevoChoferPage";
import NuevoDepositoPage from "./pages/nuevoPages/NuevoDepositoPage";
import NuevoTransportistaPage from "./pages/nuevoPages/NuevoTransportistaPage";
import NuevoVehiculoPage from "./pages/nuevoPages/NuevoVehiculoPage";
import NuevoViajePage from "./pages/nuevoPages/NuevoViajePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/vehiculos" element={<VehiculosPage />} />
      <Route path="/choferes" element={<ChoferesPage />} />
      <Route path="/depositos" element={<DepositosPage />} />
      <Route path="/transportistas" element={<TransportistasPage />} />
      <Route path="/viajes" element={<ViajesPage />} />
      <Route path="/nuevoChofer" element={<NuevoChoferPage />} />
      <Route path="/nuevoDeposito" element={<NuevoDepositoPage />} />
      <Route path="/nuevoTransportista" element={<NuevoTransportistaPage />} />
      <Route path="/nuevoVehiculo" element={<NuevoVehiculoPage />} />
      <Route path="/nuevoViaje" element={<NuevoViajePage />} />
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}
