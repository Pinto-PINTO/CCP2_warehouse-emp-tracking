import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/Dashboard.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Footer from './Footer';


function Dashboard() {

    // Handling Logout
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogOutClick = () => {
        logout();
    }


    return (

        <div>

            {/* -------------------------------------------------- */}
            {/* ---------- ####### NAV BAR START #######---------- */}
            {/* -------------------------------------------------- */}
            <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
                <Container>
                    <Navbar.Brand>Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>

                            {/* ---------------------- Only if the user is logged in ---------------------- */}
                            {user && (
                                <div>
                                    <Navbar.Text className="nav-component nav-user-name">
                                        <b>Signed as: </b> {user.email}
                                    </Navbar.Text>
                                    <Navbar.Text className="nav-component nav-user-name-emp">
                                        <b>Role: </b> {user.role}
                                    </Navbar.Text>
                                    <button onClick={handleLogOutClick} className="btn btn-primary mr-2 nav-component nav-link-btn" >Log out</button>
                                </div>
                            )}
                            <div>
                                {/* <Link to="/" className="btn btn-primary mr-2 nav-component nav-link-btn">Home</Link> */}
                            </div>

                            {/* <Link to="/login" className="btn btn-primary mr-2 nav-component nav-link-btn ">Logout</Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* ------------------------------------------------ */}
            {/* ---------- ####### NAV BAR END #######---------- */}
            {/* ------------------------------------------------ */}

            <div className='dashboard-layout'>
                <main className="page-content">

                    <div className="dash-card">
                        <div className="card-content">
                            <h2 className="title">Quality Assurance</h2>
                            <p className="copy">Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p>
                            <Link to="/QualityAssurance">
                                <button className="card-btn">Navigate</button>
                            </Link>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="card-content">
                            <h2 className="title">Stock Tracking</h2>
                            <p className="copy">Plan your next beach trip with these fabulous destinations</p>
                            <Link to="/inventory">
                                <button className="card-btn">Navigate</button>
                            </Link>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="card-content">
                            <h2 className="title">Vehicle Management</h2>
                            <p className="copy">It's the desert you've always dreamed of</p>
                            <Link to="/VehicleCards">
                                <button className="card-btn">Navigate</button>
                            </Link>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="card-content">
                            <h2 className="title">Product Distribution</h2>
                            <p className="copy">Seriously, straight up, just blast off into outer space today</p>
                            <Link to="/productDistribution">
                                <button className="card-btn">Navigate</button>
                            </Link>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="card-content">
                            <h2 className="title">Employee Tracking</h2>
                            <p className="copy">Plan your next beach trip with these fabulous destinations</p>
                            <Link to="/employee">
                                <button className="card-btn">Navigate</button>
                            </Link>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="card-content">
                            <h2 className="title">Shipment Management</h2>
                            <p className="copy">It's the desert you've always dreamed of</p>
                            <Link to="/ShipmentsTable">
                                <button className="card-btn">Navigate</button>
                            </Link>
                        </div>
                    </div>

                </main>
            </div>

            <Footer />

        </div>

    )
}

export default Dashboard