import Layout from "../../components/Layout";
import BackButton from "../../components/BackButton";
import TitleNew from "../../components/TitleNew";
import ViewTitle from "../../components/ViewTitle";
import ViewField from "../../components/ViewField";
import { useEffect, useState } from "react";
import { empresasTransportistasService } from "../../services";
import { useParams } from "react-router-dom";

const ViewEmpresaTransportistasPage = () => {
  const { id } = useParams();

  const [razon_social, setRazonSocial] = useState("");
  const [cuit_rut, setCuitRut] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [provincia_estado, setProvincia] = useState("");
  const [domicilio_fiscal, setDomicilioFiscal] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    empresasTransportistasService
      .getTransportistaById(id)
      .then((transportista) => {
        setRazonSocial(transportista.razon_social || "");
        setCuitRut(transportista.cuit_rut || "");
        setEmail(transportista.email || "");
        setTelefono(transportista.telefono || "");
        setPais(transportista.pais || "");
        setProvincia(transportista.provincia_estado || "");
        setDomicilioFiscal(transportista.domicilio_fiscal || "");
        setObservaciones(transportista.observaciones || "");
      });
  }, [id]);

  if (!razon_social && !cuit_rut && !telefono)
    return <p className="p-6">Cargando datos de la empresa transportista...</p>;

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/transportistas"></BackButton>
            <TitleNew
              color="text-purple-400"
              title="Empresas Transportistas"
            ></TitleNew>
          </div>
          <ViewTitle
            color="black"
            title="Información del la empresa transportista"
            description="En este apartado se pueden ver los datos completos de la empresa transportista"
          />
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <ViewField
              title="Razon Social"
              id="idNombre"
              value={razon_social}
            />
            <ViewField title="CUIT/RUT" id="idRut" value={cuit_rut} />
            <ViewField title="Email" id="idEmail" value={email} />
            <ViewField title="Teléfono" id="idTelefono" value={telefono} />
            <ViewField title="País" id="idPais" value={pais} />
            <ViewField
              title="Provincia/Estado"
              id="idProvinciaEstado"
              value={provincia_estado}
            />
            <ViewField
              title="Domicilio Fiscal"
              id="idDomicilioFiscal"
              value={domicilio_fiscal}
            />
            <ViewField
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

export default ViewEmpresaTransportistasPage;
