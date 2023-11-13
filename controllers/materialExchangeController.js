const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const userId = 3; // Reemplaza 1 con el ID del usuario que estás buscando

  const userExchangeHistory = await prisma.recycling_Material_Exchange.findMany({
    where: {
      client_userID: userId,
    },
    orderBy: {
      exchange_date: "asc",
    },
    include: {
      Exchange_Material_Details: {
        include: {
          Recycling_Material: true,
        },
      },
      Recycling_Center: true,
    },
  });
  response.json(userExchangeHistory);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
};
//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};
