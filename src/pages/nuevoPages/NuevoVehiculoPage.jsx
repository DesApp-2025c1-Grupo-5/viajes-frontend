import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
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
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/vehiculos" />
            <TitleNew color="text-red-400" title="Nuevo Vehículo" />
          </div>
          <FormTitle
            color="black"
            title="Información del vehículo"
            description="Ingresa los datos del nuevo vehículo a registrar en el sistema"
          ></FormTitle>
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <Input
              placeholder="Ej: ABC-123"
              title="Patente"
              id="idPatente"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Volvo FH16"
              title="Modelo"
              id="idModelo"
              required={true}
            ></Input>
            <Input 
              placeholder="Ej: Volvo" 
              title="Marca" 
              id="idMarca"
              required={true}
            ></Input>
            <Input 
              placeholder="Ej: 2023" 
              title="Año" 
              id="idAño"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 24"
              title="Capacidad (Toneladas)"
              id="idToneladas"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 1000 m3"
              title="Volumen"
              id="idVolumen"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Logic SRL"
              title="Empresa transportista"
              id="idEmpresaTransportista"
              required={true}
            ></Input>
            <DropdownButton titulo="Tipo de vehículo" required={true}></DropdownButton>
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
