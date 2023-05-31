const path = require("path");
const fs = require("fs");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let deleteFiles = (req, res) => {
  let archivo = req.params.file;
  try {
    fs.readdir(discoDuroPath, (error, files) => {
      if (error) res.status(500).json({ message: error });
      files && files.length > 0
        ? files.forEach((item) => {
            let test = item.toString().toLowerCase().replace(" ", "_");
            if (test === archivo) {
              let rutaEliminar = discoDuroPath + path.join("/" + item);
              console.log(rutaEliminar);
              fs.unlink(rutaEliminar, (err) => {
                if (err) res.status(500).json({ message: err });
                res.status(200).json({ message: "File removed successfully" });
              });
            } else {
              res.status(404).json({ message: "File Not Found!" });
            }
          })
        : res.status(404).json({ message: "File Not Found!" });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = deleteFiles;
