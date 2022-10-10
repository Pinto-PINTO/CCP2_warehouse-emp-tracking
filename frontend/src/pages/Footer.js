import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa"

import '../css/Footer.css'

function Footer() {
    return (
        <div>
            <div className="footer-dark">
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col item social"><a href="#"><FaFacebookF /></a><a href="#"><FaTwitter /></a><a href="#"><FaYoutube /></a></div>
                        </div>
                        <p className="copyright">NEMO'S WORKHOUSE © 2022</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer