import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


const Reconocer = ({ datos, onCorrecto, avatarUrl, userName, vocabLearned }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  // Reproducir audio cuando cambia currentIndex y solo si el usuario ha interactuado (clic en "Reproducir audio")
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn("Error al reproducir audio:", error);
      });
    }
  };

  const handleEntendido = () => {
    if (currentIndex < datos.length - 1) {
      setCurrentIndex(currentIndex + 1); // Ir al siguiente color
    } else {
      onCorrecto?.(); // Llama solo si existe
    }
  };

  if (!datos || datos.length === 0) {
    return <p className="text-center mt-10 text-red-600">No hay datos para mostrar.</p>;
  }

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen w-full flex flex-col items-center p-6">
      {/* Encabezado del usuario */}
      <header className="w-full bg-white shadow-md rounded-xl p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl || "/img/mascota.png"}
            alt="Yagu"
            className="w-16 h-16 rounded-full border-4 border-yellow-400"
          />
          <div>
            <h1 className="text-2xl font-bold text-emerald-600">
              Aprende a pronunciar los colores
            </h1>
          </div>
        </div>
         <button
          type="button"
          onClick={() => {
            console.log("Navegando a /principal");
              navigate("/principal");
            }}
          className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
        >
          {/* Flecha/chevron izquierda (SVG inline, sin librerías) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M15.78 4.22a.75.75 0 010 1.06L9.06 12l6.72 6.72a.75.75 0 11-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>
          Volver al inicio
        </button>
      </header>
      <div className="text-center bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Reconocer</h2>
        <p className="text-sm text-gray-500">(Así se escribe)</p>
        <p className="text-lg mb-2">
          {datos[currentIndex].palabra} - {datos[currentIndex].traduccion}
        </p>

        <div className={`w-32 h-32 mx-auto rounded-lg ${datos[currentIndex].color} mb-4`}></div>

        {/* Contenedor para centrar el audio */}
        <div className="flex justify-center mb-4">
          <audio
            ref={audioRef}
            src={datos[currentIndex].audio}
            preload="auto"
            controls
            className="w-64"
          >
            Tu navegador no soporta audio.
          </audio>
        </div>

        {/* Contenedor para centrar botones y separarlos */}
        <div className="flex justify-center gap-4">
          <button
            className="bg-green-500 text-black px-6 py-2 rounded"
            onClick={handleEntendido}
            type="button"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reconocer;
