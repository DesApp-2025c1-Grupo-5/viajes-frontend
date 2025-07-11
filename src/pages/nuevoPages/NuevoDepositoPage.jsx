import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Layout from "../../components/Layout";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import TimePicker from "../../components/TimePicker";
import TextArea from "../../components/TextArea";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import depositosService from "../../services/DepositosService";
import { toast } from "react-toastify";
import paisesData from "../../data/paises_provincias.json";


const tiposDeDepositos = [
  { value: "", label: "Seleccionar" },
  { value: "Propio", label: "Propio" },
  { value: "Tercero", label: "Tercero" },
];

const restriccionesDeAcceso = [
  { value: "", label: "Seleccionar" },
  { value: "Solo Personal Autorizado", label: "Solo Personal Autorizado" },
  {
    value: "Todo el Personal",
    label: "Todo el Personal",
  },
];

const NuevoDepositoPage = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [provincia, setProvincia] = useState("");
  const [direccion, setDireccion] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [tipo, setTipo] = useState("");
  const [horarioDesde, setHorarioDesde] = useState("");
  const [horarioHasta, setHorarioHasta] = useState("");
  const [restriccionDeAcceso, setRestriccionDeAcceso] = useState("");
  const [contacto, setContacto] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [pais, setPais] = useState("");
  const [provincias, setProvincias] = useState([]);

  const handlePaisChange = (selectedPais) => {
    setPais(selectedPais);
    setProvincias(paisesData[selectedPais] || []);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoDeposito = {
      nombre,
      pais,
      provincia,
      direccion,
      coordenadas,
      tipo,
      horarioDesde,
      horarioHasta,
      restriccion_de_acceso: restriccionDeAcceso,
      contacto,
      observaciones,
    };
    try {
      await depositosService.post(nuevoDeposito);
      toast.success("Depósito creado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/depositos");
    } catch (error) {
      console.error("Error al crear el deposito:", error);
      toast.error("No se pudo crear el depósito", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/depositos");
    }
  };

  return (
    <Layout>
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/depositos" />
            <TitleNew color="text-orange-400" title="Nuevo Depósito" />
          </div>
          <FormTitle
            color="black"
            title="Información del depósito"
            description="Ingresa los datos del nuevo depósito a registrar en el sistema"
          ></FormTitle>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-8 max-w-5xl"
          >
            <Input
              placeholder="Ej: Deposito Central"
              title="Nombre"
              id="idNombre"
              required
              onChange={(e) => setNombre(e.target.value)}
            ></Input>
            <DropdownButton
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all"
              titulo="País"
              required
              onChange={(e) => handlePaisChange(e.target.value)}
              value={pais}
              options={[
                { value: "", label: "Seleccionar" },
                ...Object.keys(paisesData).map((pais) => ({
                  value: pais,
                  label: pais,
                })),
              ]}
            />

            <DropdownButton
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all"
              titulo="Provincia"
              required
              onChange={(e) => setProvincia(e.target.value)}
              value={provincia}
              options={[
                { value: "", label: "Seleccionar" },
                ...provincias.map((prov) => ({
                  value: prov,
                  label: prov,
                })),
              ]}
              disabled={pais==""}
            />

            <Input
              placeholder="Ej: Av. Provincial 566"
              title="Dirección"
              id="idDireccion"
              onChange={(e) => setDireccion(e.target.value)}
            ></Input>
            <Input
              placeholder="-34.6091, -58.3845"
              value={coordenadas}
              onChange={(e) => setCoordenadas(e.target.value)}
              title="Coordenadas"
              id="idCoordenadas"
            />
            <DropdownButton
              titulo="Tipo"
              required
              onChange={(e) => setTipo(e.target.value)}
              value={tipo}
              options={tiposDeDepositos}
            ></DropdownButton>
            <div className="flex col-1 gap-6">
              <TimePicker
                titulo="Desde"
                id="horarioDesde"
                required
                value={horarioDesde}
                onChange={(e) => setHorarioDesde(e.target.value)}
              />
              <TimePicker
                titulo="Hasta"
                id="horarioHasta"
                required
                value={horarioHasta}
                onChange={(e) => setHorarioHasta(e.target.value)}
              />
            </div>
            <DropdownButton
              titulo="Restriccion de acceso"
              required
              onChange={(e) => setRestriccionDeAcceso(e.target.value)}
              value={restriccionDeAcceso}
              options={restriccionesDeAcceso}
            />
            <Input
              placeholder="Contacto"
              title="Contacto "
              id="id_contacto"
              onChange={(e) => setContacto(e.target.value)}
            ></Input>
            <TextArea
              placeholder="Ej: Informacion sobre el deposito"
              title="Observaciones"
              id="idObservaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            ></TextArea>

            <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
              <FormButtonCancel to="/depositos" />
              <FormButtonSave />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoDepositoPage;
