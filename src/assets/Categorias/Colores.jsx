import React, { useState, useEffect } from "react";
import Reconocer from "../Dinamicas/Reconocer"; // Importar Reconocer correctamente
import Emparejar from "../Dinamicas/Emparejar";
import Escribir from "../Dinamicas/Escribir";
import { useNavigate } from "react-router-dom";

// Mapeo manual de colores a clases de Tailwind
const coloresTailwind = {
  rojo: "red-500",
  azul: "blue-500",
  amarillo: "yellow-300",
  verde: "green-500",
  naranja: "orange-400",
  morado: "purple-500",
  violeta: "purple-500",
  rosa: "pink-400",
  negro: "black",
  blanco: "white",
  gris: "gray-400",
  celeste: "sky-400",
  marron: "amber-700",
  turquesa: "teal-400",
  lima: "lime-400",
  fucsia: "fuchsia-500",
  indigo: "indigo-500",
  cyan: "cyan-400",
  beige: "stone-300",
  salmón: "rose-400",
  oro: "yellow-400",
  plata: "gray-300",
  bordó: "red-900",
  berenjena: "purple-900",
  aguamarina: "teal-300",
  celesteclaro: "sky-300",
  marronclaro: "amber-300",
};

const Colores = ({ categoria = "colores" }) => {
  const [paso, setPaso] = useState(0);
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // Función para obtener clase de color Tailwind
  const obtenerColor = (colorNombre) => {
    if (!colorNombre || typeof colorNombre !== "string") return "bg-gray-300";

    let clave = colorNombre
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");

    const tailwindColor = coloresTailwind[clave];

    if (tailwindColor === "white") return "bg-white border border-gray-400";
    if (tailwindColor === "black") return "bg-black";
    if (tailwindColor) return `bg-${tailwindColor}`;

    return "bg-gray-300"; // fallback
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/traducciones/${categoria}`);
        const data = await res.json();

        // Agregar ruta local de audio en public/colores/
        const datosFormateados = data.map((item) => ({
          palabra: item.gn,
          traduccion: item.es,
          color: obtenerColor(item.es),
          audio: `/colores/${item.es.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")}.mp3`,
        }));

        setDatos(datosFormateados);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [categoria]);

  const handleCorrecto = () => {
    setPaso((prev) => prev + 1);
  };

  if (cargando) return <div className="p-6 text-center text-xl">Cargando datos del color...</div>;
  if (!datos.length) return <div>No hay datos disponibles.</div>;

  const actividades = [
    <Reconocer key="1" datos={datos} onCorrecto={handleCorrecto} />,
    <Emparejar key="2" datos={datos} onCorrecto={handleCorrecto} />,
    <Escribir key="3" datos={datos[Math.floor(Math.random() * datos.length)]} onCorrecto={handleCorrecto} />,
  ];

  return (
  <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen w-full flex flex-col items-center p-6">
    {paso < actividades.length ? (
      <>
        {/* Actividad actual */}
        {actividades[paso]}

        {/* Encabezado del usuario (solo mientras hay actividades) */}
      </>
    ) : (
      <>
        {/* ✅ Pantalla final cuando se completan los 3 pasos */}
        <div className="text-center mt-10">
          <img
            src="/img/mascota.png"
            alt="Yagu"
            className="w-40 h-40 mx-auto animate-bounce"
          />
          <h2 className="text-4xl font-bold text-white">¡Has terminado con éxito!</h2>
          <p className="text-lg text-white">Aprendamos más vocabularios sencillos en guaraní.</p>
        </div>

        {/* ✅ Aquí sí pedimos volver al usuario a la principal */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/principal")}
            className="bg-green-500 hover:bg-green-700 text-black text-xl font-bold py-4 px-8 rounded-full shadow-lg transition-all animate-bounce"
          >
            🚀 Volver a Categoria
          </button>
        </div>
      </>
    )}
  </div>
);

};

export default Colores;
