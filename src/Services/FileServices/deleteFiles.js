const path = require("path");
const fs = require("fs");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let deleteFiles = (req, res) => {
  let archivo = req.params.file;
  fs.readdir(discoDuroPath, (error, files) => {
    if (error) res.status(500).json({ message: error });
    files.forEach((item) => {
      let test = item.toString().toLowerCase().replace(" ", "_");
      if (test === archivo) {
        let rutaEliminar = discoDuroPath + path.join("/" + item);
        console.log(rutaEliminar);
        fs.unlink(rutaEliminar, (err) => {
          if (err) res.status(500).json({ message: err });
        });
      }
    });
    res.status(200).json({ message: "File removed successfully" });
  });
};

module.exports = deleteFiles;
