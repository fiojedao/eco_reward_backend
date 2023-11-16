const RecyclingMaterialExchangeService = require('../service/recyclingMaterialExchangeService');
const recyclingMaterialExchangeService = new RecyclingMaterialExchangeService();

module.exports.get = async (request, response, next) => {
  const userId = 3;

  try {
    const userExchangeHistory = await recyclingMaterialExchangeService.getAllExchanges(userId);
    response.json(userExchangeHistory);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getById = async (request, response, next) => {
  const exchangeId = parseInt(request.params.id);

  try {
    const exchangeRecord = await recyclingMaterialExchangeService.getExchangeById(exchangeId);

    if (!exchangeRecord) {
      return response.status(404).json({ error: 'Exchange record not found' });
    }

    response.json(exchangeRecord);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.deleteExchangeById = async (request, response, next) => {
  const exchangeId = parseInt(request.params.id);

  try {
    const deletedExchange = await recyclingMaterialExchangeService.deleteExchangeById(exchangeId);

    if (!deletedExchange) {
      return response.status(404).json({ error: 'Exchange record not found' });
    }

    response.json(deletedExchange);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
