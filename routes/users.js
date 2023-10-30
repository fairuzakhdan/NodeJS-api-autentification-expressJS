const express = require('express');

const router = express.Router();
const usersController = require('../controller/users');
const { verifyToken } = require('../middleware/verify-token');
const { roleAdmin } = require('../middleware/admin');

// GET
router.get('/', verifyToken, roleAdmin, usersController.getAllUsers);

// GET :id
router.get('/:id', verifyToken, roleAdmin, usersController.getUsersById);

// PUT :id
router.put('/:id', verifyToken, roleAdmin, usersController.updateUsersById);

// DELETE
router.delete('/:id', verifyToken, roleAdmin, usersController.deleteUsersById);

module.exports = router;
