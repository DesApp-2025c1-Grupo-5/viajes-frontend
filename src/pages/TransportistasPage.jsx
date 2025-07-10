import Layout from "../components/Layout";
import Title from "../components/Title";
import TablaTransportistas from "../components/TablaTransportistas";
import SearchBar from "../components/SearchBar";
import TableTitle from "../components/TableTitle";
import New from "../components/New";
import { useEffect, useState } from "react";
import transportistaService from "../services/EmpresasTransportistasService";

const TransportistasPage = () => {
  const [transportistas, setTransportistas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [transportistasFiltrado, setTransportistasFiltrado] = useState([]);

  useEffect(() => {
    const obtenerTransportistas = async () => {
      try {
        const datos = await transportistaService.getAll();
        setTransportistas(datos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerTransportistas();
  }, []);

  useEffect(() => {
    const resultadoFiltro = transportistas.filter((texto) =>
      `${texto.razon_social} ${texto.cuit_rut} ${texto.domicilio_fiscal} ${texto.email} ${texto.telefono}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
    setTransportistasFiltrado(resultadoFiltro);
  }, [busqueda, transportistas]);

  return (
    <Layout>
      <div className="flex">
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
                colorHover="hover:bg-purple-500"
              ></New>
            </div>
            <SearchBar onSearch={setBusqueda} />
            <TablaTransportistas
              transportistas={transportistasFiltrado}
              setTransportistas={setTransportistas}
              setTransportistasFiltrado={setTransportistasFiltrado}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransportistasPage;
