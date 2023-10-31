/*
  Warnings:

  - You are about to alter the column `image` on the `recyclable_material` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to drop the `user_center` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_center` DROP FOREIGN KEY `User_Center_centerID_fkey`;

-- AlterTable
ALTER TABLE `recyclable_material` MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `recycling_center` ADD COLUMN `administrator_userID` INTEGER NULL;

-- DropTable
DROP TABLE `user_center`;

-- AddForeignKey
ALTER TABLE `Recycling_Center` ADD CONSTRAINT `Recycling_Center_administrator_userID_fkey` FOREIGN KEY (`administrator_userID`) REFERENCES `User`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;
