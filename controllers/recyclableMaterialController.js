const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const centers = await prisma.recyclable_Material.findMany({
    orderBy: {
      name: "asc",
    },
  });
  response.json(centers);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const center = await prisma.recyclable_Material.findUnique({
    where: {
      materialID: id,
    },
  });
  response.json(center);
};
