import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Layout from "../../components/Layout";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import {vehiculosService, empresasTransportistasService} from "../../services";
import { toast } from "react-toastify";

const tiposDeVehiculos = [
  { value: "", label: "Seleccionar" },
  { value: "Automovil", label: "Automovil" },
  { value: "Camion", label: "Camion" },
  { value: "Camioneta", label: "Camioneta" },
  { value: "Acoplado", label: "Camion con aclopado" },
];

const EditarVehiculoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patente, setPatente] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [volumen, setVolumen] = useState("");
  const [empresaTransportista, setEmpresaTransportista] = useState("");
  const [tipo, setTipo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [empresas, setEmpresas] = useState([]);
  const [opcionesDeEmpresas, setOpcionesEmpresas] = useState([]);

  useEffect(() => {
    const obtenerEmpresas = async () => {
      const empresasData = await empresasTransportistasService.getAll();
      setEmpresas(empresasData);
    };
    obtenerEmpresas();
  }, [])
  
  useEffect(() => {
      const opciones = [
        { value: "", label: "Seleccionar" },
        ...empresas.map((e) => ({
          value: e.id,
          label: e.razon_social,
        })),
      ];
      setOpcionesEmpresas(opciones);
    }, [empresas]);

  useEffect(() => {
    vehiculosService.getVehiculoById(id).then((vehiculo) => {
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
      await vehiculosService.updateVehiculo(id, vehiculoActualizado);
      toast.success("Vehículo actualizado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/vehiculos");
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error("No se pudo actualizar el vehiculo", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/vehiculos");
    }
  };

  return (
    <Layout>
      <div className="flex">
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
                type="number"
                required
              />
              <Input
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                title="Capacidad (Toneladas)"
                id="idToneladas"
                type="number"
                required
              />
              <Input
                value={volumen}
                onChange={(e) => setVolumen(e.target.value)}
                title="Volumen (m³)"
                id="idVolumen"
                type="number"
                required
              />
              <DropdownButton
                titulo="Empresa transportista"
                required
                onChange={(e) => setEmpresaTransportista(e.target.value)}
                value={empresaTransportista}
                options={opcionesDeEmpresas}
              />
              <DropdownButton
                titulo="Tipo de vehículo"
                required
                onChange={(e) => setTipo(e.target.value)}
                value={tipo}
                options={tiposDeVehiculos}
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
    </Layout>
  );
};

export default EditarVehiculoPage;
