import Layout from "../components/Layout";
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
    const resultadoFiltro = vehiculos.filter((texto) =>
      `${texto.patente} ${texto.marca} ${texto.modelo} ${texto.año} ${texto.capacidad} ${texto.tipo_de_vehiculo} ${texto.nombre_transportista}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
    setVehiculosFiltrado(resultadoFiltro);
  }, [busqueda, vehiculos]);

  return (
    <Layout>
      <div className="flex">
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
              vehiculos={vehiculosFiltrado}
              setVehiculos={setVehiculos}
              setVehiculosFiltrado={setVehiculosFiltrado}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehiculosPage;
