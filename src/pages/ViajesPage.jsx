import Layout from "../components/Layout";
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
  const [paginaActual, setPaginaActual] = useState(1);
  const [limitePorPagina, setLimitePorPagina] = useState(5);
  const [totalViajes, setTotalViajes] = useState(0);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  

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
      viaje.fecha_desde,
      viaje.fecha_hasta,
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
      fecha_desde,
      fecha_hasta,
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
      && (!fecha_desde || fechaPosterior(viaje.fecha_llegada, fecha_desde))
      && (!fecha_hasta || fechaAnterior(viaje.fecha_salida, fecha_hasta))
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

  useEffect(() => {
    setTotalViajes(viajesFiltrado.length);
  }, [viajesFiltrado]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, filtros]);
  

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

  const toggleFiltros = () => {
    setMostrarFiltros(!mostrarFiltros);
  }

  const viajesPaginados = viajesFiltrado.slice(
    (paginaActual - 1) * limitePorPagina,
    paginaActual * limitePorPagina
  );

  return (
    <Layout>
      <div className="flex">
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
            <div className="flex items-center justify-between mb-4">
              <SearchBar onSearch={setBusqueda} value={busqueda}/>
              <button
                onClick={toggleFiltros}
                className="px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors duration-200 flex items-center gap-2"
              >
                {mostrarFiltros ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 010-4.243m7.071 7.071L21 21m-3.5-3.5l-1.293-1.293a1 1 0 00-1.414 0L8.464 8.464" />
                    </svg>
                    Ocultar Filtros
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Mostrar Filtros
                  </>
                )}
              </button>
            </div>
            {mostrarFiltros && (
              <FilterBar 
                onFilter={filtrarViajes} 
                onClear={limpiarBusqueda} 
                filtrosActuales={filtros}
              />
            )}
            <TablaViajes
              viajes={viajesPaginados}
              setViaje={setViaje}
              setViajesFiltrados={setViajesFiltrado}
            />
            {viajesFiltrado.length ? (
              
                <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Anterior
              </button>

              <span className="text-gray-700">
                Página {paginaActual} de {Math.ceil(totalViajes / limitePorPagina)}
              </span>
              <button
                onClick={() =>
                setPaginaActual((prev) =>
                prev < Math.ceil(totalViajes / limitePorPagina) ? prev + 1 : prev
                )
                }
                disabled={paginaActual >= Math.ceil(totalViajes / limitePorPagina)}
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

export default ViajesPage;
