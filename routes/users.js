const express = require('express');

const router = express.Router();
const usersController = require('../controller/users');
const { verifyToken } = require('../middleware/verify-token');

// GET
router.get('/', verifyToken, usersController.getAllUsers);

// GET :id
router.get('/:id', verifyToken, usersController.getUsersById);

// PUT :id
router.put('/:id', verifyToken, usersController.updateUsersById);

// DELETE
router.delete('/:id', verifyToken, usersController.deleteUsersById);

module.exports = router;
