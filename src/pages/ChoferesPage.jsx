import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import TablaChoferes from "../components/TablaChoferes";
import SearchBar from "../components/SearchBar";
import TableTitle from "../components/TableTitle";
import New from "../components/New";
import { useEffect, useState } from "react";
import choferesService from "../services/ChoferesService";

const ChoferesPage = () => {
  

  const [choferes, setChoferes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [choferesFiltrado, setChoferesFiltrado] = useState([]);

  const [totalElementos, setTotalElementos] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const limitePorPagina = 6;

  useEffect(() => {
    const obtenerChoferes = async () => {
      try {
        const datos = await choferesService.getAll();
        setChoferes(datos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
      } catch (error) {
        console.log(error);
      }
    };
    obtenerChoferes();
  }, []);

  useEffect(() => {
    setTotalElementos(choferesFiltrado.length);
  }, [choferesFiltrado]);

  const elementosPaginados = choferesFiltrado.slice(
    (paginaActual - 1) * limitePorPagina,
    paginaActual * limitePorPagina
  );

  useEffect(() => {
    const resultadoFiltro = choferes.filter((texto) =>
      `${texto.licencia} ${texto.nombre} ${texto.fecha_nacimiento} ${texto.DNI}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
    setChoferesFiltrado(resultadoFiltro);
  }, [busqueda, choferes]);

  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <Title
            color="text-emerald-400"
            title="Choferes"
            description="Gestiona los choferes de la empresa"
          ></Title>
          <div>
            <div className="flex items-center justify-between">
              <TableTitle
                color="text-gray-700"
                title="Lista de choferes"
                description="Todos los choferes registrados en el sistema"
              ></TableTitle>
              <New
                path="/nuevoChofer"
                bgColor="bg-emerald-400"
                colorHover="hover:bg-emerald-500"
              ></New>
            </div>
            <SearchBar onSearch={setBusqueda} />
            <TablaChoferes
              choferes={elementosPaginados}
              setChoferes={setChoferes}
              setChoferesFiltrado={setChoferesFiltrado}
            />
            {choferesFiltrado.length ? (
              
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

export default ChoferesPage;
