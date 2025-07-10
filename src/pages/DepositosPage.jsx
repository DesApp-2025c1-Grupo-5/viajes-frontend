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

  useEffect(() => {
    const obtenerDepositos = async () => {
      try {
        const datos = await depositosService.getAll();
        setDepositos(datos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDepositos();
  }, []);

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
              depositos={depositosFiltrado}
              setDepositos={setDepositos}
              setDepositosFiltrado={setDepositosFiltrado}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DepositosPage;
