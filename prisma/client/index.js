const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

module.exports = {
  prisma: prisma,
  bcrypt: bcrypt,
  jwt: jwt,
};
