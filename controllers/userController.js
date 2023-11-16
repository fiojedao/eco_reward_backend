const UserService = require('../service/userService');
const userService = new UserService();

module.exports.get = async (request, response, next) => {
  try {
    const users = await userService.getAllUsers();
    response.json(users);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getAdministrators = async (request, response, next) => {
  try {
    const administrators = await userService.getAdministrators();
    response.json(administrators);
  } catch (error) {
    console.error(error.message);
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
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getUserCouponExchange = async (request, response, next) => {
  const userId = parseInt(request.params.id);

  try {
    const coupons = await userService.getUserCouponExchange(userId);
    response.json(coupons);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Error fetching user coupons' });
  }
};
