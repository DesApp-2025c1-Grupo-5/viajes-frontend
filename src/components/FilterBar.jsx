import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import {choferesService, depositosService, empresasTransportistasService, vehiculosService} from "../services";

const ComboboxField = ({ label, value, onChange, options }) => {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-60">
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className="w-full border rounded px-3 py-2"
            placeholder={label}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setQuery("")}
            displayValue={(val) => val}
          />
          {filtered.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-lg">
              {filtered.map((item, index) => (
                <Combobox.Option
                  key={index}
                  value={item}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {item}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

const FilterBar = ({ onFilter, onClear }) => {
  const [filtros, setFiltros] = useState({
    tipoDeViaje: "",
    fecha_salida: "",
    fecha_llegada: "",
    nroViaje: "",
    empresa: "",
    chofer: "",
    patente: "",
    provinciaOrigen: "",
    provinciaDestino: "",
    depositoOrigen: "",
    depositoDestino: "",
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


  const handleChange = (field, value) => {
    setFiltros((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filtros);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 p-4">
      
      <select
        value={filtros.tipoDeViaje}
        onChange={(e) => handleChange("tipoDeViaje", e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Todos los Viajes</option>
        <option value="Nacional">Viajes Nacionales</option>
        <option value="Internacional">Viajes Internacionales</option>
      </select>

      <input
        type="date"
        value={filtros.fecha_salida ? filtros.fecha_salida.split("T")[0] : ""}
        onChange={(e) =>
          handleChange(
            "fecha_salida",
            e.target.value ? new Date(e.target.value).toISOString() : ""
          )
        }   
      className="border rounded px-3 py-2"
      />

      <input
        type="date"
        value={filtros.fecha_llegada ? filtros.fecha_llegada.split("T")[0] : ""}
        onChange={(e) =>
          handleChange(
            "fecha_llegada",
            e.target.value ? new Date(e.target.value).toISOString() : ""
          )
        }   
      className="border rounded px-3 py-2"
      />

      <input
        type="number"
        placeholder="N° de viaje"
        value={filtros.nroViaje}
        onChange={(e) => handleChange("nroViaje", e.target.value)}
        className="border rounded px-3 py-2"
      />

      <ComboboxField
        label="Empresa"
        value={filtros.empresa}
        onChange={(val) => handleChange("empresa", val)}
        options={empresas}
      />

      <ComboboxField
        label="Chofer"
        value={filtros.chofer}
        onChange={(val) => handleChange("chofer", val === "Todos los choferes" ? "" : val)}
        options={choferes}
      />
      <ComboboxField
        label="Patente"
        value={filtros.patente}
        onChange={(val) => handleChange("patente", val)}
        options={patentes}
      />
      <ComboboxField
        label="Provincia origen"
        value={filtros.provinciaOrigen}
        onChange={(val) => handleChange("provinciaOrigen", val)}
        options={provincias}
      />
      <ComboboxField
        label="Provincia destino"
        value={filtros.provinciaDestino}
        onChange={(val) => handleChange("provinciaDestino", val)}
        options={provincias}
      />
      <ComboboxField
        label="Depósito origen"
        value={filtros.depositoOrigen}
        onChange={(val) => handleChange("depositoOrigen", val)}
        options={depositos.map((d) => d.nombre)}
      />
      <ComboboxField
        label="Depósito destino"
        value={filtros.depositoDestino}
        onChange={(val) => handleChange("depositoDestino", val)}
        options={depositos.map((d) => d.nombre)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Filtrar
      </button>
      <button
        type="submit"
        onClick={() => {
          setFiltros({
            tipoDeViaje: "",
            fecha_salida: "",
            fecha_llegada: "",
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
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
      >
        Limpiar
      </button>

    </form>
  );
};

export default FilterBar;
