const { Router } = require("express");
const userRouter = Router();
const getAllUsers = require('../handlers/userHandlers/getAllUsers');
const postUser = require('../handlers/userHandlers/postUser');
const loginUser = require('../handlers/userHandlers/loginUser');

userRouter.get('/', getAllUsers);

userRouter.post('/login', loginUser);

userRouter.post('/', postUser);

module.exports = userRouter;