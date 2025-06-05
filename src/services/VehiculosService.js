import axios from "axios";

const API_URL =  import.meta.env.VITE_BACK_URL;
console.log(API_URL)

const service = {};

service.getAll = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/vehiculos`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    throw error;
  }
};

service.create = async (nuevoVehiculo) => {
  try {
    const respuesta = await axios.post(`${API_URL}/vehiculos`, nuevoVehiculo);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear al nuevo vehículo:", error)
  }
}

export default service;