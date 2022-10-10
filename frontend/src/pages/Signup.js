import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSignup } from "../hooks/useSignup";
import { useLogout } from '../hooks/useLogout';


function Signup() {

    // States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    // Handling Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    // Handling Logout
    const { logout } = useLogout();

    const handleLogOutClick = () => {
        logout();
    }

        return (
            <div>

                {/* <form className="signup" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <label>Email address:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button>Sign up</button>
            </form> */}

                {/* -------------------------------------------------- */}
                {/* ---------- ####### NAV BAR START #######---------- */}
                {/* -------------------------------------------------- */}
                <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
                    <Container>
                        <Navbar.Brand>Sign Up</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <Navbar.Text className="nav-component nav-user-name">

                                </Navbar.Text>
                                <Link to="/" className="btn btn-primary mr-2 nav-component nav-link-btn ">Home</Link>
                                <Link to="/dashboard" className="btn btn-primary mr-2 nav-component nav-link-btn ">Dashboard</Link>
                                <Link to="/login" className="btn btn-primary mr-2 nav-component nav-link-btn ">Login</Link>
                                <button onClick={handleLogOutClick} className="btn btn-primary mr-2 nav-component nav-link-btn" >Log out</button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {/* ------------------------------------------------ */}
                {/* ---------- ####### NAV BAR END #######---------- */}
                {/* ------------------------------------------------ */}

                <div className="login_form">

                    <div className="login-wrapper">
                        <div className="logo-section">
                            <a target="_blank" rel="noopener" href="https://unrealnavigation.com">
                                <img
                                    src="https://unrealnavigation.com/_themes/unrealnavigation/img/unreal-navigation-logo.png?v=1474018625"
                                    alt=""
                                />
                            </a>
                        </div>

                        <form id="login" onSubmit={handleSubmit} className="login-form">

                            <label>Email Address</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                autoCapitalize="off"
                                autoCorrect="off"
                            />

                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="password"
                            />
                            <button type="submit" disabled={isLoading}>Sign Up</button>
                            {error && <div className="error text-center">{error}</div>}
                        </form>
                    </div>

                </div>

            </div>
        )
    }

export default Signup