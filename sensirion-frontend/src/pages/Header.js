import { memo } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Sensirion</Navbar.Brand>
          <Nav>
            <Nav.Link as={NavLink} to="/dashboard" activeClassName="active-color-main-navbar">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile" activeClassName="active-color-main-navbar">
              Profile
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default memo(Header);
