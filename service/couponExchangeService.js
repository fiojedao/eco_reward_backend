const { prisma, bcrypt } = require('./../prisma/client/index');

class CouponExchangeService {
  async getAllCoupons() {
    try {
      const coupons = await prisma.Coupon_Exchange.findMany();
      
      const couponsWithBase64Images = coupons.map(coupon => {
        if (coupon.image) {
          const base64Image = Buffer.from(coupon.image).toString('base64');
          return { ...coupon, imageBase64: base64Image };
        } else {
          return { ...coupon, imageBase64: null }; // O alguna acción que desees tomar para imágenes nulas/vacías
        }
      });
  
      return couponsWithBase64Images;
    } catch (error) {
      throw new Error(`Error fetching all coupons: ${error.message}`);
    }
  }

  async getCouponById(couponId) {
    try {
      const coupon = await prisma.Coupon_Exchange.findUnique({
        where: {
          couponID: couponId,
        },
      });
  
      if (coupon && coupon.image) {
        const base64Image = Buffer.from(coupon.image).toString('base64');
        return { ...coupon, base64Image };
      }
  
      return coupon;
    } catch (error) {
      throw new Error(`Error fetching coupon by ID: ${error.message}`);
    }
  }
  

  async createCoupon({ name, description, image, category, startValidityDate, endValidityDate, ecoCoinsRequired }) {
    try {
      const base64Image = image.replace(/^data:image\/\w+;base64,/, '');

      // Decodificar los datos base64 a bytes
      const imageBuffer = Buffer.from(base64Image, 'base64');
      return await prisma.Coupon_Exchange.create({
        data: {
          name: name,
          description: description,
          image: imageBuffer,
          category: category,
          start_validity_date: new Date(startValidityDate),
          end_validity_date: new Date(endValidityDate),
          eco_coins_required: ecoCoinsRequired,
        },
      });
    } catch (error) {
      throw new Error(`Error creating coupon: ${error.message}`);
    }
  }

  async updateCoupon(couponId, { name, description, image, category, startValidityDate, endValidityDate, ecoCoinsRequired }) {
    try {
      const base64Image = image.replace(/^data:image\/\w+;base64,/, '');
  
      // Decode base64 data into bytes
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const imageBuffer = Buffer.from(byteArray);
  
      // Update the existing coupon in the database
      return await prisma.Coupon_Exchange.update({
        where: { couponID: couponId },
        data: {
          name: name,
          description: description,
          image: imageBuffer,
          category: category,
          start_validity_date: new Date(startValidityDate),
          end_validity_date: new Date(endValidityDate),
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
