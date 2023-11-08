const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const centers = await prisma.recycling_Center.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      Address: true,
      material_exchanges: true,
    },
  });
  response.json(centers);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const center = await prisma.recycling_Center.findUnique({
    where: {
      centerID: id,
    },
    include: {
      Address: true,
      User: true,
      Center_Material: {
        include: {
          Recyclable_Material: true,
        },
      },
    },
  });
  response.json(center);
};
//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};
