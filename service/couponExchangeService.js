const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CouponExchangeService {
  async getAllCoupons() {
    try {
      return await prisma.Coupon_Exchange.findMany();
    } catch (error) {
      throw new Error(`Error fetching all coupons: ${error.message}`);
    }
  }

  async getCouponById(couponId) {
    try {
      return await prisma.Coupon_Exchange.findUnique({
        where: {
          couponID: couponId,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching coupon by ID: ${error.message}`);
    }
  }

  async createCoupon({ name, description, image, category, startValidityDate, endValidityDate, ecoCoinsRequired }) {
    try {
      return await prisma.Coupon_Exchange.create({
        data: {
          name,
          description,
          image,
          category,
          start_validity_date: startValidityDate,
          end_validity_date: endValidityDate,
          eco_coins_required: ecoCoinsRequired,
        },
      });
    } catch (error) {
      throw new Error(`Error creating coupon: ${error.message}`);
    }
  }

  async updateCoupon(couponId, { name, description, image, category, startValidityDate, endValidityDate, ecoCoinsRequired }) {
    try {
      return await prisma.Coupon_Exchange.update({
        where: {
          couponID: couponId,
        },
        data: {
          name,
          description,
          image,
          category,
          start_validity_date: startValidityDate,
          end_validity_date: endValidityDate,
          eco_coins_required: ecoCoinsRequired,
        },
      });
    } catch (error) {
      throw new Error(`Error updating coupon: ${error.message}`);
    }
  }

  async deleteCoupon(couponId) {
    try {
      return await prisma.Coupon_Exchange.delete({
        where: {
          couponID: couponId,
        },
      });
    } catch (error) {
      throw new Error(`Error deleting coupon: ${error.message}`);
    }
  }
}

module.exports = CouponExchangeService;
