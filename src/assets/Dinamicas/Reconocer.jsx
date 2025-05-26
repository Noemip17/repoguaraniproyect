import React, { useEffect, useState } from "react";

const Reconocer = ({ datos, onCorrecto, avatarUrl, userName, vocabLearned }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const playAudio = () => {
        const audio = new Audio(datos[currentIndex].audio);
        audio.play();
    };

    useEffect(() => {
        playAudio();
    }, [currentIndex]);

    const handleEntendido = () => {
        if (currentIndex < datos.length - 1) {
            setCurrentIndex(currentIndex + 1); // Ir al siguiente color
        } else {
            onCorrecto?.(); // Llama solo si existe
        }
    };

    if (!datos || datos.length === 0) {
        return <p className="text-center mt-10 text-red-600">No hay datos para mostrar.</p>;
    }

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
                            ¡Hola, Usuario!
                        </h1>
                        <p className="text-sm text-gray-600">
                            🧠 Vocabularios aprendidos: {vocabLearned}
                        </p>
                    </div>
                </div>
                <div className="text-yellow-500 text-3xl">⭐️⭐️⭐️</div>
            </header>

            <div className="text-center bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Reconocer</h2>
                <p className="text-sm text-gray-500">(Así se escribe)</p>
                <p className="text-lg">{datos[currentIndex].palabra} - {datos[currentIndex].traduccion}</p>
                <p className="text-lg mb-2">Escucha y mira:</p>
                <div className={`w-32 h-32 mx-auto rounded-lg ${datos[currentIndex].color}`}></div>

                <div className="flex justify-center mt-4">
                    <audio controls className="w-64">
                        <source src={datos[currentIndex].audio} type="audio/mpeg" />
                        Tu navegador no soporta audio.
                    </audio>
                </div>

                <button
                    className="mt-4 bg-green-500 text-black px-4 py-2 rounded ml-4"
                    onClick={handleEntendido}
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default Reconocer;

