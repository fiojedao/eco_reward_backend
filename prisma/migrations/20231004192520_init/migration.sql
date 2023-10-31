-- CreateTable
CREATE TABLE `User_Role` (
    `roleID` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `identification` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `role` INTEGER NOT NULL,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Addresses` (
    `addressID` INTEGER NOT NULL AUTO_INCREMENT,
    `provinceId` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `cantonId` VARCHAR(191) NULL,
    `canton` VARCHAR(191) NULL,
    `districtId` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `exact_address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`addressID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Address` (
    `user_addressID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `addressID` INTEGER NOT NULL,

    PRIMARY KEY (`user_addressID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recycling_Center` (
    `centerID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `addressID` INTEGER NOT NULL,
    `phone` VARCHAR(191) NULL,
    `operating_hours` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`centerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recyclable_Material` (
    `materialID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `unit_of_measure` VARCHAR(191) NULL,
    `price` DOUBLE NULL,
    `color_representation` VARCHAR(191) NULL,

    PRIMARY KEY (`materialID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Center_Material` (
    `center_materialID` INTEGER NOT NULL AUTO_INCREMENT,
    `centerID` INTEGER NOT NULL,
    `materialID` INTEGER NOT NULL,

    PRIMARY KEY (`center_materialID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recycling_Material_Exchange` (
    `exchangeID` INTEGER NOT NULL AUTO_INCREMENT,
    `client_userID` INTEGER NOT NULL,
    `centerID` INTEGER NOT NULL,
    `exchange_date` DATETIME(3) NOT NULL,
    `materialID` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `eco_coins` DOUBLE NOT NULL,

    PRIMARY KEY (`exchangeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon_Exchange` (
    `couponID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `start_validity_date` DATETIME(3) NULL,
    `end_validity_date` DATETIME(3) NULL,
    `eco_coins_required` DOUBLE NULL,

    PRIMARY KEY (`couponID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon_Exchange_History` (
    `historyID` INTEGER NOT NULL AUTO_INCREMENT,
    `client_userID` INTEGER NOT NULL,
    `couponID` INTEGER NOT NULL,
    `exchange_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`historyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client_Eco_Coins` (
    `ecoCoinsID` INTEGER NOT NULL AUTO_INCREMENT,
    `client_userID` INTEGER NOT NULL,
    `balance` DOUBLE NOT NULL,

    PRIMARY KEY (`ecoCoinsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Center` (
    `user_centerID` INTEGER NOT NULL AUTO_INCREMENT,
    `centerID` INTEGER NOT NULL,
    `role` INTEGER NOT NULL,
    `administrator_userID` INTEGER NULL,

    PRIMARY KEY (`user_centerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_fkey` FOREIGN KEY (`role`) REFERENCES `User_Role`(`roleID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Address` ADD CONSTRAINT `User_Address_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Address` ADD CONSTRAINT `User_Address_addressID_fkey` FOREIGN KEY (`addressID`) REFERENCES `Addresses`(`addressID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recycling_Center` ADD CONSTRAINT `Recycling_Center_addressID_fkey` FOREIGN KEY (`addressID`) REFERENCES `Addresses`(`addressID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Center_Material` ADD CONSTRAINT `Center_Material_centerID_fkey` FOREIGN KEY (`centerID`) REFERENCES `Recycling_Center`(`centerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Center_Material` ADD CONSTRAINT `Center_Material_materialID_fkey` FOREIGN KEY (`materialID`) REFERENCES `Recyclable_Material`(`materialID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recycling_Material_Exchange` ADD CONSTRAINT `Recycling_Material_Exchange_client_userID_fkey` FOREIGN KEY (`client_userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recycling_Material_Exchange` ADD CONSTRAINT `Recycling_Material_Exchange_centerID_fkey` FOREIGN KEY (`centerID`) REFERENCES `Recycling_Center`(`centerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recycling_Material_Exchange` ADD CONSTRAINT `Recycling_Material_Exchange_materialID_fkey` FOREIGN KEY (`materialID`) REFERENCES `Recyclable_Material`(`materialID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coupon_Exchange_History` ADD CONSTRAINT `Coupon_Exchange_History_client_userID_fkey` FOREIGN KEY (`client_userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coupon_Exchange_History` ADD CONSTRAINT `Coupon_Exchange_History_couponID_fkey` FOREIGN KEY (`couponID`) REFERENCES `Coupon_Exchange`(`couponID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client_Eco_Coins` ADD CONSTRAINT `Client_Eco_Coins_client_userID_fkey` FOREIGN KEY (`client_userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Center` ADD CONSTRAINT `User_Center_centerID_fkey` FOREIGN KEY (`centerID`) REFERENCES `Recycling_Center`(`centerID`) ON DELETE RESTRICT ON UPDATE CASCADE;
