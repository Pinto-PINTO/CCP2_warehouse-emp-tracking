import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import '../css/ShipmentsForm.css';
import Footer from './Footer';

import { useState } from 'react';
import { useShipmentsContext } from '../hooks/useShipmentsContext';


function ShipmentsForm() {

  const { dispatch } = useShipmentsContext();

  const [shipmentID, setShipmentID] = useState('');
  const [productName, setProductName] = useState('');
  const [count, setCount] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');


  // error state - POST
  const [error, setError] = useState(null);


  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault()

    const shipment = { shipmentID, productName, count, supplierName, date, status, description }

    const response = await fetch('/api/shipments', {
      method: 'POST',
      body: JSON.stringify(shipment),
      headers: {
        'Content-Type': 'application/json'
      }
    })


    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {

      setShipmentID('')
      setProductName('')
      setCount('')
      setSupplierName('')
      setDate('')
      setStatus('')
      setDescription('')

      setError(null)
      console.log("New Shipment Added", json)
      dispatch({ type: 'CREATE_SHIPMENTS', payload: json })
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
              <Link to="/ShipmentsTable" className="btn btn-primary mr-2 nav-component nav-link-btn ">Table</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* ------------------------------------------------ */}
      {/* ---------- ####### NAV BAR END #######---------- */}
      {/* ------------------------------------------------ */}


      <div className='content'>
        <h1 className='table-name'>
          <span>Form Name</span>
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

              {/* Shipment ID */}
              <Col>
                <Form.Group className="mb-4 form-field" controlId="ShipmentID">
                  <Form.Label> ShipmentID</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="ShipmentID"
                      onChange={(e) => setShipmentID(e.target.value)}
                      value={shipmentID}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>


              {/* Product Name */}
              <Col>
                <Form.Group className="mb-4 form-field" controlId="ProductName">
                  <Form.Label> ProductName </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="ProductName"
                      onChange={(e) => setProductName(e.target.value)}
                      value={productName}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>


              {/* Count */}
              <Col>
                <Form.Group className="mb-4 form-field" controlId="Count">
                  <Form.Label> Count </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="Count"
                      onChange={(e) => setCount(e.target.value)}
                      value={count}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>


              {/* Supplier Name */}
              <Col>
                <Form.Group className="mb-4 form-field" controlId="SupplierName">
                  <Form.Label> SupplierName </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="SupplierName"
                      onChange={(e) => setSupplierName(e.target.value)}
                      value={supplierName}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>


              {/* Date */}
              <Col>
                <Form.Group className="mb-4 form-field" controlId="Date">
                  <Form.Label> Date </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="date"
                      placeholder="Date"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>


              {/* Status */}
              <Col>
                <Form.Group className="mb-4 form-field" controlId="Status">
                  <Form.Label> Status  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Status"
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>


              {/* Description */}
              <Col>
                <Form.Group className="mb-4 form-field" controlId="Description">
                  <Form.Label> Description  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>


            </Row>


            {error && <h1 className='error'>{error}</h1>}


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

export default ShipmentsForm