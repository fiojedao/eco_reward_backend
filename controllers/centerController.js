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
      Recyclable_Material: true,
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
      Recyclable_Material: {
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
      Recyclable_Material: true,
    },
  });

  const updateAddress = await prisma.addresses.update({
    where: {
      addressID: oldCenter.addressID,
    },
    data: {
      province: center.province,
      canton: center.canton,
      district: center.district,
      exact_address: center.exact_address,
    },
  });

  const oldMaterialsFormat = oldCenter.Recyclable_Material.map((old) => ({
    ["materialID"]: old.materialID,
  }));
  const newMaterialsFormat = center.accepted_materials.map((material) => ({
    ["materialID"]: material.materialID,
  }));

  console.log(oldMaterialsFormat);
  console.log(newMaterialsFormat);

  const newCenter = await prisma.recycling_Center.update({
    where: {
      centerID: idCenter,
    },
    data: {
      name: "Centro de Reciclaje ABC",
      addressID: updateAddress.addressID,
      phone: "123-456-7890",
      operating_hours: "Lunes a Viernes, 9 AM - 5 PM",
      administrator_userID: 2,
      status: "Active",
      Recyclable_Material: {
        disconnect: oldMaterialsFormat,
        connect: newMaterialsFormat,
      },
    },
  });

  response.json(newCenter);
};
