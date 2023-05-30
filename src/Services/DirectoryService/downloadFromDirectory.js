let path = require("path");
const fs = require("fs");
const mime = require("mime");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let downloadFromDirectory = (req, res) => {
  let archivoDescargar;
  let rutaArchivoDescargar;
  const archivo = req.params.file;
  const directorio = req.params.directory;
  let rutaArchivo = discoDuroPath + path.join("/" + directorio);
  fs.readdir(rutaArchivo, (err, files) => {
    if (err) res.status(500).json({ message: err });
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
};

module.exports = downloadFromDirectory;
