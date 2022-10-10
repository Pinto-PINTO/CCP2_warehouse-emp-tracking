const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// ---------------------------------------------
// ----------- get all employees ---------------
// ---------------------------------------------

const getEmployees = async (req, res) => {
  const user_id = req.user._id;
  const user_role = req.user.role;

  // const userData = await User.find({ user_id }).sort({ createdAt: -1 })
  const userData = await User.findById(user_id);

  console.log("Returns the User Object", userData);
  console.log("User ID: ", user_id);
  console.log("Role: ", userData.role);

  var employees = await Employee.find({}).sort({ createdAt: -1 });

  if (userData.role == "admin" || userData.role == "manager") {
    employees = await Employee.find({}).sort({ createdAt: -1 });
  } else {
    employees = await Employee.find({ user_id }).sort({ createdAt: -1 });
  }

  res.status(200).json(employees);
};

//----------------------------------------------
//------------ get a single employee------------
//----------------------------------------------

const getEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Employee" });
  }

  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(404).json({ error: "No Such Employee" });
  }
  res.status(200).json(employee);
};

//    -------------------------------------------
//    --------Create a new employee--------------
//    -------------------------------------------

const createEmployee = async (req, res) => {
  const {
    employeeID,
    firstName,
    lastName,
    phone,
    address,
    email,
    department,
    role,
    status,
  } = req.body;

  // add doc to db
  try {
    const user_id = req.user._id;
    const employee = await Employee.create({
      employeeID,
      firstName,
      lastName,
      phone,
      address,
      email,
      department,
      role,
      status,
      user_id,
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//    -------------------------------------------
//    ----------Delete an employee----------------
//    -------------------------------------------

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const user_has_access = req.user.hasAccessToDelete;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Employee" });
  }

  // if (user_has_access == "true") {
  //     const employee = await Employee.findOneAndDelete({ _id: id })
  // }
  // else {
  //     return res.status(400).json({ error: "Invalid Permission" })
  // }
  const employee = await Employee.findOneAndDelete({ _id: id });

  if (!employee) {
    return res.status(400).json({ error: "No Such Employee" });
  }

  res.status(200).json(employee);
};

//    -------------------------------------------
//    ----------Update an employee----------------
//    -------------------------------------------

const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Employee" });
  }

  const employee = await Employee.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!employee) {
    return res.status(400).json({ error: "No Such Employee" });
  }

  res.status(200).json(employee);
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
