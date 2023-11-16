const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class exchangeMaterialDetailsService {
  async getAllDetails() {
    try {
      return await prisma.Exchange_Material_Details.findMany({
        include: {
          Recycling_Material: true,
          Recycling_Material_Exchange: {
            include: {
              User: true,
              Recycling_Center: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error fetching all details: ${error.message}`);
    }
  }

  async getDetailsById(detailId) {
    try {
      return await prisma.Exchange_Material_Details.findUnique({
        where: {
          detailID: detailId,
        },
        include: {
          Recycling_Material: true,
          Recycling_Material_Exchange: {
            include: {
              User: true,
              Recycling_Center: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error fetching details by ID: ${error.message}`);
    }
  }

  async createDetails({ exchangeId, materialId, quantity, ecoCoins }) {
    try {
      return await prisma.Exchange_Material_Details.create({
        data: {
          exchangeID: exchangeId,
          materialID: materialId,
          quantity: quantity,
          eco_coins: ecoCoins,
        },
        include: {
          Recycling_Material: true,
          Recycling_Material_Exchange: {
            include: {
              User: true,
              Recycling_Center: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error creating details: ${error.message}`);
    }
  }

  async updateDetails(detailId, updatedDetailsData) {
    try {
      const { exchangeId, materialId, quantity, ecoCoins } = updatedDetailsData;

      return await prisma.Exchange_Material_Details.update({
        where: {
          detailID: detailId,
        },
        data: {
          exchangeID: exchangeId,
          materialID: materialId,
          quantity: quantity,
          eco_coins: ecoCoins,
        },
        include: {
          Recycling_Material: true,
          Recycling_Material_Exchange: {
            include: {
              User: true,
              Recycling_Center: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error updating details: ${error.message}`);
    }
  }

  async deleteDetails(detailId) {
    try {
      return await prisma.Exchange_Material_Details.delete({
        where: {
          detailID: detailId,
        },
        include: {
          Recycling_Material: true,
          Recycling_Material_Exchange: {
            include: {
              User: true,
              Recycling_Center: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error deleting details: ${error.message}`);
    }
  }
}

module.exports = exchangeMaterialDetailsService;
