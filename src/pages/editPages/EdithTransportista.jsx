import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Layout from "../../components/Layout";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import transportistasServices from "../../services/EmpresasTransportistasService";
import { toast } from "react-toastify";
import DropdownButton from "../../components/DropDownButton";
import paisesData from "../../data/paises_provincias.json";

const EditarTransportistasPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [razon_social, setRazonSocial] = useState("");
  const [cuit_rut, setCuitRut] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [domicilio_fiscal, setDomicilioFiscal] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [provincia_estado, setProvincia] = useState("");
  const [pais, setPais] = useState("");
  const [provincias, setProvincias] = useState([]);

  const handlePaisChange = (selectedPais) => {
      setPais(selectedPais);
      setProvincias(paisesData[selectedPais] || []);
  };


  useEffect(() => {
    transportistasServices.getTransportistaById(id).then((transportista) => {
      setRazonSocial(transportista.razon_social || "");
      setCuitRut(transportista.cuit_rut || "");
      setEmail(transportista.email || "");
      setTelefono(transportista.telefono || "");
      setProvincia(transportista.provincia_estado || "");
      handlePaisChange(transportista.pais || "");
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
      toast.success("Empresa transportista actualizada correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/transportistas");
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error("No se pudo crear la empresa transportista", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Layout>
      <div className="flex">
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
              title="CUIT/RUT (Sin guiones ni espacios)"
              id="idCuitRut"
              required
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title="Email"
              id="idEmail"
              type="email"
              required
            />
            <Input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              title="Telefono"
              id="idTelefono"
              required
            />

            <DropdownButton
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all"
              titulo="País"
              required
              onChange={(e) => handlePaisChange(e.target.value)}
              value={pais}
              options={[
                { value: "", label: "Seleccionar" },
                ...Object.keys(paisesData).map((pais) => ({
                  value: pais,
                  label: pais,
                })),
              ]}
            />

            <DropdownButton
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all"
              titulo="Provincia"
              required
              onChange={(e) => setProvincia(e.target.value)}
              value={provincia_estado}
              options={[
                { value: "", label: "Seleccionar" },
                ...provincias.map((prov) => ({
                  value: prov,
                  label: prov,
                })),
              ]}
              disabled={pais==""}
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
    </Layout>
  );
};

export default EditarTransportistasPage;
