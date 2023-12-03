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
          role: role
        },
      });
  
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error(`Error creating user: ${error.message}`);
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
