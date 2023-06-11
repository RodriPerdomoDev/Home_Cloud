let path = require("path");
const fs = require("fs");
const discoDuroPath = path.join(process.env.RUTA_DRIVE);
require("dotenv").config();

let readFilesDirectory = (req, res) => {
  let params = req.params.directory;
  let files = [];
  let directorios = [];
  let rutaLeer = discoDuroPath + path.join("/" + params);
  try {
    fs.readdir(rutaLeer, (error, archivos) => {
      if (error) return res.status(500).json({ message: error });
      archivos &&
        archivos.length > 0 &&
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
      return res.status(200).json({ message: "OK", objectResponse });
    });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

module.exports = readFilesDirectory;
