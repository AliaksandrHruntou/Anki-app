import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './header.css';

const Header = () => {
  return (
    <Navbar 
      className='header' 
      bg="light" 
      variant="light"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Memory Cardzzz</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="justify-content-end" />
        <Navbar.Collapse id="justify-content-end"></Navbar.Collapse>
        <Nav className="me-auto">
          <LinkContainer to="/select-deck">
            <Nav.Link>Select Deck</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-deck">
            <Nav.Link>Create Deck</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/settings-page">
            <Nav.Link>Settings</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;