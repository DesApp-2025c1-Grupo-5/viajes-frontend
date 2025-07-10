import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import TablaVehiculos from "../components/TablaVehiculos";
import SearchBar from "../components/SearchBar";
import TableTitle from "../components/TableTitle";
import New from "../components/New";
import { useEffect, useState } from "react";
import vehiculosService from "../services/VehiculosService";

const VehiculosPage = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [vehiculosFiltrado, setVehiculosFiltrado] = useState([]);

  const [totalElementos, setTotalElementos] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const limitePorPagina = 6;

  useEffect(() => {
    const obtenerVehiculos = async () => {
      try {
        const datos = await vehiculosService.getAll();
        setVehiculos(datos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerVehiculos();
  }, []);

   useEffect(() => {
    setTotalElementos(vehiculosFiltrado.length);
  }, [vehiculosFiltrado]);

  const elementosPaginados = vehiculosFiltrado.slice(
    (paginaActual - 1) * limitePorPagina,
    paginaActual * limitePorPagina
  );

  useEffect(() => {
    const resultadoFiltro = vehiculos.filter((texto) =>
      `${texto.patente} ${texto.marca} ${texto.modelo} ${texto.año} ${texto.capacidad} ${texto.tipo_de_vehiculo} ${texto.nombre_transportista}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
    setVehiculosFiltrado(resultadoFiltro);
  }, [busqueda, vehiculos]);

  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <Title
            color="text-red-400"
            title="Vehículos"
            description="Gestiona los vehículos de la empresa"
          ></Title>
          <div>
            <div className="flex items-center justify-between">
              <TableTitle
                color="text-gray-700"
                title="Lista de vehículos"
                description="Todos los vehículos registrados en el sistema"
              ></TableTitle>
              <New
                path="/nuevoVehiculo"
                bgColor="bg-red-400"
                colorHover="hover:bg-red-500"
              ></New>
            </div>
            <SearchBar onSearch={setBusqueda} />
            <TablaVehiculos
              vehiculos={elementosPaginados}
              setVehiculos={setVehiculos}
              setVehiculosFiltrado={setVehiculosFiltrado}
            />
            {vehiculosFiltrado.length ? (
              
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
    </>
  );
};

export default VehiculosPage;
