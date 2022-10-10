import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import Footer from '../components/Footer';
import { useState } from 'react';
import '../css/SupplierForm.css'

const SupplierForm = () => {

    const [supplierName, setSupplierName] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [supplierMobile, setSupplierMobile] = useState('');
    const [productList, setProductList] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault();

    const supplies = {supplierName, supplierId, supplierEmail, supplierMobile, productList }

    const response = await  fetch('/api/supplies', {
        method: 'POST',
        body: JSON.stringify(supplies),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }
    if (response.ok){
        setSupplierName('')
        setSupplierId('')
        setSupplierEmail('')
        setSupplierMobile('')
        setProductList('')
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
              <Link to="/supplierTable" className="btn btn-primary mr-2 nav-component nav-link-btn ">Table</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* ------------------------------------------------ */}
      {/* ---------- ####### NAV BAR END #######---------- */}
      {/* ------------------------------------------------ */}
      <div className='content'>

        <h1 className='table-name'>
          <span>Supplier Register Form</span>
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
                <Form.Label>Supplier Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Supplier Name"
                    onChange={(e) => setSupplierName(e.target.value)} 
                    value = {supplierName}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="formProductDesc">
                <Form.Label>ID Number</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="Supplier ID"
                    onChange={(e) => setSupplierId(e.target.value)} 
                    value = {supplierId}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="formProductQuantity">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Supplier Email"
                    onChange={(e) => setSupplierEmail(e.target.value)} 
                    value = {supplierEmail}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="formProductStatus">
                <Form.Label>Mobile</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="Supplier Mobile"
                    onChange={(e) => setSupplierMobile(e.target.value)} 
                    value = {supplierMobile}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="formProductDate">
                <Form.Label>Description</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Product List"
                    onChange={(e) => setProductList(e.target.value)} 
                    value = {productList}
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

export default SupplierForm