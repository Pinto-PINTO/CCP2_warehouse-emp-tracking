
import React , {useState} from 'react'
import '../css/TablePage.css'
import '../css/VehicleTable.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useEffect} from 'react'
import Footer from '../components/Footer';
import { useEmployeesContext } from '../hooks/useEmployeeContext'
import { VehicleDataContext } from '../context/VehicleDataContext';
import Badge from 'react-bootstrap/Badge';


const VehicleEmpTable = () => {

    const {employees, dispatch} = useEmployeesContext()

    const {setVehicleDriver} = useState(VehicleDataContext)

    useEffect(() => {
    const fetchEmp = async () => {
      const response = await fetch('/api/employees')
      const json = await response.json()

      if(response.ok) {
        dispatch({type: "GET_ASSIGNED_DRIVER" , payload: json});
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
          <Navbar.Brand>Vehicle - Driver</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name">

              </Navbar.Text>
              <Link to="/VehicleCards" className="btn btn-primary mr-2 nav-component nav-link-btn ">Cards</Link>
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
          <span>Assigned Driver</span>
        </h1>
        <h2 className='table-info'>
          All details of suppliers and relevant products are stored in here.
        </h2>

        <table className="table-container">
          <thead className='table-column'>
            <tr>
              <th><h1>Employee ID</h1></th>
              <th><h1>Employee Name </h1></th>
              <th><h1>Phone</h1></th>
              <th><h1>Role</h1></th>
              <th><h1>Department (km)</h1></th>
              <th><h1>Status</h1></th>
            </tr>
          </thead>
          <tbody>
          {
            employees && employees.map((employees) => (
                    <tr className="text-center p-2" key={employees._id}>
                    <td>{employees.employeeID}</td>
                    <td>{employees.firstName} {employees.lastName}</td>
                    <td>{employees.phone}</td>
                    <td>{employees.role}</td>
                    <td>{employees.department}</td>
                    <td><h5>
                    {employees.status === "Idle" && <Badge bg="success">{employees.status}</Badge>}
              {employees.status === "Occupied" && <Badge bg="danger">{employees.status}</Badge>}
              </h5></td>
        
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

export default VehicleEmpTable