let path = require("path");
const fs = require("fs");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let deleteDirectory = (req, res) => {
  let directorio = req.params.directory;
  let rutaEliminar = discoDuroPath + path.join("/" + directorio);
  fs.rm(rutaEliminar, { recursive: true }, (err) => {
    if (err) res.status(500).json({ message: err });
    res.status(200).json({ message: "Directory is deleted successfully :D" });
  });
};

module.exports = deleteDirectory;
