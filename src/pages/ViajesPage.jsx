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
import { Funnel, EyeOff } from "lucide-react";

const ViajesPage = () => {
  const [viajes, setViaje] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({});
  const [viajesFiltrado, setViajesFiltrado] = useState([]);
  
  const [totalViajes, setTotalViajes] = useState(0);

  const [paginaActual, setPaginaActual] = useState(1);
  const limitePorPagina = 6;

  const [mostrarFiltros, setMostrarFiltros] = useState(false);


  

  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const datos = await viajesService.getAll();
        setViaje(datos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
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
      && (!nroViaje || match(viaje.id.toString(), nroViaje))
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
            <div className="mb-4">
              <SearchBar onSearch={setBusqueda} value={busqueda}/>
              <div className="mt-4">
                <button
                  onClick={toggleFiltros}
                  className="px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                >
                {mostrarFiltros ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <EyeOff />
                    </svg>
                    Ocultar Filtros
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <Funnel />
                    </svg>
                    Mostrar Filtros
                  </>
                )}
              </button>
              </div>
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
