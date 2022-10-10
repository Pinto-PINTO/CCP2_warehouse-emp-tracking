import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../css/QualityAssurance.css";
import Footer from "./Footer";
import { useItemsContext } from "../hooks/useItemsContext";
import { useEmployeesContext } from "../hooks/useEmployeesContext";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function QualityAssurance() {
  const { employees, dispatch } = useEmployeesContext();
  const [item, setitem] = useState();
  const [itemname, setitemname] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [selectedEmp, setselectedEmp] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, seterror] = useState(null);

  //chanagables of the item
  const [quantity, setquantity] = useState();
  const [weight, setweight] = useState(0);
  const [price, setprice] = useState(0);

  const location = useLocation();
  const { ItemID } = location.state;
  // console.log("from the QA------"+ItemID);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/api/user/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "GET_AVAILABLE_EMP", payload: json });
      }
    };

    const handleQA = async () => {
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
      }
    };

    fetchEmployees();
    handleQA();
  }, [ItemID, dispatch]);

  //checkbox handling
  const handleselectedEmp = (e, item) => {
    if (e.target.checked) {
      console.log("✅ Checkbox is checked");
      setselectedEmp(item);
    } else {
      console.log("⛔️ Checkbox is NOT checked");
      setselectedEmp(null);
    }
    if (selectedEmp != null) {
      console.log(selectedEmp.firstName + "----" + item.status);
    } else {
      console.log("Loading...");
    }

    setIsSubscribed((current) => !current);
  };

  // const printval = () => {
  //   if (selectedEmp != null) {
  //     console.log(selectedEmp.firstName);
  //   } else {
  //     console.log("Loading...");
  //   }
  // };

  const handleAssignEmployee = async (e) => {
    const response = await fetch("/api/user/qa/" + selectedEmp._id, {
      method: "PATCH",
      body: JSON.stringify(selectedEmp),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      console.log("Request Failed");
    }
  };

  //Handling The Creation of Quality Assurance Session

  const handleQASessionCreation = async (e) => {
    // e.preventDefault();

    const QAitem = {
      name: item.name,
      batchNo: item.batchNo,
      quantity: quantity,
      category: item.category,
      price: price,
      weight: weight,
      AssignedEmployee: selectedEmp.firstName,
    };
    const response = await fetch("/api/qualityassurance", {
      method: "POST",
      body: JSON.stringify(QAitem),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      seterror(json.error);
    }
    if (response.ok) {
      seterror(null);
      console.log("QA Session Created");
    }
  };

  //Buisness Logic Functions

  const CalculateWeightAndPrice = (quantity, weight, price) => {
    setweight(quantity * weight);
    setprice(quantity * price);
  };

  // const printweightandprice = () => {
  //   console.log(weight);
  //   console.log(price);
  // };

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
          <Navbar.Brand>Quality Assurance</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name"></Navbar.Text>

              <Link
                to="/"
                className="btn btn-primary mr-2 nav-component nav-link-btn "
              >
                DashBoard
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
          <span>Quality Assurance</span>
        </h1>
        <h2 className="table-info">
          Include a brief form description in the section here.
        </h2>

        {/* ---------------------------------------------------------------- */}
        {/* ---------- ####### ENTIRE COLUMN SECTION START #######---------- */}
        {/* ---------------------------------------------------------------- */}
        <div className="row card-section-2">
          {/* --------------------------------------------------------------- */}
          {/* ---------- ####### PRODUCT DETAILS CARD START #######---------- */}
          {/* --------------------------------------------------------------- */}
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                {/*-------------- IMAGE LINK HERE --------------*/}
                {/* <img src="http://bit.ly/2tMBBTd" className="rounded float-left" alt="" /> */}

                <div className="float-right product-details">
                  <h5 className="card-title">Product Details</h5>
                  <p className="card-text">
                    The result below is based on a product batch
                  </p>
                  <form>
                    <div className="form-group row">
                      <label htmlFor="name" className="col-sm-3 col-form-label">
                        name
                      </label>
                      <div className="col-sm-9">
                        <span
                          type="text"
                          readOnly=""
                          className="form-control-plaintext"
                          id="productName"
                        >
                          {isFetched ? item.name : "Loading..."}
                        </span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="batch"
                        className="col-sm-3 col-form-label"
                      >
                        Batch
                      </label>
                      <div className="col-sm-9">
                        <span
                          type="text"
                          readOnly=""
                          className="form-control-plaintext"
                          id="productName"
                        >
                          {isFetched ? item.batchNo : "Loading..."}
                        </span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="category"
                        className="col-sm-3 col-form-label pr-3"
                      >
                        Category
                      </label>
                      <div className="col-sm-9">
                        <span
                          type="text"
                          readOnly=""
                          className="form-control-plaintext"
                          id="productName"
                        >
                          {isFetched ? item.category : "Loading..."}
                        </span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="qty"
                        className="col-sm-3 col-form-label qty-field"
                      >
                        Qty
                      </label>
                      <div class="col-sm-4">
                        <input
                          type="number"
                          className="form-control"
                          id="productQty"
                          placeholder="Enter Qty"
                          onChange={(e) => {
                            setquantity(e.target.value);
                            CalculateWeightAndPrice(
                              e.target.value,
                              item.weight,
                              item.price
                            );
                          }}
                        />
                      </div>
                    </div>

                    {/* Make the states of these 2 field invisible, on button click make them appear */}

                    <div className="form-group row pt-2">
                      <label
                        htmlFor="weight"
                        className="col-sm-3 col-form-label"
                      >
                        Weight
                      </label>
                      <div className="col-sm-9 pt-1">
                        <span
                          type="text"
                          readOnly=""
                          className="form-control-plaintext"
                          id="productWeight"
                          onChange={(e) => setweight(e)}
                        >
                          {weight + "Kg"}
                        </span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="price"
                        className="col-sm-3 col-form-label"
                      >
                        Price
                      </label>
                      <div className="col-sm-9">
                        <span
                          type="text"
                          readOnly=""
                          className="form-control-plaintext"
                          id="productPrice"
                          onChange={(e) => setprice(e)}
                        >
                          {price + "$"}
                        </span>
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      {/* <Button
                        variant="success"
                        type="Submit"
                        className="calculate-btn"
                      >
                        Calculate
                      </Button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------------- */}
          {/* ---------- ####### PRODUCT DETAILS CARD END #######---------- */}
          {/* ------------------------------------------------------------- */}

          {/* --------------------------------------------------------- */}
          {/* ---------- ####### EMPLOYEES CARD START #######---------- */}
          {/* --------------------------------------------------------- */}
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Employees</h5>
                <p className="card-text">Below is a list of idle employees</p>
                <table className="table table-bordered table-qa-emp">
                  <thead>
                    <tr>
                      <th scope="col">Assign</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees &&
                      employees.map((item) => (
                        <tr key={item._id}>
                          <th scope="row">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                              value={isSubscribed}
                              onChange={(e) => handleselectedEmp(e, item)}
                            />
                          </th>
                          <td>{item.firstName}</td>
                          <td>{item.department}</td>
                          <td>{item.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------- */}
          {/* ---------- ####### EMPLOYEES CARD END #######---------- */}
          {/* ------------------------------------------------------- */}
        </div>
        {/* -------------------------------------------------------------- */}
        {/* ---------- ####### ENTIRE COLUMN SECTION END #######---------- */}
        {/* -------------------------------------------------------------- */}

        <div className="d-grid gap-2 card-section-whole">
          <Link to={"/QualityAssurance"}>
            <Button
              variant="success"
              type="Submit"
              className="filter-btn"
              onClick={(e) => {
                handleAssignEmployee(e);
                handleQASessionCreation(e);
              }}
            >
              Assign for Quality Assurance
            </Button>
          </Link>

          {/* <Button
            variant="success"
            type="Submit"
            className="filter-btn"
            onClick={(e) => printval()}
          >
            check state val
          </Button>
          <Button
            variant="success"
            type="Submit"
            className="filter-btn"
            onClick={(e) => printweightandprice()}
          >
            print weight and price
          </Button> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default QualityAssurance;
