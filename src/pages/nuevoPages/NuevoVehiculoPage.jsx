import { useState } from "react";
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
import vehiculoService from "../../services/VehiculosService";

const tiposDeVehiculos = [
  { value: "", label: "Seleccionar" },
  { value: "Automovil", label: "Automovil" },
  { value: "Camion", label: "Camion" },
  { value: "Camioneta", label: "Camioneta" },
  { value: "Acoplado", label: "Camion con aclopado" },
];

const NuevoVehiculoPage = () => {
  const [patente, setPatente] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [volumen, setVolumen] = useState("");
  const [empresaTransportista, setEmpresaTransportista] = useState("");
  const [tipo, setTipo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoVehiculo = {
      patente,
      modelo,
      marca,
      año: anio,
      capacidad,
      volumen,
      id_empresa_transportista: empresaTransportista,
      tipo_de_vehiculo: tipo,
      observaciones,
    };
    try {
      await vehiculoService.post(nuevoVehiculo);
      alert("✅ Vehículo creado correctamente");
    } catch (error) {
      console.error("Error al crear vehículo:", error);
      alert("❌ No se pudo crear el vehículo");
    }
  };

  return (
    <>
      <Header />
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
          />
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-8 max-w-5xl"
          >
            <Input
              placeholder="Ej: ABC-123"
              title="Patente"
              id="idPatente"
              required
              value={patente}
              onChange={(e) => setPatente(e.target.value)}
            />
            <Input
              placeholder="Ej: Volvo FH16"
              title="Modelo"
              id="idModelo"
              required
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
            <Input
              placeholder="Ej: Volvo"
              title="Marca"
              id="idMarca"
              required
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
            <Input
              placeholder="Ej: 2023"
              title="Año"
              id="idAño"
              required
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
            />
            <Input
              placeholder="Ej: 24"
              title="Capacidad (Toneladas)"
              id="idToneladas"
              required
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
            />
            <Input
              placeholder="Ej: 1000 m3"
              title="Volumen"
              id="idVolumen"
              required
              value={volumen}
              onChange={(e) => setVolumen(e.target.value)}
            />
            <Input
              placeholder="Ej: Logic SRL"
              title="Empresa transportista"
              id="idEmpresaTransportista"
              required
              value={empresaTransportista}
              onChange={(e) => setEmpresaTransportista(e.target.value)}
            />
            <DropdownButton
              titulo="Tipo de vehículo"
              required
              onChange={(e) => setTipo(e.target.value)}
              value={tipo}
              options={tiposDeVehiculos}
            />
            <TextArea
              placeholder="Ej: Informacion sobre el chofer"
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
            <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
              <FormButtonCancel to="/vehiculos" />
              <FormButtonSave to="/vehiculos" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoVehiculoPage;
