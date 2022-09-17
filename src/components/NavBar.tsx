import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { SyntheticEvent, FC } from "react";

const NavBar: FC = () => {
  const { activeUser, logOut } = useAuth();

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await logOut();
    } catch (error) {}
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>FireChat</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!activeUser && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {!activeUser && (
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {activeUser && (
              <Nav.Link as={Button} onClick={handleLogout}>
                LogOut
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
