import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import depositosService from "../../services/DepositosService";

const EditarDepositosPage = () => {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [direccion, setDireccion] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [tipo, setTipo] = useState("");
  const [horario, setHorario] = useState("");
  const [restriccionDeAcceso, setRestriccionDeAcceso] = useState("");
  const [contacto, setContacto] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    depositosService.getDepositoById(id).then((deposito) => {
      setNombre(deposito.nombre || "");
      setPais(deposito.pais || "");
      setProvincia(deposito.provincia || "");
      setDireccion(deposito.direccion || "");
      setCoordenadas(deposito.coordenadas || "");
      setTipo(deposito.tipo || "");
      setHorario(deposito.horario || "");
      setRestriccionDeAcceso(deposito.restriccionDeAcceso || "");
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
      horario,
      restriccionDeAcceso,
      contacto,
      observaciones,
    };
    try {
      await depositosService.updateDeposito(id, depositoActualizado);
      alert("✅ Chofer actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("❌ No se pudo actualizar el chofer");
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        <NavBar />
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
              <Input
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                title="Pais"
                id="idPais"
                required
              />
              <Input
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                title="Provincia"
                id="idProvincia"
                required
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
                required
              />
              <Input
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                title="Tipo"
                id="idTipo"
                required
              />
              <Input
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                title="Horario"
                id="idHorario"
                required
              />
              <Input
                value={restriccionDeAcceso}
                onChange={(e) => setRestriccionDeAcceso(e.target.value)}
                title="Restricciones de acceso"
                id="idRestriccionesDeAcceso"
                required
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
    </>
  );
};

export default EditarDepositosPage;
