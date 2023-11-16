const CouponExchangeHistoryService = require('../service/couponExchangeHistoryService');
const couponExchangeHistoryService = new CouponExchangeHistoryService();

module.exports.getAllCouponExchangeHistory = async (request, response, next) => {
  try {
    const couponExchangeHistory = await couponExchangeHistoryService.getAllCouponExchangeHistory();
    response.json(couponExchangeHistory);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getCouponExchangeHistoryById = async (request, response, next) => {
  const historyId = parseInt(request.params.id);

  try {
    const couponExchangeHistory = await couponExchangeHistoryService.getCouponExchangeHistoryById(historyId);

    if (!couponExchangeHistory) {
      return response.status(404).json({ error: 'Coupon Exchange History not found' });
    }

    response.json(couponExchangeHistory);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getCouponExchangeHistoryByClientUserId = async (request, response, next) => {
  const clientUserId = parseInt(request.params.id);

  try {
    const couponExchangeHistory = await couponExchangeHistoryService.getCouponExchangeHistoryByClientUserId(clientUserId);
    response.json(couponExchangeHistory);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
