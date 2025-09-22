import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="nav-brand">
                    <Link to="/" className="logo">VROOM</Link>
                </div>

                <nav className="nav-menu">
                    <Link to="/postride" className="nav-link">Post Ride</Link>
                    <Link to="/findride" className="nav-link">Find Ride</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                </nav>

                <div className="nav-actions">
                    <Link to="/login" className="nav-link modern-button">Account</Link>
                </div>
            </div>
        </header>
    );
}
