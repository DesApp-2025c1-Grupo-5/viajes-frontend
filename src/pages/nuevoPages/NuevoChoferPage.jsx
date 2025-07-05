import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import FormButtonSave from "../../components/FormButtonSave";
import FormButtonCancel from "../../components/FormButtonCancel";
import TextArea from "../../components/TextArea";
import {choferesService, vehiculosService, empresasTransportistasService}  from "../../services";
import { toast } from "react-toastify";


const tiposDeEstado = [
  { value: "", label: "Seleccionar" },
  { value: "Disponible", label: "Disponible" },
  { value: "No disponible", label: "No disponible" },
  { value: "En viaje", label: "En viaje" },
];

const NuevoChoferPage = () => {
  const navigate = useNavigate();
  
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [licencia, setLicencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, seFechaNacimiento] = useState("");
  const [id_empresa_transportista, setEmpresaTransportista] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [empresas, setEmpresas] = useState([]);
  const [opcionesDeEmpresas, setOpcionesEmpresas] = useState([]);

  const [vehiculos, setVehiculos] = useState([]);
  const [opcionesDeVehiculos, setOpcionesVehiculos] = useState([]);

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
    let opciones = [];
    if (!id_empresa_transportista) {
      opciones = [{ value: "", label: "Seleccionar" }];
    } else {
      opciones = [
        { value: "", label: "Seleccionar" },
        ...vehiculos
        .filter(
          (v) =>
            v.id_empresa_transportista.toString() === id_empresa_transportista
        )
        .map((v) => ({
          value: v.id,
          label: `${v.marca} / ${v.modelo} (${v.patente})`,
        })),
      ];
    }
    
    setVehiculo("");
    setOpcionesVehiculos(opciones);
  }, [id_empresa_transportista, vehiculos]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoChofer = {
      nombre,
      apellido,
      dni,
      licencia,
      telefono,
      fecha_nacimiento,
      id_empresa_transportista,
      estado,
      observaciones,
    };
    try {
      await choferesService.post(nuevoChofer);
      toast.success("Chofer creado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/choferes");
    } catch (error) {
      console.error("Error al crear chofer:", error);
      toast.error("No se pudo crear el chofer", {
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
    <>
      <Header></Header>
      <div className="flex">
        <NavBar />
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/choferes" />
            <TitleNew color="text-emerald-400" title="Nuevo Chofer" />
          </div>
          <FormTitle
            color="black"
            title="Información del chofer"
            description="Ingresa los datos del nuevo chofer a registrar en el sistema"
          ></FormTitle>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-8 max-w-5xl"
          >
            <Input
              placeholder="Ej: Juan"
              title="Nombre"
              id="idNombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: Gonzales"
              title="Apellido"
              id="idApellido"
              required
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: 12345678"
              title="DNI"
              id="idDni"
              required
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: A-12345"
              title="Licencia de conductor"
              id="idLicenciaDeConductor"
              required
              value={licencia}
              onChange={(e) => setLicencia(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: 1133224222"
              title="Telefono"
              id="idTelefono"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            ></Input>
            <Input
              placeholder="Ej: 01/01/01"
              title="Fecha de nacimiento"
              id="idFechaDeNacimiento"
              required
              value={fecha_nacimiento}
              onChange={(e) => seFechaNacimiento(e.target.value)}
            ></Input>
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
              value={vehiculo}
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
              placeholder="Ej: Informacion sobre el chofer"
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            ></TextArea>
            <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
              <FormButtonCancel to="/choferes" />
              <FormButtonSave />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoChoferPage;
