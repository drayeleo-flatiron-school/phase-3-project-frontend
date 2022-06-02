import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import {Navbar, Container,Offcanvas,NavDropdown,Form,FormControl,Button,Nav} from 'react-bootstrap'

function Header() {
  return (
    <>
    {['xl'].map((expand) => (
      <Navbar key={expand} expand={expand} className="mb-3 navbar">
        <Container fluid>
          <Navbar.Brand href="/">Title</Navbar.Brand>
          <Navbar.Toggle />
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/recipes">Recipes</Nav.Link>
              </Nav>
              <SearchBar />
            </Offcanvas.Body>
        </Container>
      </Navbar>
    ))}
  </>
  );
}

export default Header;
