import React from "react";

function Footer() {
    return <footer className="small bg-light mt-auto">
        <div className="container py-3 py-sm-5">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                    <h6>Quick links</h6>
                    <ul className="list-unstyled">
                        <li><a className="link-secondary" href="#">Home</a></li>
                        <li><a className="link-secondary" href="#">What's new</a></li>
                        <li><a className="link-secondary" href="#">Featured Product</a></li>
                        <li><a className="link-secondary" href="#">News letter</a></li>
                        <li><a className="link-secondary" href="#">My account</a></li>
                    </ul>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <h6>Information</h6>
                    <ul className="list-unstyled">
                        <li><a className="link-secondary" href="#">About us</a></li>
                        <li><a className="link-secondary" href="#">Membership</a></li>
                        <li><a className="link-secondary" href="#">Shipping &amp; returns</a></li>
                        <li><a className="link-secondary" href="#">Contact</a></li>
                        <li><a className="link-secondary" href="#">Sitemap</a></li>
                    </ul>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <h6>Follow us</h6>
                    <ul className="list-unstyled">
                        <li><a className="link-secondary" href="#">Facebook</a></li>
                        <li><a className="link-secondary" href="#">Twitter</a></li>
                        <li><a className="link-secondary" href="#">Instagram</a></li>
                        <li><a className="link-secondary" href="#">LinkedIn</a></li>
                        <li><a className="link-secondary" href="#">YouTube</a></li>
                    </ul>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <address>
                        <strong>Sigrid Narep</strong><br/>
                        Tallinn, Estonia<br/>
                        <abbr title="Telephone">Phone:</abbr>
                        <a className="link-secondary" href="tel:+37256711791">(+372) 5671 1791</a><br/>
                        <abbr title="Mail">Email:</abbr>
                        <a className="link-secondary" href="mailto:info@domain.com">info@domain.com</a>
                    </address>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-9">
                    <ul className="list-inline">
                        <li className="list-inline-item">&copy; 2025 Web Company, Inc.</li>
                        <li className="list-inline-item">All rights reserved.</li>
                        <li className="list-inline-item">
                            <a className="link-secondary" href="#">Terms of use and privacy policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>;
}

export default Footer;