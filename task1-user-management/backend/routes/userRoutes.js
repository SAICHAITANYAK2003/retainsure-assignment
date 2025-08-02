const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  userValidationRules,
  loginValidationRules,
  validate,
} = require("../middlewares/validate");

// Root health check
router.get("/", (req, res) => {
  res.status(200).send("User Management API is live 🚀");
});

// GET /users — get all users
router.get("/users", userController.getUsers);

// GET /user/:id — get user by ID
router.get("/user/:id", userController.getUserById);

// POST /users — create user
router.post(
  "/users",
  userValidationRules(),
  validate,
  userController.createUser
);

// PUT /user/:id — update user
router.put(
  "/user/:id",
  userValidationRules(),
  validate,
  userController.updateUser
);

// DELETE /user/:id — delete user
router.delete("/user/:id", userController.deleteUser);

// GET /search?name= — search users by name
router.get("/search", userController.searchUsers);

// POST /login — login user
router.post("/login", loginValidationRules(), validate, userController.login);

module.exports = router;
