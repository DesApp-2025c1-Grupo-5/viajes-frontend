import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import BackButton from "../../components/BackButton";
import TitleNew from "../../components/TitleNew";
import ViewTitle from "../../components/ViewTitle";
import ViewField from "../../components/ViewField";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import viajesServices from "../../services/ViajesService";

const ViewViaje = () => {
  const { id } = useParams();

  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha_salida, setFechaSalida] = useState("");
  const [fecha_llegada, setFechaLlegada] = useState("");
  const [id_chofer, setChofer] = useState("");
  const [tipoDeViaje, setTipoDeViaje] = useState("");
  const [id_empresa_transportista, setEmpresaTransportista] = useState("");
  const [id_vehiculo, setVehiculo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    viajesServices.getViajeById(id).then((viaje) => {
      setOrigen(viaje.origen || "");
      setDestino(viaje.destino || "");
      setFechaSalida(viaje.fecha_salida || "");
      setFechaLlegada(viaje.fecha_llegada || "");
      setChofer(viaje.id_chofer || "");
      setTipoDeViaje(viaje.tipoDeViaje || "");
      setEmpresaTransportista(viaje.id_empresa_transportista || "");
      setVehiculo(viaje.id_vehiculo || "");
      setObservaciones(viaje.observaciones || "");
    });
  }, [id]);

  if (!origen && !destino && !fecha_salida)
    return <p className="p-6">Cargando datos del viaje...</p>;

  return (
    <>
      <Header />
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/viajes"></BackButton>
            <TitleNew color="text-pink-300" title="Viajes"></TitleNew>
          </div>
          <ViewTitle
            color="black"
            title="Información del viaje"
            description="En este apartado se pueden ver los datos completos del viaje"
          />
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <ViewField title="Origen" id="idOrigen" value={origen} />
            <ViewField title="Destino" id="idDestino" value={destino} />
            <ViewField title="Fecha de salida" id="idFechaSalida" value={fecha_salida} />
            <ViewField title="Fecha de llegada" id="idFechaLlegada" value={fecha_llegada} />
            <ViewField title="Chofer" id="idChofer" value={id_chofer} />
            <ViewField
              title="Tipo de viaje"
              id="idTipoDeViaje"
              value={tipoDeViaje}
            />
            <ViewField
              title="Empresa transportista"
              id="idEmpresaTransportista"
              value={id_empresa_transportista}
            />
            <ViewField title="Vehículo" id="idVehiculo" value={id_vehiculo} />
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

export default ViewViaje;
