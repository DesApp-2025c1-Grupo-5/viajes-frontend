import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import TableTitle from "../../components/TableTitle";
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
        <NavBar></NavBar>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/viajes" />
            <TitleNew color="text-pink-300" title="Nuevo Viaje" />
          </div>
          <div>
            <TableTitle
              color="black"
              title="Información del viaje"
              description="Ingresa los datos del nuevo viaje a registrar en el sistema"
            ></TableTitle>
          </div>
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <DropdownButton
              titulo="Deposito origen"
              buttonText="Seleccionar"
              onClick={() => alert("clicked!")}
            ></DropdownButton>
            <DropdownButton
              titulo="Deposito destino"
              buttonText="Seleccionar"
              onClick={() => alert("clicked!")}
            ></DropdownButton>
            <DateTimePicker title="Fecha de salida"></DateTimePicker>
            <DateTimePicker title="Fecha de Llegada"></DateTimePicker>
            <Input
              placeholder="Ej: Volvo FH16"
              title="Vehículo"
              id="idVehiculo"
            ></Input>
            <Input
              placeholder="Ej: Miguel Perez"
              title="Chofer"
              id="idChoferes"
            ></Input>
            <Input
              placeholder="Ej: Productos electronicos"
              title="Descripcion de carga"
              id="idProductosElectronicos"
            ></Input>
            <Input
              placeholder="Ej: Pendiente"
              title="Estado"
              id="idEstado"
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

export default NuevoViajePage;
