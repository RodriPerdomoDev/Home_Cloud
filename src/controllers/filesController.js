const express = require("express");
const routes = express.Router();
const donwloadFiles = require("../Services/FileServices/downloadFiles");
const uploadFile = require("../Services/FileServices/uploadFile");
const readFiles = require("../Services/FileServices/readFiles");
const deleteFiles = require("../Services/FileServices/deleteFiles");

//Subir archivos
routes.post("/upload", (req, res) => {
  uploadFile(req, res);
});

//Leer Archivos
routes.get("/read", (req, res) => {
  readFiles(req, res);
});

//Descargar Archivos
routes.get("/download/:file", (req, res) => {
  donwloadFiles(req, res);
});

//Eliminar Archivos
routes.get("/delete/:file", (req, res) => {
  deleteFiles(req, res);
});

module.exports = routes;
