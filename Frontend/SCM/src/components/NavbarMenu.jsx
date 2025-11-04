import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavbarMenu() {
 const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" active={location.pathname === "/"}>SupplyChain</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>Home</Nav.Link>
             <Nav.Link as={Link} to="/warehouse" active={location.pathname === "/warehouse"}>WareHouse</Nav.Link>
             <Nav.Link as={Link} to="/products" active={location.pathname === "/warehouse"}>Products</Nav.Link>
            <Nav.Link as={Link} to="/transfers" active={location.pathname === "/transfers"}>Transfers</Nav.Link>
            <Nav.Link as={Link} to="/reports" active={location.pathname === "/reports"}>Reports</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
