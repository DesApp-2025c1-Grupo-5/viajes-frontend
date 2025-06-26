import { useState } from "react";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import DropdownButton from "../../components/DropDownButton";
import DateTimePicker from "../../components/DataTimePicker";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import viajesService from "../../services/ViajesService";

const opcionesDeEmpresas = [
  { value: "", label: "Seleccionar" },
  { value: 2, label: "LogiExpress" },
  { value: 1, label: "Transportes Rápidos S.A" },
  { value: 3, label: "CargoMax" },
];

const opcionesDeDepositos = [
  { value: "", label: "Seleccionar" },
  { value: "Deposito Central", label: "Deposito Central" },
  { value: "Deposito Sur", label: "Deposito Sur" },
  { value: "Deposito Norte", label: "Deposito Norte" },
];

const opcionesDeChofer = [
  { value: "", label: "Seleccionar" },
  { value: 1, label: "Juan" },
  { value: 2, label: "Gastón" },
  { value: 3, label: "María" },
];

const opcionesTipoDeViaje = [
  { value: "", label: "Seleccionar" },
  { value: "Nacional", label: "Nacional" },
  { value: "Internacional", label: "Internacional" },
];

const opcionesVehiculo = [
  { value: "", label: "Seleccionar" },
  { value: 1, label: "FH 540" },
  { value: 2, label: "Actros 2545" },
  { value: 3, label: "R450 Highline" },
];

const NuevoViajePage = () => {
  const [depositoOrigen, setDepositoOrigen] = useState("");
  const [depositoDestino, setDepositoDestino] = useState("");
  const [fechaDeSalida, setFechaDeSalida] = useState("");
  const [fechaDeLlegada, setFechaDeLlegada] = useState("");
  const [empresaTransportista, setEmpresaTransportista] = useState("");
  const [chofer, setChofer] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [tipoDeViaje, setTipoDeViaje] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoViaje = {
      origen: depositoOrigen,
      destino: depositoDestino,
      fecha_salida: fechaDeSalida,
      fecha_llegada: fechaDeLlegada,
      id_empresa_transportista: empresaTransportista,
      id_chofer: chofer,
      id_vehiculo: vehiculo,
      tipoDeViaje,
      observaciones,
    };
    try {
      await viajesService.post(nuevoViaje);
      alert("✅ Viaje creado correctamente");
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      alert("❌ No se pudo crear el viaje");
    }
  };

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
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-8 max-w-5xl"
          >
            <DropdownButton
              titulo="Deposito origen"
              required
              onChange={(e) => setDepositoOrigen(e.target.value)}
              value={depositoOrigen}
              options={opcionesDeDepositos}
            ></DropdownButton>
            <DropdownButton
              titulo="Deposito Destino"
              required
              onChange={(e) => setDepositoDestino(e.target.value)}
              value={depositoDestino}
              options={opcionesDeDepositos}
            ></DropdownButton>
            <DateTimePicker
              title="Fecha de salida"
              id="fecha_salida"
              value={fechaDeSalida}
              onChange={setFechaDeSalida}
              required={true}
            />

            <DateTimePicker
              title="Fecha de llegada"
              id="fecha_llegada"
              value={fechaDeLlegada}
              onChange={setFechaDeLlegada}
              required={true}
            />
            <DropdownButton
              titulo="EmpresaTransportista"
              required
              onChange={(e) => setEmpresaTransportista(e.target.value)}
              value={empresaTransportista}
              options={opcionesDeEmpresas}
            ></DropdownButton>
            <DropdownButton
              titulo="Chofer"
              required
              onChange={(e) => setChofer(e.target.value)}
              value={chofer}
              options={opcionesDeChofer}
            ></DropdownButton>
            <DropdownButton
              titulo="Vehiculo"
              required
              onChange={(e) => setVehiculo(e.target.value)}
              value={vehiculo}
              options={opcionesVehiculo}
            ></DropdownButton>
            <DropdownButton
              titulo="Tipo de viaje"
              required
              onChange={(e) => setTipoDeViaje(e.target.value)}
              value={tipoDeViaje}
              options={opcionesTipoDeViaje}
            ></DropdownButton>
            <TextArea
              placeholder="Ej: Informacion sobre el viaje"
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            ></TextArea>
            <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
              <FormButtonCancel to="/viajes"></FormButtonCancel>
              <FormButtonSave></FormButtonSave>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoViajePage;
