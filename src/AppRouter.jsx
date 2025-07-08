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
import EdithVehiculo from "./pages/editPages/EdithVehiculo";
import EdithChofer from "./pages/editPages/EdithChofer";
import EditarDepositosPage from "./pages/editPages/EdithDeposito";
import EditarTransportistasPage from "./pages/editPages/EdithTransportista";
import EditarViajePage from "./pages/editPages/EdithViajes";
import ViewVehiculo from "./pages/viewPages/ViewVehiculoPage";
import ViewChofer from "./pages/viewPages/ViewChoferPage";
import ViewDeposito from "./pages/viewPages/ViewDepositoPage";
import ViewEmpresaTransportistasPage from "./pages/viewPages/ViewEmpresaTransportistasPage";
import ViewViajePage from "./pages/viewPages/ViewViajePage";
import ViewViaje from "./pages/viewPages/ViewViajePage";


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
      <Route path="/vehiculos/:id" element={<EdithVehiculo />} />
      <Route path="/choferes/:id" element={<EdithChofer />}></Route>
      <Route path="/depositos/:id" element={<EditarDepositosPage />}></Route>
      <Route path="/viajes/:id" element={<EditarViajePage />}></Route>
      <Route
        path="/transportistas/:id"
        element={<EditarTransportistasPage />}
      ></Route>
      <Route path="vehiculos/view/:id" element={<ViewVehiculo />}></Route>
      <Route path="/choferes/view/:id" element={<ViewChofer />}></Route>
      <Route path="/depositos/view/:id" element={<ViewDeposito />}></Route>
      <Route path="/viajes/view/:id" element={<ViewViaje/>}></Route>
      <Route
        path="transportistas/view/:id"
        element={<ViewEmpresaTransportistasPage />}
      ></Route>
      <Route
        path="/empresasTransportistas/:id"
        element={<EditarTransportistasPage />}
      ></Route>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}
