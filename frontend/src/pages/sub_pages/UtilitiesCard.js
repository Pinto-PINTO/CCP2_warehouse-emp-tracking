import React , {useState} from 'react'
import './Card.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useEffect} from 'react'
import { MdDeleteForever } from "react-icons/md"
import { RiPencilFill } from "react-icons/ri"
import {BiMap} from "react-icons/bi"
import Footer from '../../components/Footer';
import { useVehicleContext } from '../../hooks/useVehicleContext';
import Popover from '@mui/material/Popover';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';


const UtilitiesCard = ({vehicle}) => {

  //update fields
  const [vehicleID, setVehicleID] = useState('');
  const [vehicleName, setVehicleName] = useState('')
  const [vehicleCategory, setVehicleCategory] = useState('')
  const [manufacturedYear, setManufacturedYear] = useState('')
  const [milage, setMilage] = useState('')
  const [assignedDriverID, setAssignedDriverID] = useState('')
  const [assignedDriverName, setAssignedDriverName] = useState('')
  const [upID , setUpID] = useState('')
  const [error, setError] = useState(null)


  const {vehicles, dispatch} = useVehicleContext()

  
  // employee database con.

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch('/api/vehicles')
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'GET_UTILITIES', payload: json})
      }

    }
    fetchStocks()
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

  //update function
  const handleUpdate = async (e,id)=>{

 
    const vehicle = {vehicleID, vehicleName, manufacturedYear, vehicleCategory, milage, assignedDriverID, assignedDriverName}
    //console.log(item)
    const response = await fetch('/api/vehicles/'+upID,{
      method:'PATCH',
      body:JSON.stringify(vehicle),
      headers:{
        'content-type':'application/json'
      }
    })
  
    const json  = await response.json()
  
    if(!response.ok){
      setError(json.error)
    }
    if(response.ok){
      //console.log(response)
      setVehicleID('')
      setVehicleName('')
      setVehicleCategory('')
      setManufacturedYear('')
      setMilage('')
      setAssignedDriverID('')
      setAssignedDriverName('')
      setError(null)
      setUpID('')
      console.log('Item Updated ID:'+id)
      const  fetchItems = async ()=>{
        const response = await fetch('/api/vehicles/'+ upID,{
          method:'GET'
        })
        const json = await response.json()
  
        if(response.ok){
            dispatch({type:'UPDATE_VEHICLE', payload:json})
        }
      }
  
      fetchItems()
    }

  }

  const handleUpdateOpen = async(e, vehicle) => {
    setVehicleID(vehicle.vehicleID)
    setVehicleName(vehicle.vehicleName)
    setVehicleCategory(vehicle.vehicleCategory)
    setManufacturedYear(vehicle.manufacturedYear)
    setMilage(vehicle.milage)
    setAssignedDriverID(vehicle.assignedDriverID)
    setAssignedDriverName(vehicle.assignedDriverName)

  }

  //delete function
  const handleDelete = async (e, id) => {
    console.log(id)
    const response = await fetch('/api/vehicles/' + id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if(response.ok){

      dispatch({type: 'DELETE_VEHICLE', payload: json})
    }
  }

  //Google maps.
  const [anchorEl, setAnchorEl] = React.useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAUuPoS4vI8AmZwpqNXFbuWdXwcx396yyI",
      })
    
      if (!isLoaded) return <div>Loading...</div>

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseTag = () => {
      setAnchorEl(null);
    };
  
    const openTag = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  

  return (

    <div>

      {/* -------------------------------------------------- */}
      {/* ---------- ####### NAV BAR START #######---------- */}
      {/* -------------------------------------------------- */}
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
        <Container>
          <Navbar.Brand>Vehicles - Utilities</Navbar.Brand>
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
      <h1 className='table-name'>
          <span>Utility Vehicles</span>
        </h1>
        <h2 className='table-info'>
          All details of suppliers and relevant products are stored in here.
        </h2>

      <div className='card-cont'>
        {
            vehicles && vehicles.map((vehicle) => (
                <Card style={{ width: '18rem' }} className='Card_container'>
        <Card.Body>
        <Card.Title>{vehicle.vehicleName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{vehicle.vehicleID}</Card.Subtitle>
        <Card.Text>
         <ul>
            <li>Category: {vehicle.vehicleCategory}</li>
            <li>Manufactured Year: {vehicle.manufacturedYear}</li>
            <li>Milage (km): {vehicle.milage}</li>
            <li><h4>
            {vehicle.status === "Available" && <Badge bg="success">{vehicle.status}</Badge>}
              {vehicle.status === "OnRoute" && <Badge bg="danger">{vehicle.status}</Badge>}
            </h4></li>
         </ul>
        </Card.Text>
        <Button aria-describedby={id} variant="contained" onClick={handleClick} className="map-btn">
                <BiMap/>
              </Button>
              <Popover
                id={id}
                open={openTag}
                anchorEl={anchorEl}
                onClose={handleCloseTag}

              >
                <div>
                <GoogleMap zoom={12} center={{lat: 6.915105 , lng: 79.972354}} mapContainerClassName="map-container">
                  <Marker  position={{lat: 6.915105 , lng: 79.972354}} />
                </GoogleMap>
                </div>
              </Popover>
                <Button className="delete-edit" onClick={(e) => {handleDelete(e, vehicle._id);}}>
                  <MdDeleteForever />
                </Button>
                <Button variant="secondary" className="update-edit" onClick={(e) => { handleOpen();  handleUpdateOpen(e,vehicle); setUpID(vehicle._id) }}>
                  <RiPencilFill />
                </Button>
                <br />
                <br />

                {vehicle.status === "OnRoute" && <Button className="delete-edit" onClick={(e) => {}} href="/VehicleDataInfo">View Distribution</Button>}
                {vehicle.status === "Available" && <Button className="delete-edit" onClick={(e) => {}} href="/VehicleDataInfo" disabled>View Distribution</Button>}


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
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductName">
                              <Form.Label>Vehicle ID</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  // placeholder="Supplier Name"
                                  onChange={(e) => setVehicleID(e.target.value)}
                                  value={vehicleID}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductDesc">
                              <Form.Label>Vehicle Name</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="number"
                                  placeholder="ID"
                                  onChange={(e) => setVehicleName(e.target.value)}
                                  value={vehicleName}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductQuantity">
                              <Form.Label>Category</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="email"
                                  placeholder="Email"
                                  onChange={(e) => setVehicleCategory(e.target.value)}
                                  value={vehicleCategory}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductQuantity">
                              <Form.Label>Year of Manufacture</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="number"
                                  placeholder="Mobile"
                                  onChange={(e) => setManufacturedYear(e.target.value)}
                                  value={manufacturedYear}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductQuantity">
                              <Form.Label>Milage</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="string"
                                  placeholder="Product List"
                                  onChange={(e) => setMilage(e.target.value)}
                                  value={milage}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          
                        </Row>
                        {/* ------------- Update Form END ------------- */}

                        <div className="d-grid gap-2">
                          <Button className="insert-btn" variant="primary" type="button" onClick={(e) => { handleClose(); handleUpdate(e, vehicle._id)}} >
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

      </Card.Body>
    </Card>
            
        ))}

        
      </div >
      {/* ---------------------------------------------- */}
      {/* ---------- ####### TABLE END #######---------- */}
      {/* ---------------------------------------------- */}

      <Footer />
    </div>


  )
}

export default UtilitiesCard