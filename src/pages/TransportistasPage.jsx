import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import TablaTransportistas from "../components/TablaTransportistas";
import SearchBar from "../components/SearchBar";
import TableTitle from "../components/TableTitle";
import New from "../components/New";

const tablatransportistas = [
  {
    razon_social: "Logística del Sur S.A.",
    cuit: "30-70985643-2",
    domicilio_fiscal: "Av. San Martín 4521, Rosario, Santa Fe",
    telefono: "+54 341 456-7890",
    email: "contacto@logisticasur.com.ar",
  },
  {
    razon_social: "Alimentos Naturales SRL",
    cuit: "33-60598421-9",
    domicilio_fiscal: "Calle Belgrano 123, Córdoba Capital, Córdoba",
    telefono: "+54 351 432-1098",
    email: "info@alimentosnaturales.com",
  },
  {
    razon_social: "Grupo TecnoData S.A.",
    cuit: "30-67891234-5",
    domicilio_fiscal: "Av. Corrientes 987, CABA",
    telefono: "+54 11 4455-8899",
    email: "soporte@tecnodata.com.ar",
  },
];

const TransportistasPage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex">
        <div>
          <NavBar />
        </div>
        <div className="flex-1 p-6">
          <Title
            color="text-purple-400"
            title="Transportistas"
            description="Gestiona los transportistas de la empresa"
          ></Title>
          <div>
            <div className="flex items-center justify-between">
              <TableTitle
                color="text-gray-700"
                title="Lista de transportistas"
                description="Todos los transportistas registrados en el sistema"
              ></TableTitle>
              <New
                path="/nuevoTransportista"
                bgColor="bg-purple-400"
                colorHover="hover:bg-purple-600"
              ></New>
            </div>
            <SearchBar></SearchBar>
            <TablaTransportistas transportistas={tablatransportistas} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TransportistasPage;
