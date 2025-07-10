import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Card from "../components/Card";
import { Map, Home, User, Building, Truck } from "lucide-react";
import empresasTransportistasService from "../services/EmpresasTransportistasService";
import depositosServices from "../services/DepositosService";
import choferesServices from "../services/ChoferesService";
import vehiculosServices from "../services/VehiculosService";
import viajesServices from "../services/ViajesService";

const DashboardPage = () => {
  const [cantidadDeEmpresas, setCantidadDeEmpresas] = useState(0);
  const [cantidadDeDepositos, setCantidadDeDepositos] = useState(0);
  const [cantidadDeChoferes, setCantidadDeChoferes] = useState(0);
  const [cantidadDeVehiculos, setCantidadDeVehiculos] = useState(0);
  const [cantidadDeViajes, setCantidadDeViajes] = useState(0);

  useEffect(() => {
    const actualizarCantidadDeEntidadesActivas = async () => {
      try {
        const [
          empresasActivas,
          depositosActivos,
          choferesActivos,
          vehiculosActivos,
          viajesActivos,
        ] = await Promise.all([
          empresasTransportistasService.getCountEmpresasActivas(),
          depositosServices.getCountDepositosActivos(),
          choferesServices.getCountChoferesActivos(),
          vehiculosServices.getCountVehiculosActivos(),
          viajesServices.getCountViajesActivos(),
        ]);

        setCantidadDeEmpresas(empresasActivas);
        setCantidadDeDepositos(depositosActivos);
        setCantidadDeChoferes(choferesActivos);
        setCantidadDeVehiculos(vehiculosActivos);
        setCantidadDeViajes(viajesActivos);
      } catch (error) {
        console.error("Error cargando datos dashboard", error);
      }
    };
    actualizarCantidadDeEntidadesActivas();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-6">
          <Title
            color="text-blue-600"
            title="Dashboard"
            description="Bienvenidos al sistema de Logística Acme SRL"
          ></Title>
          <div className="grid grid-cols-1 max-w-5xl">
            <Card
              alto="h-30"
              tituloDeLaCarta="Viajes"
              cantidad={cantidadDeViajes}
              bgIcono="bg-pink-100"
              colorIcono="text-pink-500"
              colorBorde="border-pink-300"
              colorPlus="bg-pink-300"
              colorHover="hover:bg-pink-400"
              icono={Map}
              path="/nuevoViaje"
              pathSeccion="/viajes"
            ></Card>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <Card
                alto="h-40"
                tituloDeLaCarta="Vehículos"
                cantidad={cantidadDeVehiculos}
                bgIcono="bg-red-100"
                colorBorde="border-red-400"
                colorPlus="bg-red-400"
                colorIcono="text-red-400"
                colorHover="hover:bg-red-600"
                icono={Truck}
                path="/nuevoVehiculo"
                pathSeccion="/vehiculos"
              />
              <Card
                alto="h-40"
                tituloDeLaCarta="Choferes disponibles"
                cantidad={cantidadDeChoferes}
                bgIcono="bg-emerald-100"
                colorBorde="border-emerald-400"
                colorIcono="text-emerald-500"
                colorPlus="bg-emerald-400"
                colorHover="hover:bg-emerald-500"
                icono={User}
                path="/nuevoChofer"
                pathSeccion="/choferes"
              />
              <Card
                alto="h-40"
                tituloDeLaCarta="Depósitos"
                cantidad={cantidadDeDepositos}
                bgIcono="bg-orange-100"
                colorBorde="border-orange-400"
                colorPlus="bg-orange-400"
                colorIcono="text-orange-500"
                colorHover="hover:bg-orange-500"
                icono={Home}
                path="/nuevoDeposito"
                pathSeccion="/depositos"
              />
              <Card
                alto="h-40"
                tituloDeLaCarta="Empresas transportistas"
                cantidad={cantidadDeEmpresas}
                bgIcono="bg-purple-100"
                colorBorde="border-purple-400"
                colorPlus="bg-purple-400"
                colorIcono="text-purple-500"
                colorHover="hover:bg-purple-500"
                icono={Building}
                path="/nuevoTransportista"
                pathSeccion="/transportistas"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
