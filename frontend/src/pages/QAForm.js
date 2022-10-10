import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import '../css/QAForm.css';
import Footer from './Footer';

function QAForm() {
    return (


        <div className='entire-form-section'>

            {/* -------------------------------------------------- */}
            {/* ---------- ####### NAV BAR START #######---------- */}
            {/* -------------------------------------------------- */}
            <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
                <Container>
                    <Navbar.Brand>QA Form</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Navbar.Text className="nav-component nav-user-name">

                            </Navbar.Text>
                            <Link to="/qa" className="btn btn-primary mr-2 nav-component nav-link-btn ">QA</Link>
                            <Link to="/qa/cards" className="btn btn-primary mr-2 nav-component nav-link-btn ">QA Cards</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* ------------------------------------------------ */}
            {/* ---------- ####### NAV BAR END #######---------- */}
            {/* ------------------------------------------------ */}



            <div className='content'>

                <h1 className='table-name'>
                    <span>QA Form</span>
                </h1>
                <h2 className='table-info'>
                    Include a brief form description in the section here.
                </h2>

                <div className='form-center'>
                    {/* ----------------------------------------------- */}
                    {/* ---------- ####### FORM START #######---------- */}
                    {/* ----------------------------------------------- */}
                    {/* <Form className='p-4 p-sm-4 filter-section filter-form'>
                        <Row>
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="formProductName">
                                    <Form.Label>Name</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Product Name"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="formProductDesc">
                                    <Form.Label>Description</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Description"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="formProductQuantity">
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
                                <Form.Group className="mb-4 form-field" controlId="formProductStatus">
                                    <Form.Label>Status</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Status"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-4 form-field" controlId="formProductDate">
                                    <Form.Label>Date</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            placeholder="Date"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-grid gap-2">
                            <Button variant="success" type="Submit" className="filter-btn">
                                Insert
                            </Button>
                        </div>

                    </Form> */}
                    {/* --------------------------------------------- */}
                    {/* ---------- ####### FORM END #######---------- */}
                    {/* --------------------------------------------- */}
                </div>





                <div>
                    <div className="row form-section">
                        <div className="col-md-12 col-md-offset-3">
                            <form id="msform">

                                {/* fieldsets */}
                                <fieldset>
                                    <input className='form-top' type="text" name="field1" placeholder="Field 1" />
                                    <input type="text" name="field2" placeholder="Field 2" />
                                    <input type="text" name="field3" placeholder="Field 3" />
                                    <input
                                        type="button"
                                        name="next"
                                        className="next action-button"
                                        defaultValue="INSERT"
                                    />
                                </fieldset>

                            </form>
                        </div>
                    </div>
                </div>






            </div>










            <Footer />

        </div>


    )
}

export default QAForm