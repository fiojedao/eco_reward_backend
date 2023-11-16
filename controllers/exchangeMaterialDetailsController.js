const ExchangeMaterialDetailsService = require('../service/exchangeMaterialDetailsService');
const exchangeMaterialDetailsService = new ExchangeMaterialDetailsService();

module.exports.getAllDetails = async (request, response, next) => {
  try {
    const details = await exchangeMaterialDetailsService.getAllDetails();
    response.json(details);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getDetailsById = async (request, response, next) => {
  const detailId = parseInt(request.params.id);

  try {
    const details = await exchangeMaterialDetailsService.getDetailsById(detailId);

    if (!details) {
      return response.status(404).json({ error: 'Details not found' });
    }

    response.json(details);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.createDetails = async (request, response, next) => {
  const detailsData = request.body;

  try {
    const newDetails = await exchangeMaterialDetailsService.createDetails(detailsData);
    response.json(newDetails);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.createDetailsMany = async (request, response, next) => {
  const detailsData = request.body;

  try {
    const newDetails = await exchangeMaterialDetailsService.createDetailMany(detailsData);
    response.json(newDetails);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.updateDetails = async (request, response, next) => {
  const detailId = parseInt(request.params.id);
  const updatedDetailsData = request.body;

  try {
    const updatedDetails = await exchangeMaterialDetailsService.updateDetails(detailId, updatedDetailsData);

    if (!updatedDetails) {
      return response.status(404).json({ error: 'Details not found' });
    }

    response.json(updatedDetails);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.deleteDetails = async (request, response, next) => {
  const detailId = parseInt(request.params.id);

  try {
    const deletedDetails = await exchangeMaterialDetailsService.deleteDetails(detailId);

    if (!deletedDetails) {
      return response.status(404).json({ error: 'Details not found' });
    }

    response.json(deletedDetails);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
