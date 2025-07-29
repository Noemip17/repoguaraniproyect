import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.mensaje || "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/principal");
    } catch (error) {
      setErrorMessage("Error de conexión con el servidor.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen flex flex-col items-center justify-center p-6">
      {/* Botón Volver al inicio */}
      <div className="w-full max-w-md mb-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
        >
          {/* Flecha/chevron izquierda (SVG inline, sin librerías) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M15.78 4.22a.75.75 0 010 1.06L9.06 12l6.72 6.72a.75.75 0 11-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>
          Volver al inicio
        </button>
      </div>

      <div className="bg-white/75 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Iniciar Sesión
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Correo Electrónico"
              required
              autoComplete="email"
            />
          </div>

          {/* Campo contraseña con “ojitos” */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg text-gray-700">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Contraseña"
                required
                autoComplete="current-password"
              />

              <button
                type="button"
                aria-label={showPassword ? "Mostrar contraseña" : "Ocultar contraseña"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                title={showPassword ? "Mostrar contraseña" : "Ocultar contraseña"}
              >
                {/* Ojo abierto/cerrado con SVG inline */}
                {showPassword ? (
                  // Ojo tachado
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="1.5" d="M3 3l18 18" />
                    <path strokeWidth="1.5" d="M10.58 6.11A9.75 9.75 0 0121 12c-1.35 2.68-4.95 6-9 6-1.28 0-2.5-.3-3.6-.84M6.1 9.42A9.78 9.78 0 003 12c1.35 2.68 4.95 6 9 6 .9 0 1.77-.13 2.59-.37" />
                    <path strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  // Ojo abierto
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="1.5" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-black text-lg font-bold py-3 px-4 rounded-full hover:bg-orange-700"
          >
            Iniciar Sesión
          </button>
        </form>

        {errorMessage && (
          <div className="text-red-600 text-center mt-4">{errorMessage}</div>
        )}

        <p className="mt-4 text-center">
          <a href="/recuperar-contrasena" className="text-orange-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>
    </div>
  );
}


