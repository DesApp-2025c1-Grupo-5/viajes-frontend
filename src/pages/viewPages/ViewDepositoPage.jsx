import Layout from "../../components/Layout";
import BackButton from "../../components/BackButton";
import TitleNew from "../../components/TitleNew";
import ViewTitle from "../../components/ViewTitle";
import ViewField from "../../components/ViewField";
import ViewFieldObservaciones from "../../components/ViewFieldObservaciones"
import { useEffect, useState } from "react";
import { depositosService } from "../../services";
import { useParams } from "react-router-dom";

const ViewDepositoPage = () => {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [direccion, setDireccion] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [tipo, setTipo] = useState("");
  const [horarioDesde, setHorarioDesde] = useState("");
  const [horarioHasta, setHorarioHasta] = useState("");
  const [restriccionDeAcceso, setRestriccionDeAcceso] = useState("");
  const [contacto, setContacto] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    depositosService.getDepositoById(id).then((deposito) => {
      setNombre(deposito.nombre || "");
      setPais(deposito.pais || "");
      setProvincia(deposito.provincia || "");
      setDireccion(deposito.direccion || "");
      setCoordenadas(deposito.coordenadas || "");
      setTipo(deposito.tipo || "");
      setHorarioDesde(deposito.horarioDesde || "");
      setHorarioHasta(deposito.horarioHasta || "");
      setRestriccionDeAcceso(deposito.restriccion_de_acceso || "");
      setContacto(deposito.contacto || "");
      setObservaciones(deposito.observaciones || "");
    });
  }, [id]);

  if (!nombre && !pais && !provincia)
    return <p className="p-6">Cargando datos del depósito...</p>;

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/depositos"></BackButton>
            <TitleNew color="text-orange-400" title="Depositos"></TitleNew>
          </div>
          <ViewTitle
            color="black"
            title="Información del depósito"
            description="En este apartado se pueden ver los datos completos del depósito"
          />
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <ViewField title="Nombre" id="idNombre" value={nombre} />
            <ViewField title="País" id="idPais" value={pais} />
            <ViewField title="Provincia" id="idProvincia" value={provincia} />
            <ViewField title="Dirección" id="idDireccion" value={direccion} />
            <ViewField
              title="Coordenadas"
              id="idCoordenadas"
              value={coordenadas}
            />
            <ViewField title="Tipo" id="idTipo" value={tipo} />
            <ViewField
              title="Horario desde"
              id="idHorarioDesde"
              value={horarioDesde}
            />
            <ViewField
              title="Horario hasta"
              id="idHorarioHasta"
              value={horarioHasta}
            />
            <ViewField
              title="Restricciones de acceso"
              id="idRestriccionDeAcceso"
              value={restriccionDeAcceso}
            />
            <ViewField title="Contacto" id="idContacto" value={contacto} />
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

export default ViewDepositoPage;
