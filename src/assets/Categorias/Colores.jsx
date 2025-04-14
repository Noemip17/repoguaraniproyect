
import React, { useState } from "react";

import Reconocer from "../Dinamicas/Reconocer";
import Emparejar from "../Dinamicas/Emparejar";
import Escribir from "../Dinamicas/Escribir";

const datosColores = [
    {
      palabra: "Pyta",
      traduccion: "Rojo",
      audio: "/audio/pyta.mp3",
      color: "bg-red-500",
    },
    {
      palabra: "Hovy",
      traduccion: "Azul",
      audio: "/audio/hovy.mp3",
      color: "bg-blue-500",
    },
    {
        palabra: "Sayju",
        traduccion: "amarillo",
        audio: "/audio/hovy.mp3",
        color: "bg-yellow-300",
      },
  ];
  
  const Colores = () => {
    const [paso, setPaso] = useState(0);
  
    const handleCorrecto = () => {
      setPaso((prev) => prev + 1);
    };
  
    const actividades = [
      <Reconocer datos={datosColores} onCorrecto={handleCorrecto} />,
      <Emparejar datos={datosColores} onCorrecto={handleCorrecto} />,
      <Escribir datos={datosColores} onCorrecto={handleCorrecto} />
    ];
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
        {actividades[paso]}
      </div>
      
    );
  };
  
  export default Colores;
  