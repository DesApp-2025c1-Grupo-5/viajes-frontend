import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Layout from "../../components/Layout";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import DatePicker from "../../components/DatePicker";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import {choferesService, vehiculosService, empresasTransportistasService} from "../../services";
import { toast } from "react-toastify";


const tiposDeEstado = [
  { value: "", label: "Seleccionar" },
  { value: "Disponible", label: "Disponible" },
  { value: "No disponible", label: "No disponible" },
  { value: "En viaje", label: "En viaje" },
];

const EditarChoferesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [licencia, setLicencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, seFechaNacimiento] = useState("");
  const [id_empresa_transportista, setEmpresaTransportista] = useState("");
  const [id_vehiculo, setVehiculo] = useState("");
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [empresas, setEmpresas] = useState([]);
  const [opcionesDeEmpresas, setOpcionesEmpresas] = useState([]);

  const [vehiculos, setVehiculos] = useState([]);
  const [opcionesDeVehiculos, setOpcionesVehiculos] = useState([]);

  const [datosCargados, setDatosCargados] = useState(false);

  const setIdEmpresaYVehiculo = (empresaId, vehiculoId) => {
    setEmpresaTransportista(empresaId);
    setVehiculo(vehiculoId);
    setDatosCargados(true);
  };


  useEffect(() => {
    const obtenerEmpresas = async () => {
      const empresasData = await empresasTransportistasService.getAll();
      setEmpresas(empresasData);
    };
    obtenerEmpresas();

    const obtenerVehiculos = async () => {
      const vehiculosData = await vehiculosService.getAll();
      setVehiculos(vehiculosData);
    };
    obtenerVehiculos();
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
    if (!datosCargados || !id_empresa_transportista || vehiculos.length === 0){
      setVehiculo("");
      return;
    } 

    const opciones = [
      { value: "", label: "Seleccionar" },
      ...vehiculos
        .filter((v) => v.id_empresa_transportista === Number(id_empresa_transportista))
        .map((v) => ({
          value: v.id,
          label: `${v.marca} / ${v.modelo} (${v.patente})`,
        })),
    ];

    setOpcionesVehiculos(opciones);

  }, [datosCargados, id_empresa_transportista, id_vehiculo, vehiculos]);



  useEffect(() => {
    const cargarChofer = async () => {
      const chofer = await choferesService.getChoferById(id);

      setNombre(chofer.nombre || "");
      setApellido(chofer.apellido || "");
      setDni(chofer.dni || "");
      setLicencia(chofer.licencia || "");
      setTelefono(chofer.telefono || "");
      seFechaNacimiento(chofer.fecha_nacimiento || "");
      setEstado(chofer.estado || "");
      setObservaciones(chofer.observaciones || "");
      setIdEmpresaYVehiculo(chofer.id_empresa_transportista, chofer.id_vehiculo)
    }
    
    cargarChofer();
  }, [id]);

  if (!nombre && !apellido && !dni)
    return <p className="p-6">Cargando datos del chofer...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const choferActualizado = {
      nombre,
      apellido,
      DNI: dni,
      licencia,
      telefono,
      fecha_nacimiento,
      id_empresa_transportista,
      id_vehiculo,
      estado,
      observaciones,
    };
    try {
      await choferesService.updateChofer(id, choferActualizado);
      toast.success("Chofer actualizado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/choferes");
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error("No se pudo actualizar el chofer", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/choferes" />
            <TitleNew color="text-emerald-400" title="Editar Chofer" />
          </div>
          <FormTitle
            color="black"
            title="Información del chofer"
            description="Modifica los datos del chofer"
          />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8 max-w-5xl">
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                title="Nombre"
                id="idNombre"
                required
              />
              <Input
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                title="Apellido"
                id="idApellido"
                required
              />
              <Input
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                title="Dni"
                id="idDni"
                required
              />
              <Input
                value={licencia}
                onChange={(e) => setLicencia(e.target.value)}
                title="Licencia"
                id="idLicencia"
                required
              />
              <Input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                title="Telefono"
                id="idTelefono"
                required
              />
              <DatePicker
                placeholder="Ej: 01/01/01"
                title="Fecha de nacimiento"
                id="idFechaDeNacimiento"
                required
                value={fecha_nacimiento}
                onChange={seFechaNacimiento}
              />
              <DropdownButton
                titulo="Empresa Transportista"
                required
                onChange={(e) => setEmpresaTransportista(e.target.value)}
                value={id_empresa_transportista}
                options={opcionesDeEmpresas}
              ></DropdownButton>
              <DropdownButton
                titulo="Vehiculo"
                required
                onChange={(e) => setVehiculo(e.target.value)}
                value={id_vehiculo}
                options={opcionesDeVehiculos}
                disabled={!id_empresa_transportista}
              ></DropdownButton>
              <DropdownButton
                titulo="Estado"
                required
                onChange={(e) => setEstado(e.target.value)}
                value={estado}
                options={tiposDeEstado}
              />
              <TextArea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                title="Observaciones"
                id="idObservaciones"
              />
              <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
                <FormButtonCancel to="/choferes" />
                <FormButtonSave />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditarChoferesPage;
