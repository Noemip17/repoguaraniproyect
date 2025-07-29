import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TECLADO_GUARANI = [
  "ã", "ẽ", "ĩ", "õ", "ũ",
  "ñ",
  "'", "-", // incluye tilde, guion y apostrofe
];

const Escribir = ({ datos, onCorrecto, avatarUrl, userName, vocabLearned }) => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const agregarLetra = (letra) => {
    setInput((prev) => prev + letra);
  };

  const borrarLetra = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const verificar = () => {
    if (!datos) return;

    if (input.trim().toLowerCase() === datos.palabra.toLowerCase()) {
      setFeedback("✅ ¡Correcto!");
      setInput("");
      onCorrecto?.();
    } else {
      setFeedback("❌ Inténtalo de nuevo.");
    }
  };

  if (!datos) {
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
              Es momento de escribir
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
        <h2 className="text-2xl font-semibold mb-4">Escribir</h2>
        <p className="text-lg mb-2">¿Cómo se escribe en guaraní el color que ves?</p>

        <div className={`w-32 h-32 mx-auto rounded-lg ${datos.color} mb-4`}></div>

        <input
          type="text"
          className="mt-4 p-2 border rounded w-full text-center text-lg"
          placeholder="Escribe aquí..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="ml-2 bg-blue-500 text-black px-4 py-2 rounded mt-3"
          onClick={verificar}
          type="button"
        >
          Verificar
        </button>

        {feedback && (
          <p className="mt-4 text-lg font-medium text-purple-700">{feedback}</p>
        )}

        <div className="mt-6 grid grid-cols-10 gap-2 justify-center">
          {TECLADO_GUARANI.map((letra) => (
            <button
              key={letra}
              className="bg-gray-200 rounded p-2 hover:bg-gray-300 transition"
              onClick={() => agregarLetra(letra)}
              type="button"
            >
              {letra}
            </button>
          ))}
          <button
            className="bg-red-400 text-white rounded p-2 col-span-2 hover:bg-red-600 transition"
            onClick={borrarLetra}
            type="button"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Escribir;








