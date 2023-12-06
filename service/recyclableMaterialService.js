const { prisma } = require("./../prisma/client/index");

class recyclableMaterialService {
  async getAllMaterials() {
    try {
      const materials = await prisma.recyclable_Material.findMany({
        orderBy: {
          name: "asc",
        },
      });
      const materialWithBase64Images = materials.map((material) => {
        if (material.image) {
          const base64Image = Buffer.from(material.image).toString("base64");
          return { ...material, imageBase64: base64Image };
        } else {
          return { ...material, imageBase64: null }; // O alguna acción que desees tomar para imágenes nulas/vacías
        }
      });

      return materialWithBase64Images;
    } catch (error) {
      throw new Error(
        `Error fetching all recyclable materials: ${error.message}`
      );
    }
  }

  async getMaterialById(materialId) {
    try {
      const material = await prisma.recyclable_Material.findUnique({
        where: {
          materialID: materialId,
        },
      });

      if (material && material.image) {
        const base64Image = Buffer.from(material.image).toString("base64");
        return { ...material, base64Image };
      }

      return material;
    } catch (error) {
      throw new Error(
        `Error fetching recyclable material by ID: ${error.message}`
      );
    }
  }

  async getMaterialByCenter(id) {
    try {
      const material = await prisma.center_Material.findMany({
        where: {
          centerID: id,
        },
        include: {
          Recyclable_Material: true,
          Recycling_Center: true,
        },
      });

      if (material && material.image) {
        const base64Image = Buffer.from(material.image).toString("base64");
        return { ...material, base64Image };
      }

      return material;
    } catch (error) {
      throw new Error(
        `Error fetching recyclable material by ID: ${error.message}`
      );
    }
  }

  async createMaterial({
    name,
    description,
    image,
    unit_of_measure,
    price,
    color_representation,
    centerID,
  }) {
    try {
      const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

      const imageBuffer = Buffer.from(base64Image, "base64");
      const newMaterial = await prisma.recyclable_Material.create({
        data: {
          name: name,
          description: description,
          image: imageBuffer,
          unit_of_measure: unit_of_measure,
          price: price,
          color_representation: color_representation,
          Center_Material: {
            create: {
              centerID,
            },
          },
        },
        include: {
          Center_Material: true,
        },
      });

      return newMaterial;
    } catch (error) {
      throw new Error(`Error creating recyclable material: ${error.message}`);
    }
  }

  async updateMaterial(
    materialID,
    { name, description, image, unit_of_measure, price, color_representation }
  ) {
    try {
      const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

      // Decode base64 data into bytes
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const imageBuffer = Buffer.from(byteArray);

      const updatedMaterial = await prisma.recyclable_Material.update({
        where: {
          materialID,
        },
        data: {
          name: name,
          description: description,
          image: imageBuffer,
          unit_of_measure: unit_of_measure,
          price: price,
          color_representation:color_representation,
        },
        include: {
          Center_Material: true,
        },
      });

      if (!updatedMaterial) {
        throw new Error("Recyclable material not found");
      }

      return updatedMaterial;
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

  async checkColorExists(colorRepresentation) {
    try {
      const material = await prisma.recyclable_Material.findFirst({
        where: {
          color_representation: `#${colorRepresentation}`,
        },
        select: {
          color_representation: true,
        },
      });
  
      return !!material;
    } catch (error) {
      throw new Error(`Error checking color existence: ${error.message}`);
    }
  }
}

module.exports = recyclableMaterialService;
