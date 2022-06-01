const { Router } = require("express");
// const { authorize } = require("../users/users.middleware");

const { createUser, loginUser, getUsers } = require("./auth.controller");
const { validateUser } = require("./auth.validator");

const authRouter = Router();

authRouter.get("/", getUsers);
authRouter.post("/signup", validateUser, createUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
