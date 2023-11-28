const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');

// Configuración de Multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/')); // Carpeta de destino en el servidor
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  },
});

const upload = multer({ storage: storage });

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
  
  async getMaterialByCenter(id) {
    try {
      return await prisma.center_Material.findMany({
        where: {
          centerID: id
        },
        include: {
          Recyclable_Material: true,
          Recycling_Center: true
        }
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

  async updateMaterial(materialID, { name, description, image, unit_of_measure, price, color_representation }) {
    try {
      const updatedMaterial = await prisma.recyclable_Material.update({
        where: {
          materialID,
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
          Center_Material: true,
        },
      });
  
      if (!updatedMaterial) {
        throw new Error('Recyclable material not found');
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
  async createMaterialWithImage({ name, description, image, unit_of_measure, price, color_representation, centerID }) {
    try {
      const newMaterial = await prisma.recyclable_Material.create({
        data: {
          name,
          description,
          image, // Se guarda el nombre del archivo de imagen en la base de datos
          unit_of_measure,
          price,
          color_representation,
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

  async updateMaterialWithImage(materialID, { name, description, image, unit_of_measure, price, color_representation }) {
    try {
      const updatedMaterial = await prisma.recyclable_Material.update({
        where: {
          materialID,
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
          Center_Material: true,
        },
      });

      if (!updatedMaterial) {
        throw new Error('Recyclable material not found');
      }

      return updatedMaterial;
    } catch (error) {
      throw new Error(`Error updating recyclable material: ${error.message}`);
    }
  }

  async uploadMaterialImage(materialID, file) {
    try {
      // Guarda la imagen en el servidor y actualiza el nombre de la imagen en la base de datos
      const updatedMaterial = await prisma.recyclable_Material.update({
        where: {
          materialID,
        },
        data: {
          image: file.filename,
        },
      });

      if (!updatedMaterial) {
        throw new Error('Recyclable material not found');
      }

      return updatedMaterial;
    } catch (error) {
      throw new Error(`Error uploading material image: ${error.message}`);
    }
  }
  
}

module.exports = recyclableMaterialService;
