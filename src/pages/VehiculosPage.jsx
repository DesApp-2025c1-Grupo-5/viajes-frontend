import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import TablaVehiculos from "../components/TablaVehiculos";
import SearchBar from "../components/SearchBar"
import TableTitle from "../components/TableTitle"
import New from "../components/New"


const tablaVehiculos = [{
    patente: 1234,
    modelo: "Volvo FH342",
    anio: "2020",
    capacidad: "32 toneladas",
    tipo: "Camion",
    transportista: "Transportes Rápidos S.A"
},
{
    patente: 3333,
    modelo: "Mercedes-Benz Actros",
    anio: "2021",
    capacidad: "882 toneladas",
    tipo: "Camion",
    transportista: "LogiExpress"  
},
{
    patente: 34342,
    modelo: "Scania R450",
    anio: "2003",
    capacidad: "912 toneladas",
    tipo: "Camion",
    transportista: "Transportes Rápidos S.A"
},]

const VehiculosPage = () => {
     return (
        <>
        <Header></Header>
        <div className = "flex">
        <div>
            <NavBar />
        </div>
        <div className="flex-1 p-6">
            <Title color="text-red-500" title="Vehículos" description="Gestiona los vehículos de la empresa"></Title>
            <div>
                <div className="flex items-center justify-between">
                    <TableTitle color="text-gray-700" title="Lista de vehículos" description="Todos los vehículos registrados en el sistema"></TableTitle>
                    <New path="/nuevoVehiculo" bgColor="bg-red-500"></New>
                </div>
                <SearchBar></SearchBar>
                <TablaVehiculos vehiculos={tablaVehiculos}/>
            </div>
            
        </div>
      </div>
    </>
    );
}
 
export default VehiculosPage;



