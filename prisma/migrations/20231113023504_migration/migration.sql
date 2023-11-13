/*
  Warnings:

  - You are about to drop the column `eco_coins` on the `recycling_material_exchange` table. All the data in the column will be lost.
  - You are about to drop the column `materialID` on the `recycling_material_exchange` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `recycling_material_exchange` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `recycling_material_exchange` DROP FOREIGN KEY `Recycling_Material_Exchange_materialID_fkey`;

-- AlterTable
ALTER TABLE `recycling_material_exchange` DROP COLUMN `eco_coins`,
    DROP COLUMN `materialID`,
    DROP COLUMN `quantity`;

-- CreateTable
CREATE TABLE `Exchange_Material_Details` (
    `detailID` INTEGER NOT NULL AUTO_INCREMENT,
    `exchangeID` INTEGER NOT NULL,
    `materialID` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `eco_coins` DOUBLE NOT NULL,

    PRIMARY KEY (`detailID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exchange_Material_Details` ADD CONSTRAINT `Exchange_Material_Details_materialID_fkey` FOREIGN KEY (`materialID`) REFERENCES `Recyclable_Material`(`materialID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exchange_Material_Details` ADD CONSTRAINT `Exchange_Material_Details_exchangeID_fkey` FOREIGN KEY (`exchangeID`) REFERENCES `Recycling_Material_Exchange`(`exchangeID`) ON DELETE RESTRICT ON UPDATE CASCADE;
