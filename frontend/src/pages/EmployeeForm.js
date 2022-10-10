import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav, ButtonGroup, Dropdown } from "react-bootstrap";
import '../css/EmployeeForm.css';
import Footer from './Footer';
import { useAuthContext } from '../hooks/useAuthContext'

import { useState } from 'react';
import { useEmployeesContext } from '../hooks/useEmployeesContext';


// Imports from MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


function EmployeeForm() {

    const { dispatch } = useEmployeesContext();

    // States for Insert
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [typeOfEmp, setTypeOfEmp] = useState("");


    // error state - POST
    const [error, setError] = useState(null);

    // User Object
    const { user } = useAuthContext()

    // handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault()

        // if (!user) {
        //     setError("You must be logged in")
        //     return
        // }

        const user = { email, password, role, firstName, lastName, phone, department, typeOfEmp, status }

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {

            setEmail("");
            setPassword("");
            setRole("");
            setFirstName("");
            setLastName("");
            setPhone("");
            setDepartment("");
            setTypeOfEmp("");
            setStatus("");

            setError(null)
            console.log("New Employee Added", json)
            dispatch({ type: 'CREATE_EMPLOYEES', payload: json })
        }
    }




    return (

        <div>

            {/* -------------------------------------------------- */}
            {/* ---------- ####### NAV BAR START #######---------- */}
            {/* -------------------------------------------------- */}
            <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
                <Container>
                    <Navbar.Brand>Employee Form</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Navbar.Text className="nav-component nav-user-name">
                            </Navbar.Text>
                            <Link to="/employee" className="btn btn-primary mr-2 nav-component nav-link-btn ">Employee</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* ------------------------------------------------ */}
            {/* ---------- ####### NAV BAR END #######---------- */}
            {/* ------------------------------------------------ */}


            <div className='content'>
                <h1 className='table-name'>
                    <span>Employee Form</span>
                </h1>
                <h2 className='table-info'>
                    Only the Administrator can create new Employees Logins
                </h2>


                <div className='form-center'>
                    {/* ----------------------------------------------- */}
                    {/* ---------- ####### FORM START #######---------- */}
                    {/* ----------------------------------------------- */}
                    <Form className='p-4 p-sm-4 filter-section filter-form-emp' onSubmit={handleSubmit}>

                        <Row>

                            {/* Email */}
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>


                            {/* Password */}
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="Password">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>


                            {/* First Name */}
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="FirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>


                            {/* Last Name */}
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="Last Name">
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row>

                            {/* Phone */}
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="Phone">
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


                            {/* Role */}
                            <Col>
                                <Form.Group className="mb-4" controlId="Access Level">
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
                                            <MenuItem value={"manager"}>Manager</MenuItem>
                                            <MenuItem value={"viewer"}>Viewer</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row>

                            {/* Department */}
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="Department">
                                    <Form.Label>Department</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Department"
                                            onChange={(e) => setDepartment(e.target.value)}
                                            value={department}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>


                            {/* Type of Employee */}
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="Type of Employee">
                                    <Form.Label>Type of Employee</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Type of Employee"
                                            onChange={(e) => setTypeOfEmp(e.target.value)}
                                            value={typeOfEmp}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>


                            {/* Status */}
                            <Col>
                                <Form.Group className="mb-4" controlId="Status">
                                    <FormControl fullWidth className="form-field-status">
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="Status"
                                            onChange={(e) => { setStatus(e.target.value) }}
                                        >
                                            <MenuItem value={"Idle"}>Idle</MenuItem>
                                            <MenuItem value={"Occupied"}>Occupied</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Form.Group>
                            </Col>

                        </Row>


                        {error && <h1 className='error-login text-center'>{error}</h1>}


                        <div className="d-grid gap-2">
                            <Button variant="success" type="Submit" className="filter-btn">
                                Insert
                            </Button>
                        </div>


                    </Form>
                    {/* --------------------------------------------- */}
                    {/* ---------- ####### FORM END #######---------- */}
                    {/* --------------------------------------------- */}
                </div>
            </div>

            <Footer />

        </div>


    )
}

export default EmployeeForm