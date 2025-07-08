import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import BackButton from "../../components/BackButton";
import TitleNew from "../../components/TitleNew";
import ViewTitle from "../../components/ViewTitle";
import ViewField from "../../components/ViewField";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import choferServices from "../../services/ChoferesService";

const ViewChofer = () => {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [licencia, setLicencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, seFechaNacimiento] = useState("");
  const [id_empresa_transportista, setEmpresaTransportista] = useState("");
  const [id_vehiculo, setVehiculo] = useState("");
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    choferServices.getChoferById(id).then((chofer) => {
      setNombre(chofer.nombre || "");
      setApellido(chofer.apellido || "");
      setDni(chofer.dni || "");
      setLicencia(chofer.licencia || "");
      setTelefono(chofer.telefono || "");
      seFechaNacimiento(chofer.fecha_nacimiento || "");
      setEmpresaTransportista(chofer.id_empresa_transportista || "");
      setVehiculo(chofer.id_vehiculo || "");
      setEstado(chofer.estado || "");
      setObservaciones(chofer.observaciones || "");
    });
  }, [id]);

  if (!nombre && !apellido && !dni)
    return <p className="p-6">Cargando datos del chofer...</p>;

  return (
    <>
      <Header />
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/choferes"></BackButton>
            <TitleNew color="text-emerald-400" title="Choferes"></TitleNew>
          </div>
          <ViewTitle
            color="black"
            title="Información del chofer"
            description="En este apartado se pueden ver los datos completos del chofer"
          />
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <ViewField title="Nombre" id="idNombre" value={nombre} />
            <ViewField title="Apellido" id="idApellido" value={apellido} />
            <ViewField title="DNI" id="idDni" value={dni} />
            <ViewField title="Licencia" id="idLicencia" value={licencia} />
            <ViewField title="Teléfono" id="idTelefono" value={telefono} />
            <ViewField
              title="Fecha de nacimiento"
              id="idFechaDeNacimiento"
              value={fecha_nacimiento}
            />
            <ViewField
              title="Empresa transportista"
              id="idEmpresaTransportista"
              value={id_empresa_transportista}
            />
            <ViewField title="Vehículo" id="idVehiculo" value={id_vehiculo} />
            <ViewField title="Estado" id="idEstado" value={estado} />
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

export default ViewChofer;
