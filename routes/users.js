const express = require('express');

const router = express.Router();
// eslint-disable-next-line no-unused-vars, quotes
const usersController = require("../controller/users/users");

// GET
router.get('/', usersController.getAllUsers);

// GET :id
router.get('/:id', usersController.getUsersById);

//  POST
router.post('/', usersController.createUsers);

module.exports = router;
