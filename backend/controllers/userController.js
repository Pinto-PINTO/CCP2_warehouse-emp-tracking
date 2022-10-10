const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Creating a reusable token generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// ---------------- login a user ----------------
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //   console.log(user.department);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      status: user.status,
      typeOfEmp: user.typeOfEmp,
      phone: user.phone,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ---------------- signup a user ----------------
const signupUser = async (req, res) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    phone,
    department,
    typeOfEmp,
    status,
  } = req.body;

  try {
    const user = await User.signup(
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      department,
      typeOfEmp,
      status
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ---------------------------------------------
// ----------- get all users ---------------
// ---------------------------------------------

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

//-------------------------------------------
//------------ get a single user ------------
//-------------------------------------------

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such User" });
  }

  const user = await User.findById(id);


  if (!user) {
    return res.status(404).json({ error: "No Such User" });
  }
  res.status(200).json(user);
};

//    ---------------------------------------
//    ----------Delete a User----------------
//    ---------------------------------------

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No user found for id: " + id });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No such Item" });
  }

  res.status(200).json(user);
};

//    ---------------------------------------
//    ----------Update a User----------------
//    ---------------------------------------

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such User" });
  }

  const user = await User.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(400).json({ error: "No Such User" });
  }

  res.status(200).json(user);
};

//    ---------------------------------------
//    ----------Update a User Field----------
//    ---------------------------------------

const updateUserOneFeild = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such User" });
  }

  const user = await User.findByIdAndUpdate(
    { _id: id },
    { status: "Occupied" },
    { upsert: true }
  );

  if (!user) {
    return res.status(400).json({ error: "No Such User" });
  }

  res.status(200).json(user);
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  updateUserOneFeild,
};
