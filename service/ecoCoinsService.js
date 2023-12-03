const { prisma, bcrypt } = require('./../prisma/client/index');

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

  async getEcoCoinsByClientId(clientUserID) {
    try {
      return await prisma.client_Eco_Coins.findFirst({
        where: {
          client_userID: clientUserID,
        },
        include: {
          User: true,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching eco coins by client_userID: ${error.message}`);
    }
  }

  async manageEcoCoins(clientUserId, balance) {
    let existingEcoCoins;

    try {
      existingEcoCoins = await prisma.client_Eco_Coins.findFirst({
        where: {
          client_userID: clientUserId,
        },
        include: {
          User: true,
        },
      });

      if (existingEcoCoins) {
        return await prisma.client_Eco_Coins.update({
          where: {
            ecoCoinsID: existingEcoCoins.ecoCoinsID,
          },
          data: {
            balance: {
              increment: balance
            },
          },
          include: {
            User: true,
          },
        });
      } else {
        return await prisma.client_Eco_Coins.create({
          data: {
            client_userID: clientUserId,
            balance: balance,
          },
          include: {
            User: true,
          },
        });
      }
    } catch (error) {
      throw new Error(`Error managing eco coins: ${error.message}`);
    }
  }

  async decrementEcoCoins(clientUserId, balance) {
    let existingEcoCoins;
    try {
      existingEcoCoins = await prisma.client_Eco_Coins.findFirst({
        where: {
          client_userID: clientUserId,
        },
        include: {
          User: true,
        },
      });

      if (existingEcoCoins) {
        return await prisma.client_Eco_Coins.update({
          where: {
            ecoCoinsID: existingEcoCoins.ecoCoinsID,
          },
          data: {
            balance: {
              decrement: balance
            },
          },
          include: {
            User: true,
          },
        });
      } else {
        throw new Error(`Error managing eco coins, User: ${clientUserId} not found`);
      }
    } catch (error) {
      throw new Error(`Error managing eco coins: ${error.message}`);
    }
  }
}

module.exports = EcoCoinsService;
