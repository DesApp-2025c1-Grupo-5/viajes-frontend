import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import TableTitle from "../../components/TableTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";

const NuevoVehiculoPage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar></NavBar>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/vehiculos" />
            <TitleNew color="text-red-500" title="Nuevo Vehículo" />
          </div>
          <TableTitle
            color="black"
            title="Información del vehículo"
            description="Ingresa los datos del nuevo vehículo a registrar en el sistema"
          ></TableTitle>
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <Input
              placeholder="Ej: ABC-123"
              title="Patente"
              id="idPatente"
            ></Input>
            <Input
              placeholder="Ej: Volvo FH16"
              title="Modelo"
              id="idModelo"
            ></Input>
            <Input placeholder="Ej: Volvo" title="Marca" id="idMarca"></Input>
            <Input placeholder="Ej: 2023" title="Año" id="idAño"></Input>
            <Input
              placeholder="Ej: 24"
              title="Capacidad (Toneladas)"
              id="idToneladas"
            ></Input>
            <Input
              placeholder="Ej: 1000 m3"
              title="Volumen"
              id="idVolumen"
            ></Input>
            <Input
              placeholder="Ej: Logic SRL"
              title="Empresa transportista"
              id="idEmpresaTransportista"
            ></Input>
            <DropdownButton titulo="Tipo de vehículo"></DropdownButton>
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

export default NuevoVehiculoPage;
