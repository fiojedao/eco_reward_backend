const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const userId = 3;

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
// Obtener por Id
module.exports.getById = async (request, response, next) => {
  const exchangeId = parseInt(request.params.id);
  try {
    const exchangeRecord = await prisma.recycling_Material_Exchange.findUnique({
      where: {
        exchangeID: exchangeId,
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

    if (!exchangeRecord) {
      return response.status(404).json({ error: 'Exchange record not found' });
    }

    response.json(exchangeRecord);
  } catch (error) {
    console.error('Error fetching exchange record:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};

// Eliminar por Id
module.exports.deleteById = async (request, response, next) => {
  const exchangeId = parseInt(request.params.id); // 

  try {
    const deletedExchange = await prisma.recycling_Material_Exchange.delete({
      where: {
        exchangeID: exchangeId,
      },
      include: {
        Exchange_Material_Details: true,
        Recycling_Center: true,
      },
    });

    if (!deletedExchange) {
      return response.status(404).json({ error: 'Exchange record not found' });
    }

    response.json(deletedExchange);
  } catch (error) {
    console.error('Error deleting exchange record:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
