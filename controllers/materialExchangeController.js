const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const centers = await prisma.recycling_Material_Exchange.findMany({
    orderBy: {
      exchangeID: "asc",
    },
  });
  response.json(centers);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
};
//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};
