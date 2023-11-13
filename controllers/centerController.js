const { PrismaClient } = require("@prisma/client");
const { Console } = require("console");
const { connect } = require("http2");
const prisma = new PrismaClient();
//centerList
module.exports.get = async (request, response, next) => {
  const centers = await prisma.recycling_Center.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      Address: true,
      material_exchanges: true,
    },
  });
  response.json(centers);
};
//material list
module.exports.getMaterial = async (request, response, next) => {
  const centers = await prisma.recyclable_Material.findMany({
    orderBy: {
      name: "asc",
    },
  });
  response.json(centers);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const center = await prisma.recycling_Center.findUnique({
    where: {
      centerID: id,
    },
    include: {
      Address: true,
      User: true,
      Center_Material: true,
    },
  });
  response.json(center);
};
//Crear
module.exports.create = async (request, response, next) => {
  let center = request.body;
  console.log(center);
  const newAddress = await prisma.addresses.create({
    data: {
      province: center.province,
      canton: center.canton,
      district: center.district,
      exact_address: center.exact_address,
    },
  });

  const newCenter = await prisma.recycling_Center.create({
    data: {
      name: center.name,
      addressID: newAddress.addressID,
      phone: center.phone,
      operating_hours: center.operating_hours,
      administrator_userID: center.administrator_userID,
      status: "Active",
      Center_Material: {
        connect: center.accepted_materials,
      },
    },
  });

  /*  const centerMaterialFormat = center.accepted_materials.map((material) => ({
    centerID: newCenter.centerID,
    materialID: material.materialID,
  })); */
  /* 
  const newCenter_Material = await prisma.center_Material.createMany({
    data: centerMaterialFormat,
  }); */

  response.json(newCenter);
};
//Actualizar
module.exports.update = async (request, response, next) => {
  let center = request.body;
  let idCenter = parseInt(request.params.id);

  const oldCenter = await prisma.recycling_Center.findUnique({
    where: {
      centerID: idCenter,
    },
    include: {
      Address: true,
      User: true,
      Center_Material: true
    },
  });

  await prisma.addresses.update({
    where: {
      addressID: oldCenter.Address.addressID,
    },
    data: {
      province: center.province,
      canton: center.canton,
      district: center.district,
      exact_address: center.exact_address,
    },
  });

  const newCenter = await prisma.recycling_Center.update({
    where: {
      centerID: idCenter,
    },
    data: {
      name: center.name,
      addressID: oldCenter.Address.addressID,
      phone: center.phone,
      operating_hours: center.operating_hours,
      administrator_userID: center.administrator_userID,
      status: "Active",
    },
  });
  
  for (const material of oldCenter.Center_Material) {
    await prisma.center_Material.delete({
      where: {
        centerID_materialID: {
          centerID: material.centerID,
          materialID: material.materialID,
        },
      },
    });
  }
  

  for (const material of center.Center_Material) {
    await prisma.center_Material.create({
      data: {
        centerID: material.centerID,
        materialID: material.materialID,
      },
    });
  }

  const actualCenter = await prisma.recycling_Center.findUnique({
    where: {
      centerID: idCenter,
    },
    include: {
      Address: true,
      User: true,
      Center_Material: true
    },
  });
  response.json(actualCenter);
};
