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

  useEffect(() => {
    const obtenerChoferes = async () => {
      try {
        const datos = await choferesService.getAll();
        setChoferes(datos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerChoferes();
  }, []);

  useEffect(() => {
    const resultadoFiltro = choferes.filter((texto) =>
      `${texto.licencia} ${texto.nombre} ${texto.fecha_nacimiento} ${texto.DNI}`
        .toLowerCase()
        .includes(busqueda)
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
            <TablaChoferes choferes={choferesFiltrado} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoferesPage;
