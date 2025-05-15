import BackButton from "../../components/BackButton";
import Header from "../../components/Header"
import NavBar from "../../components/NavBar"
import TitleNew from "../../components/TitleNew"

const NuevoDepositoPage = () => {
     return (
      <>
        <Header></Header>
        <div className="flex">
          <NavBar></NavBar>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BackButton path="/depositos"/>
              <TitleNew color="text-orange-400" title="Nuevo Depósito" />
            </div>
          </div>
        </div>
      </>
     );
}
 
export default NuevoDepositoPage;