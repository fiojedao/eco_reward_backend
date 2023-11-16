const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

// Configurar una ruta para servir imágenes estáticas desde la carpeta
app.use("/images", express.static(__dirname + "/images"));

//---Archivos de rutas---
const materialExchangeRoutes = require("./routes/materialExchangeRoutes");
const centerRouter = require("./routes/centerRoutes");
const userRouter = require("./routes/userRoutes");
const recyclableMaterialRoutes = require("./routes/recyclableMaterialRoutes");
const addressRoute = require("./routes/addressRoute");

// Acceder a la configuracion del archivo .env
dotEnv.config();

// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;

// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));

// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//---- Definir rutas ----

app.use("/api/materialexchange/", materialExchangeRoutes);
app.use("/api/center/", centerRouter);
app.use("/api/user/", userRouter);
app.use("/api/material/", recyclableMaterialRoutes);
app.use("/api/address/", addressRoute);

// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log("Presione CTRL-C para deternerlo\n");
});
