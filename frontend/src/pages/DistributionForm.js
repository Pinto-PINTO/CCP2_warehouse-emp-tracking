import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../css/DistributionForm.css';
import Footer from './Footer';

function DistributionForm() {
    return (

        <div>
            <div className='entire-form-section'>

                {/* -------------------------------------------------- */}
                {/* ---------- ####### NAV BAR START #######---------- */}
                {/* -------------------------------------------------- */}
                <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
                    <Container>
                        <Navbar.Brand>Distribution Form</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <Navbar.Text className="nav-component nav-user-name">

                                </Navbar.Text>
                                <Link to="/" className="btn btn-primary mr-2 nav-component nav-link-btn ">Table</Link>
                                <Link to="/DistributionCards" className="btn btn-primary mr-2 nav-component nav-link-btn ">Distribution Cards</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {/* ------------------------------------------------ */}
                {/* ---------- ####### NAV BAR END #######---------- */}
                {/* ------------------------------------------------ */}



                <div className='content'>

                    <h1 className='table-name'>
                        <span>Distribution Form</span>
                    </h1>
                    <h2 className='table-info'>
                        Include a brief form description in the section here.
                    </h2>

                    <div className='form-center'>
                        {/* ----------------------------------------------- */}
                        {/* ---------- ####### FORM START #######---------- */}
                        {/* ----------------------------------------------- */}
                        <Form className='p-4 p-sm-4 filter-section filter-form'>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formDate">
                                        <Form.Label>Date</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="date"
                                                placeholder="Select the date"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formTime">
                                        <Form.Label>Time</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Time"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formItemCode">
                                        <Form.Label>Item Code</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Item Code"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Link to="/DistributionEmpTable">
                                        <button type="submit" className="btn btn-primary btn-padding distribution-btn">View all items</button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formMap">
                                        <Form.Label>Location</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Location"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Link to="">
                                        <button type="submit" className="btn btn-primary btn-padding distribution-btn">View map</button>
                                    </Link>
                                </Col>
                            </Row>


                            <Row>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formQuantity">
                                        <Form.Label>Quantity</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                placeholder="Quantity"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formDistance">
                                        <Form.Label>Distance(km)</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                placeholder="Distance"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formDuration">
                                        <Form.Label>Duration(hrs)</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                placeholder="Duration"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Row>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formDriverID">
                                        <Form.Label>Driver ID</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Driver ID"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Link to="/distribution/emptable">
                                        <button type="submit" className="btn btn-primary btn-padding distribution-btn">View drivers</button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-4 form-field" controlId="formVehicleID">
                                        <Form.Label>Vehicle ID</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Vehicle ID"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Link to="/distribution/emptable">
                                        <button type="submit" className="btn btn-primary btn-padding distribution-btn">View vehicles</button>
                                    </Link>
                                </Col>
                            </Row>


                            <div className="d-grid gap-2">
                                <Button variant="success" type="Submit" className="filter-btn">
                                    Submit
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
        </div>

    )
}

export default DistributionForm