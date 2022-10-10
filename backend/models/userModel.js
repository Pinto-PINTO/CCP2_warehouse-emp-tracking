const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  typeOfEmp: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

// -------------------------- static signup method --------------------------
userSchema.statics.signup = async function (
  email,
  password,
  role,
  firstName,
  lastName,
  phone,
  department,
  typeOfEmp,
  status
) {
  // validation - empty email & password
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // validation - incorrect email
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  // validation - weak password
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hash,
    role,
    firstName,
    lastName,
    phone,
    department,
    typeOfEmp,
    status,
  });

  return user;
};

// -------------------------- static login method --------------------------
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
