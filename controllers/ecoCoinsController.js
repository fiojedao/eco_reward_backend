const EcoCoinsService = require('../service/ecoCoinsService');
const ecoCoinsService = new EcoCoinsService();

module.exports.getAll = async (request, response, next) => {
  try {
    const ecoCoins = await ecoCoinsService.getAllEcoCoins();
    response.json(ecoCoins);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getById = async (request, response, next) => {
  const ecoCoinsId = parseInt(request.params.id);

  try {
    const ecoCoins = await ecoCoinsService.getEcoCoinsById(ecoCoinsId);

    if (!ecoCoins) {
      return response.status(404).json({ error: 'Eco coins not found' });
    }

    response.json(ecoCoins);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getByClientId = async (request, response, next) => {
  const clientUserId = parseInt(request.params.id);

  try {
    const ecoCoins = await ecoCoinsService.getEcoCoinsByClientId(clientUserId);
    response.json(ecoCoins);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.create = async (request, response, next) => {
  const { clientUserId, balance } = request.body;

  try {
    const newEcoCoins = await ecoCoinsService.createEcoCoins(clientUserId, balance);
    response.json(newEcoCoins);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.update = async (request, response, next) => {
  const ecoCoinsId = parseInt(request.params.id);
  const newBalance = request.body.balance;

  try {
    const updatedEcoCoins = await ecoCoinsService.updateEcoCoins(ecoCoinsId, newBalance);

    if (!updatedEcoCoins) {
      return response.status(404).json({ error: 'Eco coins not found' });
    }

    response.json(updatedEcoCoins);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
