require("dotenv").config();
const path = require("path");
const discoDuroPath = path.join(process.env.RUTA_DRIVE);

let uploadFile = (req, res) => {
  if (!req.files) return res.status(404).json({ message: "File Not Found!" });
  let archivo = req.files.archivo;
  let ruta = discoDuroPath + path.join("/" + archivo.name);
  archivo.mv(ruta, (err) => {
    if (err) return res.status(500).json({ message: err });
    res.status(201).json({ message: "File moved to Drive :D" });
  });
};

module.exports = uploadFile;
