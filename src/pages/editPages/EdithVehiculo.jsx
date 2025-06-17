import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const EditarVehiculoPage = () => {
  const { id } = useParams();

  const [patente, setPatente] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [volumen, setVolumen] = useState("");
  const [empresaTransportista, setEmpresaTransportista] = useState("");
  const [tipo, setTipo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    vehiculoService.getVehiculoById(id).then((vehiculo) => {
      setPatente(vehiculo.patente || "");
      setModelo(vehiculo.modelo || "");
      setMarca(vehiculo.marca || "");
      setAnio(vehiculo.año || "");
      setCapacidad(vehiculo.capacidad || "");
      setVolumen(vehiculo.volumen || "");
      setEmpresaTransportista(vehiculo.id_empresa_transportista || "");
      setTipo(vehiculo.tipo_de_vehiculo || "");
      setObservaciones(vehiculo.observaciones || "");
    });
  }, [id]);

  if (!patente && !modelo && !marca)
    return <p className="p-6">Cargando datos del vehículo...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vehiculoActualizado = {
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
      await vehiculoService.updateVehiculo(id, vehiculoActualizado);
      alert("✅ Vehículo actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("❌ No se pudo actualizar el vehículo");
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
            <TitleNew color="text-red-400" title="Editar Vehículo" />
          </div>
          <FormTitle
            color="black"
            title="Información del vehículo"
            description="Modifica los datos del vehículo"
          />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8 max-w-5xl">
              <Input
                value={patente}
                onChange={(e) => setPatente(e.target.value)}
                title="Patente"
                id="idPatente"
                required
              />
              <Input
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                title="Modelo"
                id="idModelo"
                required
              />
              <Input
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                title="Marca"
                id="idMarca"
                required
              />
              <Input
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
                title="Año"
                id="idAño"
                required
              />
              <Input
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                title="Capacidad (Toneladas)"
                id="idToneladas"
                required
              />
              <Input
                value={volumen}
                onChange={(e) => setVolumen(e.target.value)}
                title="Volumen"
                id="idVolumen"
                required
              />
              <Input
                value={empresaTransportista}
                onChange={(e) => setEmpresaTransportista(e.target.value)}
                title="Empresa transportista"
                id="idEmpresaTransportista"
                required
              />
              <DropdownButton
                titulo="Tipo de vehículo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              />
              <TextArea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                title="Observaciones"
                id="idObservaciones"
              />
              <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
                <FormButtonCancel to="/vehiculos" />
                <FormButtonSave />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarVehiculoPage;
