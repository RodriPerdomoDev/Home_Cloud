const path = require("path");
const fs = require("fs");
const mime = require("mime");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let donwloadFiles = (req, res) => {
  let archivoDescargar;
  let rutaArchivoDescargar;
  const archivo = req.params.file;
  try {
    fs.readdir(discoDuroPath, (err, files) => {
      if (err) res.status(500).json({ message: err });
      files &&
        files.length > 0 &&
        files.forEach((item) => {
          let test = item.toString().toLowerCase().replace(" ", "_");
          console.log(test);
          if (test === archivo) {
            archivoDescargar = item;
            rutaArchivoDescargar = path.join(discoDuroPath + "/" + item);
          } else {
            res.status(404).json({ message: "File Not Found!" });
          }
        });
    });
    let archivoNombre = path.basename(archivoDescargar);
    let archivoType = mime.getType(archivoDescargar);
    res.setHeader(
      "Content-disposition",
      "attachment; filename=" + archivoNombre
    );
    res.setHeader("Content-type", archivoType);
    res.download(rutaArchivoDescargar);
  } catch (err) {
    res.status(404).json({ message: "File Not Found!" });
  }
};

module.exports = donwloadFiles;
