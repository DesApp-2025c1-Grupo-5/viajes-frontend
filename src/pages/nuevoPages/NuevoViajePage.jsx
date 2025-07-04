import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  viajesService,
  depositosService,
  empresasTransportistasService,
  choferesService,
  vehiculosService,
} from "../../services";
import { toast } from "react-toastify";

// const opcionesDeEmpresas = [
//   { value: "", label: "Seleccionar" },
//   { value: 2, label: "LogiExpress" },
//   { value: 1, label: "Transportes Rápidos S.A" },
//   { value: 3, label: "CargoMax" },
// ];

// const opcionesDeDepositos = [
//   { value: "", label: "Seleccionar" },
//   { value: "Deposito Central", label: "Deposito Central" },
//   { value: "Deposito Sur", label: "Deposito Sur" },
//   { value: "Deposito Norte", label: "Deposito Norte" },
// ];

// const opcionesDeChofer = [
//   { value: "", label: "Seleccionar" },
//   { value: 1, label: "Juan" },
//   { value: 2, label: "Gastón" },
//   { value: 3, label: "María" },
// ];

// const opcionesVehiculo = [
//   { value: "", label: "Seleccionar" },
//   { value: 1, label: "FH 540" },
//   { value: 2, label: "Actros 2545" },
//   { value: 3, label: "R450 Highline" },
// ];

const NuevoViajePage = () => {
  const navigate = useNavigate();

  const [depositoOrigen, setDepositoOrigen] = useState("");
  const [depositoDestino, setDepositoDestino] = useState("");
  const [fechaDeSalida, setFechaDeSalida] = useState("");
  const [fechaDeLlegada, setFechaDeLlegada] = useState("");
  const [empresaTransportista, setEmpresaTransportista] = useState("");
  const [chofer, setChofer] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [empresas, setEmpresas] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [depositos, setDepositos] = useState([]);

  const [opcionesDeDepositos, setOpcionesDepositos] = useState([]);
  const [opcionesDeEmpresas, setOpcionesEmpresas] = useState([]);
  const [opcionesDeChoferes, setOpcionesChoferes] = useState([]);
  const [opcionesDeVehiculos, setOpcionesVehiculos] = useState([]);

  useEffect(() => {
    const opciones = [
      { value: "", label: "Seleccionar" },
      ...depositos.map((d) => ({
        value: d.id,
        label: d.nombre,
      })),
    ];
    setOpcionesDepositos(opciones);
  }, [depositos]);

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
    if (!empresaTransportista) {
      opciones = [{ value: "", label: "Seleccionar" }];
    } else {
      opciones = [
        { value: "", label: "Seleccionar" },
        ...choferes
          .filter(
            (c) => c.id_empresa_transportista === parseInt(empresaTransportista)
          )
          .map((c) => ({ value: c.id, label: `${c.nombre} ${c.apellido}` })),
      ];
    }

    setOpcionesChoferes(opciones);
    setChofer("");
  }, [empresaTransportista, choferes]);

  useEffect(() => {
    let opciones = [];
    if (!empresaTransportista || !chofer) {
      opciones = [{ value: "", label: "Seleccionar" }];
    } else {
      const choferSeleccionado = choferes.find(
        (c) => c.id.toString() === chofer
      );
      if (!choferSeleccionado) {
        setVehiculo("");
      } else {
        setVehiculo(choferSeleccionado.id_vehiculo);
      }

      opciones = [
        { value: "", label: "Seleccionar" },
        ...vehiculos
          .filter(
            (v) =>
              v.id_empresa_transportista.toString() === empresaTransportista
          )
          .map((v) => ({
            value: v.id,
            label: `${v.marca} / ${v.modelo} (${v.patente})`,
          })),
      ];
    }

    setOpcionesVehiculos(opciones);
  }, [empresaTransportista, chofer, choferes, vehiculos]);

  useEffect(() => {
    const obtenerDepositos = async () => {
      const depositosData = await depositosService.getAll();
      setDepositos(depositosData);
    };
    obtenerDepositos();

    const obtenerEmpresas = async () => {
      const empresasData = await empresasTransportistasService.getAll();
      setEmpresas(empresasData);
    };
    obtenerEmpresas();

    const obtenerChoferes = async () => {
      const choferesData = await choferesService.getAll();
      setChoferes(choferesData);
    };
    obtenerChoferes();

    const obtenerVehiculos = async () => {
      const vehiculosData = await vehiculosService.getAll();
      setVehiculos(vehiculosData);
    };
    obtenerVehiculos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoViaje = {
      origen: parseInt(depositoOrigen),
      destino: parseInt(depositoDestino),
      fecha_salida: fechaDeSalida,
      fecha_llegada: fechaDeLlegada,
      id_empresa_transportista: empresaTransportista,
      id_chofer: chofer,
      id_vehiculo: vehiculo,
      observaciones,
    };
    try {
      await viajesService.post(nuevoViaje);
      toast.success("Viaje creado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/viajes");
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      toast.error("No se pudo crear el viaje", {
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
              options={opcionesDeChoferes}
              disabled={empresaTransportista === ""}
            ></DropdownButton>
            <DropdownButton
              titulo="Vehiculo"
              required
              onChange={(e) => setVehiculo(e.target.value)}
              value={vehiculo}
              options={opcionesDeVehiculos}
              disabled={!empresaTransportista || !chofer}
            ></DropdownButton>
            <TextArea
              placeholder="Ej: Informacion sobre el viaje"
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            ></TextArea>
            <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
              <FormButtonCancel to="/viajes" />
              <FormButtonSave />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoViajePage;
