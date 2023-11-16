const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class EcoCoinsService {
  async getAllEcoCoins() {
    try {
      return await prisma.client_Eco_Coins.findMany({
        orderBy: {
          ecoCoinsID: "asc",
        },
        include: {
          User: true,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching all eco coins: ${error.message}`);
    }
  }

  async getEcoCoinsById(ecoCoinsId) {
    try {
      return await prisma.client_Eco_Coins.findUnique({
        where: {
          ecoCoinsID: ecoCoinsId,
        },
        include: {
          User: true,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching eco coins by ID: ${error.message}`);
    }
  }

  async getEcoCoinsByClientId(clientUserId) {
    try {
      return await prisma.client_Eco_Coins.findMany({
        where: {
          client_userID: clientUserId,
        },
        orderBy: {
          ecoCoinsID: "asc",
        },
        include: {
          User: true,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching eco coins by client user ID: ${error.message}`);
    }
  }

  async createEcoCoins(clientUserId, balance) {
    try {
      return await prisma.client_Eco_Coins.create({
        data: {
          client_userID: clientUserId,
          balance: balance,
        },
        include: {
          User: true,
        },
      });
    } catch (error) {
      throw new Error(`Error creating eco coins: ${error.message}`);
    }
  }

  async updateEcoCoins(ecoCoinsId, newBalance) {
    try {
      return await prisma.client_Eco_Coins.update({
        where: {
          ecoCoinsID: ecoCoinsId,
        },
        data: {
          balance: newBalance,
        },
        include: {
          User: true,
        },
      });
    } catch (error) {
      throw new Error(`Error updating eco coins: ${error.message}`);
    }
  }
}

module.exports = EcoCoinsService;
