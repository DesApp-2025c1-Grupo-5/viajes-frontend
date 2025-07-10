import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL;
console.log(API_URL);

const service = {};

service.getAll = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/depositos`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener depósitos:", error);
    throw error;
  }
};

service.post = async (nuevoDeposito) => {
  try {
    const respuesta = await axios.post(`${API_URL}/depositos`, nuevoDeposito);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear al nuevo depósito:", error); 
    throw error;
  }
};

service.getDepositoById = async (id) => {
  try {
    const respuesta = await axios.get(`${API_URL}/depositos/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("No existe chofer con el deposito:", error);
    throw error;
  }
};

service.updateDeposito = async (id, deposito) => {
  try {
    const respuesta = await axios.put(`${API_URL}/depositos/${id}`, deposito);
    return respuesta.data;
  } catch (error) {
    console.error("No existe deposito con el id:", error);
    throw error;
  }
};

service.deleteDeposito = async (id) => {
  try {
    const respuesta = await axios.delete(`${API_URL}/depositos/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("No existe deposito con el id:", error);
    throw error;
  }
};

service.getCountDepositosActivos = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/depositos/count`);
    return respuesta.data.count;
  } catch (error) {
    console.error("Error al obtener la cantidad de depositos:", error);
    throw error;
  }
};

export default service;
