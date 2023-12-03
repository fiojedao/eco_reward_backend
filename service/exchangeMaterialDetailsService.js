const { prisma, bcrypt } = require('./../prisma/client/index');

class exchangeMaterialDetailsService {
  async getAllDetails() {
    try {
      return await prisma.Exchange_Material_Details.findMany({
        include: {
          Recycling_Material: true,
          Recycling_Material_Exchange: {
            include: {
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
              Recycling_Center: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error creating details: ${error.message}`);
    }
  }
  // En el service
  async createDetailMany({ exchangeId, materials }) {
    try {
      // Creamos los detalles
      var resp = [];
      for (let index = 0; index < materials.length; index++) {
        const material = materials[index];
        var data = await prisma.Exchange_Material_Details.create({
          data: {
            exchangeID: exchangeId,
            materialID: material.materialId,
            quantity: material.quantity,
            eco_coins: material.ecoCoins,
          },
          include: {
            Recycling_Material: true,
            Recycling_Material_Exchange: {
              include: {
                Recycling_Center: true,
              },
            },
          },
        });
        resp.push(data);
      }
  
      return resp;
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
