  // src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const loginS = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen w-full flex flex-col items-center p-6">
      {/* Barra de navegación */}
      <header className="w-full flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-white">📚 Aprende vocabularios en Guaraní</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold shadow-md hover:bg-gray-200"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => navigate("/registro")}
            className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold shadow-md hover:bg-gray-200"
          >
            Registrar
          </button>
        </div>
        
      </header>

      {/* Personaje Guía */}
      <div className="text-center mt-10">
        <img
          src="/img/mascota.png"
          alt="Yagu"
          className="w-40 h-40 mx-auto bounce"
        />
        <h2 className="text-4xl font-bold text-white">¡Hola! Soy Yagu-Yagu</h2>
        <p className="text-lg text-white">Aprendamos vocalubarios sencillos en guaraní.</p>
      </div>

      {/* Botón de Empezar */}
      <div className="mt-6">
        <button
          onClick={loginS}
          className="bg-green-500 hover:bg-green-700 text-black text-xl font-bold py-4 px-8 rounded-full shadow-lg transition-all animate-bounce"
        >
          🚀 Empezar
        </button>
      </div>

      {/* Sección de Beneficios */}
      <div className="mt-12 bg-white/75 p-6 rounded-xl shadow-lg text-center w-3/4">
        <h3 className="text-2xl font-bold text-orange-600">🌟 ¿Por qué aprender con nosotros?</h3>
        <ul className="text-gray-700 mt-4 space-y-2">
          <li>🎮 Juegos interactivos</li>
          <li>🏆 Sistema de recompensas</li>
          <li>🚀 Desafíos y logros</li>
        </ul>
      </div>
    </div>
  );
}

