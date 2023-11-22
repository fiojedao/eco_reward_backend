const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class centerService {
  async getAllCenters() {
    try {
      return await prisma.recycling_Center.findMany({
        orderBy: {
          name: "asc",
        },
        include: {
          Address: true,
          material_exchanges: true,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching all centers: ${error.message}`);
    }
  }

  async getMaterialList() {
    try {
      return await prisma.recyclable_Material.findMany({
        orderBy: {
          name: "asc",
        },
      });
    } catch (error) {
      throw new Error(`Error fetching material list: ${error.message}`);
    }
  }

  async getCenterById(id) {
    try {
      const center = await prisma.recycling_Center.findUnique({
        where: {
          centerID: id,
        },
        include: {
          Address: true,
          User: true,
          Center_Material: {
            include: {
              Recyclable_Material: true,
            },
          },
          material_exchanges: true,
        },
      });
      const recyclableMaterials = center.Center_Material.map(item => item.Recyclable_Material);
      return {
        ...center,
        Recyclable_Material: recyclableMaterials,
      };
    } catch (error) {
      throw new Error(`Error fetching center by ID: ${error.message}`);
    }
  }
  
  async getCenterByUserId(id) {
    try {
      const center = await prisma.recycling_Center.findFirst({
        where: {
          administrator_userID: id,
        },
        include: {
          Address: true,
          User: true,
          Center_Material: {
            include: {
              Recyclable_Material: true,
            },
          },
          material_exchanges: true,
        },
      });
      const recyclableMaterials = center.Center_Material.map(item => item.Recyclable_Material);
      return {
        ...center,
        Recyclable_Material: recyclableMaterials,
      };
    } catch (error) {
      throw new Error(`Error fetching center by ID: ${error.message}`);
    }
  }

  async createCenter(centerData) {
    try {
      const {
        province,
        canton,
        district,
        exact_address,
        name,
        phone,
        operating_hours,
        administrator_userID,
        accepted_materials,
      } = centerData;

      const newAddress = await prisma.addresses.create({
        data: {
          province,
          canton,
          district,
          exact_address,
        },
      });

      const newCenter = await prisma.recycling_Center.create({
        data: {
          name,
          addressID: newAddress.addressID,
          phone,
          operating_hours,
          administrator_userID,
          status: "Active",
          Center_Material: {
            connect: accepted_materials,
          },
        },
      });

      return newCenter;
    } catch (error) {
      throw new Error(`Error creating center: ${error.message}`);
    }
  }

  async updateCenter(id, updatedCenterData) {
    try {
      const {
        province,
        canton,
        district,
        exact_address,
        name,
        phone,
        operating_hours,
        administrator_userID,
        Center_Material,
      } = updatedCenterData;

      const oldCenter = await prisma.recycling_Center.findUnique({
        where: {
          centerID: id,
        },
        include: {
          Address: true,
          User: true,
          Center_Material: true,
        },
      });

      await prisma.addresses.update({
        where: {
          addressID: oldCenter.Address.addressID,
        },
        data: {
          province,
          canton,
          district,
          exact_address,
        },
      });

      const updatedCenter = await prisma.recycling_Center.update({
        where: {
          centerID: id,
        },
        data: {
          name,
          addressID: oldCenter.Address.addressID,
          phone,
          operating_hours,
          administrator_userID,
          status: "Active",
        },
      });

      for (const material of oldCenter.Center_Material) {
        await prisma.center_Material.delete({
          where: {
            centerID_materialID: {
              centerID: id,
              materialID: material.materialID,
            },
          },
        });
      }

      for (const material of Center_Material) {
        await prisma.center_Material.create({
          data: {
            centerID: id,
            materialID: material.materialID,
          },
        });
      }

      return updatedCenter;
    } catch (error) {
      throw new Error(`Error updating center: ${error.message}`);
    }
  }
}

module.exports = centerService;
