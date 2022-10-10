import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Navbar,
  Nav,
} from "react-bootstrap";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../css/DistributionForm.css";

import Footer from "./Footer";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useItemsContext } from "../hooks/useItemsContext";
import { useLocation } from "react-router-dom";

function InventoryCard() {
  const location = useLocation();
  const { ItemID } = location.state;

  //Backend Logic States

  const { items, dispatch } = useItemsContext();

  //Auth Context
  const { user } = useAuthContext();

  const [isFetched, setIsFetched] = useState(false);
  const [item, setitem] = useState();

  useEffect(() => {
    const fetchUpdateItem = async () => {
      console.log(ItemID);
      const response = await fetch("/api/inventory/items/" + ItemID, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setitem(json);
        setIsFetched(true);
        setbatchNo(json.batchNo)
        setname(json.name)
        setcategory(json.category)
        setprice(json.price)
        setweight(json.weight)
        setquantity(json.quantity)   
        setupdateID(json._id)  
      }
    };

    if (user) {
      fetchUpdateItem();
    }
  }, [dispatch, user]);


const setthebatchno = () =>{
    if(isFetched && rendercount ==0){
        setbatchNo(item.batchNo)
        rendercount++
    }else{

    }
}



  //Update States
  const [rendercount, setrendercount] = useState(0)
  const [name, setname] = useState("Loading");
  const [price, setprice] = useState("Loading");
  const [batchNo, setbatchNo] = useState("Loading");
  const [quantity, setquantity] = useState("Loading");
  const [category, setcategory] = useState("Loading");
  const [weight, setweight] = useState("Loading");
  const [error, seterror] = useState(null);
  const [updateID, setupdateID] = useState("");
  const [qaassignID, setqaassignID] = useState("");

  const handleUpdate = async (e, id) => {
    if (user.role == "manager") {
      const item = { name, batchNo, quantity, category, price, weight };
      //console.log(item)
      const response = await fetch("/api/inventory/items/" + updateID, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        seterror(json.error);
      }
      if (response.ok) {
        //console.log(response)
        setname("");
        setbatchNo("");
        setcategory("");
        setprice("");
        setquantity("");
        setweight("");
        seterror(null);
        setupdateID("");
        console.log("Item Updated ID:" + id);
        const fetchItems = async () => {
          const response = await fetch("/api/inventory/items/" + updateID, {
            method: "GET",
          });
          const json = await response.json();

          if (response.ok) {
            dispatch({ type: "UPDATE_ITEM", payload: json });
          }
        };

        fetchItems();
      }
    }
  };

  const handleDelete = async (e, id) => {
    if (user.role == "manager") {
      console.log(id);
      const response = await fetch("/api/inventory/items/" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_ITEM", payload: json });
      }
    }
  };

  const handleUpdateOpen = async (e, item) => {
    //console.log(item._id)
    setname(item.name);
    setbatchNo(item.batchNo);
    setquantity(item.quantity);
    setcategory(item.category);
    setquantity(item.quantity);
    setprice(item.price);
    setweight(item.weight);
  };

  return (
    <div>
      <div className="entire-form-section">
        {/* -------------------------------------------------- */}
        {/* ---------- ####### NAV BAR START #######---------- */}
        {/* -------------------------------------------------- */}
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          sticky="top"
          className="nav-bar-edit"
        >
          <Container>
            <Navbar.Brand>ITEM</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Text className="nav-component nav-user-name"></Navbar.Text>
                <Link
                  to="/inventory"
                  className="btn btn-primary mr-2 nav-component nav-link-btn "
                >
                  Inventory
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* ------------------------------------------------ */}
        {/* ---------- ####### NAV BAR END #######---------- */}
        {/* ------------------------------------------------ */}

        <div className="content">
          <h1 className="table-name">
            <span>Item</span>
          </h1>
          <h2 className="table-info">
            Include a brief form description in the section here.
          </h2>

          <div className="form-center">
            {/* ----------------------------------------------- */}
            {/* ---------- ####### FORM START #######---------- */}
            {/* ----------------------------------------------- */}
            <Form className="p-4 p-sm-4 filter-section filter-form">
              <Row>
                <Col>
                  <Form.Group className="mb-4 form-field" controlId="formBatch">
                    <Form.Label>BatchNo</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Enter the Batch No"
                        value={ batchNo}
                        onChange={(e) => setbatchNo(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-4 form-field" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Enter the Name"
                        value={ name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group
                    className="mb-4 form-field"
                    controlId="formCategory"
                  >
                    <Form.Label>Category</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Enter the Category"
                        value={ category}
                        onChange={(e) => setcategory(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-4 form-field" controlId="formQty">
                    <Form.Label>Quantity</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        placeholder="Enter the Quantity"
                        value={ quantity}
                        onChange={(e) => setquantity(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-4 form-field" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        placeholder="Enter the Price"
                        value={ price}
                        onChange={(e) => setprice(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-4 form-field"
                    controlId="formWeight"
                  >
                    <Form.Label>Weight</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        placeholder="Enter the Weight"
                        value={ weight}
                        onChange={(e) => setweight(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className="d-grid gap-2">
                  
                  <Link to={'/inventory'}>
                  
                  <Button 
                    variant="success"
                    type="Submit"
                    className="filter-btn"
                    onClick={(e) => {
                    
                      handleUpdate(e, item._id);
                    }}
                  >
                    Update
                  </Button>
                  
                  </Link>
                  
                </Col>
                <Col className="d-grid gap-2">

                  <Link to={'/inventory'}>
                  <Button
                    variant="success"
                    type="Submit"
                    className="filter-btn"
                    onClick={(e) => handleDelete(e, item._id)}
                  >
                    Delete
                  </Button>
                  </Link>
                 
                </Col>
              </Row>

              {/* <div className="d-grid gap-2">
                                <Button variant="success" type="Submit" className="filter-btn">
                                    Submit
                                </Button>
                            </div> */}
            </Form>
            {/* --------------------------------------------- */}
            {/* ---------- ####### FORM END #######---------- */}
            {/* --------------------------------------------- */}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default InventoryCard;
