import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Table, Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../css/DistributionCards.css';
import Footer from './Footer';
import { MdDelete } from "react-icons/md";

function DistributionCards() {
    return (


        <div>

            {/* -------------------------------------------------- */}
            {/* ---------- ####### NAV BAR START #######---------- */}
            {/* -------------------------------------------------- */}
            <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
                <Container>
                    <Navbar.Brand>Distribution Cards</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Navbar.Text className="nav-component nav-user-name"></Navbar.Text>
                            <Link to="/distribution/form" className="btn btn-primary mr-2 nav-component nav-link-btn ">Distribution Form</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* ------------------------------------------------ */}
            {/* ---------- ####### NAV BAR END #######---------- */}
            {/* ------------------------------------------------ */}



            <div className='content'>

                <h1 className='table-name'>
                    <span>Distribution Cards</span>
                </h1>
                <h2 className='table-info'>
                    Include a brief form description in the section here.
                </h2>



                {/* ---------------------------------------------------------------------- */}
                {/* ---------- ####### ENTIRE CARD ROW START - 4 PER ROW #######---------- */}
                {/* ---------------------------------------------------------------------- */}
                <div className="card-wrapper card-full-section">
                    <div className='row card-row'>

                        {/* CARD TEMPLATE*/}
                        <div className="col-sm-3 card-section-full">
                            <div className="card">

                                <div>

                                    {/* Date */}
                                    <h1 className="text-center product-name">2022/09/03</h1>

                                    <div className='row row-section'>

                                        {/* TIME */}
                                        <div className='col text-center'>
                                            <h2 className="name">Time</h2>
                                            <p className="description">
                                                3.30
                                            </p>
                                        </div>

                                        {/* ITEM CODE */}
                                        <div className='col text-center'>
                                            <h2 className="name">Item Code</h2>
                                            <p className="description">
                                                IT0001
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* QTY */}
                                        <div className='col text-center'>
                                            <h2 className="name">Quantity</h2>
                                            <p className="description">
                                                31 units
                                            </p>
                                        </div>

                                        {/* LOCATION */}
                                        <div className='col text-center'>
                                            <h2 className="name">Location</h2>
                                            <p className="description">
                                                Malabe
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* DISTANCE */}
                                        <div className='col text-center'>
                                            <h2 className="name">Distance</h2>
                                            <p className="description">
                                                15 km
                                            </p>
                                        </div>

                                        {/* DURATION */}
                                        <div className='col text-center'>
                                            <h2 className="name">Duration</h2>
                                            <p className="description">
                                                2.5 hrs
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* DRIVER ID */}
                                        <div className='col text-center'>
                                            <h2 className="name">Driver ID</h2>
                                            <p className="description">
                                                D0052
                                            </p>
                                        </div>

                                        {/* VEHICLE ID */}
                                        <div className='col text-center'>
                                            <h2 className="name">Vehicle ID</h2>
                                            <p className="description">
                                                VH8884
                                            </p>
                                        </div>
                                    </div>

                                    <div className='text-center'>
                                        <Link to="/qa/cards/form">
                                            <button className="button delete-btn-d"><MdDelete className='delete-btn-icon' />  Delete</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* ----------------------------------
                        -------------  EXTRA -------------
                        ---------------------------------- */}
                        <div className="col-sm-3 card-section-full">
                            <div className="card">

                                <div>

                                    {/* Date */}
                                    <h1 className="text-center product-name">2022/09/03</h1>

                                    <div className='row row-section'>

                                        {/* TIME */}
                                        <div className='col text-center'>
                                            <h2 className="name">Time</h2>
                                            <p className="description">
                                                3.30
                                            </p>
                                        </div>

                                        {/* ITEM CODE */}
                                        <div className='col text-center'>
                                            <h2 className="name">Item Code</h2>
                                            <p className="description">
                                                IT0001
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* QTY */}
                                        <div className='col text-center'>
                                            <h2 className="name">Quantity</h2>
                                            <p className="description">
                                                31 units
                                            </p>
                                        </div>

                                        {/* LOCATION */}
                                        <div className='col text-center'>
                                            <h2 className="name">Location</h2>
                                            <p className="description">
                                                Malabe
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* DISTANCE */}
                                        <div className='col text-center'>
                                            <h2 className="name">Distance</h2>
                                            <p className="description">
                                                15 km
                                            </p>
                                        </div>

                                        {/* DURATION */}
                                        <div className='col text-center'>
                                            <h2 className="name">Duration</h2>
                                            <p className="description">
                                                2.5 hrs
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* DRIVER ID */}
                                        <div className='col text-center'>
                                            <h2 className="name">Driver ID</h2>
                                            <p className="description">
                                                D0052
                                            </p>
                                        </div>

                                        {/* VEHICLE ID */}
                                        <div className='col text-center'>
                                            <h2 className="name">Vehicle ID</h2>
                                            <p className="description">
                                                VH8884
                                            </p>
                                        </div>
                                    </div>

                                    <div className='text-center'>
                                        <Link to="/qa/cards/form">
                                            <button className="button delete-btn-d"><MdDelete className='delete-btn-icon' />  Delete</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3 card-section-full">
                            <div className="card">

                                <div>

                                    {/* Date */}
                                    <h1 className="text-center product-name">2022/09/03</h1>

                                    <div className='row row-section'>

                                        {/* TIME */}
                                        <div className='col text-center'>
                                            <h2 className="name">Time</h2>
                                            <p className="description">
                                                3.30
                                            </p>
                                        </div>

                                        {/* ITEM CODE */}
                                        <div className='col text-center'>
                                            <h2 className="name">Item Code</h2>
                                            <p className="description">
                                                IT0001
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* QTY */}
                                        <div className='col text-center'>
                                            <h2 className="name">Quantity</h2>
                                            <p className="description">
                                                31 units
                                            </p>
                                        </div>

                                        {/* LOCATION */}
                                        <div className='col text-center'>
                                            <h2 className="name">Location</h2>
                                            <p className="description">
                                                Malabe
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* DISTANCE */}
                                        <div className='col text-center'>
                                            <h2 className="name">Distance</h2>
                                            <p className="description">
                                                15 km
                                            </p>
                                        </div>

                                        {/* DURATION */}
                                        <div className='col text-center'>
                                            <h2 className="name">Duration</h2>
                                            <p className="description">
                                                2.5 hrs
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* DRIVER ID */}
                                        <div className='col text-center'>
                                            <h2 className="name">Driver ID</h2>
                                            <p className="description">
                                                D0052
                                            </p>
                                        </div>

                                        {/* VEHICLE ID */}
                                        <div className='col text-center'>
                                            <h2 className="name">Vehicle ID</h2>
                                            <p className="description">
                                                VH8884
                                            </p>
                                        </div>
                                    </div>

                                    <div className='text-center'>
                                        <Link to="/qa/cards/form">
                                            <button className="button delete-btn-d"><MdDelete className='delete-btn-icon' />  Delete</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3 card-section-full">
                            <div className="card">

                                <div>

                                    {/* Date */}
                                    <h1 className="text-center product-name">2022/09/03</h1>

                                    <div className='row row-section'>

                                        {/* TIME */}
                                        <div className='col text-center'>
                                            <h2 className="name">Time</h2>
                                            <p className="description">
                                                3.30
                                            </p>
                                        </div>

                                        {/* ITEM CODE */}
                                        <div className='col text-center'>
                                            <h2 className="name">Item Code</h2>
                                            <p className="description">
                                                IT0001
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* QTY */}
                                        <div className='col text-center'>
                                            <h2 className="name">Quantity</h2>
                                            <p className="description">
                                                31 units
                                            </p>
                                        </div>

                                        {/* LOCATION */}
                                        <div className='col text-center'>
                                            <h2 className="name">Location</h2>
                                            <p className="description">
                                                Malabe
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* DISTANCE */}
                                        <div className='col text-center'>
                                            <h2 className="name">Distance</h2>
                                            <p className="description">
                                                15 km
                                            </p>
                                        </div>

                                        {/* DURATION */}
                                        <div className='col text-center'>
                                            <h2 className="name">Duration</h2>
                                            <p className="description">
                                                2.5 hrs
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row row-section'>

                                        {/* DRIVER ID */}
                                        <div className='col text-center'>
                                            <h2 className="name">Driver ID</h2>
                                            <p className="description">
                                                D0052
                                            </p>
                                        </div>

                                        {/* VEHICLE ID */}
                                        <div className='col text-center'>
                                            <h2 className="name">Vehicle ID</h2>
                                            <p className="description">
                                                VH8884
                                            </p>
                                        </div>
                                    </div>

                                    <div className='text-center'>
                                        <Link to="/qa/cards/form">
                                            <button className="button delete-btn-d"><MdDelete className='delete-btn-icon' />  Delete</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* ----------------------------------
                        -------------  EXTRA -------------
                        ---------------------------------- */}



                    </div>
                </div>
                {/* -------------------------------------------------------------------- */}
                {/* ---------- ####### ENTIRE CARD ROW END - 4 PER ROW #######---------- */}
                {/* -------------------------------------------------------------------- */}


            </div>
            <Footer />
        </div>


    )
}

export default DistributionCards