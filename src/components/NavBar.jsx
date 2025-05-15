import NavBarButton from "./NavBarButton";
import { Truck, Users, Warehouse, Building2, Map, Home } from "lucide-react";

const NavBar = () => {
  return (
    <div className="">
      <div className="h-[calc(100vh-2rem)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-600">
        <div>
          <ul className="space-y-8">
            <li>
              <NavBarButton icon={<Home />} name="Dashboard" path="/" />
            </li>
            <li>
              <NavBarButton
                icon={<Truck />}
                name="Vehículos"
                path="/vehiculos"
              />
            </li>
            <li>
              <NavBarButton icon={<Users />} name="Choferes" path="/choferes" />
            </li>
            <li>
              <NavBarButton
                icon={<Warehouse />}
                name="Depósitos"
                path="/depositos"
              />
            </li>
            <li>
              <NavBarButton
                icon={<Building2 />}
                name="Transportistas"
                path="/transportistas"
              />
            </li>
            <li>
              <NavBarButton icon={<Map />} name="Viajes" path="/viajes" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
