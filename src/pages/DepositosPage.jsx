import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import TablaDepositos from "../components/TablaDepositos";
import SearchBar from "../components/SearchBar"
import TableTitle from "../components/TableTitle"
import New from "../components/New"


const tablaDepositos = [{
    nombre: "Deposito Central",
    direccion: "Av.Principal 123",
    provincia: "Buenos Aires",
    pais: "Argentina",
    contacto: "+54 113459232",
 
},
{
    nombre: "Deposito Sur",
    direccion: "Av. Tecnológica 456",
    provincia: "Jalisco",
    pais: "México",
    contacto: "+52 33 8765-4321"
 
},
{
    nombre: "Deposito Norte",
    direccion: "Av. de la Industria 1234",
    provincia: "Buenos Aires",
    pais: "Argentina",
    contacto: "+54 11 4567-8900",

},]

const DepositosPage = () => {
     return (
        <>
        <Header></Header>
        <div className = "flex">
        <div>
            <NavBar />
        </div>
        <div className="flex-1 p-6">
            <Title color="text-orange-400" title="Depósitos" description="Gestiona los depósitos de la empresa"></Title>
            <div>
                <div className="flex items-center justify-between">
                    <TableTitle color="text-gray-700" title="Lista de depósitos" description="Todos los depósitos registrados en el sistema"></TableTitle>
                    <New path="/nuevoDeposito" bgColor="bg-orange-400"></New>
                </div>
                <SearchBar></SearchBar>
                <TablaDepositos depositos={tablaDepositos}/>
            </div>
            
        </div>
      </div>
    </>
    );
}
 
export default DepositosPage;