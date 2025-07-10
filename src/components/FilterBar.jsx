import { useEffect, useState } from "react";
import { FunnelIcon, TrashIcon } from "@heroicons/react/24/solid";
import ComboboxField from "./ComboboxField";
import {choferesService, depositosService, empresasTransportistasService, vehiculosService} from "../services";


const FilterBar = ({ onFilter, onClear, filtrosActuales = {} }) => {
  const [filtros, setFiltros] = useState({
    tipoDeViaje: "",
    fecha_desde: "",
    fecha_hasta: "",
    nroViaje: "",
    empresa: "",
    chofer: "",
    patente: "",
    provinciaOrigen: "",
    provinciaDestino: "",
    depositoOrigen: "",
    depositoDestino: "",
    ...filtrosActuales // Override with any existing filters
  });

  const [empresas, setEmpresas] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [patentes, setPatentes] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [depositos, setDepositos] = useState([]);


useEffect(() => {
  const obtenerDepositos = async () => {
    const depositosData = await depositosService.getAll();
    setDepositos(depositosData);
    setProvincias([
      ...new Set(depositosData.map((d)=> d.provincia).filter(Boolean))
    ])
  };
  obtenerDepositos();

  const obtenerEmpresas = async () => {
    const empresasData = await empresasTransportistasService.getAll();
    setEmpresas(empresasData.map((e) => e.razon_social).filter(Boolean));
  };
  obtenerEmpresas();

  const obtenerChoferes = async () => {
    const data = await choferesService.getAll();
    setChoferes([
      ...new Set(data.map((c) => c.nombre && c.apellido
                                  ? `${c.nombre} ${c.apellido}`
                                  : null
                          )
                          .filter(Boolean)),
    ]);
  }
  obtenerChoferes();

  const obtenerVehiculos = async () => {
    const vehiculos = await vehiculosService.getAll();
    setPatentes(vehiculos.map((v)=>v.patente));
  }
  obtenerVehiculos();

  
}, []);

// Update local state when filtrosActuales prop changes
useEffect(() => {
  if (filtrosActuales && Object.keys(filtrosActuales).length > 0) {
    setFiltros(prev => ({
      ...prev,
      ...filtrosActuales
    }));
  }
}, [filtrosActuales]);


  const handleChange = (field, value) => {
    setFiltros((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filtros);
  };

  return (
    <form
      onSubmit={handleSubmit}
      // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 ml-[-16px]" 
      style={{ maxWidth: "100%" }}
      >
      <div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 ml-[-16px]" 
        // className="flex gap-6"
        style={{ maxWidth: "100%" }}
      >

        <div className="flex flex-col gap-1">
        <label className="block text-sm font-medium text-gray-500">
          Tipo de Viaje:
        </label>
        <select
          value={filtros.tipoDeViaje}
          onChange={(e) => handleChange("tipoDeViaje", e.target.value)}
          className={`border border-gray-300 rounded-lg px-2 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 
            ${!filtros.tipoDeViaje ?  "text-gray-400" : ""}`}
        >
          <option value="">Todos los Viajes</option>
          <option value="Nacional">Viajes Nacionales</option>
          <option value="Internacional">Viajes Internacionales</option>
        </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-500">
            Fecha Desde:
          </label>
          <input
            type="date"
            value={filtros.fecha_desde ? filtros.fecha_desde.split("T")[0] : ""}
            onChange={(e) =>
              handleChange(
                "fecha_desde",
                e.target.value ? new Date(e.target.value).toISOString() : ""
              )
            }   
            className={`border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300
                ${!filtros.fecha_desde ?  "text-gray-400" : ""}`}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-500">
            Fecha Hasta:
          </label>
          <input
            type="date"
            value={filtros.fecha_hasta ? filtros.fecha_hasta.split("T")[0] : ""}
            onChange={(e) =>
              handleChange(
                "fecha_hasta",
                e.target.value ? new Date(e.target.value).toISOString() : ""
              )
            }   
          className={`border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300
              ${!filtros.fecha_hasta ?  "text-gray-400" : ""}`}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-500">
            Número de Viaje:
          </label>
          <input
            type="number"
            placeholder="N° de viaje"
            value={filtros.nroViaje}
            onChange={(e) => handleChange("nroViaje", e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <ComboboxField
          label="Empresa Transportista"
          placeholder={"Todas las Empresas"}
          value={filtros.empresa}
          onChange={(val) => handleChange("empresa", val)}
          options={empresas}
          
        />

        <ComboboxField
          label="Chofer"
          placeholder={"Todos los Choferes"}
          value={filtros.chofer}
          onChange={(val) => handleChange("chofer", val === "Todos los choferes" ? "" : val)}
          options={choferes}
        />
        <ComboboxField
          label="Patente"
          placeholder={"Todas las Patentes"}
          value={filtros.patente}
          onChange={(val) => handleChange("patente", val)}
          options={patentes}
          />
        <ComboboxField
          label="Provincia origen"
          placeholder={"Todas las Provincias"}
          value={filtros.provinciaOrigen}
          onChange={(val) => handleChange("provinciaOrigen", val)}
          options={provincias}
          />
        <ComboboxField
          label="Provincia destino"
          placeholder={"Todas las Provincias"}
          value={filtros.provinciaDestino}
          onChange={(val) => handleChange("provinciaDestino", val)}
          options={provincias}
        />
        <ComboboxField
          label="Depósito origen"
          placeholder={"Todos los Depósitos"}
          value={filtros.depositoOrigen}
          onChange={(val) => handleChange("depositoOrigen", val)}
          options={depositos.map((d) => d.nombre)}
          />
        <ComboboxField
          label="Depósito destino"
          placeholder={"Todos los Depósitos"}
          value={filtros.depositoDestino}
          onChange={(val) => handleChange("depositoDestino", val)}
          options={depositos.map((d) => d.nombre)}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 py-4 max-w-100">
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
          <FunnelIcon className="w-4 h-4" />
          Filtrar
        </button>
        <button
          type="submit"
          onClick={() => {
            setFiltros({
              tipoDeViaje: "",
              fecha_desde: "",
              fecha_hasta: "",
              nroViaje: "",
              empresa: "",
              chofer: "",
              patente: "",
              provinciaOrigen: "",
              provinciaDestino: "",
              depositoOrigen: "",
              depositoDestino: "",
            })
            onClear();
          }}
          className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
  >
          <TrashIcon className="w-4 h-4" />
            Limpiar
        </button>

      </div>

    </form>
  );
};

export default FilterBar;
