const CouponExchangeService = require("../service/couponExchangeService");
const couponExchangeService = new CouponExchangeService();

module.exports.getAllCoupons = async (request, response, next) => {
  try {
    const coupons = await couponExchangeService.getAllCoupons();
    response.json(coupons);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getCouponById = async (request, response, next) => {
  const couponId = parseInt(request.params.id);

  try {
    const coupon = await couponExchangeService.getCouponById(couponId);

    if (!coupon) {
      return response.status(404).json({ error: "Coupon not found" });
    }

    response.json(coupon);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createCoupon = async (request, response, next) => {
  const couponData = request.body;

  try {
    const newCoupon = await couponExchangeService.createCoupon(couponData);
    response.json(newCoupon);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateCoupon = async (request, response, next) => {
  const couponId = parseInt(request.params.id);
  const updatedCouponData = request.body;

  try {
    const updatedCoupon = await couponExchangeService.updateCoupon(
      couponId,
      updatedCouponData
    );

    if (!updatedCoupon) {
      return response.status(404).json({ error: "Coupon not found" });
    }

    response.json(updatedCoupon);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteCoupon = async (request, response, next) => {
  const couponId = parseInt(request.params.id);

  try {
    const deletedCoupon = await couponExchangeService.deleteCoupon(couponId);

    if (!deletedCoupon) {
      return response.status(404).json({ error: "Coupon not found" });
    }

    response.json(deletedCoupon);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
