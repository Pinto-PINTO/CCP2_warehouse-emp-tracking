
import React , {useState} from 'react'
import '../../css/TablePage.css'
import '../../css/VehicleTable.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useEffect} from 'react'
import Footer from '../../components/Footer';
import {useDistributionsContext} from '../../hooks/useDistributionContext'

const VehicleDistInfo = () => {

    const {distributions, dispatch} = useDistributionsContext()

    useEffect(() => {
    const fetchEmp = async () => {
      const response = await fetch('/api/distributions')
      const json = await response.json()

      if(response.ok) {
        dispatch({type: "SET_DISTRIBUTIONS" , payload: json});
      }
    }
    fetchEmp();
  }, [dispatch])

  return (
<div>
        {/* -------------------------------------------------- */}
      {/* ---------- ####### NAV BAR START #######---------- */}
      {/* -------------------------------------------------- */}
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
        <Container>
          <Navbar.Brand>Distributions</Navbar.Brand>
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



      {/* ------------------------------------------------ */}
      {/* ---------- ####### TABLE START #######---------- */}
      {/* ------------------------------------------------ */}
      <div className='content'>

        <h1 className='table-name'>
          <span>Distributions for the vehicle</span>
        </h1>
        <h2 className='table-info'>
          All details of suppliers and relevant products are stored in here.
        </h2>

        <table className="table-container">
          <thead className='table-column'>
            <tr>
              <th><h1>Date and Time</h1></th>
              <th><h1>Location </h1></th>
              <th><h1>Duration</h1></th>
              <th><h1>Distance</h1></th>
              <th><h1>Action</h1></th>
            </tr>
          </thead>
          <tbody>
          {
            distributions && distributions.map((distributions) => (
                    <tr className="text-center p-2" key={distributions._id}>
                    <td>{distributions.date}</td>
                    <td>{distributions.locate}</td>
                    <td>{distributions.duration}</td>
                    <td>{distributions.distance}</td>
                    <td>
                    <Button variant="secondary" className="Add-driver" onClick={(e) => { }} href='./VehicleEmpTable'>
                        View Driver
                </Button>
                    </td>
              <td>
              

              </td>
              </tr> 
              ))}
          </tbody>
        </table>
      </div >
      {/* ---------------------------------------------- */}
      {/* ---------- ####### TABLE END #######---------- */}
      {/* ---------------------------------------------- */}

      <Footer />
    </div>
  )
}

export default VehicleDistInfo