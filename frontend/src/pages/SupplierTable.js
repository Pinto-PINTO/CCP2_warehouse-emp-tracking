import React , {useState} from 'react'
import '../css/TablePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useEffect} from 'react'
import { MdDeleteForever } from "react-icons/md"
import { RiPencilFill } from "react-icons/ri"
import Footer from '../components/Footer';
import { useSupplierContext } from '../hooks/useSupplierContext';


const SupplierTable = ({supply}) => {

  //update fields
  const [supplierName, setSupplierName] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierMobile, setSupplierMobile] = useState('');
  const [productList, setProductList] = useState('');
  const [upID , setUpID] = useState('')
  const [error, setError] = useState(null)


  const {supplies, dispatch} = useSupplierContext()

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch('/api/supplies')
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_SUPPLIERS', payload: json})
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

 
    const supply = {supplierName, supplierId, supplierEmail, supplierMobile, productList}
    //console.log(item)
    const response = await fetch('/api/supplies/'+upID,{
      method:'PATCH',
      body:JSON.stringify(supply),
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
      setSupplierName('')
      setSupplierId('')
      setSupplierEmail('')
      setSupplierMobile('')
      setProductList('')
      setError(null)
      setUpID('')
      console.log('Item Updated ID:'+id)
      const  fetchItems = async ()=>{
        const response = await fetch('/api/supplies/'+ upID,{
          method:'GET'
        })
        const json = await response.json()
  
        if(response.ok){
            dispatch({type:'UPDATE_SUPPLIERS', payload:json})
        }
      }
  
      fetchItems()
    }

  }

  const handleUpdateOpen = async(e, supply) => {
    setSupplierName(supply.supplierName)
    setSupplierId(supply.supplierId)
    setSupplierEmail(supply.supplierEmail)
    setSupplierMobile(supply.supplierMobile)
    setProductList(supply.productList)

  }

  //delete function
  const handleDelete = async (e, id) => {
    console.log(id)
    const response = await fetch('/api/supplies/' + id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if(response.ok){

      dispatch({type: 'DELETE_SUPPLIER', payload: json})
    }
  }

  return (

    <div>

      {/* -------------------------------------------------- */}
      {/* ---------- ####### NAV BAR START #######---------- */}
      {/* -------------------------------------------------- */}
      <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
        <Container>
          <Navbar.Brand>Supplier</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name">

              </Navbar.Text>
              <Link to="/supplierForm" className="btn btn-primary mr-2 nav-component nav-link-btn ">Form</Link>
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
          <span>Suppliers</span>
        </h1>
        <h2 className='table-info'>
          All details of suppliers and relevant products are stored in here.
        </h2>

        <table className="table-container">
          <thead className='table-column'>
            <tr>
              <th><h1>Supplier Name</h1></th>
              <th><h1>Supplier Id</h1></th>
              <th><h1>Email</h1></th>
              <th><h1>Mobile</h1></th>
              <th><h1>Description</h1></th>
              <th><h1>Action</h1></th>
            </tr>
          </thead>
          <tbody>
          {
                    supplies && supplies.map((supply) => (
                    <tr className="text-center p-2" key={supply._id}>
                    <td>{supply.supplierName}</td>
                    <td>{supply.supplierId}</td>
                    <td>{supply.supplierEmail}</td>
                    <td>{supply.supplierMobile}</td>
                    <td>{supply.productList}</td>
              <td>
                <Button className="delete-edit" onClick={(e) => {handleDelete(e, supply._id);}}>
                  <MdDeleteForever />
                </Button>
                <Button variant="secondary" className="update-edit" onClick={(e) => { handleOpen();  handleUpdateOpen(e,supply); setUpID(supply._id) }}>
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
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductName">
                              <Form.Label>Supplier Name</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  // placeholder="Supplier Name"
                                  onChange={(e) => setSupplierName(e.target.value)}
                                  value={supplierName}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductDesc">
                              <Form.Label>Supplier ID</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="number"
                                  placeholder="ID"
                                  onChange={(e) => setSupplierId(e.target.value)}
                                  value={supplierId}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductQuantity">
                              <Form.Label>Supplier Email</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="email"
                                  placeholder="Email"
                                  onChange={(e) => setSupplierEmail(e.target.value)}
                                  value={supplierEmail}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductQuantity">
                              <Form.Label>Supplier Mobile</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="number"
                                  placeholder="Mobile"
                                  onChange={(e) => setSupplierMobile(e.target.value)}
                                  value={supplierMobile}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-4" controlId="formProductQuantity">
                              <Form.Label>Product List</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="string"
                                  placeholder="Product List"
                                  onChange={(e) => setProductList(e.target.value)}
                                  value={productList}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                        </Row>

                        {/* ------------- Update Form END ------------- */}

                        <div className="d-grid gap-2">
                          <Button className="insert-btn" variant="primary" type="button" onClick={(e) => { handleClose(); handleUpdate(e, supply._id)}} >
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

export default SupplierTable