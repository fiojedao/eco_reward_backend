const UserService = require('../service/userService');
const userService = new UserService();

module.exports.get = async (request, response, next) => {
  try {
    const users = await userService.getAllUsers();
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.existUser = async (request, response, next) => {
  try {
    const email = request.params.email;
    const users = await userService.validateEmail(email);
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.updateUserStatus = async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const status = Boolean(request.body.status);
    const users = await userService.updateUserStatus(id, status);
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.changePassword = async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const body = request.body;
    console.log(id, body);
    const users = await userService.changePassword(id, body);
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports.updateUser = async (request, response, next) => {
    try {
      const id = Number(request.params.id);
      const body = request.body;
      const users = await userService.updateUser(id, body);
      response.json(users);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.login = async (request, response, next) => {
  try {
    const userBody = request.body;
    const users = await userService.loginUser(userBody);
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports.create = async (request, response, next) => {
  try {
    const userBody = request.body;
    console.log(userBody);
    const users = await userService.createUser(userBody);
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
};

module.exports.getUserByRole = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    const administrators = await userService.getUserByRole(id);
    response.json(administrators);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getById = async (request, response, next) => {
  const id = parseInt(request.params.id);

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getUserCouponExchange = async (request, response, next) => {
  const userId = parseInt(request.params.id);

  try {
    const coupons = await userService.getUserCouponExchange(userId);
    response.json(coupons);
  } catch (error) {
    response.status(500).json({ error: 'Error fetching user coupons' });
  }
};
