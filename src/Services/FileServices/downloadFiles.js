const path = require("path");
const fs = require("fs");
const mime = require("mime");
require("dotenv").config();
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let donwloadFiles = (req, res) => {
  const archivo = req.params.file;
  try {
    fs.readdir(discoDuroPath, (err, files) => {
      if (err) return res.status(500).json({ message: err });
      files &&
        files.length > 0 &&
        files.forEach((item) => {
          let test = item.toString().toLowerCase().replace(" ", "_");
          if (test === archivo) {
            return res.download(path.join(discoDuroPath + "/" + item));
          }
        });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = donwloadFiles;
