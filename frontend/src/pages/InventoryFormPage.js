import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import '../css/FormPage.css';
import Footer from './Footer';



import { useState } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';



function InventoryFormPage() {

  const {dispatch} = useItemsContext()
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [batchNo, setbatchNo] = useState('')
  const [quantity, setquantity] = useState('')
  const [category, setcategory] = useState('')
  const [weight, setweight] = useState('')
  const [error, seterror] = useState(null)


  const handleSubmit = async (e)=>{
    e.preventDefault()

    const item = {name,batchNo,quantity,category,price,weight}
    const response = await fetch('/api/inventory/items',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const json  = await response.json()

    if(!response.ok){
      seterror(json.error)
    }
    if(response.ok){
      setname('')
      setbatchNo('')
      setcategory('')
      setprice('')
      setquantity('')
      setweight('')
      seterror(null)
      console.log('New Workout Added')
      dispatch({type:'CREATE_ITEM' ,payload:json})
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
              <Link to="/inventory" className="btn btn-primary mr-2 nav-component nav-link-btn ">Table</Link>
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
          <Col>
              <Form.Group className="mb-4 form-field" controlId="BatchNo">
                <Form.Label>BatchNo</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="BatchNo"
                    onChange={(e)=> setbatchNo(e.target.value)}
                    value={batchNo}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="Name">
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    onChange={(e)=> setname(e.target.value)}
                    value={name}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="Category">
                <Form.Label>Category</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    onChange={(e)=> setcategory(e.target.value)}
                    value={category}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="Quantity">
                <Form.Label>Quantity</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Quantity"
                    onChange={(e)=> setquantity(e.target.value)}
                    value={quantity}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="Price">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    onChange={(e)=> setprice(e.target.value)}
                    value={price}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-4 form-field" controlId="Weight">
                <Form.Label>Weight</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Weight"
                    onChange={(e)=> setweight(e.target.value)}
                    value={weight}
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

export default InventoryFormPage