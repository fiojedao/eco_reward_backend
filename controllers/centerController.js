const CenterService = require('../service/centerService');
const centerService = new CenterService();

module.exports.get = async (request, response, next) => {
  try {
    const centers = await centerService.getAllCenters();
    response.json(centers);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.updateCenterStatus = async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const status = Boolean(request.body.status);
    const users = await centerService.updateCenterStatus(id, status);
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getMaterial = async (request, response, next) => {
  try {
    const materialList = await centerService.getMaterialList();
    response.json(materialList);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getById = async (request, response, next) => {
  const id = parseInt(request.params.id);

  try {
    const center = await centerService.getCenterById(id);

    if (!center) {
      return response.status(404).json({ error: 'Center not found' });
    }

    response.json(center);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getByUserId = async (request, response, next) => {
  const id = parseInt(request.params.id);

  try {
    const center = await centerService.getCenterByUserId(id);

    if (!center) {
      return response.status(404).json({ error: 'Center not found' });
    }

    response.json(center);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.create = async (request, response, next) => {
  const centerData = request.body;

  try {
    const newCenter = await centerService.createCenter(centerData);
    response.json(newCenter);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.update = async (request, response, next) => {
  const id = parseInt(request.params.id);
  const updatedCenterData = request.body;

  try {
    const updatedCenter = await centerService.updateCenter(id, updatedCenterData);

    if (!updatedCenter) {
      return response.status(404).json({ error: 'Center not found' });
    }

    response.json(updatedCenter);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
