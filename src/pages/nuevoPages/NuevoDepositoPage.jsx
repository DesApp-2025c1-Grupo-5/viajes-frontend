import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import TableTitle from "../../components/TableTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import TextArea from "../../components/TextArea";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";

const NuevoDepositoPage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar></NavBar>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/depositos" />
            <TitleNew color="text-orange-400" title="Nuevo Depósito" />
          </div>
          <TableTitle
            color="black"
            title="Información del depósito"
            description="Ingresa los datos del nuevo depósito a registrar en el sistema"
          ></TableTitle>
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <Input
              placeholder="Ej: Deposito Central"
              title="Nombre"
              id="idNombre"
            ></Input>
            <Input placeholder="Ej: Argentina" title="Pais" id="idPais"></Input>
            <Input
              placeholder="Ej: Tucumán"
              title="Provincia"
              id="idProvincia"
            ></Input>
            <Input
              placeholder="Ej: Av. Pronvincial 566"
              title="Dirección"
              id="idDireccion"
            ></Input>
            <div className="flex gap-1">
              <Input
                placeholder="Ej: -87.5"
                title="Coordenadas Geograficas"
                id="coordenada1"
              ></Input>
              <Input
                placeholder="Ej: -5.97"
                title="‎ "
                id="coordenada2"
              ></Input>
            </div>
            <DropdownButton titulo="Tipo"></DropdownButton>
            <DropdownButton titulo="Restriccion de acceso" />
            <TextArea
              placeholder="Ej: Informacion sobre el depósito"
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

export default NuevoDepositoPage;
