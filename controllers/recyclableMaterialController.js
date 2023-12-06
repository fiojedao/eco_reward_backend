const RecyclableMaterialService = require('../service/recyclableMaterialService');
const recyclableMaterialService = new RecyclableMaterialService();

module.exports.get = async (request, response, next) => {
  try {
    const materials = await recyclableMaterialService.getAllMaterials();
    response.json(materials);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getById = async (request, response, next) => {
  const materialId = parseInt(request.params.id);

  try {
    const material = await recyclableMaterialService.getMaterialById(materialId);

    if (!material) {
      return response.status(404).json({ error: 'Recyclable material not found' });
    }

    response.json(material);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getMaterialByCenter = async (request, response, next) => {
  const centerId = parseInt(request.params.id);

  try {
    const material = await recyclableMaterialService.getMaterialByCenter(centerId);

    if (!material) {
      return response.status(404).json({ error: 'Recyclable material not found' });
    }

    response.json(material);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.create = async (request, response, next) => {
  const materialData = request.body;

  try {
    const newMaterial = await recyclableMaterialService.createMaterial(materialData);
    response.json(newMaterial);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.update = async (request, response, next) => {
  const materialId = parseInt(request.params.id);
  const materialData = request.body;

  try {
    const updatedMaterial = await recyclableMaterialService.updateMaterial(materialId, materialData);
    response.json(updatedMaterial);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.delete = async (request, response, next) => {
  const materialId = parseInt(request.params.id);

  try {
    const deletedMaterial = await recyclableMaterialService.deleteMaterial(materialId);
    response.json(deletedMaterial);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};