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
  const [viajes, setViaje] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [viajesFiltrado, setViajesFiltrado] = useState([]);

  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const datos = await viajesService.getAll();
        console.log(datos);
        //console.log(JSON.stringify(datos));
        setViaje(datos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerViajes();
  }, []);

  useEffect(() => {
    const resultadoFiltro = viajes.filter((texto) =>
      `${texto.id} ${texto.tipoDeViaje} ${texto.provinciaOrigen} ${texto.provinciaDestino} ${texto.fecha_salida} ${texto.fecha_llegada} ${texto.id_chofer}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
    setViajesFiltrado(resultadoFiltro);
  }, [busqueda, viajes]);

  const compararFechas = (fechaViaje, fechaFiltro) => {
    const f1 = new Date(fechaViaje);
    const f2 = new Date(fechaFiltro);
    return f1 >= f2;
  };

  const filtrarViajes = (filtros) => {
    const filteredViajes = viajes.filter((viaje) => {
      const {
        tipoDeViaje,
        fecha_salida,
        nroViaje,
        empresa,
        chofer,
        patente,
        provinciaOrigen,
        provinciaDestino,
      } = filtros;

      return (
        (!tipoDeViaje ||
          viaje.tipoDeViaje?.toLowerCase() === tipoDeViaje.toLowerCase()) &&
        (!fecha_salida || compararFechas(viaje.fecha_salida, fecha_salida)) &&
        (!nroViaje ||
          String(viaje.nroViaje)
            .toLowerCase()
            .includes(nroViaje.toLowerCase())) &&
        (!empresa ||
          viaje.empresaTransportista.razon_social?.toLowerCase() ===
            empresa.toLowerCase()) &&
        (!chofer ||
          String(viaje.id_chofer).toLowerCase() === chofer.toLowerCase()) &&
        (!patente ||
          viaje.vehiculo.patente?.toLowerCase() === patente.toLowerCase()) &&
        (!provinciaOrigen ||
          viaje.provinciaOrigen?.toLowerCase() ===
            provinciaOrigen.toLowerCase()) &&
        (!provinciaDestino ||
          viaje.provinciaDestino?.toLowerCase() ===
            provinciaDestino.toLowerCase())
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
            <FilterBar onFilter={filtrarViajes} viajes={viajes} />
            <TablaViajes
              viajes={viajesFiltrado}
              setViaje={setViaje}
              setViajesFiltrados={setViajesFiltrado}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViajesPage;
