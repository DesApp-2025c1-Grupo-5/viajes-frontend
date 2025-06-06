import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import TableTitle from "../components/TableTitle";
import New from "../components/New";
import TablaViajes from "../components/TablaViajes";
import { useEffect, useState } from "react";
import viajesService from "../services/ViajesService";
import FilterBar from "../components/FilterBar";

const ViajesPage = () => {
  const [viajes, setViajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [viajesFiltrado, setViajesFiltrado] = useState([]);

  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const datos = await viajesService.getAll();
        console.log(datos);
        console.log(JSON.stringify(datos));
        setViajes([
          {
            id: 1,
            origen: "Deposito Central",
            destino: "Deposito Norte",
            fecha_salida: "2023-04-12T00:00:00.000Z",
            fecha_llegada: "2023-04-25T00:00:00.000Z",
            id_vehiculo: 1,
            carga: "12",
            id_chofer: 1,
            estado: "Despachado",
            observaciones: "",
            createdAt: "2025-06-06T21:03:07.019Z",
            updatedAt: "2025-06-06T21:03:07.019Z",
            vehiculo: { patente: "1234" },
          },
          {
            id: 2,
            origen: "Deposito Sur",
            destino: "Deposito Central",
            fecha_salida: "2023-04-08T00:00:00.000Z",
            fecha_llegada: "2023-04-09T00:00:00.000Z",
            id_vehiculo: 1,
            carga: "soy una carga",
            id_chofer: 1,
            estado: "En Viaje",
            observaciones: "",
            createdAt: "2025-06-06T21:03:07.021Z",
            updatedAt: "2025-06-06T21:03:07.021Z",
            vehiculo: { patente: "1234" },
          },
          {
            id: 3,
            origen: "Deposito Norte",
            destino: "Deposito Sur",
            fecha_salida: "2023-04-15T00:00:00.000Z",
            fecha_llegada: null,
            id_vehiculo: 1,
            carga: "66",
            id_chofer: 1,
            estado: "Completo",
            observaciones: "",
            createdAt: "2025-06-06T21:03:07.022Z",
            updatedAt: "2025-06-06T21:03:07.022Z",
            vehiculo: { patente: "66634" },
          },
        ]);
        // setViajes(datos);
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
  const filtrarViajes = (filtros) => {
    const filteredViajes = viajes.filter((viaje) => {
      const {
        tipoDeViaje,
        fechaSalida,
        nroViaje,
        empresa,
        chofer,
        patente,
        provinciaOrigen,
        provinciaDestino,
      } = filtros;

      const inicioViaje = new Date(viaje.fecha_salida);

      return (
        (!tipoDeViaje || viaje.tipoDeViaje === tipoDeViaje) &&
        (!fechaSalida || inicioViaje >= new Date(fechaSalida)) &&
        (!nroViaje || viaje.nroViaje.includes(nroViaje)) &&
        (!empresa || viaje.empresa === empresa) &&
        (!chofer || viaje.id_chofer === chofer) &&
        (!patente || viaje.vehiculo.patente === patente) &&
        (!provinciaOrigen || viaje.provinciaOrigen === provinciaOrigen) &&
        (!provinciaDestino || viaje.provinciaDestino === provinciaDestino)
      );
    });

    setViajesFiltrado(filteredViajes);
  };

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
            <FilterBar onFilter={filtrarViajes} />
            <TablaViajes viajes={viajesFiltrado} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViajesPage;
