let path = require("path");
const discoDuroPath = path.join(process.env.RUTA_DRIVE);
require("dotenv").config();

let uploadDirectory = (req, res) => {
  let params = req.params.directory;
  if (!req.files) res.status(404).json({ message: "File not Found!" });
  let archivo = req.files.archivo;
  let ruta = discoDuroPath + path.join("/" + params + "/" + archivo.name);
  archivo.mv(ruta, (err) => {
    if (err) res.status(500).json({ message: err });
    res.status(201).json({ message: "File moved to Directory" });
  });
};

module.exports = uploadDirectory;
