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

const NuevoChoferPage = () => {
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
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <Input 
              placeholder="Ej: Juan" 
              title="Nombre" 
              id="idNombre"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Gonzales"
              title="Apellido"
              id="idApellido"
              required={true}
            ></Input>
            <Input 
              placeholder="Ej: 12345678" 
              title="DNI" 
              id="idDni"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: A-12345"
              title="Lencia de conductor"
              id="idLicenciaDeConductor"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 1133224222"
              title="Telefono"
              id="idTelefono"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 01/01/01"
              title="Fecha de nacimiento"
              id="idFechaDeNacimiento"
            ></Input>
            <DropdownButton titulo="Empresa transportista" required={true}></DropdownButton>
            <Input
              placeholder="Ej: Activo"
              title="Estado"
              id="idEstado"
              required={true}
            ></Input>
            <TextArea
              placeholder="Ej: Informacion sobre el chofer"
              title="Observaciones"
              id="idObservaciones"
            ></TextArea>
            <div></div>
            <div></div>
            <div className="flex justify-end w-full gap-8">
              <FormButtonCancel></FormButtonCancel>
              <FormButtonSave></FormButtonSave>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevoChoferPage;
