import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import TableTitle from "../../components/TableTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import FormButtonSave from "../../components/FormButtonSave";
import FormButtonCancel from "../../components/FormButtonCancel";

const NuevoChoferPage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar></NavBar>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/choferes" />
            <TitleNew color="text-emerald-400" title="Nuevo Chofer" />
          </div>
          <TableTitle
            color="black"
            title="Información del chofer"
            description="Ingresa los datos del nuevo chofer a registrar en el sistema"
          ></TableTitle>
          <div className="grid grid-cols-2">
            <Input placeholder="Ej: Juan" title="Nombre" id="idNombre"></Input>
            <Input
              placeholder="Ej: Gonzales"
              title="Apellido"
              id="idApellido"
            ></Input>
            <Input placeholder="Ej: 12345678" title="DNI" id="idDni"></Input>
            <Input
              placeholder="Ej: A-12345"
              title="Lencia de conductor"
              id="idLicenciaDeConductor"
            ></Input>
            <Input
              placeholder="Ej: 1133224222"
              title="Telefono"
              id="idTelefono"
            ></Input>
            <Input
              placeholder="Ej: 01/01/01"
              title="Fecha de nacimiento"
              id="idFechaDeNacimiento"
            ></Input>
            <DropdownButton titulo="Empresa transportista"></DropdownButton>
            <Input
              placeholder="Ej: Activo"
              title="Estado"
              id="idEstado"
            ></Input>
            <Input
              placeholder="Ej: Informacion sobre el chofer"
              title="Observaciones"
              id="idObservaciones"
            ></Input>
          </div>
          <div className="grid grid-cols-2">
            <FormButtonCancel></FormButtonCancel>
            <FormButtonSave></FormButtonSave>
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevoChoferPage;
