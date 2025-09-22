import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Vroom</h3>
                        <p>Your journey, your way.</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Ride</h4>
                            <Link to="/findride">Find a Ride</Link>
                            <Link to="/postride">Post a Ride</Link>
                        </div>
                        <div className="footer-column">
                            <h4>Account</h4>
                            <Link to="/login">Login</Link>
                            <Link to="/account">My Account</Link>
                        </div>
                        <div className="footer-column">
                            <h4>Company</h4>
                            <Link to="/about">About Us</Link>
                            <Link to="#">Contact</Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Vroom. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
