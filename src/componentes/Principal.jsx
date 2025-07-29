import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Principal() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const avatarUrl = "/img/mascota.png";
  const vocabLearned = 0;

  const categories = [
    { id: "colores",  img: "/img/colores.png",   title: "Colores",           desc: "Aprende los colores en guaraní." },
    { id: "numeros",  img: "/img/numeros.png",   title: "Números",           desc: "Aprende los números en guaraní." },
    { id: "animales", img: "/img/animales.png",  title: "Animales",          desc: "Aprende los animales en guaraní." },
    { id: "semana",   img: "/img/calendario.png",title: "Días de la Semana", desc: "Aprende los días en guaraní." },
    { id: "emociones",img: "/img/emociones.jpg", title: "Emociones",         desc: "Aprende las emociones en guaraní." },
    { id: "saludos",  img: "/img/saludos.png",   title: "Saludos",           desc: "Aprende saludos en guaraní." },
  ];

  const startCategory = (category) => {
    navigate(`/categorias/${category}`);
  };

  // 👉 NUEVO: cerrar sesión
  const handleLogout = () => {
    // Si quieres confirmar:
    // if (!confirm("¿Cerrar sesión?")) return;

    localStorage.removeItem("token");
    // (Opcional) si quieres borrar progreso local:
    // localStorage.removeItem("puntosCategorias");

    navigate("/"); // ir al inicio / login
  };

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:5001/api/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await res.json();
        setUserName(data.nombre);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchPerfil();
  }, [navigate]);

  if (loading) return <div className="p-10 text-center text-lg">Cargando perfil...</div>;

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen w-full flex flex-col items-center p-6">
      {/* Encabezado del usuario */}
      <header className="w-full bg-white shadow-md rounded-xl p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-16 h-16 rounded-full border-4 border-yellow-400"
          />
          <div>
            <h1 className="text-2xl font-bold text-emerald-600">
              ¡Hola, {userName}!
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-yellow-500 text-3xl select-none">⭐️⭐️⭐️</div>
          {/* Botón Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded-lg shadow transition"
            type="button"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Bienvenida */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-2">
          ¡Vamos a aprender!
        </h2>
        <p className="text-lg text-gray-800">
          Elige una categoría divertida para comenzar 🚀
        </p>
      </div>

      {/* Categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-full max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => startCategory(cat.id)}
            className="bg-white rounded-2xl shadow-lg p-4 text-center cursor-pointer transition hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="w-24 h-24 mx-auto rounded-full border-4 border-orange-300 mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-blue-600">{cat.title}</h3>
            <p className="text-gray-600">{cat.desc}</p>
            {Math.random() > 0.5 && (
              <div className="mt-2 text-yellow-400 text-xl">🏅</div>
            )}
          </div>
        ))}
      </div>

      {/* Progreso */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-lg text-center max-w-3xl mx-auto w-full">
        <h3 className="text-2xl font-bold text-purple-600 mb-2">
          📊 Tu Progreso
        </h3>
        <p className="text-gray-700 mb-4">
          ¡Sigue aprendiendo para ganar más medallas y premios!
        </p>
        <div className="bg-gray-200 rounded-full h-5">
          <div
            className="bg-green-500 h-5 rounded-full transition-all duration-300"
            style={{ width: `${(vocabLearned / 50) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Nivel: {Math.floor(vocabLearned / 10)} de 5
        </p>
      </div>
    </div>
  );
}
