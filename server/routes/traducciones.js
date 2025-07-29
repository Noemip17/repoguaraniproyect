const express = require("express");
const router = express.Router();
const Traduccion = require("../models/Traduccion");

// Ruta: GET /api/traducciones/:categoria
router.get("/:categoria", async (req, res) => {
  try {
    const categoria = req.params.categoria.toLowerCase();
    const traducciones = await Traduccion.find({ categoria: { $regex: new RegExp(`^${categoria}$`, "i") } });

    if (!traducciones.length) {
      return res.status(404).json({ mensaje: "No se encontraron traducciones para esa categoría." });
    }

    res.json(traducciones);
  } catch (error) {
    console.error("Error al obtener traducciones:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

module.exports = router;



