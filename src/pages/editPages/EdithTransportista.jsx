import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import transportistasServices from "../../services/EmpresasTransportistasService";

const EditarTransportistasPage = () => {
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
    transportistasServices.getTransportistaById(id).then((transportista) => {
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
    return <p className="p-6">Cargando datos del transportista...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transportistaActualizado = {
      razon_social,
      cuit_rut,
      email,
      telefono,
      pais,
      provincia_estado,
      domicilio_fiscal,
      observaciones,
    };
    try {
      await transportistasServices.updateTransportista(
        id,
        transportistaActualizado
      );
      alert("✅ Empresa transportista actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("❌ No se pudo actualizar la empresa transportista");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/transportistas" />
            <TitleNew color="text-purple-400" title="Editar Transportista" />
          </div>
          <FormTitle
            color="black"
            title="Información del transportista"
            description="Modifica los datos del transportista"
          />
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-8 max-w-5xl"
          >
            <Input
              value={razon_social}
              onChange={(e) => setRazonSocial(e.target.value)}
              title="Razon_Social"
              id="idRazonSocial"
              required
            />
            <Input
              value={cuit_rut}
              onChange={(e) => setCuitRut(e.target.value)}
              title="CuitRut"
              id="idCuitRut"
              required
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title="Email"
              id="idEmail"
              required
            />
            <Input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              title="Telefono"
              id="idTelefono"
              required
            />
            <Input
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              title="Pais"
              id="idPais"
              required
            />
            <Input
              value={provincia_estado}
              onChange={(e) => setProvincia(e.target.value)}
              title="Provincia"
              id="idProvincia"
              required
            />
            <Input
              value={domicilio_fiscal}
              onChange={(e) => setDomicilioFiscal(e.target.value)}
              title="Domicilio Fiscal"
              id="idDomicilioFiscal"
              required
            />
            <TextArea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              title="Observaciones"
              id="idObservaciones"
            />
            <div className="col-span-2 flex justify-star w-full gap-8">
              <FormButtonCancel to="/transportistas" />
              <FormButtonSave />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarTransportistasPage;
