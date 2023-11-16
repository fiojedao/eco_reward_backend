const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class userService {
  async getAllUsers() {
    try {
      return await prisma.user.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  }

  async getAdministrators() {
    try {
      return await prisma.user.findMany({
        where: {
          role: 2,
        },
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      throw new Error(`Error fetching administrators: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      return await prisma.user.findUnique({
        where: {
          userID: id,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  async getUserCouponExchange(userId) {
    try {
      return await prisma.Coupon_Exchange_History.findMany({
        where: {
          client_userID: userId,
        },
        include: {
          Coupon_Exchange: true,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching user coupon exchanges: ${error.message}`);
    }
  }
}

module.exports = userService;
