import React, { useEffect, useState } from "react";

const Emparejar = ({ datos, onCorrecto, avatarUrl, userName, vocabLearned }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [ordenAleatorio, setOrdenAleatorio] = useState([]);
  const [seleccion, setSeleccion] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Barajar al principio
  useEffect(() => {
    const barajado = [...datos].sort(() => Math.random() - 0.5);
    setOrdenAleatorio(barajado);
  }, [datos]);

  if (!datos || datos.length === 0 || ordenAleatorio.length === 0) {
    return <p className="p-4 text-red-600">No hay datos disponibles.</p>;
  }

  const actual = ordenAleatorio[indiceActual];
  const palabra = actual.palabra;
  const correcta = actual.traduccion.toLowerCase();

  // Generar opciones: incluir la correcta + 2 o 3 distractores aleatorios
  const obtenerOpciones = () => {
    const distractores = datos
      .filter((d) => d.traduccion !== actual.traduccion)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3); // 3 opciones distractoras
    const opciones = [...distractores, actual].sort(() => Math.random() - 0.5);
    return opciones.map((item) => ({
      fondo: item.color,
      nombre: item.traduccion.toLowerCase(),
    }));
  };

  const opciones = obtenerOpciones();

  const handleSeleccion = (color) => {
    setSeleccion(color);
    if (color === correcta) {
      setFeedback("✅ ¡Correcto!");
      onCorrecto?.();
      setTimeout(() => {
        setSeleccion(null);
        setFeedback(null);
        if (indiceActual + 1 < ordenAleatorio.length) {
          setIndiceActual(indiceActual + 1);
        } else {
          setFeedback("🎉 ¡Has terminado todos los colores!");
        }
      }, 1000);
    } else {
      setFeedback("❌ Intenta otra vez");
    }
  };

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
            <p className="text-sm text-gray-600">
              🧠 Vocabularios aprendidos: {vocabLearned}
            </p>
          </div>
        </div>
        <div className="text-yellow-500 text-3xl">⭐️⭐️⭐️</div>
      </header>

      <h2 className="text-2xl font-bold text-orange-600 mb-4">
        ¿Cuál es <span className="text-purple-700">{palabra}</span>?
      </h2>
      <p className="mb-6 text-gray-700">Toca el color correcto.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center">
        {opciones.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => handleSeleccion(opt.nombre)}
            className={`w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 shadow-md ${
              seleccion === opt.nombre
                ? opt.nombre === correcta
                  ? "ring-4 ring-green-400"
                  : "ring-4 ring-red-400"
                : ""
            }`}
          >
            <div className={`w-full h-full rounded-xl ${opt.fondo}`}></div>
          </div>
        ))}
      </div>

      {feedback && (
        <p className="mt-6 text-xl font-semibold text-purple-700">{feedback}</p>
      )}
    </div>
  );
};

export default Emparejar;
