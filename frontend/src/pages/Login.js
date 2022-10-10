import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import '../css/Login.css';


function Login() {

    // States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Logging the user in
        await login(email, password)
    }


    return (

        <div>


            {/* -------------------------------------------------- */}
            {/* ---------- ####### NAV BAR START #######---------- */}
            {/* -------------------------------------------------- */}
            <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className='nav-bar-edit'>
                <Container>
                    <Navbar.Brand>Login</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Navbar.Text className="nav-component nav-user-name">

                            </Navbar.Text>
                            <Link to="/" className="btn btn-primary mr-2 nav-component nav-link-btn ">Home</Link>
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
                                src="https://i.postimg.cc/NFXbbz5d/2024644-login-user-avatar-person-users-icon.png"
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
                        <button type="submit" disabled={isLoading}>Login</button>
                        {error && <div className="error text-center">{error}</div>}
                    </form>
                </div>

            </div>


        </div>

    )
}

export default Login