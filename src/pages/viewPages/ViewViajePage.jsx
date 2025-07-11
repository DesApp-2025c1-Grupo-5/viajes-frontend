import Layout from "../../components/Layout";
import BackButton from "../../components/BackButton";
import TitleNew from "../../components/TitleNew";
import ViewTitle from "../../components/ViewTitle";
import ViewField from "../../components/ViewField";
import ViewFieldObservaciones from "../../components/ViewFieldObservaciones"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import viajesServices from "../../services/ViajesService";
import choferesService from "../../services/ChoferesService"; 
import depositosService from "../../services/DepositosService"; 
import empresasService from "../../services/EmpresasTransportistasService";
import vehiculosService from "../../services/VehiculosService";
import { set } from "lodash";

const ViewViaje = () => {
  const { id } = useParams();
  const [origen, setDepositoOrigen] = useState("");
  const [destino, setDepositoDestino] = useState("");
  const [fecha_salida, setFechaSalida] = useState("");
  const [fecha_llegada, setFechaLlegada] = useState("");
  const [chofer, setChofer] = useState("");
  const [tipoDeViaje, setTipoDeViaje] = useState("");
  const [empresaTransportista, setEmpresaTransportista] = useState("");
  const [vehiculo, setVehiculo] =  useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    viajesServices.getViajeById(id).then((viaje) => {
      setFechaSalida(viaje.fecha_salida || "");
      setFechaLlegada(viaje.fecha_llegada || "");
      setTipoDeViaje(viaje.tipoDeViaje || "");
      setObservaciones(viaje.observaciones || "");

      if (viaje.destino) {
        depositosService.getDepositoById(viaje.destino).then((d) => setDepositoDestino(d));
      } else {
        setDepositoDestino("");
      }

      if (viaje.origen) {
        depositosService.getDepositoById(viaje.origen).then((d) => setDepositoOrigen(d));
      } else { 
        setDepositoOrigen("");
       }

      if (viaje.id_empresa_transportista) {
        empresasService.getTransportistaById(viaje.id_empresa_transportista).then((e) => setEmpresaTransportista(e))
      }else{
        setEmpresaTransportista("");
      }

      if (viaje.id_chofer) {
        choferesService.getChoferById(viaje.id_chofer).then((c) => setChofer(c));
      } else {
        setChofer("");
      }

      if (viaje.id_vehiculo){
        vehiculosService.getVehiculoById(viaje.id_vehiculo).then((v) => setVehiculo(v));
      }else{
        setVehiculo("");
      }

    });
  }, [id]);

  if (!origen && !destino && !fecha_salida)
    return <p className="p-6">Cargando datos del viaje...</p>;

  return (
    <Layout>
      <div className="flex">
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
            <ViewField
              title="Deposito de origen"
              id="idOrigen"
              value={origen ? origen.nombre : "Sin depósito de origen"}
            />
            <ViewField
             title="Deposito de destino" 
             id="idDestino" 
             value={destino ? destino.nombre : "Sin depósito de destino"} 
             />
            <ViewField title="Fecha de salida" id="idFechaSalida" value={fecha_salida} />
            <ViewField title="Fecha de llegada" id="idFechaLlegada" value={fecha_llegada} />
            <ViewField
              title="Chofer"
              id="idChofer"
              value={chofer ? `${chofer.nombre} ${chofer.apellido}` : "Sin chofer"}
            />
            <ViewField
              title="Tipo de viaje"
              id="idTipoDeViaje"
              value={tipoDeViaje}
            />
            <ViewField
              title="Empresa transportista"
              id="idEmpresaTransportista"
              value={empresaTransportista ? empresaTransportista.razon_social : "Sin empresa"}
            />
            <ViewField
              title="Vehículo"
              id="idVehiculo"
              value={vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : "Sin vehículo"}
            />
            <ViewFieldObservaciones
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewViaje;
