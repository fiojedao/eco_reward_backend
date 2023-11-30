const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class recyclingMaterialExchangeService {
  async getAllExchanges() {
    try {
      return await prisma.recycling_Material_Exchange.findMany({
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
      const exchange = await prisma.recycling_Material_Exchange.findUnique({
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
          client_user: true,
        },
      });
  
      return this.formatExchangeForInvoice(exchange);
    } catch (error) {
      throw new Error(`Error fetching exchange by ID: ${error.message}`);
    }
  }

  formatExchangeForInvoice(exchange) {
    const formattedExchange = {
      exchangeID: exchange.exchangeID,
      exchange_date: exchange.exchange_date,
      client: {
        userID: exchange.client_user.userID,
        name: exchange.client_user.name,
        email: exchange.client_user.email,
        identification: exchange.client_user.identification,
      },
      recycling_center: {
        centerID: exchange.Recycling_Center.centerID,
        name: exchange.Recycling_Center.name,
        phone: exchange.Recycling_Center.phone,
        operating_hours: exchange.Recycling_Center.operating_hours
      },
      exchange_details: [],
      total_eco_coins: 0,
    };

    exchange.Exchange_Material_Details.forEach((detail) => {
      const subtotal = detail.quantity * detail.Recycling_Material.price;
      formattedExchange.total_eco_coins += detail.eco_coins;
  
      formattedExchange.exchange_details.push({
        material_name: detail.Recycling_Material.name,
        quantity: detail.quantity,
        material_price: detail.Recycling_Material.price,
        subtotal: subtotal,
        eco_coins: detail.eco_coins,
        Recycling_Material: detail.Recycling_Material
      });
    });
  
    return formattedExchange;
  }
  

  async getAllExchangesByUserId(userId) {
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
      throw new Error(`Error fetching exchanges for user: ${error.message}`);
    }
  }

  async getAllExchangesByCenterId(centerId) {
    try {
      var data = await prisma.recycling_Material_Exchange.findMany({
        where: {
          centerID: centerId,
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
          client_user: {
            select: {
              name: true,
              email: true,
              identification: true,
              role: true
            },
          },
        },
      });

      const calculateTotalEcoCoins = (exchange) => {
        return exchange.Exchange_Material_Details.reduce((total, detail) => {
          return total + detail.eco_coins;
        }, 0); 
      };
      
      const exchangesWithTotalEcoCoins = data.map((exchange) => {
        return {
          ...exchange,
          total_eco_coins: calculateTotalEcoCoins(exchange),
        };
      });

      return exchangesWithTotalEcoCoins
      
    } catch (error) {
      throw new Error(`Error fetching exchanges for center ID: ${error.message}`);
    }
  }

  async getAllExchangesForAllCenters(userId) {
    try {
      const user = await prisma.User.findUnique({
        where: {
          userID: userId,
        },
        select: {
          role: true,
        },
      });

      if(user?.role !== 1){
        throw new Error(`Error checking user role: ${error.message}`);
      }

      const allCentersData = await prisma.recycling_Center.findMany();
  
      const exchangesByCenter = await Promise.all(
        allCentersData.map(async (center) => {
          const centerExchanges = await prisma.recycling_Material_Exchange.findMany({
            where: {
              centerID: center.centerID,
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
              client_user: {
                select: {
                  name: true,
                  email: true,
                  identification: true,
                  role: true,
                },
              },
            },
          });
  
          const calculateTotalEcoCoins = (exchange) => {
            return exchange.Exchange_Material_Details.reduce((total, detail) => {
              return total + detail.eco_coins;
            }, 0);
          };
  
          const exchangesWithTotalEcoCoins = centerExchanges.map((exchange) => {
            return {
              ...exchange,
              total_eco_coins: calculateTotalEcoCoins(exchange),
            };
          });
  
          return exchangesWithTotalEcoCoins;
        })
      );
  
      return exchangesByCenter.flat();
  
    } catch (error) {
      throw new Error(`Error fetching exchanges for all centers: ${error.message}`);
    }
  }
  
  
  async createExchange(userId, exchangeDetails) {
    try {
      const exchange = await prisma.recycling_Material_Exchange.create({
        data: {
          client_user: {
            connect: {
              userID: userId
            }
          },
          exchange_date: new Date(), 
          Recycling_Center: {
            connect: {
              centerID: exchangeDetails.centerID
            }
          },
          Exchange_Material_Details: {
            create: exchangeDetails.Exchange_Material_Details.map(detail => ({
              Recycling_Material: {
                connect: {
                  materialID: detail.materialID
                }
              },
              quantity: detail.quantity,
              eco_coins: detail.eco_coins
            }))
          }
        },
        include: {
          Exchange_Material_Details: {
            include: {
              Recycling_Material: true
            }
          },
          Recycling_Center: true,
          client_user: true
        }
      });
  
      return exchange;
    } catch (error) {
      throw new Error(`Error creating exchange: ${error.message}`);
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
