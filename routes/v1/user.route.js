const express = require('express');
const usersController  = require('../../controllers/users.controller');

const router = express.Router();



router
.route('/')

.get(usersController.getAllUsers)

  
  // .get(usersController.getRandomUser)
.post(usersController.saveAUser)
router.route('/:id')
.get(usersController.getRandomUser)
.patch(usersController.updateUser)
.delete(usersController.deleteUser)

module.exports= router;