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
import "../css/QAcards.css";
import Footer from "./Footer";
import { useQualityAssuranceContext } from "../hooks/useQualityAssuranceContext";
import { useEffect,useState } from "react";










function QAcards() {

    const {QSessions,dispatch} = useQualityAssuranceContext()



    useEffect(()=>{
        const  fetchItems = async ()=>{
        const response = await fetch('/api/qualityassurance')
        const json = await response.json()
  
        if(response.ok){
            dispatch({type:'SET_QSESSIONS',payload:json})
        }
      }
  
      fetchItems()
  
  },[dispatch])






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
          <Navbar.Brand>Quality Assurance Cards</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Navbar.Text className="nav-component nav-user-name"></Navbar.Text>
              <Link
                to="/form"
                className="btn btn-primary mr-2 nav-component nav-link-btn "
              >
                Form
              </Link>
              <Link
                to="/report"
                className="btn btn-primary mr-2 nav-component nav-link-btn "
              >
                Report
              </Link>
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
          <span>Quality Assurance Cards</span>
        </h1>
        <h2 className="table-info">
          Include a brief form description in the section here.
        </h2>

        {/* ---------------------------------------------------------------------- */}
        {/* ---------- ####### ENTIRE CARD ROW START - 4 PER ROW #######---------- */}
        {/* ---------------------------------------------------------------------- */}
        <div className="card-wrapper card-full-section">
          <div className="row card-row">
            {/* CARD 1 */}


            {QSessions && QSessions.map((Qsession)=>(

            <div className="col-sm-3 card-section-full">
              <div className="card">
                <div className="image-content">
                  <span className="overlay" />
                  <div className="card-image">
                    <img
                      src="https://i.postimg.cc/wBTC9kyt/download-4.jpg"
                      alt=""
                      className="card-img"
                    />
                  </div>
                </div>
                <div>
                  {/* PRODUCT NAME */}
                  <h1 className="text-center product-name">
                  {Qsession.name}
                  </h1>

                  <div className="row row-section">
                    {/* BATCH */}
                    <div className="col text-center">
                      <h2 className="name">Employee</h2>
                      <p className="description">{Qsession.AssignedEmployee}</p>
                    </div>

                    {/* QUANTITY */}
                    <div className="col text-center">
                      <h2 className="name">Category</h2>
                      <p className="description">{Qsession.category}</p>
                    </div>
                  </div>
                  <div className="row row-section">
                    {/* BATCH */}
                    <div className="col text-center">
                      <h2 className="name">Batch</h2>
                      <p className="description">{Qsession.batchNo}</p>
                    </div>

                    {/* QUANTITY */}
                    <div className="col text-center">
                      <h2 className="name">Quantity</h2>
                      <p className="description">{Qsession.quantity}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link to="/QualityAssurance/Details">
                      <button className="button">Review</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>


            ))}
       
          </div>
        </div>
        {/* -------------------------------------------------------------------- */}
        {/* ---------- ####### ENTIRE CARD ROW END - 4 PER ROW #######---------- */}
        {/* -------------------------------------------------------------------- */}
      </div>
      <Footer />
    </div>
  );
}

export default QAcards;
