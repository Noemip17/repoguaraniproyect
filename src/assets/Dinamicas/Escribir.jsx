import React, { useState } from "react";

const Escribir = ({ datos, onCorrecto, avatarUrl, userName, vocabLearned }) => {
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState("");

    const verificar = () => {
        if (input.trim() === datos.palabra) {
            setFeedback("✅ ¡Correcto!");
            onCorrecto?.();
        } else {
            setFeedback("❌ Inténtalo de nuevo.");
        }
    };

    console.log("Color recibido:", datos.color); // Debug

    return (
        <div className="bg-gradient-to-b from-yellow-300 to-orange-500 min-h-screen w-full flex flex-col items-center p-6">
            {/* Encabezado del usuario */}
            <header className="w-full bg-white shadow-md rounded-xl p-4 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img
                        src="/img/mascota.png"
                        alt="Yagu"
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

            {/* Contenido del ejercicio */}
            <div className="text-center bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Escribir</h2>
                <p className="text-lg mb-2">¿Cómo se escribe en guaraní el color que ves?</p>

                <div className={`w-32 h-32 mx-auto rounded-lg ${datos.color}`}></div>

                <input
                    type="text"
                    className="mt-4 p-2 border rounded"
                    placeholder="Escribe aquí..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={verificar}
                >
                    Verificar
                </button>

                {feedback && (
                    <p className="mt-4 text-lg font-medium text-purple-700">{feedback}</p>
                )}
            </div>
        </div>
    );
};

export default Escribir;
