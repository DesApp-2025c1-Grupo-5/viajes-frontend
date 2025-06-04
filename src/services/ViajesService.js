import axios from "axios";

const API_URL =  import.meta.env.VITE_BACK_URL;
console.log(API_URL)

const service = {};

service.getAll = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/viajes`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    throw error;
  }
};

service.create = async (nuevoViajes) => {
  try {
    const respuesta = await axios.post(`${API_URL}/viajes`, nuevoViajes);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear al nuevo viaje:", error)
  }
}

export default service;