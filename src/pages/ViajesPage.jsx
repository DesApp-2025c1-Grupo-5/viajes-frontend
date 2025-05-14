import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
//import Card from "../components/Card"
import Tabla from "../components/Tabla";
import { useEffect, useState } from "react";

const tablaViajes = [{
    id: 1234,
    origen: "Deposito Central",
    destino: "Deposito Norte",
    fecha_salida: "2023-04-12",
    fecha_llegada: "2023-04-25",
    vehiculo: "ABC-123"
},
{
    id: 1235,
    origen: "Deposito Sur",
    destino: "Deposito Central",
    fecha_salida: "2023-04-08",
    fecha_llegada: "2023-04-09",
    vehiculo: "GHI-789"
},
{
    id: 1236,
    origen: "Deposito Norte",
    destino: "Deposito Sur",
    fecha_salida: "2023-04-15",
    fecha_llegada: "-",
    vehiculo: "DEF-456"
},]

const ViajesPage = () => {
     return (
        <>
        <Header></Header>
        <div className = "flex">
        <div>
            <NavBar />
        </div>
        <div className="flex-1 p-6">
            <Title color="text-pink-600" title="Viajes" description="Gestiona los viajes entre depósitos"></Title>
            <Tabla viajes={tablaViajes} />
        </div>
      </div>
        </>
    );
}
 
export default ViajesPage;