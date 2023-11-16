const AddressService = require('../service/addressService');
const addressService = new AddressService();

//adress list
module.exports.getAll = async (request, response, next) => {
  try {
    const allAddresses = await addressService.getAllAddresses();
    response.json(allAddresses);
  } catch (error) {
    console.error('Error fetching all addresses:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

//adress by Id
module.exports.getAllAddressesByUserId = async (request, response, next) => {
  try {
    const allAddresses = await addressService.getAllAddressesByUserId(parseInt(request.params.id));
    response.json(allAddresses);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
//adress by Id
module.exports.getByAddressId = async (request, response, next) => {
  try {
    const allAddresses = await addressService.getByAddressId(parseInt(request.params.id));
    response.json(allAddresses);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
//create address
module.exports.create = async (request, response, next) => {
  try {
    const allAddresses = await addressService.createAddressAndAssociation(request.body);
    response.json(allAddresses);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

//uopdate address
module.exports.update = async (request, response, next) => {
  try {
    const { provinceId, province, cantonId, canton, districtId, district, exact_address } = request.body;
    const allAddresses = await addressService.updateAddress(parseInt(request.params.id),provinceId, province, cantonId, canton, districtId, district, exact_address );
    response.json(allAddresses);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

//delete address
module.exports.delete = async (request, response, next) => {
  try {
    const allAddresses = await addressService.deleteAddressAndAssociation(parseInt(request.params.id));
    response.json(allAddresses);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
