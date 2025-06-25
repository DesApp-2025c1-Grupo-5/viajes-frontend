import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL;
console.log(API_URL);

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

service.post = async (nuevoChofer) => {
  try {
    const respuesta = await axios.post(`${API_URL}/choferes`, nuevoChofer);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear al nuevo chofer:", error);
  }
};

service.getChoferById = async (id) => {
  try {
    const respuesta = await axios.get(`${API_URL}/choferes/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("No existe chofer con el id:", error);
  }
};

service.updateChofer = async (id, chofer) => {
  try {
    const respuesta = await axios.put(`${API_URL}/choferes/${id}`, chofer);
    return respuesta.data;
  } catch (error) {
    console.error("No existe chofer con el id:", error);
  }
};

service.deleteChofer = async (id) => {
  try {
    const respuesta = await axios.delete(`${API_URL}/choferes/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("No existe chofer con el id:", error);
  }
};

export default service;
