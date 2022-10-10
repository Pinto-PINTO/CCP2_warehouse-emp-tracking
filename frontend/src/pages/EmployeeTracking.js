import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Navbar,
  Nav,
} from "react-bootstrap";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdDeleteForever } from "react-icons/md";
import { TiTick, TiTimes } from "react-icons/ti";
// import { TiTimes } from "react-icons/im";
import { RiPencilFill, RiTodoFill } from "react-icons/ri";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useEmployeesContext } from "../hooks/useEmployeesContext";
import "../css/EmployeeTracking.css";
import Footer from "./Footer";
import { useAuthContext } from "../hooks/useAuthContext";

// EmpLog Fetch
import { db } from "./EmpLog";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";

// Imports from MUI
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function EmployeeTracking() {
  // ------------------------------------------------------------------------
  // ------------------------------ CRUD START ------------------------------
  // ------------------------------------------------------------------------

  // Context
  const { employees, dispatch } = useEmployeesContext();

  // States for Update
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [typeOfEmp, setTypeOfEmp] = useState("");
  const [nodeEmp, setnodeEmp] = useState();
  const [nodename, setnodename] = useState();
  const [temporaryObj, settemporaryObj] = useState();

  const [mapfilteremail, setMapFilterEmail] = useState("");

  const [nodeEMP, setnodeEMP] = useState([]);

  // ID Updater
  const [updatedID, setUpdatedID] = useState("");

  // State for Delete
  const [delEmpID, setDelEmpID] = useState("");

  // State for Error
  const [error, setError] = useState(null);

  // User Object
  const { user } = useAuthContext();

  // MUI Modal States
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Emp Log States
  const [log, setLog] = useState("");

  //main obj node emp
  const [logs, setLogs] = useState();

  // Modal Form Styling
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // ---------------- Firebase START ----------------
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    onValue(ref(db, "emp_log"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
        console.log("Use Effect Firebase: ", data);
      }
    });
  }, []);

  // ---------------- Firebase END ----------------


  // useEffect to fetch Employee Data
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/api/user/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EMPLOYEES", payload: json });
      }
    };
    // console.log("User ID:", employees._id);
    console.log("Use Effect: ", user);

    // Checking if user object is not null
    if (user) {
      fetchEmployees();
      setMapFilterEmail(user.email);
    }
  }, [dispatch, user]);

  // Handling Delete
  const handleDelete = async (e, id) => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch("/api/user/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_EMPLOYEES", payload: json });
    }
  };

  // Handling Update
  const handleUpdate = async (e, id) => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch("/api/user/" + updatedID, {
      method: "PATCH",
      body: JSON.stringify({
        email,
        role,
        firstName,
        lastName,
        phone,
        department,
        typeOfEmp,
        status,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setEmail("");
      setRole("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setDepartment("");
      setTypeOfEmp("");
      setStatus("");

      const fetchEmployees = async () => {
        const response = await fetch("/api/user/" + updatedID, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "UPDATE_EMPLOYEES", payload: json });
        }
      };
      fetchEmployees();

    }
  };

  const handleUpdateOpen = async (e, employee) => {
    setEmail(employee.email);
    setRole(employee.role);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setPhone(employee.phone);
    setDepartment(employee.department);
    setTypeOfEmp(employee.typeOfEmp);
    setStatus(employee.status);
  };

  // ----------------------------------------------------------------------
  // ------------------------------ CRUD END ------------------------------
  // ----------------------------------------------------------------------

  // Function for export PDF
  const pdfExportComponent = useRef(null);

  const handleExport = (event) => {
    pdfExportComponent.current.save();
  };

  // Getting current date
  const current = new Date();
  const date = `${current.getDate()} / ${current.getMonth() + 1
    } / ${current.getFullYear()}`;


  return (
    <div>
      {/* -------------------------------------------------- */}
      {/* ---------- ####### NAV BAR START #######---------- */}
      {/* -------------------------------------------------- */}
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        sticky="top"
        className="nav-bar-edit"
      >
        <Container>
          <Navbar.Brand>Employee Tracking</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {/* ---------------------- Only if the user is logged in ---------------------- */}
              {user && (
                <div>
                  <Navbar.Text className="nav-component nav-user-name-emp">
                    <b>Signed as: </b> {user.email}
                  </Navbar.Text>
                  <Navbar.Text className="nav-component nav-user-name-emp">
                    <b>Role: </b> {user.role}
                  </Navbar.Text>
                </div>
              )}
              <Link
                to="/dashboard"
                className="btn btn-primary mr-2 nav-component nav-link-btn "
              >
                Dashboard
              </Link>
              {user && user.role == "admin" && (
                <Link
                  to="/employee/form"
                  className="btn btn-primary mr-2 nav-component nav-link-btn "
                >
                  Add New Employee
                </Link>
              )}

              {/* <Link
                to="/employee/form"
                className="btn btn-primary mr-2 nav-component nav-link-btn "
              >
                Add New Employee
              </Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* ------------------------------------------------ */}
      {/* ---------- ####### NAV BAR END #######---------- */}
      {/* ------------------------------------------------ */}

      {/* {employees && employees.filter(emp => emp.email == mapfilteremail).map((employee) => ())} */}
      {/* {todos.map((todo) => (
        <div>
          <h1>{todo.todo}</h1>
        </div>
      ))} */}
      {todos.filter(lo => lo.Date == "2022-10-10T05:30:19.967Z").map((todo) => (
        <div>
          <h1>{todo.date}</h1>
        </div>
      ))}




      {/* -------------------------------------------------- */}
      {/* ---------- ####### DIAGRAM START #######---------- */}
      {/* -------------------------------------------------- */}
      <div className="container1">
        <div className="imageDiv">
          {/* ===== points ===== */}
          <div className="point p1" />
          <div className="point p2" />
          <div className="point p3" />
          <div className="point p4" />
          <div className="point p5" />
          {/* ===== Content inside hover container ===== */}
          <div className="box b1">
            <p>Department Name</p>
            <ul>
              <li>
                <strong>Latest Employee List</strong>
              </li>
              <li>Name: </li>
            </ul>
          </div>
          <div className="box b2">
            <p>Department Name</p>
            <ul>
              <li>
                <strong>Latest Employee List</strong>
              </li>
              <li>Name: </li>
            </ul>
          </div>
          <div className="box b3">
            <p>Department Name</p>
            <ul>
              <li>
                <strong>Latest Employee List</strong>
              </li>
              <li>Name: </li>
            </ul>
          </div>
          <div className="box b4">
            <p>Department Name</p>
            <ul>
              <li>
                <strong>Latest Employee List</strong>
              </li>
              <li>Name: </li>
            </ul>
          </div>
          <div className="box b5">
            <p>Department Name</p>
            <ul>
              <li>
                <strong>Latest Employee List</strong>
              </li>
              <li>Name: </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------ */}
      {/* ---------- ####### DIAGRAM END #######---------- */}
      {/* ------------------------------------------------ */}



      {/* ----------------------------------------------------- */}
      {/* ---------- ####### CRUD TABLE START #######---------- */}
      {/* ----------------------------------------------------- */}

      {/* ---------- DISPLAYING EMPLOYEE RECORDS ONLY FOR ADMIN AND MANAGER ----------*/}

      {user && user.role == "admin" && (
        <div className="content">
          <h1 className="table-name">
            <span>Employee Records</span>
          </h1>
          <h2 className="table-info">Shows all the details of every Employee</h2>


          {/* --------------------------------------------------------- */}
          {/* ---------- ####### FILTER SECTION START #######---------- */}
          {/* --------------------------------------------------------- */}

          {/* <div className='form-center'>
            <Form className='p-4 p-sm-4 filter-section filter-form-section'>

              <Row>
                <Col>
                  <Form.Group className="mb-4 form-field" controlId="formAccessLevel">
                    <Form.Label>Access Level</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search the Access Level"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-4 form-field" controlId="formDepartment">
                    <Form.Label>Department</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search Department Name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-4 form-field" controlId="formTypeOfEmp">
                    <Form.Label>Type of Employee</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search the Type of Employee"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-4 form-field" controlId="formEmpStatus">
                    <Form.Label>Status</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search the Status (Idle/Occupied)"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>


              <div className="d-grid gap-2">
                <Button variant="success" type="Submit" className="filter-btn">
                  Filter
                </Button>
              </div>

            </Form>
          </div> */}

          {/* ------------------------------------------------------- */}
          {/* ---------- ####### FILTER SECTION END #######---------- */}
          {/* ------------------------------------------------------- */}


          <table className="table-container">
            <thead className="table-column">
              <tr>
                <th>
                  <h1>Email</h1>
                </th>
                <th>
                  <h1>First Name</h1>
                </th>
                <th>
                  <h1>Last Name</h1>
                </th>
                <th>
                  <h1>Access Level</h1>
                </th>
                <th>
                  <h1>Phone</h1>
                </th>
                <th>
                  <h1>Department</h1>
                </th>
                <th>
                  <h1>Type of Employee</h1>
                </th>
                <th>
                  <h1>Status</h1>
                </th>
                <th>
                  <h1>Update/Delete</h1>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* ------------- Mapping Employees START ----------------- */}

              {employees &&
                employees.map((employee) => (
                  <tr className="text-center" key={employee._id}>
                    <td>{employee.email}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.role}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>{employee.typeOfEmp}</td>
                    <td>{employee.status}</td>

                    <td>
                      <Button
                        className="delete-edit"
                        onClick={(e) => {
                          handleDelete(e, employee._id);
                          setDelEmpID(e, employee._id);
                        }}
                      >
                        <MdDeleteForever />
                      </Button>
                      <Button
                        variant="secondary"
                        className="update-edit"
                        onClick={(e) => {
                          handleOpen();
                          handleUpdateOpen(e, employee);
                          setUpdatedID(employee._id);
                        }}
                      >
                        <RiPencilFill />
                      </Button>

                      {/* -------------------------------------------------------- */}
                      {/* ---------- ####### MODAL SECTION START #######---------- */}
                      {/* -------------------------------------------------------- */}

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Container className="table-modal-container">
                            {/* ------------------------------------------------------ */}
                            {/* ---------- ####### UPDATE FORM START #######---------- */}
                            {/* ------------------------------------------------------ */}
                            <Form className="rounded p-4 p-sm-4 border table-modal-form">
                              <h1 className="font-weight-bold text-center pb-4 update-form-title">
                                EMPLOYEE UPDATE FORM
                              </h1>

                              {/* ------------- Update Form START -------------*/}

                              <Row>
                                {/* Employee ID */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="EmployeeID"
                                  >
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        disabled
                                        type="text"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>

                                {/* First Name */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="FirstName"
                                  >
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
                                        value={firstName}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>

                                {/* Last Name */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="Last Name"
                                  >
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={(e) =>
                                          setLastName(e.target.value)
                                        }
                                        value={lastName}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                {/* Phone */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="Phone"
                                  >
                                    <Form.Label>Phone Number</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="phone"
                                        placeholder="Phone Number"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>


                                <Col>
                                  <Form.Group
                                    className="mb-4"
                                    controlId="Access Level"
                                  >
                                    <FormControl
                                      fullWidth
                                      className="form-field-status"
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Access Level
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Access Level"
                                        onChange={(e) => {
                                          setRole(e.target.value);
                                        }}
                                      >
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                        <MenuItem value={"manager"}>
                                          Manager
                                        </MenuItem>
                                        <MenuItem value={"viewer"}>
                                          Viewer
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                {/* Department */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="Department"
                                  >
                                    <Form.Label>Department</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="text"
                                        placeholder="Department"
                                        onChange={(e) =>
                                          setDepartment(e.target.value)
                                        }
                                        value={department}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>

                                {/* Type of Employee */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="Role"
                                  >
                                    <Form.Label>Type of Employee</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="text"
                                        placeholder="Type of Employee"
                                        onChange={(e) =>
                                          setTypeOfEmp(e.target.value)
                                        }
                                        value={typeOfEmp}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>

                                {/* Status */}
                                <Col>
                                  <Form.Group className="mb-4" controlId="Status">
                                    <FormControl
                                      fullWidth
                                      className="form-field-status"
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Status
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Status"
                                        onChange={(e) => {
                                          setStatus(e.target.value);
                                        }}
                                      >
                                        <MenuItem value={"Idle"}>Idle</MenuItem>
                                        <MenuItem value={"Occupied"}>
                                          Occupied
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Form.Group>
                                </Col>
                              </Row>

                              {/* ------------- Update Form END ------------- */}

                              <div className="d-grid gap-2">
                                <Button
                                  className="insert-btn"
                                  variant="primary"
                                  type="button"
                                  onClick={(e) => {
                                    handleClose();
                                    handleUpdate(e, employee._id);
                                  }}
                                >
                                  Update
                                </Button>
                              </div>
                            </Form>

                            {/* ---------------------------------------------------- */}
                            {/* ---------- ####### UPDATE FORM END #######---------- */}
                            {/* ---------------------------------------------------- */}
                          </Container>
                        </Box>
                      </Modal>
                      {/* ------------------------------------------------------ */}
                      {/* ---------- ####### MODAL SECTION END #######---------- */}
                      {/* ------------------------------------------------------ */}
                    </td>
                  </tr>
                ))}

              {/* -------------- Mapping Employees END ------------- */}
            </tbody>
          </table>
        </div>
      )}


      {user && user.role == "manager" && (
        <div className="content">
          <h1 className="table-name">
            <span>Employee Records</span>
          </h1>
          <h2 className="table-info">Shows all the details of every Employee</h2>

          <table className="table-container">
            <thead className="table-column">
              <tr>
                <th>
                  <h1>Email</h1>
                </th>
                <th>
                  <h1>First Name</h1>
                </th>
                <th>
                  <h1>Last Name</h1>
                </th>
                <th>
                  <h1>Access Level</h1>
                </th>
                <th>
                  <h1>Phone</h1>
                </th>
                <th>
                  <h1>Department</h1>
                </th>
                <th>
                  <h1>Type of Employee</h1>
                </th>
                <th>
                  <h1>Status</h1>
                </th>
                <th>
                  <h1>Update/Delete</h1>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* ------------- Mapping Employees START ----------------- */}

              {employees &&
                employees.map((employee) => (
                  <tr className="text-center" key={employee._id}>
                    <td>{employee.email}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.role}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>{employee.typeOfEmp}</td>
                    <td>{employee.status}</td>

                    <td>
                      <Button
                        className="delete-edit"
                        onClick={(e) => {
                          handleDelete(e, employee._id);
                          setDelEmpID(e, employee._id);
                        }}
                      >
                        <MdDeleteForever />
                      </Button>
                      <Button
                        variant="secondary"
                        className="update-edit"
                        onClick={(e) => {
                          handleOpen();
                          handleUpdateOpen(e, employee);
                          setUpdatedID(employee._id);
                        }}
                      >
                        <RiPencilFill />
                      </Button>

                      {/* -------------------------------------------------------- */}
                      {/* ---------- ####### MODAL SECTION START #######---------- */}
                      {/* -------------------------------------------------------- */}

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Container className="table-modal-container">
                            {/* ------------------------------------------------------ */}
                            {/* ---------- ####### UPDATE FORM START #######---------- */}
                            {/* ------------------------------------------------------ */}
                            <Form className="rounded p-4 p-sm-4 border table-modal-form">
                              <h1 className="font-weight-bold text-center pb-4 update-form-title">
                                EMPLOYEE UPDATE FORM
                              </h1>

                              {/* ------------- Update Form START -------------*/}

                              <Row>
                                {/* Employee ID */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="EmployeeID"
                                  >
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        disabled
                                        type="text"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>

                                {/* First Name */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="FirstName"
                                  >
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
                                        value={firstName}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>

                                {/* Last Name */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="Last Name"
                                  >
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={(e) =>
                                          setLastName(e.target.value)
                                        }
                                        value={lastName}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                {/* Phone */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="Phone"
                                  >
                                    <Form.Label>Phone Number</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="phone"
                                        placeholder="Phone Number"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>


                                <Col>
                                  <Form.Group
                                    className="mb-4"
                                    controlId="Access Level"
                                  >
                                    <FormControl
                                      fullWidth
                                      className="form-field-status"
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Access Level
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Access Level"
                                        onChange={(e) => {
                                          setRole(e.target.value);
                                        }}
                                      >
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                        <MenuItem value={"manager"}>
                                          Manager
                                        </MenuItem>
                                        <MenuItem value={"viewer"}>
                                          Viewer
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                {/* Department */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="Department"
                                  >
                                    <Form.Label>Department</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="text"
                                        placeholder="Department"
                                        onChange={(e) =>
                                          setDepartment(e.target.value)
                                        }
                                        value={department}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>

                                {/* Type of Employee */}
                                <Col>
                                  <Form.Group
                                    className="mb-4 form-field"
                                    controlId="Role"
                                  >
                                    <Form.Label>Type of Employee</Form.Label>
                                    <InputGroup>
                                      <Form.Control
                                        type="text"
                                        placeholder="Type of Employee"
                                        onChange={(e) =>
                                          setTypeOfEmp(e.target.value)
                                        }
                                        value={typeOfEmp}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                </Col>

                                {/* Status */}
                                <Col>
                                  <Form.Group className="mb-4" controlId="Status">
                                    <FormControl
                                      fullWidth
                                      className="form-field-status"
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Status
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Status"
                                        onChange={(e) => {
                                          setStatus(e.target.value);
                                        }}
                                      >
                                        <MenuItem value={"Idle"}>Idle</MenuItem>
                                        <MenuItem value={"Occupied"}>
                                          Occupied
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Form.Group>
                                </Col>
                              </Row>

                              {/* ------------- Update Form END ------------- */}

                              <div className="d-grid gap-2">
                                <Button
                                  className="insert-btn"
                                  variant="primary"
                                  type="button"
                                  onClick={(e) => {
                                    handleClose();
                                    handleUpdate(e, employee._id);
                                  }}
                                >
                                  Update
                                </Button>
                              </div>
                            </Form>

                            {/* ---------------------------------------------------- */}
                            {/* ---------- ####### UPDATE FORM END #######---------- */}
                            {/* ---------------------------------------------------- */}
                          </Container>
                        </Box>
                      </Modal>
                      {/* ------------------------------------------------------ */}
                      {/* ---------- ####### MODAL SECTION END #######---------- */}
                      {/* ------------------------------------------------------ */}
                    </td>
                  </tr>
                ))}

              {/* -------------- Mapping Employees END ------------- */}
            </tbody>
          </table>
        </div>
      )}


      {/* --------------------------------------------------- */}
      {/* ---------- ####### CRUD TABLE END #######---------- */}
      {/* --------------------------------------------------- */}





      {user && user.role == "viewer" && (

        <div className="content">
          <h1 className="table-name">
            <span>Profile</span>
          </h1>
          <h2 className="table-info">
            Individual Employees can update their profile details and show their perks.
          </h2>



          {/* ------------------------------------------------------- */}
          {/* ---------- ####### PROFILE CARD START #######---------- */}
          {/* ------------------------------------------------------- */}

          <div className='profile-section'>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
              <div className="p-4 profile-card">
                <div className="profile-image d-flex flex-column justify-content-center align-items-center">
                  <button className="profile-img-btn btn-secondary">
                    <img src="https://i.imgur.com/wvxPV9S.png" height={100} width={100} />
                  </button>


                  {employees && employees.filter(emp => emp.email == mapfilteremail).map((employee) => (
                    <div key={employee._id}>

                      <span className="p-name mt-3 text-center d-flex flex-row justify-content-center align-items-center">{employee.firstName} {employee.lastName}</span>
                      <span className="p-idd pt-2 d-flex flex-row justify-content-center align-items-center">{employee.role}</span>

                      <div className='profile-section-text'>
                        <div className="d-flex flex-row justify-content-center align-items-center gap-2 custom-section-margin">
                          <span className="p-idd1 text-center">Type: {employee.typeOfEmp}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center gap-2 custom-section-margin">
                          <span className="p-idd1">Email: {employee.email}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center gap-2 custom-section-margin">
                          <span className="p-idd1">Phone: {employee.phone}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center gap-2 custom-section-margin">
                          <span className="p-idd1">Department: {employee.department}</span>
                        </div>
                      </div>

                      {user.status == "Idle" && (
                        <div className='p-status-section text-center'>
                          <mark className='available-mark'> <span><TiTick /></span>{user.status}</mark>
                        </div>
                      )}

                      {user.status == "Occupied" && (
                        <div className='p-status-section text-center'>
                          <mark className='unavailable-mark'> <span><TiTimes /> </span>{user.status}</mark>
                        </div>
                      )}


                      <td>
                        <div className="d-flex mt-2 profile-btn-section-container">
                          <button
                            className="edit-btn1 btn-dark profile-btn-section"
                            onClick={(e) => {
                              handleOpen();
                              handleUpdateOpen(e, employee);
                              setUpdatedID(employee._id);
                            }}
                          >
                            Edit Profile
                          </button>
                        </div>


                        {/* -------------------------------------------------------- */}
                        {/* ---------- ####### MODAL SECTION START #######---------- */}
                        {/* -------------------------------------------------------- */}

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Container className="table-modal-container">
                              {/* ------------------------------------------------------ */}
                              {/* ---------- ####### UPDATE FORM START #######---------- */}
                              {/* ------------------------------------------------------ */}
                              <Form className="rounded p-4 p-sm-4 border table-modal-form">
                                <h1 className="font-weight-bold text-center pb-4 update-form-title">
                                  UPDATE MY PROFILE DETAILS
                                </h1>

                                {/* ------------- Update Form START -------------*/}

                                <Row>
                                  {/* Employee ID */}
                                  <Col>
                                    <Form.Group
                                      className="mb-4 form-field"
                                      controlId="EmployeeID"
                                    >
                                      <Form.Label>Email</Form.Label>
                                      <InputGroup>
                                        <Form.Control
                                          disabled
                                          type="text"
                                          placeholder="Email"
                                          onChange={(e) => setEmail(e.target.value)}
                                          value={email}
                                        />
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>

                                  {/* First Name */}
                                  <Col>
                                    <Form.Group
                                      className="mb-4 form-field"
                                      controlId="FirstName"
                                    >
                                      <Form.Label>First Name</Form.Label>
                                      <InputGroup>
                                        <Form.Control
                                          type="text"
                                          placeholder="First Name"
                                          onChange={(e) =>
                                            setFirstName(e.target.value)
                                          }
                                          value={firstName}
                                        />
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>

                                  {/* Last Name */}
                                  <Col>
                                    <Form.Group
                                      className="mb-4 form-field"
                                      controlId="Last Name"
                                    >
                                      <Form.Label>Last Name</Form.Label>
                                      <InputGroup>
                                        <Form.Control
                                          type="text"
                                          placeholder="Last Name"
                                          onChange={(e) =>
                                            setLastName(e.target.value)
                                          }
                                          value={lastName}
                                        />
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>
                                </Row>

                                <Row>
                                  {/* Phone */}
                                  <Col>
                                    <Form.Group
                                      className="mb-4 form-field"
                                      controlId="Phone"
                                    >
                                      <Form.Label>Phone Number</Form.Label>
                                      <InputGroup>
                                        <Form.Control
                                          type="phone"
                                          placeholder="Phone Number"
                                          onChange={(e) => setPhone(e.target.value)}
                                          value={phone}
                                        />
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>


                                  <Col>
                                    <Form.Group
                                      className="mb-4"
                                      controlId="Access Level"
                                    >
                                      <FormControl
                                        fullWidth
                                        className="form-field-status"
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                          Access Level
                                        </InputLabel>
                                        <Select
                                          disabled
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={role}
                                          label="Access Level"
                                          onChange={(e) => {
                                            setRole(e.target.value);
                                          }}
                                        >
                                          <MenuItem value={"admin"}>Admin</MenuItem>
                                          <MenuItem value={"manager"}>
                                            Manager
                                          </MenuItem>
                                          <MenuItem value={"viewer"}>
                                            Viewer
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Form.Group>
                                  </Col>
                                </Row>

                                <Row>
                                  {/* Department */}
                                  <Col>
                                    <Form.Group
                                      className="mb-4 form-field"
                                      controlId="Department"
                                    >
                                      <Form.Label>Department</Form.Label>
                                      <InputGroup>
                                        <Form.Control
                                          disabled
                                          type="text"
                                          placeholder="Department"
                                          onChange={(e) =>
                                            setDepartment(e.target.value)
                                          }
                                          value={department}
                                        />
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>

                                  {/* Type of Employee */}
                                  <Col>
                                    <Form.Group
                                      className="mb-4 form-field"
                                      controlId="Role"
                                    >
                                      <Form.Label>Type of Employee</Form.Label>
                                      <InputGroup>
                                        <Form.Control
                                          disabled
                                          type="text"
                                          placeholder="Type of Employee"
                                          onChange={(e) =>
                                            setTypeOfEmp(e.target.value)
                                          }
                                          value={typeOfEmp}
                                        />
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>

                                  {/* Status */}
                                  <Col>
                                    <Form.Group className="mb-4" controlId="Status">
                                      <FormControl
                                        fullWidth
                                        className="form-field-status"
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                          Status
                                        </InputLabel>
                                        <Select
                                          disabled
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={status}
                                          label="Status"
                                          onChange={(e) => {
                                            setStatus(e.target.value);
                                          }}
                                        >
                                          <MenuItem value={"Idle"}>Idle</MenuItem>
                                          <MenuItem value={"Occupied"}>
                                            Occupied
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Form.Group>
                                  </Col>
                                </Row>

                                {/* ------------- Update Form END ------------- */}

                                <div className="d-grid gap-2">
                                  <Button
                                    className="insert-btn"
                                    variant="primary"
                                    type="button"
                                    onClick={(e) => {
                                      handleClose();
                                      handleUpdate(e, employee._id);
                                    }}
                                  >
                                    Update
                                  </Button>
                                </div>
                              </Form>

                              {/* ---------------------------------------------------- */}
                              {/* ---------- ####### UPDATE FORM END #######---------- */}
                              {/* ---------------------------------------------------- */}
                            </Container>
                          </Box>
                        </Modal>
                        {/* ------------------------------------------------------ */}
                        {/* ---------- ####### MODAL SECTION END #######---------- */}
                        {/* ------------------------------------------------------ */}
                      </td>
                    </div>
                  ))}



                  <div className="p-text mt-3 text-center">
                    <span>{user.firstName} {user.lastName} is an expert at managing effective practices and ensuring the highest level of client satisfaction.<br />
                    </span>
                  </div>


                  <div className=" px-2 rounded mt-4 p-date ">
                    <span className="p-join">Joined October,2022</span>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------- */}
          {/* ---------- ####### PROFILE CARD END #######---------- */}
          {/* ----------------------------------------------------- */}



        </div>




      )}




      {/* ------------------------------------------------ */}
      {/* ---------- ####### TABLE START #######---------- */}
      {/* ------------------------------------------------ */}
      <div className="content">
        <h1 className="table-name">
          <span>Employee Log</span>
        </h1>
        <h2 className="table-info">
          The table below shows a log of all employees whose access has been
          granted or denied.
        </h2>

        {/* ------------------------------------------------------- */}
        {/* ---------- ####### PDF GENERATE START #######---------- */}
        {/* ------------------------------------------------------- */}


        <div className="text-center generate-btn-section">

          {user && user.role == "admin" && (
            <button onClick={handleExport} className="generate-btn">
              Employee Log Report
            </button>
          )}

          {user && user.role == "manager" && (
            <button onClick={handleExport} className="generate-btn">
              Employee Log Report
            </button>
          )}

        </div>
        {/* ----------------------------------------------------- */}
        {/* ---------- ####### PDF GENERATE END #######---------- */}
        {/* ----------------------------------------------------- */}

        {/* -------- Firebase Push from Google Sheets -------- */}
        {/* https://enappd.com/blog/integrating-google-sheets-with-firebase-realtime-database/182/ */}

        <table className="table-container">
          <thead className="table-column">
            <tr>
              <th>
                <h1>First Name</h1>
              </th>
              <th>
                <h1>Last Name</h1>
              </th>
              <th>
                <h1>Department</h1>
              </th>
              <th>
                <h1>Role</h1>
              </th>
              <th>
                <h1>Date</h1>
              </th>
              <th>
                <h1>Time</h1>
              </th>
              <th>
                <h1>Phone Number</h1>
              </th>
              {/* <th><h1>Success/Failure</h1></th> */}
            </tr>
          </thead>
          <tbody>

            {/* ------- LOG RECORDS START ------- */}
            <tr className="text-center">
              <td>Hussen</td>
              <td>Davidson</td>
              <td>Vehicle Dept</td>
              <td>Instructor</td>
              <td>9/21/2022</td>
              <td>4:37:31</td>
              <td>0116669898</td>
            </tr>
            <tr className="text-center">
              <td>Karen</td>
              <td>Diyoke</td>
              <td>HR Main</td>
              <td>Driving Instruct</td>
              <td>9/21/2022</td>
              <td>4:37:31</td>
              <td>0112242563</td>
            </tr>
            <tr className="text-center">
              <td>Hussen</td>
              <td>Davidson</td>
              <td>Vehicle Dept</td>
              <td>Instructor</td>
              <td>9/21/2022</td>
              <td>4:37:31</td>
              <td>0116669898</td>
            </tr>
            <tr className="text-center">
              <td>Karen</td>
              <td>Diyoke</td>
              <td>HR Main</td>
              <td>Driving Instruct</td>
              <td>9/21/2022</td>
              <td>4:37:31</td>
              <td>0112242563</td>
            </tr>
            <tr className="text-center">
              <td>Jackson</td>
              <td>Fernandez</td>
              <td>HR</td>
              <td>Clerk</td>
              <td>9/21/2022</td>
              <td>4:37:31</td>
              <td>0777392568</td>
            </tr>

            {/* ------- LOG RECORDS END ------- */}


            {/* {nodeEMP ? (
              nodeEMP.map((item) => {
                return (
                  <tr className="text-center" key={item.ID}>
                    <td>Johnatha</td>
                    <td>ED8855</td>
                    <td>{item.Phone}</td>
                    <td>9/21/2022</td>
                    <td>4:37:31</td>
                    <td>{item.Address}</td>
                  </tr>
                );
              })
            ) : (
              <h1>Still Loading</h1>
            )} */}
          </tbody>
        </table>

        {/*-----------------------------------------------*/}
        {/*-------------- PDF Content START --------------*/}
        {/*-----------------------------------------------*/}

        {user && (
          <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
            <PDFExport ref={pdfExportComponent} fileName="Employee Report">
              <div className="container" style={{ width: "1000px" }}>
                <div className="row invoice-header px-3 py-2">
                  <div className="col-4">
                    <p>Nemo's Workhouse</p>
                    <h1>REPORT</h1>
                  </div>
                  <div className="col-4 text-right">
                    <p>(011)-255-3333</p>
                    <p>contactnemo@gmail.com</p>
                    <p>nemowarehouse.com</p>
                  </div>
                  <div className="col-4 text-right">
                    <p>No. 479, T B Jayah Mawatha</p>
                    <p>Colombo 10</p>
                    <p>Sri Lanka</p>
                  </div>
                </div>

                <div className="invoice-content row px-5 pt-5">
                  <div className="col-3">
                    <h5 className="gray mb-3">Directed to:</h5>
                    <p className="gray-ish">Mr {user.firstName} {user.lastName}</p>
                    <p className="gray-ish">{user.typeOfEmp}</p>
                    <p className="gray-ish">ID: M120989</p>
                  </div>
                  <div className="col-3">
                    <h5 className="gray">Report number:</h5>
                    <p className="gray-ish"># 123456</p>
                  </div>
                  <div className="col-6 text-right total-field">
                    <h5 className="almost-gray due-date">Date Issued: {date}</h5>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-10 offset-1 invoice-table pt-1">
                    {/* ---------------------- TABLE SECTION DYNAMIC START ---------------------- */}
                    <table className="table table-hover">
                      <thead className="thead splitForPrint">
                        <tr>
                          <th scope="col gray-ish">First Name</th>
                          <th scope="col gray-ish">Last Name</th>
                          <th scope="col gray-ish">Department</th>
                          <th scope="col gray-ish">Role</th>
                          <th scope="col gray-ish">Date</th>
                          <th scope="col gray-ish">Time</th>
                          <th className="text-right" scope="col gray-ish">
                            Phone Number
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* ------- LOG PDF RECORDS START ------- */}
                        <tr>
                          <th scope="row">Hussen</th>
                          <td className="item">Davidson</td>
                          <td>Vehicle Dept</td>
                          <td className="text-right">Instructor</td>
                          <td>9/21/2022</td>
                          <td>4:37:31</td>
                          <td className="text-right">0116669898</td>
                        </tr>
                        <tr>
                          <th scope="row">Karen</th>
                          <td className="item">Diyoke</td>
                          <td>HR Main</td>
                          <td className="text-right">Driving Instruct</td>
                          <td>9/21/2022</td>
                          <td>4:37:31</td>
                          <td className="text-right">0112242563</td>
                        </tr>
                        <tr>
                          <th scope="row">Hussen</th>
                          <td className="item">Davidson</td>
                          <td>Vehicle Dept</td>
                          <td className="text-right">Instructor</td>
                          <td>9/21/2022</td>
                          <td>4:37:31</td>
                          <td className="text-right">0116669898</td>
                        </tr>
                        <tr>
                          <th scope="row">Karen</th>
                          <td className="item">Diyoke</td>
                          <td>HR Main</td>
                          <td className="text-right">Driving Instruct</td>
                          <td>9/21/2022</td>
                          <td>4:37:31</td>
                          <td className="text-right">0112242563</td>
                        </tr>
                        <tr>
                          <th scope="row">Jackson</th>
                          <td className="item">Fernandez</td>
                          <td>HR</td>
                          <td className="text-right">Clerk</td>
                          <td>9/21/2022</td>
                          <td>4:37:31</td>
                          <td className="text-right">0777392568</td>
                        </tr>
                        {/* ------- LOG PDF RECORDS END ------- */}
                      </tbody>
                    </table>
                    {/* ---------------------- TABLE SECTION DYNAMIC END ---------------------- */}
                  </div>
                </div>

                <div className="additional-information">
                  <h4 className="gray-ish text-center">
                    Employee Report Summary
                  </h4>
                  <p className="pt-3 almost-gray text-center">
                    Include a breif description of what this report generates.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                    purus sapien, ullamcorper quis orci eu, consectetur congue
                    nulla. In a fermentum est, ornare maximus neque. Phasellus
                    metus risus, mattis ac sapien in, volutpat laoreet lectus.
                  </p>
                </div>

                <div className="page-footer">
                  <p className="text-center pb-3 mb-3">
                    <em>
                      {" "}
                      THIS DOCUMENT IS ONLY VALID AS AN OFFICIAL STATEMENT FOR
                      NEMO'S WORKHOUSE{" "}
                    </em>
                  </p>
                </div>
              </div>
            </PDFExport>
          </div>
        )}

        {/*---------------------------------------------*/}
        {/*-------------- PDF Content END --------------*/}
        {/*---------------------------------------------*/}
      </div>
      {/* ---------------------------------------------- */}
      {/* ---------- ####### TABLE END #######---------- */}
      {/* ---------------------------------------------- */}

      <Footer />
    </div>
  );
}

export default EmployeeTracking;
