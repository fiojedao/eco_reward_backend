const { prisma, bcrypt } = require("./../prisma/client/index");

class couponExchangeHistoryService {
  async getAllCouponExchangeHistory() {
    try {
      return await prisma.Coupon_Exchange_History.findMany({
        include: {
          User: true,
          Coupon_Exchange: true,
        },
      });
    } catch (error) {
      throw new Error(
        `Error fetching all Coupon Exchange History: ${error.message}`
      );
    }
  }

  async getCouponExchangeHistoryById(historyId) {
    try {
      return await prisma.Coupon_Exchange_History.findUnique({
        where: {
          historyID: historyId,
        },
        include: {
          User: true,
          Coupon_Exchange: true,
        },
      });
    } catch (error) {
      throw new Error(
        `Error fetching Coupon Exchange History by ID: ${error.message}`
      );
    }
  }

  async getCouponExchangeHistoryByClientUserId(clientUserId) {
    try {
      return await prisma.Coupon_Exchange_History.findMany({
        where: {
          client_userID: clientUserId,
        },
        include: {
          User: true,
          Coupon_Exchange: true,
        },
      });
    } catch (error) {
      throw new Error(
        `Error fetching Coupon Exchange History by Client User ID: ${error.message}`
      );
    }
  }
}

module.exports = couponExchangeHistoryService;
