import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Layout from "../../components/Layout";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import depositosService from "../../services/DepositosService";
import DropdownButton from "../../components/DropDownButton";
import TimePicker from "../../components/TimePicker";
import { toast } from "react-toastify";
import paisesData from "../../data/paises_provincias.json";

const tiposDeDepositos = [
  { value: "", label: "Seleccionar" },
  { value: "propio", label: "Propio" },
  { value: "tercero", label: "Tercero" },
];

const restriccionesDeAcceso = [
  { value: "", label: "Seleccionar" },
  { value: "solo Personal Autorizado", label: "Solo Personal Autorizado" },
  {
    value: "todo el Personal Autorizado",
    label: "Todo el Personal Autorizado",
  },
];

const EditarDepositosPage = () => {
  const { id } = useParams();
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

  useEffect(() => {
    depositosService.getDepositoById(id).then((deposito) => {
      setNombre(deposito.nombre || "");
      setPais(deposito.pais || "");
      setProvincia(deposito.provincia || "");
      setDireccion(deposito.direccion || "");
      setCoordenadas(deposito.coordenadas || "");
      setTipo(deposito.tipo || "");
      setHorarioDesde(deposito.horarioDesde || "");
      setHorarioHasta(deposito.horarioHasta || "");
      setRestriccionDeAcceso(deposito.restriccion_de_acceso || "");
      setContacto(deposito.contacto || "");
      setObservaciones(deposito.observaciones || "");
    });
  }, [id]);

  if (!nombre && !pais && !provincia)
    return <p className="p-6">Cargando datos del depósito...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const depositoActualizado = {
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
      await depositosService.updateDeposito(id, depositoActualizado);
      toast.success("Depósito actualizado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/depositos");
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error("No se pudo actualizar el depósito", {
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
            <BackButton path="/depositos" />
            <TitleNew color="text-orange-400" title="Editar Deposito" />
          </div>
          <FormTitle
            color="black"
            title="Información del deposito"
            description="Modifica los datos del deposito"
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
            />
              <Input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                title="Direccion"
                id="idDireccion"
                required
              />
              <Input
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
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                title="Contacto"
                id="idContacto"
                required
              />
              <TextArea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                title="Observaciones"
                id="idObservaciones"
              />
              <div className="col-span-2 flex justify-start w-full gap-8 mt-2">
                <FormButtonCancel to="/depositos" />
                <FormButtonSave />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditarDepositosPage;
