import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import Card from "../components/Card";
import { Map, Home, User, Building, Truck } from "lucide-react";

const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <div>
          <NavBar />
        </div>
        <div className="flex-1 p-6">
          <Title
            color="text-blue-600"
            title="Dashboard"
            description="Bienvenidos al sistema de logística Acme SRL"
          ></Title>
          <Card
            ancho="max-w-3xl"
            alto="h-15"
            tituloDeLaCarta="Viajes en curso"
            cantidad="10"
            bgIcono="bg-pink-100"
            colorIcono="text-pink-500"
            colorBorde="border-pink-300"
            colorPlus="bg-pink-300"
            colorHover="hover:bg-pink-500"
            icono={Map}
            path="/nuevoViaje"
          ></Card>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Card
              ancho="max-w-sm"
              alto="h-40"
              tituloDeLaCarta="Vehículos activos"
              cantidad="42"
              bgIcono="bg-red-100"
              colorBorde="border-red-500"
              colorPlus="bg-red-500"
              colorIcono="text-red-500"
              colorHover="hover:bg-red-700"
              icono={Truck}
              path="/nuevoVehiculo"
            />
            <Card
              ancho="max-w-sm"
              alto="h-40"
              tituloDeLaCarta="Choferes disponibles"
              cantidad="18"
              bgIcono="bg-emerald-100"
              colorBorde="border-emerald-400"
              colorIcono="text-emerald-500"
              colorPlus="bg-emerald-400"
              colorHover="hover:bg-emerald-600"
              icono={User}
              path="/nuevoChofer"
            />
            <Card
              ancho="max-w-sm"
              alto="h-40"
              tituloDeLaCarta="Depósitos"
              cantidad="10"
              bgIcono="bg-orange-100"
              colorBorde="border-orange-400"
              colorPlus="bg-orange-400"
              colorIcono="text-orange-500"
              colorHover="hover:bg-orange-500"
              icono={Home}
              path="/nuevoDeposito"
            />
            <Card
              ancho="max-w-sm"
              alto="h-40"
              tituloDeLaCarta="Empresas transportistas"
              cantidad="6"
              bgIcono="bg-purple-100"
              colorBorde="border-purple-400"
              colorPlus="bg-purple-400"
              colorIcono="text-purple-500"
              colorHover="hover:bg-purple-600"
              icono={Building}
              path="/nuevoTransportista"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
