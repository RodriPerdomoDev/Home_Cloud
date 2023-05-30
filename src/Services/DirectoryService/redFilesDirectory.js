let path = require("path");
const fs = require("fs");
const discoDuroPath = path.join(process.env.RUTA_DRIVE);
require("dotenv").config();

let readFilesDirectory = (req, res) => {
  let params = req.params.directory;
  let files = [];
  let directorios = [];
  let rutaLeer = discoDuroPath + path.join("/" + params);
  fs.readdir(rutaLeer, (error, archivos) => {
    if (error) res.status(500).json({ message: error });
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
};

module.exports = readFilesDirectory;
