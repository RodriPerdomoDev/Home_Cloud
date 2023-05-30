const fs = require("fs");
require("dotenv").config();
const path = require("path");
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let readFiles = (req, res) => {
  let files = [];
  let directorios = [];
  fs.readdir(discoDuroPath, (error, archivos) => {
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

module.exports = readFiles;
