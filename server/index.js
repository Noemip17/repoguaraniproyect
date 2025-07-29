const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");
const jwt = require("jsonwebtoken");

const connectDB = require("./db");
const verificarToken = require("./middleware/auth");
const userRouter = require("./routes/usuarios");
const traduccionesRouter = require("./routes/traducciones");  // Importar rutas de traducciones

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
connectDB();

// Rutas
app.get("/", (req, res) => {
  res.send("¡Conectado a la base de datos!");
});

app.use("/api", userRouter);
app.use("/api/traducciones", traduccionesRouter);

// Ruta pública para login (opcional si ya está en userRouter)
app.post("/login", (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Middleware para ruta no encontrada
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

