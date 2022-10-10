import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../css/DistributionEmpTable.css';
import Footer from './Footer';

function DistributionEmpTable() {

    return (

        <div>

            {/* -------------------------------------------------- */}
            {/* ---------- ####### NAV BAR START #######---------- */}
            {/* -------------------------------------------------- */}
            <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
                <Container>
                    <Navbar.Brand>Idle Employees</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Navbar.Text className="nav-component nav-user-name">

                            </Navbar.Text>
                            <Link to="/distribution/form" className="btn btn-primary mr-2 nav-component nav-link-btn ">Distribution Form</Link>
                            <Link to="/distribution/cards" className="btn btn-primary mr-2 nav-component nav-link-btn ">Distribution Cards</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* ------------------------------------------------ */}
            {/* ---------- ####### NAV BAR END #######---------- */}
            {/* ------------------------------------------------ */}



            <div className='content'>

                <h1 className='table-name'>
                    <span>Idle Employees</span>
                </h1>
                <h2 className='table-info'>
                    Include a brief form description in the section here.
                </h2>


                {/* ---------------------------------------------------------------- */}
                {/* ---------- ####### ENTIRE COLUMN SECTION START #######---------- */}
                {/* ---------------------------------------------------------------- */}
                <div className="row card-section-2">


                    {/* ---------------------------------------------------------- */}
                    {/* ---------- ####### EMPLOYEES TABLE START #######---------- */}
                    {/* ---------------------------------------------------------- */}
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Employees</h5>
                                <p className="card-text">
                                    Below is a list of idle employees
                                </p>
                                <table className="table table-bordered table-qa-emp">
                                    <thead>
                                        <tr>
                                            <th scope="col">Assign</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row"><input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault" /></th>
                                            <td>Mark</td>
                                            <td>Driver</td>
                                            <td>Idle</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault" /></th>
                                            <td>Jacob</td>
                                            <td>Speclialist</td>
                                            <td>Idle</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault" /></th>
                                            <td>Smith</td>
                                            <td>Janitor</td>
                                            <td>Idle</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault" /></th>
                                            <td>Mark</td>
                                            <td>Driver</td>
                                            <td>Idle</td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault" /></th>
                                            <td>Jacob</td>
                                            <td>Speclialist</td>
                                            <td>Idle</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* -------------------------------------------------------- */}
                    {/* ---------- ####### EMPLOYEES TABLE END #######---------- */}
                    {/* -------------------------------------------------------- */}


                </div>
                {/* -------------------------------------------------------------- */}
                {/* ---------- ####### ENTIRE COLUMN SECTION END #######---------- */}
                {/* -------------------------------------------------------------- */}


                <div className="d-grid gap-2 card-section-whole">
                    <Button variant="success" type="Submit" className="filter-btn">
                        Assign Employee For Distribution
                    </Button>
                </div>

            </div>
            <Footer />
        </div>


    )
}

export default DistributionEmpTable