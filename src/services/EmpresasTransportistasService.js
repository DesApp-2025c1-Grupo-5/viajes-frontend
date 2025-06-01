import axios from "axios";

const API_URL =  import.meta.env.VITE_BACK_URL;
console.log(API_URL)

const service = {};

service.getAll = async () => {
  try {
    const response = await axios.get(`${API_URL}/empresasTransportistas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener transportistas", error);
    throw error;
  }
};

export default service;