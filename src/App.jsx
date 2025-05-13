import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";
import { getCurrentWeather } from "./services/WeatherService";
import { WeatherIndicator } from "./components/WeatherIndicator";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

export function App() {
  return (
    <>
      <Header />
      <NavBar />
    </>
  );
}
