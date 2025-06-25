import { useState } from "react";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import FormButtonSave from "../../components/FormButtonSave";
import FormButtonCancel from "../../components/FormButtonCancel";
import TextArea from "../../components/TextArea";
import choferesService from "../../services/ChoferesService";

const NuevoChoferPage = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [licencia, setLicencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, seFechaNacimiento] = useState("");
  const [id_empresa_transportista, setEmpresaTransportista] = useState(1);
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoChofer = {
      nombre,
      apellido,
      dni,
      licencia,
      telefono,
      fecha_nacimiento,
      id_empresa_transportista,
      estado,
      observaciones,
    };
    try {
      await choferesService.post(nuevoChofer);
      alert("✅ Chofer creado correctamente");
    } catch (error) {
      console.error("Error al crear chofer:", error);
      alert("❌ No se pudo crear el chofer");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/choferes" />
            <TitleNew color="text-emerald-400" title="Nuevo Chofer" />
          </div>
          <FormTitle
            color="black"
            title="Información del chofer"
            description="Ingresa los datos del nuevo chofer a registrar en el sistema"
          ></FormTitle>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-8 max-w-5xl"
          >
            <Input
              placeholder="Ej: Juan"
              title="Nombre"
              id="idNombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: Gonzales"
              title="Apellido"
              id="idApellido"
              required
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: 12345678"
              title="DNI"
              id="idDni"
              required
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: A-12345"
              title="Licencia de conductor"
              id="idLicenciaDeConductor"
              required
              value={licencia}
              onChange={(e) => setLicencia(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: 1133224222"
              title="Telefono"
              id="idTelefono"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: 01/01/01"
              title="Fecha de nacimiento"
              id="idFechaDeNacimiento"
              required
              value={fecha_nacimiento}
              onChange={(e) => seFechaNacimiento(e.target.value)}
            ></Input>
            <DropdownButton
              titulo="Empresa transportista"
              required
              value={id_empresa_transportista}
              onChange={(e) => setEmpresaTransportista(e.target.value)}
            ></DropdownButton>
            <Input
              placeholder="Ej: Activo"
              title="Estado"
              id="idEstado"
              required
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            ></Input>
            <TextArea
              placeholder="Ej: Informacion sobre el chofer"
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            ></TextArea>
            <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
              <FormButtonCancel to="/choferes" />
              <FormButtonSave to="/choferes"/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoChoferPage;
