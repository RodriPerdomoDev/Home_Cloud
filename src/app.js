const express = require("express");
const app = express();
const PORT = 8080 || process.env.PORT;
const router = require("./controllers/filesController");
const fileUpload = require("express-fileupload");
const directoryRouter = require("./controllers/directoryController");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.use(process.env.RUTA_API_FILES, router);
app.use(process.env.RUTA_API_DIRECTORIOS, directoryRouter);

app.listen(PORT, () => {
  console.log("Server on Port: ", PORT);
});
