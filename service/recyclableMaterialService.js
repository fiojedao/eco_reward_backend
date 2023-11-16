const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class recyclableMaterialService {
  async getAllMaterials() {
    try {
      return await prisma.recyclable_Material.findMany({
        orderBy: {
          name: "asc",
        },
      });
    } catch (error) {
      throw new Error(`Error fetching all recyclable materials: ${error.message}`);
    }
  }

  async getMaterialById(materialId) {
    try {
      return await prisma.recyclable_Material.findUnique({
        where: {
          materialID: materialId,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching recyclable material by ID: ${error.message}`);
    }
  }

  async createMaterial({ name, description, image, unit_of_measure, price, color_representation, centerID }) {
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
        throw new Error('Recyclable material not found');
      }

      return newMaterial;
    } catch (error) {
      throw new Error(`Error creating recyclable material: ${error.message}`);
    }
  }

  async updateMaterial(materialId, { name, description, image, unit_of_measure, price, color_representation, centerID }) {
    try {
      return await prisma.recyclable_Material.update({
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
    } catch (error) {
      throw new Error(`Error updating recyclable material: ${error.message}`);
    }
  }

  async deleteMaterial(materialId) {
    try {
      // Eliminar la asociación del material con los centros
      await prisma.center_Material.deleteMany({
        where: {
          materialID: materialId,
        },
      });

      // Eliminar el material reciclable
      return await prisma.recyclable_Material.delete({
        where: {
          materialID: materialId,
        },
      });
    } catch (error) {
      throw new Error(`Error deleting recyclable material: ${error.message}`);
    }
  }
}

module.exports = recyclableMaterialService;
