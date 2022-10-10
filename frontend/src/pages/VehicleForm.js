import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import Footer from '../components/Footer';
import { useState , useEffect } from 'react';
// import '../css/VehicleForm.css'

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEmployeesContext } from '../hooks/useEmployeeContext'



const VehicleForm = () => {

    const [vehicleID, setVehicleID] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleCategory, setVehicleCategory] = useState('');
    const [manufacturedYear, setManufacturedYear] = useState('');
    const [milage, setMilage] = useState('');
    const [assignedDriverID, setAssignedDriverID] = useState('');
    const [assignedDriverName, setAssignedDriverName] = useState('');
    const [status, setStatus] = useState('');
    const [employeeID, setEmployeeID] = useState('')
    const [error, setError] = useState('')

    const {employees, dispatch} = useEmployeesContext()

    //using employee database
    useEffect(() => {
      const fetchEmp = async () => {
        const response = await fetch('/api/employees')
        const json = await response.json()
  
        if(response.ok) {
          dispatch({type: "SET_EMPLOYEES" , payload: json});
        }
      }
      fetchEmp();
    }, [dispatch])

    const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicles = {vehicleID, vehicleName, vehicleCategory, manufacturedYear, milage, assignedDriverID, assignedDriverName, status }
    const employees = {employeeID}

    const response = await  fetch('/api/vehicles', {
        method: 'POST',
        body: JSON.stringify(vehicles),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }
    if (response.ok){
        setVehicleID('')
        setVehicleName('')
        setVehicleCategory('')
        setManufacturedYear('')
        setMilage('')
        setAssignedDriverID('')
        setAssignedDriverName('')
        setStatus('')
        setError(null)
        console.log("New entry added", json)
    }
    }

  return (
    <div>
    {/* -------------------------------------------------- */}
      {/* ---------- ####### NAV BAR START #######---------- */}
      {/* -------------------------------------------------- */}
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
        <Container>
          <Navbar.Brand>Form</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name">

              </Navbar.Text>
              <Link to="/VehicleCards" className="btn btn-primary mr-2 nav-component nav-link-btn ">Cards</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* ------------------------------------------------ */}
      {/* ---------- ####### NAV BAR END #######---------- */}
      {/* ------------------------------------------------ */}
      <div className='content'>

        <h1 className='table-name'>
          <span>Vehicle Register Form</span>
        </h1>
        <h2 className='table-info'>
          Include a brief form description in the section here.
        </h2>

        <div className='form-center'>
        {/* ----------------------------------------------- */}
        {/* ---------- ####### FORM START #######---------- */}
        {/* ----------------------------------------------- */}
        <Form className='p-4 p-sm-4 filter-section filter-form' onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="formProductName">
                <Form.Label>Vehicle Number</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Number"
                    onChange={(e) => setVehicleID(e.target.value)} 
                    value = {vehicleID}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="formProductDesc">
                <Form.Label>Vehicle Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Name"
                    onChange={(e) => setVehicleName(e.target.value)} 
                    value = {vehicleName}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
                                <Form.Group className="mb-4" controlId="Status">
                                    <FormControl fullWidth className="form-field-status">
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={vehicleCategory}
                                            label="Status"
                                            onChange={(e) => { setVehicleCategory(e.target.value) }}
                                        >
                                            <MenuItem value={"Truck"}>Truck</MenuItem>
                                            <MenuItem value={"Forklift"}>Forklift</MenuItem>
                                            <MenuItem value={"GeneralVehicles"}>General Vehicles</MenuItem>
                                            <MenuItem value={"Utilities"}>Utilities</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Form.Group>
                            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="formProductStatus">
                <Form.Label>Manufactured Year</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="YOM"
                    onChange={(e) => setManufacturedYear(e.target.value)} 
                    value = {manufacturedYear}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="formProductDate">
                <Form.Label>Milage</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="Milage"
                    onChange={(e) => setMilage(e.target.value)} 
                    value = {milage}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
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
                                            <MenuItem value={"Available"}>Available</MenuItem>
                                            <MenuItem value={"OnRoute"}>On-Route</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Form.Group>
                            </Col>

          </Row>

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

export default VehicleForm