import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import TitleNew from "../../components/TitleNew";
import FormTitle from "../../components/FormTitle";
import Input from "../../components/Input";
import DropdownButton from "../../components/DropDownButton";
import FormButtonCancel from "../../components/FormButtonCancel";
import FormButtonSave from "../../components/FormButtonSave";
import TextArea from "../../components/TextArea";
import vehiculoService from "../../services/VehiculosService";

const EditarViajePage = () => {
  return (
    <>
      <h1>Hola gera, continuá por esto, usá de ejemplo las anteriores pages</h1>
      <h1>Gio habló pestes de vos cuando no estabas</h1>
    </>
  );
};

export default EditarViajePage;
