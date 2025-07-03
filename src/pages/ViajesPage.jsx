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
import match from "../utils/compararTexto";
import include from "../utils/includeTexto";

const ViajesPage = () => {
  const [viajes, setViaje] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({});
  const [viajesFiltrado, setViajesFiltrado] = useState([]);


  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const datos = await viajesService.getAll();
        setViaje(datos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerViajes();
  }, []);
  

  useEffect(() => {
    const resultadoFiltro = viajes.filter((viaje) => {
    const textoViaje = [
      viaje.id,
      viaje.tipoDeViaje,
      viaje.depositoOrigen?.nombre,
      viaje.depositoOrigen?.provincia,
      viaje.depositoDestino?.nombre,
      viaje.depositoDestino?.provincia,
      viaje.fecha_salida,
      viaje.fecha_llegada,
      viaje.chofer?.nombre,
      viaje.chofer?.apellido,
      viaje.empresaTransportista?.razon_social,
      viaje.vehiculo?.patente,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const filtradoPorTexto = include(textoViaje, busqueda);

    const {
      tipoDeViaje,
      fecha_salida,
      fecha_llegada,
      nroViaje,
      empresa,
      chofer,
      patente,
      provinciaOrigen,
      provinciaDestino,
      depositoOrigen,
      depositoDestino,
    } = filtros;

    return (
      filtradoPorTexto
      && (!tipoDeViaje || match(viaje.tipoDeViaje, tipoDeViaje)) 
      && (!fecha_salida || fechaPosterior(viaje.fecha_salida, fecha_salida))
      && (!fecha_llegada || fechaAnterior(viaje.fecha_llegada, fecha_llegada))
      && (!nroViaje || viaje.id.toString().includes(nroViaje))
      && (!empresa || match(viaje.empresaTransportista.razon_social, empresa))
      && (!chofer || include(`${viaje.chofer?.nombre ?? ""} ${viaje.chofer?.apellido}`, chofer))
      && (!patente || match(viaje.vehiculo?.patente, patente))
      && (!provinciaOrigen || match(viaje.depositoOrigen?.provincia, provinciaOrigen))
      &&(!provinciaDestino || match(viaje.depositoDestino?.provincia, provinciaDestino))
      && (!depositoOrigen || match(viaje.depositoOrigen?.nombre, depositoOrigen))
      && (!depositoDestino || match(viaje.depositoDestino?.nombre, depositoDestino))
      );
  });

    setViajesFiltrado(resultadoFiltro);
  }, [busqueda, viajes, filtros]);


  const fechaPosterior = (fechaViaje, fechaFiltro) => {
    if(!fechaFiltro) return true;
    if(!fechaViaje) return false;
    const f1 = fechaViaje; 
    const f2 = fechaFiltro.split("T")[0]; 
    return f1 >= f2;
  }
  
  const fechaAnterior = (fechaViaje, fechaFiltro) => {
    if(!fechaFiltro) return true;
    if(!fechaViaje) return false;
    const f1 = fechaViaje; 
    const f2 = fechaFiltro.split("T")[0]; 
    return f1 <= f2;
  }

  const filtrarViajes = (filtrosRecibidos) => {
    setFiltros(filtrosRecibidos);
  }

  const limpiarBusqueda = () => {
    setBusqueda("");
  }


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
            <SearchBar onSearch={setBusqueda} value={busqueda}/>
            <FilterBar onFilter={filtrarViajes} onClear={limpiarBusqueda} />
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
