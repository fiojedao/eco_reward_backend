const { prisma, bcrypt, jwt } = require('./../prisma/client/index');

class userService {
  async getAllUsers() {
    try {
      return await prisma.user.findMany({
        orderBy: {
          role: 'asc',
        },
      });
    } catch (error) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  }

  async validateEmail(email) {
    try {
      const existingUser = await prisma.user.findMany({
        where: {
          email: email
        }
      });
      if (existingUser && existingUser.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }

  async createUser(body) {
    try {
      const { name, email, password, identification, phone, role } = body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          identification,
          phone,
          status: true,
          role: role,
        },
      });
  
      const newAddress = await prisma.addresses.create({
        data: {
          provinceId: null,
          province: body.province,
          cantonId: null,
          canton: body.canton,
          districtId: null,
          district: body.district,
          exact_address: "",
        },
      });
      const newUserAddress = await prisma.user_Address.create({
        data: {
            addressID: newAddress.addressID,
            userID: newUser.userID
        },
      });
  
      return newUser
    } catch (error) {
      console.error(error);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async updateUserStatus(userId, status) {
    try {
      console.log(userId, status);
      const updatedUser = await prisma.user.update({
        where: {
          userID: userId,
        },
        data: {
          status: status,
        },
      });
  
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new Error(`Error updating user status: ${error.message}`);
    }
  }
  

  async createUsers(users) {
    try {
      const hashedUsers = await Promise.all(
        users.map(async (user) => {
          const { name, email, password, identification, phone, status, role } = user;
          const hashedPassword = await bcrypt.hash(password, 10);
          return {
            name,
            email,
            password: hashedPassword,
            identification,
            phone,
            role,
            status
          };
        })
      );
  
      const createdUsers = await prisma.user.createMany({
        data: hashedUsers,
      });
  
      return createdUsers;
    } catch (error) {
      console.error(error);
      throw new Error(`Error creating users: ${error.message}`);
    }
  }

  async updateUser(id, dataToUpdate) {
    try {
      const body = {
        email:dataToUpdate.email,
        identification:dataToUpdate.identification,
        name:dataToUpdate.name,
        phone:dataToUpdate.phone,
        status:dataToUpdate.status
      }
      console.log(body);
      const updatedUser = await prisma.user.update({
        where: { userID: id },
        data: body
      });
      console.log(updatedUser);
  
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new Error(`Error updating user: ${error.message}`);
    }
  }
  
  

  async getUserByRole(role) {
    try {
      return await prisma.user.findMany({
        where: {
          role: role,
        },
        orderBy: {
          role: 'asc',
        },
      });
    } catch (error) {
      throw new Error(`Error fetching user by role: ${error.message}`);
    }
  }

  async changePassword(id, credentials) {
    try {
      const { currentPassword, newPassword } = credentials;
  
      // Busca el usuario por su ID
      const user = await prisma.user.findUnique({
        where: {
          userID: id,
        },
      });
  
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      // Verifica si la contraseña actual coincide con la almacenada en la base de datos
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!passwordMatch) {
        throw new Error('La contraseña actual no es válida');
      }
  
      // Encripta la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Actualiza la contraseña del usuario
      await prisma.user.update({
        where: {
          userID: id,
        },
        data: {
          password: hashedPassword,
        },
      });
  
      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(credentials) {
    try {
      const { email, password } = credentials;
  
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
  
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      if (!user.status) {
        throw new Error('El usuario está deshabilitado');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
      }
  
      const token = this.generateToken(user);
  
      return { user, token };
    } catch (error) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
  }
  
  
  async getUserById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          userID: id,
        },
        include: {
          addresses: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }
      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  generateToken(user){
    const secretKey = 'TestKey';
    return jwt.sign({ userId: user.userID, email: user.email }, secretKey, { expiresIn: '20m' }); 
  }

  async getUserCouponExchange(userId) {
    try {
      return await prisma.Coupon_Exchange_History.findMany({
        where: {
          client_userID: userId,
        },
        include: {
          Coupon_Exchange: true,
        },
      });
    } catch (error) {
      throw new Error(`Error fetching user coupon exchanges: ${error.message}`);
    }
  }
}

module.exports = userService;
