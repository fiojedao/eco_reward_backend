const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const centers = await prisma.recyclable_Material.findMany({
    orderBy: {
      name: "asc",
    },
  });
  response.json(centers);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const center = await prisma.recyclable_Material.findUnique({
    where: {
      materialID: id,
    },
  });
  response.json(center);
};

module.exports.create = async (request, response, next) => {
  const { name, description, image, unit_of_measure, price, color_representation, centerID } = request.body;

  try {
    const newMaterial = await prisma.recyclable_Material.create({
      data: {
        name,
        description,
        image,
        unit_of_measure,
        price,
        color_representation,
      },
    });

    const { materialID } = newMaterial;

    const association = await prisma.center_Material.create({
      data: {
        centerID,
        materialID,
      },
    });

    if (!association && newMaterial) {
      return response.status(404).json({ error: 'Recyclable material not found' });
    }

    response.json(newMaterial);
  } catch (error) {
    console.error('Error creating recyclable material:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.update = async (request, response, next) => {
  const materialId = parseInt(request.params.id);
  const { name, description, image, unit_of_measure, price, color_representation, centerID } = request.body;

  try {
    const updatedMaterial = await prisma.Recyclable_Material.update({
      where: {
        materialID: materialId,
      },
      data: {
        name,
        description,
        image,
        unit_of_measure,
        price,
        color_representation,
      },
      include: {
        recycling_centers: {
          include: {
            Center_Material: true,
          },
        },
      },
    });

    response.json(updatedMaterial);
  } catch (error) {
    console.error('Error updating recyclable material:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.delete = async (request, response, next) => {
  const materialId = parseInt(request.params.id);

  try {
    // Eliminar la asociación del material con los centros
    await prisma.center_Material.deleteMany({
      where: {
        materialID: materialId,
      },
    });

    // Eliminar el material reciclable
    const deletedMaterial = await prisma.recyclable_Material.delete({
      where: {
        materialID: materialId,
      },
    });

    response.json(deletedMaterial);
  } catch (error) {
    console.error('Error deleting recyclable material:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
