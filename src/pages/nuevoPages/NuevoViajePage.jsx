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

  const [errorDepositos, setErrorDepositos] = useState("");
  const [errorFecha, setErrorFecha] = useState("");




  const esFechaDestinoValida = (fechaSalida, fechaDestino) => {
    if (!fechaSalida || !fechaDestino) return true; 

    const salida = new Date(fechaSalida);
    const destino = new Date(fechaDestino);

    return destino > salida;
  };


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

  //Validaciones:
  useEffect(()=>{
    setErrorDepositos(depositoDestino == depositoOrigen);
  },[depositoOrigen, depositoDestino]);

  useEffect(() => {
    setErrorFecha(!esFechaDestinoValida(fechaDeSalida, fechaDeLlegada));
  }, [fechaDeSalida, fechaDeLlegada]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(errorDepositos || errorFecha)
      return;
    
    const calcularTipoViaje = () => {
      const origenObj = depositos.find(
        (d) => d.id === parseInt(depositoOrigen)
      );
      const destinoObj = depositos.find(
        (d) => d.id === parseInt(depositoDestino)
      );

      if (!origenObj || !destinoObj) return "";

      return (origenObj?.pais === "Argentina" && destinoObj?.pais === "Argentina"
      ? "Nacional"
      : "Internacional");
    }

    const tipoDeViaje = calcularTipoViaje();

    const nuevoViaje = {
      origen: parseInt(depositoOrigen),
      destino: parseInt(depositoDestino),
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
              onChange={(e) => setDepositoOrigen( e.target.value)}
            value={depositoOrigen}
            options={opcionesDeDepositos}
            ></DropdownButton>
            <DropdownButton
              titulo="Deposito Destino"
              required
              onChange={(e) => setDepositoDestino(e.target.value)}
              value={depositoDestino}
              options={opcionesDeDepositos}
            />

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
              <FormButtonSave 
                disabled={!!errorDepositos || !!errorFecha}
              />
            </div>
            <div className="flex flex-col gap-1">
              {errorDepositos && (
                <p className="text-red-500 text-md mt-1">⚠ El depósito de origen y destino no pueden ser iguales.</p>
              )}
              {errorFecha && (
                <p className="text-red-500 text-md mt-1">⚠ La fecha de destino debe ser posterior a la fecha de salida</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoViajePage;
