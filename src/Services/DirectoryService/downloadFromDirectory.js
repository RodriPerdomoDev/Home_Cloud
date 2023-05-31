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
  try {
    fs.readdir(rutaArchivo, (err, files) => {
      if (err)
        return res.status(404).json({ message: "Directory not found!!" });
      files && files.length > 0
        ? files.forEach((item) => {
            let test = item.toString().toLowerCase().replace(" ", "_");
            if (test !== undefined && test === archivo) {
              archivoDescargar = item;
              rutaArchivoDescargar = rutaArchivo + path.join("/" + item);
            } else {
              archivoDescargar = null;
              rutaArchivoDescargar = null;
              res.status(404).json({ message: "File Not Found!" });
            }
          })
        : res.status(404).json({ message: "File Not Found!" });
      if (archivoDescargar) {
        let archivoNombre = path.basename(archivoDescargar);
        let archivoType = mime.getType(archivoDescargar);
        res.setHeader(
          "Content-disposition",
          "attachment; filename=" + archivoNombre
        );
        res.setHeader("Content-type", archivoType);
        res.download(rutaArchivoDescargar);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = downloadFromDirectory;
