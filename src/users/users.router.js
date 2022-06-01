const { Router } = require("express");
const { authorize } = require("./users.middleware");
const { getCurrentUser } = require("./users.services");
const usersRouter = Router();

usersRouter.get("/current", authorize(), async (req, res, next) => {
  const user = await getCurrentUser(req.userId);
  res.status(200).send(serializeUserResponse(user));
});

const serializeUserResponse = (user, token) => {
  return {
    user: {
      subscription: user.subscription,
      email: user.email,
      id: user.id,
    },
    token,
  };
};

module.exports = usersRouter;
