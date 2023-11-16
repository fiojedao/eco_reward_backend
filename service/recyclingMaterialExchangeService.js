const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class recyclingMaterialExchangeService {
  async getAllExchanges(userId) {
    try {
      return await prisma.recycling_Material_Exchange.findMany({
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
    } catch (error) {
      throw new Error(`Error fetching all exchanges: ${error.message}`);
    }
  }

  async getExchangeById(exchangeId) {
    try {
      return await prisma.recycling_Material_Exchange.findUnique({
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
    } catch (error) {
      throw new Error(`Error fetching exchange by ID: ${error.message}`);
    }
  }

  async deleteExchangeById(exchangeId) {
    try {
      return await prisma.recycling_Material_Exchange.delete({
        where: {
          exchangeID: exchangeId,
        },
        include: {
          Exchange_Material_Details: true,
          Recycling_Center: true,
        },
      });
    } catch (error) {
      throw new Error(`Error deleting exchange record: ${error.message}`);
    }
  }
}

module.exports = recyclingMaterialExchangeService;
