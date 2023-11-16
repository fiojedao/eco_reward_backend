const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class addressService {
  async getAllAddresses() {
    try {
      const allAddresses = await prisma.Addresses.findMany();
      return allAddresses;
    } catch (error) {
      throw new Error('Error fetching all addresses:', error);
    }
  }
  
  async getAllAddressesByUserId(userId) {
    try {
      const userAddresses = await prisma.user_Address.findMany({
        where: {
          userID: userId,
        },
        include: {
          Address: true,
        },
      });
  
      if (!userAddresses || userAddresses.length === 0) {
        throw new Error('User not found or no addresses found for the user');
      }
  
      return userAddresses.map((ua) => ua.Address);
    } catch (error) {
      throw new Error('Error fetching addresses by user ID:', error);
    }
  }
  
  async getByAddressId(addressId) {
    try {
      const address = await prisma.Addresses.findUnique({
        where: {
          addressID: addressId,
        }
      });
  
      if (!address) {
        throw new Error('No address found for the given address ID');
      }
  
      return address;
    } catch (error) {
      throw new Error('Error fetching users by address ID:', error);
    }
  }
  
  async createAddressAndAssociation({userId, provinceId, province, cantonId, canton, districtId, district, exact_address}) {
    try {
      const newAddress = await prisma.Addresses.create({
        data: {
          provinceId,
          province,
          cantonId,
          canton,
          districtId,
          district,
          exact_address,
        },
      });

      const newUserAddressAssociation = await prisma.User_Address.create({
        data: {
          userID: userId,
          addressID: newAddress.addressID,
        }
      });

      return newAddress;
    } catch (error) {
      throw new Error('Error creating address and user-address association:', error);
    }
  }

  async updateAddress(addressId, provinceId, province, cantonId, canton, districtId, district, exact_address) {
    try {
      const updatedAddress = await prisma.Addresses.update({
        where: {
          addressID: addressId,
        },
        data: {
          provinceId,
          province,
          cantonId,
          canton,
          districtId,
          district,
          exact_address,
        },
      });

      return updatedAddress;
    } catch (error) {
      throw new Error('Error updating address:', error);
    }
  }

  async deleteAddressAndAssociation(addressId) {
    try {
      await prisma.User_Address.deleteMany({
        where: {
          addressID: addressId,
        },
      });

      const deletedAddress = await prisma.Addresses.delete({
        where: {
          addressID: addressId,
        },
      });

      return deletedAddress;
    } catch (error) {
      throw new Error('Error deleting address and association:', error);
    }
  }
}

module.exports = addressService;
