const express = require("express");
const router = express.Router();
const newDirectory = require("../Services/DirectoryService/newDirectory");
const uploadDirectory = require("../Services/DirectoryService/uploadDirectory");
const readFilesDirectory = require("../Services/DirectoryService/redFilesDirectory");
const downloadFromDirectory = require("../Services/DirectoryService/downloadFromDirectory");
const deleteFromDirectory = require("../Services/DirectoryService/deleteFromDirectory");
const deleteDirectory = require("../Services/DirectoryService/deleteDirectory");
require("dotenv").config();

//Crear carpetas
router.get("/:newdirectory", (req, res) => {
  newDirectory(req, res);
});

//Subir archivos en directorios
router.post("/upload/:directory", (req, res) => {
  uploadDirectory(req, res);
});

//Leer Archivos en directorios
router.get("/read/:directory", (req, res) => {
  readFilesDirectory(req, res);
});

//Descargar Archivos desde directorios
router.get("/download/:directory/:file", (req, res) => {
  downloadFromDirectory(req, res);
});

//Eliminar archivos desde directorios
router.get("/delete/:directory/:file", (req, res) => {
  deleteFromDirectory(req, res);
});

//Eliminar directorios
router.get("/delete/:directory", (req, res) => {
  deleteDirectory(req, res);
});

module.exports = router;
