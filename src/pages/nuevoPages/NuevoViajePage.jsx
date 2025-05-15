import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import TableTitle from "../../components/TableTitle";
import DropdownButton from "../../components/DropDownButton";

const NuevoViajePage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex">
        <NavBar></NavBar>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BackButton path="/viajes" />
            <TitleNew color="text-pink-300" title="Nuevo Viaje" />
          </div>
          <div>
            <TableTitle
              color="black"
              title="Información del viaje"
              description="Ingresa los datos del nuevo viaje a registrar en el sistema"
            ></TableTitle>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-8">
            <DropdownButton
              titulo="Deposito origen"
              buttonText="Seleccionar"
              onClick={() => alert("clicked!")}
            ></DropdownButton>
            <DropdownButton
              titulo="Deposito destino"
              buttonText="Seleccionar"
              onClick={() => alert("clicked!")}
            ></DropdownButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevoViajePage;
