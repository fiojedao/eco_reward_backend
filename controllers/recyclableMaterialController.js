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
