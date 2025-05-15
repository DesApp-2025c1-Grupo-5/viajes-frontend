import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import TablaChoferes from "../components/TablaChoferes";
import SearchBar from "../components/SearchBar"
import TableTitle from "../components/TableTitle"
import New from "../components/New"


const tablaChoferes = [{
    licencia: 1234,
    nombre: "Juan Perez",
    fecha_nacimiento: "30-10-1979",
    dni: 3288912,
    vehiculo: "ABC-123",
    transportista: "Transportes Rápidos S.A"
},
{
    licencia: 3333,
    nombre: "Gaston Arevalo",
    fecha_nacimiento: "14-3-1967",
    dni: 3288912,
    vehiculo: "DEF-657",
    transportista: "LogiExpress"  
},
{
    licencia: 1234,
    nombre: "María López",
    fecha_nacimiento: "30-04-2003",
    dni: 3288912,
    vehiculo: "HGI-564",
    transportista: "Transportes Rápidos S.A"
},]

const ChoferesPage = () => {
     return (
        <>
        <Header></Header>
        <div className = "flex">
        <div>
            <NavBar />
        </div>
        <div className="flex-1 p-6">
            <Title color="text-emerald-400" title="Choferes" description="Gestiona los choferes de la empresa"></Title>
            <div>
                <div className="flex items-center justify-between">
                    <TableTitle color="text-gray-700" title="Lista de choferes" description="Todos los choferes registrados en el sistema"></TableTitle>
                    <New path="/nuevoChofer" bgColor="bg-emerald-400"></New>
                </div>
                <SearchBar></SearchBar>
                <TablaChoferes choferes={tablaChoferes}/>
            </div>
            
        </div>
      </div>
    </>
    );
}
 
export default ChoferesPage;