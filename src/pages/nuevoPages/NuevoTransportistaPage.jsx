import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";

const NuevoTransportistaPage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar></NavBar>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/transportistas" />
            <TitleNew color="text-purple-400" title="Nuevo Transportista" />
          </div>
          <FormTitle
            color="black"
            title="Información del transportista"
            description="Ingresa los datos del nuevo transportista a registrar en el sistema"
          ></FormTitle>
          <div className="grid grid-cols-2 gap-8 max-w-5xl">
            <Input
              placeholder="Ej: Transporte rápido S.A"
              title="Razon social"
              id="idTransporteRapido"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 2020202020"
              title="CUIT/RUT"
              id="idCuit"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: abcdefga@hotmail.com"
              title="E-mail"
              id="idEMail"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: 1111111111"
              title="Telefono"
              id="idTelefono"
              required={true}
            ></Input>
            <Input 
              placeholder="Ej: Argentina" 
              title="Pais" 
              id="idPais"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Buenos Aires"
              title="Provincia/Estado"
              id="idProvinciaEstado"
              required={true}
            ></Input>
            <Input
              placeholder="Ej: Activo"
              title="Domicilio Fiscal"
              id="idDomicilioFiscal"
              required={true}
            ></Input>
            <div></div>
            <TextArea
              placeholder="Ej: Informacion sobre el chofer"
              title="Observaciones"
              id="idObservaciones"
            ></TextArea>
            <div></div>
            <div></div>
            <div className="flex justify-end w-full gap-8">
              <FormButtonCancel></FormButtonCancel>
              <FormButtonSave></FormButtonSave>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevoTransportistaPage;
