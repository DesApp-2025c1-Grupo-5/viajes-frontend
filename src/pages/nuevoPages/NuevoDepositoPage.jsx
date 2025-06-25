import { useState } from "react";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import TimePicker from "../../components/TimePicker";
import TextArea from "../../components/TextArea";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import depositosService from "../../services/DepositosService";

const NuevoDepositoPage = () => {
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [direccion, setDireccion] = useState("");
  const [coordenadas, setCoordenadas] = useState("1");
  const [tipo, setTipo] = useState("1");
  const [horario, setHorario] = useState("1");
  const [restriccionDeAcceso, setRestriccionDeAcceso] = useState("1");
  const [contacto, setContacto] = useState("1");
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoDeposito = {
      nombre,
      pais,
      provincia,
      direccion,
      coordenadas,
      tipo,
      horario,
      restriccionDeAcceso,
      contacto,
      observaciones,
    };
    try {
      await depositosService.post(nuevoDeposito);
      alert("✅ Deposito creado correctamente");
    } catch (error) {
      console.error("Error al crear el deposito:", error);
      alert("❌ No se pudo crear el deposito");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/depositos" />
            <TitleNew color="text-orange-400" title="Nuevo Depósito" />
          </div>
          <FormTitle
            color="black"
            title="Información del depósito"
            description="Ingresa los datos del nuevo depósito a registrar en el sistema"
          ></FormTitle>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-8 max-w-5xl"
          >
            <Input
              placeholder="Ej: Deposito Central"
              title="Nombre"
              id="idNombre"
              required
              onChange={(e) => setNombre(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: Argentina"
              title="Pais"
              id="idPais"
              required
              onChange={(e) => setPais(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: Tucumán"
              title="Provincia"
              id="idProvincia"
              required
              onChange={(e) => setProvincia(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: Av. Pronvincial 566"
              title="Dirección"
              id="idDireccion"
              onChange={(e) => setDireccion(e.target.value)}
            ></Input>
            <div className="flex gap-1">
              <Input
                placeholder="Ej: -87.5"
                title="Coordenadas Geograficas"
                id="coordenada1"
                onChange={(e) => setCoordenadas(e.target.value)}
              ></Input>
              <Input
                placeholder="Ej: -5.97"
                title="‎ "
                id="coordenada2"
                onChange={(e) => setCoordenadas(e.target.value)}
              ></Input>
            </div>
            <DropdownButton
              titulo="Tipo"
              required
              onChange={(e) => setTipo(e.target.value)}
            ></DropdownButton>
            <TimePicker
              title="Horario"
              required
              onChange={(e) => setHorario(e.target.value)}
            ></TimePicker>
            <DropdownButton
              titulo="Restriccion de acceso"
              required
              onChange={(e) => setRestriccionDeAcceso(e.target.value)}
            />
            <Input
              placeholder="Contacto"
              title="Contacto "
              id="id_contacto"
              onChange={(e) => setContacto(e.target.value)}
            ></Input>
            <TextArea
              placeholder="Ej: Informacion sobre el deposito"
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            ></TextArea>

            <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
              <FormButtonCancel to="/depositos" />
              <FormButtonSave to="/depositos" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoDepositoPage;
