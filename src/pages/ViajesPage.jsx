import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import TableTitle from "../components/TableTitle";
import New from "../components/New";
import TablaViajes from "../components/TablaViajes";
import { useEffect, useState } from "react";
import viajesService from "../services/ViajesService";

const ViajesPage = () => {
  
  const [viajes, setViajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [viajesFiltrado, setViajesFiltrado] = useState([]);

  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const datos = await viajesService.getAll();
        setViajes(datos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerViajes();
  }, []);

  useEffect(() => {
    const resultadoFiltro = viajes.filter((texto) =>
      `${texto.id} ${texto.origen} ${texto.destino} ${texto.fecha_salida} ${texto.fecha_llegada} ${texto.id_chofer}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
    setViajesFiltrado(resultadoFiltro);
  }, [busqueda, viajes]);

  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <Title
            color="text-pink-300"
            title="Viajes"
            description="Gestiona los viajes entre depósitos"
          ></Title>
          <div>
            <div className="flex items-center justify-between">
              <TableTitle
                color="text-gray-700"
                title="Lista de viajes"
                description="Todos los viajes registrados en el sistema"
              ></TableTitle>
              <New
                path="/nuevoViaje"
                bgColor="bg-pink-300"
                colorHover="hover:bg-pink-400"
              ></New>
            </div>
            <SearchBar onSearch={setBusqueda} />
            <TablaViajes viajes={viajesFiltrado} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViajesPage;
