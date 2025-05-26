import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Usuario registrado con éxito");
        navigate("/login");
      } else {
        alert(data.mensaje || "❌ Error al registrar usuario");
      }
    } catch (error) {
      console.error("❌ Error al registrar:", error);
      alert("Error en la conexión al servidor");
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white/75 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Registrarse</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nombre de Usuario"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600  text-gray-600 text-lg font-bold py-3 px-4 rounded-full hover:bg-orange-700"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-orange-600 underline">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}
