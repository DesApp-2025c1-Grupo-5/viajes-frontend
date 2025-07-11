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

  const [totalElementos, setTotalElementos] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const limitePorPagina = 6;

  useEffect(() => {
    const obtenerTransportistas = async () => {
      try {
        const datos = await transportistaService.getAll();
        setTransportistas(datos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
      } catch (error) {
        console.log(error);
      }
    };
    obtenerTransportistas();
  }, []);

   useEffect(() => {
    setTotalElementos(transportistasFiltrado.length);
  }, [transportistasFiltrado]);

  const elementosPaginados = transportistasFiltrado.slice(
    (paginaActual - 1) * limitePorPagina,
    paginaActual * limitePorPagina
  );

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
              transportistas={elementosPaginados}
              setTransportistas={setTransportistas}
              setTransportistasFiltrado={setTransportistasFiltrado}
            />
            {transportistasFiltrado.length ? (
              
                <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Anterior
              </button>

              <span className="text-gray-700">
                Página {paginaActual} de {Math.ceil(totalElementos / limitePorPagina)}
              </span>
              <button
                onClick={() =>
                setPaginaActual((prev) =>
                prev < Math.ceil(totalElementos / limitePorPagina) ? prev + 1 : prev
                )
                }
                disabled={paginaActual >= Math.ceil(totalElementos / limitePorPagina)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
            ):("")}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransportistasPage;
