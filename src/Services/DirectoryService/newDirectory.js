let path = require("path");
const fs = require("fs");
const discoDuroPath = path.join(process.env.RUTA_DRIVE);
require("dotenv").config();

let newDirectory = (req, res) => {
  let params = req.params.newdirectory;
  fs.access(discoDuroPath, (error) => {
    if (error) res.status(500).json({ message: error });
    let newDirectoryPath = discoDuroPath + path.join("/" + params);
    fs.mkdir(newDirectoryPath, (error) => {
      if (error) res.status(500).json({ message: error });
      res.status(200).json({ message: "New directory created successfully" });
    });
  });
};

module.exports = newDirectory;
