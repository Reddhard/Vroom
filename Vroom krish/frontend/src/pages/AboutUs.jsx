import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import './AboutUs.css';

export function AboutUs(){
    return(
        <>
            <Header />
            <div className="page-wrapper">
                <section className="about-hero">
                    <div className="container">
                        <h1>About Vroom</h1>
                        <p>A Verified & On-the-go Ride Sharing Platform</p>
                    </div>
                </section>

                <section className="about-content">
                    <div className="container">
                        <h2>Our Mission</h2>
                        <p>
                            Vroom aims to connect riders and drivers across Bangladesh, ensuring safe and
                            cost-effective rides. We believe in verified users, reliable communication, and 
                            a smooth experience for everyone.
                        </p>

                        <h2>Our Vision</h2>
                        <p>
                            To become the leading ride-sharing platform in Bangladesh by prioritizing 
                            trust, convenience, and community.
                        </p>

                        <h2>Why Choose Us?</h2>
                        <ul>
                            <li>Verified drivers and riders</li>
                            <li>Affordable pricing across routes</li>
                            <li>Real-time tracking of rides</li>
                            <li>Responsive support for all users</li>
                        </ul>
                    </div>
                </section>

                <section className="about-team">
                    <div className="container">
                        <h2>Meet the Team</h2>
                        <div className="team-grid">
                            <div className="team-member">
                                <div className="avatar">👨‍💻</div>
                                <h3>Iftear Ahmed Tahsin</h3>
                                <p>Founder & Developer</p>
                            </div>
                            <div className="team-member">
                                <div className="avatar">👨‍💻</div>
                                <h3>Md. Redwan Mahmud</h3>
                                <p>Founder & Developer</p>
                            </div>
                            <div className="team-member">
                                <div className="avatar">👨‍💻</div>
                                <h3>Khondoker Mubinul Islam Albab</h3>
                                <p>Founder & Developer</p>
                            </div>
                            <div className="team-member">
                                <div className="avatar">👨‍💻</div>
                                <h3>Syed Juman Al-Mahmud</h3>
                                <p>Founder & Developer</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}