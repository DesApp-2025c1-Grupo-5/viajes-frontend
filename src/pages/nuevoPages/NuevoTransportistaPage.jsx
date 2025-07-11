import BackButton from "../../components/BackButton";
import Layout from "../../components/Layout";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import transportistaService from "../../services/EmpresasTransportistasService";
import { toast } from "react-toastify";
import DropdownButton from "../../components/DropDownButton";
import paisesData from "../../data/paises_provincias.json";

const NuevoTransportistaPage = () => {
  const navigate = useNavigate();

  const [razon_social, setRazonSocial] = useState("");
  const [cuit_rut, setCuit] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [domicilio_fiscal, setDomicilio] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [provincia_estado, setProvincia] = useState("");
  const [pais, setPais] = useState("");
  const [provincias, setProvincias] = useState([]);

  const handlePaisChange = (selectedPais) => {
    setPais(selectedPais);
    setProvincias(paisesData[selectedPais] || []);
  };


  const submit = async (e) => {
    e.preventDefault();
    const newTransportista = {
      razon_social,
      cuit_rut,
      email,
      telefono,
      pais,
      provincia_estado,
      domicilio_fiscal,
      observaciones,
    }
    try {
      await transportistaService.create(newTransportista);
      toast.success("Empresa transportista creada correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/transportistas");
    } catch (error) {
      console.error("No se pudo crear la empresa: ", error);
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
            <TitleNew color="text-purple-400" title="Nuevo Transportista" />
          </div>
          <FormTitle
            color="black"
            title="Información del transportista"
            description="Ingresa los datos del nuevo transportista a registrar en el sistema"
          ></FormTitle>
          <form onSubmit={submit} className="grid grid-cols-2 gap-8 max-w-5xl">
            <Input
              placeholder="Ej: Transporte rápido S.A"
              title="Razon social"
              id="idTransporteRapido"
              name="razon_social"
              onChange={(e) => setRazonSocial(e.target.value)}
              value={razon_social}
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 2020202020"
              title="CUIT/RUT"
              id="idCuit"
              name="cuit_rut"
              onChange={(e) => setCuit(e.target.value)}
              value={cuit_rut}
              required={true}
              type="number"
            ></Input>
            <Input
              placeholder="Ej: abcdefga@hotmail.com"
              title="E-mail"
              id="idEMail"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required={true}
              type="email"
            ></Input>
            <Input
              placeholder="Ej: 1111111111"
              title="Telefono"
              id="idTelefono"
              name="telefono"
              onChange={(e) => setTelefono(e.target.value)}
              value={telefono}
              required={true}
            ></Input>
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
            />
            <div className="col-span-2">
              <Input
                placeholder="Ej: Av. San Martin 1234"
                title="Domicilio Fiscal"
                id="idDomicilioFiscal"
                name="domicilio_fiscal"
                onChange={(e) => setDomicilio(e.target.value)}
                value={domicilio_fiscal}
                required={true}
              ></Input>
            </div>
            <div className="col-span-2">
              <TextArea
                placeholder="Ej: Informacion sobre el chofer"
                title="Observaciones"
                name="observaciones"
                onChange={(e) => setObservaciones(e.target.value)}
                value={observaciones}
                id="idObservaciones"
              ></TextArea>
            </div>
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

export default NuevoTransportistaPage;
