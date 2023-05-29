const express = require("express");
const routes = express.Router();
const path = require("path");
const fs = require("fs");
const mime = require("mime");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

//Subir archivos
routes.post("/upload", (req, res) => {
  let archivo = req.files.archivo;
  let ruta = discoDuroPath + path.join("/" + archivo.name);
  archivo.mv(ruta, (err) => {
    if (err) console.log(err);
    res.status(201).json({ message: "File moved to Drive :D" });
  });
});

//Leer Archivos
routes.get("/read", (req, res) => {
  let files = [];
  let directorios = [];
  fs.readdir(discoDuroPath, (error, archivos) => {
    if (error) console.log(error);
    archivos.forEach((item) => {
      let test = item.toString();
      if (test.includes(".")) {
        files.push(test);
      } else {
        directorios.push(test);
      }
    });
    let objectResponse = {
      files,
      directorios,
    };
    res.status(200).json({ message: "OK", objectResponse });
  });
});

//Descargar Archivos
routes.get("/download/:file", (req, res) => {
  let archivoDescargar;
  let rutaArchivoDescargar;
  const archivo = req.params.file;
  fs.readdir(discoDuroPath, (err, files) => {
    if (err) console.log(err);
    files.forEach((item) => {
      let test = item.toString().toLowerCase().replace(" ", "_");
      console.log(test);
      if (test === archivo) {
        archivoDescargar = item;
        rutaArchivoDescargar = path.join(discoDuroPath + "/" + item);
      }
    });
    let archivoNombre = path.basename(archivoDescargar);
    let archivoType = mime.getType(archivoDescargar);
    res.setHeader(
      "Content-disposition",
      "attachment; filename=" + archivoNombre
    );
    res.setHeader("Content-type", archivoType);
    res.download(rutaArchivoDescargar);
  });
});

//Eliminar Archivos
routes.get("/delete/:file", (req, res) => {
  let archivo = req.params.file;
  fs.readdir(discoDuroPath, (error, files) => {
    if (error) console.log(error);
    files.forEach((item) => {
      let test = item.toString().toLowerCase().replace(" ", "_");
      if (test === archivo) {
        let rutaEliminar = discoDuroPath + path.join("/" + item);
        console.log(rutaEliminar);
        fs.unlink(rutaEliminar, (err) => {
          if (err) console.log(err);
        });
      }
    });
    res.status(200).json({ message: "File removed successfully" });
  });
});

module.exports = routes;
