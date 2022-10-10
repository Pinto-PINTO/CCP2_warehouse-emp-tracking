const express = require("express");
const {
  loginUser,
  signupUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  updateUserOneFeild,
} = require("../controllers/userController");
const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// ------------------General Routes ----------------------------

//Get All Users
router.get("/", getUsers);

//Get a single User
router.get("/:id", getUser);

//Delete a User
router.delete("/:id", deleteUser);

//Update a User
router.patch("/:id", updateUser);

// Update a Specific Field of a User
router.patch("/qa/:id", updateUserOneFeild);

module.exports = router;
