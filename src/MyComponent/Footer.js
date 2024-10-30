// src/components/Footer.js
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

export default function myFooter() {
  return (
    <footer className="bg-dark text-white mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a team dedicated to providing the best service for our customers. Our mission is to make your experience memorable.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#home" className="text-white">Home</Nav.Link>
              <Nav.Link href="#about" className="text-white">About</Nav.Link>
              <Nav.Link href="#services" className="text-white">Services</Nav.Link>
              <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@example.com</p>
            <p>Phone: +1 234 567 890</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-white me-2" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-white me-2" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white" />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
