const express = require('express');

const userController = require('./../controllers/user-controller');

const userRouter = express.Router();

userRouter.route('/')
                      .post(userController.insertUser);
userRouter.route('/:id')
                        .delete(userController.deleteUser);

module.exports = userRouter;