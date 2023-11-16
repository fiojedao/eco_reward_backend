const CenterService = require('../service/centerService');
const centerService = new CenterService();

//centerList
module.exports.get = async (request, response, next) => {
  try {
    const centers = await centerService.getAllCenters();
    response.json(centers);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
//material list
module.exports.getMaterial = async (request, response, next) => {
  try {
    const materialList = await centerService.getMaterialList();
    response.json(materialList);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
//Obtener por Id
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
//Crear
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
//Actualizar
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
