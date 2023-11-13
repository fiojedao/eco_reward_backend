import { PrismaClient } from "@prisma/client";
import {
  user_rol,
  users,
  addresses,
  user_addresses,
  client_coins,
  recyclable_Material,
  center_material,
  recycling_centers,
  coupon_exchange,
  coupon_history,
  recycling_material_exchange,
  exchange_material_details,
} from "./seeds";

const prisma = new PrismaClient();

async function main() {
  await prisma.user_Role.createMany({
    data: user_rol,
  });
  await prisma.user.createMany({
    data: users,
  });
  await prisma.addresses.createMany({
    data: addresses,
  });
  await prisma.user_Address.createMany({
    data: user_addresses,
  });
  await prisma.client_Eco_Coins.createMany({
    data: client_coins,
  });
  await prisma.recyclable_Material.createMany({
    data: recyclable_Material,
  });
  await prisma.coupon_Exchange.createMany({
    data: coupon_exchange,
  });
  await prisma.recycling_Center.createMany({
    data: recycling_centers,
  });
  await prisma.center_Material.createMany({
    data: center_material,
  });
  await prisma.coupon_Exchange_History.createMany({
    data: coupon_history,
  });
  await prisma.recycling_Material_Exchange.createMany({
    data: recycling_material_exchange,
  });
  await prisma.exchange_Material_Details.createMany({
    data: exchange_material_details,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
