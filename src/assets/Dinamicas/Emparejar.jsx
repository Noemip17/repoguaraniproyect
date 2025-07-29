import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const coloresCss = {
  "bg-red-500": "#ef4444",
  "bg-blue-500": "#3b82f6",
  "bg-yellow-300": "#fde68a",
  "bg-green-500": "#22c55e",
  "bg-orange-400": "#fb923c",
  "bg-purple-500": "#a855f7",
  "bg-pink-400": "#f472b6",
  "bg-gray-400": "#9ca3af",
  "bg-black": "#000000",
  "bg-white": "#ffffff",
  "bg-gray-300": "#d1d5db",
};

const Emparejar = ({ datos, onCorrecto, vocabLearned }) => {
  const [listaIzquierda, setListaIzquierda] = useState([]);
  const [listaDerecha, setListaDerecha] = useState([]);
  const [seleccionIzq, setSeleccionIzq] = useState(null);
  const [seleccionDer, setSeleccionDer] = useState(null);
  const [aciertos, setAciertos] = useState([]);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!datos) return;

    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
    const izquierda = shuffle(datos.map((item, idx) => ({ ...item, idx })));
    const derecha = shuffle(datos.map((item, idx) => ({ ...item, idx })));

    setListaIzquierda(izquierda);
    setListaDerecha(derecha);
    setAciertos([]);
    setSeleccionIzq(null);
    setSeleccionDer(null);
    setFeedback("");
  }, [datos]);

  const esEmparejamientoCorrecto = (izq, der) => izq.idx === der.idx;

  const manejarSeleccionIzq = (item) => {
    if (aciertos.includes(item.idx)) return;
    setSeleccionIzq(item);
    if (seleccionDer) verificarEmparejamiento(item, seleccionDer);
  };

  const manejarSeleccionDer = (item) => {
    if (aciertos.includes(item.idx)) return;
    setSeleccionDer(item);
    if (seleccionIzq) verificarEmparejamiento(seleccionIzq, item);
  };

  const verificarEmparejamiento = (izq, der) => {
    if (esEmparejamientoCorrecto(izq, der)) {
      setFeedback("✅ ¡Correcto!");
      setAciertos((prev) => [...prev, izq.idx]);
      setSeleccionIzq(null);
      setSeleccionDer(null);

      if (aciertos.length + 1 === datos.length) {
        setTimeout(() => {
          setFeedback("");
        }, 1000);
      }
    } else {
      setFeedback("❌ Intenta de nuevo.");
      setTimeout(() => {
        setFeedback("");
        setSeleccionIzq(null);
        setSeleccionDer(null);
      }, 1000);
    }
  };

  const renderElementoIzquierda = (item) => {
    if (item.color && coloresCss[item.color]) {
      const colorBg = coloresCss[item.color];
      const isWhite = colorBg === "#ffffff";
      return (
        <div
          className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 shadow-inner`}
          style={{
            backgroundColor: colorBg,
            borderColor: isWhite ? "#ccc" : "transparent",
          }}
        />
      );
    }

    if (item.imagen) {
      return (
        <img
          src={`/img/${item.imagen}`}
          alt={item.traduccion}
          className="w-16 h-16 md:w-20 md:h-20 object-contain rounded"
        />
      );
    }

    return <div className="text-gray-400">N/A</div>;
  };

  const renderElementoDerecha = (item) => {
    return (
      <div className="text-lg font-semibold text-black text-center px-2">
        {item.palabra}
      </div>
    );
  };

  const renderCuadro = (item, seleccionado, onClick, esIzquierda) => {
    const seleccionadoIdx = esIzquierda ? seleccionIzq?.idx : seleccionDer?.idx;
    return (
      <div
        key={item.idx}
        onClick={() => onClick(item)}
        className={`cursor-pointer p-4 rounded-xl transition-all duration-300 shadow-lg border-2 text-center select-none ${
          aciertos.includes(item.idx)
            ? "bg-green-200 border-green-400 scale-95"
            : seleccionadoIdx === item.idx
            ? "bg-yellow-100 border-yellow-400 scale-105"
            : "bg-white/80 border-gray-300 hover:scale-105 hover:border-orange-400"
        }`}
      >
        {esIzquierda
          ? renderElementoIzquierda(item)
          : renderElementoDerecha(item)}
      </div>
    );
  };

  const todosCompletos = aciertos.length === datos.length;

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen w-full p-6 flex flex-col items-center">
      {/* Encabezado */}
      <header className="w-full max-w-5xl bg-white shadow-md rounded-xl p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="/img/mascota.png"
            alt="Yagu"
            className="w-16 h-16 rounded-full border-4 border-yellow-400"
          />
          <div>
            <h1 className="text-2xl font-bold text-emerald-600">
              ¡Vamos a emparejar!
            </h1>
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
          </div>
        </div>
      </header>

      {/* Juego */}
      <div className="bg-white/90 p-6 rounded-2xl shadow-xl w-full max-w-5xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-orange-700">Emparejar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Izquierda */}
          <div>
            <h3 className="mb-3 font-bold text-emerald-600 text-lg">Color o Imagen</h3>
            <div className="space-y-3">
              {listaIzquierda.map((item) =>
                renderCuadro(item, seleccionIzq, manejarSeleccionIzq, true)
              )}
            </div>
          </div>

          {/* Derecha */}
          <div>
            <h3 className="mb-3 font-bold text-emerald-600 text-lg">Palabra en Guaraní</h3>
            <div className="space-y-3">
              {listaDerecha.map((item) =>
                renderCuadro(item, seleccionDer, manejarSeleccionDer, false)
              )}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <p className="mt-4 text-lg font-medium text-purple-700">{feedback}</p>
        )}

        {/* Botón continuar */}
        {todosCompletos && (
          <button
            onClick={onCorrecto}
            className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold text-lg rounded-xl shadow-md transition"
          >
            🎉 ¡Continuar!
          </button>
        )}
      </div>
    </div>
  );
};

export default Emparejar;














