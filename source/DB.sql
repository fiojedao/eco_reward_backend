
-- Create User Roles table
CREATE TABLE User_Role (
    roleID INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- Create Users table
CREATE TABLE User (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    identification VARCHAR(20),
    phone VARCHAR(15),
    role INT NOT NULL,
    FOREIGN KEY (role) REFERENCES User_Role(roleID)
);

-- Create Addresses table
CREATE TABLE Addresses (
    addressID INT AUTO_INCREMENT PRIMARY KEY,
    provinceId VARCHAR(5),
    province VARCHAR(50),
    cantonId VARCHAR(5),
    canton VARCHAR(50),
    districtId VARCHAR(5),
    district VARCHAR(50),
    exact_address VARCHAR(255) NOT NULL
);

-- Create Users_Address table
CREATE TABLE User_Address (
    user_addressID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    addressID INT,
    FOREIGN KEY (addressID) REFERENCES Addresses(addressID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

-- Create Recycling Centers table
CREATE TABLE Recycling_Center (
    centerID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    addressID INT,
    phone VARCHAR(15),
    operating_hours VARCHAR(255),
    status ENUM('active', 'disabled') NOT NULL,
    FOREIGN KEY (addressID) REFERENCES Addresses(addressID)
);

-- Create Recyclable Materials table
CREATE TABLE Recyclable_Material (
    materialID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    unit_of_measure VARCHAR(50),
    price DECIMAL(10, 2),
    color_representation VARCHAR(20)
);

-- Create Intermediate table Center_Material
CREATE TABLE Center_Material (
    center_materialID INT AUTO_INCREMENT PRIMARY KEY,
    centerID INT,
    materialID INT,
    FOREIGN KEY (centerID) REFERENCES Recycling_Center(centerID),
    FOREIGN KEY (materialID) REFERENCES Recyclable_Material(materialID)
);

-- Create Recycling Material Exchanges table
CREATE TABLE Recycling_Material_Exchange (
    exchangeID INT AUTO_INCREMENT PRIMARY KEY,
    client_userID INT,
    centerID INT,
    exchange_date DATE,
    FOREIGN KEY (client_userID) REFERENCES User(userID),
    FOREIGN KEY (centerID) REFERENCES Recycling_Center(centerID)
);

CREATE TABLE Exchange_Material_Details (
    detailID INT AUTO_INCREMENT PRIMARY KEY,
    exchangeID INT,
    materialID INT,
    quantity DECIMAL(10, 2),
    eco_coins DECIMAL(10, 2),
    FOREIGN KEY (exchangeID) REFERENCES Recycling_Material_Exchange(exchangeID),
    FOREIGN KEY (materialID) REFERENCES Recyclable_Material(materialID)
);


-- Create Coupons for Exchange table
CREATE TABLE Coupon_Exchange (
    couponID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    category VARCHAR(50),
    start_validity_date DATE,
    end_validity_date DATE,
    eco_coins_required DECIMAL(10, 2)
);

-- Create Coupon Exchange History table
CREATE TABLE Coupon_Exchange_History (
    historyID INT AUTO_INCREMENT PRIMARY KEY,
    client_userID INT,
    couponID INT,
    exchange_date DATE,
    FOREIGN KEY (client_userID) REFERENCES User(userID),
    FOREIGN KEY (couponID) REFERENCES Coupon_Exchange(couponID)
);

-- Create Client Eco-Coins table
CREATE TABLE Client_Eco_Coins (
    ecoCoinsID INT AUTO_INCREMENT PRIMARY KEY,
    client_userID INT,
    balance DECIMAL(10, 2),
    FOREIGN KEY (client_userID) REFERENCES User(userID)
);

-- Create Intermediate table User_Center
CREATE TABLE User_Center (
    user_centerID INT AUTO_INCREMENT PRIMARY KEY,
    centerID INT,
    role INT NOT NULL,
    administrator_userID INT,
    FOREIGN KEY (administrator_userID) REFERENCES User(userID),
    FOREIGN KEY (centerID) REFERENCES Recycling_Center(centerID),
    FOREIGN KEY (role) REFERENCES User_Role(roleID)
);
