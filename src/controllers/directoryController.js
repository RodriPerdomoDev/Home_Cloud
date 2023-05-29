const express = require("express");
const router = express.Router();
let path = require("path");
const fs = require("fs");
const mime = require("mime");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

//Crear carpetas
router.get("/:newdirectory", (req, res) => {
  let params = req.params.newdirectory;
  fs.access(discoDuroPath, (error) => {
    if (error) console.log(error);
    let newDirectoryPath = discoDuroPath + path.join("/" + params);
    fs.mkdir(newDirectoryPath, (error) => {
      if (error) console.log(error);
      res.status(200).json({ message: "New directory created successfully" });
    });
  });
});

//Subir archivos en directorios
router.post("/upload/:directory", (req, res) => {
  let params = req.params.directory;
  let archivo = req.files.archivo;
  let ruta = discoDuroPath + path.join("/" + params + "/" + archivo.name);
  archivo.mv(ruta, (err) => {
    if (err) console.log(err);
    res.status(201).json({ message: "File moved to Directory" });
  });
});

//Leer Archivos en directorios
router.get("/read/:directory", (req, res) => {
  let params = req.params.directory;
  let files = [];
  let directorios = [];
  let rutaLeer = discoDuroPath + path.join("/" + params);
  fs.readdir(rutaLeer, (error, archivos) => {
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

//Descargar Archivos desde directorios
router.get("/download/:directory/:file", (req, res) => {
  let archivoDescargar;
  let rutaArchivoDescargar;
  const archivo = req.params.file;
  const directorio = req.params.directory;
  let rutaArchivo = discoDuroPath + path.join("/" + directorio);
  fs.readdir(rutaArchivo, (err, files) => {
    if (err) console.log(err);
    files.forEach((item) => {
      let test = item.toString().toLowerCase().replace(" ", "_");
      if (test === archivo) {
        archivoDescargar = item;
        rutaArchivoDescargar = rutaArchivo + path.join("/" + item);
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

//Eliminar archivos desde directorios
router.get("/delete/:directory/:file", (req, res) => {
  let archivo = req.params.file;
  let directorio = req.params.directory;
  let ruta = discoDuroPath + path.join("/" + directorio);
  fs.readdir(ruta, (error, files) => {
    if (error) console.log(error);
    files.forEach((item) => {
      let test = item.toString().toLowerCase().replace(" ", "_");
      if (test === archivo) {
        let rutaEliminar = ruta + path.join("/" + item);
        fs.unlink(rutaEliminar, (err) => {
          if (err) console.log(err);
        });
      }
    });
    res.status(200).json({ message: "File removed successfully" });
  });
});

//Eliminar directorios
router.get("/delete/:directory", (req, res) => {
  let directorio = req.params.directory;
  let rutaEliminar = discoDuroPath + path.join("/" + directorio);
  fs.rm(rutaEliminar, { recursive: true }, (err) => {
    if (err) console.log(err);
    res.status(200).json({ message: "Directory is deleted successfully :D" });
  });
});

module.exports = router;
