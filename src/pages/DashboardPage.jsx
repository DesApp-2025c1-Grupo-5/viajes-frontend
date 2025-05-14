import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import Card from "../components/Card"

const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className = "flex">
        <div>
            <NavBar />
        </div>
        <div className="flex-1 p-6">
            <Title color="text-blue-600" title="Dashboard" description="Bienvenidos al sistema de logistica Acme SRL"></Title>
            <Card ancho="max-w-3xl" alto="h-15" tituloDeLaCarta="Viajes en curso" cantidad ="10" colorBorde="border-pink-400" colorPlus="bg-pink-500"></Card>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Card ancho="max-w-sm" alto="h-40" tituloDeLaCarta="Vehículos activos" cantidad="42" colorBorde="border-red-400" colorPlus="bg-red-400" />
              <Card ancho="max-w-sm" alto="h-40" tituloDeLaCarta="Choferes disponibles" cantidad="18" colorBorde="border-green-400" colorPlus="bg-green-400" />
              <Card ancho="max-w-sm" alto="h-40" tituloDeLaCarta="Depósitos" cantidad="10" colorBorde="border-orange-400" colorPlus="bg-orange-400"/>
              <Card ancho="max-w-sm" alto="h-40" tituloDeLaCarta="Empresas transportistas" cantidad="6" colorBorde="border-purple-400" colorPlus="bg-purple-400"/>
            </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
