const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();
const Usuario = require("../models/Usuarios");
const verificarToken = require("../middleware/auth");


// ✅ Registro de usuario
userRouter.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: encryptedPassword,
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "✅ Usuario registrado correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
});

// ✅ Login de usuario
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ mensaje: "✅ Login exitoso", token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
});

// 🔐 Ruta protegida - Perfil del usuario autenticado
userRouter.get("/perfil", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("❌ Error al obtener perfil:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

module.exports = userRouter;





