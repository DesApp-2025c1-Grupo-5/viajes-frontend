import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
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

const NuevoTransportistaPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    razon_social: "",
    cuit_rut: "",
    email: "",
    telefono: "",
    pais: "",
    provincia_estado: "",
    domicilio_fiscal: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await transportistaService.create(formData);
      toast.success("✅ Empresa transportista creada correctamente", {
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
      toast.error("❌ No se pudo crear la empresa transportista", {
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
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
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
              onChange={handleChange}
              value={formData.razon_social}
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 2020202020"
              title="CUIT/RUT"
              id="idCuit"
              name="cuit_rut"
              onChange={handleChange}
              value={formData.cuit_rut}
              required={true}
            ></Input>
            <Input
              placeholder="Ej: abcdefga@hotmail.com"
              title="E-mail"
              id="idEMail"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 1111111111"
              title="Telefono"
              id="idTelefono"
              name="telefono"
              onChange={handleChange}
              value={formData.telefono}
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Argentina"
              title="Pais"
              id="idPais"
              name="pais"
              onChange={handleChange}
              value={formData.pais}
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Buenos Aires"
              title="Provincia/Estado"
              id="idProvinciaEstado"
              name="provincia_estado"
              onChange={handleChange}
              value={formData.provincia_estado}
              required={true}
            ></Input>
            <div className="col-span-2">
              <Input
                placeholder="Ej: Av. San Martin 1234"
                title="Domicilio Fiscal"
                id="idDomicilioFiscal"
                name="domicilio_fiscal"
                onChange={handleChange}
                value={formData.domicilio_fiscal}
                required={true}
              ></Input>
            </div>
            <div className="col-span-2">
              <TextArea
                placeholder="Ej: Informacion sobre el chofer"
                title="Observaciones"
                name="observaciones"
                onChange={handleChange}
                value={formData.observaciones}
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
    </>
  );
};

export default NuevoTransportistaPage;
