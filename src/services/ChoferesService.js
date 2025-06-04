import axios from "axios";

const API_URL =  import.meta.env.VITE_BACK_URL;
console.log(API_URL)

const service = {};

service.getAll = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/choferes`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener choferes:", error);
    throw error;
  }
};

service.create = async (nuevoChofer) => {
  try {
    const respuesta = await axios.post(`${API_URL}/choferes`, nuevoChofer);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear al nuevo chofer:", error)
  }
}

export default service;