const express = require('express');
const router = express.Router();
const passport = require('passport');
const UsersController = require('../controller/users.controller');


router.post('/register', UsersController.addUser);

router.post('/authenticate', UsersController.loginUser);

router.get('/userslist', passport.authenticate('jwt',{session: false}), UsersController.getUsers);

router.put('/edit',UsersController.editUser);

router.delete('/delete/:userId', UsersController.deleteUser);

module.exports = router;
