let path = require("path");
const fs = require("fs");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let deleteFromDirectory = (req, res) => {
  let archivo = req.params.file;
  let directorio = req.params.directory;
  let ruta = discoDuroPath + path.join("/" + directorio);
  fs.readdir(ruta, (error, files) => {
    if (error) res.status(500).json({ message: error });
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
};

module.exports = deleteFromDirectory;
