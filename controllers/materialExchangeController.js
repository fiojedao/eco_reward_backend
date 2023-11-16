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

module.exports.getAllExchangesByUserId = async (request, response, next) => {
  const userId = parseInt(request.params.id);

  try {
    const exchanges = await recyclingMaterialExchangeService.getAllExchangesByUserId(userId);
    response.json(exchanges);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getAllExchangesByAdministratorUserId = async (request, response, next) => {
  const administratorUserId = parseInt(request.params.id);

  try {
    const exchanges = await recyclingMaterialExchangeService.getAllExchangesByAdministratorUserId(administratorUserId);
    response.json(exchanges);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.createMaterialExchange = async (request, response, next) => {
  const data = request.body;

  try {
    const newDetails = await recyclingMaterialExchangeService.createExchange(data.userId, data.exchangeDetails);
    response.json(newDetails);
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