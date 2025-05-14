import Header from "../components/Header"
import NavBar from "../components/NavBar"
import TitleNew from "../components/TitleNew"
import {ArrowLeft} from 'lucide-react';

const NuevoViaje = () => {
     return (
      <>
        <Header></Header>
        <div className="flex">
          <NavBar></NavBar>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-6">
              <ArrowLeft className="w-7 h-7 cursor-pointer" />
              <TitleNew color="text-pink-600" title="Nuevo Viaje" />
            </div>
          </div>
        </div>
      </>
     );
}
 
export default NuevoViaje;