import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
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
import "../css/Amazon.css";
import Footer from "./Footer";
import { MdDeleteForever } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { useAuthContext } from "../hooks/useAuthContext";

//Logic Imports
import { useEffect, useState } from "react";
import { useItemsContext } from "../hooks/useItemsContext";

function InventoryTablePage() {
  // MUI Modal States
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Modal Form Styling
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Buisness Logic

  //Backend Logic States

  const { items, dispatch } = useItemsContext();

  //Auth Context
  const { user } = useAuthContext();

  //Update States
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [batchNo, setbatchNo] = useState("");
  const [quantity, setquantity] = useState("");
  const [category, setcategory] = useState("");
  const [weight, setweight] = useState("");
  const [error, seterror] = useState(null);
  const [updateID, setupdateID] = useState("");
  const [usermail, setusermail] = useState("lathindu2000@gmail.com");
  const [mailmssg, setmailmssg] = useState("sending mail ");
  const [mailStatus, setmailStatus] = useState(false);
  const [qaassignID, setqaassignID] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/inventory/items", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    if (user) {
      fetchItems();
    }
  }, [dispatch, user]);

  // MUI Modal States

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

  const handleQA = async (e, id) => {
    console.log(id);
    const response = await fetch("/api/inventory/items/" + id, {
      method: "GET",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_ITEMS", payload: json });
    }
  };

  return (
    <div>
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
          <Navbar.Brand>Inventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name"></Navbar.Text>
              <Link
                to="/inventory/form"
                className="btn btn-primary mr-2 nav-component nav-link-btn "
              >
                InventoryForm
              </Link>
              <Link
                to="/dashboard"
                className="btn btn-primary mr-2 nav-component nav-link-btn "
              >
                Dashboard
              </Link>
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
      <div className="content">
        <h1 className="table-name">
          <span>INVENTORY</span>
        </h1>
        <h2 className="table-info">Access Invetory</h2>

        <div className="row card-row-section">
          <div className="col-sm-12">
            <div className="list-group">
              {/* -------------- CARD 1 -------------- */}

              {items &&
                items.map((item) => (
                  <Link
                    to="/inventory/card"
                    className="list-group-item list-group-item-action flex-column align-items-start individual-cards"
                    onClick={(e) => {
                      handleOpen();
                      handleUpdateOpen(e, item);
                      setupdateID(item._id);
                    }}
                    state={{ ItemID: item._id }}
                  >
                    <div className="row">
                      <div className="col-sm-2">
                        <img
                          src="https://i.postimg.cc/7CKwfn2z/images-1.png"
                          className="rounded float-left card-image"
                          alt="..."
                        />
                      </div>
                      <div className="col-sm-10">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">Item Name:{item.name} </h5>

                          <small className="text-muted">{item.updatedAt}</small>
                        </div>
                        <p className="mb-1">Batch number:{item.batchNo}</p>
                        <p className="mb-1">Category: {item.category}</p>
                        <p className="mb-1">Quantity: {item.quantity}</p>
                        <p className="mb-1">Price:{item.price} </p>
                        <p className="mb-1">Weight:{item.weight} </p>
                        {/* <small className="text-muted">Donec id elit non mi porta.</small> */}

                        <Link
                          to={"/QualityAssurance/Assignment"}
                          className=""
                          state={{ ItemID: item._id }}
                        >
                          <Button
                            className="button btn-section"
                            onClick={(e) => {
                              setqaassignID(item._id);
                            }}
                          >
                            Review for QA
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Link>
                ))}

              {/* -------------- CARD 3 -------------- */}
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------------------------------- */}
      {/* ---------- ####### TABLE END #######---------- */}
      {/* ---------------------------------------------- */}

      <Footer />
    </div>
  );
}

export default InventoryTablePage;
