import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import BackButton from "../../components/BackButton";
import TitleNew from "../../components/TitleNew";
import ViewTitle from "../../components/ViewTitle";
import ViewField from "../../components/ViewField";
import { useEffect, useState } from "react";
import { vehiculosService } from "../../services";
import { useParams } from "react-router-dom";

const ViewVehiculo = () => {
  const { id } = useParams();

  const [patente, setPatente] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [volumen, setVolumen] = useState("");
  const [empresaTransportista, setEmpresaTransportista] = useState("");
  const [tipo, setTipo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    vehiculosService.getVehiculoById(id).then((vehiculo) => {
      setPatente(vehiculo.patente || "");
      setModelo(vehiculo.modelo || "");
      setMarca(vehiculo.marca || "");
      setAnio(vehiculo.año || "");
      setCapacidad(vehiculo.capacidad || "");
      setVolumen(vehiculo.volumen || "");
      setEmpresaTransportista(vehiculo.id_empresa_transportista || "");
      setTipo(vehiculo.tipo_de_vehiculo || "");
      setObservaciones(vehiculo.observaciones || "");
    });
  }, [id]);

  if (!patente && !modelo && !marca)
    return <p className="p-6">Cargando datos del vehículo...</p>;

  return (
    <>
      <Header />
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/vehiculos"></BackButton>
            <TitleNew color="text-red-400" title="Vehículo"></TitleNew>
          </div>
          <ViewTitle
            color="black"
            title="Información del vehículo"
            description="En este apartado se pueden ver los datos completos del vehículo"
          />
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <ViewField title="Patente" id="idPatente" value={patente} />
            <ViewField title="Modelo" id="idModelo" value={modelo} />
            <ViewField title="Marca" id="idMarca" value={marca} />
            <ViewField title="Año" id="idAño" value={anio} />
            <ViewField
              title="Capacidad (Toneladas)"
              id="idCapacidad"
              value={capacidad}
            />
            <ViewField title="Volumen" id="idVolumen" value={volumen} />
            <ViewField
              title="Empresa transportista"
              id="idEmpresaTransportista"
              value={empresaTransportista}
            />
            <ViewField
              title="Tipo de vehículo"
              id="idTipoVehiculo"
              value={tipo}
            />
            <ViewField
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVehiculo;
