const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const centers = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  response.json(centers);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const center = await prisma.user.findUnique({
    where: {
      userID: id,
    },
  });
  response.json(center);
};

module.exports.getUserCouponExchange = async (request, response, next) => {
  const userId = parseInt(request.params.id);

  try {
    const coupons = await prisma.Coupon_Exchange_History.findMany({
      where: {
        client_userID: userId,
      },
      include: {
        Coupon_Exchange: true,
      },
    });

    response.json(coupons);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Error al obtener los cupones del usuario" });
  }
};
