import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useAuth } from "../Auth/AuthContext";

export default function MyNavbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const expand = "md";

  // State to control Offcanvas visibility
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/LoginPage");
    setShowOffcanvas(false); // Close Offcanvas on logout
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          My React App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleShow} />
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={handleClose}>
                Home
              </Nav.Link>
              {isAuthenticated && (
                <Nav.Link as={Link} to="/todos" onClick={handleClose}>
                  TodoList
                </Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link as={Link} to="/cricket-org" onClick={handleClose}>
                  Cricket Info
                </Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link as={Link} to="/paypal-payment" onClick={handleClose}>
                  Paypal Payment
                </Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link as={Link} to="/chatbot" onClick={handleClose}>
                  Chatbot
                </Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link as={Link} to="/forgot-password" onClick={handleClose}>
                  Forgot Password
                </Nav.Link>
              )}
              {!isAuthenticated && (
                <Nav.Link as={Link} to="/registerPage" onClick={handleClose}>
                  Register
                </Nav.Link>
              )}
              {!isAuthenticated && (
                <Nav.Link as={Link} to="/LoginPage" onClick={handleClose}>
                  Login
                </Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>

            <div className="ms-auto">
              {isAuthenticated && (
                <Link to="/ProfilePage" style={{ textDecoration: "none" }} onClick={handleClose}>
                  <div
                    className="profile-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#007bff",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Badge bg="primary">P</Badge>
                  </div>
                </Link>
              )}
            </div>

            {!isAuthenticated && (
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
