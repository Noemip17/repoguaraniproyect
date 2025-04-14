// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./componentes/Home";
import Login from "./componentes/Login";
import Register from "./componentes/Register";
import Principal from "./componentes/Principal";

// Categorías
import Colores from "./assets/Categorias/Colores";
import Animales from "./assets/Categorias/Animales";
import Numeros from "./assets/Categorias/Numeros";
import ObjetosCasa from "./assets/Categorias/ObjetosCasa";
import Saludos from "./assets/Categorias/Saludos";
import Semana from "./assets/Categorias/Semana";

// Dinámicas
import Emparejar from "./assets/Dinamicas/Emparejar";
import Reconocer from "./assets/Dinamicas/Reconocer";
import Escribir from "./assets/Dinamicas/Escribir";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/principal" element={<Principal />} />

        {/* Categorías */}
        <Route path="/categorias/colores" element={<Colores />} />
        <Route path="/categorias/animales" element={<Animales />} />
        <Route path="/categorias/numeros" element={<Numeros />} />
        <Route path="/categorias/objetoscasa" element={<ObjetosCasa />} />
        <Route path="/categorias/saludos" element={<Saludos />} />
        <Route path="/categorias/semana" element={<Semana />} />

        {/* Dinámicas */}
        <Route path="/dinamicas/emparejar" element={<Emparejar />} />
        <Route path="/dinamicas/escribir" element={<Escribir />} />
        <Route path="/dinamicas/reconocer" element={<Reconocer />} />
      </Routes>
    </Router>
  );
}

export default App;

