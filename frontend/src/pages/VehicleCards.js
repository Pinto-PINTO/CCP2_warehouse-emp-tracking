import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/VehicleCards.css'
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';

// import utility_img from '../pages/sub_pages/360_F_246680077_yUSG7PHQEZwSZyxFxrDxGuJb8yq8UaII.jpg'
// import forklift_img from '../pages/sub_pages/ForkliftIMG.jpg'
// import personal_img from '../pages/sub_pages/personalImg.jpg'

const VehicleCards = () => {
  return (
    
    <div>
     {/* -------------------------------------------------- */}
      {/* ---------- ####### NAV BAR START #######---------- */}
      {/* -------------------------------------------------- */}
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
        <Container>
          <Navbar.Brand>Vehicles</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name">

              </Navbar.Text>
              <Link to="/VehicleForm" className="btn btn-primary mr-2 nav-component nav-link-btn ">Form</Link>
              <Link to="/dashboard" className="btn btn-primary mr-2 nav-component nav-link-btn ">Dashboard</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* ------------------------------------------------ */}
      {/* ---------- ####### NAV BAR END #######---------- */}
      {/* ------------------------------------------------ */}
      <div className='card-cont'>
    <Card style={{ width: '18rem' }} className="Card_container" id='trucks'>
      <Card.Img variant="top" src='https://drive.google.com/file/d/1Y5XdlqOFQ9Evhqm4UfzxQ6UOspPj4m2d/view?usp=sharing'/>
      <Card.Body>
        <Card.Title>Trucks</Card.Title>
        <Card.Text>
          Register and manage all trucks
        </Card.Text>
      </Card.Body>
      <Card.Body>
      <Button className="delete-edit" href="/TruckCard">
                      View Trucks
                    </Button>
        
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }} className="Card_container" id='forklift'>
      <Card.Img variant="top"  />
      <Card.Body>
        <Card.Title>Forklifts</Card.Title>
        <Card.Text>
          Register and manage all trucks
        </Card.Text>
      </Card.Body>
      <Card.Body>
      <Button className="delete-edit" href="/ForkliftCard">
                      View Forklifts
                    </Button>
        
      </Card.Body>
    </Card>
    
    <Card style={{ width: '18rem' }} className="Card_container" id='pVehicles'>
      <Card.Img variant="top"  />
      <Card.Body>
        <Card.Title>Personal Vehicles</Card.Title>
        <Card.Text>
          Register and manage all trucks
        </Card.Text>
      </Card.Body>
      <Card.Body>
      <Button className="delete-edit" href="/PersonalCard">
                      View Per.Vehicles
                    </Button>
        
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }} className="Card_container" id='utilities'>
      <Card.Img variant="top"  />
      <Card.Body>
        <Card.Title>utility</Card.Title>
        <Card.Text>
          Register and manage all trucks
        </Card.Text>
      </Card.Body>
      <Card.Body>
      <Button className="delete-edit" href="/UtilitiesCard">
                      View Utility Vehicles
                    </Button>
        
      </Card.Body>
    </Card>
    </div>
    <Footer />
    </div>
  )
  
}

export default VehicleCards