import React from 'react';



//Styling Imports 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../css/ShipmentsTable.css';
import Footer from './Footer';
import { MdDeleteForever } from "react-icons/md"
import { RiPencilFill } from "react-icons/ri"


//Logic Imports
import { useEffect, useState } from 'react';
import { useShipmentsContext } from '../hooks/useShipmentsContext';

function ShipmentsTable({ shipment }) {

  const { shipments, dispatch } = useShipmentsContext()


  // Update
  const [shipmentID, setShipmentID] = useState('')
  const [productName, setProductName] = useState('')
  const [count, setCount] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [updatedID, setUpdatedID] = useState('')


  // delete
  const [delShipmentID, setdelShipmentID] = useState('')


  const [error, setError] = useState(null)




  useEffect(() => {
    const fetchShipments = async () => {
      const response = await fetch('/api/shipments/')
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_SHIPMENTS', payload: json })
      }
    }
    fetchShipments()
  }, [dispatch])



  // MUI Modal States
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  // Modal Form Styling
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  // const handleDelete = async(e) =>{


  //     console.log(delShipmentID)
  //     const response = await fetch('/api/shipments/' + delShipmentID, {
  //         mathod: 'DELETE'
  //     })
  //     const json = await response.json()

  //     if (response.ok) {
  //         dispatch({type: 'DELETE_SHIPMENT', payload: json})
  //     }
  // }


  const handleDelete = async (e, id) => {



    const response = await fetch('/api/shipments/' + id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_SHIPMENT', payload: json })

    }

  }




  // handle Update
  const handleUpdate = async (e, id) => {

    const response = await fetch('/api/shipments/' + updatedID, {
      method: 'PATCH',
      body: JSON.stringify({ shipmentID, productName, count, supplierName, date, status, description }),

      headers: {
        'content-type': 'application/json'
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
      setError('')
      setUpdatedID('')

      const fetchShipments = async () => {
        const response = await fetch('/api/shipments/' + updatedID, {
          method: 'GET'
        })
        const json = await response.json()


        if (response.ok) {
          dispatch({ type: 'UPDATE_SHIPMENT', payload: json })

        }
      }
      fetchShipments()



    }

  }

  const handleUpdateOpen = async (e, shipment) => {

    setShipmentID(shipment.shipmentID)
    setProductName(shipment.productName)
    setCount(shipment.count)
    setSupplierName(shipment.supplierName)
    setDate(shipment.date)
    setStatus(shipment.status)
    setDescription(shipment.description)

  }





  return (
    <div>
      {/* -------------------------------------------------- */}
      {/* ---------- ####### NAV BAR START #######---------- */}
      {/* -------------------------------------------------- */}
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
        <Container>
          <Navbar.Brand>Shipment</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name">




              </Navbar.Text>
              <Link to="/ShipmentsForm" className="btn btn-primary mr-2 nav-component nav-link-btn ">Form</Link>
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
          <span>Shipment</span>
        </h1>
        <h2 className='table-info'>
          Include a brief table description in the section here.
        </h2>
        <table className="table-container">
          <thead className='table-column'>
            <tr>
              <th><h1>shipmentID</h1></th>
              <th><h1>productName</h1></th>
              <th><h1>count</h1></th>
              <th><h1>supplierName</h1></th>
              <th><h1>date</h1></th>
              <th><h1>status</h1></th>
              <th><h1>description</h1></th>
              <th><h1>options</h1></th>


            </tr>
          </thead>

          <tbody>


            {shipments && shipments.map((shipment) => (
              <tr className='text-center' key={shipment._id}>

                <td >{shipment.shipmentID}</td>
                <td >{shipment.productName}</td>
                <td >{shipment.count}</td>
                <td >{shipment.supplierName}</td>
                <td >{shipment.date}</td>
                <td >{shipment.status}</td>
                <td >{shipment.description}</td>






                <td >
                  <Button className="delete-edit" onClick={e => { handleDelete(e, shipment._id); setdelShipmentID(e, shipment._id) }}>
                    <MdDeleteForever />
                  </Button>
                  <Button variant="secondary" className="update-edit" onClick={(e) => { handleOpen(); handleUpdateOpen(e, shipment); setUpdatedID(shipment._id) }}>
                    <RiPencilFill />
                  </Button>








                  {/* -------------------------------------------------------- */}
                  {/* ---------- ####### MODAL SECTION START #######---------- */}
                  {/* -------------------------------------------------------- */}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Container className="table-modal-container">
                        {/* ------------------------------------------------------ */}
                        {/* ---------- ####### UPDATE FORM START #######---------- */}
                        {/* ------------------------------------------------------ */}
                        <Form className='rounded p-4 p-sm-4 border table-modal-form'>
                          <h1 className='font-weight-bold text-center pb-4 update-form-title'>
                            UPDATE FORM
                          </h1>


                          {/* ------------- Update Form START -------------*/}

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

                          </Row>


                          <Row>



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

                          {/* ------------- Update Form END ------------- */}




                          <div className="d-grid gap-2">
                            <Button className="insert-btn" variant="primary" type="button" onClick={(e) => { handleClose(); handleUpdate(e, shipment._id) }} >
                              Update
                            </Button>
                          </div>
                        </Form>
                        {/* ---------------------------------------------------- */}
                        {/* ---------- ####### UPDATE FORM END #######---------- */}
                        {/* ---------------------------------------------------- */}
                      </Container>
                    </Box>
                  </Modal>
                  {/* ------------------------------------------------------ */}
                  {/* ---------- ####### MODAL SECTION END #######---------- */}
                  {/* ------------------------------------------------------ */}
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
export default ShipmentsTable