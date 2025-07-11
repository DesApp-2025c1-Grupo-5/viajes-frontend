import Title from "../components/Title";
import TablaDepositos from "../components/TablaDepositos";
import SearchBar from "../components/SearchBar";
import TableTitle from "../components/TableTitle";
import New from "../components/New";
import { useEffect, useState } from "react";
import depositosService from "../services/DepositosService";
import Layout from "../components/Layout";

const DepositosPage = () => {
  const [depositos, setDepositos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [depositosFiltrado, setDepositosFiltrado] = useState([]);

  const [totalElementos, setTotalElementos] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const limitePorPagina = 6;

  useEffect(() => {
    const obtenerDepositos = async () => {
      try {
        const datos = await depositosService.getAll();
        setDepositos(datos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDepositos();
  }, []);

  useEffect(() => {
    setTotalElementos(depositosFiltrado.length);
  }, [depositosFiltrado]);

  const elementosPaginados = depositosFiltrado.slice(
    (paginaActual - 1) * limitePorPagina,
    paginaActual * limitePorPagina
  );

  useEffect(() => {
    const resultadoFiltro = depositos.filter((texto) =>
      `${texto.nombre} ${texto.direccion} ${texto.provincia} ${texto.pais}` /*${texto.contacto} <-- FALTA AGREGAR ESTE*/
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
    setDepositosFiltrado(resultadoFiltro);
  }, [busqueda, depositos]);

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-6">
          <Title
            color="text-orange-400"
            title="Depósitos"
            description="Gestiona los depósitos de la empresa"
          ></Title>
          <div>
            <div className="flex items-center justify-between">
              <TableTitle
                color="text-gray-700"
                title="Lista de depósitos"
                description="Todos los depósitos registrados en el sistema"
              ></TableTitle>
              <New
                path="/nuevoDeposito"
                bgColor="bg-orange-400"
                colorHover="hover:bg-orange-500"
              ></New>
            </div>
            <SearchBar onSearch={setBusqueda} />
            <TablaDepositos
              depositos={elementosPaginados}
              setDepositos={setDepositos}
              setDepositosFiltrado={setDepositosFiltrado}
            />
            {depositosFiltrado.length ? (
              
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

export default DepositosPage;
