
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const validEmail = "usuario@ejemplo.com";
  const validPassword = "123456";
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email === validEmail && password === validPassword) {
      navigate("/principal");
    } else {
      setErrorMessage("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white/75 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Correo Electrónico"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Contraseña"
              required
            />
          </div>

          <button
            type="submit"

            className="w-full bg-orange-600  text-gray-600 text-lg font-bold py-3 px-4 rounded-full hover:bg-orange-700"
          >
            Iniciar Sesión
          </button>
        </form>

        {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
      </div>
    </div>
  );
}
