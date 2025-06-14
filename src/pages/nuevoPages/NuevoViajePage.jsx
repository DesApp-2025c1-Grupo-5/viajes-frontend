import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import DropdownButton from "../../components/DropDownButton";
import DateTimePicker from "../../components/DataTimePicker";
import Input from "../../components/Input";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";

const NuevoViajePage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/viajes" />
            <TitleNew color="text-pink-300" title="Nuevo Viaje" />
          </div>
          <div>
            <FormTitle
              color="black"
              title="Información del viaje"
              description="Ingresa los datos del nuevo viaje a registrar en el sistema"
            ></FormTitle>
          </div>
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <DropdownButton
              titulo="Deposito origen"
              buttonText="Seleccionar"
              required={true}
              // onClick={() => alert("clicked!")}
            ></DropdownButton>
            <DropdownButton
              titulo="Deposito destino"
              buttonText="Seleccionar"
              required={true}
              // onClick={() => alert("clicked!")}
            ></DropdownButton>
            <DateTimePicker
              title="Fecha de salida"
              required={true}
            ></DateTimePicker>
            <DateTimePicker
              title="Fecha de Llegada"
              required={true}
            ></DateTimePicker>
            <Input
              placeholder="Ej: Volvo FH16"
              title="Vehículo"
              id="idVehiculo"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Miguel Perez"
              title="Chofer"
              id="idChoferes"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Productos electronicos"
              title="Descripcion de carga"
              id="idProductosElectronicos"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Pendiente"
              title="Estado"
              id="idEstado"
              required={true}
            ></Input>
            <TextArea
              placeholder="Ej: Informacion sobre el chofer"
              title="Observaciones"
              id="idObservaciones"
            ></TextArea>
            <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
              <FormButtonCancel to="/viajes"></FormButtonCancel>
              <FormButtonSave></FormButtonSave>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevoViajePage;
